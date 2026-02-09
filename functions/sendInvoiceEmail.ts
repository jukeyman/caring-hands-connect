import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { invoice_id } = await req.json();

        if (!invoice_id) {
            return Response.json({ error: 'invoice_id is required' }, { status: 400 });
        }

        // Fetch invoice details
        const invoices = await base44.asServiceRole.entities.Invoice.filter({ id: invoice_id });
        const invoice = invoices[0];

        if (!invoice) {
            return Response.json({ error: 'Invoice not found' }, { status: 404 });
        }

        // Fetch client
        const clients = await base44.asServiceRole.entities.Client.filter({ id: invoice.client_id });
        const client = clients[0];

        if (!client) {
            return Response.json({ error: 'Client not found' }, { status: 404 });
        }

        // Fetch invoice line items
        const lineItems = await base44.asServiceRole.entities.Invoice_Line_Item.filter({ 
            invoice_id: invoice_id 
        });

        // Generate line items HTML
        const lineItemsHTML = lineItems.map(item => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.description}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${item.unit_price.toFixed(2)}</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: bold;">$${item.line_total.toFixed(2)}</td>
            </tr>
        `).join('');

        // Send invoice email
        await base44.asServiceRole.integrations.Core.SendEmail({
            from_name: 'Caring Hands Home Health - Billing',
            to: client.email,
            subject: `Invoice ${invoice.invoice_number} - ${new Date(invoice.due_date).toLocaleDateString()}`,
            body: `
                <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: white;">
                    <div style="background: linear-gradient(135deg, #1e3a5f 0%, #4a90e2 100%); padding: 40px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 32px;">INVOICE</h1>
                        <p style="color: #d4af37; font-size: 24px; margin: 10px 0 0 0; font-weight: bold;">${invoice.invoice_number}</p>
                    </div>
                    
                    <div style="padding: 40px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px;">
                            <div>
                                <h3 style="color: #1e3a5f; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase;">From:</h3>
                                <p style="color: #2d3436; margin: 0; line-height: 1.6;">
                                    <strong style="font-size: 16px;">Caring Hands Home Health</strong><br>
                                    Austin, Texas<br>
                                    TX License #023937<br>
                                    (512) 555-1234
                                </p>
                            </div>
                            <div>
                                <h3 style="color: #1e3a5f; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase;">Bill To:</h3>
                                <p style="color: #2d3436; margin: 0; line-height: 1.6;">
                                    <strong style="font-size: 16px;">${client.first_name} ${client.last_name}</strong><br>
                                    ${client.address_street}<br>
                                    ${client.address_city}, ${client.address_state} ${client.address_zip}<br>
                                    ${client.email}
                                </p>
                            </div>
                        </div>

                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 30px;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; text-align: center;">
                                <div>
                                    <p style="color: #666; margin: 0; font-size: 12px;">INVOICE DATE</p>
                                    <p style="color: #1e3a5f; margin: 5px 0 0 0; font-weight: bold;">${new Date(invoice.invoice_date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p style="color: #666; margin: 0; font-size: 12px;">DUE DATE</p>
                                    <p style="color: #ef4444; margin: 5px 0 0 0; font-weight: bold; font-size: 16px;">${new Date(invoice.due_date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p style="color: #666; margin: 0; font-size: 12px;">TERMS</p>
                                    <p style="color: #1e3a5f; margin: 5px 0 0 0; font-weight: bold;">${invoice.payment_terms}</p>
                                </div>
                            </div>
                        </div>

                        <table style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                            <thead>
                                <tr style="background: #1e3a5f; color: white;">
                                    <th style="padding: 12px; text-align: left;">Description</th>
                                    <th style="padding: 12px; text-align: center; width: 100px;">Qty</th>
                                    <th style="padding: 12px; text-align: right; width: 120px;">Rate</th>
                                    <th style="padding: 12px; text-align: right; width: 120px;">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${lineItemsHTML}
                            </tbody>
                        </table>

                        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
                            <table style="width: 100%; max-width: 350px; margin-left: auto;">
                                <tr>
                                    <td style="padding: 8px; text-align: right; color: #666;">Subtotal:</td>
                                    <td style="padding: 8px; text-align: right; font-weight: bold; color: #2d3436;">$${invoice.subtotal.toFixed(2)}</td>
                                </tr>
                                ${invoice.tax_amount > 0 ? `
                                <tr>
                                    <td style="padding: 8px; text-align: right; color: #666;">Tax:</td>
                                    <td style="padding: 8px; text-align: right; font-weight: bold; color: #2d3436;">$${invoice.tax_amount.toFixed(2)}</td>
                                </tr>
                                ` : ''}
                                <tr style="background: #f8f9fa;">
                                    <td style="padding: 12px; text-align: right; font-size: 18px; font-weight: bold; color: #1e3a5f;">TOTAL:</td>
                                    <td style="padding: 12px; text-align: right; font-size: 20px; font-weight: bold; color: #1e3a5f;">$${invoice.total_amount.toFixed(2)}</td>
                                </tr>
                            </table>
                        </div>

                        <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 25px; border-radius: 12px; margin: 40px 0; text-align: center;">
                            <h3 style="color: white; margin: 0 0 15px 0; font-size: 20px;">Pay Securely Online</h3>
                            <a href="${req.headers.get('origin')}/Billing" 
                               style="display: inline-block; background: white; color: #22c55e; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                Pay Now - $${invoice.balance_due.toFixed(2)}
                            </a>
                            <p style="color: white; margin: 15px 0 0 0; font-size: 14px; opacity: 0.9;">
                                Secure payment via Stripe • Credit Card or Bank Account
                            </p>
                        </div>

                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #1e3a5f; margin: 0 0 10px 0;">Other Payment Options:</h3>
                            <p style="color: #2d3436; margin: 5px 0; font-size: 14px;">
                                📞 <strong>Phone:</strong> Call (512) 555-1234 to pay by phone<br>
                                ✉️ <strong>Mail:</strong> Mail check to our Austin office<br>
                                🔄 <strong>Auto-Pay:</strong> Set up automatic payments in your client portal
                            </p>
                        </div>

                        ${invoice.notes ? `
                        <div style="background: #fff8e1; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="color: #1e3a5f; margin: 0; font-weight: bold;">Invoice Notes:</p>
                            <p style="color: #2d3436; margin: 10px 0 0 0; font-size: 14px;">${invoice.notes}</p>
                        </div>
                        ` : ''}

                        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                            <p style="color: #666; font-size: 13px; margin: 0;">
                                Questions? Contact our billing department at billing@caringhands.com or (512) 555-1234.
                            </p>
                        </div>
                    </div>
                    
                    <div style="background: #1e3a5f; padding: 20px; text-align: center; color: white; font-size: 12px;">
                        <p style="margin: 0;">© 2026 Caring Hands Home Health. All rights reserved.</p>
                    </div>
                </div>
            `
        });

        return Response.json({ 
            success: true, 
            message: 'Invoice email sent successfully' 
        });
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
});