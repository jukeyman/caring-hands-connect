import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, MessageCircle, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format } from 'date-fns';

export default function ClientListTable({ clients, onViewDetails, onEdit, onMessage }) {
    const getStatusBadge = (status) => {
        const config = {
            'Active': { className: 'bg-green-100 text-green-800', label: 'Active' },
            'Paused': { className: 'bg-yellow-100 text-yellow-800', label: 'Paused' },
            'Inquiry': { className: 'bg-blue-100 text-blue-800', label: 'Inquiry' },
            'Discharged': { className: 'bg-gray-100 text-gray-800', label: 'Discharged' }
        };
        return config[status] || config['Active'];
    };

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Care Plan</TableHead>
                        <TableHead>Hours/Week</TableHead>
                        <TableHead>Monthly Value</TableHead>
                        <TableHead>Primary Caregiver</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {clients.map((client) => {
                        const statusBadge = getStatusBadge(client.status);
                        
                        return (
                            <TableRow key={client.id} className="hover:bg-gray-50">
                                <TableCell>
                                    <div>
                                        <p className="font-semibold text-[#1e3a5f]">
                                            {client.first_name} {client.last_name}
                                        </p>
                                        <p className="text-xs text-gray-500">{client.phone}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge className={statusBadge.className}>
                                        {statusBadge.label}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">{client.care_plan_type || 'Not Set'}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="font-semibold">{client.hours_per_week || 0}h</span>
                                </TableCell>
                                <TableCell>
                                    <span className="font-semibold text-green-700">
                                        ${client.monthly_value?.toLocaleString() || '0'}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">{client.primary_caregiver || 'Unassigned'}</span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => onViewDetails(client)}
                                        >
                                            <Eye className="w-4 h-4 mr-1" />
                                            View
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="sm" variant="ghost">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => onEdit(client)}>
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit Client
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => onMessage(client)}>
                                                    <MessageCircle className="w-4 h-4 mr-2" />
                                                    Send Message
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">
                                                    Deactivate
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}