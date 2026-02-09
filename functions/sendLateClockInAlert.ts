import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import twilio from 'npm:twilio@5.3.4';

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

        // Get Twilio credentials
        const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
        const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
        const twilioPhone = Deno.env.get('TWILIO_PHONE_NUMBER');

        if (!accountSid || !authToken || !twilioPhone) {
            return Response.json({ 
                error: 'Twilio credentials not configured' 
            }, { status: 500 });
        }

        const twilioClient = twilio(accountSid, authToken);

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

        if (!client || !caregiver) {
            return Response.json({ error: 'Client or caregiver not found' }, { status: 404 });
        }

        const message = `⚠️ ALERT: ${caregiver.first_name} ${caregiver.last_name} is 15+ minutes late for visit with ${client.first_name} ${client.last_name} (scheduled ${visit.scheduled_start_time}). Please check in.`;

        // Fetch all admin users
        const admins = await base44.asServiceRole.entities.User.filter({ role: 'admin' });

        const smsSent = [];
        
        // Send SMS to all admins (in practice, admins should have phone in User entity)
        for (const admin of admins) {
            // For now, send to a default admin number or skip if no phone
            // In production, you'd want to add phone to User entity
            const adminPhone = '+15125551234'; // Replace with actual admin phone from User entity
            
            try {
                const smsResponse = await twilioClient.messages.create({
                    body: message,
                    from: twilioPhone,
                    to: adminPhone
                });
                
                smsSent.push({
                    admin: admin.email,
                    message_sid: smsResponse.sid
                });
            } catch (smsError) {
                console.error(`Failed to send SMS to ${admin.email}:`, smsError);
            }
        }

        return Response.json({ 
            success: true, 
            message: 'Late clock-in alerts sent',
            alerts_sent: smsSent.length
        });
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
});