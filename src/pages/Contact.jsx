import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from '@/api/base44Client';
import { useSEO } from '../components/SEO';
import { Phone, Mail, MapPin, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import ServiceInquiryForm from '../components/contact/ServiceInquiryForm';

export default function Contact() {
    useSEO('Contact', 'Get in touch with Caring Hands Home Health. Request a free care assessment, call us at (512) 436-0774, or visit our Austin office.');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        zip_code: '',
        care_needed_for: '',
        services_interested: [],
        urgency: '',
        message: '',
        lead_source: '',
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        landing_page: '',
        status: 'New'
    });

    const [errors, setErrors] = useState({});

    // Capture URL parameters on mount
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const preSelectedService = urlParams.get('service');
        const utmSource = urlParams.get('utm_source');
        const utmMedium = urlParams.get('utm_medium');
        const utmCampaign = urlParams.get('utm_campaign');

        setFormData(prev => ({
            ...prev,
            services_interested: preSelectedService ? [preSelectedService] : [],
            utm_source: utmSource || '',
            utm_medium: utmMedium || '',
            utm_campaign: utmCampaign || '',
            landing_page: window.location.href
        }));
    }, []);

    const serviceOptions = [
        "Live-In Care",
        "20+ Hours Weekly",
        "Companionship Care",
        "Personal Care (ADLs)",
        "Medication Management",
        "Meal Planning & Prep",
        "Not Sure Yet"
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
        if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
        
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Phone must be 10 digits';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.zip_code.trim()) {
            newErrors.zip_code = 'ZIP code is required';
        } else if (!/^\d{5}$/.test(formData.zip_code)) {
            newErrors.zip_code = 'ZIP code must be 5 digits';
        }

        if (!formData.care_needed_for) newErrors.care_needed_for = 'Please select who needs care';
        if (!formData.urgency) newErrors.urgency = 'Please select urgency level';

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
                ...formData,
                inquiry_date: new Date().toISOString(),
                lead_source: formData.lead_source || 'Website Form'
            });

            window.location.href = '/thank-you';
        } catch (error) {
            toast.error('Something went wrong. Please call us at (512) 555-1234');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* HERO SECTION */}
            <section className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                                  Contact Caring Hands Home Health
                                </h1>
                        <p className="text-xl text-gray-200">
                            Request your free care assessment — no obligation, no pressure
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CONTACT METHODS SECTION */}
            <section className="py-16 bg-[#f8f9fa]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Phone */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl p-8 shadow-lg text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">Call Us Anytime</h3>
                            <p className="text-2xl font-bold text-[#d4af37] mb-2">(512) 436-0774</p>
                            <p className="text-sm text-gray-600 mb-4">Available 7 days a week, 8am-8pm</p>
                            <a href="tel:5124360774">
                                <Button className="w-full bg-[#4a90e2] hover:bg-[#1e3a5f]">
                                    Call Now
                                </Button>
                            </a>
                        </motion.div>

                        {/* Email */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-xl p-8 shadow-lg text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">Send Us a Message</h3>
                            <p className="text-lg font-semibold text-[#d4af37] mb-2">Info@caringhandshomehealthtx.com</p>
                            <p className="text-sm text-gray-600 mb-4">Response within 30 minutes during business hours</p>
                            <a href="mailto:Info@caringhandshomehealthtx.com">
                                <Button className="w-full bg-[#4a90e2] hover:bg-[#1e3a5f]">
                                    Email Us
                                </Button>
                            </a>
                        </motion.div>

                        {/* Office */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl p-8 shadow-lg text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">Visit Our Office</h3>
                            <p className="text-lg text-[#2d3436] mb-2">123 Main St, Austin, TX 78701</p>
                            <p className="text-sm text-gray-600 mb-4">By appointment only</p>
                            <a href="https://maps.google.com/?q=123+Main+St+Austin+TX+78701" target="_blank" rel="noopener noreferrer">
                                <Button className="w-full bg-[#4a90e2] hover:bg-[#1e3a5f]">
                                    Get Directions
                                </Button>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* TEAM CONTACT INFO */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Our Team Is Here for You</h2>
                        <p className="text-lg text-[#2d3436]">Reach out to our leadership team directly</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: "Daniel F.", title: "Owner & CEO", email: "Danielf@caringhandshomehealthtx.com", photo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/c5c1fe81c_asset_3l2dxnxnh_1769472006706.png" },
                            { name: "Daneisha F.", title: "Clinical Director", email: "Daneishaf@caringhandshomehealthtx.com", photo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/1b9b15423_asset_skuint6sr_1769472006706.png" },
                            { name: "Derrick L.", title: "Operations Director", email: "Derrickl@caringhandshomehealthtx.com", photo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/45756d950_asset_3owys5wn4_1769472006706.png" },
                            { name: "Demetrius H.", title: "Care Coordinator", email: "Demetriush@caringhandshomehealthtx.com", photo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/188f2797b_asset_1m833axyd_1769472006706.png" }
                        ].map((person, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * idx }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                            >
                                <img src={person.photo} alt={person.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-bold text-[#1e3a5f] mb-1">{person.name}</h3>
                                    <p className="text-sm text-[#d4af37] font-semibold mb-2">{person.title}</p>
                                    <a href={`mailto:${person.email}`} className="text-xs text-[#4a90e2] hover:underline break-all">
                                        {person.email}
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICE INQUIRY FORM SECTION */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Tell Us About Your Service Needs
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            Select the services that interest you and we'll provide a personalized care plan
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <ServiceInquiryForm />
                        
                        {/* Why Choose Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div>
                                <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">
                                    What Happens Next
                                </h3>
                            </div>
                            
                            {[
                                {
                                    num: '1',
                                    title: 'You Submit Your Inquiry',
                                    desc: 'Tell us which services you need and any special requirements.'
                                },
                                {
                                    num: '2',
                                    title: 'We Call You Back',
                                    desc: 'Within 30 minutes, our care coordinator will call to discuss your needs.'
                                },
                                {
                                    num: '3',
                                    title: 'Custom Care Plan',
                                    desc: 'We create a personalized care plan tailored to your loved one.'
                                },
                                {
                                    num: '4',
                                    title: 'Start Your Care',
                                    desc: 'Begin care as soon as possible, sometimes same-day or next-day.'
                                }
                            ].map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * idx }}
                                    className="flex gap-4"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center flex-shrink-0">
                                        <span className="font-bold text-[#1e3a5f]">{step.num}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#1e3a5f] mb-1">{step.title}</h4>
                                        <p className="text-gray-600 text-sm">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FULL CONTACT FORM SECTION */}
            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Request Your Free Care Assessment
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            For a more detailed inquiry, fill out our comprehensive assessment form
                        </p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8 space-y-6"
                    >
                        {/* Name Fields */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="first_name" className="text-[#1e3a5f] font-semibold">First Name *</Label>
                                <Input
                                    id="first_name"
                                    value={formData.first_name}
                                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                                    className={errors.first_name ? 'border-red-500' : ''}
                                />
                                {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                            </div>
                            <div>
                                <Label htmlFor="last_name" className="text-[#1e3a5f] font-semibold">Last Name *</Label>
                                <Input
                                    id="last_name"
                                    value={formData.last_name}
                                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                                    className={errors.last_name ? 'border-red-500' : ''}
                                />
                                {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                            </div>
                        </div>

                        {/* Contact Fields */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="phone" className="text-[#1e3a5f] font-semibold">Phone Number *</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="(555) 123-4567"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className={errors.phone ? 'border-red-500' : ''}
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>
                            <div>
                                <Label htmlFor="email" className="text-[#1e3a5f] font-semibold">Email Address *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className={errors.email ? 'border-red-500' : ''}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        {/* ZIP Code */}
                        <div>
                            <Label htmlFor="zip_code" className="text-[#1e3a5f] font-semibold">ZIP Code *</Label>
                            <Input
                                id="zip_code"
                                placeholder="78701"
                                maxLength={5}
                                value={formData.zip_code}
                                onChange={(e) => setFormData({...formData, zip_code: e.target.value})}
                                className={errors.zip_code ? 'border-red-500' : ''}
                            />
                            {errors.zip_code && <p className="text-red-500 text-sm mt-1">{errors.zip_code}</p>}
                        </div>

                        {/* Care Needed For */}
                        <div>
                            <Label htmlFor="care_needed_for" className="text-[#1e3a5f] font-semibold">Care Needed For *</Label>
                            <Select 
                                value={formData.care_needed_for} 
                                onValueChange={(value) => setFormData({...formData, care_needed_for: value})}
                            >
                                <SelectTrigger className={errors.care_needed_for ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Select relationship" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Self">Self</SelectItem>
                                    <SelectItem value="Parent">Parent</SelectItem>
                                    <SelectItem value="Spouse">Spouse</SelectItem>
                                    <SelectItem value="Grandparent">Grandparent</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.care_needed_for && <p className="text-red-500 text-sm mt-1">{errors.care_needed_for}</p>}
                        </div>

                        {/* Services Interested */}
                        <div>
                            <Label className="text-[#1e3a5f] font-semibold mb-3 block">Services Interested In</Label>
                            <div className="space-y-3">
                                {serviceOptions.map((service) => (
                                    <div key={service} className="flex items-center gap-2">
                                        <Checkbox
                                            id={service}
                                            checked={formData.services_interested.includes(service)}
                                            onCheckedChange={() => handleServiceToggle(service)}
                                        />
                                        <Label htmlFor={service} className="cursor-pointer text-[#2d3436] font-normal">
                                            {service}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Urgency */}
                        <div>
                            <Label htmlFor="urgency" className="text-[#1e3a5f] font-semibold">How Soon Do You Need Care? *</Label>
                            <Select 
                                value={formData.urgency} 
                                onValueChange={(value) => setFormData({...formData, urgency: value})}
                            >
                                <SelectTrigger className={errors.urgency ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Select urgency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Immediate (within 1 week)">Immediate (within 1 week)</SelectItem>
                                    <SelectItem value="Soon (1-4 weeks)">Soon (1-4 weeks)</SelectItem>
                                    <SelectItem value="Planning ahead (1+ months)">Planning ahead (1+ months)</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.urgency && <p className="text-red-500 text-sm mt-1">{errors.urgency}</p>}
                        </div>

                        {/* Message */}
                        <div>
                            <Label htmlFor="message" className="text-[#1e3a5f] font-semibold">Tell Us About Your Situation</Label>
                            <Textarea
                                id="message"
                                placeholder="Share any details that will help us understand your needs..."
                                maxLength={500}
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                            />
                            <p className="text-sm text-gray-500 mt-1">{formData.message.length}/500 characters</p>
                        </div>

                        {/* How Did You Hear About Us */}
                        <div>
                            <Label htmlFor="lead_source" className="text-[#1e3a5f] font-semibold">How Did You Hear About Us?</Label>
                            <Select 
                                value={formData.lead_source} 
                                onValueChange={(value) => setFormData({...formData, lead_source: value})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select source (optional)" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Google Search">Google Search</SelectItem>
                                    <SelectItem value="Facebook">Facebook</SelectItem>
                                    <SelectItem value="Referral">Referral</SelectItem>
                                    <SelectItem value="Hospital/Doctor">Hospital/Doctor</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f] font-bold text-lg py-6"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Request Free Assessment'
                            )}
                        </Button>

                        {/* Privacy Notice & SMS Disclosure */}
                        <div className="text-sm text-gray-600 text-center space-y-2">
                            <p>
                                We respect your privacy. Your information will never be shared. See our{' '}
                                <Link to={createPageUrl('PrivacyPolicy')} className="text-[#4a90e2] hover:underline">Privacy Policy</Link>.
                            </p>
                            <p className="text-xs">
                                By submitting this form, you consent to receive text messages from Caring Hands Home Health 
                                regarding your care inquiry. Message and data rates may apply. Reply STOP to opt-out at any time. 
                                See our <Link to={createPageUrl('PrivacyPolicy')} className="text-[#4a90e2] hover:underline">Privacy Policy</Link> for more information.
                            </p>
                        </div>
                    </motion.form>
                </div>
            </section>

            {/* SERVICE AREA MAP SECTION */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            We Serve Central Texas
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            Including Austin, Round Rock, Cedar Park, Georgetown, Leander, and surrounding areas
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221290.1626347059!2d-97.94693384999999!3d30.307182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b599a0cc032f%3A0x5d9b464bd469d57a!2sAustin%2C%20TX!5e0!3m2!1sen!2sus!4v1234567890"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>

                    <p className="text-center text-[#2d3436] mt-6">
                        <strong>Service Area:</strong> Travis, Williamson, and Hays Counties<br />
                        Not sure if we serve your area? Give us a call — we're expanding!
                    </p>
                </div>
            </section>

            {/* FAQ PREVIEW SECTION */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Quick Answers to Common Questions
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {/* Q1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border-l-4 border-[#4a90e2]"
                        >
                            <h3 className="font-bold text-[#1e3a5f] mb-3">Do you offer free consultations?</h3>
                            <p className="text-[#2d3436] text-sm leading-relaxed">
                                Yes! Every family gets a free, no-obligation care assessment. We'll discuss your needs, 
                                answer questions, and explain your options.
                            </p>
                        </motion.div>

                        {/* Q2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border-l-4 border-[#4a90e2]"
                        >
                            <h3 className="font-bold text-[#1e3a5f] mb-3">Are you available 24/7?</h3>
                            <p className="text-[#2d3436] text-sm leading-relaxed">
                                Our caregivers provide 24/7 care if needed. Our office is available 7 days a week, 8am-8pm.
                            </p>
                        </motion.div>

                        {/* Q3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border-l-4 border-[#4a90e2]"
                        >
                            <h3 className="font-bold text-[#1e3a5f] mb-3">Do you accept insurance or Medicaid?</h3>
                            <p className="text-[#2d3436] text-sm leading-relaxed">
                                We're a private-pay agency, but we can help you explore long-term care insurance and veteran 
                                benefits that may cover our services.
                            </p>
                        </motion.div>

                        {/* Q4 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border-l-4 border-[#4a90e2]"
                        >
                            <h3 className="font-bold text-[#1e3a5f] mb-3">How quickly can care start?</h3>
                            <p className="text-[#2d3436] text-sm leading-relaxed">
                                For non-emergency needs, we can typically start within 48-72 hours. For urgent situations, 
                                we'll do everything we can to start same-day or next-day.
                            </p>
                        </motion.div>
                    </div>

                    <div className="text-center">
                        <Link to={createPageUrl('Resources')}>
                            <Button variant="outline" className="border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white">
                                See All FAQs
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FINAL CTA SECTION */}
            <section className="py-16 bg-[#1e3a5f] text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                            Prefer to Talk? We're Here.
                        </h2>
                        <a href="tel:5124360774">
                            <Button size="lg" className="bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f] font-bold text-lg px-8 py-6 mb-4">
                                <Phone className="w-5 h-5 mr-2" />
                                Call (512) 436-0774
                            </Button>
                        </a>
                        <p className="text-gray-300">Available 7 Days a Week</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}