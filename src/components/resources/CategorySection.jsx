import React from 'react';
import { motion } from 'framer-motion';
import ResourceCard from './ResourceCard';

export default function CategorySection({ icon: Icon, title, articles, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * index }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1e3a5f]">{title}</h3>
            </div>
            <div className="space-y-4">
                {articles.map((article, i) => (
                    <ResourceCard key={i} {...article} />
                ))}
            </div>
        </motion.div>
    );
}