import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Bell, FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function PendingTasks({ tasks, onComplete }) {
    const handleComplete = (task) => {
        onComplete(task.id);
        toast.success('Task completed!');
    };

    const getBadgeConfig = (priority) => {
        const configs = {
            'Overdue': { className: 'bg-red-100 text-red-800', label: 'Overdue' },
            'Due Soon': { className: 'bg-yellow-100 text-yellow-800', label: 'Due Soon' },
            'New': { className: 'bg-blue-100 text-blue-800', label: 'New' }
        };
        return configs[priority] || configs['New'];
    };

    if (!tasks || tasks.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Action Items
                    </CardTitle>
                </CardHeader>
                <CardContent className="py-12 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-700">All caught up! 🎉</p>
                    <p className="text-sm text-gray-600">You have no pending action items</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Action Items
                    <Badge className="bg-red-100 text-red-800 ml-2">{tasks.length}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {tasks.map((task, index) => {
                    const badgeConfig = getBadgeConfig(task.priority);
                    
                    return (
                        <div 
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <FileText className="w-4 h-4 text-[#4a90e2]" />
                                    <p className="font-semibold text-[#1e3a5f]">{task.title}</p>
                                </div>
                                <p className="text-sm text-gray-600">{task.description}</p>
                            </div>
                            <div className="flex items-center gap-3 ml-4">
                                <Badge className={badgeConfig.className}>
                                    {badgeConfig.label}
                                </Badge>
                                <Button 
                                    size="sm"
                                    onClick={() => handleComplete(task)}
                                    className="bg-[#4a90e2] hover:bg-[#1e3a5f]"
                                >
                                    Complete
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}