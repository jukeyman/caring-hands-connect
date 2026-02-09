import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Clock, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function AvailabilityManagement({ availability, onSave }) {
    const [localAvailability, setLocalAvailability] = React.useState(availability || {
        monday: { available: true, start: 8, end: 18 },
        tuesday: { available: true, start: 8, end: 18 },
        wednesday: { available: true, start: 8, end: 18 },
        thursday: { available: true, start: 8, end: 18 },
        friday: { available: true, start: 8, end: 18 },
        saturday: { available: false, start: 8, end: 18 },
        sunday: { available: false, start: 8, end: 18 },
        overnights: false,
        liveIn: false,
        lastMinute: true,
        maxHoursPerWeek: 40
    });

    const days = [
        { key: 'monday', label: 'Monday' },
        { key: 'tuesday', label: 'Tuesday' },
        { key: 'wednesday', label: 'Wednesday' },
        { key: 'thursday', label: 'Thursday' },
        { key: 'friday', label: 'Friday' },
        { key: 'saturday', label: 'Saturday' },
        { key: 'sunday', label: 'Sunday' }
    ];

    const formatHour = (hour) => {
        const h = hour % 12 || 12;
        const ampm = hour < 12 ? 'AM' : 'PM';
        return `${h}:00 ${ampm}`;
    };

    const toggleDay = (day) => {
        setLocalAvailability(prev => ({
            ...prev,
            [day]: { ...prev[day], available: !prev[day].available }
        }));
    };

    const updateDayTime = (day, field, value) => {
        setLocalAvailability(prev => ({
            ...prev,
            [day]: { ...prev[day], [field]: value }
        }));
    };

    const handleSave = () => {
        onSave(localAvailability);
        toast.success('Availability updated successfully!');
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    My Availability
                </CardTitle>
                <p className="text-sm text-gray-600">Set your available days and times</p>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Weekly Availability */}
                <div className="space-y-4">
                    {days.map(({ key, label }) => (
                        <div key={key} className="border-2 border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                                <Label className="font-semibold text-[#1e3a5f]">{label}</Label>
                                <Switch
                                    checked={localAvailability[key].available}
                                    onCheckedChange={() => toggleDay(key)}
                                />
                            </div>
                            
                            {localAvailability[key].available && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-xs text-gray-600 mb-2 block">Start Time</Label>
                                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                                            <p className="font-semibold text-[#1e3a5f]">
                                                {formatHour(localAvailability[key].start)}
                                            </p>
                                        </div>
                                        <Slider
                                            value={[localAvailability[key].start]}
                                            onValueChange={([value]) => updateDayTime(key, 'start', value)}
                                            min={0}
                                            max={23}
                                            step={1}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-600 mb-2 block">End Time</Label>
                                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                                            <p className="font-semibold text-[#1e3a5f]">
                                                {formatHour(localAvailability[key].end)}
                                            </p>
                                        </div>
                                        <Slider
                                            value={[localAvailability[key].end]}
                                            onValueChange={([value]) => updateDayTime(key, 'end', value)}
                                            min={0}
                                            max={23}
                                            step={1}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Preferences */}
                <div className="space-y-3 border-t-2 border-gray-200 pt-6">
                    <Label className="font-semibold text-[#1e3a5f] block mb-3">Preferences</Label>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Checkbox
                            id="overnights"
                            checked={localAvailability.overnights}
                            onCheckedChange={(checked) => setLocalAvailability(prev => ({...prev, overnights: checked}))}
                        />
                        <Label htmlFor="overnights" className="cursor-pointer flex-1">
                            Available for overnight shifts
                        </Label>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Checkbox
                            id="liveIn"
                            checked={localAvailability.liveIn}
                            onCheckedChange={(checked) => setLocalAvailability(prev => ({...prev, liveIn: checked}))}
                        />
                        <Label htmlFor="liveIn" className="cursor-pointer flex-1">
                            Available for live-in care (5+ day assignments)
                        </Label>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Checkbox
                            id="lastMinute"
                            checked={localAvailability.lastMinute}
                            onCheckedChange={(checked) => setLocalAvailability(prev => ({...prev, lastMinute: checked}))}
                        />
                        <Label htmlFor="lastMinute" className="cursor-pointer flex-1">
                            Available for last-minute/emergency shifts
                        </Label>
                    </div>
                </div>

                {/* Max Hours */}
                <div className="border-t-2 border-gray-200 pt-6">
                    <Label className="font-semibold text-[#1e3a5f] block mb-3">
                        Maximum Hours Per Week: {localAvailability.maxHoursPerWeek} hours
                    </Label>
                    <Slider
                        value={[localAvailability.maxHoursPerWeek]}
                        onValueChange={([value]) => setLocalAvailability(prev => ({...prev, maxHoursPerWeek: value}))}
                        min={10}
                        max={60}
                        step={5}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>10 hours</span>
                        <span>60 hours</span>
                    </div>
                </div>

                {/* Save Button */}
                <Button
                    onClick={handleSave}
                    className="w-full bg-[#4a90e2] hover:bg-[#1e3a5f] font-bold py-6"
                >
                    <Save className="w-5 h-5 mr-2" />
                    Save Availability
                </Button>
            </CardContent>
        </Card>
    );
}