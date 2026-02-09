import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (user?.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const { visit_id } = await req.json();

        if (!visit_id) {
            return Response.json({ error: 'visit_id is required' }, { status: 400 });
        }

        // Fetch visit details
        const visits = await base44.asServiceRole.entities.Visit.filter({ id: visit_id });
        const visit = visits[0];

        if (!visit) {
            return Response.json({ error: 'Visit not found' }, { status: 404 });
        }

        // Fetch client and caregiver
        const [clients, caregivers] = await Promise.all([
            base44.asServiceRole.entities.Client.filter({ id: visit.client_id }),
            visit.caregiver_id 
                ? base44.asServiceRole.entities.Caregiver.filter({ id: visit.caregiver_id })
                : Promise.resolve([])
        ]);

        const client = clients[0];
        const caregiver = caregivers[0];

        if (!client) {
            return Response.json({ error: 'Client not found' }, { status: 404 });
        }

        // Send reminder to client
        await base44.asServiceRole.integrations.Core.SendEmail({
            from_name: 'Caring Hands Home Health',
            to: client.email,
            subject: 'Visit Reminder - Tomorrow',
            body: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #4a90e2; padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0;">Visit Reminder</h1>
                    </div>
                    
                    <div style="padding: 30px; background: white;">
                        <h2 style="color: #1e3a5f;">Hello ${client.first_name},</h2>
                        
                        <p style="color: #2d3436; line-height: 1.6;">
                            This is a friendly reminder about your upcoming care visit tomorrow.
                        </p>
                        
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #1e3a5f; margin-top: 0;">Visit Details:</h3>
                            <p style="color: #2d3436; margin: 5px 0;">
                                <strong>Date:</strong> ${new Date(visit.visit_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <p style="color: #2d3436; margin: 5px 0;">
                                <strong>Time:</strong> ${visit.scheduled_start_time} - ${visit.scheduled_end_time}
                            </p>
                            ${caregiver ? `
                                <p style="color: #2d3436; margin: 5px 0;">
                                    <strong>Caregiver:</strong> ${caregiver.first_name} ${caregiver.last_name}
                                </p>
                            ` : ''}
                            <p style="color: #2d3436; margin: 5px 0;">
                                <strong>Service Type:</strong> ${visit.visit_type}
                            </p>
                        </div>

                        <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="color: #1e3a5f; margin: 0; font-weight: bold;">Need to Reschedule?</p>
                            <p style="color: #2d3436; margin: 10px 0 0 0;">
                                Please call us at <strong>(512) 555-1234</strong> as soon as possible.
                            </p>
                        </div>

                        <p style="color: #2d3436;">
                            We look forward to serving you!<br>
                            <strong>Caring Hands Team</strong>
                        </p>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 15px; text-align: center; color: #666; font-size: 12px;">
                        <p style="margin: 0;">Available 24/7: (512) 555-1234</p>
                    </div>
                </div>
            `
        });

        // Send reminder to caregiver (if assigned)
        if (caregiver) {
            await base44.asServiceRole.integrations.Core.SendEmail({
                from_name: 'Caring Hands Home Health',
                to: caregiver.email,
                subject: 'Visit Reminder - Tomorrow',
                body: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background: #1e3a5f; padding: 20px; text-align: center;">
                            <h1 style="color: white; margin: 0;">Visit Reminder</h1>
                        </div>
                        
                        <div style="padding: 30px; background: white;">
                            <h2 style="color: #1e3a5f;">Hi ${caregiver.first_name},</h2>
                            
                            <p style="color: #2d3436; line-height: 1.6;">
                                Reminder: You have a scheduled visit tomorrow.
                            </p>
                            
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                <h3 style="color: #1e3a5f; margin-top: 0;">Visit Details:</h3>
                                <p style="color: #2d3436; margin: 5px 0;">
                                    <strong>Client:</strong> ${client.first_name} ${client.last_name}
                                </p>
                                <p style="color: #2d3436; margin: 5px 0;">
                                    <strong>Date:</strong> ${new Date(visit.visit_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                                <p style="color: #2d3436; margin: 5px 0;">
                                    <strong>Time:</strong> ${visit.scheduled_start_time} - ${visit.scheduled_end_time}
                                </p>
                                <p style="color: #2d3436; margin: 5px 0;">
                                    <strong>Address:</strong> ${client.address_street}, ${client.address_city}, ${client.address_state} ${client.address_zip}
                                </p>
                            </div>

                            <p style="color: #2d3436;">
                                Please arrive on time and remember to clock in/out using the mobile app.<br>
                                <strong>Caring Hands Team</strong>
                            </p>
                        </div>
                    </div>
                `
            });
        }

        return Response.json({ 
            success: true, 
            message: 'Visit reminders sent successfully',
            recipients: caregiver ? ['client', 'caregiver'] : ['client']
        });
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
});