import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function PendingHoursApproval({ pendingVisits }) {
    if (!pendingVisits || pendingVisits.length === 0) {
        return (
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Hours Pending Approval
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-700">All hours approved! ✓</p>
                    <p className="text-sm text-gray-600">No visits awaiting review</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mb-6 border-2 border-yellow-400">
            <CardHeader className="bg-yellow-50">
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Hours Pending Approval
                    <Badge className="bg-yellow-100 text-yellow-800">{pendingVisits.length}</Badge>
                </CardTitle>
                <p className="text-sm text-gray-600">These visits are awaiting supervisor review</p>
            </CardHeader>
            <CardContent className="space-y-3 pt-6">
                {pendingVisits.map((visit, index) => (
                    <div key={index} className="border-2 border-gray-200 rounded-lg p-4 bg-white">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <p className="font-bold text-[#1e3a5f]">
                                    {format(new Date(visit.visit_date), 'MMMM d, yyyy')}
                                </p>
                                <p className="text-sm text-gray-600">{visit.client_name}</p>
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-800">
                                Pending Approval
                            </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                            <div>
                                <p className="text-gray-600">Scheduled</p>
                                <p className="font-semibold">
                                    {visit.scheduled_start_time} - {visit.scheduled_end_time}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Actual</p>
                                <p className="font-semibold">
                                    {visit.actual_start_time} - {visit.actual_end_time}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <span className="text-sm font-semibold text-gray-700">Hours</span>
                            <span className="text-lg font-bold text-[#1e3a5f]">{visit.hours} hours</span>
                        </div>

                        {visit.reason && (
                            <div className="mt-3 bg-yellow-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">Reason for Review</p>
                                <p className="text-sm font-semibold text-gray-800">{visit.reason}</p>
                            </div>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}