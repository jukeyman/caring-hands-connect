import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';
import { toast } from 'sonner';

export default function AutoPaySettings({ paymentMethods, settings, onSave }) {
    const [enabled, setEnabled] = useState(settings?.enabled || false);
    const [selectedMethod, setSelectedMethod] = useState(settings?.payment_method_id || '');
    const [paymentTiming, setPaymentTiming] = useState(settings?.payment_timing || 'due_date');
    const [emailReminder, setEmailReminder] = useState(settings?.email_reminder || false);

    const handleSave = () => {
        onSave({
            enabled,
            payment_method_id: selectedMethod,
            payment_timing: paymentTiming,
            email_reminder: emailReminder
        });
        toast.success('Auto-pay settings updated');
    };

    const defaultMethod = paymentMethods?.find(m => m.is_default);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Auto-Pay Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Enable Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                        <Label htmlFor="auto-pay" className="text-base font-semibold text-[#1e3a5f]">
                            Enable Auto-Pay
                        </Label>
                        <p className="text-sm text-gray-600">
                            Automatically charge invoices to your selected payment method
                        </p>
                    </div>
                    <Switch
                        id="auto-pay"
                        checked={enabled}
                        onCheckedChange={setEnabled}
                    />
                </div>

                {enabled && (
                    <div className="space-y-4 pl-4 border-l-2 border-[#4a90e2]">
                        {/* Payment Method Selection */}
                        <div>
                            <Label className="text-sm font-semibold text-[#1e3a5f] mb-2 block">
                                Payment Method
                            </Label>
                            <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select payment method" />
                                </SelectTrigger>
                                <SelectContent>
                                    {paymentMethods?.map((method, i) => (
                                        <SelectItem key={i} value={method.id}>
                                            {method.card_brand || method.type} •••• {method.last_four}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Payment Timing */}
                        <div>
                            <Label className="text-sm font-semibold text-[#1e3a5f] mb-2 block">
                                Auto-pay on
                            </Label>
                            <Select value={paymentTiming} onValueChange={setPaymentTiming}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="due_date">Invoice due date</SelectItem>
                                    <SelectItem value="issue_date">Invoice issue date</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Email Reminder */}
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="email_reminder"
                                checked={emailReminder}
                                onCheckedChange={setEmailReminder}
                            />
                            <Label htmlFor="email_reminder" className="cursor-pointer font-normal">
                                Send me a reminder 3 days before auto-pay
                            </Label>
                        </div>

                        {/* Info Box */}
                        <Alert className="border-[#4a90e2] bg-blue-50">
                            <Info className="w-4 h-4 text-[#4a90e2]" />
                            <AlertDescription className="text-sm text-gray-700">
                                With auto-pay enabled, invoices will automatically be charged to your selected 
                                payment method. You'll receive an email confirmation after each payment.
                            </AlertDescription>
                        </Alert>

                        {/* Save Button */}
                        <Button 
                            onClick={handleSave}
                            className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f] font-semibold"
                        >
                            Save Settings
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}