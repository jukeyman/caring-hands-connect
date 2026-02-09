import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { toast } from 'sonner';

export default function CaregiverAvailabilityMatrix({ weekStart, caregivers, availability, onQuickAssign }) {
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    const timeBlocks = ['Morning', 'Afternoon', 'Evening', 'Overnight'];

    const isAvailable = (caregiverId, date, timeBlock) => {
        const key = `${caregiverId}-${format(date, 'yyyy-MM-dd')}-${timeBlock}`;
        return availability[key] !== false;
    };

    const handleCellClick = (caregiver, date, timeBlock) => {
        if (isAvailable(caregiver.id, date, timeBlock)) {
            onQuickAssign(caregiver, date, timeBlock);
        } else {
            toast.error(`${caregiver.first_name} is not available during this time`);
        }
    };

    return (
        <Card className="border-2 mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Caregiver Availability Matrix</CardTitle>
                <p className="text-sm text-gray-600">Click a green cell to quick-assign a visit</p>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[1000px]">
                        <thead>
                            <tr>
                                <th className="border-2 bg-gray-100 p-3 text-left font-bold text-[#1e3a5f] sticky left-0 z-10">
                                    Caregiver
                                </th>
                                {weekDays.map((day, i) => (
                                    <th key={i} colSpan={4} className="border-2 bg-gray-100 p-2 text-center">
                                        <div className="font-bold text-[#1e3a5f]">{format(day, 'EEE')}</div>
                                        <div className="text-xs text-gray-600">{format(day, 'MMM d')}</div>
                                    </th>
                                ))}
                            </tr>
                            <tr>
                                <th className="border-2 bg-gray-50 p-2 sticky left-0 z-10"></th>
                                {weekDays.map((day, dayIndex) => (
                                    <React.Fragment key={dayIndex}>
                                        {timeBlocks.map((block, blockIndex) => (
                                            <th key={blockIndex} className="border bg-gray-50 p-1 text-xs text-gray-600">
                                                {block.slice(0, 3)}
                                            </th>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {caregivers.map((caregiver) => (
                                <tr key={caregiver.id}>
                                    <td className="border-2 p-3 bg-white font-semibold text-[#1e3a5f] sticky left-0 z-10">
                                        {caregiver.first_name} {caregiver.last_name}
                                    </td>
                                    {weekDays.map((day, dayIndex) => (
                                        <React.Fragment key={dayIndex}>
                                            {timeBlocks.map((block, blockIndex) => {
                                                const available = isAvailable(caregiver.id, day, block);
                                                
                                                return (
                                                    <td
                                                        key={blockIndex}
                                                        onClick={() => handleCellClick(caregiver, day, block)}
                                                        className={`border p-1 text-center cursor-pointer transition-all hover:opacity-80 ${
                                                            available 
                                                                ? 'bg-green-100 hover:bg-green-200' 
                                                                : 'bg-red-100 hover:bg-red-200'
                                                        }`}
                                                    >
                                                        {available ? (
                                                            <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />
                                                        ) : (
                                                            <XCircle className="w-4 h-4 text-red-600 mx-auto" />
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </React.Fragment>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}