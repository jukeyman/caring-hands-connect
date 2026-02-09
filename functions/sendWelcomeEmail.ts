import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { client_id } = await req.json();

        if (!client_id) {
            return Response.json({ error: 'client_id is required' }, { status: 400 });
        }

        // Fetch client details
        const clients = await base44.asServiceRole.entities.Client.filter({ id: client_id });
        const client = clients[0];

        if (!client) {
            return Response.json({ error: 'Client not found' }, { status: 404 });
        }

        // Send welcome email
        await base44.asServiceRole.integrations.Core.SendEmail({
            from_name: 'Caring Hands Home Health',
            to: client.email,
            subject: 'Welcome to Caring Hands Home Health',
            body: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #1e3a5f 0%, #4a90e2 100%); padding: 30px; text-align: center;">
                        <h1 style="color: white; margin: 0;">Welcome to Caring Hands</h1>
                        <p style="color: #d4af37; font-size: 18px; margin: 10px 0 0 0;">Premium Home Health Care</p>
                    </div>
                    
                    <div style="padding: 30px; background: white;">
                        <h2 style="color: #1e3a5f;">Dear ${client.first_name},</h2>
                        
                        <p style="color: #2d3436; line-height: 1.6;">
                            Thank you for choosing Caring Hands Home Health. We're honored to be your partner in care.
                        </p>
                        
                        <div style="background: #f8f9fa; border-left: 4px solid #d4af37; padding: 15px; margin: 20px 0;">
                            <h3 style="color: #1e3a5f; margin-top: 0;">Your Client Portal Access</h3>
                            <p style="color: #2d3436; margin: 10px 0;">
                                <strong>Portal URL:</strong> <a href="${req.headers.get('origin')}" style="color: #4a90e2;">${req.headers.get('origin')}</a>
                            </p>
                            <p style="color: #2d3436; margin: 10px 0;">
                                <strong>Email:</strong> ${client.email}
                            </p>
                            <p style="color: #666; font-size: 14px; margin: 10px 0;">
                                Use the email above to log in. If this is your first time, you'll receive a separate email to set your password.
                            </p>
                        </div>

                        <h3 style="color: #1e3a5f;">What You Can Do in Your Portal:</h3>
                        <ul style="color: #2d3436; line-height: 1.8;">
                            <li>View your personalized care plan</li>
                            <li>See upcoming visits and caregiver schedules</li>
                            <li>Access visit notes and care documentation</li>
                            <li>Manage billing and view invoices</li>
                            <li>Message your care team</li>
                            <li>Request care plan adjustments</li>
                        </ul>

                        <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="color: #1e3a5f; margin: 0; font-weight: bold;">📞 Need Help?</p>
                            <p style="color: #2d3436; margin: 10px 0 0 0;">
                                Our care coordinators are available 24/7 at <strong>(512) 555-1234</strong>
                            </p>
                        </div>

                        <p style="color: #2d3436;">
                            Warmly,<br>
                            <strong>The Caring Hands Team</strong>
                        </p>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
                        <p style="margin: 0;">Caring Hands Home Health | Austin, Texas</p>
                        <p style="margin: 5px 0 0 0;">TX License #023937</p>
                    </div>
                </div>
            `
        });

        return Response.json({ 
            success: true, 
            message: 'Welcome email sent successfully' 
        });
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
});