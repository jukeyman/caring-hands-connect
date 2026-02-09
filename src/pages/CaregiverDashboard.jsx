import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import WelcomeHeader from '../components/caregiver-dashboard/WelcomeHeader';
import TodaysVisits from '../components/caregiver-dashboard/TodaysVisits';
import WeeklySchedule from '../components/caregiver-dashboard/WeeklySchedule';
import QuickActions from '../components/caregiver-dashboard/QuickActions';
import PendingTasks from '../components/caregiver-dashboard/PendingTasks';
import Announcements from '../components/caregiver-dashboard/Announcements';
import Support from '../components/caregiver-dashboard/Support';

export default function CaregiverDashboard() {
    const [user, setUser] = useState(null);
    const [caregiver, setCaregiver] = useState(null);
    const [loading, setLoading] = useState(true);

    const queryClient = useQueryClient();

    // Fetch user and caregiver profile
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = await base44.auth.me();
                if (!currentUser) {
                    base44.auth.redirectToLogin(window.location.pathname);
                    return;
                }
                setUser(currentUser);

                // Find caregiver record by email
                const caregivers = await base44.entities.Caregiver.filter({ 
                    email: currentUser.email,
                    employment_status: 'Active'
                });
                
                if (caregivers.length === 0) {
                    toast.error('Caregiver profile not found');
                    return;
                }
                
                setCaregiver(caregivers[0]);
            } catch (error) {
                toast.error('Failed to load dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Fetch today's visits
    const today = format(new Date(), 'yyyy-MM-dd');
    const { data: todayVisits = [] } = useQuery({
        queryKey: ['todayVisits', caregiver?.id, today],
        queryFn: async () => {
            const visits = await base44.entities.Visit.filter({ 
                caregiver_id: caregiver.id,
                visit_date: today
            });

            // Enrich with client data
            return await Promise.all(visits.map(async (visit) => {
                const clients = await base44.entities.Client.filter({ id: visit.client_id });
                const client = clients[0];
                return {
                    ...visit,
                    client,
                    client_name: client ? `${client.first_name} ${client.last_name.charAt(0)}.` : 'Client',
                    client_address: client ? `${client.address_street}, ${client.address_city}, ${client.address_state} ${client.address_zip}` : '',
                    special_notes: client?.special_instructions
                };
            }));
        },
        enabled: !!caregiver
    });

    // Fetch this week's visits
    const { data: weekVisits = [] } = useQuery({
        queryKey: ['weekVisits', caregiver?.id],
        queryFn: () => base44.entities.Visit.filter({ caregiver_id: caregiver.id }),
        enabled: !!caregiver
    });

    // Fetch announcements
    const { data: announcements = [] } = useQuery({
        queryKey: ['announcements'],
        queryFn: () => base44.entities.Announcement.filter({ 
            is_active: true,
            target_audience: 'Caregivers'
        }, '-published_at'),
        enabled: !!caregiver
    });

    // Clock in mutation
    const clockInMutation = useMutation({
        mutationFn: (visitId) => base44.entities.Visit.update(visitId, {
            status: 'In Progress',
            actual_start_time: format(new Date(), 'HH:mm')
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todayVisits'] });
        }
    });

    // Clock out mutation
    const clockOutMutation = useMutation({
        mutationFn: (visitId) => base44.entities.Visit.update(visitId, {
            status: 'Completed',
            actual_end_time: format(new Date(), 'HH:mm')
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todayVisits'] });
        }
    });

    // Calculate stats
    const stats = {
        todayVisits: todayVisits.length,
        weekHours: weekVisits.reduce((sum, v) => sum + (v.total_hours || 4), 0),
        monthHours: 72 // Mock for now
    };

    // Mock pending tasks
    const pendingTasks = [
        {
            id: '1',
            title: 'Submit visit notes for Margaret S. (Jan 26)',
            description: 'Complete daily visit documentation',
            priority: 'Overdue'
        },
        {
            id: '2',
            title: 'Renew CPR certification (expires Feb 15)',
            description: 'Schedule renewal before expiration',
            priority: 'Due Soon'
        }
    ];

    const handleQuickAction = (action) => {
        const actions = {
            'clock': () => toast.info('Use Clock In/Out buttons on visit cards'),
            'schedule': () => toast.info('Full schedule view coming soon'),
            'notes': () => toast.info('Visit notes feature coming soon'),
            'messages': () => toast.info('Messaging feature coming soon'),
            'certifications': () => toast.info('Certifications view coming soon'),
            'payroll': () => toast.info('Payroll view coming soon')
        };
        actions[action]?.();
    };

    const handleViewFullSchedule = () => {
        toast.info('Full calendar view coming soon');
    };

    const handleCompleteTask = (taskId) => {
        console.log('Task completed:', taskId);
    };

    const handleReadMore = (announcement) => {
        toast.info('Announcement details coming soon');
    };

    const handleCall = () => {
        window.location.href = 'tel:5125551234';
    };

    const handleMessage = () => {
        toast.info('Messaging feature coming soon');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#4a90e2] animate-spin" />
            </div>
        );
    }

    if (!user || !caregiver) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
                <Card className="max-w-md">
                    <CardContent className="py-12 text-center">
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">
                            Access Denied
                        </h2>
                        <p className="text-gray-600">
                            This dashboard is only accessible to active caregivers.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] pb-20">
            <div className="max-w-4xl mx-auto px-4 py-6">
                {/* Welcome Header */}
                <WelcomeHeader 
                    caregiverName={caregiver.first_name}
                    stats={stats}
                />

                {/* Today's Visits */}
                <TodaysVisits 
                    visits={todayVisits}
                    onClockIn={(visitId) => clockInMutation.mutate(visitId)}
                    onClockOut={(visitId) => clockOutMutation.mutate(visitId)}
                />

                {/* Weekly Schedule */}
                <div className="my-6">
                    <WeeklySchedule 
                        visits={weekVisits}
                        onViewFull={handleViewFullSchedule}
                    />
                </div>

                {/* Quick Actions */}
                <QuickActions onAction={handleQuickAction} />

                {/* Pending Tasks */}
                <div className="mb-6">
                    <PendingTasks 
                        tasks={pendingTasks}
                        onComplete={handleCompleteTask}
                    />
                </div>

                {/* Announcements */}
                {announcements.length > 0 && (
                    <div className="mb-6">
                        <Announcements 
                            announcements={announcements}
                            onReadMore={handleReadMore}
                        />
                    </div>
                )}

                {/* Support */}
                <Support 
                    onCall={handleCall}
                    onMessage={handleMessage}
                />
            </div>
        </div>
    );
}