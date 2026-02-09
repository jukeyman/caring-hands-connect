import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

export default function VisitHeader({ visit, client, caregiver }) {
    const duration = visit.total_hours || 4;
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);

    return (
        <Card className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] text-white mb-6">
            <CardContent className="pt-6 space-y-3">
                <h1 className="text-2xl font-bold">
                    {client?.first_name} {client?.last_name?.charAt(0)}.
                </h1>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(visit.visit_date), 'EEEE, MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{visit.scheduled_start_time} - {visit.scheduled_end_time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Duration: {hours}h {minutes}m</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{caregiver?.first_name} {caregiver?.last_name}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}