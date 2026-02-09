import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, CreditCard, MessageSquare, BookOpen, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuickLinks({ onNavigate }) {
    const links = [
        { icon: Calendar, label: "Schedule a Visit", action: "schedule" },
        { icon: FileText, label: "Care Plan Details", action: "care_plan" },
        { icon: CreditCard, label: "Billing & Invoices", action: "billing" },
        { icon: MessageSquare, label: "Message Team", action: "messages" },
        { icon: BookOpen, label: "Care Resources", action: "resources" },
        { icon: Settings, label: "Account Settings", action: "settings" }
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Resources</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {links.map((link, index) => {
                        const IconComponent = link.icon;
                        return (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.05 * index }}
                                onClick={() => onNavigate(link.action)}
                                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-[#4a90e2] hover:shadow-lg transition-all duration-300 group"
                            >
                                <IconComponent className="w-8 h-8 text-[#4a90e2] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                                <p className="text-sm font-semibold text-[#1e3a5f] text-center">
                                    {link.label}
                                </p>
                            </motion.button>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}