import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Smile, Meh, Frown } from 'lucide-react';
import { format } from 'date-fns';

export default function RecentVisitNotes({ visitNotes }) {
    const getMoodIcon = (mood) => {
        switch (mood) {
            case 'Excellent':
            case 'Good':
                return <Smile className="w-5 h-5 text-green-600" />;
            case 'Fair':
                return <Meh className="w-5 h-5 text-yellow-600" />;
            case 'Poor':
            case 'Agitated':
                return <Frown className="w-5 h-5 text-red-600" />;
            default:
                return null;
        }
    };

    if (!visitNotes || visitNotes.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-[#1e3a5f]">Recent Visit Reports</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-8">
                    <p className="text-gray-600">No visit reports yet</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Recent Visit Reports</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                    {visitNotes.slice(0, 3).map((note, index) => (
                        <AccordionItem key={note.id} value={`note-${index}`} className="border rounded-lg px-4">
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center justify-between w-full pr-4">
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-[#1e3a5f]">
                                            {format(new Date(note.submitted_at || new Date()), 'MMMM d, yyyy')}
                                        </span>
                                        <span className="text-sm text-gray-600">by {note.caregiver_name || 'Caregiver'}</span>
                                    </div>
                                    {note.client_mood && (
                                        <div className="flex items-center gap-1">
                                            {getMoodIcon(note.client_mood)}
                                            <span className="text-sm text-gray-600">{note.client_mood}</span>
                                        </div>
                                    )}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-4">
                                {/* Tasks Completed */}
                                <div>
                                    <p className="font-semibold text-[#1e3a5f] mb-2">Tasks Completed:</p>
                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                                            {note.tasks_completed?.split('\n').map((task, i) => (
                                                <li key={i}>{task}</li>
                                            )) || <li>No tasks listed</li>}
                                        </ul>
                                    </div>
                                </div>

                                {/* Meals */}
                                {note.meals_provided && (
                                    <div>
                                        <p className="font-semibold text-[#1e3a5f] mb-2">Meals Provided:</p>
                                        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                                            {note.meals_provided}
                                        </p>
                                    </div>
                                )}

                                {/* Medications */}
                                {note.medications_given && (
                                    <div>
                                        <p className="font-semibold text-[#1e3a5f] mb-2">Medications Given:</p>
                                        <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                                            {note.medications_given}
                                        </p>
                                    </div>
                                )}

                                {/* Observations */}
                                {note.observations && (
                                    <div>
                                        <p className="font-semibold text-[#1e3a5f] mb-2">Observations:</p>
                                        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-3">
                                            {note.observations}
                                        </p>
                                    </div>
                                )}

                                {/* Photos */}
                                {note.photos && note.photos.length > 0 && (
                                    <div>
                                        <p className="font-semibold text-[#1e3a5f] mb-2">Photos:</p>
                                        <div className="flex gap-2 flex-wrap">
                                            {note.photos.map((photo, i) => (
                                                <img 
                                                    key={i} 
                                                    src={photo} 
                                                    alt={`Visit photo ${i + 1}`}
                                                    className="w-20 h-20 rounded-lg object-cover cursor-pointer hover:opacity-80"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <Button size="sm" variant="outline" className="w-full">
                                    View Full Report
                                </Button>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    );
}