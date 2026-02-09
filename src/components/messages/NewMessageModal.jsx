import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Paperclip } from 'lucide-react';
import { toast } from 'sonner';

export default function NewMessageModal({ open, onClose, recipients, onSend }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        recipientId: '',
        subject: '',
        message: '',
        attachments: []
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.recipientId || !formData.message.trim()) {
            toast.error('Please select a recipient and enter a message');
            return;
        }

        setLoading(true);

        await onSend(formData);
        
        setFormData({ recipientId: '', subject: '', message: '', attachments: [] });
        setLoading(false);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-[#1e3a5f]">
                        New Message
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Recipient */}
                    <div>
                        <Label htmlFor="recipient">To</Label>
                        <Select 
                            value={formData.recipientId} 
                            onValueChange={(value) => setFormData({...formData, recipientId: value})}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select recipient" />
                            </SelectTrigger>
                            <SelectContent>
                                {recipients?.map((recipient) => (
                                    <SelectItem key={recipient.id} value={recipient.id}>
                                        {recipient.name} - {recipient.type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Subject */}
                    <div>
                        <Label htmlFor="subject">Subject (Optional)</Label>
                        <Input
                            id="subject"
                            placeholder="What's this about?"
                            value={formData.subject}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            placeholder="Type your message here..."
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            rows={6}
                            required
                        />
                    </div>

                    {/* Attach Files */}
                    <div>
                        <Button 
                            type="button"
                            variant="outline"
                            onClick={() => toast.info('File attachment coming soon')}
                            className="border-[#4a90e2] text-[#4a90e2]"
                        >
                            <Paperclip className="w-4 h-4 mr-2" />
                            Attach Files
                        </Button>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <Button 
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-[#4a90e2] hover:bg-[#1e3a5f]"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Message
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}