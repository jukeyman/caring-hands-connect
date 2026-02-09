import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, CreditCard, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function BillingAccountSummary({ summary }) {
    const isOverdue = summary?.current_balance > 0 && new Date(summary?.due_date) < new Date();

    return (
        <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Current Balance */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Card className={`${isOverdue ? 'border-red-500 border-2' : ''}`}>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-600">Current Balance</p>
                            <DollarSign className="w-5 h-5 text-[#4a90e2]" />
                        </div>
                        <p className="text-3xl font-bold text-[#1e3a5f] mb-1">
                            ${summary?.current_balance?.toFixed(2) || '0.00'}
                        </p>
                        {summary?.due_date && (
                            <p className={`text-sm font-semibold ${
                                isOverdue ? 'text-red-600' : 'text-green-600'
                            }`}>
                                {isOverdue ? 'Overdue' : 'Due'} {format(new Date(summary.due_date), 'MMM d, yyyy')}
                            </p>
                        )}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Last Payment */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-600">Last Payment</p>
                            <CreditCard className="w-5 h-5 text-[#4a90e2]" />
                        </div>
                        <p className="text-3xl font-bold text-[#1e3a5f] mb-1">
                            ${summary?.last_payment_amount?.toFixed(2) || '0.00'}
                        </p>
                        {summary?.last_payment_date && (
                            <>
                                <p className="text-sm text-gray-600">
                                    {format(new Date(summary.last_payment_date), 'MMM d, yyyy')}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {summary?.last_payment_method || 'Visa •••• 4242'}
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
            </motion.div>

            {/* YTD Total */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-600">YTD Total</p>
                            <TrendingUp className="w-5 h-5 text-[#4a90e2]" />
                        </div>
                        <p className="text-3xl font-bold text-[#1e3a5f] mb-1">
                            ${summary?.ytd_total?.toFixed(2) || '0.00'}
                        </p>
                        <p className="text-sm text-gray-600">
                            {summary?.ytd_period || 'Jan 1 - Jan 26, 2024'}
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}