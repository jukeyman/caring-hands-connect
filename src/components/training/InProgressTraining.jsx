import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Play, Clock } from 'lucide-react';

export default function InProgressTraining({ courses, onResume }) {
    if (!courses || courses.length === 0) {
        return null;
    }

    return (
        <Card className="mb-6 border-2 border-[#4a90e2]">
            <CardHeader className="bg-blue-50">
                <CardTitle className="text-[#1e3a5f]">Continue Your Training</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
                {courses.map((course, index) => (
                    <Card key={index} className="border-2">
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="font-bold text-[#1e3a5f] text-lg flex-1">
                                    {course.title}
                                </h3>
                                <span className="text-sm font-semibold text-[#4a90e2]">
                                    {course.progress}% complete
                                </span>
                            </div>

                            <Progress value={course.progress} className="mb-4" />

                            {/* Modules */}
                            <div className="space-y-2 mb-4">
                                {course.modules.map((module, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm">
                                        {module.completed ? (
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                        ) : module.current ? (
                                            <div className="w-4 h-4 rounded-full border-2 border-[#4a90e2] bg-[#4a90e2]/20" />
                                        ) : (
                                            <Circle className="w-4 h-4 text-gray-400" />
                                        )}
                                        <span className={
                                            module.completed 
                                                ? 'text-green-700 line-through' 
                                                : module.current 
                                                    ? 'font-semibold text-[#1e3a5f]'
                                                    : 'text-gray-600'
                                        }>
                                            {module.title}
                                        </span>
                                        {module.current && (
                                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                                                Current
                                            </Badge>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                <Clock className="w-4 h-4" />
                                <span>Estimated time remaining: {course.time_remaining}</span>
                            </div>

                            <Button
                                onClick={() => onResume(course)}
                                className="w-full bg-[#4a90e2] hover:bg-[#1e3a5f] font-semibold py-6"
                            >
                                <Play className="w-5 h-5 mr-2" />
                                Resume Course
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    );
}