import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Home as HomeIcon, CheckCircle, Phone, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomeModificationsSeniors() {
    const modifications = [
        {
            area: "Bathroom Safety",
            priority: "Critical",
            upgrades: [
                { item: "Grab bars in shower and near toilet", cost: "$50-200", impact: "Prevents 70% of bathroom falls" },
                { item: "Non-slip mats and adhesive strips", cost: "$20-60", impact: "Essential wet surface traction" },
                { item: "Walk-in shower or tub with seat", cost: "$3,000-10,000", impact: "Eliminates dangerous step-over" },
                { item: "Raised toilet seat with arms", cost: "$50-150", impact: "Reduces strain, prevents falls" },
                { item: "Handheld showerhead", cost: "$30-100", impact: "Enables seated bathing" }
            ]
        },
        {
            area: "Lighting Improvements",
            priority: "High",
            upgrades: [
                { item: "Motion-sensor night lights", cost: "$15-40 each", impact: "Prevents nighttime falls" },
                { item: "Increased wattage in all rooms", cost: "$50-200", impact: "Improves visibility, reduces accidents" },
                { item: "Light switches at room entrances", cost: "$100-300", impact: "No dark navigation needed" },
                { item: "Under-cabinet kitchen lighting", cost: "$60-200", impact: "Illuminates work surfaces" },
                { item: "Lighted stairways with handrails", cost: "$200-800", impact: "Critical fall prevention" }
            ]
        },
        {
            area: "Accessibility Modifications",
            priority: "High",
            upgrades: [
                { item: "Ramps for entry steps", cost: "$1,000-3,000", impact: "Wheelchair/walker access" },
                { item: "Wider doorways (36 inches)", cost: "$300-1,000 per door", impact: "Walker/wheelchair passage" },
                { item: "Lever-style door handles", cost: "$20-50 per handle", impact: "Easier grip for arthritis" },
                { item: "Single-story living setup", cost: "Varies", impact: "Eliminates stair navigation" },
                { item: "Lowered light switches/thermostats", cost: "$100-300", impact: "Wheelchair accessibility" }
            ]
        },
        {
            area: "Kitchen Safety",
            priority: "Medium",
            upgrades: [
                { item: "Pull-out shelves in cabinets", cost: "$100-400", impact: "Reduces bending/reaching" },
                { item: "Anti-scald faucet devices", cost: "$30-80", impact: "Prevents burns" },
                { item: "Contrasting countertop edges", cost: "$50-150", impact: "Visual depth perception" },
                { item: "Front-control stove/range", cost: "$600-2,000", impact: "Safer than reaching over burners" },
                { item: "Task lighting over work areas", cost: "$100-300", impact: "Improves food prep safety" }
            ]
        },
        {
            area: "Smart Home Technology",
            priority: "Medium-High",
            upgrades: [
                { item: "Smart door locks", cost: "$150-300", impact: "Remote access for emergencies" },
                { item: "Video doorbell system", cost: "$100-250", impact: "Screen visitors safely" },
                { item: "Smart thermostat", cost: "$150-250", impact: "Remote temperature control" },
                { item: "Voice-controlled lights/devices", cost: "$50-200", impact: "Hands-free operation" },
                { item: "Medical alert system", cost: "$25-50/month", impact: "24/7 emergency response" }
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
                                <HomeIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-200 mb-1">Aging in Place</p>
                                <p className="text-sm text-gray-300">9 minute read</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Home Modifications for Seniors: Safety and Accessibility
                        </h1>
                        <p className="text-xl text-gray-200">
                            Essential upgrades from grab bars to smart home technology that help seniors age safely at home
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                            Most seniors want to age in place—staying in their own homes rather than moving to assisted living facilities. 
                            With the right modifications, this is not only possible but can be safer and more comfortable than ever. 
                            This guide covers essential upgrades organized by priority and impact, helping you create a home that supports 
                            independence while minimizing risks.
                        </p>

                        <div className="bg-[#f8f9fa] rounded-xl p-6 mb-12 border-l-4 border-[#4a90e2]">
                            <p className="text-[#2d3436] mb-0">
                                <strong>Investment Tip:</strong> Start with high-priority, low-cost modifications first. Many simple changes 
                                like grab bars and lighting cost under $500 but dramatically reduce fall risk. Save major renovations for later 
                                as needs evolve.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {modifications.map((section, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-[#1e3a5f]">{section.area}</h2>
                                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                            section.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                            section.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                            section.priority === 'Medium-High' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                            {section.priority} Priority
                                        </span>
                                    </div>
                                    <div className="space-y-4">
                                        {section.upgrades.map((upgrade, i) => (
                                            <div key={i} className="bg-[#f8f9fa] rounded-lg p-4">
                                                <div className="flex items-start justify-between gap-4 mb-2">
                                                    <h3 className="font-bold text-[#1e3a5f] flex-1">{upgrade.item}</h3>
                                                    <span className="text-[#d4af37] font-semibold whitespace-nowrap">{upgrade.cost}</span>
                                                </div>
                                                <p className="text-sm text-[#2d3436] flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                                    {upgrade.impact}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-16 bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white">
                            <h2 className="text-2xl font-bold mb-6">Funding Your Home Modifications</h2>
                            <div className="grid md:grid-cols-2 gap-6 text-gray-200">
                                <div>
                                    <h3 className="font-bold mb-3">Potential Funding Sources:</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li>• Medicare (for medically necessary modifications)</li>
                                        <li>• Medicaid waiver programs</li>
                                        <li>• Veterans Affairs (VA) grants</li>
                                        <li>• State aging and disability programs</li>
                                        <li>• Home equity loans or lines of credit</li>
                                        <li>• Nonprofit organizations</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-3">Tax Benefits:</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li>• Medical expense deductions (IRS Publication 502)</li>
                                        <li>• Home improvement tax credits</li>
                                        <li>• Energy-efficient upgrade incentives</li>
                                        <li>• State-specific senior tax breaks</li>
                                        <li>• Dependent care tax credit</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 bg-[#f8f9fa] rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">DIY vs. Professional Installation</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-bold text-[#4a90e2] mb-3">Safe DIY Projects:</h3>
                                    <ul className="space-y-2 text-sm text-[#2d3436]">
                                        <li>✓ Non-slip mats and adhesive strips</li>
                                        <li>✓ Night lights and plug-in lighting</li>
                                        <li>✓ Lever door handle replacements</li>
                                        <li>✓ Removing throw rugs and clutter</li>
                                        <li>✓ Installing smart home devices</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#d4af37] mb-3">Hire a Professional:</h3>
                                    <ul className="space-y-2 text-sm text-[#2d3436]">
                                        <li>✓ Grab bar installation (proper anchoring critical)</li>
                                        <li>✓ Electrical work and hardwired lighting</li>
                                        <li>✓ Stairlifts and ramps</li>
                                        <li>✓ Walk-in tubs and accessible showers</li>
                                        <li>✓ Doorway widening and structural changes</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Need Help Assessing Your Home?</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        Our team can evaluate your home and recommend the most important safety modifications
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                                Request Free Home Assessment
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