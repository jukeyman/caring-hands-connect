import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';

export default function TimeOffRequests({ requests, onSubmitRequest }) {
    const [showNewRequest, setShowNewRequest] = useState(false);
    const [formData, setFormData] = useState({
        start_date: null,
        end_date: null,
        reason: '',
        notes: ''
    });

    const getStatusBadge = (status) => {
        const configs = {
            'Pending': { className: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
            'Approved': { className: 'bg-green-100 text-green-800', label: 'Approved' },
            'Denied': { className: 'bg-red-100 text-red-800', label: 'Denied' }
        };
        return configs[status] || configs['Pending'];
    };

    const handleSubmit = () => {
        if (!formData.start_date || !formData.end_date || !formData.reason) {
            toast.error('Please fill in all required fields');
            return;
        }

        onSubmitRequest(formData);
        setShowNewRequest(false);
        setFormData({ start_date: null, end_date: null, reason: '', notes: '' });
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5" />
                        Request Time Off
                    </CardTitle>
                    <Button
                        size="sm"
                        onClick={() => setShowNewRequest(true)}
                        className="bg-[#4a90e2] hover:bg-[#1e3a5f]"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        New Request
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {/* Existing Requests */}
                {requests && requests.length > 0 ? (
                    <div className="space-y-3">
                        {requests.map((request, index) => {
                            const statusBadge = getStatusBadge(request.status);
                            
                            return (
                                <div key={index} className="border-2 border-gray-200 rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <p className="font-bold text-[#1e3a5f]">
                                                {format(new Date(request.start_date), 'MMM d')} - {format(new Date(request.end_date), 'MMM d, yyyy')}
                                            </p>
                                            <p className="text-sm text-gray-600">{request.reason}</p>
                                            {request.notes && (
                                                <p className="text-sm text-gray-500 mt-1">{request.notes}</p>
                                            )}
                                        </div>
                                        <Badge className={statusBadge.className}>
                                            {statusBadge.label}
                                        </Badge>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-6">No time off requests</p>
                )}

                {/* New Request Modal */}
                <Dialog open={showNewRequest} onOpenChange={setShowNewRequest}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-[#1e3a5f]">Request Time Off</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                            {/* Start Date */}
                            <div>
                                <Label className="mb-2 block">Start Date *</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start">
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {formData.start_date ? format(formData.start_date, 'PPP') : 'Select date'}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={formData.start_date}
                                            onSelect={(date) => setFormData({...formData, start_date: date})}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* End Date */}
                            <div>
                                <Label className="mb-2 block">End Date *</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start">
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {formData.end_date ? format(formData.end_date, 'PPP') : 'Select date'}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={formData.end_date}
                                            onSelect={(date) => setFormData({...formData, end_date: date})}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Reason */}
                            <div>
                                <Label className="mb-2 block">Reason *</Label>
                                <Select
                                    value={formData.reason}
                                    onValueChange={(value) => setFormData({...formData, reason: value})}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select reason" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Vacation">Vacation</SelectItem>
                                        <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                                        <SelectItem value="Personal">Personal</SelectItem>
                                        <SelectItem value="FMLA">FMLA</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Notes */}
                            <div>
                                <Label className="mb-2 block">Additional Notes (Optional)</Label>
                                <Textarea
                                    placeholder="Any additional details..."
                                    value={formData.notes}
                                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                    rows={3}
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowNewRequest(false)}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    className="flex-1 bg-[#4a90e2] hover:bg-[#1e3a5f]"
                                >
                                    Submit Request
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}