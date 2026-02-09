import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Users, CheckCircle } from 'lucide-react';

export default function EmergencyContacts({ contacts, onUpdate }) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-[#1e3a5f] flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Emergency Contacts on File
                    </CardTitle>
                    <Button 
                        size="sm"
                        variant="outline"
                        onClick={onUpdate}
                        className="border-[#4a90e2] text-[#4a90e2]"
                    >
                        Update Contacts
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {contacts?.length === 0 ? (
                    <p className="text-gray-600">No emergency contacts on file</p>
                ) : (
                    contacts?.map((contact, index) => (
                        <div 
                            key={index}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border-2 border-gray-200"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-[#1e3a5f]">
                                            {contact.first_name} {contact.last_name}
                                        </h3>
                                        {contact.is_primary_contact && (
                                            <Badge className="bg-[#d4af37] text-[#1e3a5f]">
                                                Primary
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600">{contact.relationship}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="w-4 h-4 text-[#4a90e2]" />
                                    <a href={`tel:${contact.phone}`} className="text-[#4a90e2] hover:underline">
                                        {contact.phone}
                                    </a>
                                </div>
                                {contact.email && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail className="w-4 h-4 text-[#4a90e2]" />
                                        <a href={`mailto:${contact.email}`} className="text-[#4a90e2] hover:underline">
                                            {contact.email}
                                        </a>
                                    </div>
                                )}
                            </div>

                            {contact.can_authorize_services && (
                                <div className="mt-3 pt-3 border-t flex items-center gap-2 text-sm text-green-700">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Can Authorize Services</span>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}