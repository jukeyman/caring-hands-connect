import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from 'lucide-react';

export default function ClientFilters({ filters, onFilterChange, searchTerm, onSearchChange }) {
    return (
        <div className="bg-white rounded-lg border-2 p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="lg:col-span-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search by name, phone, email, or zip..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Status Filter */}
                <div>
                    <Select
                        value={filters.status}
                        onValueChange={(value) => onFilterChange({ ...filters, status: value })}
                    >
                        <SelectTrigger>
                            <Filter className="w-4 h-4 mr-2" />
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Paused">Paused</SelectItem>
                            <SelectItem value="Inquiry">Inquiry</SelectItem>
                            <SelectItem value="Discharged">Discharged</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Lead Source Filter */}
                <div>
                    <Select
                        value={filters.lead_source}
                        onValueChange={(value) => onFilterChange({ ...filters, lead_source: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Lead Source" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Sources</SelectItem>
                            <SelectItem value="Website">Website</SelectItem>
                            <SelectItem value="Referral">Referral</SelectItem>
                            <SelectItem value="Google Ads">Google Ads</SelectItem>
                            <SelectItem value="Facebook">Facebook</SelectItem>
                            <SelectItem value="Hospital">Hospital</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Service Area Filter */}
                <div>
                    <Select
                        value={filters.service_area}
                        onValueChange={(value) => onFilterChange({ ...filters, service_area: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Service Area" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Areas</SelectItem>
                            <SelectItem value="Austin">Austin</SelectItem>
                            <SelectItem value="Round Rock">Round Rock</SelectItem>
                            <SelectItem value="Cedar Park">Cedar Park</SelectItem>
                            <SelectItem value="Georgetown">Georgetown</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}