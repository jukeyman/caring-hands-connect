import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Circle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function MessagesPreview({ messages, onViewAll }) {
    if (!messages || messages.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-[#1e3a5f]">Messages</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-8">
                    <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No messages yet</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-[#1e3a5f]">Messages</CardTitle>
                    <Badge className="bg-[#4a90e2]">
                        {messages.filter(m => m.unread).length} Unread
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {messages.slice(0, 3).map((message, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border border-gray-200 hover:border-[#4a90e2] cursor-pointer transition-all"
                    >
                        <div className="flex items-start gap-3">
                            {message.unread && (
                                <Circle className="w-3 h-3 text-[#4a90e2] fill-[#4a90e2] mt-1 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-semibold text-[#1e3a5f] text-sm">
                                        {message.from}
                                    </p>
                                    <span className="text-xs text-gray-500">
                                        {formatDistanceToNow(new Date(message.date), { addSuffix: true })}
                                    </span>
                                </div>
                                <p className="font-medium text-gray-900 text-sm mb-1">
                                    {message.subject}
                                </p>
                                <p className="text-sm text-gray-600 truncate">
                                    {message.preview}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                <Button 
                    onClick={onViewAll}
                    variant="outline" 
                    className="w-full border-[#4a90e2] text-[#4a90e2] hover:bg-[#4a90e2] hover:text-white"
                >
                    View All Messages
                </Button>
            </CardContent>
        </Card>
    );
}