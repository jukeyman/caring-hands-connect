import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import PayPeriodSummary from '../components/payroll/PayPeriodSummary';
import HoursBreakdown from '../components/payroll/HoursBreakdown';
import PayHistory from '../components/payroll/PayHistory';
import PendingHoursApproval from '../components/payroll/PendingHoursApproval';
import DisputedHours from '../components/payroll/DisputedHours';
import MileageReimbursement from '../components/payroll/MileageReimbursement';
import TaxDocuments from '../components/payroll/TaxDocuments';
import DirectDepositSettings from '../components/payroll/DirectDepositSettings';

export default function PayrollHours() {
    const [user, setUser] = useState(null);
    const [caregiver, setCaregiver] = useState(null);
    const [loading, setLoading] = useState(true);

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
                toast.error('Failed to load payroll data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Fetch completed visits
    const { data: completedVisits = [] } = useQuery({
        queryKey: ['completedVisits', caregiver?.id],
        queryFn: async () => {
            const visits = await base44.entities.Visit.filter({ 
                caregiver_id: caregiver.id,
                status: 'Completed'
            });

            // Enrich with client data
            return await Promise.all(visits.map(async (visit) => {
                const clients = await base44.entities.Client.filter({ id: visit.client_id });
                const client = clients[0];
                return {
                    ...visit,
                    client_name: client ? `${client.first_name} ${client.last_name.charAt(0)}.` : 'Client'
                };
            }));
        },
        enabled: !!caregiver
    });

    // Mock data for current pay period
    const currentPayPeriod = {
        periodStart: '2024-01-16',
        periodEnd: '2024-01-29',
        totalHours: 68.5,
        regularHours: 64,
        overtimeHours: 4.5,
        estimatedEarnings: 1395,
        regularEarnings: 1280,
        overtimeEarnings: 115,
        visitsCompleted: 17,
        avgHoursPerVisit: 4.0,
        payDate: '2024-02-02'
    };

    // Mock hours breakdown
    const hoursData = [
        { date: '2024-01-26', client_name: 'Margaret S.', clock_in: '9:02 AM', clock_out: '1:05 PM', break: 0, hours: 4.05, rate: 20, earnings: 81.00, is_overtime: false },
        { date: '2024-01-24', client_name: 'Robert J.', clock_in: '2:00 PM', clock_out: '6:00 PM', break: 0, hours: 4.0, rate: 20, earnings: 80.00, is_overtime: false },
        { date: '2024-01-22', client_name: 'Margaret S.', clock_in: '9:00 AM', clock_out: '1:00 PM', break: 0, hours: 4.0, rate: 20, earnings: 80.00, is_overtime: false }
    ];

    // Mock pay history
    const payHistory = [
        {
            period_start: '2024-01-01',
            period_end: '2024-01-15',
            pay_date: '2024-01-19',
            status: 'Paid',
            gross_pay: 1280,
            net_pay: 951.68,
            regular_hours: 64,
            overtime_hours: 0,
            hourly_rate: 20,
            overtime_rate: 30,
            regular_earnings: 1280,
            overtime_earnings: 0,
            federal_tax: 192,
            state_tax: 38.40,
            fica: 97.92,
            other_deductions: 0,
            total_deductions: 328.32,
            bank_last_four: '1234'
        }
    ];

    // Mock pending hours
    const pendingHours = [
        {
            visit_date: '2024-01-26',
            client_name: 'Margaret S.',
            scheduled_start_time: '9:00 AM',
            scheduled_end_time: '1:00 PM',
            actual_start_time: '9:02 AM',
            actual_end_time: '1:05 PM',
            hours: 4.05,
            reason: 'Late clock-in'
        }
    ];

    // Mock disputed hours
    const disputes = [];

    // Mock mileage data
    const mileageData = {
        total_miles: 142,
        rate: 0.67,
        reimbursement: 95.14,
        status: 'Included in next pay',
        entries: [
            { date: '2024-01-26', from: 'Home', to: 'Margaret S.', miles: 14, reimbursement: 9.38 }
        ]
    };

    // Mock tax documents
    const taxDocuments = [];

    // Current payment method
    const paymentMethod = {
        bank_name: 'Chase Bank',
        account_type: 'Checking',
        last_four: '1234'
    };

    const handleUpdateBank = (data) => {
        console.log('Updating bank:', data);
    };

    const handleAddEvidence = (dispute) => {
        toast.info('Evidence upload coming soon');
    };

    const handleSubmitDispute = () => {
        toast.info('Dispute submission coming soon');
    };

    const handleAddMileage = (data) => {
        console.log('Adding mileage:', data);
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
                <div className="mb-6">
                    <Link to={createPageUrl('CaregiverDashboard')}>
                        <Button variant="ghost" className="text-[#4a90e2] hover:text-[#1e3a5f] mb-2">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-[#1e3a5f]">Payroll & Hours</h1>
                </div>

                {/* Current Pay Period Summary */}
                <PayPeriodSummary summary={currentPayPeriod} />

                {/* Pending Hours */}
                <PendingHoursApproval pendingVisits={pendingHours} />

                {/* Disputed Hours */}
                {disputes.length > 0 && (
                    <DisputedHours 
                        disputes={disputes}
                        onSubmitDispute={handleSubmitDispute}
                        onAddEvidence={handleAddEvidence}
                    />
                )}

                {/* Hours Breakdown */}
                <HoursBreakdown hours={hoursData} />

                {/* Mileage Reimbursement */}
                <MileageReimbursement 
                    mileageData={mileageData}
                    onAddEntry={handleAddMileage}
                />

                {/* Pay History */}
                <PayHistory payStubs={payHistory} />

                {/* Tax Documents */}
                <TaxDocuments documents={taxDocuments} />

                {/* Direct Deposit Settings */}
                <DirectDepositSettings 
                    currentMethod={paymentMethod}
                    onUpdate={handleUpdateBank}
                />
            </div>
        </div>
    );
}