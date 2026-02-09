import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, CheckCircle, XCircle } from 'lucide-react';

export default function TasksCompleted({ tasks, taskDetails, onTaskToggle, onDetailsChange }) {
    const [expandedTasks, setExpandedTasks] = useState({});

    const toggleExpanded = (taskId) => {
        setExpandedTasks(prev => ({
            ...prev,
            [taskId]: !prev[taskId]
        }));
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Tasks Completed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {tasks.map((task) => (
                    <Collapsible key={task.id} open={expandedTasks[task.id]}>
                        <div className="border-2 border-gray-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <Checkbox
                                    id={`task-${task.id}`}
                                    checked={task.completed}
                                    onCheckedChange={() => onTaskToggle(task.id)}
                                />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <Label 
                                            htmlFor={`task-${task.id}`}
                                            className="cursor-pointer font-semibold text-[#1e3a5f]"
                                        >
                                            {task.label}
                                        </Label>
                                        {task.completed && (
                                            <CollapsibleTrigger 
                                                onClick={() => toggleExpanded(task.id)}
                                                className="text-[#4a90e2] flex items-center gap-1 text-sm"
                                            >
                                                Details
                                                <ChevronDown className={`w-4 h-4 transition-transform ${
                                                    expandedTasks[task.id] ? 'rotate-180' : ''
                                                }`} />
                                            </CollapsibleTrigger>
                                        )}
                                    </div>
                                </div>
                                {task.completed ? (
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-gray-400" />
                                )}
                            </div>

                            <CollapsibleContent className="mt-4 space-y-4">
                                {task.type === 'personal-care' && (
                                    <div>
                                        <Label className="text-sm font-semibold mb-2 block">
                                            What assistance was provided?
                                        </Label>
                                        <div className="space-y-2">
                                            {['Bathing/Shower', 'Dressing', 'Grooming', 'Toileting', 'Mobility Assistance'].map((item) => (
                                                <div key={item} className="flex items-center gap-2">
                                                    <Checkbox
                                                        id={`personal-${item}`}
                                                        checked={taskDetails[task.id]?.personalCare?.includes(item)}
                                                        onCheckedChange={(checked) => {
                                                            const current = taskDetails[task.id]?.personalCare || [];
                                                            const updated = checked 
                                                                ? [...current, item]
                                                                : current.filter(i => i !== item);
                                                            onDetailsChange(task.id, { personalCare: updated });
                                                        }}
                                                    />
                                                    <Label htmlFor={`personal-${item}`} className="text-sm cursor-pointer">
                                                        {item}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                        <Textarea
                                            placeholder="Additional notes..."
                                            value={taskDetails[task.id]?.notes || ''}
                                            onChange={(e) => onDetailsChange(task.id, { notes: e.target.value })}
                                            className="mt-3"
                                            rows={2}
                                        />
                                    </div>
                                )}

                                {task.type === 'medication' && (
                                    <div>
                                        <Label className="text-sm font-semibold mb-2 block">
                                            Medications Given
                                        </Label>
                                        <div className="space-y-2 mb-3">
                                            {['Lisinopril 10mg (9:00 AM)', 'Metformin 500mg (9:00 AM)', 'Aspirin 81mg (12:00 PM)'].map((med, i) => (
                                                <div key={i} className="flex items-center gap-2 bg-green-50 p-2 rounded">
                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                    <span className="text-sm">{med}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <Label className="text-sm mb-2 block">Any issues?</Label>
                                        <Textarea
                                            placeholder="None / Describe any medication issues..."
                                            value={taskDetails[task.id]?.medIssues || ''}
                                            onChange={(e) => onDetailsChange(task.id, { medIssues: e.target.value })}
                                            rows={2}
                                        />
                                    </div>
                                )}

                                {task.type === 'meals' && (
                                    <div className="space-y-3">
                                        <div>
                                            <Label className="text-sm font-semibold mb-2 block">
                                                Meals Provided
                                            </Label>
                                            <Textarea
                                                placeholder="Breakfast: ...&#10;Lunch: ..."
                                                value={taskDetails[task.id]?.mealsProvided || ''}
                                                onChange={(e) => onDetailsChange(task.id, { mealsProvided: e.target.value })}
                                                rows={3}
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-sm font-semibold mb-2 block">
                                                Client's Appetite
                                            </Label>
                                            <Select
                                                value={taskDetails[task.id]?.appetite || ''}
                                                onValueChange={(value) => onDetailsChange(task.id, { appetite: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Excellent">Excellent</SelectItem>
                                                    <SelectItem value="Good">Good</SelectItem>
                                                    <SelectItem value="Fair">Fair</SelectItem>
                                                    <SelectItem value="Poor">Poor</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}

                                {task.type === 'housekeeping' && (
                                    <div>
                                        <Label className="text-sm font-semibold mb-2 block">
                                            What was done?
                                        </Label>
                                        <div className="space-y-2">
                                            {['Dishes', 'Laundry', 'Tidying living spaces', 'Vacuuming', 'Bathroom cleaning'].map((item) => (
                                                <div key={item} className="flex items-center gap-2">
                                                    <Checkbox
                                                        id={`house-${item}`}
                                                        checked={taskDetails[task.id]?.housekeeping?.includes(item)}
                                                        onCheckedChange={(checked) => {
                                                            const current = taskDetails[task.id]?.housekeeping || [];
                                                            const updated = checked 
                                                                ? [...current, item]
                                                                : current.filter(i => i !== item);
                                                            onDetailsChange(task.id, { housekeeping: updated });
                                                        }}
                                                    />
                                                    <Label htmlFor={`house-${item}`} className="text-sm cursor-pointer">
                                                        {item}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CollapsibleContent>
                        </div>
                    </Collapsible>
                ))}
            </CardContent>
        </Card>
    );
}