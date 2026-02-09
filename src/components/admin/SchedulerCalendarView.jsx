import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { format, addDays, startOfWeek } from 'date-fns';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function SchedulerCalendarView({ weekStart, caregivers, visits, onDateChange, onDragEnd, colorMode }) {
    const timeSlots = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'];
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    const getVisitsForCaregiverAndDay = (caregiverId, date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        return visits.filter(v => 
            v.caregiver_id === caregiverId && 
            format(new Date(v.visit_date), 'yyyy-MM-dd') === dateStr
        );
    };

    const hasConflict = (caregiverId, date) => {
        const dayVisits = getVisitsForCaregiverAndDay(caregiverId, date);
        return dayVisits.length > 1;
    };

    const getColorClass = (visit) => {
        if (colorMode === 'client') {
            const colors = ['bg-blue-100 border-blue-400', 'bg-green-100 border-green-400', 'bg-purple-100 border-purple-400', 'bg-pink-100 border-pink-400'];
            return colors[parseInt(visit.client_id.slice(-1), 16) % colors.length];
        } else if (colorMode === 'service') {
            const serviceColors = {
                'Regular': 'bg-blue-100 border-blue-400',
                'Overnight': 'bg-purple-100 border-purple-400',
                'Live-In': 'bg-green-100 border-green-400'
            };
            return serviceColors[visit.visit_type] || 'bg-gray-100 border-gray-400';
        }
        return 'bg-indigo-100 border-indigo-400';
    };

    return (
        <Card className="border-2 mb-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-[#1e3a5f]">Weekly Schedule</CardTitle>
                    <div className="flex items-center gap-3">
                        <Select value={colorMode} onValueChange={(v) => {}}>
                            <SelectTrigger className="w-48">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="client">Color by Client</SelectItem>
                                <SelectItem value="service">Color by Service</SelectItem>
                                <SelectItem value="caregiver">Color by Caregiver</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            variant="outline"
                            onClick={() => onDateChange(addDays(weekStart, -7))}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <span className="font-semibold text-[#1e3a5f] min-w-48 text-center">
                            {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
                        </span>
                        <Button
                            variant="outline"
                            onClick={() => onDateChange(addDays(weekStart, 7))}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-[1200px]">
                            <thead>
                                <tr>
                                    <th className="border-2 bg-gray-100 p-3 text-left font-bold text-[#1e3a5f] sticky left-0 z-10">
                                        Caregiver
                                    </th>
                                    {weekDays.map((day, i) => (
                                        <th key={i} className="border-2 bg-gray-100 p-3 text-center min-w-36">
                                            <div className="font-bold text-[#1e3a5f]">
                                                {format(day, 'EEE')}
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                {format(day, 'MMM d')}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {caregivers.map((caregiver) => (
                                    <tr key={caregiver.id}>
                                        <td className="border-2 p-3 bg-white font-semibold text-[#1e3a5f] sticky left-0 z-10">
                                            {caregiver.first_name} {caregiver.last_name}
                                        </td>
                                        {weekDays.map((day, dayIndex) => {
                                            const dayVisits = getVisitsForCaregiverAndDay(caregiver.id, day);
                                            const conflict = hasConflict(caregiver.id, day);
                                            const droppableId = `${caregiver.id}-${format(day, 'yyyy-MM-dd')}`;

                                            return (
                                                <Droppable key={dayIndex} droppableId={droppableId}>
                                                    {(provided, snapshot) => (
                                                        <td
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                            className={`border-2 p-2 align-top ${
                                                                conflict ? 'bg-red-50 border-red-400' : 'bg-white'
                                                            } ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
                                                        >
                                                            <div className="space-y-1 min-h-20">
                                                                {dayVisits.map((visit, vIndex) => (
                                                                    <Draggable
                                                                        key={visit.id}
                                                                        draggableId={visit.id}
                                                                        index={vIndex}
                                                                    >
                                                                        {(provided, snapshot) => (
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                className={`border-l-4 rounded p-2 text-xs ${getColorClass(visit)} ${
                                                                                    snapshot.isDragging ? 'shadow-lg' : ''
                                                                                }`}
                                                                            >
                                                                                <p className="font-bold text-[#1e3a5f] truncate">
                                                                                    {visit.client_name}
                                                                                </p>
                                                                                <p className="text-gray-700">
                                                                                    {visit.scheduled_start_time} - {visit.scheduled_end_time}
                                                                                </p>
                                                                                {conflict && (
                                                                                    <div className="flex items-center gap-1 text-red-700 mt-1">
                                                                                        <AlertTriangle className="w-3 h-3" />
                                                                                        <span className="text-xs font-bold">Conflict!</span>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                ))}
                                                                {provided.placeholder}
                                                            </div>
                                                        </td>
                                                    )}
                                                </Droppable>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </DragDropContext>
            </CardContent>
        </Card>
    );
}