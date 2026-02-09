import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Send, CheckCircle, Mail, XCircle, MoreVertical, Filter, Search } from 'lucide-react';
import { format } from 'date-fns';

export default function InvoiceManagement({ invoices, onAction, onBulkSend }) {
    const [filters, setFilters] = useState({ status: 'all', search: '' });
    const [selectedInvoices, setSelectedInvoices] = useState([]);

    const filteredInvoices = invoices.filter(inv => {
        const statusMatch = filters.status === 'all' || inv.status === filters.status;
        const searchMatch = !filters.search || 
            inv.client_name.toLowerCase().includes(filters.search.toLowerCase()) ||
            inv.invoice_number.toLowerCase().includes(filters.search.toLowerCase());
        return statusMatch && searchMatch;
    });

    const getStatusBadge = (status) => {
        const config = {
            'Draft': { className: 'bg-gray-100 text-gray-800', label: 'Draft' },
            'Sent': { className: 'bg-blue-100 text-blue-800', label: 'Sent' },
            'Paid': { className: 'bg-green-100 text-green-800', label: 'Paid' },
            'Overdue': { className: 'bg-red-100 text-red-800', label: 'Overdue' },
            'Cancelled': { className: 'bg-gray-100 text-gray-800', label: 'Cancelled' }
        };
        return config[status] || config['Draft'];
    };

    const toggleSelect = (invoiceId) => {
        setSelectedInvoices(prev => 
            prev.includes(invoiceId) 
                ? prev.filter(id => id !== invoiceId)
                : [...prev, invoiceId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedInvoices.length === filteredInvoices.length) {
            setSelectedInvoices([]);
        } else {
            setSelectedInvoices(filteredInvoices.map(inv => inv.id));
        }
    };

    return (
        <Card className="border-2 mb-6">
            <CardHeader>
                <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-[#1e3a5f]">Invoice Management</CardTitle>
                    {selectedInvoices.length > 0 && (
                        <Button
                            onClick={() => onBulkSend(selectedInvoices)}
                            className="bg-[#4a90e2] hover:bg-[#1e3a5f]"
                        >
                            <Send className="w-4 h-4 mr-2" />
                            Send {selectedInvoices.length} Selected
                        </Button>
                    )}
                </div>

                {/* Filters */}
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search by client or invoice #..."
                            value={filters.search}
                            onChange={(e) => setFilters({...filters, search: e.target.value})}
                            className="pl-10"
                        />
                    </div>
                    <Select
                        value={filters.status}
                        onValueChange={(value) => setFilters({...filters, status: value})}
                    >
                        <SelectTrigger className="w-48">
                            <Filter className="w-4 h-4 mr-2" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Sent">Sent</SelectItem>
                            <SelectItem value="Paid">Paid</SelectItem>
                            <SelectItem value="Overdue">Overdue</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">
                                    <Checkbox
                                        checked={selectedInvoices.length === filteredInvoices.length}
                                        onCheckedChange={toggleSelectAll}
                                    />
                                </TableHead>
                                <TableHead>Invoice #</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Balance</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredInvoices.map((invoice) => {
                                const statusBadge = getStatusBadge(invoice.status);
                                
                                return (
                                    <TableRow key={invoice.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedInvoices.includes(invoice.id)}
                                                onCheckedChange={() => toggleSelect(invoice.id)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-mono font-semibold text-[#1e3a5f]">
                                            {invoice.invoice_number}
                                        </TableCell>
                                        <TableCell>{invoice.client_name}</TableCell>
                                        <TableCell>{format(new Date(invoice.invoice_date), 'MMM d, yyyy')}</TableCell>
                                        <TableCell>{format(new Date(invoice.due_date), 'MMM d, yyyy')}</TableCell>
                                        <TableCell className="text-right font-semibold">
                                            ${invoice.total_amount.toLocaleString()}
                                        </TableCell>
                                        <TableCell className="text-right font-bold text-red-700">
                                            ${invoice.balance_due.toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={statusBadge.className}>{statusBadge.label}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button size="sm" variant="ghost">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => onAction('send', invoice)}>
                                                        <Send className="w-4 h-4 mr-2" />
                                                        Send Invoice
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => onAction('markPaid', invoice)}>
                                                        <CheckCircle className="w-4 h-4 mr-2" />
                                                        Mark as Paid
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => onAction('reminder', invoice)}>
                                                        <Mail className="w-4 h-4 mr-2" />
                                                        Send Reminder
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => onAction('void', invoice)} className="text-red-600">
                                                        <XCircle className="w-4 h-4 mr-2" />
                                                        Void Invoice
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}