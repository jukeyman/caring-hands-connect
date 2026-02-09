import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Printer } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function InvoiceDetailModal({ invoice, client, lineItems, open, onClose }) {
    if (!invoice) return null;

    const handleDownload = () => {
        toast.success('Invoice PDF downloaded');
    };

    const handlePrint = () => {
        window.print();
    };

    const getStatusBadge = (status) => {
        const configs = {
            'Paid': { className: 'bg-green-100 text-green-800', label: 'Paid' },
            'Sent': { className: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
            'Overdue': { className: 'bg-red-100 text-red-800', label: 'Overdue' }
        };
        return configs[status] || configs['Sent'];
    };

    const statusConfig = getStatusBadge(invoice.status);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-2xl text-[#1e3a5f]">
                            Invoice {invoice.invoice_number}
                        </DialogTitle>
                        <Badge className={statusConfig.className}>
                            {statusConfig.label}
                        </Badge>
                    </div>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                    {/* Invoice Header Info */}
                    <div className="grid md:grid-cols-2 gap-6 pb-6 border-b">
                        <div>
                            <p className="text-sm font-semibold text-gray-600 mb-1">Date Issued</p>
                            <p className="text-[#1e3a5f] font-semibold">
                                {format(new Date(invoice.invoice_date), 'MMMM d, yyyy')}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-600 mb-1">Due Date</p>
                            <p className="text-[#1e3a5f] font-semibold">
                                {format(new Date(invoice.due_date), 'MMMM d, yyyy')}
                            </p>
                        </div>
                    </div>

                    {/* Billing Info */}
                    <div>
                        <p className="text-sm font-semibold text-gray-600 mb-2">Bill To:</p>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="font-semibold text-[#1e3a5f]">
                                {client?.first_name} {client?.last_name}
                            </p>
                            <p className="text-sm text-gray-700">{client?.address_street}</p>
                            <p className="text-sm text-gray-700">
                                {client?.address_city}, {client?.address_state} {client?.address_zip}
                            </p>
                        </div>
                    </div>

                    {/* Line Items */}
                    <div>
                        <p className="text-sm font-semibold text-gray-600 mb-3">Service Details:</p>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left py-3 px-3 text-xs font-semibold text-[#1e3a5f]">Date</th>
                                        <th className="text-left py-3 px-3 text-xs font-semibold text-[#1e3a5f]">Service</th>
                                        <th className="text-left py-3 px-3 text-xs font-semibold text-[#1e3a5f]">Caregiver</th>
                                        <th className="text-right py-3 px-3 text-xs font-semibold text-[#1e3a5f]">Hours</th>
                                        <th className="text-right py-3 px-3 text-xs font-semibold text-[#1e3a5f]">Rate</th>
                                        <th className="text-right py-3 px-3 text-xs font-semibold text-[#1e3a5f]">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lineItems?.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="py-3 px-3 text-sm text-gray-700">
                                                {item.visit_date ? format(new Date(item.visit_date), 'MMM d') : '-'}
                                            </td>
                                            <td className="py-3 px-3 text-sm text-gray-700">
                                                {item.description}
                                            </td>
                                            <td className="py-3 px-3 text-sm text-gray-700">
                                                {item.caregiver_name || '-'}
                                            </td>
                                            <td className="py-3 px-3 text-sm text-gray-700 text-right">
                                                {item.quantity?.toFixed(1)}
                                            </td>
                                            <td className="py-3 px-3 text-sm text-gray-700 text-right">
                                                ${item.unit_price?.toFixed(2)}
                                            </td>
                                            <td className="py-3 px-3 text-sm font-semibold text-[#1e3a5f] text-right">
                                                ${item.line_total?.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="border-t pt-4">
                        <div className="flex justify-end">
                            <div className="w-64 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span className="font-semibold text-[#1e3a5f]">
                                        ${invoice.subtotal?.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax ({(invoice.tax_rate * 100).toFixed(2)}%):</span>
                                    <span className="font-semibold text-[#1e3a5f]">
                                        ${invoice.tax_amount?.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t pt-2">
                                    <span className="text-[#1e3a5f]">Total:</span>
                                    <span className="text-[#1e3a5f]">
                                        ${invoice.total_amount?.toFixed(2)}
                                    </span>
                                </div>
                                {invoice.amount_paid > 0 && (
                                    <>
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span>Amount Paid:</span>
                                            <span>-${invoice.amount_paid?.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold">
                                            <span className="text-[#1e3a5f]">Balance Due:</span>
                                            <span className="text-[#1e3a5f]">
                                                ${invoice.balance_due?.toFixed(2)}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 justify-end border-t pt-6">
                        <Button 
                            variant="outline"
                            onClick={handleDownload}
                            className="border-[#4a90e2] text-[#4a90e2] hover:bg-[#4a90e2] hover:text-white"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={handlePrint}
                            className="border-[#4a90e2] text-[#4a90e2] hover:bg-[#4a90e2] hover:text-white"
                        >
                            <Printer className="w-4 h-4 mr-2" />
                            Print
                        </Button>
                        <Button onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}