import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Phone, Mail, MapPin } from 'lucide-react';
import { format } from 'date-fns';

export default function RecentInquiries({ inquiries, onContact }) {
    const getUrgencyBadge = (urgency) => {
        if (urgency.includes('Immediate')) {
            return { className: 'bg-red-100 text-red-800', label: '🔥 Immediate' };
        } else if (urgency.includes('Soon')) {
            return { className: 'bg-yellow-100 text-yellow-800', label: 'Soon' };
        }
        return { className: 'bg-blue-100 text-blue-800', label: 'Planning' };
    };

    return (
        <Card className="border-2 border-blue-300">
            <CardHeader className="bg-blue-50">
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Recent Inquiries (24h)
                    <Badge className="bg-blue-600 text-white ml-auto">{inquiries.length}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {inquiries.map((inquiry) => {
                        const urgencyBadge = getUrgencyBadge(inquiry.urgency);
                        
                        return (
                            <div key={inquiry.id} className="border-2 border-gray-200 rounded-lg p-4 bg-white hover:border-blue-400 transition-all">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <p className="font-bold text-[#1e3a5f]">
                                            {inquiry.first_name} {inquiry.last_name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {format(new Date(inquiry.inquiry_date || inquiry.created_date), 'h:mm a')}
                                        </p>
                                    </div>
                                    <Badge className={urgencyBadge.className}>
                                        {urgencyBadge.label}
                                    </Badge>
                                </div>

                                <div className="space-y-1 text-sm text-gray-600 mb-3">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        <span>{inquiry.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>{inquiry.zip_code}</span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-2 rounded mb-3">
                                    <p className="text-xs text-gray-600">Services Interested:</p>
                                    <p className="text-sm font-semibold text-[#1e3a5f]">
                                        {inquiry.services_interested?.join(', ') || 'Not specified'}
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        onClick={() => onContact(inquiry, 'phone')}
                                        className="flex-1 bg-[#4a90e2] hover:bg-[#1e3a5f]"
                                    >
                                        <Phone className="w-4 h-4 mr-1" />
                                        Call
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => onContact(inquiry, 'email')}
                                        variant="outline"
                                        className="flex-1 border-[#4a90e2] text-[#4a90e2]"
                                    >
                                        <Mail className="w-4 h-4 mr-1" />
                                        Email
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}