import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { base44 } from '@/api/base44Client';
import { 
    DollarSign, Calendar, BookOpen, Shield, Users, Heart,
    Phone, Mail, Loader2, Upload, CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import JobCard from '../components/careers/JobCard';

export default function Careers() {
    const [loading, setLoading] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [uploadingResume, setUploadingResume] = useState(false);
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        zip_code: '',
        position_applying_for: '',
        years_experience: '',
        certifications: [],
        availability: [],
        has_transportation: null,
        why_caregiver: '',
        resume_url: '',
        application_status: 'New',
        application_date: ''
    });
    const [errors, setErrors] = useState({});

    const benefits = [
        {
            icon: DollarSign,
            title: "Competitive Pay",
            text: "$16-$20/hour depending on experience and certifications. Weekly pay via direct deposit."
        },
        {
            icon: Calendar,
            title: "Flexible Scheduling",
            text: "Choose your hours. Full-time, part-time, weekends, overnights — you decide what works for you."
        },
        {
            icon: DollarSign,
            title: "Referral Program",
            text: "Earn bonuses for referring qualified caregivers to join our team."
        },
        {
            icon: DollarSign,
            title: "Early Pay Access",
            text: "Access your earned wages before payday when you need it most."
        },
        {
            icon: Users,
            title: "Supportive Team",
            text: "24/7 on-call support and a management team that actually cares about you."
        },
        {
            icon: Heart,
            title: "Meaningful Work",
            text: "Make a real impact in people's lives. Our caregivers say this is the most rewarding job they've ever had."
        }
    ];

    const jobs = [
        {
            title: "Certified Caregiver (Part-Time)",
            location: "Austin & surrounding areas",
            pay: "$18-$20/hour",
            requirements: [
                "1+ years caregiving experience",
                "CPR & First Aid certified",
                "Reliable transportation",
                "Background check required"
            ],
            position: "Certified Caregiver PT",
            applyUrl: "https://www.clearcareonline.com/apply"
        },
        {
            title: "Companion Caregiver (Part-Time)",
            location: "Austin & surrounding areas",
            pay: "$16-$18/hour",
            requirements: [
                "No experience required (we'll train!)",
                "Patient, compassionate, reliable",
                "Background check required"
            ],
            position: "Companion PT",
            applyUrl: "https://www.clearcareonline.com/apply"
        }
    ];

    const testimonials = [
        {
            name: "Jessica M., Caregiver since 2021",
            quote: "I've worked for three agencies, and Caring Hands is by far the best. They actually listen, the pay is fair, and I feel supported."
        },
        {
            name: "Marcus T., Caregiver since 2020",
            quote: "The training here is top-notch. I came in with no experience, and now I'm certified in dementia care and medication management."
        },
        {
            name: "Rosa L., Caregiver since 2019",
            quote: "I love that I can choose my schedule. I'm a single mom, and this flexibility lets me work and still be there for my kids."
        }
    ];

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleJobApply = (position) => {
        setFormData({ ...formData, position_applying_for: position });
        scrollToForm();
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Resume must be less than 5MB');
            return;
        }

        setUploadingResume(true);
        try {
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            setFormData({ ...formData, resume_url: file_url });
            setResumeFile(file);
            toast.success('Resume uploaded successfully');
        } catch (error) {
            toast.error('Failed to upload resume');
        }
        setUploadingResume(false);
    };

    const handleCertificationToggle = (cert) => {
        setFormData(prev => ({
            ...prev,
            certifications: prev.certifications.includes(cert)
                ? prev.certifications.filter(c => c !== cert)
                : [...prev.certifications, cert]
        }));
    };

    const handleAvailabilityToggle = (avail) => {
        setFormData(prev => ({
            ...prev,
            availability: prev.availability.includes(avail)
                ? prev.availability.filter(a => a !== avail)
                : [...prev.availability, avail]
        }));
    };

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

        if (!formData.position_applying_for) newErrors.position_applying_for = 'Please select a position';
        if (!formData.years_experience) newErrors.years_experience = 'Please select experience level';
        if (formData.has_transportation === null) newErrors.has_transportation = 'Please answer this question';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setLoading(true);

        try {
            await base44.entities.Caregiver_Application.create({
                ...formData,
                application_date: new Date().toISOString()
            });

            toast.success('Application submitted successfully!');
            
            // Reset form
            setFormData({
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                zip_code: '',
                position_applying_for: '',
                years_experience: '',
                certifications: [],
                availability: [],
                has_transportation: null,
                why_caregiver: '',
                resume_url: '',
                application_status: 'New',
                application_date: ''
            });
            setResumeFile(null);
            setErrors({});
        } catch (error) {
            toast.error('Failed to submit application. Please try again or call us.');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] text-white py-20 lg:py-32">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Join a Team That Makes a<br />
                            <span className="text-[#d4af37]">Difference Every Day</span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
                            Caring Hands is hiring compassionate caregivers across Central Texas
                        </p>
                        <Button
                            onClick={scrollToForm}
                            size="lg"
                            className="bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f] font-bold text-lg px-8 py-6"
                        >
                            View Open Positions
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* WHY WORK WITH US SECTION */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Why Caregivers Love Working at Caring Hands
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            More than just a job — join a family that values you
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => {
                            const IconComponent = benefit.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center mb-4">
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">{benefit.title}</h3>
                                    <p className="text-[#2d3436] leading-relaxed">{benefit.text}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* OPEN POSITIONS SECTION */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Current Openings
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            Apply today and start making a difference tomorrow
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {jobs.map((job, index) => (
                            <JobCard
                                key={index}
                                job={job}
                                index={index}
                                onApply={() => handleJobApply(job.position)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* APPLICATION FORM SECTION */}
            <section ref={formRef} className="py-20 bg-[#f8f9fa]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Apply Today
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            Join the Caring Hands family — we can't wait to meet you!
                        </p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl shadow-2xl p-8 space-y-6"
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

                        {/* Position Applying For */}
                        <div>
                            <Label htmlFor="position" className="text-[#1e3a5f] font-semibold">Position Applying For *</Label>
                            <Select 
                                value={formData.position_applying_for} 
                                onValueChange={(value) => setFormData({...formData, position_applying_for: value})}
                            >
                                <SelectTrigger className={errors.position_applying_for ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Select position" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Certified Caregiver FT">Certified Caregiver (Full-Time)</SelectItem>
                                    <SelectItem value="Companion PT">Companion Caregiver (Part-Time)</SelectItem>
                                    <SelectItem value="Live-In">Live-In Caregiver</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.position_applying_for && <p className="text-red-500 text-sm mt-1">{errors.position_applying_for}</p>}
                        </div>

                        {/* Years of Experience */}
                        <div>
                            <Label htmlFor="experience" className="text-[#1e3a5f] font-semibold">Years of Caregiving Experience *</Label>
                            <Select 
                                value={formData.years_experience} 
                                onValueChange={(value) => setFormData({...formData, years_experience: value})}
                            >
                                <SelectTrigger className={errors.years_experience ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Select experience level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">No experience (we'll train!)</SelectItem>
                                    <SelectItem value="1-2">1-2 years</SelectItem>
                                    <SelectItem value="3-5">3-5 years</SelectItem>
                                    <SelectItem value="5+">5+ years</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.years_experience && <p className="text-red-500 text-sm mt-1">{errors.years_experience}</p>}
                        </div>

                        {/* Certifications */}
                        <div>
                            <Label className="text-[#1e3a5f] font-semibold mb-3 block">Certifications</Label>
                            <div className="space-y-3">
                                {["CPR", "First Aid", "CNA", "Dementia Care", "None yet"].map((cert) => (
                                    <div key={cert} className="flex items-center gap-2">
                                        <Checkbox
                                            id={cert}
                                            checked={formData.certifications.includes(cert)}
                                            onCheckedChange={() => handleCertificationToggle(cert)}
                                        />
                                        <Label htmlFor={cert} className="cursor-pointer text-[#2d3436] font-normal">
                                            {cert}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Availability */}
                        <div>
                            <Label className="text-[#1e3a5f] font-semibold mb-3 block">Availability</Label>
                            <div className="space-y-3">
                                {["Weekdays", "Weekends", "Overnights", "Live-In"].map((avail) => (
                                    <div key={avail} className="flex items-center gap-2">
                                        <Checkbox
                                            id={avail}
                                            checked={formData.availability.includes(avail)}
                                            onCheckedChange={() => handleAvailabilityToggle(avail)}
                                        />
                                        <Label htmlFor={avail} className="cursor-pointer text-[#2d3436] font-normal">
                                            {avail}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Transportation */}
                        <div>
                            <Label className="text-[#1e3a5f] font-semibold mb-3 block">Do you have reliable transportation? *</Label>
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="transport_yes"
                                        checked={formData.has_transportation === true}
                                        onCheckedChange={() => setFormData({...formData, has_transportation: true})}
                                    />
                                    <Label htmlFor="transport_yes" className="cursor-pointer text-[#2d3436] font-normal">
                                        Yes
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="transport_no"
                                        checked={formData.has_transportation === false}
                                        onCheckedChange={() => setFormData({...formData, has_transportation: false})}
                                    />
                                    <Label htmlFor="transport_no" className="cursor-pointer text-[#2d3436] font-normal">
                                        No
                                    </Label>
                                </div>
                            </div>
                            {errors.has_transportation && <p className="text-red-500 text-sm mt-1">{errors.has_transportation}</p>}
                        </div>

                        {/* Why Caregiver */}
                        <div>
                            <Label htmlFor="why_caregiver" className="text-[#1e3a5f] font-semibold">Tell Us Why You Want to Be a Caregiver</Label>
                            <Textarea
                                id="why_caregiver"
                                placeholder="What motivates you to care for others?"
                                maxLength={300}
                                rows={4}
                                value={formData.why_caregiver}
                                onChange={(e) => setFormData({...formData, why_caregiver: e.target.value})}
                            />
                            <p className="text-sm text-gray-500 mt-1">{formData.why_caregiver.length}/300 characters</p>
                        </div>

                        {/* Resume Upload */}
                        <div>
                            <Label htmlFor="resume" className="text-[#1e3a5f] font-semibold">Resume Upload (Optional)</Label>
                            <div className="mt-2">
                                <label 
                                    htmlFor="resume" 
                                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#4a90e2] cursor-pointer transition-colors"
                                >
                                    {uploadingResume ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin text-[#4a90e2]" />
                                            <span className="text-[#2d3436]">Uploading...</span>
                                        </>
                                    ) : resumeFile ? (
                                        <>
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                            <span className="text-[#2d3436]">{resumeFile.name}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-5 h-5 text-[#4a90e2]" />
                                            <span className="text-[#2d3436]">Click to upload resume (PDF, DOC, DOCX - max 5MB)</span>
                                        </>
                                    )}
                                </label>
                                <input
                                    id="resume"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleResumeUpload}
                                    className="hidden"
                                />
                            </div>
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
                                    Submitting Application...
                                </>
                            ) : (
                                'Submit Application'
                            )}
                        </Button>
                    </motion.form>
                </div>
            </section>

            {/* CAREGIVER TESTIMONIALS SECTION */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            What Our Caregivers Say
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            Hear from team members who love what they do
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                {/* Photo Placeholder */}
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] mx-auto mb-4 flex items-center justify-center">
                                    <Users className="w-10 h-10 text-white opacity-50" />
                                </div>
                                <p className="text-[#2d3436] italic mb-4 leading-relaxed">
                                    "{testimonial.quote}"
                                </p>
                                <p className="font-semibold text-[#1e3a5f]">
                                    — {testimonial.name}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA SECTION */}
            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-6">
                            Questions About Working Here?
                        </h2>
                        <p className="text-xl text-[#2d3436] mb-8">
                            Call our recruitment team at (512) 436-0774
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href="tel:5124360774">
                                <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold text-lg px-8 py-6">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Call Now
                                </Button>
                            </a>
                            <a href="mailto:Info@caringhandshomehealthtx.com">
                                <Button size="lg" variant="outline" className="border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white font-semibold text-lg px-8 py-6">
                                    <Mail className="w-5 h-5 mr-2" />
                                    Email Info@caringhandshomehealthtx.com
                                </Button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}