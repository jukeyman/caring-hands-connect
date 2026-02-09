import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Square, AlertTriangle, Phone, Plus } from 'lucide-react';
import { format, differenceInSeconds } from 'date-fns';

export default function VisitInProgressScreen({ visit, client, startTime, onClockOut }) {
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [tasks, setTasks] = useState([
        { id: 1, label: 'Assist with shower and dressing', completed: false },
        { id: 2, label: 'Administer 9am medications', completed: false },
        { id: 3, label: 'Prepare breakfast', completed: false },
        { id: 4, label: 'Prepare lunch', completed: false },
        { id: 5, label: 'Light housekeeping', completed: false }
    ]);
    const [showNoteDialog, setShowNoteDialog] = useState(false);
    const [quickNote, setQuickNote] = useState('');

    // Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedSeconds(differenceInSeconds(new Date(), new Date(startTime)));
        }, 1000);
        return () => clearInterval(timer);
    }, [startTime]);

    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${mins}m ${secs}s`;
    };

    const toggleTask = (taskId) => {
        setTasks(tasks.map(t => 
            t.id === taskId ? { ...t, completed: !t.completed } : t
        ));
    };

    const handleAddNote = () => {
        // In production, save note to database
        console.log('Quick note:', quickNote);
        setShowNoteDialog(false);
        setQuickNote('');
        toast.success('Note saved');
    };

    const handleReportIncident = () => {
        toast.info('Incident report form coming soon');
    };

    const handleCall911 = () => {
        if (window.confirm('Are you sure you want to call 911?')) {
            window.location.href = 'tel:911';
        }
    };

    const handleCallOffice = () => {
        window.location.href = 'tel:5125551234';
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Timer Card */}
            <Card className="border-2 border-green-500">
                <CardContent className="pt-6">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Visit in Progress</p>
                        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg p-6 mb-4">
                            <Clock className="w-12 h-12 mx-auto mb-3" />
                            <p className="text-4xl font-bold mb-1">
                                {formatDuration(elapsedSeconds)}
                            </p>
                            <p className="text-sm text-green-100">
                                Started at {format(new Date(startTime), 'h:mm a')}
                            </p>
                        </div>
                        <h2 className="text-xl font-bold text-[#1e3a5f] mb-1">
                            {client?.first_name} {client?.last_name?.charAt(0)}.
                        </h2>
                        <p className="text-sm text-gray-600">
                            Scheduled until {visit.scheduled_end_time}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Tasks Checklist */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-[#1e3a5f]">Care Tasks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {tasks.map((task) => (
                        <div 
                            key={task.id}
                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                            <Checkbox
                                id={`task-${task.id}`}
                                checked={task.completed}
                                onCheckedChange={() => toggleTask(task.id)}
                            />
                            <Label 
                                htmlFor={`task-${task.id}`} 
                                className={`cursor-pointer flex-1 ${
                                    task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                                }`}
                            >
                                {task.label}
                            </Label>
                        </div>
                    ))}
                    <Button 
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowNoteDialog(true)}
                        className="text-[#4a90e2] w-full"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Quick Note
                    </Button>
                </CardContent>
            </Card>

            {/* Emergency Actions */}
            <Card className="border-2 border-yellow-400 bg-yellow-50">
                <CardHeader>
                    <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Emergency Actions
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button 
                        onClick={handleReportIncident}
                        variant="outline"
                        className="w-full border-yellow-600 text-yellow-700 hover:bg-yellow-100 font-semibold py-6"
                    >
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Report Incident
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                        <Button 
                            onClick={handleCall911}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-6"
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            Call 911
                        </Button>
                        <Button 
                            onClick={handleCallOffice}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-6"
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            Call Office
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Clock Out Button */}
            <Button 
                onClick={onClockOut}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-8"
            >
                <Square className="w-6 h-6 mr-2" />
                Clock Out
            </Button>

            {/* Quick Note Dialog */}
            <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-[#1e3a5f]">Add Quick Note</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                        <Textarea
                            placeholder="Enter observations or notes..."
                            value={quickNote}
                            onChange={(e) => setQuickNote(e.target.value)}
                            rows={4}
                        />
                        <div className="flex gap-3">
                            <Button 
                                variant="outline"
                                onClick={() => setShowNoteDialog(false)}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button 
                                onClick={handleAddNote}
                                className="flex-1 bg-[#4a90e2] hover:bg-[#1e3a5f]"
                            >
                                Save Note
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}