import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, XCircle, Trophy } from 'lucide-react';

export default function CertificationStatusOverview({ stats }) {
    const cards = [
        {
            icon: CheckCircle,
            label: 'Active Certifications',
            value: `${stats.active} of ${stats.total}`,
            subtext: 'All required certs valid',
            color: 'from-green-500 to-green-600',
            textColor: 'text-green-700'
        },
        {
            icon: AlertTriangle,
            label: 'Expiring Soon',
            value: `${stats.expiring}`,
            subtext: stats.expiringText || 'None expiring soon',
            color: 'from-yellow-500 to-yellow-600',
            textColor: 'text-yellow-700'
        },
        {
            icon: XCircle,
            label: 'Expired',
            value: `${stats.expired}`,
            subtext: stats.expired > 0 ? 'Action required' : 'No action needed',
            color: 'from-red-500 to-red-600',
            textColor: 'text-red-700'
        },
        {
            icon: Trophy,
            label: 'Completed Training',
            value: `${stats.completed_courses}`,
            subtext: `${stats.total_hours} hours total`,
            color: 'from-purple-500 to-purple-600',
            textColor: 'text-purple-700'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cards.map((card, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-all">
                    <CardContent className="pt-6">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                            <card.icon className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{card.label}</p>
                        <p className={`text-2xl font-bold mb-1 ${card.textColor}`}>{card.value}</p>
                        <p className="text-xs text-gray-500">{card.subtext}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}