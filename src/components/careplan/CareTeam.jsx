import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, User, MessageSquare, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';

export default function CareTeam({ caregivers, onMessage }) {
    const primaryCaregiver = caregivers?.[0];
    const backupCaregiver = caregivers?.[1];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Your Care Team
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Primary Caregiver */}
                {primaryCaregiver && (
                    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 border-2 border-[#4a90e2]">
                        <div className="flex items-center gap-4 mb-4">
                            {primaryCaregiver.profile_photo ? (
                                <img 
                                    src={primaryCaregiver.profile_photo}
                                    alt={primaryCaregiver.first_name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center">
                                    <User className="w-8 h-8 text-white" />
                                </div>
                            )}
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-[#1e3a5f]">
                                    {primaryCaregiver.first_name} {primaryCaregiver.last_name.charAt(0)}.
                                </h3>
                                <Badge className="bg-[#d4af37] text-[#1e3a5f] mb-2">
                                    Primary Caregiver
                                </Badge>
                                <p className="text-sm text-gray-600">
                                    {primaryCaregiver.available_weekdays && 'Mon-Fri'}
                                    {primaryCaregiver.available_weekdays && primaryCaregiver.available_weekends && ', '}
                                    {primaryCaregiver.available_weekends && 'Weekends'}
                                </p>
                            </div>
                        </div>
                        <Link to={createPageUrl('CaregiverProfile') + '?id=' + primaryCaregiver.id}>
                            <Button className="w-full bg-[#4a90e2] hover:bg-[#1e3a5f]">
                                <Eye className="w-4 h-4 mr-2" />
                                View Profile
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Backup Caregiver */}
                {backupCaregiver && (
                    <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                        <div className="flex items-center gap-4 mb-4">
                            {backupCaregiver.profile_photo ? (
                                <img 
                                    src={backupCaregiver.profile_photo}
                                    alt={backupCaregiver.first_name}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                                    <User className="w-7 h-7 text-white" />
                                </div>
                            )}
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-[#1e3a5f]">
                                    {backupCaregiver.first_name} {backupCaregiver.last_name.charAt(0)}.
                                </h3>
                                <Badge variant="outline" className="mb-2">
                                    Backup Caregiver
                                </Badge>
                                <p className="text-sm text-gray-600">
                                    {backupCaregiver.available_weekends && 'Weekends'}
                                    {backupCaregiver.available_weekends && backupCaregiver.available_overnights && ', '}
                                    {backupCaregiver.available_overnights && 'Evenings'}
                                </p>
                            </div>
                        </div>
                        <Link to={createPageUrl('CaregiverProfile') + '?id=' + backupCaregiver.id}>
                            <Button variant="outline" className="w-full border-[#4a90e2] text-[#4a90e2]">
                                <Eye className="w-4 h-4 mr-2" />
                                View Profile
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Care Coordinator */}
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center">
                            <User className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-[#1e3a5f]">
                                Sarah Johnson, RN
                            </h3>
                            <Badge variant="outline" className="border-[#d4af37] text-[#d4af37]">
                                Care Coordinator
                            </Badge>
                        </div>
                    </div>
                    <Button 
                        onClick={onMessage}
                        variant="outline" 
                        className="w-full border-[#4a90e2] text-[#4a90e2] hover:bg-[#4a90e2] hover:text-white"
                    >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message Sarah
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}