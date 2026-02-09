import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Map, Phone, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VeteransResources() {
    const resources = [
        {
            category: "VA Benefits & Disability",
            items: [
                { name: "VA Benefits Website", description: "www.va.gov - All VA programs, applications, and information" },
                { name: "VA Benefits Hotline", description: "1-800-827-1000 - Questions about benefits and applications" },
                { name: "Veterans Crisis Line", description: "988 then press 1 - 24/7 crisis counseling and support" }
            ]
        },
        {
            category: "Veterans Service Organizations (Free Help)",
            items: [
                { name: "American Legion", description: "Veteran Service Officers help with VA claims at no cost; local chapters throughout Texas" },
                { name: "Veterans of Foreign Wars (VFW)", description: "Service officers, peer support, community programs" },
                { name: "Disabled American Veterans (DAV)", description: "Benefits counseling, representation for appeals" },
                { name: "Texas Veterans Commission", description: "512-463-5538 - State programs, benefits, and support" }
            ]
        },
        {
            category: "Healthcare & Mental Health",
            items: [
                { name: "VA Medical Centers (Texas)", description: "Houston, Dallas, San Antonio, Austin VA facilities for eligible veterans" },
                { name: "Veterans Crisis Line", description: "988 then press 1 - Free 24/7 mental health crisis support" },
                { name: "Veterans Health Information System", description: "www.va.gov - Telehealth appointments and records" }
            ]
        },
        {
            category: "Housing Assistance",
            items: [
                { name: "VA Home Loan Program", description: "No-money-down mortgages for veterans; purchase or refinance" },
                { name: "HUD-VASH Program", description: "Housing vouchers for veterans experiencing homelessness" },
                { name: "Texas Veterans Housing", description: "Low-income housing for Texas veterans and families" }
            ]
        },
        {
            category: "Employment & Training",
            items: [
                { name: "Veterans Employment Service", description: "1-866-4JOBS-VET - Job placement and training programs" },
                { name: "Vocational Rehabilitation (VR&E)", description: "Education and training for service-connected disabled veterans" },
                { name: "Hire Our Heroes Program", description: "Networking and job fairs for military-connected professionals" }
            ]
        },
        {
            category: "Education Benefits",
            items: [
                { name: "GI Bill Benefits", description: "Education assistance for college, vocational, or on-the-job training" },
                { name: "VA Education Hotline", description: "1-888-442-4551 - Questions about GI Bill and education programs" }
            ]
        },
        {
            category: "Caregiver Support",
            items: [
                { name: "VA Caregiver Support Line", description: "1-855-227-3986 - Support for family caregivers of veterans" },
                { name: "Program of Comprehensive Assistance for Family Caregivers", description: "Benefits for families caring for post-9/11 combat veterans" }
            ]
        },
        {
            category: "Local Austin/Central Texas Resources",
            items: [
                { name: "Austin VA Medical Center", description: "4110 Guadalupe St, Austin 78751 | 512-389-1800" },
                { name: "Central Texas Veterans Health Care", description: "Services in Austin, Round Rock, Temple, and surrounding areas" },
                { name: "Area Agency on Aging", description: "512-916-6000 - Aging and disability services including veteran support" },
                { name: "Veteran Service Officers", description: "Travis, Williamson, and Hays County offices provide free VA claim help" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <section className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to={createPageUrl('Resources')} className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Resources
                    </Link>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                <Map className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-200 mb-1">Veterans Benefits</p>
                                <p className="text-sm text-gray-300">8 minute read • Written by Daniel Ford, Disabled U.S. Military Veteran (7+ years service)</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Resources for Disabled Veterans and Their Families
                        </h1>
                        <p className="text-xl text-gray-200">
                            Comprehensive directory of Texas resources for disabled vets including healthcare, housing, and support
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                            Veterans and their families have access to extensive benefits and services—but knowing where to find them can be challenging. 
                            This comprehensive directory connects you to healthcare, benefits, housing, employment, and support resources available 
                            in Texas and nationwide.
                        </p>

                        <div className="bg-[#f8f9fa] rounded-xl p-6 mb-12 border-l-4 border-[#4a90e2]">
                            <p className="text-[#2d3436] mb-0">
                                <strong>Start Here:</strong> When in doubt, contact your local Veteran Service Officer (VSO). 
                                They're trained professionals who provide FREE help connecting you to all available benefits. 
                                Find your county VSO through the Texas Veterans Commission or American Legion.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {resources.map((section, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                                >
                                    <h2 className="text-xl font-bold text-[#1e3a5f] mb-4">{section.category}</h2>
                                    <div className="space-y-4">
                                        {section.items.map((item, i) => (
                                            <div key={i} className="border-b border-gray-200 pb-4 last:border-0">
                                                <p className="font-bold text-[#1e3a5f] mb-1">{item.name}</p>
                                                <p className="text-[#2d3436] text-sm">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white mt-12">
                            <h2 className="text-2xl font-bold mb-4">Quick Action Steps</h2>
                            <ol className="space-y-3 text-gray-200">
                                <li><strong>1. Gather Documents:</strong> Locate your DD-214 and any disability rating letters</li>
                                <li><strong>2. Contact VSO:</strong> Find your county Veteran Service Officer for free guidance</li>
                                <li><strong>3. Explore Benefits:</strong> Learn what you might qualify for (disability, healthcare, housing)</li>
                                <li><strong>4. Apply Early:</strong> Processing takes months—apply now even if you don't need benefits immediately</li>
                                <li><strong>5. Get Support:</strong> Connect with veteran organizations and support groups</li>
                                <li><strong>6. Ask Questions:</strong> Don't assume you don't qualify—let professionals evaluate your eligibility</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">We Understand Veterans' Needs</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        As a veteran-owned home care company, we specialize in serving Texas veterans and their families
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                                Learn About Our Services
                            </Button>
                        </a>
                        <a href="tel:5124360774">
                            <Button size="lg" variant="outline" className="border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white">
                                <Phone className="w-5 h-5 mr-2" />
                                Call (512) 436-0774
                            </Button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}