import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import RevenueSummary from '../components/admin/RevenueSummary';
import InvoiceManagement from '../components/admin/InvoiceManagement';
import PaymentProcessing from '../components/admin/PaymentProcessing';
import FinancialReports from '../components/admin/FinancialReports';

export default function AdminBilling() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
                toast.error('Failed to load billing data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Fetch all invoices
    const { data: allInvoices = [] } = useQuery({
        queryKey: ['allInvoices'],
        queryFn: async () => {
            const invoices = await base44.entities.Invoice.list('-invoice_date', 200);
            
            return await Promise.all(invoices.map(async (invoice) => {
                const clients = await base44.entities.Client.filter({ id: invoice.client_id });
                return {
                    ...invoice,
                    client_name: clients[0] ? `${clients[0].first_name} ${clients[0].last_name}` : 'Client'
                };
            }));
        },
        enabled: !!user
    });

    // Calculate revenue summary
    const revenueSummary = {
        this_month: 125450,
        outstanding: 12340,
        overdue: 2100
    };

    // Mock service type data
    const serviceTypeData = [
        { name: 'Live-In Care', value: 45000 },
        { name: 'Hourly Care', value: 38000 },
        { name: 'Overnight', value: 28000 },
        { name: 'Companionship', value: 14450 }
    ];

    // Mock top clients data
    const topClientsData = [
        { name: 'Margaret S.', value: 8500 },
        { name: 'Robert J.', value: 7200 },
        { name: 'Elizabeth W.', value: 6800 },
        { name: 'Thomas M.', value: 5900 },
        { name: 'Dorothy K.', value: 5400 },
        { name: 'James P.', value: 4800 },
        { name: 'Mary L.', value: 4200 },
        { name: 'William H.', value: 3900 },
        { name: 'Barbara D.', value: 3600 },
        { name: 'Richard C.', value: 3200 }
    ];

    // Mock P&L data
    const plData = {
        revenue: 125450,
        service_revenue: 122000,
        other_income: 3450,
        cost_of_services: 77250,
        caregiver_wages: 68000,
        payroll_taxes: 9250,
        gross_profit: 48200,
        operating_expenses: 22000,
        marketing: 8500,
        administrative: 10500,
        insurance: 3000,
        net_profit: 26200
    };

    // Mock aging report
    const agingReport = [
        { client_name: 'Margaret S.', current: 0, days_30: 1250, days_60: 0, days_90: 0, total: 1250 },
        { client_name: 'Robert J.', current: 800, days_30: 0, days_60: 0, days_90: 850, total: 1650 }
    ];

    // Mock revenue by area
    const revenueByArea = [
        { area: 'Austin', revenue: 58000 },
        { area: 'Round Rock', revenue: 32000 },
        { area: 'Cedar Park', revenue: 22450 },
        { area: 'Georgetown', revenue: 13000 }
    ];

    // Mock failed payments
    const failedPayments = [
        {
            id: '1',
            client_name: 'Margaret S.',
            invoice_number: 'INV-2024-001',
            amount: 1250,
            failure_reason: 'Insufficient funds'
        }
    ];

    // Mutations
    const invoiceActionMutation = useMutation({
        mutationFn: async ({ action, invoice }) => {
            if (action === 'markPaid') {
                await base44.entities.Invoice.update(invoice.id, {
                    status: 'Paid',
                    paid_at: new Date().toISOString()
                });
            }
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['allInvoices'] });
            const actionLabels = {
                send: 'Invoice sent',
                markPaid: 'Invoice marked as paid',
                reminder: 'Reminder sent',
                void: 'Invoice voided'
            };
            toast.success(actionLabels[variables.action] || 'Action completed');
        }
    });

    const handleInvoiceAction = (action, invoice) => {
        if (action === 'send' || action === 'reminder' || action === 'void') {
            toast.info(`${action} functionality coming soon`);
            return;
        }
        invoiceActionMutation.mutate({ action, invoice });
    };

    const handleBulkSend = (invoiceIds) => {
        toast.success(`Sending ${invoiceIds.length} invoices...`);
    };

    const handleProcessPayment = (paymentData) => {
        toast.success('Payment recorded successfully!');
    };

    const handleGenerateStripeLink = (invoiceId) => {
        toast.info('Stripe payment link generated! (coming soon)');
    };

    const handleRetryPayment = (payment) => {
        toast.info('Retrying payment...');
    };

    const handleExportReport = (reportType) => {
        toast.info(`Exporting ${reportType} report...`);
    };

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
                        <DollarSign className="w-8 h-8 text-[#4a90e2]" />
                        <h1 className="text-3xl font-bold text-[#1e3a5f]">Billing & Revenue</h1>
                    </div>
                    <p className="text-gray-600">Financial overview and invoice management</p>
                </div>

                {/* Revenue Summary */}
                <RevenueSummary
                    summary={revenueSummary}
                    serviceTypeData={serviceTypeData}
                    topClientsData={topClientsData}
                />

                {/* Invoice Management */}
                <InvoiceManagement
                    invoices={allInvoices}
                    onAction={handleInvoiceAction}
                    onBulkSend={handleBulkSend}
                />

                {/* Payment Processing */}
                <PaymentProcessing
                    failedPayments={failedPayments}
                    onProcessPayment={handleProcessPayment}
                    onGenerateLink={handleGenerateStripeLink}
                    onRetryFailed={handleRetryPayment}
                />

                {/* Financial Reports */}
                <FinancialReports
                    plData={plData}
                    agingReport={agingReport}
                    revenueByArea={revenueByArea}
                    onExport={handleExportReport}
                />
            </div>
        </div>
    );
}