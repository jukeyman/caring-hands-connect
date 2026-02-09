import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from 'date-fns';

export default function Signatures({ signatures, onSignaturesChange }) {
    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Signatures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Caregiver Signature */}
                <div>
                    <Label className="font-semibold mb-2 block">Caregiver Signature *</Label>
                    <Input
                        placeholder="Type your full name"
                        value={signatures.caregiverSignature || ''}
                        onChange={(e) => onSignaturesChange({ caregiverSignature: e.target.value })}
                        className="text-lg"
                    />
                    <div className="flex items-start gap-3 mt-3">
                        <Checkbox
                            id="certify"
                            checked={signatures.certified || false}
                            onCheckedChange={(checked) => onSignaturesChange({ certified: checked })}
                        />
                        <Label htmlFor="certify" className="cursor-pointer text-sm leading-relaxed">
                            I certify that the information above is accurate and complete
                        </Label>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Signed at: {format(new Date(), 'h:mm a on MMMM d, yyyy')}
                    </p>
                </div>

                {/* Family/Client Signature */}
                <div>
                    <Label className="font-semibold mb-3 block">
                        Family/Client Signature (Optional)
                    </Label>
                    <RadioGroup 
                        value={signatures.hasFamilySignature ? 'yes' : 'no'} 
                        onValueChange={(value) => onSignaturesChange({ hasFamilySignature: value === 'yes' })}
                    >
                        <div className="flex gap-4 mb-3">
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="no" id="family-sig-no" />
                                <Label htmlFor="family-sig-no" className="cursor-pointer">
                                    No signature collected
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="yes" id="family-sig-yes" />
                                <Label htmlFor="family-sig-yes" className="cursor-pointer">
                                    Family member signed
                                </Label>
                            </div>
                        </div>
                    </RadioGroup>

                    {signatures.hasFamilySignature && (
                        <div className="space-y-3 border-t pt-4">
                            <div>
                                <Label className="text-sm mb-1 block">Family Member Name</Label>
                                <Input
                                    placeholder="Type their full name"
                                    value={signatures.familyName || ''}
                                    onChange={(e) => onSignaturesChange({ familyName: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label className="text-sm mb-1 block">Signature</Label>
                                <Input
                                    placeholder="Type family member's signature"
                                    value={signatures.familySignature || ''}
                                    onChange={(e) => onSignaturesChange({ familySignature: e.target.value })}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}