import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle, ChevronDown, ChevronUp, User, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function ActiveCarePlan({ carePlan, onAdjust }) {
    const [isOpen, setIsOpen] = useState(true);

    if (!carePlan) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-[#1e3a5f]">Your Current Care Plan</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-8">
                    <p className="text-gray-600 mb-4">No active care plan</p>
                    <Button className="bg-[#4a90e2] hover:bg-[#1e3a5f]">
                        Create Care Plan
                    </Button>
                </CardContent>
            </Card>
        );
    }

    const services = [
        { name: "Personal Care (ADLs)", included: carePlan.tasks_adls },
        { name: "Medication Management", included: carePlan.tasks_medication },
        { name: "Meal Preparation", included: carePlan.tasks_meal_prep },
        { name: "Light Housekeeping", included: carePlan.tasks_housekeeping },
        { name: "Transportation", included: carePlan.tasks_transportation },
        { name: "Companionship", included: carePlan.tasks_companionship },
        { name: "Errands & Shopping", included: carePlan.tasks_errands }
    ];

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-[#1e3a5f]">Your Current Care Plan</CardTitle>
                    <Badge className="bg-green-100 text-green-800">
                        {carePlan.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <div className="space-y-4">
                        {/* Summary */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600 mb-1">Hours per Week</p>
                                <p className="text-2xl font-bold text-[#1e3a5f]">{carePlan.hours_per_week} hours</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600 mb-1">Schedule Type</p>
                                <p className="text-lg font-semibold text-[#1e3a5f]">{carePlan.schedule_type}</p>
                            </div>
                        </div>

                        {/* Preferred Schedule */}
                        {(carePlan.preferred_days || carePlan.preferred_times) && (
                            <div className="bg-blue-50 rounded-lg p-4">
                                <p className="text-sm font-semibold text-[#1e3a5f] mb-2">Preferred Schedule:</p>
                                {carePlan.preferred_days && (
                                    <p className="text-sm text-gray-700">Days: {carePlan.preferred_days}</p>
                                )}
                                {carePlan.preferred_times && (
                                    <p className="text-sm text-gray-700">Times: {carePlan.preferred_times}</p>
                                )}
                            </div>
                        )}

                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full text-[#4a90e2] hover:text-[#1e3a5f]">
                                {isOpen ? (
                                    <>View Less <ChevronUp className="w-4 h-4 ml-2" /></>
                                ) : (
                                    <>View Details <ChevronDown className="w-4 h-4 ml-2" /></>
                                )}
                            </Button>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="space-y-4">
                            {/* Services Included */}
                            <div>
                                <p className="font-semibold text-[#1e3a5f] mb-3">Services Included:</p>
                                <div className="grid gap-2">
                                    {services.filter(s => s.included).map((service, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            <span className="text-gray-700">{service.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Caregivers */}
                            <div className="border-t pt-4">
                                <p className="font-semibold text-[#1e3a5f] mb-3">Care Team:</p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center">
                                            <User className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-[#1e3a5f]">Primary Caregiver Name</p>
                                            <p className="text-sm text-gray-600">View Profile</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                                            <User className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-[#1e3a5f]">Backup Caregiver Name</p>
                                            <p className="text-sm text-gray-600">View Profile</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Start Date */}
                            <div className="border-t pt-4">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Calendar className="w-4 h-4 text-[#4a90e2]" />
                                    <span className="text-sm">
                                        Start Date: {format(new Date(carePlan.start_date), 'MMMM d, yyyy')}
                                    </span>
                                </div>
                            </div>
                        </CollapsibleContent>

                        <Button 
                            onClick={onAdjust}
                            variant="outline" 
                            className="w-full border-[#4a90e2] text-[#4a90e2] hover:bg-[#4a90e2] hover:text-white"
                        >
                            Request Care Plan Adjustment
                        </Button>
                    </div>
                </Collapsible>
            </CardContent>
        </Card>
    );
}