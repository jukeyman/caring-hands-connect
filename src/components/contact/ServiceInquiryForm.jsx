import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { base44 } from '@/api/base44Client';
import { CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function ServiceInquiryForm() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        services_interested: [],
        specific_needs: '',
        status: 'New'
    });

    const [errors, setErrors] = useState({});

    const services = [
        { id: 'live-in', label: 'Live-In Care', value: 'Live-In Care' },
        { id: 'hourly', label: '20+ Hours Weekly', value: '20+ Hours Weekly' },
        { id: 'companionship', label: 'Companionship Care', value: 'Companionship Care' },
        { id: 'personal', label: 'Personal Care (ADLs)', value: 'Personal Care (ADLs)' },
        { id: 'medication', label: 'Medication Management', value: 'Medication Management' },
        { id: 'meals', label: 'Meal Planning & Prep', value: 'Meal Planning & Prep' },
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
        if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Phone must be 10 digits';
        }

        if (formData.services_interested.length === 0) {
            newErrors.services = 'Please select at least one service';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleServiceToggle = (service) => {
        setFormData(prev => ({
            ...prev,
            services_interested: prev.services_interested.includes(service)
                ? prev.services_interested.filter(s => s !== service)
                : [...prev.services_interested, service]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setLoading(true);

        try {
            await base44.entities.Inquiry.create({
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                phone: formData.phone,
                services_interested: formData.services_interested,
                message: formData.specific_needs,
                zip_code: '78701',
                care_needed_for: 'Other',
                urgency: 'Soon (1-4 weeks)',
                lead_source: 'Service Inquiry Form',
                status: 'New',
                inquiry_date: new Date().toISOString()
            });

            setSubmitted(true);
            toast.success('Service inquiry submitted successfully!');

            setTimeout(() => {
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    services_interested: [],
                    specific_needs: '',
                    status: 'New'
                });
                setSubmitted(false);
            }, 3000);
        } catch (error) {
            toast.error('Something went wrong. Please try again or call (512) 436-0774');
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center border-2 border-green-200"
            >
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                    Thank You!
                </h3>
                <p className="text-green-600 mb-4">
                    We received your service inquiry. Our team will contact you within 30 minutes during business hours.
                </p>
                <p className="text-sm text-green-600">
                    Expected contact: Within 30 minutes (Mon-Sun, 8am-8pm)
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8"
        >
            <h3 className="text-2xl font-bold text-[#1e3a5f] mb-2">
                Quick Service Inquiry
            </h3>
            <p className="text-gray-600 mb-6">
                Tell us which services interest you and we'll follow up with a personalized care plan.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="inquiry_first_name" className="text-[#1e3a5f] font-semibold text-sm">
                            First Name *
                        </Label>
                        <Input
                            id="inquiry_first_name"
                            value={formData.first_name}
                            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                            placeholder="John"
                            className={errors.first_name ? 'border-red-500 mt-1' : 'mt-1'}
                        />
                        {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                    </div>
                    <div>
                        <Label htmlFor="inquiry_last_name" className="text-[#1e3a5f] font-semibold text-sm">
                            Last Name *
                        </Label>
                        <Input
                            id="inquiry_last_name"
                            value={formData.last_name}
                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                            placeholder="Smith"
                            className={errors.last_name ? 'border-red-500 mt-1' : 'mt-1'}
                        />
                        {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                    </div>
                </div>

                {/* Contact Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="inquiry_email" className="text-[#1e3a5f] font-semibold text-sm">
                            Email *
                        </Label>
                        <Input
                            id="inquiry_email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            className={errors.email ? 'border-red-500 mt-1' : 'mt-1'}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <Label htmlFor="inquiry_phone" className="text-[#1e3a5f] font-semibold text-sm">
                            Phone *
                        </Label>
                        <Input
                            id="inquiry_phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="(512) 555-1234"
                            className={errors.phone ? 'border-red-500 mt-1' : 'mt-1'}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                </div>

                {/* Services Selection */}
                <div>
                    <Label className="text-[#1e3a5f] font-semibold text-sm block mb-3">
                        Services Interested In *
                    </Label>
                    <div className="grid md:grid-cols-2 gap-3">
                        {services.map((service) => (
                            <div key={service.id} className="flex items-center gap-2">
                                <Checkbox
                                    id={`inquiry_${service.id}`}
                                    checked={formData.services_interested.includes(service.value)}
                                    onCheckedChange={() => handleServiceToggle(service.value)}
                                />
                                <Label
                                    htmlFor={`inquiry_${service.id}`}
                                    className="cursor-pointer text-gray-700 font-normal text-sm"
                                >
                                    {service.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                    {errors.services && <p className="text-red-500 text-xs mt-2">{errors.services}</p>}
                </div>

                {/* Specific Needs */}
                <div>
                    <Label htmlFor="specific_needs" className="text-[#1e3a5f] font-semibold text-sm">
                        Describe Your Specific Needs (Optional)
                    </Label>
                    <Textarea
                        id="specific_needs"
                        value={formData.specific_needs}
                        onChange={(e) => setFormData({ ...formData, specific_needs: e.target.value })}
                        placeholder="Tell us about any special needs or preferences..."
                        rows={3}
                        maxLength={300}
                        className="mt-1"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                        {formData.specific_needs.length}/300 characters
                    </p>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f] font-bold py-3"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        'Submit Service Inquiry'
                    )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                    We'll respond within 30 minutes during business hours
                </p>
            </form>
        </motion.div>
    );
}