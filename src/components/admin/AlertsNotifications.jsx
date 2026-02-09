import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, CreditCard, TrendingUp } from 'lucide-react';

export default function AlertsNotifications({ alerts, onResolve }) {
    const getAlertIcon = (type) => {
        switch (type) {
            case 'certification_expiring': return AlertTriangle;
            case 'payment_overdue': return CreditCard;
            case 'high_value_lead': return TrendingUp;
            default: return Bell;
        }
    };

    const getAlertColor = (severity) => {
        switch (severity) {
            case 'high': return 'border-red-300 bg-red-50';
            case 'medium': return 'border-yellow-300 bg-yellow-50';
            case 'low': return 'border-blue-300 bg-blue-50';
            default: return 'border-gray-300 bg-gray-50';
        }
    };

    return (
        <Card className="mb-6 border-2">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Alerts & Notifications
                    <Badge className="bg-red-600 text-white ml-auto">{alerts.length}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {alerts.map((alert, index) => {
                        const Icon = getAlertIcon(alert.type);
                        
                        return (
                            <div key={index} className={`border-2 rounded-lg p-4 ${getAlertColor(alert.severity)}`}>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-5 h-5 text-[#1e3a5f]" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-[#1e3a5f] mb-1">{alert.title}</p>
                                        <p className="text-sm text-gray-700 mb-3">{alert.message}</p>
                                        <Button
                                            size="sm"
                                            onClick={() => onResolve(alert)}
                                            className="bg-[#1e3a5f] hover:bg-[#4a90e2]"
                                        >
                                            {alert.action_label || 'Take Action'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}