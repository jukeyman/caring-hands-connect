import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MoreVertical, Send, Paperclip, Archive, AlertCircle, Phone } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function MessageThread({ 
    conversation, 
    messages, 
    currentUserId, 
    onSendMessage, 
    onArchive 
}) {
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        
        if (!newMessage.trim()) return;

        setSending(true);
        await onSendMessage(newMessage);
        setNewMessage('');
        setSending(false);
    };

    const handleArchive = () => {
        if (window.confirm('Archive this conversation?')) {
            onArchive(conversation.id);
            toast.success('Conversation archived');
        }
    };

    const handleAttach = () => {
        toast.info('File attachment coming soon');
    };

    if (!conversation) {
        return (
            <div className="h-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Select a conversation to start messaging</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Thread Header */}
            <div className="p-4 border-b bg-gradient-to-r from-white to-gray-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center text-white font-semibold">
                            {conversation.other_participant_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                            <h3 className="font-bold text-[#1e3a5f]">
                                {conversation.other_participant_name}
                            </h3>
                            <div className="flex items-center gap-2">
                                <p className="text-xs text-gray-600">{conversation.other_participant_type}</p>
                                {conversation.is_online && (
                                    <>
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className="text-xs text-green-600 font-semibold">Active</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Options Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleArchive}>
                                <Archive className="w-4 h-4 mr-2" />
                                Archive Conversation
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <AlertCircle className="w-4 h-4 mr-2" />
                                Report Issue
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Important Notice */}
            <Alert className="m-4 border-[#4a90e2] bg-blue-50">
                <AlertCircle className="w-4 h-4 text-[#4a90e2]" />
                <AlertDescription className="text-sm text-gray-700">
                    Caregivers typically respond within 4 hours. For urgent matters, call{' '}
                    <a href="tel:5125551234" className="font-semibold text-[#4a90e2] hover:underline">
                        (512) 555-1234
                    </a>.
                </AlertDescription>
            </Alert>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages?.map((message, index) => {
                    const isCurrentUser = message.sender_id === currentUserId;
                    
                    return (
                        <div 
                            key={index}
                            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                            {!isCurrentUser && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center text-white text-xs font-semibold mr-2 flex-shrink-0">
                                    {message.sender_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                            )}
                            
                            <div className={`max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'} flex flex-col`}>
                                <div 
                                    className={`rounded-2xl px-4 py-2 ${
                                        isCurrentUser 
                                            ? 'bg-[#4a90e2] text-white' 
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    <p className="text-sm leading-relaxed">{message.message_text}</p>
                                </div>
                                <div className="flex items-center gap-2 mt-1 px-2">
                                    <span className="text-xs text-gray-500">
                                        {format(new Date(message.created_date), 'MMM d, h:mm a')}
                                    </span>
                                    {isCurrentUser && message.is_read && (
                                        <span className="text-xs text-[#4a90e2]">✓✓</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-gray-50">
                <form onSubmit={handleSend} className="flex gap-2">
                    <Button 
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={handleAttach}
                        className="text-gray-600"
                    >
                        <Paperclip className="w-5 h-5" />
                    </Button>
                    <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend(e);
                            }
                        }}
                        rows={2}
                        className="flex-1"
                    />
                    <Button 
                        type="submit"
                        disabled={sending || !newMessage.trim()}
                        className="bg-[#4a90e2] hover:bg-[#1e3a5f] self-end"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}