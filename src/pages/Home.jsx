import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { useSEO } from '../components/SEO';
import { 
    Clock, Heart, Shield, Award, Flag, Lock, Star, Phone,
    Users, Stethoscope, CheckCircle, Moon, Calendar, HandHeart,
    Pill, Utensils, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
    useSEO('Home', 'Compassionate home care services in Austin, Texas. Veteran-owned, fully insured, and trusted by families for personalized in-home care.');
    return (
        <div className="min-h-screen">
            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#2d4a6f] to-[#4a90e2] text-white py-20 lg:py-32 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Compassionate Home Care<br />
                            <span className="text-[#d4af37]">Tailored to Your Family's Unique Needs</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg sm:text-xl mb-10 max-w-4xl mx-auto text-gray-200">
                            Veteran-Owned, Non-Medical In-Home Care in Austin & Surrounding Areas (Region 7). Every care plan is uniquely yours — 
                            because your loved one deserves more than a package off the shelf.
                        </p>

                        {/* Mission Statement Box - Glassmorphism */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="max-w-3xl mx-auto mb-12 p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl"
                        >
                            <p className="text-base sm:text-lg italic leading-relaxed">
                                "To transform home care in Central Texas by delivering personalized, compassionate support 
                                that honors dignity, independence, and the unique needs of every individual and family we serve."
                            </p>
                        </motion.div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col items-center gap-2"
                            >
                                <Clock className="w-10 h-10 text-[#d4af37]" />
                                <span className="font-semibold">24/7 Availability</span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col items-center gap-2"
                            >
                                <Heart className="w-10 h-10 text-[#d4af37]" />
                                <span className="font-semibold">100% Custom Care Plans</span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-col items-center gap-2"
                            >
                                <Shield className="w-10 h-10 text-[#d4af37]" />
                                <span className="font-semibold">Trained & Credentialed</span>
                            </motion.div>
                        </div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
                        >
                            <a href={createPageUrl('Contact')}>
                                <Button size="lg" className="bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f] font-bold text-lg px-8 py-6 shadow-xl">
                                    Request Your Free Care Assessment
                                </Button>
                            </a>
                            <a href="tel:5124360774">
                                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-6">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Call Us Now: (512) 436-0774
                                </Button>
                            </a>
                        </motion.div>

                        {/* Badges Row */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-semibold">
                                🇺🇸 Veteran Owned
                            </div>
                            <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-semibold">
                                TX Licensed #023937
                            </div>
                            <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-semibold">
                                Fully Insured & Bonded
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* TRUST BADGES SECTION */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center"
                        >
                            <Award className="w-12 h-12 text-[#4a90e2] mb-3" />
                            <p className="text-sm font-semibold text-[#2d3436]">TX Licensed<br />#023937</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col items-center text-center"
                        >
                            <Flag className="w-12 h-12 text-[#4a90e2] mb-3" />
                            <p className="text-sm font-semibold text-[#2d3436]">Veteran Owned<br />& Operated</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center text-center"
                        >
                            <Stethoscope className="w-12 h-12 text-[#4a90e2] mb-3" />
                            <p className="text-sm font-semibold text-[#2d3436]">RN Supervised<br />Care</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col items-center text-center"
                        >
                            <Lock className="w-12 h-12 text-[#4a90e2] mb-3" />
                            <p className="text-sm font-semibold text-[#2d3436]">Fully Insured<br />& Bonded</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col items-center text-center"
                        >
                            <Star className="w-12 h-12 text-[#d4af37] mb-3 fill-[#d4af37]" />
                            <p className="text-sm font-semibold text-[#2d3436]">5-Star Rated<br />Care</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* VALUE PROPOSITION SECTION */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl font-bold text-center text-[#1e3a5f] mb-16"
                    >
                        Why Families Choose Caring Hands
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-8 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center mb-6">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">
                                100% Custom Care Plans
                            </h3>
                            <p className="text-[#2d3436] leading-relaxed">
                                We don't sell packages — we build partnerships. Your loved one gets a care plan designed 
                                specifically for their needs, not a pre-made template.
                            </p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-8 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center mb-6">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">
                                Veteran-Led Compassion
                            </h3>
                            <p className="text-[#2d3436] leading-relaxed">
                                Our founder is a disabled veteran who understands dignity, respect, and what it means 
                                to serve. That ethos runs through everything we do.
                            </p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="p-8 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center mb-6">
                                <Stethoscope className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1e3a5f] mb-4">
                                Professional Care Team
                            </h3>
                            <p className="text-[#2d3436] leading-relaxed">
                                Trained, screened, and credentialed home care professionals. Your family gets 
                                quality non-medical care in the comfort of home.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CARE IN ACTION SECTION */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Care in Action
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            See the compassionate care we provide every day
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-xl overflow-hidden shadow-lg"
                        >
                            <img 
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/37fc542e2_asset_h4l56o33j_1769472006706.png"
                                alt="Medication management support"
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
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/4eef095dd_asset_hbxqxae60_1769472006706.png"
                                alt="Veteran care services"
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
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/e192ab2b4_asset_kzf3mi8bz_1769472006706.png"
                                alt="Mobility assistance"
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
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/9e2211fec_asset_neneqj5hf_1769472006706.png"
                                alt="Companionship activities"
                                className="w-full h-64 object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section className="py-20 bg-[#1e3a5f] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Real Stories, Real Peace of Mind
                        </h2>
                        <p className="text-lg text-gray-300">
                            Hear from families who trust us with their loved ones
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200"></div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1e3a5f]">Maria Rodriguez</h4>
                                    <p className="text-sm text-gray-600">Daughter caring for father with dementia</p>
                                </div>
                            </div>
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
                                ))}
                            </div>
                            <p className="text-[#2d3436] italic leading-relaxed">
                                "Caring Hands didn't give us a generic package — they sat with us, listened to my father's 
                                specific needs, and created a plan that felt like it was designed just for him. Some weeks he 
                                needs more support, some weeks less. They adapt, and we only pay for what he actually needs. 
                                That's integrity."
                            </p>
                        </motion.div>

                        {/* Testimonial 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-blue-200 to-indigo-200"></div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1e3a5f]">Col. James Thompson (Ret.)</h4>
                                    <p className="text-sm text-gray-600">U.S. Army Veteran, Client</p>
                                </div>
                            </div>
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
                                ))}
                            </div>
                            <p className="text-[#2d3436] italic leading-relaxed">
                                "As a veteran, I was skeptical about accepting help. But the founder being a 100% disabled 
                                veteran himself made all the difference. My caregiver doesn't treat me like I'm broken — it's 
                                not about what I can't do anymore, it's about what I still CAN do. That dignity matters."
                            </p>
                        </motion.div>

                        {/* Testimonial 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-green-200 to-teal-200"></div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1e3a5f]">Robert Martinez</h4>
                                    <p className="text-sm text-gray-600">Son caring for stroke survivor mother</p>
                                </div>
                            </div>
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
                                ))}
                            </div>
                            <p className="text-[#2d3436] italic leading-relaxed">
                                "After Mom's stroke, we were overwhelmed. Caring Hands walked us through everything — medication 
                                management, physical therapy exercises, meal planning. They didn't just send a caregiver, they 
                                became part of our family. I finally sleep at night knowing Mom is safe and happy."
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SERVICES PREVIEW SECTION */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Custom Care Solutions for Every Need
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            We build your care plan from these flexible services
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Service Card 1 - Live-In Care */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl hover:border-[#d4af37] border-2 border-transparent transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center mb-4">
                                <Moon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">
                                Live-In Care
                            </h3>
                            <p className="text-[#2d3436] mb-6 leading-relaxed">
                                24/7 support in your home. Perfect for clients needing around-the-clock supervision and assistance.
                            </p>
                            <a href={createPageUrl('Contact') + '?service=Live-In Care'}>
                                <Button variant="ghost" className="text-[#4a90e2] group-hover:text-[#d4af37] font-semibold p-0">
                                    Request Care Plan <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </a>
                        </motion.div>

                        {/* Service Card 2 - 20+ Hours Weekly */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl hover:border-[#d4af37] border-2 border-transparent transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center mb-4">
                                <Calendar className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">
                                20+ Hours Weekly
                            </h3>
                            <p className="text-[#2d3436] mb-6 leading-relaxed">
                                Consistent weekly support for medication management, meals, mobility, and companionship.
                            </p>
                            <a href={createPageUrl('Contact') + '?service=20+ Hours Weekly'}>
                                <Button variant="ghost" className="text-[#4a90e2] group-hover:text-[#d4af37] font-semibold p-0">
                                    Request Care Plan <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </a>
                        </motion.div>

                        {/* Service Card 3 - Companionship Care */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl hover:border-[#d4af37] border-2 border-transparent transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center mb-4">
                                <Heart className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">
                                Companionship Care
                            </h3>
                            <p className="text-[#2d3436] mb-6 leading-relaxed">
                                Combat loneliness with conversation, activities, outings, and emotional support.
                            </p>
                            <a href={createPageUrl('Contact') + '?service=Companionship Care'}>
                                <Button variant="ghost" className="text-[#4a90e2] group-hover:text-[#d4af37] font-semibold p-0">
                                    Request Care Plan <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </a>
                        </motion.div>

                        {/* Service Card 4 - Personal Care (ADLs) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl hover:border-[#d4af37] border-2 border-transparent transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center mb-4">
                                <HandHeart className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">
                                Personal Care (ADLs)
                            </h3>
                            <p className="text-[#2d3436] mb-6 leading-relaxed">
                                Bathing, dressing, grooming, toileting, and mobility assistance with dignity and respect.
                            </p>
                            <a href={createPageUrl('Contact') + '?service=Personal Care'}>
                                <Button variant="ghost" className="text-[#4a90e2] group-hover:text-[#d4af37] font-semibold p-0">
                                    Request Care Plan <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </a>
                        </motion.div>

                        {/* Service Card 5 - Meal Planning & Prep */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl hover:border-[#d4af37] border-2 border-transparent transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center mb-4">
                                <Utensils className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">
                                Meal Planning & Prep
                            </h3>
                            <p className="text-[#2d3436] mb-6 leading-relaxed">
                                Nutrition-focused meal preparation tailored to dietary restrictions and preferences.
                            </p>
                            <a href={createPageUrl('Contact') + '?service=Meal Planning'}>
                                <Button variant="ghost" className="text-[#4a90e2] group-hover:text-[#d4af37] font-semibold p-0">
                                    Request Care Plan <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}