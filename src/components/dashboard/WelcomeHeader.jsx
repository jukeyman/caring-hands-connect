import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, FileText, Edit } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WelcomeHeader({ firstName, onAction }) {
    const quickActions = [
        { icon: Calendar, label: "Schedule a Visit", action: "schedule" },
        { icon: MessageSquare, label: "Message Your Caregiver", action: "message" },
        { icon: FileText, label: "View Invoices", action: "invoices" },
        { icon: Edit, label: "Request Changes to Care Plan", action: "care_plan" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] text-white rounded-2xl p-8 mb-8"
        >
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                Welcome back, {firstName}!
            </h1>
            <p className="text-gray-200 mb-6">
                Here's everything you need to manage your care
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <Button
                            key={index}
                            onClick={() => onAction(item.action)}
                            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold backdrop-blur-sm h-auto py-4"
                        >
                            <IconComponent className="w-5 h-5 mr-2" />
                            {item.label}
                        </Button>
                    );
                })}
            </div>
        </motion.div>
    );
}