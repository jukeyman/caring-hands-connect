import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Send, AlertCircle, Phone } from 'lucide-react';
import { toast } from 'sonner';

export default function MessageCenter({ caregiverFirstName }) {
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    // Mock message thread
    const [messages, setMessages] = useState([
        {
            from: 'caregiver',
            text: "Hi! Looking forward to our visit tomorrow. Please let me know if you need anything specific.",
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
        },
        {
            from: 'client',
            text: "Thank you! Could you please bring the medication chart?",
            timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000)
        },
        {
            from: 'caregiver',
            text: "Absolutely, I'll have it with me!",
            timestamp: new Date(Date.now() - 19 * 60 * 60 * 1000)
        }
    ]);

    const handleSend = async (e) => {
        e.preventDefault();
        
        if (!message.trim()) {
            toast.error('Please enter a message');
            return;
        }

        setSending(true);
        
        // Simulate sending
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setMessages([...messages, {
            from: 'client',
            text: message,
            timestamp: new Date()
        }]);
        
        toast.success('Message sent!');
        setMessage('');
        setSending(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Message {caregiverFirstName}</CardTitle>
            </CardHeader>
            <CardContent>
                <Alert className="mb-6 border-[#4a90e2] bg-blue-50">
                    <AlertCircle className="w-4 h-4 text-[#4a90e2]" />
                    <AlertDescription className="text-sm text-gray-700">
                        Caregiver will respond within 4 hours. For urgent matters, call{' '}
                        <a href="tel:5125551234" className="font-semibold text-[#4a90e2] hover:underline">
                            (512) 555-1234
                        </a>.
                    </AlertDescription>
                </Alert>

                {/* Message Thread */}
                <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4 space-y-3">
                    {messages.map((msg, index) => (
                        <div 
                            key={index}
                            className={`flex ${msg.from === 'client' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div 
                                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                                    msg.from === 'client'
                                        ? 'bg-[#4a90e2] text-white'
                                        : 'bg-white border border-gray-200 text-gray-800'
                                }`}
                            >
                                <p className="text-sm">{msg.text}</p>
                                <p className={`text-xs mt-1 ${
                                    msg.from === 'client' ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                    {format(msg.timestamp, 'h:mm a')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSend} className="flex gap-2">
                    <Textarea
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={2}
                        className="flex-1"
                    />
                    <Button 
                        type="submit"
                        disabled={sending}
                        className="bg-[#4a90e2] hover:bg-[#1e3a5f] self-end"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}