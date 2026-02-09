import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import twilio from 'npm:twilio@5.3.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { visit_id, change_type, change_details } = await req.json();

        if (!visit_id || !change_type) {
            return Response.json({ 
                error: 'visit_id and change_type are required' 
            }, { status: 400 });
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

        const visitDate = new Date(visit.visit_date).toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });

        // Get Twilio credentials (optional - will send email if not configured)
        const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
        const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
        const twilioPhone = Deno.env.get('TWILIO_PHONE_NUMBER');
        
        const twilioConfigured = accountSid && authToken && twilioPhone;
        let twilioClient;
        if (twilioConfigured) {
            twilioClient = twilio(accountSid, authToken);
        }

        const notifications = [];

        // Notify client
        if (change_type === 'caregiver_change' || change_type === 'time_change' || change_type === 'cancellation') {
            const clientMessage = change_type === 'cancellation'
                ? `Caring Hands: Your visit on ${visitDate} has been cancelled. ${change_details || 'Our team will contact you to reschedule.'}`
                : change_type === 'caregiver_change'
                ? `Caring Hands: Your visit on ${visitDate} at ${visit.scheduled_start_time} - caregiver change to ${caregiver ? `${caregiver.first_name} ${caregiver.last_name}` : 'TBD'}. ${change_details || ''}`
                : `Caring Hands: Your visit has been rescheduled to ${visitDate} at ${visit.scheduled_start_time}. ${change_details || ''}`;

            // Send SMS to client (if Twilio configured)
            if (twilioConfigured) {
                try {
                    const sms = await twilioClient.messages.create({
                        body: clientMessage,
                        from: twilioPhone,
                        to: client.phone
                    });
                    notifications.push({ recipient: 'client', method: 'sms', sid: sms.sid });
                } catch (smsError) {
                    console.error('SMS failed, falling back to email:', smsError);
                }
            }

            // Send email to client
            await base44.asServiceRole.integrations.Core.SendEmail({
                from_name: 'Caring Hands Home Health',
                to: client.email,
                subject: `Schedule Update - ${visitDate}`,
                body: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background: #4a90e2; padding: 20px; text-align: center;">
                            <h1 style="color: white; margin: 0;">Schedule Update</h1>
                        </div>
                        
                        <div style="padding: 30px; background: white;">
                            <h2 style="color: #1e3a5f;">Hello ${client.first_name},</h2>
                            
                            <p style="color: #2d3436; line-height: 1.6;">
                                We wanted to notify you of a change to your upcoming visit:
                            </p>
                            
                            <div style="background: #fff8e1; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 4px;">
                                <p style="color: #1e3a5f; font-weight: bold; margin: 0 0 10px 0;">Change Details:</p>
                                <p style="color: #2d3436; margin: 0; line-height: 1.6;">
                                    <strong>Date:</strong> ${visitDate}<br>
                                    <strong>Time:</strong> ${visit.scheduled_start_time} - ${visit.scheduled_end_time}<br>
                                    ${caregiver ? `<strong>Caregiver:</strong> ${caregiver.first_name} ${caregiver.last_name}<br>` : ''}
                                    ${change_details ? `<strong>Reason:</strong> ${change_details}` : ''}
                                </p>
                            </div>

                            <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                                <p style="color: #1e3a5f; margin: 0; font-weight: bold;">Questions or Concerns?</p>
                                <p style="color: #2d3436; margin: 10px 0 0 0;">
                                    Call us at <strong>(512) 555-1234</strong>
                                </p>
                            </div>

                            <p style="color: #2d3436;">
                                Thank you for your understanding,<br>
                                <strong>Caring Hands Team</strong>
                            </p>
                        </div>
                    </div>
                `
            });
            notifications.push({ recipient: 'client', method: 'email' });
        }

        // Notify caregiver
        if (caregiver && (change_type === 'new_assignment' || change_type === 'time_change' || change_type === 'cancellation')) {
            const caregiverMessage = change_type === 'cancellation'
                ? `Caring Hands: Visit with ${client.first_name} ${client.last_name} on ${visitDate} has been cancelled. ${change_details || ''}`
                : change_type === 'new_assignment'
                ? `Caring Hands: New visit assigned - ${client.first_name} ${client.last_name} on ${visitDate} at ${visit.scheduled_start_time}. Check app for details.`
                : `Caring Hands: Visit time updated - ${client.first_name} ${client.last_name} now ${visitDate} at ${visit.scheduled_start_time}. ${change_details || ''}`;

            // Send SMS to caregiver (if Twilio configured)
            if (twilioConfigured) {
                try {
                    const sms = await twilioClient.messages.create({
                        body: caregiverMessage,
                        from: twilioPhone,
                        to: caregiver.phone
                    });
                    notifications.push({ recipient: 'caregiver', method: 'sms', sid: sms.sid });
                } catch (smsError) {
                    console.error('SMS failed, falling back to email:', smsError);
                }
            }

            // Send email to caregiver
            await base44.asServiceRole.integrations.Core.SendEmail({
                from_name: 'Caring Hands Home Health',
                to: caregiver.email,
                subject: `Schedule ${change_type === 'new_assignment' ? 'Assignment' : 'Update'} - ${visitDate}`,
                body: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background: #1e3a5f; padding: 20px; text-align: center;">
                            <h1 style="color: white; margin: 0;">Schedule ${change_type === 'new_assignment' ? 'Assignment' : 'Update'}</h1>
                        </div>
                        
                        <div style="padding: 30px; background: white;">
                            <h2 style="color: #1e3a5f;">Hi ${caregiver.first_name},</h2>
                            
                            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                <h3 style="color: #1e3a5f; margin-top: 0;">Visit Details:</h3>
                                <p style="color: #2d3436; margin: 5px 0;">
                                    <strong>Client:</strong> ${client.first_name} ${client.last_name}<br>
                                    <strong>Date:</strong> ${visitDate}<br>
                                    <strong>Time:</strong> ${visit.scheduled_start_time} - ${visit.scheduled_end_time}<br>
                                    <strong>Address:</strong> ${client.address_street}, ${client.address_city}, ${client.address_state} ${client.address_zip}
                                </p>
                                ${change_details ? `
                                <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
                                    <strong>Note:</strong> ${change_details}
                                </p>
                                ` : ''}
                            </div>

                            <p style="color: #2d3436;">
                                Please check your app for full details and clock in/out on time.<br>
                                <strong>Caring Hands Operations</strong>
                            </p>
                        </div>
                    </div>
                `
            });
            notifications.push({ recipient: 'caregiver', method: 'email' });
        }

        return Response.json({ 
            success: true, 
            message: 'Schedule change notifications sent',
            notifications_sent: notifications
        });
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
});