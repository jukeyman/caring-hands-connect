import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, FileText, ExternalLink } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { toast } from 'sonner';

export default function RequiredCertifications({ certifications, onRenew, onViewCert }) {
    const getStatusConfig = (cert) => {
        const daysRemaining = differenceInDays(new Date(cert.expiration_date), new Date());
        
        if (cert.status === 'Expired') {
            return {
                badge: { className: 'bg-red-100 text-red-800', label: 'Expired' },
                bgColor: 'bg-red-50',
                borderColor: 'border-red-300',
                message: `${Math.abs(daysRemaining)} days overdue`,
                actionLabel: 'Renew Immediately',
                actionColor: 'bg-red-600 hover:bg-red-700'
            };
        } else if (daysRemaining <= 60) {
            return {
                badge: { className: 'bg-yellow-100 text-yellow-800', label: 'Expiring Soon' },
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-300',
                message: `${daysRemaining} days remaining`,
                actionLabel: 'Renew Now',
                actionColor: 'bg-yellow-600 hover:bg-yellow-700'
            };
        } else {
            return {
                badge: { className: 'bg-green-100 text-green-800', label: 'Valid' },
                bgColor: 'bg-green-50',
                borderColor: 'border-green-300',
                message: `${daysRemaining} days remaining`,
                actionLabel: 'View Certificate',
                actionColor: 'bg-[#4a90e2] hover:bg-[#1e3a5f]'
            };
        }
    };

    const getMissingCertConfig = (cert) => ({
        badge: { className: 'bg-gray-100 text-gray-800', label: 'Not Completed' },
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-300'
    });

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Required Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {certifications.map((cert, index) => {
                    const config = cert.status === 'Not Completed' 
                        ? getMissingCertConfig(cert)
                        : getStatusConfig(cert);
                    
                    return (
                        <Card key={index} className={`border-2 ${config.borderColor} ${config.bgColor}`}>
                            <CardContent className="pt-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[#1e3a5f] text-lg mb-1">
                                            {cert.certification_type}
                                        </h3>
                                        {cert.status !== 'Not Completed' && (
                                            <div className="text-sm text-gray-600">
                                                <p>Issued: {format(new Date(cert.issue_date), 'MMMM d, yyyy')}</p>
                                                <p>Expires: {format(new Date(cert.expiration_date), 'MMMM d, yyyy')}</p>
                                            </div>
                                        )}
                                        {cert.requirement && (
                                            <p className="text-sm text-gray-600 mt-2">
                                                {cert.requirement}
                                            </p>
                                        )}
                                    </div>
                                    <Badge className={config.badge.className}>
                                        {config.badge.label}
                                    </Badge>
                                </div>

                                {config.message && (
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 text-sm font-semibold">
                                            <Calendar className="w-4 h-4" />
                                            <span>{config.message}</span>
                                        </div>
                                    </div>
                                )}

                                {cert.action_required && (
                                    <div className="bg-white border-l-4 border-red-500 p-3 mb-4">
                                        <p className="text-sm font-semibold text-red-700">
                                            ⚠️ Action Required: {cert.action_required}
                                        </p>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    {cert.document && (
                                        <Button
                                            variant="outline"
                                            onClick={() => onViewCert(cert)}
                                            className="flex-1"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => onRenew(cert)}
                                        className={`flex-1 text-white ${config.actionColor || 'bg-[#4a90e2] hover:bg-[#1e3a5f]'}`}
                                    >
                                        {config.actionLabel || 'Start Training'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </CardContent>
        </Card>
    );
}