import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function CaregiverCertifications({ certifications }) {
    if (!certifications || certifications.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-[#1e3a5f]">Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600">No certifications on record</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {certifications.map((cert, index) => (
                    <div 
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                        <div className="flex items-center gap-3">
                            {cert.status === 'Valid' ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-yellow-600" />
                            )}
                            <div>
                                <p className="font-semibold text-[#1e3a5f]">
                                    {cert.certification_type}
                                </p>
                                {cert.expiration_date ? (
                                    <p className="text-sm text-gray-600">
                                        Expires: {format(new Date(cert.expiration_date), 'MMMM yyyy')}
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-600">Never Expires</p>
                                )}
                            </div>
                        </div>
                        <Badge className={
                            cert.status === 'Valid' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                        }>
                            {cert.status}
                        </Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}