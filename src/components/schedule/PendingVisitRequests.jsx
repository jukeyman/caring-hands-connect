import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, MapPin, DollarSign, Check, X, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function PendingVisitRequests({ requests, onAccept, onDecline }) {
    const [declining, setDeclining] = useState(null);
    const [declineReason, setDeclineReason] = useState('');
    const [declineNotes, setDeclineNotes] = useState('');

    const handleAccept = (request) => {
        onAccept(request);
        toast.success('Visit accepted! It\'s now in your schedule.');
    };

    const handleDeclineClick = (request) => {
        setDeclining(request);
        setDeclineReason('');
        setDeclineNotes('');
    };

    const handleDeclineConfirm = () => {
        if (!declineReason) {
            toast.error('Please select a reason');
            return;
        }
        
        onDecline(declining, declineReason, declineNotes);
        toast.success('Visit declined. This won\'t affect your standing.');
        setDeclining(null);
    };

    if (!requests || requests.length === 0) {
        return (
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-[#1e3a5f]">New Visit Requests</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-12 text-gray-500">
                    No pending visit requests at this time
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    New Visit Requests
                    <Badge className="bg-blue-100 text-blue-800">{requests.length}</Badge>
                </CardTitle>
                <p className="text-sm text-gray-600">Accept or decline these assignments</p>
            </CardHeader>
            <CardContent className="space-y-4">
                {requests.map((request, index) => (
                    <Card key={index} className="border-2 border-blue-300 bg-blue-50/30">
                        <CardContent className="pt-6">
                            {/* Date & Time */}
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className="w-5 h-5 text-[#4a90e2]" />
                                <span className="font-bold text-[#1e3a5f]">
                                    {format(new Date(request.visit_date), 'MMMM d, yyyy')} • {request.scheduled_start_time} - {request.scheduled_end_time}
                                </span>
                            </div>

                            {/* Client */}
                            <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">
                                New Client - {request.client_name}
                            </h3>

                            {/* Location */}
                            <div className="flex items-start gap-2 mb-4">
                                <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">
                                    {request.location} <span className="text-sm text-gray-500">({request.distance})</span>
                                </span>
                            </div>

                            {/* Services */}
                            <div className="mb-4">
                                <Label className="text-sm font-semibold mb-2 block">Services Needed</Label>
                                <div className="flex flex-wrap gap-2">
                                    {request.services.map((service, i) => (
                                        <Badge key={i} variant="outline" className="border-[#4a90e2] text-[#4a90e2]">
                                            {service}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Pay Rate */}
                            <div className="flex items-center gap-2 mb-4 bg-green-50 p-3 rounded-lg">
                                <DollarSign className="w-5 h-5 text-green-700" />
                                <span className="font-bold text-green-700">
                                    {request.pay_rate}
                                </span>
                            </div>

                            {/* Special Notes */}
                            {request.special_notes && (
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                                    <div className="flex items-start gap-2">
                                        <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-gray-800">{request.special_notes}</p>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    onClick={() => handleAccept(request)}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-6"
                                >
                                    <Check className="w-5 h-5 mr-2" />
                                    Accept
                                </Button>
                                <Button
                                    onClick={() => handleDeclineClick(request)}
                                    variant="outline"
                                    className="border-gray-400 text-gray-700 font-semibold py-6"
                                >
                                    <X className="w-5 h-5 mr-2" />
                                    Decline
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Decline Modal */}
                <Dialog open={!!declining} onOpenChange={(open) => !open && setDeclining(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-[#1e3a5f]">Decline Visit</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                            <div>
                                <Label className="mb-2 block">Reason for declining *</Label>
                                <Select
                                    value={declineReason}
                                    onValueChange={setDeclineReason}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select reason" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Already booked">Already booked</SelectItem>
                                        <SelectItem value="Too far">Too far</SelectItem>
                                        <SelectItem value="Outside availability">Outside availability</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label className="mb-2 block">Additional Explanation (Optional)</Label>
                                <Textarea
                                    placeholder="Any additional details..."
                                    value={declineNotes}
                                    onChange={(e) => setDeclineNotes(e.target.value)}
                                    rows={3}
                                />
                            </div>

                            <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                                Note: Declining visits won't affect your standing with Caring Hands
                            </p>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setDeclining(null)}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleDeclineConfirm}
                                    className="flex-1 bg-gray-600 hover:bg-gray-700"
                                >
                                    Confirm Decline
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}