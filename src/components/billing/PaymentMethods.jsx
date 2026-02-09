import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Trash2, Edit, CheckCircle, Plus } from 'lucide-react';
import { toast } from 'sonner';
import AddPaymentMethodModal from './AddPaymentMethodModal';

export default function PaymentMethods({ paymentMethods, onAdd, onRemove, onSetDefault }) {
    const [showAddModal, setShowAddModal] = useState(false);

    const handleRemove = (method) => {
        if (window.confirm('Are you sure you want to remove this payment method?')) {
            onRemove(method.id);
            toast.success('Payment method removed');
        }
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-[#1e3a5f]">Saved Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {paymentMethods?.map((method, index) => (
                        <div 
                            key={index}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-[#4a90e2] transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center">
                                        <CreditCard className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-[#1e3a5f]">
                                                {method.card_brand || method.type} ending in {method.last_four}
                                            </p>
                                            {method.is_default && (
                                                <Badge className="bg-green-100 text-green-800">
                                                    Default
                                                </Badge>
                                            )}
                                        </div>
                                        {method.expiration_month && method.expiration_year && (
                                            <p className="text-sm text-gray-600">
                                                Expires {method.expiration_month}/{method.expiration_year}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {!method.is_default && (
                                        <Button 
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => onSetDefault(method.id)}
                                            className="text-[#4a90e2]"
                                        >
                                            Set as Default
                                        </Button>
                                    )}
                                    <Button 
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleRemove(method)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {(!paymentMethods || paymentMethods.length === 0) && (
                        <div className="text-center py-8">
                            <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600 mb-4">No payment methods saved</p>
                        </div>
                    )}

                    <Button 
                        onClick={() => setShowAddModal(true)}
                        className="w-full bg-[#4a90e2] hover:bg-[#1e3a5f]"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Payment Method
                    </Button>
                </CardContent>
            </Card>

            <AddPaymentMethodModal 
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAdd={onAdd}
            />
        </>
    );
}