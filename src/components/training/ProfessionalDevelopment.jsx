import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Star, Briefcase, DollarSign, BookOpen } from 'lucide-react';

export default function ProfessionalDevelopment({ tracks, onStartTrack }) {
    const trackIcons = {
        'Dementia Care Specialist': Star,
        'Medication Management Expert': Briefcase,
        'Live-In Care Certified': TrendingUp
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Enhance Your Skills</CardTitle>
                <p className="text-sm text-gray-600">
                    Optional courses to increase your expertise (and pay!)
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                {tracks.map((track, index) => {
                    const Icon = trackIcons[track.name] || Star;
                    
                    return (
                        <Card key={index} className="border-2 border-[#d4af37] bg-gradient-to-br from-yellow-50 to-amber-50">
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[#1e3a5f] text-lg mb-2">
                                            {track.name}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <Badge className="bg-blue-100 text-blue-800">
                                                <BookOpen className="w-3 h-3 mr-1" />
                                                {track.courses_count} courses
                                            </Badge>
                                            <Badge className="bg-purple-100 text-purple-800">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {track.total_hours} hours
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Benefits */}
                                <div className="space-y-2 mb-4">
                                    {track.pay_increase && (
                                        <div className="bg-green-50 border-l-4 border-green-500 p-3">
                                            <p className="text-sm font-bold text-green-900 flex items-center gap-2">
                                                <DollarSign className="w-4 h-4" />
                                                Pay increase: {track.pay_increase}
                                            </p>
                                        </div>
                                    )}
                                    
                                    {track.badge && (
                                        <div className="bg-purple-50 border-l-4 border-purple-500 p-3">
                                            <p className="text-sm font-bold text-purple-900 flex items-center gap-2">
                                                <Star className="w-4 h-4" />
                                                Earns: {track.badge} badge
                                            </p>
                                        </div>
                                    )}

                                    {track.unlocks && (
                                        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-3">
                                            <p className="text-sm font-bold text-indigo-900">
                                                Unlocks: {track.unlocks}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Progress (if started) */}
                                {track.progress > 0 && (
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">Track Progress</span>
                                            <span className="font-semibold text-[#4a90e2]">{track.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] h-2 rounded-full"
                                                style={{ width: `${track.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <Button
                                    onClick={() => onStartTrack(track)}
                                    className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8941f] hover:from-[#b8941f] hover:to-[#9a7818] text-white font-bold"
                                >
                                    {track.progress > 0 ? 'Continue Track' : 'Start Track'}
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </CardContent>
        </Card>
    );
}