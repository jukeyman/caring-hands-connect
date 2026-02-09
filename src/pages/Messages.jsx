import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import ConversationList from '../components/messages/ConversationList';
import MessageThread from '../components/messages/MessageThread';
import NewMessageModal from '../components/messages/NewMessageModal';

export default function Messages() {
    const [user, setUser] = useState(null);
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [filter, setFilter] = useState('all');
    const [showNewMessageModal, setShowNewMessageModal] = useState(false);

    const queryClient = useQueryClient();

    // Fetch user and client
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = await base44.auth.me();
                if (!currentUser) {
                    base44.auth.redirectToLogin(window.location.pathname);
                    return;
                }
                setUser(currentUser);

                const clients = await base44.entities.Client.filter({ email: currentUser.email });
                if (clients.length > 0) {
                    setClient(clients[0]);
                }
            } catch (error) {
                toast.error('Failed to load messages');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Fetch conversations
    const { data: conversations = [] } = useQuery({
        queryKey: ['conversations', client?.id],
        queryFn: () => base44.entities.Conversation.filter({ client_id: client.id }, '-last_message_at'),
        enabled: !!client
    });

    // Fetch messages for selected conversation
    const { data: messages = [] } = useQuery({
        queryKey: ['messages', selectedConversation?.id],
        queryFn: () => base44.entities.Message.filter({ 
            conversation_id: selectedConversation.id 
        }, 'created_date'),
        enabled: !!selectedConversation
    });

    // Fetch caregivers and staff for new message recipients
    const { data: caregivers = [] } = useQuery({
        queryKey: ['caregivers'],
        queryFn: () => base44.entities.Caregiver.filter({ employment_status: 'Active' }),
        enabled: !!client
    });

    // Build recipients list
    const recipients = [
        ...caregivers.map(cg => ({
            id: cg.id,
            name: `${cg.first_name} ${cg.last_name.charAt(0)}.`,
            type: 'Caregiver'
        })),
        {
            id: 'admin_1',
            name: 'Care Coordinator Sarah',
            type: 'Care Coordinator'
        }
    ];

    // Send message mutation
    const sendMessageMutation = useMutation({
        mutationFn: async (messageText) => {
            const message = await base44.entities.Message.create({
                conversation_id: selectedConversation.id,
                sender_id: user.id,
                sender_name: user.full_name,
                sender_type: 'Client',
                message_text: messageText
            });

            // Update conversation last message
            await base44.entities.Conversation.update(selectedConversation.id, {
                last_message_text: messageText,
                last_message_at: new Date().toISOString()
            });

            return message;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages', selectedConversation?.id] });
            queryClient.invalidateQueries({ queryKey: ['conversations', client?.id] });
        }
    });

    // Create new conversation mutation
    const createConversationMutation = useMutation({
        mutationFn: async (formData) => {
            const recipient = recipients.find(r => r.id === formData.recipientId);
            
            // Check if conversation already exists
            const existing = conversations.find(c => 
                c.other_participant_id === formData.recipientId
            );

            let conversation;
            if (existing) {
                conversation = existing;
            } else {
                conversation = await base44.entities.Conversation.create({
                    client_id: client.id,
                    other_participant_id: formData.recipientId,
                    other_participant_name: recipient.name,
                    other_participant_type: recipient.type,
                    subject: formData.subject,
                    last_message_text: formData.message,
                    last_message_at: new Date().toISOString()
                });
            }

            // Create first message
            await base44.entities.Message.create({
                conversation_id: conversation.id,
                sender_id: user.id,
                sender_name: user.full_name,
                sender_type: 'Client',
                message_text: formData.message
            });

            return conversation;
        },
        onSuccess: (conversation) => {
            queryClient.invalidateQueries({ queryKey: ['conversations', client?.id] });
            setSelectedConversation(conversation);
            toast.success('Message sent!');
        }
    });

    const handleSendMessage = async (messageText) => {
        await sendMessageMutation.mutateAsync(messageText);
    };

    const handleSendNewMessage = async (formData) => {
        await createConversationMutation.mutateAsync(formData);
    };

    const handleArchiveConversation = async (conversationId) => {
        await base44.entities.Conversation.update(conversationId, { is_archived: true });
        queryClient.invalidateQueries({ queryKey: ['conversations', client?.id] });
        setSelectedConversation(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#4a90e2] animate-spin" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white p-4 border-b">
                <Link to={createPageUrl('Dashboard')}>
                    <Button variant="ghost" className="text-[#4a90e2] hover:text-[#1e3a5f] mb-2">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-[#1e3a5f]">Messages</h1>
            </div>

            {/* Desktop/Tablet Layout */}
            <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link to={createPageUrl('Dashboard')}>
                    <Button variant="ghost" className="mb-6 text-[#4a90e2] hover:text-[#1e3a5f]">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </Link>
            </div>

            {/* Two Column Layout */}
            <div className="max-w-7xl mx-auto px-0 lg:px-4">
                <div className="bg-white rounded-none lg:rounded-2xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
                        {/* Left Column - Conversation List */}
                        <div className="lg:col-span-4 h-full overflow-hidden">
                            <ConversationList 
                                conversations={conversations}
                                selectedConversationId={selectedConversation?.id}
                                onSelectConversation={setSelectedConversation}
                                onNewMessage={() => setShowNewMessageModal(true)}
                                filter={filter}
                                onFilterChange={setFilter}
                            />
                        </div>

                        {/* Right Column - Message Thread */}
                        <div className="lg:col-span-8 h-full overflow-hidden">
                            <MessageThread 
                                conversation={selectedConversation}
                                messages={messages}
                                currentUserId={user?.id}
                                onSendMessage={handleSendMessage}
                                onArchive={handleArchiveConversation}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* New Message Modal */}
            <NewMessageModal 
                open={showNewMessageModal}
                onClose={() => setShowNewMessageModal(false)}
                recipients={recipients}
                onSend={handleSendNewMessage}
            />
        </div>
    );
}