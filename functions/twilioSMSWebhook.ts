import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Parse Twilio webhook data (form-urlencoded)
        const formData = await req.formData();
        const from = formData.get('From');
        const body = formData.get('Body')?.toUpperCase().trim();
        const messageSid = formData.get('MessageSid');

        if (!from || !body) {
            return new Response('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
                headers: { 'Content-Type': 'text/xml' }
            });
        }

        // Handle CANCEL response
        if (body === 'CANCEL') {
            // Find recent visit for this phone number
            const clients = await base44.asServiceRole.entities.Client.filter({ phone: from });
            
            if (clients.length > 0) {
                const client = clients[0];
                
                // Find upcoming visits
                const upcomingVisits = await base44.asServiceRole.entities.Visit.filter({
                    client_id: client.id,
                    status: 'Scheduled'
                });

                if (upcomingVisits.length > 0) {
                    // Cancel the most recent scheduled visit
                    const visitToCancel = upcomingVisits[0];
                    
                    await base44.asServiceRole.entities.Visit.update(visitToCancel.id, {
                        status: 'Cancelled',
                        cancellation_reason: 'Cancelled via SMS'
                    });

                    const responseMessage = `Your visit on ${new Date(visitToCancel.visit_date).toLocaleDateString()} has been cancelled. Our team will contact you to reschedule. Call (512) 555-1234 for immediate assistance.`;

                    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
                        <Response>
                            <Message>${responseMessage}</Message>
                        </Response>`, {
                        headers: { 'Content-Type': 'text/xml' }
                    });
                }
            }
        }

        // Handle YES/NO responses from caregivers
        if (body === 'YES' || body === 'NO') {
            const caregivers = await base44.asServiceRole.entities.Caregiver.filter({ phone: from });
            
            if (caregivers.length > 0) {
                const caregiver = caregivers[0];
                
                if (body === 'YES') {
                    const responseMessage = `Thank you for confirming! Visit details are in your app. Reply HELP for assistance.`;
                    
                    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
                        <Response>
                            <Message>${responseMessage}</Message>
                        </Response>`, {
                        headers: { 'Content-Type': 'text/xml' }
                    });
                } else {
                    // Notify admins
                    const admins = await base44.asServiceRole.entities.User.filter({ role: 'admin' });
                    
                    for (const admin of admins) {
                        await base44.asServiceRole.integrations.Core.SendEmail({
                            to: admin.email,
                            subject: 'Caregiver Declined Visit Assignment',
                            body: `${caregiver.first_name} ${caregiver.last_name} declined a visit assignment via SMS. Please reassign the visit.`
                        });
                    }

                    const responseMessage = `We understand. Our team will reassign this visit. Thank you for letting us know.`;
                    
                    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
                        <Response>
                            <Message>${responseMessage}</Message>
                        </Response>`, {
                        headers: { 'Content-Type': 'text/xml' }
                    });
                }
            }
        }

        // Handle STOP/UNSUBSCRIBE
        if (body === 'STOP' || body === 'UNSUBSCRIBE') {
            return new Response(`<?xml version="1.0" encoding="UTF-8"?>
                <Response>
                    <Message>You have been unsubscribed from SMS notifications. Call (512) 555-1234 to re-enable.</Message>
                </Response>`, {
                headers: { 'Content-Type': 'text/xml' }
            });
        }

        // Default response
        return new Response(`<?xml version="1.0" encoding="UTF-8"?>
            <Response>
                <Message>Thank you for your message. For assistance, call (512) 555-1234 or visit your client portal.</Message>
            </Response>`, {
            headers: { 'Content-Type': 'text/xml' }
        });

    } catch (error) {
        return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, {
            headers: { 'Content-Type': 'text/xml' }
        });
    }
});