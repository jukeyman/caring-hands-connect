import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Loader2, AlertCircle, Play } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import GPSVerification from './GPSVerification';

export default function ClockInScreen({ visit, client, onClockIn }) {
    const [gpsVerified, setGpsVerified] = useState(false);
    const [gpsCoords, setGpsCoords] = useState(null);
    const [checklist, setChecklist] = useState({
        atLocation: false,
        reviewedPlan: false,
        clientPresent: false
    });
    const [notes, setNotes] = useState('');
    const [clockingIn, setClockingIn] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update clock every second
    React.useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const scheduledTime = new Date();
    scheduledTime.setHours(parseInt(visit.scheduled_start_time.split(':')[0]));
    scheduledTime.setMinutes(parseInt(visit.scheduled_start_time.split(':')[1]));
    const minutesLate = Math.floor((currentTime - scheduledTime) / 60000);
    const isLate = minutesLate > 15;

    const canClockIn = gpsVerified && checklist.atLocation && checklist.reviewedPlan;

    const handleClockIn = async () => {
        if (!canClockIn) {
            toast.error('Please complete all required items');
            return;
        }

        setClockingIn(true);
        
        await onClockIn({
            gps_lat: gpsCoords?.latitude,
            gps_long: gpsCoords?.longitude,
            notes,
            late_reason: isLate ? 'Traffic' : null
        });

        setClockingIn(false);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-[#4a90e2]">
                <CardHeader className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90e2] text-white">
                    <CardTitle className="text-2xl">Clock In</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                    {/* Visit Info */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-3">
                            {client?.first_name} {client?.last_name?.charAt(0)}.
                        </h2>
                        <div className="flex items-start gap-2 text-gray-700 mb-3">
                            <MapPin className="w-5 h-5 text-[#4a90e2] flex-shrink-0 mt-0.5" />
                            <p>
                                {client?.address_street}<br />
                                {client?.address_city}, {client?.address_state} {client?.address_zip}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <Clock className="w-5 h-5 text-[#4a90e2]" />
                            <p className="font-semibold">
                                Scheduled: {visit.scheduled_start_time} - {visit.scheduled_end_time}
                            </p>
                        </div>
                    </div>

                    {/* Current Time */}
                    <div className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] text-white rounded-lg p-4 text-center">
                        <p className="text-sm mb-1">Current Time</p>
                        <p className="text-3xl font-bold">
                            {format(currentTime, 'h:mm:ss a')}
                        </p>
                    </div>

                    {/* Late Warning */}
                    {isLate && (
                        <Alert className="border-yellow-500 bg-yellow-50">
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                            <AlertDescription className="text-gray-700">
                                <span className="font-semibold">You're clocking in {minutesLate} minutes late.</span>
                                <br />
                                Late clock-ins may require supervisor review.
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

                    {/* Checklist */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="atLocation"
                                checked={checklist.atLocation}
                                onCheckedChange={(checked) => setChecklist({...checklist, atLocation: checked})}
                                disabled={!gpsVerified}
                            />
                            <Label htmlFor="atLocation" className="cursor-pointer leading-relaxed">
                                I have arrived at the client's location
                            </Label>
                        </div>
                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="reviewedPlan"
                                checked={checklist.reviewedPlan}
                                onCheckedChange={(checked) => setChecklist({...checklist, reviewedPlan: checked})}
                            />
                            <Label htmlFor="reviewedPlan" className="cursor-pointer leading-relaxed">
                                I have reviewed today's care plan tasks
                            </Label>
                        </div>
                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="clientPresent"
                                checked={checklist.clientPresent}
                                onCheckedChange={(checked) => setChecklist({...checklist, clientPresent: checked})}
                            />
                            <Label htmlFor="clientPresent" className="cursor-pointer leading-relaxed">
                                Client or family member is present (if applicable)
                            </Label>
                        </div>
                    </div>

                    {/* Optional Notes */}
                    <div>
                        <Label className="text-[#1e3a5f] mb-2 block">
                            Any concerns before starting? (Optional)
                        </Label>
                        <Textarea
                            placeholder="Enter any notes or concerns..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                        />
                    </div>

                    {/* Clock In Button */}
                    <Button 
                        onClick={handleClockIn}
                        disabled={!canClockIn || clockingIn}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-8"
                    >
                        {clockingIn ? (
                            <>
                                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                                Clocking In...
                            </>
                        ) : (
                            <>
                                <Play className="w-6 h-6 mr-2" />
                                Clock In
                            </>
                        )}
                    </Button>

                    {/* Support Link */}
                    <div className="text-center">
                        <a href="tel:5125551234" className="text-sm text-[#4a90e2] hover:underline">
                            Having trouble? Contact support
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}