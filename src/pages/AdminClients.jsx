import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import ClientListTable from '../components/admin/ClientListTable';
import ClientFilters from '../components/admin/ClientFilters';
import QuickActionsBar from '../components/admin/QuickActionsBar';
import ClientDetailModal from '../components/admin/ClientDetailModal';

export default function AdminClients() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        status: 'all',
        lead_source: 'all',
        service_area: 'all'
    });
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedClients, setSelectedClients] = useState([]);

    // Fetch user and verify admin
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = await base44.auth.me();
                if (!currentUser) {
                    base44.auth.redirectToLogin(window.location.pathname);
                    return;
                }

                if (currentUser.role !== 'admin') {
                    toast.error('Access denied. Admin only.');
                    return;
                }

                setUser(currentUser);
            } catch (error) {
                toast.error('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Fetch all clients
    const { data: allClients = [] } = useQuery({
        queryKey: ['allClients'],
        queryFn: async () => {
            const clients = await base44.entities.Client.list('-created_date', 200);
            
            // Enrich with care plan and caregiver data
            return await Promise.all(clients.map(async (client) => {
                // Get active care plan
                const carePlans = await base44.entities.Care_Plan.filter({
                    client_id: client.id,
                    status: 'Active'
                });
                const activePlan = carePlans[0];

                // Get primary caregiver
                let primaryCaregiver = 'Unassigned';
                if (activePlan?.primary_caregiver_id) {
                    const caregivers = await base44.entities.Caregiver.filter({
                        id: activePlan.primary_caregiver_id
                    });
                    if (caregivers[0]) {
                        primaryCaregiver = `${caregivers[0].first_name} ${caregivers[0].last_name}`;
                    }
                }

                return {
                    ...client,
                    care_plan_type: activePlan?.care_type || 'Not Set',
                    hours_per_week: activePlan?.hours_per_week || 0,
                    monthly_value: activePlan?.monthly_cost || 0,
                    primary_caregiver: primaryCaregiver
                };
            }));
        },
        enabled: !!user
    });

    // Filter and search clients
    const filteredClients = allClients.filter(client => {
        // Status filter
        if (filters.status !== 'all' && client.status !== filters.status) return false;
        
        // Lead source filter
        if (filters.lead_source !== 'all' && client.lead_source !== filters.lead_source) return false;
        
        // Service area filter
        if (filters.service_area !== 'all' && client.address_city !== filters.service_area) return false;
        
        // Search
        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            return (
                client.first_name?.toLowerCase().includes(search) ||
                client.last_name?.toLowerCase().includes(search) ||
                client.phone?.includes(search) ||
                client.email?.toLowerCase().includes(search) ||
                client.address_zip?.includes(search)
            );
        }
        
        return true;
    });

    // Fetch data for selected client detail view
    const { data: clientVisits = [] } = useQuery({
        queryKey: ['clientVisits', selectedClient?.id],
        queryFn: async () => {
            const visits = await base44.entities.Visit.filter({ 
                client_id: selectedClient.id 
            }, '-visit_date', 50);
            
            return await Promise.all(visits.map(async (visit) => {
                const caregivers = await base44.entities.Caregiver.filter({ id: visit.caregiver_id });
                return {
                    ...visit,
                    caregiver_name: caregivers[0] ? `${caregivers[0].first_name} ${caregivers[0].last_name}` : 'Caregiver'
                };
            }));
        },
        enabled: !!selectedClient
    });

    const { data: clientInvoices = [] } = useQuery({
        queryKey: ['clientInvoices', selectedClient?.id],
        queryFn: () => base44.entities.Invoice.filter({ 
            client_id: selectedClient.id 
        }, '-invoice_date', 50),
        enabled: !!selectedClient
    });

    const { data: clientMessages = [] } = useQuery({
        queryKey: ['clientMessages', selectedClient?.id],
        queryFn: async () => {
            const conversations = await base44.entities.Conversation.filter({ 
                client_id: selectedClient.id 
            });
            if (conversations.length === 0) return [];
            
            const messages = await base44.entities.Message.filter({ 
                conversation_id: conversations[0].id 
            }, '-created_date', 20);
            return messages;
        },
        enabled: !!selectedClient
    });

    // Mock data for tabs
    const mockDocuments = [
        { name: 'Service Agreement.pdf', date: 'Jan 5, 2024' },
        { name: 'Care Plan.pdf', date: 'Jan 5, 2024' }
    ];

    const mockActivityLog = [
        { action: 'Care plan updated', details: 'Increased hours from 20 to 24/week', timestamp: new Date(), user: 'Admin' },
        { action: 'Status changed', details: 'Changed from Inquiry to Active', timestamp: new Date(), user: 'Admin' }
    ];

    const handleViewDetails = (client) => {
        setSelectedClient(client);
    };

    const handleEdit = (client) => {
        toast.info('Edit client coming soon');
    };

    const handleMessage = (client) => {
        toast.info('Message client coming soon');
    };

    const handleAddNew = () => {
        toast.info('Add new client form coming soon');
    };

    const handleImport = () => {
        toast.info('CSV import coming soon');
    };

    const handleExport = () => {
        toast.info('Export to CSV coming soon');
    };

    const handleBulkEmail = () => {
        toast.info('Bulk email coming soon');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#4a90e2] animate-spin" />
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
                    <p className="text-gray-600">This page is only accessible to administrators.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] py-6 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="w-8 h-8 text-[#4a90e2]" />
                        <h1 className="text-3xl font-bold text-[#1e3a5f]">Client Management</h1>
                    </div>
                    <p className="text-gray-600">{filteredClients.length} clients total</p>
                </div>

                {/* Quick Actions */}
                <QuickActionsBar
                    selectedCount={selectedClients.length}
                    onAddNew={handleAddNew}
                    onImport={handleImport}
                    onExport={handleExport}
                    onBulkEmail={handleBulkEmail}
                />

                {/* Filters */}
                <ClientFilters
                    filters={filters}
                    onFilterChange={setFilters}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />

                {/* Client Table */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle className="text-[#1e3a5f]">All Clients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ClientListTable
                            clients={filteredClients}
                            onViewDetails={handleViewDetails}
                            onEdit={handleEdit}
                            onMessage={handleMessage}
                        />
                    </CardContent>
                </Card>

                {/* Client Detail Modal */}
                <ClientDetailModal
                    open={!!selectedClient}
                    onClose={() => setSelectedClient(null)}
                    client={selectedClient}
                    visits={clientVisits}
                    invoices={clientInvoices}
                    documents={mockDocuments}
                    messages={clientMessages}
                    activityLog={mockActivityLog}
                />
            </div>
        </div>
    );
}