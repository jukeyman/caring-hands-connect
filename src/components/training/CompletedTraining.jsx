import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, Award } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function CompletedTraining({ courses }) {
    const handleDownload = (course) => {
        toast.info('Certificate download coming soon');
    };

    if (!courses || courses.length === 0) {
        return null;
    }

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Completed Training
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {courses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-200">
                        <div className="flex items-center gap-3 flex-1">
                            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                            <div>
                                <p className="font-bold text-[#1e3a5f]">{course.title}</p>
                                <p className="text-sm text-gray-600">
                                    Completed: {format(new Date(course.completed_date), 'MMMM d, yyyy')}
                                </p>
                                {course.score && (
                                    <p className="text-sm font-semibold text-green-700">
                                        Score: {course.score}%
                                    </p>
                                )}
                            </div>
                        </div>
                        <Button
                            size="sm"
                            onClick={() => handleDownload(course)}
                            variant="outline"
                            className="border-green-600 text-green-700 hover:bg-green-100"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Certificate
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}