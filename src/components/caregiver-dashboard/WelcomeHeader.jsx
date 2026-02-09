import React from 'react';
import { Clock, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WelcomeHeader({ caregiverName, stats }) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] text-white rounded-2xl p-6 mb-6"
        >
            <h1 className="text-2xl font-bold mb-6">
                {getGreeting()}, {caregiverName}!
            </h1>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{stats?.todayVisits || 0}</p>
                    <p className="text-xs text-gray-200">Today's Visits</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <Calendar className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{stats?.weekHours || 0}</p>
                    <p className="text-xs text-gray-200">This Week</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{stats?.monthHours || 0}</p>
                    <p className="text-xs text-gray-200">This Month</p>
                </div>
            </div>
        </motion.div>
    );
}