import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Download, Eye } from 'lucide-react';
import { format } from 'date-fns';

export default function PayHistory({ payStubs }) {
    const [expandedStubs, setExpandedStubs] = useState({});

    const toggleExpanded = (index) => {
        setExpandedStubs(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const getStatusBadge = (status) => {
        return status === 'Paid' 
            ? { className: 'bg-green-100 text-green-800', label: 'Paid' }
            : { className: 'bg-yellow-100 text-yellow-800', label: 'Pending' };
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Pay History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {payStubs.map((stub, index) => {
                    const statusBadge = getStatusBadge(stub.status);
                    
                    return (
                        <Collapsible key={index} open={expandedStubs[index]}>
                            <Card className="border-2">
                                <CardContent className="pt-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <p className="font-bold text-[#1e3a5f] text-lg mb-1">
                                                {format(new Date(stub.period_start), 'MMM d')} - {format(new Date(stub.period_end), 'MMM d, yyyy')}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Pay Date: {format(new Date(stub.pay_date), 'MMMM d, yyyy')}
                                            </p>
                                        </div>
                                        <Badge className={statusBadge.className}>
                                            {statusBadge.label}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Gross Pay</p>
                                            <p className="text-2xl font-bold text-[#1e3a5f]">
                                                ${stub.gross_pay.toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Net Pay</p>
                                            <p className="text-2xl font-bold text-green-700">
                                                ${stub.net_pay.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <CollapsibleTrigger 
                                            onClick={() => toggleExpanded(index)}
                                            asChild
                                        >
                                            <Button variant="outline" className="flex-1 border-[#4a90e2] text-[#4a90e2]">
                                                <Eye className="w-4 h-4 mr-2" />
                                                View Details
                                                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${
                                                    expandedStubs[index] ? 'rotate-180' : ''
                                                }`} />
                                            </Button>
                                        </CollapsibleTrigger>
                                        <Button variant="outline" className="flex-1">
                                            <Download className="w-4 h-4 mr-2" />
                                            Download PDF
                                        </Button>
                                    </div>

                                    <CollapsibleContent className="mt-6 space-y-4 border-t-2 border-gray-200 pt-4">
                                        {/* Earnings */}
                                        <div>
                                            <h4 className="font-bold text-[#1e3a5f] mb-3">Earnings</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-700">Regular Hours ({stub.regular_hours}h @ ${stub.hourly_rate}/hr)</span>
                                                    <span className="font-semibold">${stub.regular_earnings.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-700">Overtime Hours ({stub.overtime_hours}h @ ${stub.overtime_rate}/hr)</span>
                                                    <span className="font-semibold">${stub.overtime_earnings.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between border-t pt-2 font-bold">
                                                    <span>Total Gross</span>
                                                    <span>${stub.gross_pay.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Deductions */}
                                        <div>
                                            <h4 className="font-bold text-[#1e3a5f] mb-3">Deductions</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-700">Federal Tax</span>
                                                    <span className="text-red-700">-${stub.federal_tax.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-700">State Tax</span>
                                                    <span className="text-red-700">-${stub.state_tax.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-700">FICA</span>
                                                    <span className="text-red-700">-${stub.fica.toFixed(2)}</span>
                                                </div>
                                                {stub.other_deductions > 0 && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-700">Other</span>
                                                        <span className="text-red-700">-${stub.other_deductions.toFixed(2)}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between border-t pt-2 font-bold">
                                                    <span>Total Deductions</span>
                                                    <span className="text-red-700">-${stub.total_deductions.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Net Pay */}
                                        <div className="bg-green-50 rounded-lg p-4">
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-lg">Net Pay</span>
                                                <span className="font-bold text-2xl text-green-700">
                                                    ${stub.net_pay.toFixed(2)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-2">
                                                Payment Method: Direct Deposit to Bank ****{stub.bank_last_four}
                                            </p>
                                        </div>
                                    </CollapsibleContent>
                                </CardContent>
                            </Card>
                        </Collapsible>
                    );
                })}
            </CardContent>
        </Card>
    );
}