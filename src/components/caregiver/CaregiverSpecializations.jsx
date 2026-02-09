import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CaregiverSpecializations({ caregiver }) {
    // Parse skills from caregiver.skills string or use defaults
    const skillsList = caregiver.skills 
        ? caregiver.skills.split(',').map(s => s.trim())
        : [
            "Dementia & Alzheimer's Care",
            "Personal Care (ADLs)",
            "Medication Management",
            "Companionship & Emotional Support"
        ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Specializations & Skills</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-3">
                    {skillsList.map((skill, index) => (
                        <Badge 
                            key={index}
                            className="bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] text-white px-4 py-2 text-sm"
                        >
                            {skill}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}