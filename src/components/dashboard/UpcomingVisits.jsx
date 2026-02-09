import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function UpcomingVisits({ visits, onSchedule }) {
    const handleCancelVisit = (visit) => {
        if (window.confirm('Are you sure you want to cancel this visit? Please note that cancellations with less than 24 hours notice may incur a fee.')) {
            toast.success('Visit cancelled. Our team will contact you shortly.');
        }
    };

    if (!visits || visits.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-[#1e3a5f]">Upcoming Visits</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No upcoming visits scheduled</p>
                    <Button onClick={onSchedule} className="bg-[#4a90e2] hover:bg-[#1e3a5f]">
                        Schedule Now
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Upcoming Visits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {visits.slice(0, 3).map((visit, index) => (
                    <motion.div
                        key={visit.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-[#4a90e2] transition-all"
                    >
                        {/* Date & Time */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[#4a90e2]" />
                                <span className="font-semibold text-[#1e3a5f]">
                                    {format(new Date(visit.visit_date), 'EEEE, MMM d')} • {visit.scheduled_start_time} - {visit.scheduled_end_time}
                                </span>
                            </div>
                            <Badge className={visit.status === 'Scheduled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                {visit.status === 'Scheduled' ? (
                                    <><CheckCircle className="w-3 h-3 mr-1" /> Confirmed</>
                                ) : (
                                    <><AlertCircle className="w-3 h-3 mr-1" /> Pending</>
                                )}
                            </Badge>
                        </div>

                        {/* Caregiver */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-[#1e3a5f]">Caregiver Name</p>
                                <p className="text-sm text-gray-600">Certified Caregiver</p>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-600 mb-2">Services:</p>
                            <p className="text-[#2d3436]">Personal Care, Medication Management</p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Button 
                                size="sm" 
                                className="flex-1 bg-[#4a90e2] hover:bg-[#1e3a5f]"
                            >
                                View Details
                            </Button>
                            <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
                                onClick={() => handleCancelVisit(visit)}
                            >
                                Cancel Visit
                            </Button>
                        </div>
                    </motion.div>
                ))}

                {visits.length > 3 && (
                    <Button variant="outline" className="w-full">
                        View All Visits ({visits.length})
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}