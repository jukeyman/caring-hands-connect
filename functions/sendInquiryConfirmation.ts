import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { inquiry_id } = await req.json();

        if (!inquiry_id) {
            return Response.json({ error: 'inquiry_id is required' }, { status: 400 });
        }

        // Fetch inquiry details
        const inquiries = await base44.asServiceRole.entities.Inquiry.filter({ id: inquiry_id });
        const inquiry = inquiries[0];

        if (!inquiry) {
            return Response.json({ error: 'Inquiry not found' }, { status: 404 });
        }

        // Send confirmation email
        await base44.asServiceRole.integrations.Core.SendEmail({
            from_name: 'Caring Hands Home Health',
            to: inquiry.email,
            subject: 'We Received Your Care Request',
            body: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #1e3a5f 0%, #4a90e2 100%); padding: 30px; text-align: center;">
                        <h1 style="color: white; margin: 0;">Thank You for Reaching Out</h1>
                    </div>
                    
                    <div style="padding: 30px; background: white;">
                        <h2 style="color: #1e3a5f;">Dear ${inquiry.first_name},</h2>
                        
                        <p style="color: #2d3436; line-height: 1.6; font-size: 16px;">
                            We received your request for home care services and understand how important this decision is for you and your family.
                        </p>
                        
                        <div style="background: #d4f4dd; border-left: 4px solid #22c55e; padding: 20px; margin: 25px 0; border-radius: 4px;">
                            <p style="color: #1e3a5f; font-weight: bold; font-size: 18px; margin: 0;">
                                ✓ We'll call you within 30 minutes
                            </p>
                            <p style="color: #2d3436; margin: 10px 0 0 0; font-size: 14px;">
                                One of our care coordinators will reach you at <strong>${inquiry.phone}</strong> to discuss your needs.
                            </p>
                        </div>

                        <h3 style="color: #1e3a5f;">What Happens Next:</h3>
                        <ol style="color: #2d3436; line-height: 1.8;">
                            <li><strong>Quick Call:</strong> We'll discuss your care needs and answer questions</li>
                            <li><strong>Free Assessment:</strong> Schedule a complimentary in-home consultation</li>
                            <li><strong>Custom Care Plan:</strong> Receive a personalized care proposal</li>
                            <li><strong>Meet Your Caregiver:</strong> We'll match you with the perfect caregiver</li>
                        </ol>

                        <div style="background: #fff8e1; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="color: #1e3a5f; margin: 0; font-weight: bold;">📋 Your Request Details:</p>
                            <p style="color: #2d3436; margin: 10px 0 0 0; font-size: 14px;">
                                Care needed for: <strong>${inquiry.care_needed_for}</strong><br>
                                Urgency: <strong>${inquiry.urgency}</strong><br>
                                ${inquiry.services_interested ? `Services: <strong>${inquiry.services_interested.join(', ')}</strong>` : ''}
                            </p>
                        </div>

                        <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="color: #1e3a5f; margin: 0; font-weight: bold;">Questions Before We Call?</p>
                            <p style="color: #2d3436; margin: 10px 0 0 0;">
                                Call us anytime: <strong style="color: #4a90e2; font-size: 18px;">(512) 555-1234</strong>
                            </p>
                        </div>

                        <p style="color: #2d3436;">
                            Thank you for considering Caring Hands Home Health.<br>
                            <strong>The Caring Hands Team</strong>
                        </p>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
                        <p style="margin: 0;">Caring Hands Home Health | Austin, Texas</p>
                        <p style="margin: 5px 0 0 0;">Available 24/7 | TX License #023937</p>
                    </div>
                </div>
            `
        });

        return Response.json({ 
            success: true, 
            message: 'Inquiry confirmation email sent successfully' 
        });
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
});