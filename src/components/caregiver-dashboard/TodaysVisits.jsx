import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, AlertCircle, CheckCircle, Play, Square } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function TodaysVisits({ visits, onClockIn, onClockOut }) {
    const [activeVisitTimer, setActiveVisitTimer] = useState({});

    const handleClockIn = async (visit) => {
        await onClockIn(visit.id);
        toast.success('Clocked in successfully');
    };

    const handleClockOut = async (visit) => {
        await onClockOut(visit.id);
        toast.success('Clocked out successfully');
    };

    const getDirections = (visit, client) => {
        const address = `${client?.address_street}, ${client?.address_city}, ${client?.address_state} ${client?.address_zip}`;
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, '_blank');
    };

    if (!visits || visits.length === 0) {
        return (
            <Card>
                <CardContent className="py-12 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-lg text-gray-700">No visits scheduled today.</p>
                    <p className="text-gray-600">Enjoy your day off!</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#1e3a5f] mb-4">Today's Visits</h2>
            
            {visits.map((visit, index) => (
                <Card key={index} className="border-2 hover:border-[#4a90e2] transition-all">
                    <CardContent className="p-6">
                        {/* Time */}
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-5 h-5 text-[#4a90e2]" />
                            <p className="text-lg font-bold text-[#1e3a5f]">
                                {visit.scheduled_start_time} - {visit.scheduled_end_time}
                            </p>
                        </div>

                        {/* Client Info */}
                        <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">
                            {visit.client_name}
                        </h3>

                        {/* Address */}
                        <div className="flex items-start gap-2 mb-4">
                            <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-gray-700">
                                    {visit.client_address}
                                </p>
                                <Button 
                                    size="sm"
                                    variant="link"
                                    onClick={() => getDirections(visit, visit.client)}
                                    className="text-[#4a90e2] p-0 h-auto"
                                >
                                    Get Directions →
                                </Button>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {visit.services?.map((service, i) => (
                                <Badge key={i} className="bg-blue-100 text-blue-800">
                                    {service}
                                </Badge>
                            )) || (
                                <>
                                    <Badge className="bg-blue-100 text-blue-800">Personal Care</Badge>
                                    <Badge className="bg-blue-100 text-blue-800">Medication</Badge>
                                    <Badge className="bg-blue-100 text-blue-800">Meals</Badge>
                                </>
                            )}
                        </div>

                        {/* Special Notes */}
                        {visit.special_notes && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                                    <p className="text-sm text-gray-800">{visit.special_notes}</p>
                                </div>
                            </div>
                        )}

                        {/* Clock In/Out Buttons */}
                        {visit.status === 'Scheduled' && (
                            <Button 
                                onClick={() => handleClockIn(visit)}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-6"
                            >
                                <Play className="w-5 h-5 mr-2" />
                                Clock In
                            </Button>
                        )}

                        {visit.status === 'In Progress' && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-center gap-2 py-3 bg-green-50 rounded-lg">
                                    <Badge className="bg-green-600 text-white">In Progress</Badge>
                                    <span className="text-lg font-semibold text-green-700">
                                        {visit.elapsed_time || '1h 23m'}
                                    </span>
                                </div>
                                <Button 
                                    onClick={() => handleClockOut(visit)}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-6"
                                >
                                    <Square className="w-5 h-5 mr-2" />
                                    Clock Out
                                </Button>
                            </div>
                        )}

                        {visit.status === 'Completed' && (
                            <div className="bg-green-50 p-4 rounded-lg text-center">
                                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                <p className="font-semibold text-green-700">Completed ✓</p>
                            </div>
                        )}

                        {/* View Details */}
                        <Button 
                            variant="outline"
                            className="w-full mt-3 border-[#4a90e2] text-[#4a90e2]"
                        >
                            View Client Details
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}