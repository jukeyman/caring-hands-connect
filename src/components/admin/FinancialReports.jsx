import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, FileText, TrendingUp } from 'lucide-react';

export default function FinancialReports({ plData, agingReport, revenueByArea, onExport }) {
    return (
        <Card className="border-2 mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Financial Reports
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="pl">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="pl">P&L Statement</TabsTrigger>
                        <TabsTrigger value="aging">Aging Report</TabsTrigger>
                        <TabsTrigger value="area">Revenue by Area</TabsTrigger>
                    </TabsList>

                    {/* P&L Statement */}
                    <TabsContent value="pl" className="mt-4">
                        <div className="flex justify-end mb-4">
                            <Button
                                onClick={() => onExport('pl')}
                                variant="outline"
                                className="border-[#4a90e2] text-[#4a90e2]"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export to CSV
                            </Button>
                        </div>
                        <Table>
                            <TableBody>
                                <TableRow className="bg-green-50">
                                    <TableCell className="font-bold">Revenue</TableCell>
                                    <TableCell className="text-right font-bold text-green-700">
                                        ${plData.revenue.toLocaleString()}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-8">Service Revenue</TableCell>
                                    <TableCell className="text-right">${plData.service_revenue.toLocaleString()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-8">Other Income</TableCell>
                                    <TableCell className="text-right">${plData.other_income.toLocaleString()}</TableCell>
                                </TableRow>
                                
                                <TableRow className="bg-red-50">
                                    <TableCell className="font-bold">Cost of Services</TableCell>
                                    <TableCell className="text-right font-bold text-red-700">
                                        -${plData.cost_of_services.toLocaleString()}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-8">Caregiver Wages</TableCell>
                                    <TableCell className="text-right">-${plData.caregiver_wages.toLocaleString()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-8">Payroll Taxes</TableCell>
                                    <TableCell className="text-right">-${plData.payroll_taxes.toLocaleString()}</TableCell>
                                </TableRow>

                                <TableRow className="bg-blue-50 border-t-2">
                                    <TableCell className="font-bold text-lg">Gross Profit</TableCell>
                                    <TableCell className="text-right font-bold text-lg text-blue-700">
                                        ${plData.gross_profit.toLocaleString()}
                                    </TableCell>
                                </TableRow>

                                <TableRow className="bg-gray-50">
                                    <TableCell className="font-bold">Operating Expenses</TableCell>
                                    <TableCell className="text-right font-bold text-red-700">
                                        -${plData.operating_expenses.toLocaleString()}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-8">Marketing</TableCell>
                                    <TableCell className="text-right">-${plData.marketing.toLocaleString()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-8">Administrative</TableCell>
                                    <TableCell className="text-right">-${plData.administrative.toLocaleString()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="pl-8">Insurance</TableCell>
                                    <TableCell className="text-right">-${plData.insurance.toLocaleString()}</TableCell>
                                </TableRow>

                                <TableRow className="bg-[#1e3a5f] text-white border-t-4">
                                    <TableCell className="font-bold text-xl">Net Profit</TableCell>
                                    <TableCell className="text-right font-bold text-2xl">
                                        ${plData.net_profit.toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TabsContent>

                    {/* Aging Report */}
                    <TabsContent value="aging" className="mt-4">
                        <div className="flex justify-end mb-4">
                            <Button
                                onClick={() => onExport('aging')}
                                variant="outline"
                                className="border-[#4a90e2] text-[#4a90e2]"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export to CSV
                            </Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Client</TableHead>
                                    <TableHead className="text-right">Current</TableHead>
                                    <TableHead className="text-right">30 Days</TableHead>
                                    <TableHead className="text-right">60 Days</TableHead>
                                    <TableHead className="text-right">90+ Days</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {agingReport.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-semibold text-[#1e3a5f]">{item.client_name}</TableCell>
                                        <TableCell className="text-right">${item.current.toLocaleString()}</TableCell>
                                        <TableCell className="text-right text-yellow-700">${item.days_30.toLocaleString()}</TableCell>
                                        <TableCell className="text-right text-orange-700">${item.days_60.toLocaleString()}</TableCell>
                                        <TableCell className="text-right text-red-700 font-bold">${item.days_90.toLocaleString()}</TableCell>
                                        <TableCell className="text-right font-bold">${item.total.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow className="bg-gray-100 font-bold">
                                    <TableCell>TOTAL</TableCell>
                                    <TableCell className="text-right">
                                        ${agingReport.reduce((sum, i) => sum + i.current, 0).toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ${agingReport.reduce((sum, i) => sum + i.days_30, 0).toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ${agingReport.reduce((sum, i) => sum + i.days_60, 0).toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ${agingReport.reduce((sum, i) => sum + i.days_90, 0).toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ${agingReport.reduce((sum, i) => sum + i.total, 0).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TabsContent>

                    {/* Revenue by Service Area */}
                    <TabsContent value="area" className="mt-4">
                        <div className="flex justify-end mb-4">
                            <Button
                                onClick={() => onExport('area')}
                                variant="outline"
                                className="border-[#4a90e2] text-[#4a90e2]"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export to PDF
                            </Button>
                        </div>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={revenueByArea}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="area" />
                                <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                <Bar dataKey="revenue" fill="#4a90e2" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}