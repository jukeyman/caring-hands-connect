import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { target_user_id, start_date, end_date, entity_filter } = await req.json();

        // Determine which user's activity to audit
        const auditUserId = target_user_id || user.id;

        // Only admins can audit other users
        if (user.role !== 'admin' && auditUserId !== user.id) {
            return Response.json({ 
                error: 'Forbidden: You can only audit your own activity' 
            }, { status: 403 });
        }

        // Build query filters
        const query = { user_id: auditUserId };
        
        // Fetch activity logs
        const allLogs = await base44.asServiceRole.entities.Activity_Log.filter(query);

        // Apply date filtering
        let filteredLogs = allLogs;
        
        if (start_date) {
            const startDateTime = new Date(start_date);
            filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) >= startDateTime);
        }
        
        if (end_date) {
            const endDateTime = new Date(end_date);
            filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) <= endDateTime);
        }

        // Apply entity filter
        if (entity_filter) {
            filteredLogs = filteredLogs.filter(log => log.entity_name === entity_filter);
        }

        // Sort by timestamp (most recent first)
        filteredLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Generate summary statistics
        const summary = {
            total_activities: filteredLogs.length,
            by_action_type: {},
            by_entity: {},
            by_risk_level: {},
            phi_access_count: 0,
            failed_actions: 0,
            date_range: {
                start: start_date || filteredLogs[filteredLogs.length - 1]?.timestamp,
                end: end_date || filteredLogs[0]?.timestamp
            }
        };

        filteredLogs.forEach(log => {
            // Count by action type
            summary.by_action_type[log.action_type] = (summary.by_action_type[log.action_type] || 0) + 1;
            
            // Count by entity
            summary.by_entity[log.entity_name] = (summary.by_entity[log.entity_name] || 0) + 1;
            
            // Count by risk level
            summary.by_risk_level[log.risk_level] = (summary.by_risk_level[log.risk_level] || 0) + 1;
            
            // Count PHI access
            if (log.action_type === 'Access PHI' || 
                ['Client', 'Visit_Note', 'Care_Plan'].includes(log.entity_name)) {
                summary.phi_access_count++;
            }
            
            // Count failures
            if (!log.was_successful) {
                summary.failed_actions++;
            }
        });

        // Log this audit request
        await base44.asServiceRole.entities.Activity_Log.create({
            user_id: user.id,
            user_email: user.email,
            user_role: user.role,
            action_type: 'Read',
            entity_name: 'Activity_Log',
            timestamp: new Date().toISOString(),
            risk_level: 'Medium',
            was_successful: true,
            fields_accessed: [`Audited activity for user ${auditUserId}`]
        });

        return Response.json({ 
            success: true, 
            summary: summary,
            activities: filteredLogs,
            audited_user: auditUserId
        });
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
});