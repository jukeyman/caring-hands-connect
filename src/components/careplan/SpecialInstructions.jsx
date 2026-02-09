import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Edit, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SpecialInstructions({ carePlan, onUpdate }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [instructions, setInstructions] = useState(carePlan?.special_requirements || '');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        await onUpdate({ special_requirements: instructions });
        setSaving(false);
        setShowEditModal(false);
        toast.success('Special instructions updated');
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Special Care Instructions
                        </CardTitle>
                        <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => setShowEditModal(true)}
                            className="border-[#4a90e2] text-[#4a90e2]"
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-[#4a90e2]">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                            {carePlan?.special_requirements || 'No special instructions provided yet.'}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Edit Modal */}
            <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-[#1e3a5f]">
                            Edit Special Care Instructions
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                        <p className="text-sm text-gray-600">
                            Include any important details your caregivers should know - preferences, 
                            routines, communication needs, medical considerations, etc.
                        </p>
                        
                        <Textarea
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            rows={8}
                            placeholder="Enter special care instructions here..."
                            className="resize-none"
                        />

                        <div className="flex gap-3 pt-4">
                            <Button 
                                type="button"
                                variant="outline"
                                onClick={() => setShowEditModal(false)}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button 
                                onClick={handleSave}
                                disabled={saving}
                                className="flex-1 bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f]"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    'Save Instructions'
                                )}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}