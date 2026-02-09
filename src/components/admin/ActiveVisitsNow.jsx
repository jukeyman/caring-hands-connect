import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from 'lucide-react';
import { format, differenceInMinutes, parseISO } from 'date-fns';

export default function ActiveVisitsNow({ visits }) {
    const [timers, setTimers] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimers = {};
            visits.forEach(visit => {
                if (visit.actual_start_time) {
                    const startTime = new Date();
                    startTime.setHours(parseInt(visit.actual_start_time.split(':')[0]));
                    startTime.setMinutes(parseInt(visit.actual_start_time.split(':')[1]));
                    const elapsed = differenceInMinutes(new Date(), startTime);
                    const hours = Math.floor(elapsed / 60);
                    const minutes = elapsed % 60;
                    newTimers[visit.id] = `${hours}h ${minutes}m`;
                }
            });
            setTimers(newTimers);
        }, 1000);

        return () => clearInterval(interval);
    }, [visits]);

    return (
        <Card className="border-2 border-green-300">
            <CardHeader className="bg-green-50">
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-600 animate-pulse" />
                    Active Visits Right Now
                    <Badge className="bg-green-600 text-white ml-auto">{visits.length}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                {visits.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No active visits at this time</p>
                ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {visits.map((visit) => (
                            <div key={visit.id} className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-green-400 transition-all">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <p className="font-bold text-[#1e3a5f]">{visit.client_name}</p>
                                        <p className="text-sm text-gray-600">{visit.caregiver_name}</p>
                                    </div>
                                    <Badge className="bg-green-100 text-green-800 animate-pulse">
                                        Live
                                    </Badge>
                                </div>
                                
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{visit.actual_start_time} - {visit.scheduled_end_time}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{visit.client_city}</span>
                                    </div>
                                </div>

                                <div className="bg-green-50 rounded p-2 text-center">
                                    <p className="text-xs text-gray-600">Elapsed Time</p>
                                    <p className="font-bold text-lg text-green-700">
                                        {timers[visit.id] || '0h 0m'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}