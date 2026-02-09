import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CaregiverAbout({ caregiver }) {
    const firstName = caregiver.first_name;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">About {firstName}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-700 leading-relaxed">
                    {caregiver.bio || `${firstName} is a dedicated and compassionate caregiver committed to providing personalized care to each client.`}
                </p>
            </CardContent>
        </Card>
    );
}