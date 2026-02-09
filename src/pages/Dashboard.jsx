import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import UpcomingVisits from '../components/dashboard/UpcomingVisits';
import ActiveCarePlan from '../components/dashboard/ActiveCarePlan';
import RecentVisitNotes from '../components/dashboard/RecentVisitNotes';
import BillingSummary from '../components/dashboard/BillingSummary';
import MessagesPreview from '../components/dashboard/MessagesPreview';
import QuickLinks from '../components/dashboard/QuickLinks';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user and client data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = await base44.auth.me();
                if (!currentUser) {
                    base44.auth.redirectToLogin(window.location.pathname);
                    return;
                }
                setUser(currentUser);

                // Fetch client record associated with this user
                const clients = await base44.entities.Client.filter({ email: currentUser.email });
                if (clients.length > 0) {
                    setClient(clients[0]);
                }
            } catch (error) {
                toast.error('Failed to load dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Fetch upcoming visits
    const { data: visits = [] } = useQuery({
        queryKey: ['visits', client?.id],
        queryFn: async () => {
            if (!client) return [];
            const allVisits = await base44.entities.Visit.filter({ 
                client_id: client.id,
                status: 'Scheduled'
            }, 'visit_date');
            return allVisits.filter(v => new Date(v.visit_date) >= new Date());
        },
        enabled: !!client
    });

    // Fetch active care plan
    const { data: carePlan } = useQuery({
        queryKey: ['care_plan', client?.id],
        queryFn: async () => {
            if (!client) return null;
            const plans = await base44.entities.Care_Plan.filter({ 
                client_id: client.id,
                status: 'Active'
            });
            return plans[0] || null;
        },
        enabled: !!client
    });

    // Fetch recent visit notes
    const { data: visitNotes = [] } = useQuery({
        queryKey: ['visit_notes', client?.id],
        queryFn: async () => {
            if (!client) return [];
            const allVisits = await base44.entities.Visit.filter({ 
                client_id: client.id,
                status: 'Completed'
            }, '-visit_date');
            
            const recentVisits = allVisits.slice(0, 3);
            const notes = [];
            
            for (const visit of recentVisits) {
                const visitNotesList = await base44.entities.Visit_Note.filter({ visit_id: visit.id });
                if (visitNotesList.length > 0) {
                    notes.push({
                        ...visitNotesList[0],
                        visit_date: visit.visit_date,
                        caregiver_name: 'Caregiver' // Would fetch from caregiver entity in production
                    });
                }
            }
            
            return notes;
        },
        enabled: !!client
    });

    // Mock messages data (would be from a real Message entity)
    const mockMessages = [
        {
            from: "Care Coordinator Sarah",
            subject: "Your care plan has been updated",
            preview: "Hi, we've made the adjustments you requested to your Monday schedule...",
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            unread: true
        },
        {
            from: "Caregiver Jessica",
            subject: "Thank you for the kind words!",
            preview: "It's my pleasure to care for your mother. She's such a joy...",
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            unread: false
        },
        {
            from: "Billing Department",
            subject: "Invoice #1023 is ready",
            preview: "Your invoice for the period Jan 1-15 is now available...",
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            unread: false
        }
    ];

    // Mock billing data (would be from Invoice entity)
    const mockBilling = {
        balance_due: 1250.00,
        next_invoice_due: '2024-02-05',
        payment_method: 'Visa ending in 4242'
    };

    const handleQuickAction = (action) => {
        toast.info(`${action} feature coming soon`);
    };

    const handleNavigate = (destination) => {
        toast.info(`Navigating to ${destination}...`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#4a90e2] animate-spin" />
            </div>
        );
    }

    if (!user) {
        return null; // Redirecting to login
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Welcome Header */}
                <WelcomeHeader 
                    firstName={client?.first_name || user.full_name?.split(' ')[0] || 'there'} 
                    onAction={handleQuickAction}
                />

                {/* Main Dashboard Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Upcoming Visits */}
                        <UpcomingVisits 
                            visits={visits}
                            onSchedule={() => handleQuickAction('schedule')}
                        />

                        {/* Active Care Plan */}
                        <ActiveCarePlan 
                            carePlan={carePlan}
                            onAdjust={() => handleQuickAction('care_plan')}
                        />

                        {/* Recent Visit Notes */}
                        <RecentVisitNotes visitNotes={visitNotes} />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Billing Summary */}
                        <BillingSummary 
                            billing={mockBilling}
                            onViewInvoices={() => handleNavigate('invoices')}
                            onMakePayment={() => handleNavigate('payment')}
                        />

                        {/* Messages Preview */}
                        <MessagesPreview 
                            messages={mockMessages}
                            onViewAll={() => handleNavigate('messages')}
                        />

                        {/* Quick Links */}
                        <QuickLinks onNavigate={handleNavigate} />
                    </div>
                </div>
            </div>
        </div>
    );
}