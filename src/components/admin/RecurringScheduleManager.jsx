import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Repeat, Calendar, Play, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function RecurringScheduleManager({ schedules, onGenerateVisits, onEdit }) {
    const [generating, setGenerating] = useState(false);

    const handleBulkGenerate = async () => {
        setGenerating(true);
        await onGenerateVisits(30); // Generate for next 30 days
        setGenerating(false);
    };

    return (
        <Card className="border-2 mb-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                            <Repeat className="w-5 h-5" />
                            Recurring Schedule Templates
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{schedules.length} active recurring schedules</p>
                    </div>
                    <Button
                        onClick={handleBulkGenerate}
                        disabled={generating}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        {generating ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Calendar className="w-4 h-4 mr-2" />
                                Generate Next 30 Days
                            </>
                        )}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>Caregiver</TableHead>
                            <TableHead>Pattern</TableHead>
                            <TableHead>Days</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {schedules.map((schedule) => (
                            <TableRow key={schedule.id}>
                                <TableCell className="font-semibold text-[#1e3a5f]">
                                    {schedule.client_name}
                                </TableCell>
                                <TableCell>{schedule.caregiver_name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{schedule.recurrence_pattern}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        {schedule.days_of_week?.map((day, i) => (
                                            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                {day.slice(0, 3)}
                                            </span>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm">
                                    {schedule.start_time} - {schedule.end_time}
                                </TableCell>
                                <TableCell>
                                    <Badge className={schedule.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                        {schedule.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => onEdit(schedule)}
                                    >
                                        <Edit className="w-4 h-4 mr-1" />
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}