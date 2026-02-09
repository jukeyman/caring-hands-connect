import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function RequestAdjustmentModal({ open, onClose, carePlanId, clientId, onSubmit }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        requestedChanges: [],
        description: '',
        urgency: '',
        preferredContactMethod: ''
    });

    const changeOptions = [
        'Schedule (hours/days/times)',
        'Add/Remove Services',
        'Change Caregiver',
        'Increase/Decrease Hours',
        'Other'
    ];

    const toggleChange = (change) => {
        setFormData(prev => ({
            ...prev,
            requestedChanges: prev.requestedChanges.includes(change)
                ? prev.requestedChanges.filter(c => c !== change)
                : [...prev.requestedChanges, change]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.requestedChanges.length === 0) {
            toast.error('Please select at least one type of change');
            return;
        }

        if (!formData.description.trim()) {
            toast.error('Please describe your requested changes');
            return;
        }

        if (!formData.urgency || !formData.preferredContactMethod) {
            toast.error('Please select urgency and contact method');
            return;
        }

        setLoading(true);

        await onSubmit({
            care_plan_id: carePlanId,
            client_id: clientId,
            requested_changes: formData.requestedChanges,
            description: formData.description,
            urgency: formData.urgency,
            preferred_contact_method: formData.preferredContactMethod,
            status: 'Pending Review'
        });

        setLoading(false);
        setFormData({
            requestedChanges: [],
            description: '',
            urgency: '',
            preferredContactMethod: ''
        });
        onClose();
        
        toast.success(
            "We've received your request! A care coordinator will contact you within 24 hours.",
            { duration: 5000 }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-[#1e3a5f]">
                        Request Care Plan Adjustment
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* What to Change */}
                    <div>
                        <Label className="text-sm font-semibold text-[#1e3a5f] mb-3 block">
                            What would you like to change? *
                        </Label>
                        <div className="space-y-3">
                            {changeOptions.map((option) => (
                                <div key={option} className="flex items-center gap-2">
                                    <Checkbox
                                        id={option}
                                        checked={formData.requestedChanges.includes(option)}
                                        onCheckedChange={() => toggleChange(option)}
                                    />
                                    <Label htmlFor={option} className="cursor-pointer font-normal">
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description" className="text-sm font-semibold text-[#1e3a5f] mb-2 block">
                            Describe your requested changes *
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Please provide details about what you'd like to change and why..."
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            rows={5}
                            required
                        />
                    </div>

                    {/* Urgency */}
                    <div>
                        <Label htmlFor="urgency" className="text-sm font-semibold text-[#1e3a5f] mb-2 block">
                            Urgency *
                        </Label>
                        <Select 
                            value={formData.urgency} 
                            onValueChange={(value) => setFormData({...formData, urgency: value})}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select urgency level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Not urgent">Not urgent</SelectItem>
                                <SelectItem value="Within 2 weeks">Within 2 weeks</SelectItem>
                                <SelectItem value="Within 1 week">Within 1 week</SelectItem>
                                <SelectItem value="Urgent">Urgent</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Contact Method */}
                    <div>
                        <Label htmlFor="contactMethod" className="text-sm font-semibold text-[#1e3a5f] mb-2 block">
                            Preferred Contact Method *
                        </Label>
                        <Select 
                            value={formData.preferredContactMethod} 
                            onValueChange={(value) => setFormData({...formData, preferredContactMethod: value})}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="How should we reach you?" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Phone">Phone</SelectItem>
                                <SelectItem value="Email">Email</SelectItem>
                                <SelectItem value="Video Call">Video Call</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Info Alert */}
                    <Alert className="border-[#4a90e2] bg-blue-50">
                        <CheckCircle className="w-4 h-4 text-[#4a90e2]" />
                        <AlertDescription className="text-sm text-gray-700">
                            Our care coordinator will review your request and contact you within 24 hours 
                            to discuss the changes and create an updated care plan.
                        </AlertDescription>
                    </Alert>

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
                            className="flex-1 bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f] font-semibold"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Request'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}