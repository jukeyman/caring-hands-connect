import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, BookOpen, Clock, TrendingUp, Filter, Play, CheckCircle } from 'lucide-react';

export default function TrainingLibrary({ courses, onStartCourse }) {
    const [filter, setFilter] = useState('all');
    const [topicFilter, setTopicFilter] = useState('all');

    const filteredCourses = courses.filter(course => {
        const statusMatch = filter === 'all' || 
            (filter === 'required' && course.required) ||
            (filter === 'optional' && !course.required) ||
            (filter === 'completed' && course.progress === 100);
        
        const topicMatch = topicFilter === 'all' || course.topic === topicFilter;
        
        return statusMatch && topicMatch;
    });

    const getCourseIcon = (type) => {
        return type === 'Video Course' ? Video : BookOpen;
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Available Training Courses</CardTitle>
                
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-full sm:w-48">
                            <Filter className="w-4 h-4 mr-2" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Courses</SelectItem>
                            <SelectItem value="required">Required</SelectItem>
                            <SelectItem value="optional">Optional</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={topicFilter} onValueChange={setTopicFilter}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Topic" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Topics</SelectItem>
                            <SelectItem value="Dementia Care">Dementia Care</SelectItem>
                            <SelectItem value="Medication Safety">Medication Safety</SelectItem>
                            <SelectItem value="Fall Prevention">Fall Prevention</SelectItem>
                            <SelectItem value="Communication">Communication Skills</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {filteredCourses.map((course, index) => {
                    const Icon = getCourseIcon(course.type);
                    const isCompleted = course.progress === 100;
                    const inProgress = course.progress > 0 && course.progress < 100;
                    
                    return (
                        <Card key={index} className="border-2 hover:border-[#4a90e2] transition-all">
                            <CardContent className="pt-6">
                                {course.required && (
                                    <Badge className="bg-red-100 text-red-800 mb-3">
                                        ⚠️ REQUIRED
                                    </Badge>
                                )}
                                
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[#1e3a5f] text-lg mb-1">
                                            {course.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{course.duration}</span>
                                            </div>
                                            <span>•</span>
                                            <span>{course.type}</span>
                                        </div>
                                    </div>
                                </div>

                                {course.certification && (
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-3">
                                        <p className="text-sm font-semibold text-blue-900">
                                            Earns: {course.certification}
                                        </p>
                                    </div>
                                )}

                                {course.pay_increase && (
                                    <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-3">
                                        <p className="text-sm font-semibold text-green-900 flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4" />
                                            {course.pay_increase} upon completion
                                        </p>
                                    </div>
                                )}

                                {course.deadline && !isCompleted && (
                                    <div className="bg-yellow-50 p-3 mb-3 rounded-lg">
                                        <p className="text-sm font-semibold text-yellow-900">
                                            Deadline: {format(new Date(course.deadline), 'MMMM d, yyyy')}
                                        </p>
                                    </div>
                                )}

                                {inProgress && (
                                    <div className="mb-3">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">Progress</span>
                                            <span className="font-semibold text-[#4a90e2]">{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-gradient-to-r from-[#4a90e2] to-[#1e3a5f] h-2 rounded-full transition-all"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <Button
                                    onClick={() => onStartCourse(course)}
                                    className={`w-full ${
                                        isCompleted 
                                            ? 'bg-green-600 hover:bg-green-700' 
                                            : inProgress
                                                ? 'bg-[#4a90e2] hover:bg-[#1e3a5f]'
                                                : 'bg-[#1e3a5f] hover:bg-[#4a90e2]'
                                    } text-white font-semibold`}
                                >
                                    {isCompleted ? (
                                        <>
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Review Course
                                        </>
                                    ) : inProgress ? (
                                        <>
                                            <Play className="w-4 h-4 mr-2" />
                                            Continue Course
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-4 h-4 mr-2" />
                                            Start Course
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </CardContent>
        </Card>
    );
}