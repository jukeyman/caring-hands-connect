import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import twilio from 'npm:twilio@5.3.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
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

        const client = twilio(accountSid, authToken);

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

        const clientData = clients[0];
        const caregiver = caregivers[0];

        if (!clientData) {
            return Response.json({ error: 'Client not found' }, { status: 404 });
        }

        const caregiverName = caregiver 
            ? `${caregiver.first_name} ${caregiver.last_name}`
            : 'your caregiver';

        const visitDate = new Date(visit.visit_date).toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });

        const message = `Caring Hands: Your visit with ${caregiverName} is confirmed for ${visitDate} at ${visit.scheduled_start_time}. Reply CANCEL to cancel.`;

        // Send SMS
        const smsResponse = await client.messages.create({
            body: message,
            from: twilioPhone,
            to: clientData.phone
        });

        return Response.json({ 
            success: true, 
            message: 'SMS sent successfully',
            message_sid: smsResponse.sid
        });
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
});