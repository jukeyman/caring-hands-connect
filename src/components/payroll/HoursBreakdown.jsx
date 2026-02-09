import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function HoursBreakdown({ hours }) {
    const [filter, setFilter] = useState('all');

    const filteredHours = hours.filter(h => {
        if (filter === 'regular') return !h.is_overtime;
        if (filter === 'overtime') return h.is_overtime;
        return true;
    });

    const totals = hours.reduce((acc, h) => ({
        hours: acc.hours + h.hours,
        earnings: acc.earnings + h.earnings
    }), { hours: 0, earnings: 0 });

    const handleExport = () => {
        toast.info('CSV export coming soon');
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <CardTitle className="text-[#1e3a5f]">Hours This Pay Period</CardTitle>
                    <div className="flex gap-3">
                        <Select value={filter} onValueChange={setFilter}>
                            <SelectTrigger className="w-40">
                                <Filter className="w-4 h-4 mr-2" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Show All</SelectItem>
                                <SelectItem value="regular">Regular Only</SelectItem>
                                <SelectItem value="overtime">Overtime Only</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={handleExport}
                            variant="outline"
                            className="border-[#4a90e2] text-[#4a90e2]"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export CSV
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Clock In</TableHead>
                                <TableHead>Clock Out</TableHead>
                                <TableHead>Break</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead className="text-right">Rate</TableHead>
                                <TableHead className="text-right">Earnings</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredHours.map((entry, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {format(new Date(entry.date), 'MMM d')}
                                    </TableCell>
                                    <TableCell>{entry.client_name}</TableCell>
                                    <TableCell>{entry.clock_in}</TableCell>
                                    <TableCell>{entry.clock_out}</TableCell>
                                    <TableCell>{entry.break || '0'}</TableCell>
                                    <TableCell className="text-right font-semibold">
                                        {entry.hours}h
                                    </TableCell>
                                    <TableCell className="text-right">${entry.rate}</TableCell>
                                    <TableCell className="text-right font-semibold text-green-700">
                                        ${entry.earnings.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow className="bg-gray-100 font-bold">
                                <TableCell colSpan={5}>TOTAL</TableCell>
                                <TableCell className="text-right">{totals.hours.toFixed(1)}h</TableCell>
                                <TableCell className="text-right">-</TableCell>
                                <TableCell className="text-right text-green-700">
                                    ${totals.earnings.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}