import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import CaregiverHeader from '../components/caregiver/CaregiverHeader';
import CaregiverAbout from '../components/caregiver/CaregiverAbout';
import CaregiverSpecializations from '../components/caregiver/CaregiverSpecializations';
import CaregiverCertifications from '../components/caregiver/CaregiverCertifications';
import VisitHistory from '../components/caregiver/VisitHistory';
import RatingForm from '../components/caregiver/RatingForm';
import MessageCenter from '../components/caregiver/MessageCenter';

export default function CaregiverProfile() {
    const [user, setUser] = useState(null);
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);

    // Get caregiver ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const caregiverId = urlParams.get('id');

    // Fetch user and verify authentication
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await base44.auth.me();
                if (!currentUser) {
                    base44.auth.redirectToLogin(window.location.pathname + window.location.search);
                    return;
                }
                setUser(currentUser);

                // Fetch client record
                const clients = await base44.entities.Client.filter({ email: currentUser.email });
                if (clients.length > 0) {
                    setClient(clients[0]);
                }
            } catch (error) {
                toast.error('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Fetch caregiver data
    const { data: caregiver, isLoading: caregiverLoading } = useQuery({
        queryKey: ['caregiver', caregiverId],
        queryFn: async () => {
            if (!caregiverId) throw new Error('No caregiver ID');
            const caregivers = await base44.entities.Caregiver.filter({ id: caregiverId });
            if (caregivers.length === 0) throw new Error('Caregiver not found');
            return caregivers[0];
        },
        enabled: !!caregiverId && !!user
    });

    // Fetch caregiver certifications
    const { data: certifications = [] } = useQuery({
        queryKey: ['certifications', caregiverId],
        queryFn: () => base44.entities.Caregiver_Certification.filter({ 
            caregiver_id: caregiverId 
        }),
        enabled: !!caregiverId && !!user
    });

    // Fetch visit history with this caregiver
    const { data: visits = [] } = useQuery({
        queryKey: ['visits', client?.id, caregiverId],
        queryFn: () => base44.entities.Visit.filter({ 
            client_id: client.id,
            caregiver_id: caregiverId
        }, '-visit_date'),
        enabled: !!client && !!caregiverId
    });

    const handleMessage = () => {
        toast.info('Message feature coming soon');
    };

    const handleRequest = () => {
        toast.success(`Request submitted for ${caregiver?.first_name}!`);
    };

    const handleRatingSubmit = (ratingData) => {
        console.log('Rating submitted:', ratingData);
    };

    if (loading || caregiverLoading) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#4a90e2] animate-spin" />
            </div>
        );
    }

    if (!user) {
        return null; // Redirecting to login
    }

    if (!caregiver) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-2xl font-bold text-[#1e3a5f] mb-4">Caregiver Not Found</h1>
                    <Link to={createPageUrl('Dashboard')}>
                        <Button className="bg-[#4a90e2] hover:bg-[#1e3a5f]">
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const hasUnratedVisits = visits.filter(v => v.status === 'Completed').length > 0;

    return (
        <div className="min-h-screen bg-[#f8f9fa] py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link to={createPageUrl('Dashboard')}>
                    <Button variant="ghost" className="mb-6 text-[#4a90e2] hover:text-[#1e3a5f]">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </Link>

                <div className="space-y-8">
                    {/* Header */}
                    <CaregiverHeader 
                        caregiver={caregiver}
                        onMessage={handleMessage}
                        onRequest={handleRequest}
                    />

                    {/* Two Column Layout */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* About */}
                            <CaregiverAbout caregiver={caregiver} />

                            {/* Specializations */}
                            <CaregiverSpecializations caregiver={caregiver} />

                            {/* Certifications */}
                            <CaregiverCertifications certifications={certifications} />

                            {/* Visit History */}
                            <VisitHistory 
                                visits={visits}
                                caregiverFirstName={caregiver.first_name}
                            />

                            {/* Rating Form (only if has unrated visits) */}
                            {hasUnratedVisits && (
                                <RatingForm 
                                    caregiverFirstName={caregiver.first_name}
                                    onSubmit={handleRatingSubmit}
                                />
                            )}
                        </div>

                        {/* Right Column */}
                        <div>
                            {/* Message Center */}
                            <MessageCenter caregiverFirstName={caregiver.first_name} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}