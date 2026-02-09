import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import Stripe from 'npm:stripe@17.5.0';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { client_id, invoice_id, amount, payment_method_id } = await req.json();

        if (!client_id || !invoice_id || !amount || !payment_method_id) {
            return Response.json({ 
                error: 'Missing required fields: client_id, invoice_id, amount, payment_method_id' 
            }, { status: 400 });
        }

        // Get Stripe secret key
        const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
        if (!stripeSecretKey) {
            return Response.json({ 
                error: 'Stripe secret key not configured' 
            }, { status: 500 });
        }

        const stripe = new Stripe(stripeSecretKey);

        // Fetch client and invoice details
        const [clients, invoices] = await Promise.all([
            base44.asServiceRole.entities.Client.filter({ id: client_id }),
            base44.asServiceRole.entities.Invoice.filter({ id: invoice_id })
        ]);

        const client = clients[0];
        const invoice = invoices[0];

        if (!client || !invoice) {
            return Response.json({ error: 'Client or invoice not found' }, { status: 404 });
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd',
            payment_method: payment_method_id,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            },
            metadata: {
                client_id: client_id,
                invoice_id: invoice_id,
                client_name: `${client.first_name} ${client.last_name}`,
                invoice_number: invoice.invoice_number
            }
        });

        // Check if payment succeeded
        if (paymentIntent.status === 'succeeded') {
            // Create Payment record
            await base44.asServiceRole.entities.Payment.create({
                invoice_id: invoice_id,
                client_id: client_id,
                payment_date: new Date().toISOString().split('T')[0],
                amount: amount,
                payment_method: 'Stripe',
                stripe_payment_id: paymentIntent.id,
                status: 'Completed',
                processed_by: user.id
            });

            // Update Invoice
            const newAmountPaid = (invoice.amount_paid || 0) + amount;
            const newBalance = invoice.total_amount - newAmountPaid;

            await base44.asServiceRole.entities.Invoice.update(invoice_id, {
                amount_paid: newAmountPaid,
                balance_due: newBalance,
                status: newBalance <= 0 ? 'Paid' : invoice.status,
                paid_at: newBalance <= 0 ? new Date().toISOString() : invoice.paid_at
            });

            // Send email receipt to client
            await base44.asServiceRole.integrations.Core.SendEmail({
                to: client.email,
                subject: `Payment Receipt - ${invoice.invoice_number}`,
                body: `
                    <h2>Payment Received</h2>
                    <p>Dear ${client.first_name},</p>
                    <p>Thank you for your payment of $${amount.toLocaleString()}.</p>
                    <p><strong>Invoice:</strong> ${invoice.invoice_number}</p>
                    <p><strong>Payment Date:</strong> ${format(new Date(), 'MMMM d, yyyy')}</p>
                    <p><strong>Payment Method:</strong> Card ending in ${paymentIntent.payment_method?.card?.last4 || '****'}</p>
                    ${newBalance <= 0 ? '<p style="color: green;"><strong>Your invoice has been paid in full.</strong></p>' : `<p><strong>Remaining Balance:</strong> $${newBalance.toLocaleString()}</p>`}
                    <p>Thank you for choosing Caring Hands Home Health.</p>
                `
            });

            return Response.json({
                success: true,
                payment_id: paymentIntent.id,
                amount_paid: amount,
                remaining_balance: newBalance
            });
        } else {
            // Payment failed or requires action
            await base44.asServiceRole.entities.Payment.create({
                invoice_id: invoice_id,
                client_id: client_id,
                payment_date: new Date().toISOString().split('T')[0],
                amount: amount,
                payment_method: 'Stripe',
                stripe_payment_id: paymentIntent.id,
                status: 'Failed',
                notes: `Payment ${paymentIntent.status}`,
                processed_by: user.id
            });

            // Notify admin
            const admins = await base44.asServiceRole.entities.User.filter({ role: 'admin' });
            for (const admin of admins) {
                await base44.asServiceRole.integrations.Core.SendEmail({
                    to: admin.email,
                    subject: 'Payment Failed - Requires Attention',
                    body: `
                        <h2>Payment Failed</h2>
                        <p><strong>Client:</strong> ${client.first_name} ${client.last_name}</p>
                        <p><strong>Invoice:</strong> ${invoice.invoice_number}</p>
                        <p><strong>Amount:</strong> $${amount.toLocaleString()}</p>
                        <p><strong>Status:</strong> ${paymentIntent.status}</p>
                        <p>Please follow up with the client.</p>
                    `
                });
            }

            return Response.json({
                success: false,
                error: 'Payment failed or requires additional action',
                status: paymentIntent.status
            }, { status: 400 });
        }
    } catch (error) {
        return Response.json({ 
            success: false,
            error: error.message 
        }, { status: 500 });
    }
});