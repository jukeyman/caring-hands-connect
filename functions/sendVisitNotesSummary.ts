import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { visit_note_id } = await req.json();

        if (!visit_note_id) {
            return Response.json({ error: 'visit_note_id is required' }, { status: 400 });
        }

        // Fetch visit note
        const visitNotes = await base44.asServiceRole.entities.Visit_Note.filter({ id: visit_note_id });
        const visitNote = visitNotes[0];

        if (!visitNote) {
            return Response.json({ error: 'Visit note not found' }, { status: 404 });
        }

        // Fetch related visit
        const visits = await base44.asServiceRole.entities.Visit.filter({ id: visitNote.visit_id });
        const visit = visits[0];

        if (!visit) {
            return Response.json({ error: 'Visit not found' }, { status: 404 });
        }

        // Fetch client and caregiver
        const [clients, caregivers] = await Promise.all([
            base44.asServiceRole.entities.Client.filter({ id: visit.client_id }),
            base44.asServiceRole.entities.Caregiver.filter({ id: visitNote.caregiver_id })
        ]);

        const client = clients[0];
        const caregiver = caregivers[0];

        if (!client || !caregiver) {
            return Response.json({ error: 'Client or caregiver not found' }, { status: 404 });
        }

        // Fetch family members
        const familyMembers = await base44.asServiceRole.entities.Family_Member.filter({ 
            client_id: visit.client_id 
        });

        // Send to primary emergency contact
        const primaryRecipient = client.emergency_contact_name 
            ? client.email  // For now, send to client's email
            : client.email;

        await base44.asServiceRole.integrations.Core.SendEmail({
            from_name: 'Caring Hands Home Health',
            to: primaryRecipient,
            subject: `Daily Care Summary - ${new Date(visit.visit_date).toLocaleDateString()}`,
            body: `
                <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #4a90e2 0%, #1e3a5f 100%); padding: 30px; text-align: center;">
                        <h1 style="color: white; margin: 0;">Daily Care Summary</h1>
                        <p style="color: #d4af37; font-size: 16px; margin: 10px 0 0 0;">
                            ${new Date(visit.visit_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    
                    <div style="padding: 30px; background: white;">
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                            <h3 style="color: #1e3a5f; margin: 0 0 15px 0;">Visit Information</h3>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <p style="color: #666; margin: 0; font-size: 12px;">CAREGIVER</p>
                                    <p style="color: #1e3a5f; margin: 5px 0 0 0; font-weight: bold;">${caregiver.first_name} ${caregiver.last_name}</p>
                                </div>
                                <div>
                                    <p style="color: #666; margin: 0; font-size: 12px;">TIME</p>
                                    <p style="color: #1e3a5f; margin: 5px 0 0 0; font-weight: bold;">${visit.actual_start_time || visit.scheduled_start_time} - ${visit.actual_end_time || visit.scheduled_end_time}</p>
                                </div>
                            </div>
                        </div>

                        <div style="margin-bottom: 25px;">
                            <h3 style="color: #1e3a5f; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-bottom: 15px;">
                                Tasks Completed
                            </h3>
                            <p style="color: #2d3436; line-height: 1.8; white-space: pre-line;">${visitNote.tasks_completed}</p>
                        </div>

                        ${visitNote.meals_provided ? `
                        <div style="margin-bottom: 25px;">
                            <h3 style="color: #1e3a5f; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-bottom: 15px;">
                                Meals Provided
                            </h3>
                            <p style="color: #2d3436; line-height: 1.8; white-space: pre-line;">${visitNote.meals_provided}</p>
                        </div>
                        ` : ''}

                        ${visitNote.medications_given ? `
                        <div style="margin-bottom: 25px;">
                            <h3 style="color: #1e3a5f; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-bottom: 15px;">
                                Medications Administered
                            </h3>
                            <p style="color: #2d3436; line-height: 1.8; white-space: pre-line;">${visitNote.medications_given}</p>
                        </div>
                        ` : ''}

                        ${visitNote.client_mood ? `
                        <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                            <h3 style="color: #1e3a5f; margin: 0 0 10px 0;">Client Mood & Assessment</h3>
                            <p style="color: #2d3436; margin: 0;">
                                <strong>Mood:</strong> <span style="color: ${
                                    visitNote.client_mood === 'Excellent' ? '#22c55e' :
                                    visitNote.client_mood === 'Good' ? '#4a90e2' :
                                    visitNote.client_mood === 'Fair' ? '#f59e0b' : '#ef4444'
                                }; font-weight: bold;">${visitNote.client_mood}</span>
                            </p>
                        </div>
                        ` : ''}

                        ${visitNote.observations ? `
                        <div style="margin-bottom: 25px;">
                            <h3 style="color: #1e3a5f; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-bottom: 15px;">
                                Observations
                            </h3>
                            <p style="color: #2d3436; line-height: 1.8; white-space: pre-line;">${visitNote.observations}</p>
                        </div>
                        ` : ''}

                        ${visitNote.incidents ? `
                        <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
                            <h3 style="color: #ef4444; margin: 0 0 10px 0;">⚠️ Incident Report</h3>
                            <p style="color: #2d3436; margin: 0; line-height: 1.6;">${visitNote.incidents}</p>
                        </div>
                        ` : ''}

                        ${visitNote.photos && visitNote.photos.length > 0 ? `
                        <div style="margin-bottom: 25px;">
                            <h3 style="color: #1e3a5f; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-bottom: 15px;">
                                Photos from Today's Visit
                            </h3>
                            <p style="color: #666; font-size: 14px;">${visitNote.photos.length} photo(s) attached - view in your client portal</p>
                        </div>
                        ` : ''}

                        <div style="background: #d4f4dd; border-left: 4px solid #22c55e; padding: 20px; margin: 25px 0; border-radius: 4px;">
                            <p style="color: #1e3a5f; font-weight: bold; margin: 0 0 10px 0;">✓ Visit Completed</p>
                            <p style="color: #2d3436; margin: 0; font-size: 14px;">
                                ${client.first_name} received quality care today. View full details in your 
                                <a href="${req.headers.get('origin')}/Dashboard" style="color: #4a90e2; font-weight: bold;">client portal</a>.
                            </p>
                        </div>

                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
                            <p style="color: #1e3a5f; margin: 0; font-weight: bold;">Questions or Concerns?</p>
                            <p style="color: #2d3436; margin: 10px 0 0 0;">
                                Contact us 24/7 at <strong style="color: #4a90e2;">(512) 555-1234</strong>
                            </p>
                        </div>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
                        <p style="margin: 0;">Caring Hands Home Health | Austin, Texas</p>
                        <p style="margin: 5px 0 0 0;">TX License #023937 | Available 24/7</p>
                    </div>
                </div>
            `
        });

        return Response.json({ 
            success: true, 
            message: 'Visit notes summary sent successfully' 
        });
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
});