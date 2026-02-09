import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Upload, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function UploadCertificationModal({ open, onClose, onSubmit }) {
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        certification_type: '',
        issue_date: null,
        expiration_date: null,
        organization: '',
        document: null
    });

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                toast.error('File must be less than 10MB');
                return;
            }
            setFormData({...formData, document: file});
        }
    };

    const handleSubmit = async () => {
        if (!formData.certification_type || !formData.issue_date || !formData.expiration_date || !formData.document) {
            toast.error('Please fill in all required fields');
            return;
        }

        setUploading(true);
        await onSubmit(formData);
        setUploading(false);
        
        setFormData({
            certification_type: '',
            issue_date: null,
            expiration_date: null,
            organization: '',
            document: null
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-[#1e3a5f] text-xl">Upload New Certification</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                    {/* Certification Type */}
                    <div>
                        <Label className="mb-2 block">Certification Type *</Label>
                        <Select
                            value={formData.certification_type}
                            onValueChange={(value) => setFormData({...formData, certification_type: value})}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select certification type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="CPR">CPR</SelectItem>
                                <SelectItem value="First Aid">First Aid</SelectItem>
                                <SelectItem value="Dementia Care">Dementia Care Specialist</SelectItem>
                                <SelectItem value="CNA License">CNA License</SelectItem>
                                <SelectItem value="Diabetes Management">Diabetes Management</SelectItem>
                                <SelectItem value="Medication Administration">Medication Administration</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Issue Date */}
                    <div>
                        <Label className="mb-2 block">Issue Date *</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.issue_date ? format(formData.issue_date, 'PPP') : 'Select date'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={formData.issue_date}
                                    onSelect={(date) => setFormData({...formData, issue_date: date})}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Expiration Date */}
                    <div>
                        <Label className="mb-2 block">Expiration Date *</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {formData.expiration_date ? format(formData.expiration_date, 'PPP') : 'Select date'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={formData.expiration_date}
                                    onSelect={(date) => setFormData({...formData, expiration_date: date})}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Certifying Organization */}
                    <div>
                        <Label className="mb-2 block">Certifying Organization</Label>
                        <Input
                            placeholder="e.g., American Red Cross"
                            value={formData.organization}
                            onChange={(e) => setFormData({...formData, organization: e.target.value})}
                        />
                    </div>

                    {/* Document Upload */}
                    <div>
                        <Label className="mb-2 block">Certificate Document *</Label>
                        <input
                            type="file"
                            id="cert-upload"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                        <Label htmlFor="cert-upload">
                            <div className="border-2 border-dashed border-[#4a90e2] rounded-lg p-6 text-center cursor-pointer hover:bg-blue-50 transition-all">
                                <Upload className="w-8 h-8 text-[#4a90e2] mx-auto mb-2" />
                                <p className="text-[#4a90e2] font-semibold">
                                    {formData.document ? formData.document.name : 'Upload PDF or Image'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Max 10MB</p>
                            </div>
                        </Label>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700">
                        <p className="font-semibold mb-1">Verification Process:</p>
                        <p>Our admin team will review your certification within 24 hours. You'll receive a notification once approved.</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={uploading}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={uploading}
                            className="flex-1 bg-[#4a90e2] hover:bg-[#1e3a5f]"
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                'Submit for Verification'
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}