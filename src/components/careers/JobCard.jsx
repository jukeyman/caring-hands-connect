import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JobCard({ job, onApply, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * index }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-[#d4af37]"
        >
            <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">{job.title}</h3>
            
            <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-[#2d3436]">
                    <MapPin className="w-5 h-5 text-[#4a90e2]" />
                    <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#2d3436]">
                    <DollarSign className="w-5 h-5 text-[#4a90e2]" />
                    <span className="font-semibold text-[#1e3a5f]">{job.pay}</span>
                </div>
            </div>

            <div className="mb-6">
                <h4 className="font-bold text-[#1e3a5f] mb-3">Requirements:</h4>
                <ul className="space-y-2">
                    {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#2d3436]">
                            <CheckCircle className="w-4 h-4 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                            <span>{req}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <a href={job.applyUrl || "https://www.clearcareonline.com/apply"} target="_blank" rel="noopener noreferrer">
                <Button 
                    className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f] font-bold"
                >
                    Apply Now
                </Button>
            </a>
        </motion.div>
    );
}