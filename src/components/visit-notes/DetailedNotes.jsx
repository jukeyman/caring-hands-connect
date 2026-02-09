import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function DetailedNotes({ notes, onNotesChange }) {
    const maxLength = 1000;

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Additional Observations & Notes</CardTitle>
            </CardHeader>
            <CardContent>
                <Label className="text-gray-700 mb-2 block">
                    Include any important observations, conversations, or concerns
                </Label>
                <Textarea
                    placeholder="Example: Today was a great visit. Client was in excellent spirits and very talkative. Discussed family photos. Appetite was strong. Reminded family to schedule follow-up with Dr. Smith..."
                    value={notes}
                    onChange={(e) => onNotesChange(e.target.value)}
                    rows={6}
                    maxLength={maxLength}
                    className="text-base"
                />
                <p className="text-sm text-gray-500 mt-2 text-right">
                    {notes.length}/{maxLength} characters
                </p>
            </CardContent>
        </Card>
    );
}