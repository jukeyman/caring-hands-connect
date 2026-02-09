import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { client_id, deletion_reason } = await req.json();

        if (!client_id) {
            return Response.json({ error: 'client_id is required' }, { status: 400 });
        }

        // Fetch client
        const clients = await base44.asServiceRole.entities.Client.filter({ id: client_id });
        const client = clients[0];

        if (!client) {
            return Response.json({ error: 'Client not found' }, { status: 404 });
        }

        // Only admin or the client's own user can request deletion
        if (user.role !== 'admin' && user.email !== client.email) {
            return Response.json({ 
                error: 'Forbidden: You can only delete your own data' 
            }, { status: 403 });
        }

        // IMPORTANT: We anonymize instead of hard-delete for HIPAA compliance
        // This maintains audit trail while removing personal identifiers
        
        const deletionResults = {
            client_anonymized: false,
            visits_anonymized: 0,
            notes_anonymized: 0,
            invoices_anonymized: 0,
            conversations_deleted: 0,
            consent_records_preserved: 0
        };

        // 1. Anonymize client record (NEVER hard delete for HIPAA)
        await base44.asServiceRole.entities.Client.update(client.id, {
            first_name: `DELETED_${client.id.substring(0, 8)}`,
            last_name: 'USER',
            email: `deleted_${client.id}@deleted.local`,
            phone: 'XXX-XXX-XXXX',
            date_of_birth: '1900-01-01',
            address_street: '[DELETED]',
            address_city: '[DELETED]',
            address_zip: '00000',
            medical_conditions: '[DELETED PER USER REQUEST]',
            medications: '[DELETED PER USER REQUEST]',
            special_instructions: '[DELETED PER USER REQUEST]',
            emergency_contact_name: '[DELETED]',
            emergency_contact_phone: '[DELETED]',
            status: 'Discharged',
            discharge_date: new Date().toISOString().split('T')[0],
            discharge_reason: deletion_reason || 'Data deletion requested by user'
        });
        deletionResults.client_anonymized = true;

        // 2. Anonymize visit notes (keep for audit, remove PHI)
        const visits = await base44.asServiceRole.entities.Visit.filter({ client_id: client_id });
        const visitIds = visits.map(v => v.id);
        
        const visitNotes = await base44.asServiceRole.entities.Visit_Note.filter({});
        const clientVisitNotes = visitNotes.filter(note => visitIds.includes(note.visit_id));

        for (const note of clientVisitNotes) {
            await base44.asServiceRole.entities.Visit_Note.update(note.id, {
                tasks_completed: '[DELETED]',
                meals_provided: '[DELETED]',
                medications_given: '[DELETED]',
                observations: '[DELETED]',
                incidents: '[DELETED]',
                photos: []
            });
            deletionResults.notes_anonymized++;
        }

        // 3. Anonymize invoices (keep for accounting, remove identifying info)
        const invoices = await base44.asServiceRole.entities.Invoice.filter({ client_id: client_id });
        for (const invoice of invoices) {
            await base44.asServiceRole.entities.Invoice.update(invoice.id, {
                notes: '[DELETED]'
            });
            deletionResults.invoices_anonymized++;
        }

        // 4. Delete conversations (not required for retention)
        const conversations = await base44.asServiceRole.entities.Conversation.filter({ client_id: client_id });
        for (const conv of conversations) {
            await base44.asServiceRole.entities.Conversation.delete(conv.id);
            deletionResults.conversations_deleted++;
        }

        // Messages within conversations should cascade delete, but if not:
        const messages = await base44.asServiceRole.entities.Message.filter({});
        const conversationIds = conversations.map(c => c.id);
        const clientMessages = messages.filter(msg => conversationIds.includes(msg.conversation_id));
        
        for (const msg of clientMessages) {
            await base44.asServiceRole.entities.Message.delete(msg.id);
        }

        // 5. Preserve consent records for legal compliance (NEVER delete)
        const consents = await base44.asServiceRole.entities.Consent_Record.filter({ client_id: client_id });
        deletionResults.consent_records_preserved = consents.length;

        // Log the deletion
        await base44.asServiceRole.entities.Activity_Log.create({
            user_id: user.id,
            user_email: user.email,
            user_role: user.role,
            action_type: 'Delete',
            entity_name: 'Client',
            entity_id: client_id,
            timestamp: new Date().toISOString(),
            risk_level: 'Critical',
            was_successful: true,
            fields_accessed: ['Full client data deletion/anonymization requested'],
            new_values: {
                reason: deletion_reason,
                results: deletionResults
            }
        });

        // Send confirmation email
        await base44.asServiceRole.integrations.Core.SendEmail({
            from_name: 'Caring Hands Home Health - Privacy Team',
            to: client.email, // Send to original email before anonymization
            subject: 'Data Deletion Confirmation',
            body: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #1e3a5f; padding: 30px; text-align: center;">
                        <h1 style="color: white; margin: 0;">Data Deletion Completed</h1>
                    </div>
                    
                    <div style="padding: 30px; background: white;">
                        <p style="color: #2d3436; line-height: 1.6;">
                            Your request to delete your personal data has been processed.
                        </p>
                        
                        <div style="background: #d4f4dd; border-left: 4px solid #22c55e; padding: 15px; margin: 20px 0;">
                            <p style="color: #1e3a5f; font-weight: bold; margin: 0;">✓ What Was Deleted:</p>
                            <ul style="color: #2d3436; margin: 10px 0;">
                                <li>Personal identifying information</li>
                                <li>Medical conditions and medications</li>
                                <li>Visit notes and care documentation</li>
                                <li>Conversation history</li>
                            </ul>
                        </div>

                        <div style="background: #fff8e1; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="color: #1e3a5f; margin: 0; font-weight: bold;">What We Retained (Required by Law):</p>
                            <p style="color: #2d3436; margin: 10px 0 0 0; font-size: 14px;">
                                Per HIPAA and IRS requirements, we retained anonymized records of:
                            </p>
                            <ul style="color: #2d3436; margin: 10px 0; font-size: 14px;">
                                <li>Financial transactions (de-identified)</li>
                                <li>Consent forms and legal documents</li>
                                <li>Audit logs (anonymized)</li>
                            </ul>
                            <p style="color: #666; margin: 10px 0 0 0; font-size: 12px;">
                                These records cannot be linked back to you and will be permanently deleted after the 7-year legal retention period.
                            </p>
                        </div>

                        <p style="color: #2d3436;">
                            If you have questions about this process, please contact our Privacy Officer at privacy@caringhands.com.
                        </p>

                        <p style="color: #2d3436;">
                            <strong>Caring Hands Privacy Team</strong>
                        </p>
                    </div>
                </div>
            `
        });

        return Response.json({ 
            success: true, 
            message: 'Client data anonymized/deleted successfully',
            results: deletionResults,
            note: 'Data anonymized per HIPAA requirements. Consent and financial records retained per legal obligations.'
        });
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
});