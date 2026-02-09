import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar } from 'lucide-react';

export default function ScheduleDetails({ carePlan, onRequestChange }) {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    // Parse preferred days - could be string or array
    const preferredDaysArray = carePlan.preferred_days 
        ? (Array.isArray(carePlan.preferred_days) 
            ? carePlan.preferred_days 
            : carePlan.preferred_days.split(',').map(d => d.trim()))
        : [];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Schedule & Hours
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Summary Stats */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] text-white rounded-lg p-4">
                        <p className="text-sm mb-1">Total Hours Per Week</p>
                        <p className="text-3xl font-bold">{carePlan.hours_per_week}</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941f] text-white rounded-lg p-4">
                        <p className="text-sm mb-1">Schedule Type</p>
                        <p className="text-xl font-bold">{carePlan.schedule_type}</p>
                    </div>
                </div>

                {/* Days & Times */}
                <div>
                    <p className="font-semibold text-[#1e3a5f] mb-3">Days & Times:</p>
                    <div className="space-y-2">
                        {preferredDaysArray.map((day, index) => (
                            <div 
                                key={index}
                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                            >
                                <Calendar className="w-4 h-4 text-[#4a90e2]" />
                                <span className="font-medium text-[#1e3a5f]">{day}</span>
                                <span className="text-gray-600">
                                    {carePlan.preferred_times || '9:00 AM - 1:00 PM'}
                                </span>
                                <span className="text-sm text-gray-500 ml-auto">
                                    ({(carePlan.hours_per_week / preferredDaysArray.length).toFixed(1)} hours)
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <Button 
                    onClick={onRequestChange}
                    variant="outline"
                    className="w-full border-[#4a90e2] text-[#4a90e2] hover:bg-[#4a90e2] hover:text-white"
                >
                    Request Schedule Change
                </Button>
            </CardContent>
        </Card>
    );
}