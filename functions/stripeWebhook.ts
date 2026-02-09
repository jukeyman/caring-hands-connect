import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import Stripe from 'npm:stripe@17.5.0';

Deno.serve(async (req) => {
    try {
        // Get Stripe keys BEFORE creating client
        const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
        const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

        if (!stripeSecretKey || !webhookSecret) {
            return Response.json({ 
                error: 'Stripe keys not configured' 
            }, { status: 500 });
        }

        const stripe = new Stripe(stripeSecretKey);

        // Get raw body and signature
        const body = await req.text();
        const signature = req.headers.get('stripe-signature');

        if (!signature) {
            return Response.json({ error: 'No signature' }, { status: 400 });
        }

        // NOW create Base44 client after getting keys
        const base44 = createClientFromRequest(req);

        // Verify webhook signature (MUST use async version for Deno)
        const event = await stripe.webhooks.constructEventAsync(
            body,
            signature,
            webhookSecret
        );

        // Handle events
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            const { client_id, invoice_id, invoice_number } = paymentIntent.metadata;

            if (!invoice_id) {
                return Response.json({ received: true, note: 'No invoice_id in metadata' });
            }

            // Fetch invoice
            const invoices = await base44.asServiceRole.entities.Invoice.filter({ id: invoice_id });
            const invoice = invoices[0];

            if (!invoice) {
                return Response.json({ received: true, note: 'Invoice not found' });
            }

            // Check if payment already recorded
            const existingPayments = await base44.asServiceRole.entities.Payment.filter({
                stripe_payment_id: paymentIntent.id
            });

            if (existingPayments.length > 0) {
                return Response.json({ received: true, note: 'Payment already recorded' });
            }

            const amount = paymentIntent.amount / 100; // Convert from cents

            // Create Payment record
            await base44.asServiceRole.entities.Payment.create({
                invoice_id: invoice_id,
                client_id: client_id,
                payment_date: new Date().toISOString().split('T')[0],
                amount: amount,
                payment_method: 'Stripe',
                stripe_payment_id: paymentIntent.id,
                status: 'Completed'
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

            // Send confirmation email
            const clients = await base44.asServiceRole.entities.Client.filter({ id: client_id });
            const client = clients[0];

            if (client) {
                await base44.asServiceRole.integrations.Core.SendEmail({
                    to: client.email,
                    subject: `Payment Confirmed - ${invoice_number || invoice.invoice_number}`,
                    body: `
                        <h2>Payment Successful</h2>
                        <p>Dear ${client.first_name},</p>
                        <p>Your payment of $${amount.toLocaleString()} has been successfully processed.</p>
                        <p><strong>Invoice:</strong> ${invoice_number || invoice.invoice_number}</p>
                        <p><strong>Remaining Balance:</strong> $${newBalance.toLocaleString()}</p>
                        <p>Thank you for your prompt payment!</p>
                        <p>Best regards,<br>Caring Hands Home Health</p>
                    `
                });
            }

            return Response.json({ received: true, status: 'payment_recorded' });
        }

        if (event.type === 'payment_intent.payment_failed') {
            const paymentIntent = event.data.object;
            const { client_id, invoice_id, invoice_number } = paymentIntent.metadata;

            if (!invoice_id) {
                return Response.json({ received: true, note: 'No invoice_id in metadata' });
            }

            const amount = paymentIntent.amount / 100;

            // Create failed Payment record
            await base44.asServiceRole.entities.Payment.create({
                invoice_id: invoice_id,
                client_id: client_id,
                payment_date: new Date().toISOString().split('T')[0],
                amount: amount,
                payment_method: 'Stripe',
                stripe_payment_id: paymentIntent.id,
                status: 'Failed',
                notes: paymentIntent.last_payment_error?.message || 'Payment failed'
            });

            // Notify all admins
            const admins = await base44.asServiceRole.entities.User.filter({ role: 'admin' });
            
            for (const admin of admins) {
                await base44.asServiceRole.integrations.Core.SendEmail({
                    to: admin.email,
                    subject: 'Payment Failed - Action Required',
                    body: `
                        <h2>Payment Failed</h2>
                        <p><strong>Invoice:</strong> ${invoice_number || invoice_id}</p>
                        <p><strong>Amount:</strong> $${amount.toLocaleString()}</p>
                        <p><strong>Reason:</strong> ${paymentIntent.last_payment_error?.message || 'Unknown'}</p>
                        <p>Please follow up with the client.</p>
                    `
                });
            }

            return Response.json({ received: true, status: 'failure_logged' });
        }

        return Response.json({ received: true });
    } catch (error) {
        return Response.json({ 
            error: error.message 
        }, { status: 500 });
    }
});