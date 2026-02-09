import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download, Mail } from 'lucide-react';

export default function QuickActionsBar({ selectedCount, onAddNew, onImport, onExport, onBulkEmail }) {
    return (
        <div className="bg-white rounded-lg border-2 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
                <Button
                    onClick={onAddNew}
                    className="bg-[#4a90e2] hover:bg-[#1e3a5f]"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Client
                </Button>
                
                <Button
                    onClick={onImport}
                    variant="outline"
                    className="border-[#4a90e2] text-[#4a90e2]"
                >
                    <Upload className="w-4 h-4 mr-2" />
                    Import CSV
                </Button>

                <Button
                    onClick={onExport}
                    variant="outline"
                >
                    <Download className="w-4 h-4 mr-2" />
                    Export Client List
                </Button>

                {selectedCount > 0 && (
                    <Button
                        onClick={onBulkEmail}
                        variant="outline"
                        className="border-purple-600 text-purple-700"
                    >
                        <Mail className="w-4 h-4 mr-2" />
                        Bulk Email ({selectedCount} selected)
                    </Button>
                )}

                <div className="ml-auto text-sm text-gray-600">
                    {selectedCount > 0 && `${selectedCount} selected`}
                </div>
            </div>
        </div>
    );
}