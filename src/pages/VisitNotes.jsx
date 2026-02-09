import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, ArrowLeft, Save, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import VisitHeader from '../components/visit-notes/VisitHeader';
import TasksCompleted from '../components/visit-notes/TasksCompleted';
import ClientAssessment from '../components/visit-notes/ClientAssessment';
import ActivitiesEngagement from '../components/visit-notes/ActivitiesEngagement';
import DetailedNotes from '../components/visit-notes/DetailedNotes';
import PhotoUpload from '../components/visit-notes/PhotoUpload';
import IncidentReport from '../components/visit-notes/IncidentReport';
import Signatures from '../components/visit-notes/Signatures';

export default function VisitNotes() {
    const [user, setUser] = useState(null);
    const [caregiver, setCaregiver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [saving, setSaving] = useState(false);

    const queryClient = useQueryClient();

    // Get visit ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const visitId = urlParams.get('visitId');

    // Form state
    const [tasks, setTasks] = useState([
        { id: 1, label: 'Personal Care (ADLs)', completed: true, type: 'personal-care' },
        { id: 2, label: 'Medication Management', completed: true, type: 'medication' },
        { id: 3, label: 'Meal Preparation', completed: true, type: 'meals' },
        { id: 4, label: 'Light Housekeeping', completed: true, type: 'housekeeping' },
        { id: 5, label: 'Transportation', completed: false, type: 'transportation' }
    ]);
    const [taskDetails, setTaskDetails] = useState({});
    const [assessment, setAssessment] = useState({});
    const [activities, setActivities] = useState({});
    const [notes, setNotes] = useState('');
    const [photos, setPhotos] = useState([]);
    const [hasIncident, setHasIncident] = useState(false);
    const [incident, setIncident] = useState({});
    const [signatures, setSignatures] = useState({});

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

    // Auto-save every 30 seconds
    useEffect(() => {
        const autoSave = setInterval(() => {
            if (visitId && caregiver) {
                localStorage.setItem(`visit-notes-draft-${visitId}`, JSON.stringify({
                    tasks, taskDetails, assessment, activities, notes, photos, hasIncident, incident, signatures
                }));
            }
        }, 30000);

        return () => clearInterval(autoSave);
    }, [visitId, tasks, taskDetails, assessment, activities, notes, photos, hasIncident, incident, signatures]);

    // Load draft on mount
    useEffect(() => {
        if (visitId) {
            const draft = localStorage.getItem(`visit-notes-draft-${visitId}`);
            if (draft) {
                const parsed = JSON.parse(draft);
                setTasks(parsed.tasks || tasks);
                setTaskDetails(parsed.taskDetails || {});
                setAssessment(parsed.assessment || {});
                setActivities(parsed.activities || {});
                setNotes(parsed.notes || '');
                setPhotos(parsed.photos || []);
                setHasIncident(parsed.hasIncident || false);
                setIncident(parsed.incident || {});
                setSignatures(parsed.signatures || {});
            }
        }
    }, [visitId]);

    const handleTaskToggle = (taskId) => {
        setTasks(tasks.map(t => 
            t.id === taskId ? { ...t, completed: !t.completed } : t
        ));
    };

    const handleTaskDetailsChange = (taskId, details) => {
        setTaskDetails(prev => ({
            ...prev,
            [taskId]: { ...prev[taskId], ...details }
        }));
    };

    const handleAssessmentChange = (updates) => {
        setAssessment(prev => ({ ...prev, ...updates }));
    };

    const handleActivitiesChange = (updates) => {
        setActivities(prev => ({ ...prev, ...updates }));
    };

    const handleIncidentChange = (updates) => {
        setIncident(prev => ({ ...prev, ...updates }));
    };

    const handleSignaturesChange = (updates) => {
        setSignatures(prev => ({ ...prev, ...updates }));
    };

    const validate = () => {
        if (!signatures.caregiverSignature?.trim()) {
            toast.error('Caregiver signature is required');
            return false;
        }
        if (!signatures.certified) {
            toast.error('Please certify that the information is accurate');
            return false;
        }
        if (hasIncident) {
            if (!incident.type || !incident.severity || !incident.description || !incident.actionTaken) {
                toast.error('Please complete all required incident report fields');
                return false;
            }
        }
        return true;
    };

    const submitMutation = useMutation({
        mutationFn: async () => {
            // Create visit note
            await base44.entities.Visit_Note.create({
                visit_id: visitId,
                caregiver_id: caregiver.id,
                tasks_completed: tasks.filter(t => t.completed).map(t => t.label).join(', '),
                meals_provided: taskDetails[3]?.mealsProvided || '',
                medications_given: 'Lisinopril 10mg, Metformin 500mg, Aspirin 81mg',
                client_mood: assessment.mood || '',
                incidents: hasIncident ? JSON.stringify(incident) : '',
                observations: notes,
                photos: photos.map(p => p.url),
                signature_caregiver: signatures.caregiverSignature,
                signature_family: signatures.familySignature || '',
                submitted_at: new Date().toISOString()
            });

            // Clear draft
            localStorage.removeItem(`visit-notes-draft-${visitId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['visit', visitId] });
            toast.success('Visit notes submitted! Thank you for your thorough documentation.');
            window.location.href = createPageUrl('CaregiverDashboard');
        },
        onError: () => {
            toast.error('Failed to submit visit notes. Please try again.');
        }
    });

    const handleSubmit = async () => {
        if (!validate()) return;
        
        setSubmitting(true);
        await submitMutation.mutateAsync();
        setSubmitting(false);
    };

    const handleSaveDraft = () => {
        setSaving(true);
        localStorage.setItem(`visit-notes-draft-${visitId}`, JSON.stringify({
            tasks, taskDetails, assessment, activities, notes, photos, hasIncident, incident, signatures
        }));
        toast.success('Draft saved');
        setSaving(false);
    };

    if (loading || !visit || !client || !caregiver) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#4a90e2] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] py-6 px-4 pb-24">
            <div className="max-w-3xl mx-auto">
                {/* Back Button */}
                <div className="mb-6">
                    <Link to={createPageUrl('CaregiverDashboard')}>
                        <Button variant="ghost" className="text-[#4a90e2] hover:text-[#1e3a5f]">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>

                {/* Visit Header */}
                <VisitHeader visit={visit} client={client} caregiver={caregiver} />

                {/* Tasks Completed */}
                <TasksCompleted 
                    tasks={tasks}
                    taskDetails={taskDetails}
                    onTaskToggle={handleTaskToggle}
                    onDetailsChange={handleTaskDetailsChange}
                />

                {/* Client Assessment */}
                <ClientAssessment 
                    assessment={assessment}
                    onAssessmentChange={handleAssessmentChange}
                />

                {/* Activities */}
                <ActivitiesEngagement 
                    activities={activities}
                    onActivitiesChange={handleActivitiesChange}
                />

                {/* Detailed Notes */}
                <DetailedNotes 
                    notes={notes}
                    onNotesChange={setNotes}
                />

                {/* Photos */}
                <PhotoUpload 
                    photos={photos}
                    onPhotosChange={setPhotos}
                />

                {/* Incident Report */}
                <IncidentReport 
                    hasIncident={hasIncident}
                    incident={incident}
                    onHasIncidentChange={setHasIncident}
                    onIncidentChange={handleIncidentChange}
                />

                {/* Signatures */}
                <Signatures 
                    signatures={signatures}
                    onSignaturesChange={handleSignaturesChange}
                />

                {/* Action Buttons */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 shadow-lg">
                    <div className="max-w-3xl mx-auto flex gap-3">
                        <Button
                            onClick={handleSaveDraft}
                            disabled={saving}
                            variant="outline"
                            className="flex-1 border-[#4a90e2] text-[#4a90e2] font-semibold py-6"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-2" />
                                    Save Draft
                                </>
                            )}
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-6"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5 mr-2" />
                                    Submit Visit Notes
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}