import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function ConversationList({ 
    conversations, 
    selectedConversationId, 
    onSelectConversation, 
    onNewMessage,
    filter,
    onFilterChange 
}) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredConversations = conversations?.filter(conv => {
        // Apply category filter
        if (filter === 'caregivers' && conv.other_participant_type !== 'Caregiver') return false;
        if (filter === 'coordinators' && conv.other_participant_type !== 'Care Coordinator' && conv.other_participant_type !== 'Admin') return false;
        if (filter === 'archived' && !conv.is_archived) return false;
        if (filter === 'all' && conv.is_archived) return false;

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return conv.other_participant_name.toLowerCase().includes(query) ||
                   conv.last_message_text?.toLowerCase().includes(query);
        }
        return true;
    }) || [];

    return (
        <div className="h-full flex flex-col bg-white border-r">
            {/* Header */}
            <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-[#1e3a5f]">Messages</h2>
                    <Button 
                        size="sm"
                        onClick={onNewMessage}
                        className="bg-[#4a90e2] hover:bg-[#1e3a5f]"
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        New
                    </Button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-2 mt-4">
                    <Button 
                        size="sm"
                        variant={filter === 'all' ? 'default' : 'ghost'}
                        onClick={() => onFilterChange('all')}
                        className={filter === 'all' ? 'bg-[#4a90e2]' : ''}
                    >
                        All
                    </Button>
                    <Button 
                        size="sm"
                        variant={filter === 'caregivers' ? 'default' : 'ghost'}
                        onClick={() => onFilterChange('caregivers')}
                        className={filter === 'caregivers' ? 'bg-[#4a90e2]' : ''}
                    >
                        Caregivers
                    </Button>
                    <Button 
                        size="sm"
                        variant={filter === 'coordinators' ? 'default' : 'ghost'}
                        onClick={() => onFilterChange('coordinators')}
                        className={filter === 'coordinators' ? 'bg-[#4a90e2]' : ''}
                    >
                        Coordinators
                    </Button>
                    <Button 
                        size="sm"
                        variant={filter === 'archived' ? 'default' : 'ghost'}
                        onClick={() => onFilterChange('archived')}
                        className={filter === 'archived' ? 'bg-[#4a90e2]' : ''}
                    >
                        Archived
                    </Button>
                </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
                {filteredConversations.length === 0 ? (
                    <div className="text-center py-12 px-4">
                        <p className="text-gray-600">No conversations found</p>
                    </div>
                ) : (
                    filteredConversations.map((conv) => (
                        <div
                            key={conv.id}
                            onClick={() => onSelectConversation(conv)}
                            className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                                selectedConversationId === conv.id ? 'bg-blue-50 border-l-4 border-l-[#4a90e2]' : ''
                            }`}
                        >
                            <div className="flex gap-3">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center text-white font-semibold">
                                        {conv.other_participant_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-[#1e3a5f] truncate">
                                                {conv.other_participant_name}
                                            </p>
                                            {conv.is_online && (
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            )}
                                        </div>
                                        {conv.last_message_at && (
                                            <span className="text-xs text-gray-500">
                                                {formatDistanceToNow(new Date(conv.last_message_at), { addSuffix: true })}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 mb-1">{conv.other_participant_type}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-700 truncate flex-1">
                                            {conv.last_message_text || 'No messages yet'}
                                        </p>
                                        {conv.unread_count > 0 && (
                                            <Badge className="bg-[#4a90e2] text-white ml-2">
                                                {conv.unread_count}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}