import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, ArrowLeft, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { format } from 'date-fns';
import CalendarView from '../components/schedule/CalendarView';
import DailyScheduleView from '../components/schedule/DailyScheduleView';
import AvailabilityManagement from '../components/schedule/AvailabilityManagement';
import TimeOffRequests from '../components/schedule/TimeOffRequests';
import PendingVisitRequests from '../components/schedule/PendingVisitRequests';

export default function MySchedule() {
    const [user, setUser] = useState(null);
    const [caregiver, setCaregiver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDayVisits, setSelectedDayVisits] = useState([]);
    const [showDailyView, setShowDailyView] = useState(false);
    const [activeTab, setActiveTab] = useState('calendar'); // calendar, availability, timeoff

    const queryClient = useQueryClient();

    // Fetch user and caregiver
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = await base44.auth.me();
                if (!currentUser) {
                    base44.auth.redirectToLogin(window.location.pathname);
                    return;
                }
                setUser(currentUser);

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
                toast.error('Failed to load schedule');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Fetch all visits for caregiver
    const { data: visits = [] } = useQuery({
        queryKey: ['caregiverVisits', caregiver?.id],
        queryFn: async () => {
            const allVisits = await base44.entities.Visit.filter({ caregiver_id: caregiver.id });
            
            // Enrich with client data
            return await Promise.all(allVisits.map(async (visit) => {
                const clients = await base44.entities.Client.filter({ id: visit.client_id });
                const client = clients[0];
                return {
                    ...visit,
                    client,
                    client_name: client ? `${client.first_name} ${client.last_name.charAt(0)}.` : 'Client',
                    client_address: client ? `${client.address_street}, ${client.address_city}, ${client.address_state} ${client.address_zip}` : ''
                };
            }));
        },
        enabled: !!caregiver
    });

    // Fetch time off requests
    const { data: timeOffRequests = [] } = useQuery({
        queryKey: ['timeOffRequests', caregiver?.id],
        queryFn: () => base44.entities.Time_Off.filter({ caregiver_id: caregiver.id }, '-requested_at'),
        enabled: !!caregiver
    });

    // Mock pending visit requests (in production, would fetch from backend)
    const pendingRequests = [
        {
            id: '1',
            visit_date: '2024-02-01',
            scheduled_start_time: '9:00 AM',
            scheduled_end_time: '1:00 PM',
            client_name: 'Sarah M.',
            location: 'Austin, TX 78701',
            distance: '12 miles from you',
            services: ['Companionship', 'Meal Prep'],
            pay_rate: '$20/hour',
            special_notes: 'Client prefers Spanish-speaking caregiver'
        }
    ];

    // Submit time off request
    const submitTimeOffMutation = useMutation({
        mutationFn: (data) => base44.entities.Time_Off.create({
            caregiver_id: caregiver.id,
            start_date: format(data.start_date, 'yyyy-MM-dd'),
            end_date: format(data.end_date, 'yyyy-MM-dd'),
            reason: data.reason,
            notes: data.notes,
            status: 'Pending',
            requested_at: new Date().toISOString()
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['timeOffRequests'] });
            toast.success('Request submitted! You\'ll be notified within 24 hours.');
        }
    });

    const handleDayClick = (date, dayVisits) => {
        setSelectedDate(date);
        setSelectedDayVisits(dayVisits);
        setShowDailyView(true);
    };

    const handleSaveAvailability = (availability) => {
        // In production, would update Caregiver entity
        console.log('Saving availability:', availability);
    };

    const handleAcceptVisit = (request) => {
        // In production, would create/confirm visit
        console.log('Accepting visit:', request);
    };

    const handleDeclineVisit = (request, reason, notes) => {
        // In production, would update visit request status
        console.log('Declining visit:', request, reason, notes);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#4a90e2] animate-spin" />
            </div>
        );
    }

    if (!user || !caregiver) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] py-6 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <Link to={createPageUrl('CaregiverDashboard')}>
                            <Button variant="ghost" className="text-[#4a90e2] hover:text-[#1e3a5f] mb-2">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold text-[#1e3a5f]">My Schedule</h1>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    <Button
                        onClick={() => setActiveTab('calendar')}
                        variant={activeTab === 'calendar' ? 'default' : 'outline'}
                        className={activeTab === 'calendar' ? 'bg-[#4a90e2]' : 'border-gray-300'}
                    >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Calendar
                    </Button>
                    <Button
                        onClick={() => setActiveTab('availability')}
                        variant={activeTab === 'availability' ? 'default' : 'outline'}
                        className={activeTab === 'availability' ? 'bg-[#4a90e2]' : 'border-gray-300'}
                    >
                        <Clock className="w-4 h-4 mr-2" />
                        Availability
                    </Button>
                    <Button
                        onClick={() => setActiveTab('timeoff')}
                        variant={activeTab === 'timeoff' ? 'default' : 'outline'}
                        className={activeTab === 'timeoff' ? 'bg-[#4a90e2]' : 'border-gray-300'}
                    >
                        Time Off
                    </Button>
                </div>

                {/* Pending Visit Requests (always visible at top) */}
                {pendingRequests.length > 0 && (
                    <PendingVisitRequests
                        requests={pendingRequests}
                        onAccept={handleAcceptVisit}
                        onDecline={handleDeclineVisit}
                    />
                )}

                {/* Tab Content */}
                {activeTab === 'calendar' && (
                    <>
                        <CalendarView 
                            visits={visits}
                            onDayClick={handleDayClick}
                        />
                        <DailyScheduleView
                            date={selectedDate}
                            visits={selectedDayVisits}
                            open={showDailyView}
                            onClose={() => setShowDailyView(false)}
                        />
                    </>
                )}

                {activeTab === 'availability' && (
                    <AvailabilityManagement
                        availability={{}}
                        onSave={handleSaveAvailability}
                    />
                )}

                {activeTab === 'timeoff' && (
                    <TimeOffRequests
                        requests={timeOffRequests}
                        onSubmitRequest={(data) => submitTimeOffMutation.mutate(data)}
                    />
                )}
            </div>
        </div>
    );
}