import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, CalendarDays } from 'lucide-react';
import { toast } from 'sonner';
import { startOfWeek, format } from 'date-fns';
import SchedulerCalendarView from '../components/admin/SchedulerCalendarView';
import UnassignedVisitsQueue from '../components/admin/UnassignedVisitsQueue';
import CaregiverAvailabilityMatrix from '../components/admin/CaregiverAvailabilityMatrix';
import RecurringScheduleManager from '../components/admin/RecurringScheduleManager';

export default function AdminScheduling() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));
    const [colorMode, setColorMode] = useState('client');

    const queryClient = useQueryClient();

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
                toast.error('Failed to load scheduling data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Fetch active caregivers
    const { data: caregivers = [] } = useQuery({
        queryKey: ['activeCaregivers'],
        queryFn: () => base44.entities.Caregiver.filter({ employment_status: 'Active' }),
        enabled: !!user
    });

    // Fetch all visits for the week
    const { data: allVisits = [] } = useQuery({
        queryKey: ['weekVisits', format(weekStart, 'yyyy-MM-dd')],
        queryFn: async () => {
            const visits = await base44.entities.Visit.list('-visit_date', 500);
            
            // Enrich with client data
            return await Promise.all(visits.map(async (visit) => {
                const clients = await base44.entities.Client.filter({ id: visit.client_id });
                return {
                    ...visit,
                    client_name: clients[0] ? `${clients[0].first_name} ${clients[0].last_name}` : 'Client',
                    client_city: clients[0]?.address_city || 'Austin'
                };
            }));
        },
        enabled: !!user
    });

    // Fetch unassigned visits
    const { data: unassignedVisits = [] } = useQuery({
        queryKey: ['unassignedVisits'],
        queryFn: async () => {
            const visits = await base44.entities.Visit.filter({ 
                status: 'Scheduled'
            });
            
            const unassigned = visits.filter(v => !v.caregiver_id);
            
            return await Promise.all(unassigned.map(async (visit) => {
                const clients = await base44.entities.Client.filter({ id: visit.client_id });
                const client = clients[0];
                
                // Mock best match logic
                const bestMatch = caregivers.length > 0 ? {
                    name: `${caregivers[0].first_name} ${caregivers[0].last_name}`,
                    score: 80,
                    reason: 'Skills, location, and availability match'
                } : null;

                return {
                    ...visit,
                    client_name: client ? `${client.first_name} ${client.last_name}` : 'Client',
                    client_city: client?.address_city || 'Austin',
                    services: ['Personal Care', 'Companionship'],
                    preferred_caregiver: null,
                    best_match: bestMatch
                };
            }));
        },
        enabled: !!user && caregivers.length > 0
    });

    // Fetch recurring schedules
    const { data: recurringSchedules = [] } = useQuery({
        queryKey: ['recurringSchedules'],
        queryFn: async () => {
            const schedules = await base44.entities.Recurring_Schedule.filter({ is_active: true });
            
            return await Promise.all(schedules.map(async (schedule) => {
                const [clients, cgvrs] = await Promise.all([
                    base44.entities.Client.filter({ id: schedule.client_id }),
                    base44.entities.Caregiver.filter({ id: schedule.caregiver_id })
                ]);
                
                return {
                    ...schedule,
                    client_name: clients[0] ? `${clients[0].first_name} ${clients[0].last_name}` : 'Client',
                    caregiver_name: cgvrs[0] ? `${cgvrs[0].first_name} ${cgvrs[0].last_name}` : 'Caregiver'
                };
            }));
        },
        enabled: !!user
    });

    // Update visit mutation (for drag-drop)
    const updateVisitMutation = useMutation({
        mutationFn: ({ visitId, updates }) => base44.entities.Visit.update(visitId, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['weekVisits'] });
            queryClient.invalidateQueries({ queryKey: ['unassignedVisits'] });
            toast.success('Visit reassigned successfully');
        },
        onError: () => {
            toast.error('Failed to reassign visit');
        }
    });

    // Handle drag and drop
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const visitId = result.draggableId;
        const [newCaregiverId, newDate] = result.destination.droppableId.split('-');

        const visit = allVisits.find(v => v.id === visitId);
        if (!visit) return;

        // Check if actually changed
        if (visit.caregiver_id === newCaregiverId && format(new Date(visit.visit_date), 'yyyy-MM-dd') === newDate) {
            return;
        }

        updateVisitMutation.mutate({
            visitId,
            updates: {
                caregiver_id: newCaregiverId,
                visit_date: newDate
            }
        });
    };

    const handleAssignCaregiver = (visit) => {
        toast.info('Assignment modal coming soon');
    };

    const handleQuickAssign = (caregiver, date, timeBlock) => {
        toast.info(`Quick assign for ${caregiver.first_name} on ${format(date, 'MMM d')} (${timeBlock}) coming soon`);
    };

    const handleGenerateVisits = async (days) => {
        toast.success(`Generating visits for next ${days} days...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.success('Visits generated successfully!');
    };

    const handleEditSchedule = (schedule) => {
        toast.info('Edit recurring schedule coming soon');
    };

    // Mock availability data (in production, fetch from Time_Off and scheduled visits)
    const availability = {};

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
                        <CalendarDays className="w-8 h-8 text-[#4a90e2]" />
                        <h1 className="text-3xl font-bold text-[#1e3a5f]">Scheduling Management</h1>
                    </div>
                    <p className="text-gray-600">Manage caregiver assignments and recurring schedules</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Unassigned Visits Queue */}
                    <div className="lg:col-span-1">
                        <UnassignedVisitsQueue
                            visits={unassignedVisits}
                            onAssign={handleAssignCaregiver}
                        />
                    </div>

                    {/* Weekly Calendar */}
                    <div className="lg:col-span-2">
                        <SchedulerCalendarView
                            weekStart={weekStart}
                            caregivers={caregivers}
                            visits={allVisits}
                            onDateChange={setWeekStart}
                            onDragEnd={handleDragEnd}
                            colorMode={colorMode}
                        />
                    </div>
                </div>

                {/* Caregiver Availability Matrix */}
                <CaregiverAvailabilityMatrix
                    weekStart={weekStart}
                    caregivers={caregivers}
                    availability={availability}
                    onQuickAssign={handleQuickAssign}
                />

                {/* Recurring Schedules */}
                <RecurringScheduleManager
                    schedules={recurringSchedules}
                    onGenerateVisits={handleGenerateVisits}
                    onEdit={handleEditSchedule}
                />
            </div>
        </div>
    );
}