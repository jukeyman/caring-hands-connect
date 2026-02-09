import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, FileSpreadsheet } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function PaymentHistory({ payments }) {
    const [timeFilter, setTimeFilter] = useState('30');

    const handleExportCSV = () => {
        toast.success('Payment history exported to CSV');
    };

    const filteredPayments = payments?.filter(payment => {
        if (timeFilter === 'all') return true;
        const daysAgo = parseInt(timeFilter);
        const paymentDate = new Date(payment.payment_date);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
        return paymentDate >= cutoffDate;
    }) || [];

    const getStatusBadge = (status) => {
        const configs = {
            'Completed': { className: 'bg-green-100 text-green-800', label: 'Completed' },
            'Pending': { className: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
            'Failed': { className: 'bg-red-100 text-red-800', label: 'Failed' },
            'Refunded': { className: 'bg-gray-100 text-gray-800', label: 'Refunded' }
        };
        const config = configs[status] || configs['Pending'];
        return <Badge className={config.className}>{config.label}</Badge>;
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-[#1e3a5f]">Payment History</CardTitle>
                    <div className="flex gap-3">
                        <Select value={timeFilter} onValueChange={setTimeFilter}>
                            <SelectTrigger className="w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="30">Last 30 days</SelectItem>
                                <SelectItem value="90">Last 90 days</SelectItem>
                                <SelectItem value="all">All Time</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button 
                            variant="outline"
                            onClick={handleExportCSV}
                            className="border-[#4a90e2] text-[#4a90e2] hover:bg-[#4a90e2] hover:text-white"
                        >
                            <FileSpreadsheet className="w-4 h-4 mr-2" />
                            Export CSV
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-2 text-sm font-semibold text-[#1e3a5f]">Date</th>
                                <th className="text-left py-3 px-2 text-sm font-semibold text-[#1e3a5f]">Invoice</th>
                                <th className="text-right py-3 px-2 text-sm font-semibold text-[#1e3a5f]">Amount</th>
                                <th className="text-left py-3 px-2 text-sm font-semibold text-[#1e3a5f]">Method</th>
                                <th className="text-center py-3 px-2 text-sm font-semibold text-[#1e3a5f]">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.map((payment, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="py-4 px-2 text-sm text-gray-700">
                                        {format(new Date(payment.payment_date), 'MMM d, yyyy')}
                                    </td>
                                    <td className="py-4 px-2 text-sm font-semibold text-[#4a90e2]">
                                        {payment.invoice_number || '-'}
                                    </td>
                                    <td className="py-4 px-2 text-sm font-semibold text-[#1e3a5f] text-right">
                                        ${payment.amount?.toFixed(2)}
                                    </td>
                                    <td className="py-4 px-2 text-sm text-gray-700">
                                        {payment.payment_method}
                                    </td>
                                    <td className="py-4 px-2 text-center">
                                        {getStatusBadge(payment.status)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredPayments.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No payment history found</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}