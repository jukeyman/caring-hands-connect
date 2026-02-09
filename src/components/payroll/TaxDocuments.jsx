import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function TaxDocuments({ documents }) {
    const handleDownload = (doc) => {
        toast.info('Document download coming soon');
    };

    if (!documents || documents.length === 0) {
        return (
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Tax Documents
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center py-12 text-gray-500">
                    Tax documents will be available after year-end
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Tax Documents
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                        <div className="flex items-center gap-3">
                            <FileText className="w-6 h-6 text-[#4a90e2]" />
                            <div>
                                <p className="font-semibold text-[#1e3a5f]">{doc.name}</p>
                                <p className="text-sm text-gray-600">{doc.year}</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => handleDownload(doc)}
                            className="bg-[#4a90e2] hover:bg-[#1e3a5f]"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}