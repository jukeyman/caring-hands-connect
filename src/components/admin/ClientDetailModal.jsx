import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Calendar, DollarSign, FileText, MessageCircle, Activity, Phone, Mail, MapPin, Download } from 'lucide-react';
import { format } from 'date-fns';

export default function ClientDetailModal({ open, onClose, client, visits, invoices, documents, messages, activityLog }) {
    if (!client) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-[#1e3a5f] flex items-center gap-3">
                        <User className="w-6 h-6" />
                        {client.first_name} {client.last_name}
                    </DialogTitle>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {client.phone}
                        </div>
                        <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {client.email}
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {client.address_city}, {client.address_state}
                        </div>
                    </div>
                </DialogHeader>

                <Tabs defaultValue="overview" className="mt-6">
                    <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="visits">Visits</TabsTrigger>
                        <TabsTrigger value="billing">Billing</TabsTrigger>
                        <TabsTrigger value="documents">Documents</TabsTrigger>
                        <TabsTrigger value="communication">Communication</TabsTrigger>
                        <TabsTrigger value="activity">Activity Log</TabsTrigger>
                    </TabsList>

                    {/* OVERVIEW TAB */}
                    <TabsContent value="overview" className="space-y-4">
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-[#1e3a5f] mb-4">Profile Information</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Date of Birth</p>
                                        <p className="font-semibold">{format(new Date(client.date_of_birth), 'MMM d, yyyy')}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Status</p>
                                        <Badge className={getStatusBadge(client.status).className}>
                                            {client.status}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Mobility Level</p>
                                        <p className="font-semibold">{client.mobility_level || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Cognitive Status</p>
                                        <p className="font-semibold">{client.cognitive_status || 'N/A'}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-[#1e3a5f] mb-4">Emergency Contact</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Name</p>
                                        <p className="font-semibold">{client.emergency_contact_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Phone</p>
                                        <p className="font-semibold">{client.emergency_contact_phone}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-gray-600">Relationship</p>
                                        <p className="font-semibold">{client.emergency_contact_relationship}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-[#1e3a5f] mb-4">Medical Information</h3>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <p className="text-gray-600">Medical Conditions</p>
                                        <p className="font-semibold">{client.medical_conditions || 'None listed'}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Medications</p>
                                        <p className="font-semibold">{client.medications || 'None listed'}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* VISITS TAB */}
                    <TabsContent value="visits">
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-[#1e3a5f] mb-4">Visit History</h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Caregiver</TableHead>
                                            <TableHead>Time</TableHead>
                                            <TableHead>Hours</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {visits?.map((visit) => (
                                            <TableRow key={visit.id}>
                                                <TableCell>{format(new Date(visit.visit_date), 'MMM d, yyyy')}</TableCell>
                                                <TableCell>{visit.caregiver_name}</TableCell>
                                                <TableCell>{visit.actual_start_time} - {visit.actual_end_time}</TableCell>
                                                <TableCell>{visit.total_hours}h</TableCell>
                                                <TableCell>
                                                    <Badge className={visit.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                                                        {visit.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* BILLING TAB */}
                    <TabsContent value="billing">
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-[#1e3a5f] mb-4">Invoice History</h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Invoice #</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {invoices?.map((invoice) => (
                                            <TableRow key={invoice.id}>
                                                <TableCell className="font-mono">{invoice.invoice_number}</TableCell>
                                                <TableCell>{format(new Date(invoice.invoice_date), 'MMM d, yyyy')}</TableCell>
                                                <TableCell className="font-semibold">${invoice.total_amount?.toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <Badge className={invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                                        {invoice.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Button size="sm" variant="outline">
                                                        <Download className="w-4 h-4 mr-1" />
                                                        PDF
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* DOCUMENTS TAB */}
                    <TabsContent value="documents">
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-[#1e3a5f] mb-4">Documents</h3>
                                <div className="space-y-3">
                                    {documents?.map((doc, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-6 h-6 text-[#4a90e2]" />
                                                <div>
                                                    <p className="font-semibold text-[#1e3a5f]">{doc.name}</p>
                                                    <p className="text-xs text-gray-600">{doc.date}</p>
                                                </div>
                                            </div>
                                            <Button size="sm" variant="outline">
                                                <Download className="w-4 h-4 mr-1" />
                                                Download
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* COMMUNICATION TAB */}
                    <TabsContent value="communication">
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-[#1e3a5f] mb-4">Message History</h3>
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {messages?.map((msg, index) => (
                                        <div key={index} className="border-l-4 border-[#4a90e2] bg-gray-50 p-3 rounded">
                                            <div className="flex items-start justify-between mb-2">
                                                <p className="font-semibold text-[#1e3a5f] text-sm">{msg.sender_name}</p>
                                                <p className="text-xs text-gray-500">{format(new Date(msg.created_date), 'MMM d, h:mm a')}</p>
                                            </div>
                                            <p className="text-sm text-gray-700">{msg.message_text}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* ACTIVITY LOG TAB */}
                    <TabsContent value="activity">
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-bold text-[#1e3a5f] mb-4">Activity Log</h3>
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {activityLog?.map((log, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                                            <Activity className="w-4 h-4 text-gray-500 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-[#1e3a5f]">{log.action}</p>
                                                <p className="text-xs text-gray-600">{log.details}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {format(new Date(log.timestamp), 'MMM d, yyyy h:mm a')} • {log.user}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

function getStatusBadge(status) {
    const config = {
        'Active': { className: 'bg-green-100 text-green-800', label: 'Active' },
        'Paused': { className: 'bg-yellow-100 text-yellow-800', label: 'Paused' },
        'Inquiry': { className: 'bg-blue-100 text-blue-800', label: 'Inquiry' },
        'Discharged': { className: 'bg-gray-100 text-gray-800', label: 'Discharged' }
    };
    return config[status] || config['Active'];
}