import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, HeadphonesIcon } from 'lucide-react';

export default function Support({ onCall, onMessage }) {
    return (
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-[#4a90e2]">
            <CardContent className="py-6 text-center">
                <HeadphonesIcon className="w-12 h-12 text-[#4a90e2] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-2">Need Help?</h3>
                <p className="text-gray-700 mb-4">
                    Contact your care coordinator anytime
                </p>
                <div className="flex gap-3">
                    <Button 
                        onClick={onCall}
                        className="flex-1 bg-[#4a90e2] hover:bg-[#1e3a5f] text-white font-semibold py-6"
                    >
                        <Phone className="w-5 h-5 mr-2" />
                        Call Office
                    </Button>
                    <Button 
                        onClick={onMessage}
                        variant="outline"
                        className="flex-1 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white font-semibold py-6"
                    >
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Send Message
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}