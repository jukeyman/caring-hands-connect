import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ClientAssessment({ assessment, onAssessmentChange }) {
    const moodOptions = [
        { value: 'Excellent', emoji: '😊', label: 'Excellent' },
        { value: 'Good', emoji: '🙂', label: 'Good' },
        { value: 'Fair', emoji: '😐', label: 'Fair' },
        { value: 'Poor', emoji: '☹️', label: 'Poor' },
        { value: 'Agitated', emoji: '😠', label: 'Agitated/Upset' }
    ];

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Client Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Client Mood */}
                <div>
                    <Label className="text-[#1e3a5f] font-semibold mb-3 block">
                        Client Mood
                    </Label>
                    <RadioGroup 
                        value={assessment.mood} 
                        onValueChange={(value) => onAssessmentChange({ mood: value })}
                    >
                        <div className="space-y-2">
                            {moodOptions.map((option) => (
                                <div key={option.value} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                                    <RadioGroupItem value={option.value} id={`mood-${option.value}`} />
                                    <Label 
                                        htmlFor={`mood-${option.value}`}
                                        className="flex items-center gap-2 cursor-pointer flex-1"
                                    >
                                        <span className="text-2xl">{option.emoji}</span>
                                        <span>{option.label}</span>
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </RadioGroup>
                </div>

                {/* Physical Observations */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-[#1e3a5f]">Physical Observations</h3>
                    
                    <div>
                        <Label className="text-sm mb-2 block">Any changes in mobility?</Label>
                        <Textarea
                            placeholder="No changes / Describe any mobility changes..."
                            value={assessment.mobilityChanges || ''}
                            onChange={(e) => onAssessmentChange({ mobilityChanges: e.target.value })}
                            rows={2}
                        />
                    </div>

                    <div>
                        <Label className="text-sm mb-2 block">Any skin issues (redness, bruising, wounds)?</Label>
                        <Textarea
                            placeholder="None observed / Describe any skin issues..."
                            value={assessment.skinIssues || ''}
                            onChange={(e) => onAssessmentChange({ skinIssues: e.target.value })}
                            rows={2}
                        />
                    </div>

                    <div>
                        <Label className="text-sm mb-2 block">Any pain reported?</Label>
                        <Textarea
                            placeholder="No pain reported / Location and severity..."
                            value={assessment.painReported || ''}
                            onChange={(e) => onAssessmentChange({ painReported: e.target.value })}
                            rows={2}
                        />
                    </div>

                    <div>
                        <Label className="text-sm mb-2 block">Energy Level</Label>
                        <Select
                            value={assessment.energyLevel || ''}
                            onValueChange={(value) => onAssessmentChange({ energyLevel: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select energy level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Normal">Normal</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Very Low">Very Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Cognitive Observations */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-[#1e3a5f]">Cognitive Observations</h3>
                    
                    <div>
                        <Label className="text-sm mb-2 block">Alertness</Label>
                        <Select
                            value={assessment.alertness || ''}
                            onValueChange={(value) => onAssessmentChange({ alertness: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Alert">Alert</SelectItem>
                                <SelectItem value="Confused">Confused</SelectItem>
                                <SelectItem value="Disoriented">Disoriented</SelectItem>
                                <SelectItem value="Sleeping">Sleeping</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label className="text-sm mb-2 block">Communication</Label>
                        <Select
                            value={assessment.communication || ''}
                            onValueChange={(value) => onAssessmentChange({ communication: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Clear">Clear</SelectItem>
                                <SelectItem value="Difficulty">Difficulty speaking</SelectItem>
                                <SelectItem value="Non-verbal">Non-verbal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label className="text-sm mb-2 block">Memory</Label>
                        <Select
                            value={assessment.memory || ''}
                            onValueChange={(value) => onAssessmentChange({ memory: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Normal">Normal</SelectItem>
                                <SelectItem value="Some issues">Some issues</SelectItem>
                                <SelectItem value="Significant issues">Significant issues</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}