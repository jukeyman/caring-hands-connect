import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { jsPDF } from 'npm:jspdf@2.5.2';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { client_id } = await req.json();

        if (!client_id) {
            return Response.json({ error: 'client_id is required' }, { status: 400 });
        }

        // Verify user has access to this client data
        const clients = await base44.asServiceRole.entities.Client.filter({ id: client_id });
        const client = clients[0];

        if (!client) {
            return Response.json({ error: 'Client not found' }, { status: 404 });
        }

        // Only admin or the client's own user can export
        if (user.role !== 'admin' && user.email !== client.email) {
            return Response.json({ error: 'Forbidden: You can only export your own data' }, { status: 403 });
        }

        // Fetch all related data
        const [carePlans, visits, visitNotes, invoices, payments, familyMembers, conversations] = await Promise.all([
            base44.asServiceRole.entities.Care_Plan.filter({ client_id: client_id }),
            base44.asServiceRole.entities.Visit.filter({ client_id: client_id }),
            base44.asServiceRole.entities.Visit_Note.filter({}),
            base44.asServiceRole.entities.Invoice.filter({ client_id: client_id }),
            base44.asServiceRole.entities.Payment.filter({ client_id: client_id }),
            base44.asServiceRole.entities.Family_Member.filter({ client_id: client_id }),
            base44.asServiceRole.entities.Conversation.filter({ client_id: client_id })
        ]);

        // Filter visit notes for this client's visits
        const visitIds = visits.map(v => v.id);
        const clientVisitNotes = visitNotes.filter(note => visitIds.includes(note.visit_id));

        // Create PDF
        const doc = new jsPDF();
        let yPos = 20;

        // Header
        doc.setFontSize(20);
        doc.text('HIPAA Data Export', 20, yPos);
        yPos += 10;
        
        doc.setFontSize(10);
        doc.text(`Caring Hands Home Health`, 20, yPos);
        yPos += 5;
        doc.text(`Generated: ${new Date().toLocaleString()}`, 20, yPos);
        yPos += 5;
        doc.text(`TX License #023937`, 20, yPos);
        yPos += 15;

        // Client Information
        doc.setFontSize(14);
        doc.text('CLIENT INFORMATION', 20, yPos);
        yPos += 8;
        
        doc.setFontSize(10);
        doc.text(`Name: ${client.first_name} ${client.last_name}`, 20, yPos);
        yPos += 6;
        doc.text(`Date of Birth: ${client.date_of_birth}`, 20, yPos);
        yPos += 6;
        doc.text(`Email: ${client.email}`, 20, yPos);
        yPos += 6;
        doc.text(`Phone: ${client.phone}`, 20, yPos);
        yPos += 6;
        doc.text(`Address: ${client.address_street}, ${client.address_city}, ${client.address_state} ${client.address_zip}`, 20, yPos);
        yPos += 10;

        // Medical Information
        if (yPos > 250) { doc.addPage(); yPos = 20; }
        doc.setFontSize(14);
        doc.text('MEDICAL INFORMATION', 20, yPos);
        yPos += 8;
        
        doc.setFontSize(10);
        if (client.medical_conditions) {
            doc.text(`Medical Conditions: ${client.medical_conditions}`, 20, yPos, { maxWidth: 170 });
            yPos += 12;
        }
        if (client.medications) {
            doc.text(`Medications: ${client.medications}`, 20, yPos, { maxWidth: 170 });
            yPos += 12;
        }
        yPos += 5;

        // Care Plans
        if (carePlans.length > 0) {
            if (yPos > 240) { doc.addPage(); yPos = 20; }
            doc.setFontSize(14);
            doc.text(`CARE PLANS (${carePlans.length})`, 20, yPos);
            yPos += 8;
            
            doc.setFontSize(9);
            carePlans.forEach(plan => {
                if (yPos > 270) { doc.addPage(); yPos = 20; }
                doc.text(`- ${plan.care_level} | Hours/Week: ${plan.hours_per_week} | Status: ${plan.status}`, 25, yPos);
                yPos += 5;
            });
            yPos += 5;
        }

        // Visits Summary
        if (visits.length > 0) {
            if (yPos > 240) { doc.addPage(); yPos = 20; }
            doc.setFontSize(14);
            doc.text(`VISITS (${visits.length} total)`, 20, yPos);
            yPos += 8;
            
            doc.setFontSize(9);
            doc.text(`Total completed visits: ${visits.filter(v => v.status === 'Completed').length}`, 25, yPos);
            yPos += 10;
        }

        // Visit Notes Summary
        if (clientVisitNotes.length > 0) {
            if (yPos > 240) { doc.addPage(); yPos = 20; }
            doc.setFontSize(14);
            doc.text(`VISIT NOTES (${clientVisitNotes.length} total)`, 20, yPos);
            yPos += 8;
            
            doc.setFontSize(8);
            doc.text('See JSON export for full details', 25, yPos);
            yPos += 10;
        }

        // Financial Summary
        if (invoices.length > 0) {
            if (yPos > 240) { doc.addPage(); yPos = 20; }
            doc.setFontSize(14);
            doc.text('FINANCIAL RECORDS', 20, yPos);
            yPos += 8;
            
            doc.setFontSize(10);
            const totalBilled = invoices.reduce((sum, inv) => sum + (inv.total_amount || 0), 0);
            const totalPaid = payments.reduce((sum, pay) => sum + (pay.amount || 0), 0);
            
            doc.text(`Total Invoiced: $${totalBilled.toFixed(2)}`, 25, yPos);
            yPos += 6;
            doc.text(`Total Paid: $${totalPaid.toFixed(2)}`, 25, yPos);
            yPos += 10;
        }

        // Footer
        doc.setFontSize(8);
        doc.text('This document contains Protected Health Information (PHI) under HIPAA.', 20, 280);
        doc.text('Handle according to privacy policies. Destroy securely when no longer needed.', 20, 285);

        const pdfBytes = doc.output('arraybuffer');

        // Also create JSON export
        const jsonExport = {
            export_date: new Date().toISOString(),
            client: client,
            care_plans: carePlans,
            visits: visits,
            visit_notes: clientVisitNotes,
            invoices: invoices,
            payments: payments,
            family_members: familyMembers,
            conversations: conversations
        };

        // Log the export
        await base44.asServiceRole.entities.Activity_Log.create({
            user_id: user.id,
            user_email: user.email,
            user_role: user.role,
            action_type: 'Export Data',
            entity_name: 'Client',
            entity_id: client_id,
            timestamp: new Date().toISOString(),
            risk_level: 'High',
            was_successful: true,
            fields_accessed: ['Full data export requested']
        });

        return Response.json({
            success: true,
            pdf_data: Array.from(new Uint8Array(pdfBytes)),
            json_export: jsonExport
        });
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
});