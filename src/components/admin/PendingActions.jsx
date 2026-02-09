import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, FileCheck, AlertTriangle } from 'lucide-react';

export default function PendingActions({ actions, onAction }) {
    const getActionIcon = (type) => {
        switch (type) {
            case 'visit_approval': return Clock;
            case 'hour_dispute': return AlertTriangle;
            case 'certification_expiring': return AlertCircle;
            default: return FileCheck;
        }
    };

    const getActionColor = (type) => {
        switch (type) {
            case 'visit_approval': return 'border-blue-300 bg-blue-50';
            case 'hour_dispute': return 'border-red-300 bg-red-50';
            case 'certification_expiring': return 'border-yellow-300 bg-yellow-50';
            default: return 'border-gray-300 bg-gray-50';
        }
    };

    const getBadgeColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Card className="border-2 border-yellow-300">
            <CardHeader className="bg-yellow-50">
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Pending Actions
                    <Badge className="bg-yellow-600 text-white ml-auto">{actions.length}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-2 max-h-96 overflow-y-auto">
                    {actions.map((action, index) => {
                        const Icon = getActionIcon(action.type);
                        
                        return (
                            <div key={index} className={`border-2 rounded-lg p-3 ${getActionColor(action.type)}`}>
                                <div className="flex items-start gap-3">
                                    <Icon className="w-5 h-5 text-gray-700 mt-0.5" />
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-1">
                                            <p className="font-semibold text-[#1e3a5f] text-sm">
                                                {action.title}
                                            </p>
                                            <Badge className={getBadgeColor(action.priority)}>
                                                {action.priority}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-gray-600 mb-2">{action.description}</p>
                                        <Button
                                            size="sm"
                                            onClick={() => onAction(action)}
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            {action.action_label || 'Review'}
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