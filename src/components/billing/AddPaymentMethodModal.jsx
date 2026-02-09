import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AddPaymentMethodModal({ open, onClose, onAdd }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvc: '',
        cardholderName: '',
        billingZip: '',
        setDefault: false,
        enableAutoPay: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate Stripe processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        // In production, this would use Stripe.js to tokenize the card
        const mockPaymentMethod = {
            type: 'Credit Card',
            card_brand: 'Visa',
            last_four: formData.cardNumber.slice(-4),
            expiration_month: parseInt(formData.expMonth),
            expiration_year: parseInt(formData.expYear),
            billing_name: formData.cardholderName,
            billing_zip: formData.billingZip,
            is_default: formData.setDefault,
            stripe_payment_method_id: 'pm_mock_' + Date.now()
        };

        onAdd(mockPaymentMethod);
        toast.success('Payment method added successfully');
        onClose();
        setLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-[#1e3a5f]">
                        Add Payment Method
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Card Number */}
                    <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                            required
                        />
                    </div>

                    {/* Expiration & CVC */}
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <Label htmlFor="expMonth">MM</Label>
                            <Input
                                id="expMonth"
                                placeholder="12"
                                maxLength={2}
                                value={formData.expMonth}
                                onChange={(e) => setFormData({...formData, expMonth: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="expYear">YY</Label>
                            <Input
                                id="expYear"
                                placeholder="25"
                                maxLength={2}
                                value={formData.expYear}
                                onChange={(e) => setFormData({...formData, expYear: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input
                                id="cvc"
                                placeholder="123"
                                maxLength={4}
                                value={formData.cvc}
                                onChange={(e) => setFormData({...formData, cvc: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    {/* Cardholder Name */}
                    <div>
                        <Label htmlFor="cardholderName">Cardholder Name</Label>
                        <Input
                            id="cardholderName"
                            placeholder="John Doe"
                            value={formData.cardholderName}
                            onChange={(e) => setFormData({...formData, cardholderName: e.target.value})}
                            required
                        />
                    </div>

                    {/* Billing ZIP */}
                    <div>
                        <Label htmlFor="billingZip">Billing ZIP Code</Label>
                        <Input
                            id="billingZip"
                            placeholder="78701"
                            maxLength={5}
                            value={formData.billingZip}
                            onChange={(e) => setFormData({...formData, billingZip: e.target.value})}
                            required
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="setDefault"
                                checked={formData.setDefault}
                                onCheckedChange={(checked) => setFormData({...formData, setDefault: checked})}
                            />
                            <Label htmlFor="setDefault" className="cursor-pointer font-normal">
                                Set as default payment method
                            </Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="enableAutoPay"
                                checked={formData.enableAutoPay}
                                onCheckedChange={(checked) => setFormData({...formData, enableAutoPay: checked})}
                            />
                            <Label htmlFor="enableAutoPay" className="cursor-pointer font-normal">
                                Enable auto-pay for future invoices
                            </Label>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <Alert className="border-[#4a90e2] bg-blue-50">
                        <Shield className="w-4 h-4 text-[#4a90e2]" />
                        <AlertDescription className="text-xs text-gray-700">
                            Payments are processed securely via Stripe. We never store your full card number.
                        </AlertDescription>
                    </Alert>

                    {/* Submit */}
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
                            className="flex-1 bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f]"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                'Add Payment Method'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}