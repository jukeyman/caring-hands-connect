import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, MessageSquare, Calendar, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CaregiverHeader({ caregiver, onMessage, onRequest }) {
    const certBadges = [];
    if (caregiver.certifications?.includes('CPR')) certBadges.push('CPR');
    if (caregiver.certifications?.includes('First Aid')) certBadges.push('First Aid');
    if (caregiver.certifications?.includes('Dementia Care')) certBadges.push('Dementia Care');

    const firstName = caregiver.first_name;
    const lastInitial = caregiver.last_name?.charAt(0) || '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
        >
            <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Photo */}
                <div className="flex-shrink-0">
                    {caregiver.profile_photo ? (
                        <img 
                            src={caregiver.profile_photo} 
                            alt={`${firstName} ${lastInitial}.`}
                            className="w-32 h-32 rounded-full object-cover border-4 border-[#d4af37]"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center border-4 border-[#d4af37]">
                            <User className="w-16 h-16 text-white" />
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-[#1e3a5f] mb-2">
                        {firstName} {lastInitial}.
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">Certified Caregiver</p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <p className="text-sm text-gray-600">Experience</p>
                            <p className="font-semibold text-[#1e3a5f]">
                                {caregiver.years_experience || '3+'} years
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Languages</p>
                            <p className="font-semibold text-[#1e3a5f]">
                                {caregiver.languages?.join(', ') || 'English'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Availability</p>
                            <p className="font-semibold text-[#1e3a5f] text-sm">
                                {caregiver.available_weekdays && 'Weekdays'}
                                {caregiver.available_weekdays && caregiver.available_weekends && ', '}
                                {caregiver.available_weekends && 'Weekends'}
                            </p>
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {certBadges.map((cert, i) => (
                            <Badge key={i} className="bg-[#4a90e2] text-white">
                                {cert}
                            </Badge>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                        <Button 
                            onClick={onMessage}
                            className="bg-[#4a90e2] hover:bg-[#1e3a5f]"
                        >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Message {firstName}
                        </Button>
                        <Button 
                            onClick={onRequest}
                            variant="outline"
                            className="border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white"
                        >
                            <Calendar className="w-4 h-4 mr-2" />
                            Request {firstName} for Next Visit
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}