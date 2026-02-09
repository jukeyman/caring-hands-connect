import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import CarePlanOverview from '../components/careplan/CarePlanOverview';
import ScheduleDetails from '../components/careplan/ScheduleDetails';
import ServicesIncluded from '../components/careplan/ServicesIncluded';
import CareTeam from '../components/careplan/CareTeam';
import SpecialInstructions from '../components/careplan/SpecialInstructions';
import EmergencyContacts from '../components/careplan/EmergencyContacts';
import RequestAdjustmentModal from '../components/careplan/RequestAdjustmentModal';
import CarePlanHistory from '../components/careplan/CarePlanHistory';

export default function CarePlan() {
    const [user, setUser] = useState(null);
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);

    const queryClient = useQueryClient();

    // Fetch user and client
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = await base44.auth.me();
                if (!currentUser) {
                    base44.auth.redirectToLogin(window.location.pathname);
                    return;
                }
                setUser(currentUser);

                const clients = await base44.entities.Client.filter({ email: currentUser.email });
                if (clients.length > 0) {
                    setClient(clients[0]);
                }
            } catch (error) {
                toast.error('Failed to load care plan');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Fetch active care plan
    const { data: carePlans = [] } = useQuery({
        queryKey: ['carePlans', client?.id],
        queryFn: () => base44.entities.Care_Plan.filter({ 
            client_id: client.id,
            status: 'Active'
        }),
        enabled: !!client
    });

    const carePlan = carePlans[0];

    // Fetch caregivers assigned to this plan
    const { data: visits = [] } = useQuery({
        queryKey: ['visits', client?.id],
        queryFn: () => base44.entities.Visit.filter({ client_id: client.id }),
        enabled: !!client
    });

    // Get unique caregiver IDs from visits
    const caregiverIds = [...new Set(visits.map(v => v.caregiver_id))].filter(Boolean);

    const { data: caregivers = [] } = useQuery({
        queryKey: ['caregivers', caregiverIds],
        queryFn: async () => {
            if (caregiverIds.length === 0) return [];
            const allCaregivers = await base44.entities.Caregiver.list();
            return allCaregivers.filter(cg => caregiverIds.includes(cg.id));
        },
        enabled: caregiverIds.length > 0
    });

    // Fetch family members (emergency contacts)
    const { data: emergencyContacts = [] } = useQuery({
        queryKey: ['familyMembers', client?.id],
        queryFn: () => base44.entities.Family_Member.filter({ client_id: client.id }),
        enabled: !!client
    });

    // Update care plan mutation
    const updateCarePlanMutation = useMutation({
        mutationFn: (updates) => base44.entities.Care_Plan.update(carePlan.id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carePlans', client?.id] });
        }
    });

    // Submit adjustment request mutation
    const submitAdjustmentMutation = useMutation({
        mutationFn: (requestData) => base44.entities.Care_Plan_Adjustment_Request.create(requestData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adjustmentRequests'] });
        }
    });

    const handleUpdateInstructions = async (updates) => {
        await updateCarePlanMutation.mutateAsync(updates);
    };

    const handleSubmitAdjustment = async (requestData) => {
        await submitAdjustmentMutation.mutateAsync(requestData);
    };

    const handleMessageCoordinator = () => {
        window.location.href = createPageUrl('Messages');
    };

    const handleUpdateContacts = () => {
        toast.info('Contact update feature coming soon');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#4a90e2] animate-spin" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    if (!carePlan) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to={createPageUrl('Dashboard')}>
                        <Button variant="ghost" className="mb-6 text-[#4a90e2] hover:text-[#1e3a5f]">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <Card>
                        <CardContent className="py-12 text-center">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">
                                No Active Care Plan
                            </h2>
                            <p className="text-gray-600 mb-6">
                                You don't have an active care plan yet. Please contact us to get started.
                            </p>
                            <Link to={createPageUrl('Contact')}>
                                <Button className="bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f]">
                                    Contact Care Coordinator
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link to={createPageUrl('Dashboard')}>
                    <Button variant="ghost" className="mb-6 text-[#4a90e2] hover:text-[#1e3a5f]">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </Link>

                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">Your Care Plan</h1>
                    <p className="text-gray-600">View your personalized care plan details and request changes</p>
                </div>

                {/* Care Plan Overview */}
                <div className="mb-8">
                    <CarePlanOverview 
                        carePlan={carePlan}
                        clientName={client?.first_name + ' ' + client?.last_name}
                    />
                </div>

                {/* Main CTA */}
                <div className="mb-8 text-center">
                    <Button 
                        size="lg"
                        onClick={() => setShowAdjustmentModal(true)}
                        className="bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f] font-bold text-lg px-8 py-6"
                    >
                        Request Care Plan Adjustment
                    </Button>
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        <ScheduleDetails 
                            carePlan={carePlan}
                            onRequestChange={() => setShowAdjustmentModal(true)}
                        />
                        <ServicesIncluded 
                            carePlan={carePlan}
                            onRequestChange={() => setShowAdjustmentModal(true)}
                        />
                        <SpecialInstructions 
                            carePlan={carePlan}
                            onUpdate={handleUpdateInstructions}
                        />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <CareTeam 
                            caregivers={caregivers}
                            onMessage={handleMessageCoordinator}
                        />
                        <EmergencyContacts 
                            contacts={emergencyContacts}
                            onUpdate={handleUpdateContacts}
                        />
                        <CarePlanHistory carePlan={carePlan} />
                    </div>
                </div>

                {/* Request Adjustment Modal */}
                <RequestAdjustmentModal 
                    open={showAdjustmentModal}
                    onClose={() => setShowAdjustmentModal(false)}
                    carePlanId={carePlan?.id}
                    clientId={client?.id}
                    onSubmit={handleSubmitAdjustment}
                />
            </div>
        </div>
    );
}