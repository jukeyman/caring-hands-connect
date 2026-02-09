import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { format } from 'date-fns';

export default function VisitHistory({ visits, caregiverFirstName }) {
    if (!visits || visits.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-[#1e3a5f]">
                        Your Visit History with {caregiverFirstName}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600">No completed visits yet</p>
                </CardContent>
            </Card>
        );
    }

    const completedVisits = visits.filter(v => v.status === 'Completed');
    const averageRating = 5; // Would calculate from actual ratings

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">
                    Your Visit History with {caregiverFirstName}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] text-white rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold mb-1">{completedVisits.length}</p>
                        <p className="text-sm">Total Visits</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941f] text-white rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Star className="w-5 h-5 fill-white" />
                            <p className="text-3xl font-bold">{averageRating.toFixed(1)}</p>
                        </div>
                        <p className="text-sm">Average Rating</p>
                    </div>
                </div>

                {/* Visit Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-2 text-sm font-semibold text-[#1e3a5f]">Date</th>
                                <th className="text-left py-3 px-2 text-sm font-semibold text-[#1e3a5f]">Service</th>
                                <th className="text-left py-3 px-2 text-sm font-semibold text-[#1e3a5f]">Duration</th>
                                <th className="text-left py-3 px-2 text-sm font-semibold text-[#1e3a5f]">Your Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedVisits.slice(0, 5).map((visit, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-2 text-sm text-gray-700">
                                        {format(new Date(visit.visit_date), 'MMM d, yyyy')}
                                    </td>
                                    <td className="py-3 px-2 text-sm text-gray-700">
                                        {visit.visit_type}
                                    </td>
                                    <td className="py-3 px-2 text-sm text-gray-700">
                                        {visit.total_hours || 4} hours
                                    </td>
                                    <td className="py-3 px-2">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star 
                                                    key={i} 
                                                    className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" 
                                                />
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}