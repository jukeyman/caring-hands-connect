import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Download, CreditCard, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import BillingAccountSummary from '../components/billing/BillingAccountSummary';
import InvoicesList from '../components/billing/InvoicesList';
import InvoiceDetailModal from '../components/billing/InvoiceDetailModal';
import PaymentMethods from '../components/billing/PaymentMethods';
import AutoPaySettings from '../components/billing/AutoPaySettings';
import PaymentHistory from '../components/billing/PaymentHistory';

export default function Billing() {
    const [user, setUser] = useState(null);
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: '1',
            type: 'Credit Card',
            card_brand: 'Visa',
            last_four: '4242',
            expiration_month: 12,
            expiration_year: 2025,
            is_default: true
        }
    ]);

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
                toast.error('Failed to load billing information');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Fetch invoices
    const { data: invoices = [] } = useQuery({
        queryKey: ['invoices', client?.id],
        queryFn: () => base44.entities.Invoice.filter({ client_id: client.id }, '-invoice_date'),
        enabled: !!client
    });

    // Fetch payments
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', client?.id],
        queryFn: async () => {
            const allPayments = await base44.entities.Payment.filter({ client_id: client.id }, '-payment_date');
            
            // Join with invoice numbers
            return await Promise.all(allPayments.map(async (payment) => {
                const invoice = invoices.find(inv => inv.id === payment.invoice_id);
                return {
                    ...payment,
                    invoice_number: invoice?.invoice_number || 'N/A'
                };
            }));
        },
        enabled: !!client && invoices.length > 0
    });

    // Fetch line items for selected invoice
    const { data: lineItems = [] } = useQuery({
        queryKey: ['line_items', selectedInvoice?.id],
        queryFn: () => base44.entities.Invoice_Line_Item.filter({ invoice_id: selectedInvoice.id }),
        enabled: !!selectedInvoice
    });

    // Calculate summary stats
    const currentBalance = invoices.reduce((sum, inv) => sum + (inv.balance_due || 0), 0);
    const lastPayment = payments[0];
    const ytdTotal = invoices.reduce((sum, inv) => sum + (inv.total_amount || 0), 0);

    const summary = {
        current_balance: currentBalance,
        due_date: invoices.find(inv => inv.balance_due > 0)?.due_date,
        last_payment_amount: lastPayment?.amount,
        last_payment_date: lastPayment?.payment_date,
        last_payment_method: lastPayment?.payment_method,
        ytd_total: ytdTotal,
        ytd_period: 'Jan 1 - Jan 26, 2024'
    };

    const handleMakePayment = () => {
        toast.info('Payment feature coming soon');
    };

    const handleDownloadAll = () => {
        toast.success('Downloading all invoices...');
    };

    const handleSetupAutoPay = () => {
        document.getElementById('auto-pay-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleUpdatePaymentMethod = () => {
        document.getElementById('payment-methods-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleViewInvoice = (invoice) => {
        setSelectedInvoice(invoice);
        setShowInvoiceModal(true);
    };

    const handleDownloadInvoice = (invoice) => {
        toast.success(`Invoice ${invoice.invoice_number} downloaded`);
    };

    const handlePayNow = (invoice) => {
        toast.info('Payment processing coming soon');
    };

    const handleAddPaymentMethod = (method) => {
        setPaymentMethods([...paymentMethods, { ...method, id: Date.now().toString() }]);
    };

    const handleRemovePaymentMethod = (methodId) => {
        setPaymentMethods(paymentMethods.filter(m => m.id !== methodId));
    };

    const handleSetDefaultPaymentMethod = (methodId) => {
        setPaymentMethods(paymentMethods.map(m => ({
            ...m,
            is_default: m.id === methodId
        })));
        toast.success('Default payment method updated');
    };

    const handleSaveAutoPaySettings = (settings) => {
        console.log('Auto-pay settings saved:', settings);
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
                    <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">Billing & Invoices</h1>
                    <p className="text-gray-600">Manage your account, payments, and invoices</p>
                </div>

                {/* Account Summary */}
                <BillingAccountSummary summary={summary} />

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <Button 
                        onClick={handleMakePayment}
                        className="bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f] font-semibold h-auto py-4"
                    >
                        <CreditCard className="w-5 h-5 mr-2" />
                        Make a Payment
                    </Button>
                    <Button 
                        onClick={handleDownloadAll}
                        variant="outline"
                        className="border-[#4a90e2] text-[#4a90e2] hover:bg-[#4a90e2] hover:text-white h-auto py-4"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Download All (PDF)
                    </Button>
                    <Button 
                        onClick={handleSetupAutoPay}
                        variant="outline"
                        className="border-[#4a90e2] text-[#4a90e2] hover:bg-[#4a90e2] hover:text-white h-auto py-4"
                    >
                        <Zap className="w-5 h-5 mr-2" />
                        Set Up Auto-Pay
                    </Button>
                    <Button 
                        onClick={handleUpdatePaymentMethod}
                        variant="outline"
                        className="border-[#4a90e2] text-[#4a90e2] hover:bg-[#4a90e2] hover:text-white h-auto py-4"
                    >
                        <CreditCard className="w-5 h-5 mr-2" />
                        Update Payment
                    </Button>
                </div>

                {/* Invoices List */}
                <div className="mb-8">
                    <InvoicesList 
                        invoices={invoices}
                        onViewInvoice={handleViewInvoice}
                        onDownload={handleDownloadInvoice}
                        onPayNow={handlePayNow}
                    />
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Payment Methods */}
                    <div id="payment-methods-section">
                        <PaymentMethods 
                            paymentMethods={paymentMethods}
                            onAdd={handleAddPaymentMethod}
                            onRemove={handleRemovePaymentMethod}
                            onSetDefault={handleSetDefaultPaymentMethod}
                        />
                    </div>

                    {/* Auto-Pay Settings */}
                    <div id="auto-pay-section">
                        <AutoPaySettings 
                            paymentMethods={paymentMethods}
                            settings={{}}
                            onSave={handleSaveAutoPaySettings}
                        />
                    </div>
                </div>

                {/* Payment History */}
                <PaymentHistory payments={payments} />

                {/* Invoice Detail Modal */}
                <InvoiceDetailModal 
                    invoice={selectedInvoice}
                    client={client}
                    lineItems={lineItems}
                    open={showInvoiceModal}
                    onClose={() => {
                        setShowInvoiceModal(false);
                        setSelectedInvoice(null);
                    }}
                />
            </div>
        </div>
    );
}