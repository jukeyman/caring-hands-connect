import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

export default function BackgroundCheckStatus({ backgroundCheck, onRenew }) {
    const isApproved = backgroundCheck.status === 'Completed & Approved';
    const needsRenewal = backgroundCheck.status === 'Renewal Required';

    return (
        <Card className={`mb-6 border-2 ${isApproved ? 'border-green-300' : 'border-red-300'}`}>
            <CardHeader className={isApproved ? 'bg-green-50' : 'bg-red-50'}>
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Background Check
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        {isApproved ? (
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        ) : (
                            <AlertCircle className="w-8 h-8 text-red-600" />
                        )}
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Status</p>
                            <p className="font-bold text-lg text-[#1e3a5f]">
                                {backgroundCheck.status}
                            </p>
                        </div>
                    </div>
                    <Badge className={isApproved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {backgroundCheck.status}
                    </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                        <p className="text-gray-600">Date Completed</p>
                        <p className="font-semibold text-gray-800">
                            {format(new Date(backgroundCheck.date_completed), 'MMMM d, yyyy')}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-600">Next Renewal</p>
                        <p className="font-semibold text-gray-800">
                            {format(new Date(backgroundCheck.next_renewal), 'MMMM d, yyyy')}
                        </p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-gray-600">Provider</p>
                        <p className="font-semibold text-gray-800">{backgroundCheck.provider}</p>
                    </div>
                </div>

                {needsRenewal && (
                    <Button
                        onClick={onRenew}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
                    >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Complete Background Check
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}