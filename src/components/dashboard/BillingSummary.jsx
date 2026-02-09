import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard, AlertCircle, FileText, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

export default function BillingSummary({ billing, onViewInvoices, onMakePayment }) {
    const isOverdue = billing?.balance_due > 0 && new Date(billing?.next_invoice_due) < new Date();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Billing & Payments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {isOverdue && (
                    <Alert className="border-red-500 bg-red-50">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <AlertDescription className="text-red-700 font-semibold">
                            Payment overdue. Please update payment method.
                        </AlertDescription>
                    </Alert>
                )}

                {/* Current Balance */}
                <div className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] text-white rounded-xl p-6">
                    <p className="text-sm text-gray-200 mb-1">Current Balance</p>
                    <p className="text-4xl font-bold mb-4">
                        ${billing?.balance_due?.toFixed(2) || '0.00'}
                    </p>
                    {billing?.next_invoice_due && (
                        <div className="flex items-center gap-2 text-sm">
                            <FileText className="w-4 h-4" />
                            <span>Next Invoice Due: {format(new Date(billing.next_invoice_due), 'MMMM d, yyyy')}</span>
                        </div>
                    )}
                </div>

                {/* Payment Method */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-[#4a90e2]" />
                            <div>
                                <p className="text-sm text-gray-600">Payment Method</p>
                                <p className="font-semibold text-[#1e3a5f]">
                                    {billing?.payment_method || 'Visa ending in 4242'}
                                </p>
                            </div>
                        </div>
                        <Button size="sm" variant="ghost" className="text-[#4a90e2]">
                            Update
                        </Button>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <Button 
                        onClick={onViewInvoices}
                        variant="outline" 
                        className="border-[#4a90e2] text-[#4a90e2] hover:bg-[#4a90e2] hover:text-white"
                    >
                        <FileText className="w-4 h-4 mr-2" />
                        View All Invoices
                    </Button>
                    <Button 
                        onClick={onMakePayment}
                        className="bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f] font-semibold"
                    >
                        <DollarSign className="w-4 h-4 mr-2" />
                        Make a Payment
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}