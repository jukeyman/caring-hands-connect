import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import twilio from 'npm:twilio@5.3.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { visit_id, caregiver_id } = await req.json();

        if (!visit_id || !caregiver_id) {
            return Response.json({ 
                error: 'visit_id and caregiver_id are required' 
            }, { status: 400 });
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

        const client = twilio(accountSid, authToken);

        // Fetch visit and caregiver
        const [visits, caregivers] = await Promise.all([
            base44.asServiceRole.entities.Visit.filter({ id: visit_id }),
            base44.asServiceRole.entities.Caregiver.filter({ id: caregiver_id })
        ]);

        const visit = visits[0];
        const caregiver = caregivers[0];

        if (!visit || !caregiver) {
            return Response.json({ error: 'Visit or caregiver not found' }, { status: 404 });
        }

        // Fetch client
        const clients = await base44.asServiceRole.entities.Client.filter({ id: visit.client_id });
        const clientData = clients[0];

        if (!clientData) {
            return Response.json({ error: 'Client not found' }, { status: 404 });
        }

        const visitDate = new Date(visit.visit_date).toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });

        const message = `Caring Hands: New visit assigned - ${clientData.first_name} ${clientData.last_name} on ${visitDate} at ${visit.scheduled_start_time}. Reply YES to confirm or NO to decline.`;

        // Send SMS to caregiver
        const smsResponse = await client.messages.create({
            body: message,
            from: twilioPhone,
            to: caregiver.phone
        });

        return Response.json({ 
            success: true, 
            message: 'Assignment SMS sent to caregiver',
            message_sid: smsResponse.sid
        });
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
});