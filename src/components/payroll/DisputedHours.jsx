import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Upload, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function DisputedHours({ disputes, onSubmitDispute, onAddEvidence }) {
    const [showNewDispute, setShowNewDispute] = useState(false);

    if (!disputes || disputes.length === 0) {
        return null;
    }

    return (
        <Card className="mb-6 border-2 border-red-400">
            <CardHeader className="bg-red-50">
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Disputed Hours
                    <Badge className="bg-red-100 text-red-800">{disputes.length}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
                {disputes.map((dispute, index) => (
                    <Card key={index} className="border-2 border-gray-200">
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="font-bold text-[#1e3a5f]">
                                        {format(new Date(dispute.date), 'MMMM d, yyyy')}
                                    </p>
                                    <p className="text-sm text-gray-600">{dispute.client_name}</p>
                                </div>
                                <Badge className="bg-orange-100 text-orange-800">
                                    Under Review
                                </Badge>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                <div>
                                    <p className="text-xs text-gray-600 mb-1">Issue</p>
                                    <p className="font-semibold text-gray-800">{dispute.issue}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-600 mb-1">Your Claim</p>
                                        <p className="font-bold text-[#1e3a5f]">{dispute.your_claim}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 mb-1">Company Record</p>
                                        <p className="font-bold text-gray-700">{dispute.company_record}</p>
                                    </div>
                                </div>
                                <div className="border-t pt-3">
                                    <p className="text-xs text-gray-600 mb-1">Difference</p>
                                    <p className="font-bold text-red-700">
                                        {dispute.difference_hours} hours (${dispute.difference_amount})
                                    </p>
                                </div>
                            </div>

                            <Button
                                onClick={() => onAddEvidence(dispute)}
                                variant="outline"
                                className="w-full mt-4 border-[#4a90e2] text-[#4a90e2]"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                Add Evidence
                            </Button>
                        </CardContent>
                    </Card>
                ))}

                <Button
                    onClick={() => setShowNewDispute(true)}
                    variant="outline"
                    className="w-full border-red-400 text-red-700 hover:bg-red-50 font-semibold"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Hour Dispute
                </Button>
            </CardContent>
        </Card>
    );
}