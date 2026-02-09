import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function CarePlanOverview({ carePlan, clientName }) {
    if (!carePlan) {
        return (
            <Card>
                <CardContent className="py-12 text-center">
                    <p className="text-gray-600">No active care plan found</p>
                </CardContent>
            </Card>
        );
    }

    const getStatusBadge = (status) => {
        const configs = {
            'Active': { className: 'bg-green-100 text-green-800', label: 'Active' },
            'Draft': { className: 'bg-yellow-100 text-yellow-800', label: 'Draft' },
            'Paused': { className: 'bg-gray-100 text-gray-800', label: 'Paused' }
        };
        return configs[status] || configs['Active'];
    };

    const statusConfig = getStatusBadge(carePlan.status);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <Card className="border-2 border-[#4a90e2]">
                <CardHeader className="bg-gradient-to-r from-[#1e3a5f] to-[#4a90e2] text-white">
                    <CardTitle className="flex items-center justify-between">
                        <span>Your Current Care Plan</span>
                        <Badge className={statusConfig.className}>
                            {statusConfig.label}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <h3 className="text-xl font-bold text-[#1e3a5f] mb-6">
                        Custom Care Plan for {clientName}
                    </h3>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Start Date</p>
                            <p className="font-semibold text-[#1e3a5f]">
                                {format(new Date(carePlan.start_date), 'MMMM d, yyyy')}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                            <p className="font-semibold text-[#1e3a5f]">
                                {format(new Date(carePlan.updated_date), 'MMMM d, yyyy')}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Plan Review Date</p>
                            <p className="font-semibold text-[#1e3a5f] flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {format(new Date(new Date(carePlan.start_date).setMonth(new Date(carePlan.start_date).getMonth() + 3)), 'MMMM d, yyyy')}
                            </p>
                            <p className="text-xs text-gray-500">(every 90 days)</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}