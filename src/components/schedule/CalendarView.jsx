import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

export default function CalendarView({ visits, onDayClick }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const getVisitsForDay = (day) => {
        const dayStr = format(day, 'yyyy-MM-dd');
        return visits?.filter(v => v.visit_date === dayStr) || [];
    };

    const getDayColor = (day, dayVisits) => {
        if (dayVisits.length === 0) return 'bg-gray-50 text-gray-400';
        
        const hasCompleted = dayVisits.some(v => v.status === 'Completed');
        const hasPending = dayVisits.some(v => v.status === 'Pending');
        const hasConfirmed = dayVisits.some(v => v.status === 'Scheduled');
        
        if (hasCompleted) return 'bg-green-100 text-green-800 border-green-300';
        if (hasPending) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        if (hasConfirmed) return 'bg-blue-100 text-blue-800 border-blue-300';
        return 'bg-gray-100 text-gray-600';
    };

    const getTotalHours = (dayVisits) => {
        return dayVisits.reduce((sum, v) => sum + (v.total_hours || 4), 0);
    };

    const canNavigateNext = () => {
        const threeMonthsAhead = addMonths(new Date(), 3);
        return currentMonth < threeMonthsAhead;
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-[#1e3a5f]">
                        {format(currentMonth, 'MMMM yyyy')}
                    </CardTitle>
                    <div className="flex gap-2">
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                            disabled={!canNavigateNext()}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-2 mb-3">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-2">
                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square" />
                    ))}
                    
                    {/* Days of month */}
                    {days.map((day) => {
                        const dayVisits = getVisitsForDay(day);
                        const totalHours = getTotalHours(dayVisits);
                        const isToday = isSameDay(day, new Date());
                        
                        return (
                            <button
                                key={day.toString()}
                                onClick={() => onDayClick(day, dayVisits)}
                                className={`aspect-square p-2 rounded-lg border-2 transition-all hover:shadow-lg ${
                                    getDayColor(day, dayVisits)
                                } ${isToday ? 'ring-2 ring-[#d4af37]' : ''}`}
                            >
                                <div className="text-sm font-bold mb-1">
                                    {format(day, 'd')}
                                </div>
                                {dayVisits.length > 0 && (
                                    <div className="text-xs">
                                        <div className="font-semibold">{dayVisits.length} visit{dayVisits.length > 1 ? 's' : ''}</div>
                                        <div>{totalHours}h</div>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="mt-6 flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-300"></div>
                        <span className="text-gray-600">Confirmed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-yellow-100 border-2 border-yellow-300"></div>
                        <span className="text-gray-600">Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-300"></div>
                        <span className="text-gray-600">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-gray-50 border-2 border-gray-200"></div>
                        <span className="text-gray-600">Day Off</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}