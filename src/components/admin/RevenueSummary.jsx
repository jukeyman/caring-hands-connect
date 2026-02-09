import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, AlertCircle, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function RevenueSummary({ summary, serviceTypeData, topClientsData }) {
    const COLORS = ['#4a90e2', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

    return (
        <div className="space-y-6 mb-6">
            {/* Revenue Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-green-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3 mb-2">
                            <DollarSign className="w-8 h-8 text-green-600" />
                            <div>
                                <p className="text-sm text-gray-600">This Month</p>
                                <p className="text-3xl font-bold text-green-700">
                                    ${summary.this_month.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Clock className="w-8 h-8 text-yellow-600" />
                            <div>
                                <p className="text-sm text-gray-600">Outstanding</p>
                                <p className="text-3xl font-bold text-yellow-700">
                                    ${summary.outstanding.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2 border-red-300 bg-gradient-to-br from-red-50 to-red-100">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3 mb-2">
                            <AlertCircle className="w-8 h-8 text-red-600" />
                            <div>
                                <p className="text-sm text-gray-600">Overdue</p>
                                <p className="text-3xl font-bold text-red-700">
                                    ${summary.overdue.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue by Service Type */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle className="text-[#1e3a5f]">Revenue by Service Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={serviceTypeData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {serviceTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Top 10 Clients */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle className="text-[#1e3a5f]">Top 10 Clients by Monthly Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={topClientsData} layout="horizontal">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" tickFormatter={(value) => `$${value/1000}k`} />
                                <YAxis dataKey="name" type="category" width={100} style={{ fontSize: '12px' }} />
                                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                <Bar dataKey="value" fill="#4a90e2" radius={[0, 8, 8, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}