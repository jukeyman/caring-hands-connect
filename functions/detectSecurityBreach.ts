import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (user?.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        // Analysis window: last 24 hours
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        // Fetch recent activity logs
        const recentLogs = await base44.asServiceRole.entities.Activity_Log.filter({});
        const last24Hours = recentLogs.filter(log => 
            new Date(log.timestamp) >= twentyFourHoursAgo
        );

        const alerts = [];
        const userActivityMap = {};

        // Analyze patterns
        last24Hours.forEach(log => {
            if (!userActivityMap[log.user_id]) {
                userActivityMap[log.user_id] = {
                    email: log.user_email,
                    total_actions: 0,
                    failed_logins: 0,
                    phi_accesses: 0,
                    unusual_hours: 0,
                    ip_addresses: new Set()
                };
            }

            const userActivity = userActivityMap[log.user_id];
            userActivity.total_actions++;

            // Track failed logins
            if (log.action_type === 'Failed Login') {
                userActivity.failed_logins++;
            }

            // Track PHI access
            if (['Client', 'Visit_Note', 'Care_Plan'].includes(log.entity_name) && 
                log.action_type === 'Read') {
                userActivity.phi_accesses++;
            }

            // Track IP addresses
            if (log.ip_address) {
                userActivity.ip_addresses.add(log.ip_address);
            }

            // Check for unusual hours (10pm - 6am)
            const hour = new Date(log.timestamp).getHours();
            if (hour >= 22 || hour <= 6) {
                userActivity.unusual_hours++;
            }
        });

        // Detect suspicious patterns
        Object.entries(userActivityMap).forEach(([userId, activity]) => {
            // Pattern 1: Multiple failed logins (potential brute force)
            if (activity.failed_logins >= 5) {
                alerts.push({
                    type: 'Failed Login Pattern',
                    severity: 'High',
                    user_id: userId,
                    user_email: activity.email,
                    description: `${activity.failed_logins} failed login attempts in 24 hours`,
                    recommendation: 'Lock account and investigate'
                });
            }

            // Pattern 2: Excessive PHI access (potential data harvesting)
            if (activity.phi_accesses > 50) {
                alerts.push({
                    type: 'Suspicious Activity',
                    severity: 'Critical',
                    user_id: userId,
                    user_email: activity.email,
                    description: `${activity.phi_accesses} PHI record accesses in 24 hours`,
                    recommendation: 'Review access patterns immediately'
                });
            }

            // Pattern 3: Multiple IP addresses (potential account compromise)
            if (activity.ip_addresses.size > 3) {
                alerts.push({
                    type: 'Suspicious Activity',
                    severity: 'Medium',
                    user_id: userId,
                    user_email: activity.email,
                    description: `Activity from ${activity.ip_addresses.size} different IP addresses`,
                    recommendation: 'Verify with user if legitimate'
                });
            }

            // Pattern 4: Unusual hours activity
            if (activity.unusual_hours > 10) {
                alerts.push({
                    type: 'Suspicious Activity',
                    severity: 'Medium',
                    user_id: userId,
                    user_email: activity.email,
                    description: `${activity.unusual_hours} actions during unusual hours (10pm-6am)`,
                    recommendation: 'Verify if user typically works these hours'
                });
            }
        });

        // Create security incidents for critical alerts
        for (const alert of alerts) {
            if (alert.severity === 'Critical' || alert.severity === 'High') {
                await base44.asServiceRole.entities.Security_Incident.create({
                    incident_type: alert.type === 'Failed Login Pattern' 
                        ? 'Failed Login Pattern' 
                        : 'Suspicious Activity',
                    severity: alert.severity,
                    detected_at: new Date().toISOString(),
                    user_id: alert.user_id,
                    user_email: alert.user_email,
                    description: alert.description,
                    status: 'Open',
                    breach_notification_required: alert.severity === 'Critical'
                });

                // Alert admins for critical incidents
                if (alert.severity === 'Critical') {
                    const admins = await base44.asServiceRole.entities.User.filter({ role: 'admin' });
                    
                    for (const admin of admins) {
                        await base44.asServiceRole.integrations.Core.SendEmail({
                            from_name: 'Caring Hands Security System',
                            to: admin.email,
                            subject: '🚨 CRITICAL SECURITY ALERT',
                            body: `
                                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                                    <div style="background: #dc2626; padding: 30px; text-align: center;">
                                        <h1 style="color: white; margin: 0;">🚨 CRITICAL SECURITY ALERT</h1>
                                    </div>
                                    
                                    <div style="padding: 30px; background: white;">
                                        <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 20px; margin: 20px 0;">
                                            <p style="color: #dc2626; font-weight: bold; margin: 0;">Incident Type: ${alert.type}</p>
                                            <p style="color: #2d3436; margin: 10px 0 0 0;">${alert.description}</p>
                                            <p style="color: #2d3436; margin: 10px 0 0 0;">
                                                <strong>User:</strong> ${alert.user_email}<br>
                                                <strong>Detected:</strong> ${new Date().toLocaleString()}<br>
                                                <strong>Action Required:</strong> ${alert.recommendation}
                                            </p>
                                        </div>

                                        <p style="color: #2d3436;">
                                            Log in to the admin dashboard immediately to investigate.
                                        </p>
                                    </div>
                                </div>
                            `
                        });
                    }
                }
            }
        }

        return Response.json({ 
            success: true, 
            alerts_found: alerts.length,
            alerts: alerts,
            analysis_period: '24 hours',
            total_users_analyzed: Object.keys(userActivityMap).length
        });
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
});