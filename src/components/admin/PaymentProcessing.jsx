import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Link as LinkIcon, RefreshCw, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function PaymentProcessing({ failedPayments, onProcessPayment, onGenerateLink, onRetryFailed }) {
    const [paymentForm, setPaymentForm] = useState({
        invoice_id: '',
        amount: '',
        payment_method: '',
        reference: '',
        date: format(new Date(), 'yyyy-MM-dd')
    });

    const handleSubmitPayment = () => {
        if (!paymentForm.invoice_id || !paymentForm.amount || !paymentForm.payment_method) {
            toast.error('Please fill in all required fields');
            return;
        }
        onProcessPayment(paymentForm);
        setPaymentForm({
            invoice_id: '',
            amount: '',
            payment_method: '',
            reference: '',
            date: format(new Date(), 'yyyy-MM-dd')
        });
    };

    return (
        <Card className="border-2 mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Payment Processing</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="manual">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                        <TabsTrigger value="stripe">Stripe Link</TabsTrigger>
                        <TabsTrigger value="failed">Failed Payments</TabsTrigger>
                    </TabsList>

                    {/* Manual Payment Entry */}
                    <TabsContent value="manual" className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="mb-2 block">Invoice # *</Label>
                                <Input
                                    placeholder="INV-001"
                                    value={paymentForm.invoice_id}
                                    onChange={(e) => setPaymentForm({...paymentForm, invoice_id: e.target.value})}
                                />
                            </div>
                            <div>
                                <Label className="mb-2 block">Amount *</Label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={paymentForm.amount}
                                    onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
                                />
                            </div>
                            <div>
                                <Label className="mb-2 block">Payment Method *</Label>
                                <Select
                                    value={paymentForm.payment_method}
                                    onValueChange={(value) => setPaymentForm({...paymentForm, payment_method: value})}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                                        <SelectItem value="ACH">ACH</SelectItem>
                                        <SelectItem value="Check">Check</SelectItem>
                                        <SelectItem value="Cash">Cash</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="mb-2 block">Payment Date</Label>
                                <Input
                                    type="date"
                                    value={paymentForm.date}
                                    onChange={(e) => setPaymentForm({...paymentForm, date: e.target.value})}
                                />
                            </div>
                            <div className="col-span-2">
                                <Label className="mb-2 block">Reference (Check # / Transaction ID)</Label>
                                <Input
                                    placeholder="Optional"
                                    value={paymentForm.reference}
                                    onChange={(e) => setPaymentForm({...paymentForm, reference: e.target.value})}
                                />
                            </div>
                        </div>
                        <Button
                            onClick={handleSubmitPayment}
                            className="w-full bg-green-600 hover:bg-green-700"
                        >
                            <DollarSign className="w-4 h-4 mr-2" />
                            Record Payment
                        </Button>
                    </TabsContent>

                    {/* Stripe Payment Link */}
                    <TabsContent value="stripe" className="space-y-4 mt-4">
                        <div>
                            <Label className="mb-2 block">Select Invoice</Label>
                            <Select onValueChange={onGenerateLink}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose invoice to generate payment link" />
                                </SelectTrigger>
                                <SelectContent>
                                    {invoices.filter(inv => inv.status !== 'Paid').map(inv => (
                                        <SelectItem key={inv.id} value={inv.id}>
                                            {inv.invoice_number} - {inv.client_name} (${inv.balance_due.toLocaleString()})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-700">
                                Generate a secure Stripe payment link and send it to the client via email or SMS.
                            </p>
                        </div>
                    </TabsContent>

                    {/* Failed Payments */}
                    <TabsContent value="failed" className="mt-4">
                        {failedPayments.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">No failed payments</p>
                        ) : (
                            <div className="space-y-3">
                                {failedPayments.map((payment) => (
                                    <div key={payment.id} className="border-2 border-red-300 bg-red-50 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <p className="font-bold text-[#1e3a5f]">{payment.client_name}</p>
                                                <p className="text-sm text-gray-600">
                                                    Invoice: {payment.invoice_number}
                                                </p>
                                            </div>
                                            <Badge className="bg-red-100 text-red-800">Failed</Badge>
                                        </div>
                                        <p className="text-sm text-gray-700 mb-3">
                                            Amount: ${payment.amount.toLocaleString()} • {payment.failure_reason}
                                        </p>
                                        <Button
                                            size="sm"
                                            onClick={() => onRetryFailed(payment)}
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                            Retry Payment
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}