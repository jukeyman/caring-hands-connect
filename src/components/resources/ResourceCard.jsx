import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResourceCard({ title, excerpt, readTime, link }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 group"
        >
            <h4 className="font-bold text-[#1e3a5f] mb-3 group-hover:text-[#4a90e2] transition-colors">
                {title}
            </h4>
            <p className="text-sm text-[#2d3436] mb-4 leading-relaxed">
                {excerpt}
            </p>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Clock className="w-4 h-4" />
                    <span>{readTime} min read</span>
                </div>
                <Link to={link} className="text-[#4a90e2] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all hover:text-[#1e3a5f]">
                    Read More <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
}