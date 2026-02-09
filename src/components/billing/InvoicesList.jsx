import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Eye, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

export default function InvoicesList({ invoices, onViewInvoice, onDownload, onPayNow }) {
    const [filter, setFilter] = useState('all');

    const getStatusBadge = (status) => {
        const configs = {
            'Paid': { className: 'bg-green-100 text-green-800', label: 'Paid' },
            'Sent': { className: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
            'Overdue': { className: 'bg-red-100 text-red-800', label: 'Overdue' },
            'Draft': { className: 'bg-gray-100 text-gray-800', label: 'Draft' }
        };
        const config = configs[status] || configs['Draft'];
        return <Badge className={config.className}>{config.label}</Badge>;
    };

    const filteredInvoices = invoices?.filter(inv => {
        if (filter === 'all') return true;
        if (filter === 'paid') return inv.status === 'Paid';
        if (filter === 'pending') return inv.status === 'Sent';
        if (filter === 'overdue') return inv.status === 'Overdue';
        return true;
    }) || [];

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-[#1e3a5f]">Your Invoices</CardTitle>
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Invoices</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-2 text-sm font-semibold text-[#1e3a5f]">Invoice #</th>
                                <th className="text-left py-3 px-2 text-sm font-semibold text-[#1e3a5f]">Date</th>
                                <th className="text-left py-3 px-2 text-sm font-semibold text-[#1e3a5f]">Period</th>
                                <th className="text-right py-3 px-2 text-sm font-semibold text-[#1e3a5f]">Amount</th>
                                <th className="text-center py-3 px-2 text-sm font-semibold text-[#1e3a5f]">Status</th>
                                <th className="text-right py-3 px-2 text-sm font-semibold text-[#1e3a5f]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInvoices.map((invoice, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="py-4 px-2 text-sm font-semibold text-[#1e3a5f]">
                                        {invoice.invoice_number}
                                    </td>
                                    <td className="py-4 px-2 text-sm text-gray-700">
                                        {format(new Date(invoice.invoice_date), 'MMM d')}
                                    </td>
                                    <td className="py-4 px-2 text-sm text-gray-700">
                                        {format(new Date(invoice.billing_period_start), 'MMM d')} - {format(new Date(invoice.billing_period_end), 'MMM d')}
                                    </td>
                                    <td className="py-4 px-2 text-sm font-semibold text-[#1e3a5f] text-right">
                                        ${invoice.total_amount?.toFixed(2)}
                                    </td>
                                    <td className="py-4 px-2 text-center">
                                        {getStatusBadge(invoice.status)}
                                    </td>
                                    <td className="py-4 px-2 text-right">
                                        <div className="flex gap-2 justify-end">
                                            <Button 
                                                size="sm" 
                                                variant="ghost"
                                                onClick={() => onViewInvoice(invoice)}
                                                className="text-[#4a90e2] hover:text-[#1e3a5f]"
                                            >
                                                <Eye className="w-4 h-4 mr-1" />
                                                View
                                            </Button>
                                            <Button 
                                                size="sm" 
                                                variant="ghost"
                                                onClick={() => onDownload(invoice)}
                                                className="text-[#4a90e2] hover:text-[#1e3a5f]"
                                            >
                                                <Download className="w-4 h-4 mr-1" />
                                                Download
                                            </Button>
                                            {invoice.status !== 'Paid' && (
                                                <Button 
                                                    size="sm"
                                                    onClick={() => onPayNow(invoice)}
                                                    className="bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f]"
                                                >
                                                    <DollarSign className="w-4 h-4 mr-1" />
                                                    Pay Now
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredInvoices.length === 0 && (
                        <div className="text-center py-12">
                            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600">No invoices found</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}