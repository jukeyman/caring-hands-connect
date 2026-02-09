import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { format } from 'date-fns';
import ClockInScreen from '../components/clock/ClockInScreen';
import VisitInProgressScreen from '../components/clock/VisitInProgressScreen';
import ClockOutScreen from '../components/clock/ClockOutScreen';

export default function ClockInOut() {
    const [user, setUser] = useState(null);
    const [caregiver, setCaregiver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [screen, setScreen] = useState('clock-in'); // clock-in, in-progress, clock-out

    const queryClient = useQueryClient();

    // Get visit ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const visitId = urlParams.get('visitId');

    // Fetch user and caregiver
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = await base44.auth.me();
                if (!currentUser) {
                    base44.auth.redirectToLogin(window.location.pathname + window.location.search);
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
                toast.error('Failed to load visit');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Fetch visit
    const { data: visit } = useQuery({
        queryKey: ['visit', visitId],
        queryFn: async () => {
            const visits = await base44.entities.Visit.filter({ id: visitId });
            if (visits.length === 0) throw new Error('Visit not found');
            return visits[0];
        },
        enabled: !!visitId && !!caregiver
    });

    // Fetch client
    const { data: client } = useQuery({
        queryKey: ['client', visit?.client_id],
        queryFn: async () => {
            const clients = await base44.entities.Client.filter({ id: visit.client_id });
            return clients[0];
        },
        enabled: !!visit
    });

    // Determine initial screen based on visit status
    useEffect(() => {
        if (visit) {
            if (visit.status === 'In Progress') {
                setScreen('in-progress');
            } else if (visit.status === 'Scheduled') {
                setScreen('clock-in');
            } else {
                setScreen('clock-in');
            }
        }
    }, [visit]);

    // Clock in mutation
    const clockInMutation = useMutation({
        mutationFn: async (data) => {
            const now = new Date();
            await base44.entities.Visit.update(visitId, {
                status: 'In Progress',
                actual_start_time: format(now, 'HH:mm'),
                clock_in_gps_lat: data.gps_lat,
                clock_in_gps_long: data.gps_long
            });
            return now;
        },
        onSuccess: (startTime) => {
            queryClient.invalidateQueries({ queryKey: ['visit', visitId] });
            setScreen('in-progress');
            toast.success('Clocked in successfully!');
        }
    });

    // Clock out mutation
    const clockOutMutation = useMutation({
        mutationFn: async (data) => {
            const now = new Date();
            const startTime = new Date(visit.actual_start_time);
            const totalHours = differenceInMinutes(now, startTime) / 60;

            await base44.entities.Visit.update(visitId, {
                status: 'Completed',
                actual_end_time: format(now, 'HH:mm'),
                clock_out_gps_lat: data.gps_lat,
                clock_out_gps_long: data.gps_long,
                total_hours: parseFloat(totalHours.toFixed(2))
            });

            // Create visit note
            await base44.entities.Visit_Note.create({
                visit_id: visitId,
                caregiver_id: caregiver.id,
                tasks_completed: data.completed_tasks?.map(id => 
                    tasks.find(t => t.id === id)?.label
                ).join(', ') || '',
                observations: data.notes,
                signature_caregiver: data.signature,
                submitted_at: now.toISOString()
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['visit', visitId] });
            toast.success('Clocked out successfully!');
            window.location.href = createPageUrl('CaregiverDashboard');
        }
    });

    const handleClockIn = (data) => {
        clockInMutation.mutate(data);
    };

    const handleClockOut = (data) => {
        clockOutMutation.mutate(data);
    };

    // Mock tasks from care plan
    const tasks = [
        { id: 1, label: 'Assist with shower and dressing' },
        { id: 2, label: 'Administer 9am medications' },
        { id: 3, label: 'Prepare breakfast' },
        { id: 4, label: 'Prepare lunch' },
        { id: 5, label: 'Light housekeeping' }
    ];

    if (loading || !visit || !client) {
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
            {/* Back Button */}
            <div className="max-w-2xl mx-auto mb-6">
                <Link to={createPageUrl('CaregiverDashboard')}>
                    <Button variant="ghost" className="text-[#4a90e2] hover:text-[#1e3a5f]">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </Link>
            </div>

            {/* Screen Router */}
            {screen === 'clock-in' && (
                <ClockInScreen 
                    visit={visit}
                    client={client}
                    onClockIn={handleClockIn}
                />
            )}

            {screen === 'in-progress' && (
                <VisitInProgressScreen 
                    visit={visit}
                    client={client}
                    startTime={visit.actual_start_time}
                    onClockOut={() => setScreen('clock-out')}
                />
            )}

            {screen === 'clock-out' && (
                <ClockOutScreen 
                    visit={visit}
                    client={client}
                    startTime={visit.actual_start_time}
                    tasks={tasks}
                    onClockOut={handleClockOut}
                />
            )}
        </div>
    );
}