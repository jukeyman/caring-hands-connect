import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function Announcements({ announcements, onReadMore }) {
    if (!announcements || announcements.length === 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Announcements
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {announcements.slice(0, 3).map((announcement, index) => (
                    <div 
                        key={index}
                        className="p-4 bg-gradient-to-br from-white to-blue-50 rounded-lg border-2 border-gray-200 hover:border-[#4a90e2] transition-all cursor-pointer"
                        onClick={() => onReadMore(announcement)}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-[#1e3a5f] flex-1">{announcement.title}</h3>
                            {announcement.priority === 'High' || announcement.priority === 'Urgent' ? (
                                <Badge className="bg-red-100 text-red-800">
                                    {announcement.priority}
                                </Badge>
                            ) : null}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                            {formatDistanceToNow(new Date(announcement.published_at || announcement.created_date), { addSuffix: true })}
                        </p>
                        <p className="text-sm text-gray-700 mb-3">
                            {announcement.preview}
                        </p>
                        <div className="flex items-center justify-between">
                            <Button 
                                size="sm"
                                variant="ghost"
                                className="text-[#4a90e2] p-0 h-auto"
                            >
                                Read More
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}