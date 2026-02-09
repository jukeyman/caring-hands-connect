import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardCharts({ revenueData, clientGrowthData }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Revenue Trend */}
            <Card className="border-2">
                <CardHeader>
                    <CardTitle className="text-[#1e3a5f]">Revenue Trend</CardTitle>
                    <p className="text-sm text-gray-600">Last 12 months</p>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                                dataKey="month" 
                                stroke="#6b7280"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis 
                                stroke="#6b7280"
                                style={{ fontSize: '12px' }}
                                tickFormatter={(value) => `$${value/1000}k`}
                            />
                            <Tooltip 
                                formatter={(value) => `$${value.toLocaleString()}`}
                                contentStyle={{ 
                                    backgroundColor: '#fff', 
                                    border: '2px solid #4a90e2',
                                    borderRadius: '8px'
                                }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="revenue" 
                                stroke="#4a90e2" 
                                strokeWidth={3}
                                dot={{ fill: '#4a90e2', r: 5 }}
                                activeDot={{ r: 7 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Client Growth */}
            <Card className="border-2">
                <CardHeader>
                    <CardTitle className="text-[#1e3a5f]">Client Growth</CardTitle>
                    <p className="text-sm text-gray-600">Last 12 months</p>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={clientGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis 
                                dataKey="month" 
                                stroke="#6b7280"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis 
                                stroke="#6b7280"
                                style={{ fontSize: '12px' }}
                            />
                            <Tooltip 
                                formatter={(value) => `${value} clients`}
                                contentStyle={{ 
                                    backgroundColor: '#fff', 
                                    border: '2px solid #22c55e',
                                    borderRadius: '8px'
                                }}
                            />
                            <Bar 
                                dataKey="clients" 
                                fill="#22c55e"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}