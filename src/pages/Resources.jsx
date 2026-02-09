import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { useSEO } from '../components/SEO';
import { 
    Download, CheckCircle, Brain, Activity, Home as HomeIcon, 
    Users, FileText, Flag, Play, Phone, Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import CategorySection from '../components/resources/CategorySection';

export default function Resources() {
    useSEO('Resources', 'Expert guides on dementia care, stroke recovery, aging in place, caregiver support, end-of-life planning, and VA benefits for Texas families.');
    const [downloadEmail, setDownloadEmail] = useState('');
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [newsletterLoading, setNewsletterLoading] = useState(false);

    const handleDownloadGuide = (e) => {
        e.preventDefault();
        if (!downloadEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(downloadEmail)) {
            toast.error('Please enter a valid email address');
            return;
        }
        setDownloadLoading(true);
        // Simulate download
        setTimeout(() => {
            toast.success('Guide sent to your email!');
            setDownloadEmail('');
            setDownloadLoading(false);
        }, 1500);
    };

    const handleNewsletterSignup = (e) => {
        e.preventDefault();
        if (!newsletterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
            toast.error('Please enter a valid email address');
            return;
        }
        setNewsletterLoading(true);
        // Simulate signup
        setTimeout(() => {
            toast.success('Successfully subscribed to newsletter!');
            setNewsletterEmail('');
            setNewsletterLoading(false);
        }, 1500);
    };

    const resourceCategories = [
        {
            icon: Brain,
            title: "Alzheimer's & Dementia Care",
            articles: [
                {
                    title: "10 Early Signs of Dementia Every Family Should Know",
                    excerpt: "Learn to recognize the subtle warning signs that may indicate cognitive decline and when to seek professional evaluation.",
                    readTime: 6,
                    link: createPageUrl('EarlySignsDementia')
                },
                {
                    title: "How to Create a Safe Home Environment for Dementia Patients",
                    excerpt: "Practical modifications to reduce confusion, prevent wandering, and maintain safety while preserving independence.",
                    readTime: 8,
                    link: createPageUrl('SafeHomeDementia')
                },
                {
                    title: "Communication Tips for Alzheimer's Caregivers",
                    excerpt: "Effective strategies for connecting with loved ones experiencing memory loss and cognitive changes.",
                    readTime: 5,
                    link: createPageUrl('CommunicationAlzheimers')
                },
                {
                    title: "Understanding Sundowning: What It Is and How to Manage It",
                    excerpt: "Why late-afternoon agitation happens in dementia patients and proven techniques to ease symptoms.",
                    readTime: 7,
                    link: createPageUrl('Sundowning')
                }
            ]
        },
        {
            icon: Activity,
            title: "Stroke Recovery",
            articles: [
                {
                    title: "The First 90 Days After a Stroke: What to Expect",
                    excerpt: "A comprehensive timeline of stroke recovery stages and what family caregivers should prepare for.",
                    readTime: 10,
                    link: createPageUrl('First90DaysStroke')
                },
                {
                    title: "Physical Therapy Exercises You Can Do at Home",
                    excerpt: "Safe, effective exercises to improve mobility, strength, and coordination during stroke rehabilitation.",
                    readTime: 8,
                    link: createPageUrl('PhysicalTherapyStroke')
                },
                {
                    title: "Speech Recovery Techniques for Stroke Survivors",
                    excerpt: "Communication strategies and exercises to help regain language skills and rebuild confidence.",
                    readTime: 6,
                    link: createPageUrl('SpeechRecoveryStroke')
                },
                {
                    title: "Preventing a Second Stroke: Risk Factors and Prevention",
                    excerpt: "Critical lifestyle changes, medication management, and warning signs every survivor should know.",
                    readTime: 7,
                    link: createPageUrl('StrokePrevention')
                }
            ]
        },
        {
            icon: HomeIcon,
            title: "Aging in Place",
            articles: [
                {
                    title: "Home Modifications for Seniors: Safety and Accessibility",
                    excerpt: "Essential upgrades from grab bars to smart home technology that help seniors age safely at home.",
                    readTime: 9,
                    link: createPageUrl('HomeModificationsSeniors')
                },
                {
                    title: "When Is It Time to Consider Home Care? 12 Warning Signs",
                    excerpt: "Recognize the signals that your loved one may benefit from professional in-home support.",
                    readTime: 5,
                    link: createPageUrl('WhenTimeHomeCare')
                },
                {
                    title: "Technology Tools to Help Seniors Live Independently",
                    excerpt: "Medication reminders, fall detection devices, and other tech solutions for aging in place.",
                    readTime: 6,
                    link: "#"
                },
                {
                    title: "Fall Prevention: Creating a Safe Living Environment",
                    excerpt: "Evidence-based strategies to reduce fall risk and maintain mobility for seniors at home.",
                    readTime: 7,
                    link: "#"
                }
            ]
        },
        {
            icon: Users,
            title: "Caregiver Support",
            articles: [
                {
                    title: "Avoiding Caregiver Burnout: Self-Care Strategies",
                    excerpt: "Recognize burnout symptoms and implement sustainable self-care practices to protect your wellbeing.",
                    readTime: 6,
                    link: createPageUrl('CaregiverBurnout')
                },
                {
                    title: "How to Have 'The Conversation' About Needing Help",
                    excerpt: "Approaching your loved one with compassion when it's time to discuss accepting care.",
                    readTime: 5,
                    link: createPageUrl('TheConversation')
                },
                {
                    title: "Financial Assistance Programs for Family Caregivers in Texas",
                    excerpt: "State and federal programs that provide financial relief for family caregivers.",
                    readTime: 8,
                    link: "#"
                },
                {
                    title: "Balancing Work and Caregiving: Practical Tips",
                    excerpt: "Time management strategies, workplace accommodations, and resources for working caregivers.",
                    readTime: 7,
                    link: "#"
                }
            ]
        },
        {
            icon: FileText,
            title: "End-of-Life Planning",
            articles: [
                {
                    title: "Hospice vs. Palliative Care: Understanding the Difference",
                    excerpt: "Clear explanations of these two care types and how to know which is right for your loved one.",
                    readTime: 6,
                    link: createPageUrl('HospicePalliativeCare')
                },
                {
                    title: "Creating an Advance Directive: What You Need to Know",
                    excerpt: "Step-by-step guide to documenting healthcare wishes and ensuring they're legally binding in Texas.",
                    readTime: 9,
                    link: createPageUrl('AdvanceDirective')
                },
                {
                    title: "How to Talk to Your Family About End-of-Life Wishes",
                    excerpt: "Starting difficult but necessary conversations about care preferences and final wishes.",
                    readTime: 5,
                    link: createPageUrl('FamilyEndOfLifeConversation')
                },
                {
                    title: "Resources for Grief and Bereavement Support",
                    excerpt: "Support groups, counseling services, and coping strategies for families experiencing loss.",
                    readTime: 4,
                    link: createPageUrl('GriefBereavement')
                }
            ]
        },
        {
            icon: Flag,
            title: "Veterans Benefits",
            articles: [
                {
                    title: "VA Aid and Attendance Benefits: Complete Guide for Texas Veterans",
                    excerpt: "How to qualify for up to $2,266/month in VA benefits to help pay for home care services.",
                    readTime: 12,
                    link: createPageUrl('VAAidAttendance')
                },
                {
                    title: "How to Apply for VA Home Care Benefits",
                    excerpt: "Step-by-step application process, required documents, and what to expect during review.",
                    readTime: 10,
                    link: createPageUrl('VAApplicationProcess')
                },
                {
                    title: "VA vs. Private Home Care: Understanding Your Options",
                    excerpt: "Comparing VA-provided care with private home health services to make an informed decision.",
                    readTime: 7,
                    link: createPageUrl('VAVsPrivateCare')
                },
                {
                    title: "Resources for Disabled Veterans and Their Families",
                    excerpt: "Comprehensive directory of Texas resources for disabled vets including healthcare, housing, and support.",
                    readTime: 8,
                    link: createPageUrl('VeteransResources')
                }
            ]
        }
    ];

    const videos = [
        {
            title: "What to Expect from Home Care: A Video Tour",
            thumbnail: "video-tour",
            duration: "3:45"
        },
        {
            title: "Meet Our Caregivers: Interviews and Stories",
            thumbnail: "caregivers",
            duration: "5:20"
        },
        {
            title: "How to Help Your Loved One with Bathing (ADL Tutorial)",
            thumbnail: "bathing",
            duration: "4:15"
        },
        {
            title: "Understanding Your First Care Assessment",
            thumbnail: "assessment",
            duration: "2:50"
        }
    ];

    const checklists = [
        "Home Safety Checklist for Seniors",
        "Daily Care Task Schedule Template",
        "Medication Tracking Sheet",
        "Emergency Contact Card (printable wallet size)"
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* HERO SECTION */}
            <section className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] text-white py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Expert Resources for Family Caregivers
                        </h1>
                        <p className="text-xl text-gray-200">
                            Free guides, checklists, and advice from licensed home health professionals
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FEATURED GUIDE SECTION */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-3xl p-8 md:p-12 shadow-2xl text-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-6">
                            <Download className="w-10 h-10 text-[#1e3a5f]" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            FREE DOWNLOAD: The Complete Family Guide to Choosing Home Care in Texas
                        </h2>
                        <p className="text-lg text-[#2d3436] mb-6 max-w-3xl mx-auto">
                            A comprehensive 24-page guide covering everything you need to know: how to evaluate agencies, 
                            questions to ask, red flags to avoid, insurance options, and more.
                        </p>

                        {/* Includes List */}
                        <div className="grid md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
                            {[
                                "Agency Evaluation Checklist",
                                "Interview Questions for Caregivers",
                                "Cost Breakdown & Budgeting Worksheet",
                                "Texas Licensing Requirements",
                                "Insurance & Payment Options",
                                "Red Flags to Watch For"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-left">
                                    <CheckCircle className="w-5 h-5 text-[#1e3a5f] flex-shrink-0" />
                                    <span className="text-[#2d3436] font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Email Opt-in Form */}
                        <form onSubmit={handleDownloadGuide} className="max-w-md mx-auto">
                            <div className="flex gap-3">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={downloadEmail}
                                    onChange={(e) => setDownloadEmail(e.target.value)}
                                    className="flex-1 bg-white"
                                />
                                <Button 
                                    type="submit"
                                    disabled={downloadLoading}
                                    className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold px-8"
                                >
                                    {downloadLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        'Download Free Guide'
                                    )}
                                </Button>
                            </div>
                            <p className="text-sm text-[#2d3436] mt-3">
                                We respect your privacy. Your email will never be shared.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* RESOURCE CATEGORIES SECTION */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Browse Resources by Topic
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            Expert guidance on the topics that matter most to caregivers
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {resourceCategories.map((category, index) => (
                            <CategorySection key={index} {...category} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* VIDEO LIBRARY SECTION */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Watch and Learn
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            Video tutorials and stories from our care team
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {videos.map((video, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                            >
                                {/* Video Thumbnail */}
                                <div className="relative aspect-video bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Play className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                        {video.duration}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold text-[#1e3a5f] text-sm group-hover:text-[#4a90e2] transition-colors">
                                        {video.title}
                                    </h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DOWNLOADABLE CHECKLISTS SECTION */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Free Checklists & Tools
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            Printable resources to help you organize and manage care
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {checklists.map((checklist, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group"
                            >
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center mb-4">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="font-bold text-[#1e3a5f] mb-4">
                                    {checklist}
                                </h4>
                                <Button className="w-full bg-[#4a90e2] hover:bg-[#1e3a5f] text-white group-hover:bg-[#d4af37] group-hover:text-[#1e3a5f] transition-all">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEWSLETTER SIGNUP SECTION */}
            <section className="py-20 bg-[#1e3a5f] text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Stay Informed
                        </h2>
                        <p className="text-xl text-gray-200 mb-8">
                            Get monthly caregiving tips, resources, and expert advice delivered to your inbox
                        </p>

                        <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto">
                            <div className="flex gap-3">
                                <Input
                                    type="email"
                                    placeholder="Your email address"
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    className="flex-1 bg-white text-[#2d3436]"
                                />
                                <Button 
                                    type="submit"
                                    disabled={newsletterLoading}
                                    className="bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f] font-bold px-8"
                                >
                                    {newsletterLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        'Subscribe'
                                    )}
                                </Button>
                            </div>
                            <p className="text-sm text-gray-300 mt-3">
                                We respect your privacy. Unsubscribe anytime.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* FINAL CTA SECTION */}
            <section className="py-20 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Need Personalized Advice?
                        </h2>
                        <p className="text-xl text-[#2d3436] mb-8">
                            Schedule a free consultation with our care experts
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href={createPageUrl('Contact')}>
                                <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold text-lg px-8 py-6">
                                    Request Consultation
                                </Button>
                            </a>
                            <a href="tel:5125551234">
                                <Button size="lg" variant="outline" className="border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white font-semibold text-lg px-8 py-6">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Call (512) 555-1234
                                </Button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}