import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Heart } from 'lucide-react';

export default function ServicesIncluded({ carePlan, onRequestChange }) {
    const allServices = [
        {
            name: 'Personal Care (ADLs)',
            description: 'Bathing, dressing, grooming, toileting, mobility assistance',
            field: 'tasks_adls'
        },
        {
            name: 'Medication Management',
            description: 'Reminders, administration, tracking, pharmacy coordination',
            field: 'tasks_medication'
        },
        {
            name: 'Meal Preparation',
            description: 'Planning, cooking, feeding assistance, dietary accommodations',
            field: 'tasks_meal_prep'
        },
        {
            name: 'Light Housekeeping',
            description: 'Dishes, laundry, tidying living spaces',
            field: 'tasks_housekeeping'
        },
        {
            name: 'Companionship',
            description: 'Conversation, activities, emotional support',
            field: 'tasks_companionship'
        },
        {
            name: 'Transportation',
            description: 'Doctor appointments, errands, social outings',
            field: 'tasks_transportation'
        },
        {
            name: 'Errands & Shopping',
            description: 'Grocery shopping, pharmacy pickup, personal errands',
            field: 'tasks_errands'
        }
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Services Included in Your Plan
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {allServices.map((service, index) => {
                    const isIncluded = carePlan?.[service.field] || false;
                    
                    return (
                        <div 
                            key={index}
                            className={`p-4 rounded-lg border-2 transition-all ${
                                isIncluded 
                                    ? 'bg-green-50 border-green-200' 
                                    : 'bg-gray-50 border-gray-200'
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                {isIncluded ? (
                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                ) : (
                                    <XCircle className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" />
                                )}
                                <div className="flex-1">
                                    <p className={`font-semibold mb-1 ${
                                        isIncluded ? 'text-[#1e3a5f]' : 'text-gray-600'
                                    }`}>
                                        {service.name}
                                    </p>
                                    <p className={`text-sm ${
                                        isIncluded ? 'text-gray-700' : 'text-gray-500'
                                    }`}>
                                        {service.description}
                                    </p>
                                    {!isIncluded && (
                                        <p className="text-xs text-gray-500 mt-1 italic">
                                            NOT currently included
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                <Button 
                    onClick={onRequestChange}
                    variant="outline"
                    className="w-full border-[#4a90e2] text-[#4a90e2] hover:bg-[#4a90e2] hover:text-white mt-4"
                >
                    Request Service Addition/Removal
                </Button>
            </CardContent>
        </Card>
    );
}