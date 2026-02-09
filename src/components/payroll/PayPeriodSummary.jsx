import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign, CalendarCheck, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function PayPeriodSummary({ summary }) {
    const stats = [
        {
            icon: Clock,
            label: 'Hours Worked',
            value: `${summary.totalHours}h`,
            subtext: `Regular: ${summary.regularHours}h | Overtime: ${summary.overtimeHours}h`,
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: DollarSign,
            label: 'Estimated Earnings',
            value: `$${summary.estimatedEarnings.toLocaleString()}`,
            subtext: `Regular: $${summary.regularEarnings.toLocaleString()} | OT: $${summary.overtimeEarnings.toLocaleString()}`,
            color: 'from-green-500 to-green-600'
        },
        {
            icon: CalendarCheck,
            label: 'Visits Completed',
            value: `${summary.visitsCompleted}`,
            subtext: `Avg ${summary.avgHoursPerVisit} hours/visit`,
            color: 'from-purple-500 to-purple-600'
        },
        {
            icon: Calendar,
            label: 'Pay Date',
            value: format(new Date(summary.payDate), 'MMM d, yyyy'),
            subtext: 'Direct deposit',
            color: 'from-indigo-500 to-indigo-600'
        }
    ];

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-bold text-[#1e3a5f]">Current Pay Period</h2>
                    <p className="text-sm text-gray-600">
                        {format(new Date(summary.periodStart), 'MMMM d')} - {format(new Date(summary.periodEnd), 'MMMM d, yyyy')}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="border-2 hover:shadow-lg transition-all">
                        <CardContent className="pt-6">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-[#1e3a5f] mb-1">{stat.value}</p>
                            <p className="text-xs text-gray-500">{stat.subtext}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}