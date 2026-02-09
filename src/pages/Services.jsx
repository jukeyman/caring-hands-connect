import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { 
    Moon, Calendar, Heart, HandHeart, Pill, Utensils, 
    Phone, CheckCircle, Star, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services() {
    const services = [
        {
            icon: Moon,
            title: "24/7 Live-In Care",
            description: "Round-the-clock non-medical support in the comfort and safety of your own home. Perfect for individuals who need constant supervision, assistance with daily activities, or companionship throughout the day and night.",
            included: [
                "24/7 caregiver presence (with appropriate rest breaks)",
                "All activities of daily living (ADLs)",
                "Meal planning, preparation, and feeding assistance",
                "Medication reminders (non-medical)",
                "Light housekeeping and laundry",
                "Companionship and emotional support",
                "Transportation to appointments",
                "Family communication and updates"
            ],
            whoItsFor: [
                "Post-surgery recovery requiring constant supervision",
                "Advanced dementia or Alzheimer's care",
                "Bedridden or severely mobility-impaired individuals",
                "Anyone needing 24/7 supervision for safety"
            ],
            qualifications: [
                "CPR & First Aid certified",
                "Background checked",
                "Dementia care training (if applicable)",
                "Professionally trained"
            ],
            ctaText: "Request Care Plan for Live-In Care",
            ctaService: "Live-In Care"
        },
        {
            icon: Calendar,
            title: "20+ Hours Weekly Care",
            description: "Consistent, reliable non-medical support for families who need regular assistance but not 24/7 care. Ideal for maintaining independence while ensuring safety and well-being.",
            included: [
                "Flexible scheduling (daily, every other day, weekends, etc.)",
                "Personal care assistance (bathing, dressing, grooming)",
                "Medication reminders (non-medical)",
                "Meal preparation and nutrition support",
                "Light housekeeping",
                "Transportation to appointments, errands, social events",
                "Companionship and cognitive engagement"
            ],
            whoItsFor: [
                "Early to moderate dementia",
                "Post-stroke support",
                "Parkinson's or arthritis management",
                "Anyone needing consistent weekly support"
            ],
            qualifications: [
                "CPR & First Aid certified",
                "Background checked",
                "Condition-specific training",
                "Professionally trained"
            ],
            ctaText: "Request Care Plan for Weekly Care",
            ctaService: "20+ Hours Weekly"
        },
        {
            icon: Heart,
            title: "Companionship Care",
            description: "Combat isolation and loneliness with meaningful social interaction. Our companions provide conversation, activities, and emotional support to enhance quality of life.",
            included: [
                "Engaging conversation and active listening",
                "Board games, puzzles, and cognitive activities",
                "Reading, music, and entertainment",
                "Accompaniment to social events and outings",
                "Light meal preparation during visits",
                "Errands and shopping assistance",
                "Technology help (phone, email, video calls)"
            ],
            whoItsFor: [
                "Socially isolated seniors",
                "Individuals with mild cognitive decline",
                "Those recovering from loss of spouse/partner",
                "Anyone seeking regular social engagement"
            ],
            qualifications: [
                "Compassionate and patient personality",
                "Background checked",
                "Communication skills training",
                "Professionally trained"
            ],
            ctaText: "Request Care Plan for Companionship",
            ctaService: "Companionship Care"
        },
        {
            icon: HandHeart,
            title: "Personal Care (ADLs)",
            description: "Dignified assistance with Activities of Daily Living. Our trained caregivers help with bathing, dressing, grooming, and mobility while preserving your loved one's independence and self-respect.",
            included: [
                "Bathing and showering assistance",
                "Dressing and grooming support",
                "Toileting and incontinence care",
                "Transfer and mobility assistance",
                "Feeding assistance",
                "Exercise support",
                "Fall prevention strategies"
            ],
            whoItsFor: [
                "Individuals with limited mobility",
                "Arthritis or joint pain sufferers",
                "Recovery from surgery or injury",
                "Progressive conditions affecting physical ability"
            ],
            qualifications: [
                "ADL care certification",
                "CPR & First Aid certified",
                "Transfer and mobility training",
                "Professionally trained"
            ],
            ctaText: "Request Care Plan for Personal Care",
            ctaService: "Personal Care"
        },
        {
            icon: Utensils,
            title: "Meal Planning & Preparation",
            description: "Nutrition-focused meal services tailored to dietary restrictions, preferences, and health conditions. From grocery shopping to cooking to cleanup, we handle it all.",
            included: [
                "Personalized meal planning based on dietary needs",
                "Grocery shopping and ingredient sourcing",
                "Meal preparation and cooking",
                "Special diet accommodation (diabetic, low-sodium, etc.)",
                "Feeding assistance if needed",
                "Kitchen cleanup and organization",
                "Nutrition tracking"
            ],
            whoItsFor: [
                "Diabetes management requiring specific diet",
                "Cardiac conditions needing low-sodium meals",
                "Difficulty with cooking or meal preparation",
                "Weight management and nutrition goals"
            ],
            qualifications: [
                "Food safety certified",
                "Dietary restriction training",
                "Background checked",
                "Professionally trained"
            ],
            ctaText: "Request Care Plan for Meal Services",
            ctaService: "Meal Planning"
        }
    ];

    const comparisonData = [
        {
            service: "Live-In Care",
            hours: "24/7",
            tasks: "All services included",
            qualifications: "Advanced training, dementia care",
            pricing: "Custom quote based on needs"
        },
        {
            service: "20+ Hours Weekly",
            hours: "20-40 hrs/week",
            tasks: "ADLs, meals, companionship",
            qualifications: "Full certification, condition-specific",
            pricing: "Hourly rate, weekly minimum"
        },
        {
            service: "Companionship",
            hours: "Flexible",
            tasks: "Social support, activities, outings",
            qualifications: "Trained companions",
            pricing: "Competitive hourly rate"
        },
        {
            service: "Personal Care",
            hours: "As needed",
            tasks: "ADLs only",
            qualifications: "ADL certified",
            pricing: "Hourly rate"
        },
        {
            service: "Meal Services",
            hours: "2-4 hrs/day",
            tasks: "Meal planning, prep, shopping",
            qualifications: "Food safety certified",
            pricing: "Per visit or hourly"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* HERO SECTION */}
            <section className="bg-gradient-to-br from-[#1e3a5f] via-[#2d4a6f] to-[#4a90e2] text-white py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                            Custom Care Services Designed<br />
                            <span className="text-[#d4af37]">Around Your Loved One</span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-8">
                            Choose one service or combine several — we build your plan together
                        </p>
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f] font-bold text-lg px-8 py-6">
                                Request Free Care Assessment
                            </Button>
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* SERVICE DETAILS SECTIONS */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-16">
                        {services.map((service, index) => {
                            const IconComponent = service.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-8 md:p-10"
                                >
                                    <div className="flex items-start gap-6 mb-6">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center flex-shrink-0">
                                            <IconComponent className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-2xl sm:text-3xl font-bold text-[#1e3a5f] mb-3">
                                                {service.title}
                                            </h2>
                                            <p className="text-lg text-[#2d3436] leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-8">
                                        {/* What's Included */}
                                        <div>
                                            <h3 className="font-bold text-[#1e3a5f] mb-4 text-lg">What's Included</h3>
                                            <ul className="space-y-2">
                                                {service.included.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-[#2d3436]">
                                                        <CheckCircle className="w-4 h-4 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Who It's For */}
                                        <div>
                                            <h3 className="font-bold text-[#1e3a5f] mb-4 text-lg">Who It's For</h3>
                                            <ul className="space-y-2">
                                                {service.whoItsFor.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-[#2d3436]">
                                                        <Star className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Caregiver Qualifications */}
                                        <div>
                                            <h3 className="font-bold text-[#1e3a5f] mb-4 text-lg">Caregiver Qualifications</h3>
                                            <ul className="space-y-2">
                                                {service.qualifications.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-[#2d3436]">
                                                        <CheckCircle className="w-4 h-4 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        <a href={createPageUrl('Contact') + '?service=' + service.ctaService}>
                                            <Button className="bg-[#4a90e2] hover:bg-[#1e3a5f] text-white font-semibold">
                                                {service.ctaText} <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </a>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CARE SERVICES SHOWCASE */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Our Care Services in Action
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            Compassionate, professional care delivered every day
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-xl overflow-hidden shadow-lg"
                        >
                            <img 
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/ace23adb2_asset_p75vyjluj_1769472006706.png"
                                alt="Meal preparation services"
                                className="w-full h-64 object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="rounded-xl overflow-hidden shadow-lg"
                        >
                            <img 
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/850e2b006_asset_f7f7u7gvx_1769472006706.png"
                                alt="Physical therapy support"
                                className="w-full h-64 object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="rounded-xl overflow-hidden shadow-lg"
                        >
                            <img 
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/6108704b2_asset_f3u1stj75_1769472006706.png"
                                alt="Health monitoring"
                                className="w-full h-64 object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="rounded-xl overflow-hidden shadow-lg"
                        >
                            <img 
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/7c7a664c7_asset_f1op9kxl6_1769472006706.png"
                                alt="Personal care assistance"
                                className="w-full h-64 object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="rounded-xl overflow-hidden shadow-lg"
                        >
                            <img 
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/dbe06054e_asset_gw2k1gjwt_1769472006706.png"
                                alt="Medication reminders"
                                className="w-full h-64 object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="rounded-xl overflow-hidden shadow-lg"
                        >
                            <img 
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/13398dcaa_asset_e9rov4mu9_1769472006706.png"
                                alt="Cooking together"
                                className="w-full h-64 object-cover"
                            />
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-xl overflow-hidden shadow-lg"
                        >
                            <img 
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/2f9f4539f_asset_kro0vikm9_1769472006706.png"
                                alt="Beautiful Texas home"
                                className="w-full h-64 object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="rounded-xl overflow-hidden shadow-lg"
                        >
                            <img 
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/c30c8545d_asset_fi19awrzz_1769472006706.png"
                                alt="Multiple care scenarios"
                                className="w-full h-64 object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* COMPARISON TABLE SECTION */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Not Sure Which Service You Need?
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            Compare our services to find the right fit for your family
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden"
                    >
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#1e3a5f] text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-bold">Service</th>
                                        <th className="px-6 py-4 text-left font-bold">Hours</th>
                                        <th className="px-6 py-4 text-left font-bold">Tasks Included</th>
                                        <th className="px-6 py-4 text-left font-bold">Qualifications</th>
                                        <th className="px-6 py-4 text-left font-bold">Pricing</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonData.map((row, i) => (
                                        <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-[#1e3a5f]">{row.service}</td>
                                            <td className="px-6 py-4 text-[#2d3436]">{row.hours}</td>
                                            <td className="px-6 py-4 text-[#2d3436]">{row.tasks}</td>
                                            <td className="px-6 py-4 text-[#2d3436]">{row.qualifications}</td>
                                            <td className="px-6 py-4 text-[#2d3436]">{row.pricing}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden divide-y divide-gray-200">
                            {comparisonData.map((row, i) => (
                                <div key={i} className="p-6">
                                    <h3 className="font-bold text-[#1e3a5f] text-lg mb-4">{row.service}</h3>
                                    <div className="space-y-2 text-sm">
                                        <div><span className="font-semibold">Hours:</span> {row.hours}</div>
                                        <div><span className="font-semibold">Tasks:</span> {row.tasks}</div>
                                        <div><span className="font-semibold">Qualifications:</span> {row.qualifications}</div>
                                        <div><span className="font-semibold">Pricing:</span> {row.pricing}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                                Schedule a Free Consultation — We'll Help You Decide
                            </Button>
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* PAYMENT OPTIONS SECTION */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Flexible Payment Options Accepted
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            We make it easy to pay for the care you need
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-8"
                    >
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-[#4a90e2] mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-[#1e3a5f] mb-1">Online Payments</h3>
                                    <p className="text-sm text-[#2d3436]">Secure online portal for easy payment processing</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-[#4a90e2] mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-[#1e3a5f] mb-1">Credit Cards</h3>
                                    <p className="text-sm text-[#2d3436]">All major credit cards accepted</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-[#4a90e2] mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-[#1e3a5f] mb-1">Checks</h3>
                                    <p className="text-sm text-[#2d3436]">Personal and business checks welcome</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-[#4a90e2] mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-[#1e3a5f] mb-1">Private Pay</h3>
                                    <p className="text-sm text-[#2d3436]">Flexible payment plans available</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 md:col-span-2">
                                <CheckCircle className="w-6 h-6 text-[#4a90e2] mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-[#1e3a5f] mb-1">LTC Insurance Claims Submission</h3>
                                    <p className="text-sm text-[#2d3436]">We'll help you submit claims to your long-term care insurance provider</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FOOTER CTA SECTION */}
            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Still Have Questions?
                        </h2>
                        <p className="text-xl text-[#2d3436] mb-10">
                            Every family's situation is unique. Let's talk about yours.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href="tel:5124360774">
                                <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold text-lg px-8 py-6">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Call (512) 436-0774
                                </Button>
                            </a>
                            <a href={createPageUrl('Contact')}>
                                <Button size="lg" variant="outline" className="border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white font-semibold text-lg px-8 py-6">
                                    Request Free Assessment
                                </Button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}