import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from 'lucide-react';
import { format, startOfWeek, addDays } from 'date-fns';

export default function WeeklySchedule({ visits, onViewFull }) {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
    const weekDays = [...Array(7)].map((_, i) => addDays(weekStart, i));

    const getVisitsForDay = (day) => {
        const dayStr = format(day, 'yyyy-MM-dd');
        return visits?.filter(v => v.visit_date === dayStr) || [];
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        This Week at a Glance
                    </CardTitle>
                    <Button 
                        size="sm"
                        variant="ghost"
                        onClick={onViewFull}
                        className="text-[#4a90e2]"
                    >
                        View Full
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
                <div className="flex gap-3 pb-2">
                    {weekDays.map((day, index) => {
                        const dayVisits = getVisitsForDay(day);
                        const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

                        return (
                            <div 
                                key={index}
                                className={`flex-shrink-0 w-28 rounded-lg p-3 text-center cursor-pointer transition-all ${
                                    isToday 
                                        ? 'bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] text-white' 
                                        : 'bg-gray-50 hover:bg-gray-100'
                                }`}
                            >
                                <p className={`text-xs font-semibold mb-1 ${
                                    isToday ? 'text-gray-200' : 'text-gray-600'
                                }`}>
                                    {format(day, 'EEE')}
                                </p>
                                <p className={`text-2xl font-bold mb-2 ${
                                    isToday ? 'text-white' : 'text-[#1e3a5f]'
                                }`}>
                                    {format(day, 'd')}
                                </p>
                                {dayVisits.length > 0 ? (
                                    <Badge className={
                                        isToday 
                                            ? 'bg-white/20 text-white' 
                                            : 'bg-[#4a90e2] text-white'
                                    }>
                                        {dayVisits.length} visit{dayVisits.length > 1 ? 's' : ''}
                                    </Badge>
                                ) : (
                                    <p className={`text-xs ${
                                        isToday ? 'text-gray-300' : 'text-gray-500'
                                    }`}>
                                        Day Off
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}