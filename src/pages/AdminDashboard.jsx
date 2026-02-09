import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Loader2, LayoutDashboard } from 'lucide-react';
import { toast } from 'sonner';
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns';
import KPIOverview from '../components/admin/KPIOverview';
import ActiveVisitsNow from '../components/admin/ActiveVisitsNow';
import PendingActions from '../components/admin/PendingActions';
import RecentInquiries from '../components/admin/RecentInquiries';
import DashboardCharts from '../components/admin/DashboardCharts';
import AlertsNotifications from '../components/admin/AlertsNotifications';

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user and verify admin
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = await base44.auth.me();
                if (!currentUser) {
                    base44.auth.redirectToLogin(window.location.pathname);
                    return;
                }

                if (currentUser.role !== 'admin') {
                    toast.error('Access denied. Admin only.');
                    return;
                }

                setUser(currentUser);
            } catch (error) {
                toast.error('Failed to load dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Fetch active clients
    const { data: activeClients = [] } = useQuery({
        queryKey: ['activeClients'],
        queryFn: () => base44.entities.Client.filter({ status: 'Active' }),
        enabled: !!user
    });

    // Fetch active caregivers
    const { data: activeCaregivers = [] } = useQuery({
        queryKey: ['activeCaregivers'],
        queryFn: () => base44.entities.Caregiver.filter({ employment_status: 'Active' }),
        enabled: !!user
    });

    // Fetch active visits (in progress)
    const { data: activeVisits = [] } = useQuery({
        queryKey: ['activeVisits'],
        queryFn: async () => {
            const visits = await base44.entities.Visit.filter({ status: 'In Progress' });
            return await Promise.all(visits.map(async (visit) => {
                const [clients, caregivers] = await Promise.all([
                    base44.entities.Client.filter({ id: visit.client_id }),
                    base44.entities.Caregiver.filter({ id: visit.caregiver_id })
                ]);
                return {
                    ...visit,
                    client_name: clients[0] ? `${clients[0].first_name} ${clients[0].last_name}` : 'Client',
                    client_city: clients[0]?.address_city || 'Austin',
                    caregiver_name: caregivers[0] ? `${caregivers[0].first_name} ${caregivers[0].last_name}` : 'Caregiver'
                };
            }));
        },
        enabled: !!user,
        refetchInterval: 30000 // Refresh every 30 seconds
    });

    // Fetch recent inquiries (last 24 hours)
    const { data: recentInquiries = [] } = useQuery({
        queryKey: ['recentInquiries'],
        queryFn: async () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            const inquiries = await base44.entities.Inquiry.list('-created_date', 20);
            return inquiries.filter(inq => 
                new Date(inq.created_date) >= yesterday &&
                inq.status === 'New'
            ).slice(0, 5);
        },
        enabled: !!user
    });

    // Calculate KPIs
    const kpis = {
        active_clients: activeClients.length,
        clients_change: 5, // Mock - would calculate from historical data
        active_caregivers: activeCaregivers.length,
        caregivers_change: -2, // Mock
        monthly_revenue: 125450, // Mock - would sum from invoices
        revenue_change_percent: 12, // Mock
        profit_margin: 38.5 // Mock
    };

    // Mock pending actions
    const pendingActions = [
        {
            type: 'visit_approval',
            title: 'Visit Approval Required',
            description: 'Margaret S. - Late clock-in (9:02 AM vs 9:00 AM)',
            priority: 'medium',
            action_label: 'Approve Hours'
        },
        {
            type: 'hour_dispute',
            title: 'Hour Dispute',
            description: 'Robert J. claims 4.5h vs recorded 4.0h',
            priority: 'high',
            action_label: 'Review Dispute'
        },
        {
            type: 'certification_expiring',
            title: 'Certification Expiring',
            description: 'Jessica M. - CPR expires in 10 days',
            priority: 'high',
            action_label: 'Send Reminder'
        }
    ];

    // Mock chart data
    const revenueData = [
        { month: 'Feb', revenue: 98000 },
        { month: 'Mar', revenue: 105000 },
        { month: 'Apr', revenue: 110000 },
        { month: 'May', revenue: 108000 },
        { month: 'Jun', revenue: 115000 },
        { month: 'Jul', revenue: 118000 },
        { month: 'Aug', revenue: 112000 },
        { month: 'Sep', revenue: 120000 },
        { month: 'Oct', revenue: 119000 },
        { month: 'Nov', revenue: 122000 },
        { month: 'Dec', revenue: 125000 },
        { month: 'Jan', revenue: 125450 }
    ];

    const clientGrowthData = [
        { month: 'Feb', clients: 38 },
        { month: 'Mar', clients: 40 },
        { month: 'Apr', clients: 41 },
        { month: 'May', clients: 39 },
        { month: 'Jun', clients: 42 },
        { month: 'Jul', clients: 43 },
        { month: 'Aug', clients: 44 },
        { month: 'Sep', clients: 45 },
        { month: 'Oct', clients: 46 },
        { month: 'Nov', clients: 47 },
        { month: 'Dec', clients: 43 },
        { month: 'Jan', clients: 48 }
    ];

    // Mock alerts
    const alerts = [
        {
            type: 'certification_expiring',
            severity: 'high',
            title: 'Certification Expiring Soon',
            message: "Caregiver Jessica M.'s CPR expires in 10 days",
            action_label: 'Send Reminder'
        },
        {
            type: 'payment_overdue',
            severity: 'high',
            title: 'Payment Overdue',
            message: 'Client Margaret S. has overdue payment of $1,250',
            action_label: 'Contact Client'
        },
        {
            type: 'high_value_lead',
            severity: 'medium',
            title: 'High-Value Lead',
            message: 'New inquiry from high-value zip code (78746) - Live-in care needed',
            action_label: 'Prioritize Follow-up'
        }
    ];

    const handleAction = (action) => {
        toast.info('Action handler coming soon');
    };

    const handleContact = (inquiry, method) => {
        if (method === 'phone') {
            window.location.href = `tel:${inquiry.phone}`;
        } else {
            toast.info('Email client coming soon');
        }
    };

    const handleResolveAlert = (alert) => {
        toast.info('Alert resolution coming soon');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#4a90e2] animate-spin" />
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
                    <p className="text-gray-600">This page is only accessible to administrators.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] py-6 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <LayoutDashboard className="w-8 h-8 text-[#4a90e2]" />
                        <h1 className="text-3xl font-bold text-[#1e3a5f]">Operations Dashboard</h1>
                    </div>
                    <p className="text-gray-600">Real-time overview of business operations</p>
                </div>

                {/* KPI Overview */}
                <KPIOverview kpis={kpis} />

                {/* Today's Operations */}
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-[#1e3a5f] mb-4">Today's Operations</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <ActiveVisitsNow visits={activeVisits} />
                        <PendingActions actions={pendingActions} onAction={handleAction} />
                        <RecentInquiries inquiries={recentInquiries} onContact={handleContact} />
                    </div>
                </div>

                {/* Charts */}
                <DashboardCharts 
                    revenueData={revenueData}
                    clientGrowthData={clientGrowthData}
                />

                {/* Alerts */}
                <AlertsNotifications 
                    alerts={alerts}
                    onResolve={handleResolveAlert}
                />
            </div>
        </div>
    );
}