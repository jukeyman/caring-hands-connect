import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { 
    Target, Eye, Compass, Shield, Award, Flag, 
    CheckCircle, Users, Phone
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
    const teamMembers = [
        {
            name: "Daniel Ford",
            title: "Owner & CEO",
            email: "Danielf@caringhandshomehealthtx.com",
            bio: "Disabled U.S. military veteran with over 7 years of service. Founded Caring Hands in 2024 to bring dignity and respect to home care.",
            photo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/5c28b0146_IMG_6528.jpg"
        },
        {
            name: "Daneisha F.",
            title: "Administrator, RN",
            email: "Daneishaf@caringhandshomehealthtx.com",
            bio: "Registered Nurse with 5+ years experience in geriatric care and home health administration.",
            photo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/1b9b15423_asset_skuint6sr_1769472006706.png"
        },
        {
            name: "Derrick L.",
            title: "Alternate Administrator",
            email: "Derrickl@caringhandshomehealthtx.com",
            bio: "Dedicated administrator ensuring exceptional service delivery and regulatory compliance for families across the region.",
            photo: ""
        },
        {
            name: "Demetrius Huntspon",
            title: "Director of Operations",
            email: "Demetriush@caringhandshomehealthtx.com",
            bio: "Veteran with 22+ years of experience. Experienced project manager focused on care quality and caregiver support.",
            photo: ""
        }
    ];

    const values = [
        "Dignity: Every person deserves respect",
        "Integrity: Transparency, honesty, no surprises",
        "Compassion: We care deeply about our clients",
        "Excellence: RN-supervised, certified caregivers",
        "Flexibility: Care plans that adapt to changing needs"
    ];

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
                            We're More Than a Home Care Agency —<br />
                            <span className="text-[#d4af37]">We're Your Partners in Care</span>
                        </h1>
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                            Founded by a disabled veteran who understands dignity, service, and what it means to care 
                            for those who cared for us
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FOUNDER STORY SECTION */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-6">
                                Our Story: Why We Do This
                            </h2>
                            <div className="space-y-4 text-[#2d3436] leading-relaxed">
                                <p>
                                    Caring Hands Home Health was founded by Daniel Ford, a disabled U.S. military veteran 
                                    who served over 7 years in the armed forces. After his service, he witnessed firsthand the challenges 
                                    families face when trying to find compassionate, reliable home care for aging parents and disabled loved ones.
                                </p>
                                <p>
                                    Too many agencies treated care like a commodity — pre-packaged plans, hourly rates with hidden fees, 
                                    caregivers who barely knew their clients' names. Daniel knew there had to be a better way.
                                </p>
                                <p>
                                    In 2024, Caring Hands was born from a simple belief: <strong className="text-[#1e3a5f]">Every person 
                                    deserves care that honors their dignity, respects their independence, and adapts to their unique needs.</strong>
                                </p>
                                <p>
                                    As a veteran, Daniel built this company on the values learned in service: integrity, accountability, 
                                    and putting people first. Today, Caring Hands serves families across Austin & Surrounding Areas (Region 7), and 
                                    we're proud to say we've never lost sight of that original mission.
                                </p>
                            </div>
                        </motion.div>

                        {/* Founder Photo */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] rounded-2xl shadow-2xl overflow-hidden">
                                <img 
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/5c28b0146_IMG_6528.jpg"
                                    alt="Daniel F., Founder & CEO"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#d4af37] rounded-full opacity-20 blur-2xl"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* MISSION, VISION, VALUES SECTION */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Mission Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-[#4a90e2]"
                        >
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f] flex items-center justify-center mb-6">
                                <Target className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Our Mission</h2>
                            <p className="text-[#2d3436] leading-relaxed">
                                To transform home care in Central Texas by delivering personalized, compassionate support 
                                that honors dignity, independence, and the unique needs of every individual and family we serve.
                            </p>
                        </motion.div>

                        {/* Vision Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-[#d4af37]"
                        >
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center mb-6">
                                <Eye className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Our Vision</h2>
                            <p className="text-[#2d3436] leading-relaxed">
                                To become the most trusted home care provider in Texas, known for treating every client like 
                                family and every caregiver like a professional.
                            </p>
                        </motion.div>

                        {/* Values Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-[#1e3a5f]"
                        >
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] flex items-center justify-center mb-6">
                                <Compass className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Our Core Values</h2>
                            <ul className="space-y-3">
                                {values.map((value, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[#2d3436]">
                                        <CheckCircle className="w-5 h-5 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                        <span className="text-sm leading-relaxed">{value}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* TEAM SECTION */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Meet Our Leadership Team
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            Experienced, compassionate professionals dedicated to exceptional care
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                                    {member.photo ? (
                                        <img 
                                            src={member.photo} 
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Users className="w-24 h-24 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-[#1e3a5f] mb-1">{member.name}</h3>
                                    <p className="text-[#d4af37] font-semibold mb-2">{member.title}</p>
                                    <p className="text-xs text-[#4a90e2] mb-3">{member.email}</p>
                                    <p className="text-sm text-[#2d3436] leading-relaxed">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CREDENTIALS SECTION */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Licensed, Insured, and Trusted
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            Your peace of mind is our priority
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-xl p-6 shadow-md text-center"
                        >
                            <Award className="w-12 h-12 text-[#4a90e2] mx-auto mb-3" />
                            <p className="text-sm font-semibold text-[#2d3436]">
                                TX Licensed<br />Home Health Agency<br />#023937
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl p-6 shadow-md text-center"
                        >
                            <Shield className="w-12 h-12 text-[#4a90e2] mx-auto mb-3" />
                            <p className="text-sm font-semibold text-[#2d3436]">
                                Fully Insured<br />& Bonded
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-xl p-6 shadow-md text-center"
                        >
                            <CheckCircle className="w-12 h-12 text-[#4a90e2] mx-auto mb-3" />
                            <p className="text-sm font-semibold text-[#2d3436]">
                                Trained &<br />Credentialed<br />Caregivers
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-xl p-6 shadow-md text-center"
                        >
                            <CheckCircle className="w-12 h-12 text-[#4a90e2] mx-auto mb-3" />
                            <p className="text-sm font-semibold text-[#2d3436]">
                                Background<br />Checked<br />Caregivers
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="bg-white rounded-xl p-6 shadow-md text-center"
                        >
                            <Flag className="w-12 h-12 text-[#d4af37] mx-auto mb-3" />
                            <p className="text-sm font-semibold text-[#2d3436]">
                                Veteran-Owned<br />Business
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA SECTION */}
            <section className="py-20 bg-[#1e3a5f] text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                            Ready to Experience the Caring Hands Difference?
                        </h2>
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f] font-bold text-lg px-8 py-6 mb-4">
                                Request Your Free Care Assessment
                            </Button>
                        </a>
                        <p className="text-gray-300">
                            No obligation. No pressure. Just a conversation about how we can help.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}