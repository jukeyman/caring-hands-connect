import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Camera } from 'lucide-react';
import { toast } from 'sonner';

export default function IncidentReport({ hasIncident, incident, onHasIncidentChange, onIncidentChange }) {
    return (
        <Card className="mb-6 border-2 border-yellow-400">
            <CardHeader className="bg-yellow-50">
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    Report Any Incidents or Concerns
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
                {/* Toggle */}
                <div>
                    <Label className="font-semibold mb-3 block">
                        Was there an incident or concern today?
                    </Label>
                    <RadioGroup 
                        value={hasIncident ? 'yes' : 'no'} 
                        onValueChange={(value) => onHasIncidentChange(value === 'yes')}
                    >
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="no" id="incident-no" />
                                <Label htmlFor="incident-no" className="cursor-pointer">No</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="yes" id="incident-yes" />
                                <Label htmlFor="incident-yes" className="cursor-pointer">Yes</Label>
                            </div>
                        </div>
                    </RadioGroup>
                </div>

                {/* Incident Form */}
                {hasIncident && (
                    <div className="space-y-4 border-t-2 border-gray-200 pt-4">
                        <Alert className="border-red-500 bg-red-50">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <AlertDescription className="text-sm text-gray-700">
                                High severity incidents will immediately alert your supervisor
                            </AlertDescription>
                        </Alert>

                        {/* Incident Type */}
                        <div>
                            <Label className="font-semibold mb-2 block">Incident Type *</Label>
                            <Select
                                value={incident.type || ''}
                                onValueChange={(value) => onIncidentChange({ type: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select incident type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Fall">Fall</SelectItem>
                                    <SelectItem value="Medication Error">Medication Error</SelectItem>
                                    <SelectItem value="Behavioral Issue">Behavioral Issue</SelectItem>
                                    <SelectItem value="Health Concern">Health Concern</SelectItem>
                                    <SelectItem value="Safety Concern">Safety Concern</SelectItem>
                                    <SelectItem value="Equipment Malfunction">Equipment Malfunction</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Severity */}
                        <div>
                            <Label className="font-semibold mb-2 block">Severity *</Label>
                            <RadioGroup 
                                value={incident.severity || ''} 
                                onValueChange={(value) => onIncidentChange({ severity: value })}
                            >
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                        <RadioGroupItem value="Low" id="sev-low" />
                                        <Label htmlFor="sev-low" className="cursor-pointer">Low</Label>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                                        <RadioGroupItem value="Medium" id="sev-medium" />
                                        <Label htmlFor="sev-medium" className="cursor-pointer">Medium</Label>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                                        <RadioGroupItem value="High" id="sev-high" />
                                        <Label htmlFor="sev-high" className="cursor-pointer">High</Label>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                                        <RadioGroupItem value="Critical" id="sev-critical" />
                                        <Label htmlFor="sev-critical" className="cursor-pointer">Critical</Label>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* What Happened */}
                        <div>
                            <Label className="font-semibold mb-2 block">What happened? *</Label>
                            <Textarea
                                placeholder="Describe the incident in detail..."
                                value={incident.description || ''}
                                onChange={(e) => onIncidentChange({ description: e.target.value })}
                                rows={4}
                                maxLength={500}
                            />
                            <p className="text-sm text-gray-500 mt-1">{(incident.description || '').length}/500</p>
                        </div>

                        {/* Action Taken */}
                        <div>
                            <Label className="font-semibold mb-2 block">Action taken *</Label>
                            <Textarea
                                placeholder="What did you do in response to this incident?"
                                value={incident.actionTaken || ''}
                                onChange={(e) => onIncidentChange({ actionTaken: e.target.value })}
                                rows={3}
                            />
                        </div>

                        {/* Emergency Care */}
                        <div>
                            <Label className="font-semibold mb-2 block">
                                Was emergency medical care needed?
                            </Label>
                            <RadioGroup 
                                value={incident.emergencyCare || 'no'} 
                                onValueChange={(value) => onIncidentChange({ emergencyCare: value })}
                            >
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="no" id="emergency-no" />
                                        <Label htmlFor="emergency-no" className="cursor-pointer">No</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="yes" id="emergency-yes" />
                                        <Label htmlFor="emergency-yes" className="cursor-pointer">Yes</Label>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Family Notified */}
                        <div>
                            <Label className="font-semibold mb-2 block">Family notified?</Label>
                            <RadioGroup 
                                value={incident.familyNotified || 'will-notify'} 
                                onValueChange={(value) => onIncidentChange({ familyNotified: value })}
                            >
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="yes" id="notify-yes" />
                                        <Label htmlFor="notify-yes" className="cursor-pointer">Yes</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="no" id="notify-no" />
                                        <Label htmlFor="notify-no" className="cursor-pointer">No</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="will-notify" id="notify-will" />
                                        <Label htmlFor="notify-will" className="cursor-pointer">Will notify</Label>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Photo Evidence */}
                        <div>
                            <Label className="font-semibold mb-2 block">
                                Photo Evidence (Optional)
                            </Label>
                            <Button 
                                variant="outline"
                                onClick={() => toast.info('Photo upload coming soon')}
                                className="w-full border-[#4a90e2] text-[#4a90e2]"
                            >
                                <Camera className="w-4 h-4 mr-2" />
                                Add Photos
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}