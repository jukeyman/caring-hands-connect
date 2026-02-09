import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Star, UserPlus } from 'lucide-react';
import { format } from 'date-fns';

export default function UnassignedVisitsQueue({ visits, onAssign }) {
    return (
        <Card className="border-2 border-orange-300">
            <CardHeader className="bg-orange-50">
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Unassigned Visits
                    <Badge className="bg-orange-600 text-white ml-auto">{visits.length}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {visits.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">All visits assigned! ✓</p>
                    ) : (
                        visits.map((visit) => (
                            <div key={visit.id} className="border-2 border-gray-200 rounded-lg p-4 bg-white hover:border-orange-400 transition-all">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <p className="font-bold text-[#1e3a5f] text-lg">{visit.client_name}</p>
                                        <p className="text-sm text-gray-600">
                                            {format(new Date(visit.visit_date), 'EEE, MMM d, yyyy')}
                                        </p>
                                    </div>
                                    <Badge className="bg-blue-100 text-blue-800">
                                        {visit.visit_type}
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{visit.scheduled_start_time} - {visit.scheduled_end_time}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{visit.client_city}</span>
                                    </div>
                                </div>

                                {visit.services && (
                                    <div className="bg-gray-50 p-2 rounded mb-3">
                                        <p className="text-xs text-gray-600">Services</p>
                                        <p className="text-sm font-semibold text-[#1e3a5f]">
                                            {visit.services.join(', ')}
                                        </p>
                                    </div>
                                )}

                                {visit.preferred_caregiver && (
                                    <div className="bg-blue-50 p-2 rounded mb-3">
                                        <p className="text-xs text-gray-600">Preferred Caregiver</p>
                                        <p className="text-sm font-semibold text-blue-900">
                                            {visit.preferred_caregiver}
                                        </p>
                                    </div>
                                )}

                                {visit.best_match && (
                                    <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-3">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-4 h-4 text-green-600" />
                                            <p className="text-sm font-bold text-green-900">
                                                Best match: {visit.best_match.name}
                                            </p>
                                        </div>
                                        <p className="text-xs text-green-700 mt-1">
                                            {visit.best_match.score}% match • {visit.best_match.reason}
                                        </p>
                                    </div>
                                )}

                                <Button
                                    onClick={() => onAssign(visit)}
                                    className="w-full bg-[#4a90e2] hover:bg-[#1e3a5f]"
                                >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Assign Caregiver
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}