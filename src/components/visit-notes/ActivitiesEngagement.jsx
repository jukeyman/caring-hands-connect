import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function ActivitiesEngagement({ activities, onActivitiesChange }) {
    const activityOptions = [
        'Conversation',
        'Watching TV/Movies',
        'Reading',
        'Puzzles/Games',
        'Music',
        'Arts & Crafts',
        'Walking/Exercise'
    ];

    const toggleActivity = (activity) => {
        const current = activities.selected || [];
        const updated = current.includes(activity)
            ? current.filter(a => a !== activity)
            : [...current, activity];
        onActivitiesChange({ selected: updated });
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Activities & Social Engagement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label className="text-[#1e3a5f] font-semibold mb-3 block">
                        What activities did you do together?
                    </Label>
                    <div className="space-y-2">
                        {activityOptions.map((activity) => (
                            <div key={activity} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                <Checkbox
                                    id={`activity-${activity}`}
                                    checked={(activities.selected || []).includes(activity)}
                                    onCheckedChange={() => toggleActivity(activity)}
                                />
                                <Label htmlFor={`activity-${activity}`} className="cursor-pointer flex-1">
                                    {activity}
                                </Label>
                            </div>
                        ))}
                        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                            <Checkbox
                                id="activity-other"
                                checked={!!activities.otherActivity}
                                onCheckedChange={(checked) => {
                                    if (!checked) onActivitiesChange({ otherActivity: '' });
                                }}
                            />
                            <Label htmlFor="activity-other" className="cursor-pointer">Other:</Label>
                            <Input
                                placeholder="Specify other activity"
                                value={activities.otherActivity || ''}
                                onChange={(e) => onActivitiesChange({ otherActivity: e.target.value })}
                                className="flex-1"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <Label className="text-[#1e3a5f] mb-2 block">
                        Describe Activities (Optional)
                    </Label>
                    <Textarea
                        placeholder="Describe what you did together and how the client responded..."
                        value={activities.description || ''}
                        onChange={(e) => onActivitiesChange({ description: e.target.value })}
                        rows={4}
                    />
                </div>
            </CardContent>
        </Card>
    );
}