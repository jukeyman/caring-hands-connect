import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Circle } from 'lucide-react';
import { format } from 'date-fns';

export default function CarePlanHistory({ carePlan, changeHistory = [] }) {
    // Generate timeline from care plan data and changes
    const timeline = [
        {
            date: carePlan?.updated_date,
            event: 'Care plan last updated'
        },
        {
            date: carePlan?.start_date,
            event: 'Care plan activated'
        },
        ...changeHistory
    ].filter(item => item.date).sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Care Plan Change History
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {timeline.length === 0 ? (
                        <p className="text-gray-600">No change history available</p>
                    ) : (
                        timeline.map((item, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <Circle className="w-3 h-3 fill-[#4a90e2] text-[#4a90e2]" />
                                    {index < timeline.length - 1 && (
                                        <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                                    )}
                                </div>
                                <div className="flex-1 pb-6">
                                    <p className="text-sm font-semibold text-[#1e3a5f]">
                                        {format(new Date(item.date), 'MMMM d, yyyy')}
                                    </p>
                                    <p className="text-sm text-gray-700 mt-1">
                                        {item.event}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}