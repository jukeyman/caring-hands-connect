import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, DollarSign, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

export default function KPIOverview({ kpis }) {
    const cards = [
        {
            icon: Users,
            label: 'Total Active Clients',
            value: kpis.active_clients,
            change: kpis.clients_change,
            changeText: `${Math.abs(kpis.clients_change)} this month`,
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: UserCheck,
            label: 'Total Active Caregivers',
            value: kpis.active_caregivers,
            change: kpis.caregivers_change,
            changeText: `${Math.abs(kpis.caregivers_change)} this month`,
            color: 'from-purple-500 to-purple-600'
        },
        {
            icon: DollarSign,
            label: 'Monthly Revenue',
            value: `$${kpis.monthly_revenue.toLocaleString()}`,
            change: kpis.revenue_change_percent,
            changeText: `${Math.abs(kpis.revenue_change_percent)}% vs last month`,
            color: 'from-green-500 to-green-600'
        },
        {
            icon: TrendingUp,
            label: 'Gross Profit Margin',
            value: `${kpis.profit_margin}%`,
            change: kpis.profit_margin >= 40 ? 1 : -1,
            changeText: `Target: 40%`,
            color: 'from-amber-500 to-amber-600'
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
                        <p className="text-3xl font-bold text-[#1e3a5f] mb-2">{card.value}</p>
                        <div className="flex items-center gap-1 text-sm">
                            {card.change > 0 ? (
                                <ArrowUp className="w-4 h-4 text-green-600" />
                            ) : card.change < 0 ? (
                                <ArrowDown className="w-4 h-4 text-red-600" />
                            ) : null}
                            <span className={card.change > 0 ? 'text-green-600' : card.change < 0 ? 'text-red-600' : 'text-gray-600'}>
                                {card.changeText}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}