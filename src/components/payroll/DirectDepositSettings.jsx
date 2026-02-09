import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, Edit, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function DirectDepositSettings({ currentMethod, onUpdate }) {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [formData, setFormData] = useState({
        routing_number: '',
        account_number: '',
        confirm_account_number: '',
        account_type: ''
    });

    const handleSubmit = () => {
        if (!formData.routing_number || !formData.account_number || !formData.account_type) {
            toast.error('Please fill in all fields');
            return;
        }

        if (formData.account_number !== formData.confirm_account_number) {
            toast.error('Account numbers do not match');
            return;
        }

        if (formData.routing_number.length !== 9) {
            toast.error('Routing number must be 9 digits');
            return;
        }

        onUpdate(formData);
        setShowUpdateForm(false);
        setFormData({ routing_number: '', account_number: '', confirm_account_number: '', account_type: '' });
        toast.success('Bank account updated successfully!');
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Payment Settings
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-300">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                            <div>
                                <p className="text-sm text-gray-600">Current Payment Method</p>
                                <p className="font-bold text-[#1e3a5f] text-lg">Direct Deposit</p>
                            </div>
                        </div>
                        <Button
                            size="sm"
                            onClick={() => setShowUpdateForm(true)}
                            variant="outline"
                            className="border-[#4a90e2] text-[#4a90e2]"
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Update
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-600">Bank</p>
                            <p className="font-semibold text-gray-800">{currentMethod.bank_name}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Account</p>
                            <p className="font-semibold text-gray-800">
                                {currentMethod.account_type} ****{currentMethod.last_four}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Update Form Modal */}
                <Dialog open={showUpdateForm} onOpenChange={setShowUpdateForm}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-[#1e3a5f]">Update Bank Account</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                            <div>
                                <Label className="mb-2 block">Routing Number *</Label>
                                <Input
                                    placeholder="9-digit routing number"
                                    maxLength={9}
                                    value={formData.routing_number}
                                    onChange={(e) => setFormData({...formData, routing_number: e.target.value.replace(/\D/g, '')})}
                                />
                            </div>

                            <div>
                                <Label className="mb-2 block">Account Number *</Label>
                                <Input
                                    type="password"
                                    placeholder="Enter account number"
                                    value={formData.account_number}
                                    onChange={(e) => setFormData({...formData, account_number: e.target.value})}
                                />
                            </div>

                            <div>
                                <Label className="mb-2 block">Confirm Account Number *</Label>
                                <Input
                                    type="text"
                                    placeholder="Re-enter account number"
                                    value={formData.confirm_account_number}
                                    onChange={(e) => setFormData({...formData, confirm_account_number: e.target.value})}
                                />
                            </div>

                            <div>
                                <Label className="mb-2 block">Account Type *</Label>
                                <Select
                                    value={formData.account_type}
                                    onValueChange={(value) => setFormData({...formData, account_type: value})}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select account type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Checking">Checking</SelectItem>
                                        <SelectItem value="Savings">Savings</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700">
                                <p className="font-semibold mb-1">Important:</p>
                                <p>Changes will take effect on your next pay date. Please verify your information carefully.</p>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowUpdateForm(false)}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    className="flex-1 bg-[#4a90e2] hover:bg-[#1e3a5f]"
                                >
                                    Verify & Save
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}