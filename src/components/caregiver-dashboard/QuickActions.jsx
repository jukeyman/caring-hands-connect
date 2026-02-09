import React from 'react';
import { Clock, Calendar, ClipboardList, MessageSquare, Award, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuickActions({ onAction }) {
    const actions = [
        { icon: Clock, label: 'Clock In/Out', action: 'clock', color: 'from-green-500 to-green-600' },
        { icon: Calendar, label: 'My Schedule', action: 'schedule', color: 'from-blue-500 to-blue-600' },
        { icon: ClipboardList, label: 'Submit Visit Notes', action: 'notes', color: 'from-purple-500 to-purple-600' },
        { icon: MessageSquare, label: 'Messages', action: 'messages', color: 'from-indigo-500 to-indigo-600' },
        { icon: Award, label: 'My Certifications', action: 'certifications', color: 'from-amber-500 to-amber-600' },
        { icon: Wallet, label: 'Payroll & Hours', action: 'payroll', color: 'from-emerald-500 to-emerald-600' }
    ];

    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-[#1e3a5f] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-3 gap-4">
                {actions.map((item, index) => (
                    <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onAction(item.action)}
                        className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                    >
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                            <item.icon className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-center text-[#1e3a5f] leading-tight">
                            {item.label}
                        </span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}