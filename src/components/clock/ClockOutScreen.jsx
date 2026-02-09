import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, CheckCircle, XCircle, Loader2, Square, AlertCircle, Camera } from 'lucide-react';
import { format, differenceInMinutes } from 'date-fns';
import { toast } from 'sonner';
import GPSVerification from './GPSVerification';

export default function ClockOutScreen({ visit, client, startTime, tasks, onClockOut }) {
    const [gpsVerified, setGpsVerified] = useState(false);
    const [gpsCoords, setGpsCoords] = useState(null);
    const [completedTasks, setCompletedTasks] = useState(tasks?.map(t => t.id) || []);
    const [clientStatus, setClientStatus] = useState('');
    const [signature, setSignature] = useState('');
    const [notes, setNotes] = useState('');
    const [photos, setPhotos] = useState([]);
    const [clockingOut, setClockingOut] = useState(false);

    const currentTime = new Date();
    const scheduledEndTime = new Date();
    const [hours, minutes] = visit.scheduled_end_time.split(':');
    scheduledEndTime.setHours(parseInt(hours), parseInt(minutes));
    
    const minutesEarly = differenceInMinutes(scheduledEndTime, currentTime);
    const isEarly = minutesEarly > 15;
    
    const duration = differenceInMinutes(currentTime, new Date(startTime));
    const durationHours = Math.floor(duration / 60);
    const durationMins = duration % 60;

    const incompleteTasks = tasks?.filter(t => !completedTasks.includes(t.id)) || [];

    const canClockOut = gpsVerified && clientStatus && signature.trim();

    const handleTaskToggle = (taskId) => {
        setCompletedTasks(prev => 
            prev.includes(taskId) 
                ? prev.filter(id => id !== taskId)
                : [...prev, taskId]
        );
    };

    const handleClockOut = async () => {
        if (!canClockOut) {
            toast.error('Please complete all required fields');
            return;
        }

        setClockingOut(true);

        await onClockOut({
            gps_lat: gpsCoords?.latitude,
            gps_long: gpsCoords?.longitude,
            completed_tasks: completedTasks,
            client_status: clientStatus,
            signature,
            notes,
            photos
        });

        setClockingOut(false);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-red-500">
                <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                    <CardTitle className="text-2xl">Clock Out</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                    {/* Visit Duration */}
                    <div className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] text-white rounded-lg p-6 text-center">
                        <p className="text-sm mb-2">Visit Duration</p>
                        <p className="text-4xl font-bold mb-1">
                            {durationHours}h {durationMins}m
                        </p>
                        <div className="text-sm text-gray-200">
                            <p>Scheduled: {visit.scheduled_start_time} - {visit.scheduled_end_time}</p>
                            <p>Actual: {format(new Date(startTime), 'h:mm a')} - {format(currentTime, 'h:mm a')}</p>
                        </div>
                    </div>

                    {/* Early Warning */}
                    {isEarly && (
                        <Alert className="border-yellow-500 bg-yellow-50">
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                            <AlertDescription className="text-gray-700">
                                <span className="font-semibold">You're clocking out {minutesEarly} minutes early.</span>
                                <br />
                                Scheduled until {visit.scheduled_end_time}. This may require supervisor review.
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* GPS Verification */}
                    <GPSVerification 
                        clientAddress={`${client?.address_street}, ${client?.address_city}`}
                        onVerified={(coords) => {
                            setGpsVerified(true);
                            setGpsCoords(coords);
                        }}
                        onFailed={() => setGpsVerified(false)}
                    />

                    {/* Tasks Verification */}
                    <div>
                        <Label className="text-[#1e3a5f] font-bold mb-3 block">
                            Confirm Completed Tasks
                        </Label>
                        <div className="space-y-2">
                            {tasks?.map((task) => (
                                <div 
                                    key={task.id}
                                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                                >
                                    <Checkbox
                                        id={`complete-${task.id}`}
                                        checked={completedTasks.includes(task.id)}
                                        onCheckedChange={() => handleTaskToggle(task.id)}
                                    />
                                    <Label 
                                        htmlFor={`complete-${task.id}`}
                                        className={`cursor-pointer flex-1 ${
                                            completedTasks.includes(task.id) 
                                                ? 'text-gray-800' 
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        {task.label}
                                    </Label>
                                    {completedTasks.includes(task.id) ? (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                            ))}
                        </div>
                        {incompleteTasks.length > 0 && (
                            <Alert className="mt-3 border-yellow-500 bg-yellow-50">
                                <AlertCircle className="w-4 h-4 text-yellow-600" />
                                <AlertDescription className="text-sm text-gray-700">
                                    {incompleteTasks.length} task(s) not completed. Please confirm.
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Client Status */}
                    <div>
                        <Label htmlFor="clientStatus" className="text-[#1e3a5f] font-bold mb-2 block">
                            Client Status *
                        </Label>
                        <Select value={clientStatus} onValueChange={setClientStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select client status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="well">Client is doing well</SelectItem>
                                <SelectItem value="followup">Client needs follow-up attention</SelectItem>
                                <SelectItem value="incident">Client had an incident (requires report)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Signature */}
                    <div>
                        <Label htmlFor="signature" className="text-[#1e3a5f] font-bold mb-2 block">
                            Sign Your Name *
                        </Label>
                        <Input
                            id="signature"
                            placeholder="Type your full name"
                            value={signature}
                            onChange={(e) => setSignature(e.target.value)}
                        />
                    </div>

                    {/* Optional Photos */}
                    <div>
                        <Label className="text-[#1e3a5f] mb-2 block">
                            Upload Photos (Optional)
                        </Label>
                        <Button 
                            variant="outline"
                            className="w-full border-[#4a90e2] text-[#4a90e2]"
                            onClick={() => toast.info('Photo upload coming soon')}
                        >
                            <Camera className="w-4 h-4 mr-2" />
                            Add Photos (meals, activities, etc.)
                        </Button>
                        <p className="text-xs text-gray-500 mt-1">Max 5 photos</p>
                    </div>

                    {/* Optional Notes */}
                    <div>
                        <Label className="text-[#1e3a5f] mb-2 block">
                            Observations & Notes (Optional)
                        </Label>
                        <Textarea
                            placeholder="Add any observations for the family or care team..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={4}
                        />
                    </div>

                    {/* Clock Out Button */}
                    <Button 
                        onClick={handleClockOut}
                        disabled={!canClockOut || clockingOut}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-8"
                    >
                        {clockingOut ? (
                            <>
                                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                                Clocking Out...
                            </>
                        ) : (
                            <>
                                <Square className="w-6 h-6 mr-2" />
                                Clock Out
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}