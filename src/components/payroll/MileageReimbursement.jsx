import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function MileageReimbursement({ mileageData, onAddEntry }) {
    const [showNewEntry, setShowNewEntry] = useState(false);
    const [formData, setFormData] = useState({
        date: format(new Date(), 'yyyy-MM-dd'),
        from: '',
        to: '',
        miles: ''
    });

    const handleSubmit = () => {
        if (!formData.from || !formData.to || !formData.miles) {
            toast.error('Please fill in all fields');
            return;
        }

        onAddEntry(formData);
        setShowNewEntry(false);
        setFormData({ date: format(new Date(), 'yyyy-MM-dd'), from: '', to: '', miles: '' });
        toast.success('Mileage entry added');
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                        <Car className="w-5 h-5" />
                        Mileage Reimbursement
                    </CardTitle>
                    <Button
                        size="sm"
                        onClick={() => setShowNewEntry(true)}
                        className="bg-[#4a90e2] hover:bg-[#1e3a5f]"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Entry
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {/* Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Miles Driven</p>
                        <p className="text-2xl font-bold text-[#1e3a5f]">{mileageData.total_miles}</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Rate</p>
                        <p className="text-2xl font-bold text-[#1e3a5f]">${mileageData.rate}/mi</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Reimbursement</p>
                        <p className="text-2xl font-bold text-green-700">${mileageData.reimbursement.toFixed(2)}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Status</p>
                        <p className="text-sm font-semibold text-purple-700">{mileageData.status}</p>
                    </div>
                </div>

                {/* Mileage Log */}
                <h3 className="font-bold text-[#1e3a5f] mb-3">Mileage Log</h3>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>From</TableHead>
                                <TableHead>To</TableHead>
                                <TableHead className="text-right">Miles</TableHead>
                                <TableHead className="text-right">Reimbursement</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mileageData.entries.map((entry, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {format(new Date(entry.date), 'MMM d')}
                                    </TableCell>
                                    <TableCell>{entry.from}</TableCell>
                                    <TableCell>{entry.to}</TableCell>
                                    <TableCell className="text-right">{entry.miles} mi</TableCell>
                                    <TableCell className="text-right font-semibold text-green-700">
                                        ${entry.reimbursement.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* New Entry Modal */}
                <Dialog open={showNewEntry} onOpenChange={setShowNewEntry}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-[#1e3a5f]">Add Mileage Entry</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                            <div>
                                <Label className="mb-2 block">Date *</Label>
                                <Input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                />
                            </div>
                            <div>
                                <Label className="mb-2 block">From Location *</Label>
                                <Input
                                    placeholder="e.g., Home, Office"
                                    value={formData.from}
                                    onChange={(e) => setFormData({...formData, from: e.target.value})}
                                />
                            </div>
                            <div>
                                <Label className="mb-2 block">To Location *</Label>
                                <Input
                                    placeholder="e.g., Client Name"
                                    value={formData.to}
                                    onChange={(e) => setFormData({...formData, to: e.target.value})}
                                />
                            </div>
                            <div>
                                <Label className="mb-2 block">Miles Driven *</Label>
                                <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="e.g., 14.5"
                                    value={formData.miles}
                                    onChange={(e) => setFormData({...formData, miles: e.target.value})}
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowNewEntry(false)}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    className="flex-1 bg-[#4a90e2] hover:bg-[#1e3a5f]"
                                >
                                    Add Entry
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}