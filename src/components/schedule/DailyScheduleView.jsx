import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, MapPin, User, Navigation, X } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function DailyScheduleView({ date, visits, open, onClose }) {
    if (!date) return null;

    const totalHours = visits?.reduce((sum, v) => sum + (v.total_hours || 4), 0) || 0;

    const getStatusBadge = (status) => {
        const configs = {
            'Scheduled': { className: 'bg-blue-100 text-blue-800', label: 'Confirmed' },
            'Pending': { className: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
            'Completed': { className: 'bg-green-100 text-green-800', label: 'Completed' },
            'In Progress': { className: 'bg-purple-100 text-purple-800', label: 'In Progress' }
        };
        return configs[status] || configs['Scheduled'];
    };

    const handleGetDirections = (visit) => {
        const address = visit.client_address || '123 Main St, Austin, TX';
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, '_blank');
    };

    const handleViewClient = (visit) => {
        toast.info('Client profile coming soon');
    };

    const handleCancelVisit = (visit) => {
        toast.info('Cancel visit feature coming soon');
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-[#1e3a5f] text-2xl">
                        {format(date, 'EEEE, MMMM d, yyyy')}
                    </DialogTitle>
                    <p className="text-gray-600">
                        {visits?.length || 0} visit{visits?.length !== 1 ? 's' : ''} • {totalHours} hours scheduled
                    </p>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    {!visits || visits.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No visits scheduled for this day
                        </div>
                    ) : (
                        visits.map((visit, index) => {
                            const statusBadge = getStatusBadge(visit.status);
                            
                            return (
                                <Card key={index} className="border-2">
                                    <CardContent className="pt-6">
                                        {/* Time */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-5 h-5 text-[#4a90e2]" />
                                                <span className="text-lg font-bold text-[#1e3a5f]">
                                                    {visit.scheduled_start_time} - {visit.scheduled_end_time}
                                                </span>
                                            </div>
                                            <Badge className={statusBadge.className}>
                                                {statusBadge.label}
                                            </Badge>
                                        </div>

                                        {/* Client */}
                                        <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">
                                            {visit.client_name || 'Client Name'}
                                        </h3>

                                        {/* Address */}
                                        <div className="flex items-start gap-2 mb-4">
                                            <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">
                                                {visit.client_address || '123 Main St, Austin, TX 78701'}
                                            </span>
                                        </div>

                                        {/* Services */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {visit.services?.map((service, i) => (
                                                <Badge key={i} variant="outline" className="border-[#4a90e2] text-[#4a90e2]">
                                                    {service}
                                                </Badge>
                                            )) || (
                                                <>
                                                    <Badge variant="outline" className="border-[#4a90e2] text-[#4a90e2]">Personal Care</Badge>
                                                    <Badge variant="outline" className="border-[#4a90e2] text-[#4a90e2]">Medication</Badge>
                                                    <Badge variant="outline" className="border-[#4a90e2] text-[#4a90e2]">Meals</Badge>
                                                </>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <Button 
                                                onClick={() => handleGetDirections(visit)}
                                                variant="outline"
                                                className="border-[#4a90e2] text-[#4a90e2]"
                                            >
                                                <Navigation className="w-4 h-4 mr-2" />
                                                Get Directions
                                            </Button>
                                            <Button 
                                                onClick={() => handleViewClient(visit)}
                                                variant="outline"
                                                className="border-[#1e3a5f] text-[#1e3a5f]"
                                            >
                                                <User className="w-4 h-4 mr-2" />
                                                View Client
                                            </Button>
                                        </div>
                                        <Button 
                                            onClick={() => handleCancelVisit(visit)}
                                            variant="ghost"
                                            className="w-full mt-2 text-red-600 hover:bg-red-50"
                                        >
                                            <X className="w-4 h-4 mr-2" />
                                            Cancel Visit
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}