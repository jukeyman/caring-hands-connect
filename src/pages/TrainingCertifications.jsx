import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, ArrowLeft, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { format, differenceInDays } from 'date-fns';
import CertificationStatusOverview from '../components/training/CertificationStatusOverview';
import RequiredCertifications from '../components/training/RequiredCertifications';
import TrainingLibrary from '../components/training/TrainingLibrary';
import InProgressTraining from '../components/training/InProgressTraining';
import CompletedTraining from '../components/training/CompletedTraining';
import BackgroundCheckStatus from '../components/training/BackgroundCheckStatus';
import ProfessionalDevelopment from '../components/training/ProfessionalDevelopment';
import UploadCertificationModal from '../components/training/UploadCertificationModal';

export default function TrainingCertifications() {
    const [user, setUser] = useState(null);
    const [caregiver, setCaregiver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showUploadModal, setShowUploadModal] = useState(false);

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
                toast.error('Failed to load training data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Fetch certifications
    const { data: certifications = [] } = useQuery({
        queryKey: ['certifications', caregiver?.id],
        queryFn: () => base44.entities.Caregiver_Certification.filter({ 
            caregiver_id: caregiver.id 
        }, '-expiration_date'),
        enabled: !!caregiver
    });

    // Calculate stats
    const stats = {
        total: 6,
        active: certifications.filter(c => c.status === 'Valid').length,
        expiring: certifications.filter(c => {
            const days = differenceInDays(new Date(c.expiration_date), new Date());
            return days <= 60 && days > 0;
        }).length,
        expiringText: certifications.find(c => {
            const days = differenceInDays(new Date(c.expiration_date), new Date());
            return days <= 60 && days > 0;
        }) ? 'CPR expires in 45 days' : 'None expiring soon',
        expired: certifications.filter(c => c.status === 'Expired').length,
        completed_courses: 12,
        total_hours: 24
    };

    // Mock required certifications (combine actual + missing)
    const requiredCerts = [
        ...certifications,
        {
            certification_type: 'Dementia Care Specialist',
            status: 'Not Completed',
            requirement: 'Optional (increases pay rate by $2/hr)'
        }
    ];

    // Mock training courses
    const trainingCourses = [
        {
            id: '1',
            title: 'Dementia Care 101',
            duration: '2 hours',
            type: 'Video Course',
            topic: 'Dementia Care',
            certification: 'Dementia Care Specialist',
            pay_increase: '+$2/hour',
            progress: 0,
            required: false
        },
        {
            id: '2',
            title: 'Annual Safety Training',
            duration: '1 hour',
            type: 'Video Course',
            topic: 'Safety',
            deadline: '2024-02-15',
            progress: 0,
            required: true
        },
        {
            id: '3',
            title: 'Fall Prevention & Safety',
            duration: '1.5 hours',
            type: 'Video Course',
            topic: 'Fall Prevention',
            progress: 100,
            required: false
        }
    ];

    // Mock in-progress courses
    const inProgressCourses = [
        {
            id: '1',
            title: 'Dementia Care 101',
            progress: 45,
            time_remaining: '1 hour 10 minutes',
            modules: [
                { title: 'Module 1: Understanding Dementia', completed: true },
                { title: 'Module 2: Communication Strategies', current: true },
                { title: 'Module 3: Behavioral Management', completed: false }
            ]
        }
    ];

    // Mock completed courses
    const completedCourses = [
        {
            title: 'Fall Prevention & Safety',
            completed_date: '2024-01-10',
            score: 95
        }
    ];

    // Mock background check
    const backgroundCheck = {
        status: 'Completed & Approved',
        date_completed: '2024-01-05',
        next_renewal: '2026-01-05',
        provider: 'First Advantage'
    };

    // Mock professional development tracks
    const devTracks = [
        {
            name: 'Dementia Care Specialist',
            courses_count: 3,
            total_hours: 6,
            pay_increase: '+$2/hour',
            badge: 'Specialist',
            progress: 0
        },
        {
            name: 'Medication Management Expert',
            courses_count: 2,
            total_hours: 4,
            pay_increase: '+$1.50/hour',
            badge: 'Expert',
            progress: 0
        },
        {
            name: 'Live-In Care Certified',
            courses_count: 4,
            total_hours: 8,
            unlocks: 'Live-in assignments ($200-$250/day)',
            progress: 0
        }
    ];

    const uploadCertMutation = useMutation({
        mutationFn: async (data) => {
            await base44.entities.Caregiver_Certification.create({
                caregiver_id: caregiver.id,
                certification_type: data.certification_type,
                issue_date: format(data.issue_date, 'yyyy-MM-dd'),
                expiration_date: format(data.expiration_date, 'yyyy-MM-dd'),
                status: 'Valid',
                document: 'uploaded_cert.pdf' // In production, upload file first
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['certifications'] });
            setShowUploadModal(false);
            toast.success('Certificate uploaded! We\'ll review within 24 hours.');
        }
    });

    const handleRenew = (cert) => {
        toast.info('Renewal process coming soon');
    };

    const handleViewCert = (cert) => {
        toast.info('Certificate viewer coming soon');
    };

    const handleStartCourse = (course) => {
        toast.info('Course player coming soon');
    };

    const handleResumeCourse = (course) => {
        toast.info('Course player coming soon');
    };

    const handleStartTrack = (track) => {
        toast.info('Track details coming soon');
    };

    const handleRenewBackground = () => {
        toast.info('Background check renewal coming soon');
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
                        <h1 className="text-3xl font-bold text-[#1e3a5f]">Training & Certifications</h1>
                    </div>
                    <Button
                        onClick={() => setShowUploadModal(true)}
                        className="bg-[#4a90e2] hover:bg-[#1e3a5f]"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Upload Certification
                    </Button>
                </div>

                {/* Status Overview */}
                <CertificationStatusOverview stats={stats} />

                {/* Required Certifications */}
                <RequiredCertifications 
                    certifications={requiredCerts}
                    onRenew={handleRenew}
                    onViewCert={handleViewCert}
                />

                {/* In Progress Training */}
                <InProgressTraining 
                    courses={inProgressCourses}
                    onResume={handleResumeCourse}
                />

                {/* Training Library */}
                <TrainingLibrary 
                    courses={trainingCourses}
                    onStartCourse={handleStartCourse}
                />

                {/* Professional Development */}
                <ProfessionalDevelopment 
                    tracks={devTracks}
                    onStartTrack={handleStartTrack}
                />

                {/* Completed Training */}
                <CompletedTraining courses={completedCourses} />

                {/* Background Check */}
                <BackgroundCheckStatus 
                    backgroundCheck={backgroundCheck}
                    onRenew={handleRenewBackground}
                />

                {/* Upload Modal */}
                <UploadCertificationModal
                    open={showUploadModal}
                    onClose={() => setShowUploadModal(false)}
                    onSubmit={(data) => uploadCertMutation.mutate(data)}
                />
            </div>
        </div>
    );
}