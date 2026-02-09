import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Award, Phone, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VAAidAttendance() {
    const benefits = [
        { benefit: "Aid & Attendance", amount: "Up to $2,266/month", eligible: "Veterans needing personal care assistance" },
        { benefit: "Housebound", amount: "Up to $1,381/month", eligible: "Veterans unable to leave home safely" },
        { benefit: "Spouse Aid & Attendance", amount: "Up to $1,366/month", eligible: "Spouse of qualifying veteran" },
        { benefit: "Child Aid & Attendance", amount: "Up to $462/month", eligible: "Dependent children" }
    ];

    const qualifications = [
        "Served on active duty (not just training)",
        "Discharge was honorable (not dishonorable)",
        "90+ days of service during a wartime period (or current active duty)",
        "Unable to carry out personal care without help OR confined to home/bed",
        "Meet income/asset requirements (limits allow most to qualify)"
    ];

    const disabilities = [
        "Blindness (not just vision loss)",
        "Loss of limbs",
        "Paralysis",
        "Severe arthritis limiting movement",
        "Heart or lung disease affecting mobility",
        "Dementia or cognitive impairment requiring supervision",
        "Multiple service-connected disabilities totaling 60%+"
    ];

    const whyApply = [
        { reason: "Covers Home Care Costs", detail: "$2,266/month can pay for caregivers, companions, or in-home care" },
        { reason: "No Means Test Required", detail: "Disability rating, not just service-connected, qualifies you" },
        { reason: "Tax-Free Income", detail: "All VA benefits are tax-free" },
        { reason: "Improves Quality of Life", detail: "Allows aging in place instead of facility care" },
        { reason: "Retroactive Benefits", detail: "Can receive back pay to date of eligibility" },
        { reason: "Spouse/Dependents Covered", detail: "Extended benefits for family members" }
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
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-200 mb-1">Veterans Benefits</p>
                                <p className="text-sm text-gray-300">12 minute read • Written by Daniel Ford, Disabled U.S. Military Veteran (7+ years service)</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            VA Aid and Attendance Benefits: Complete Guide for Texas Veterans
                        </h1>
                        <p className="text-xl text-gray-200">
                            How to qualify for up to $2,266/month in VA benefits to help pay for home care services
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                            Many veterans don't realize they qualify for substantial monthly benefits specifically designed to pay for in-home care. 
                            The VA's Aid and Attendance (A&A) benefit provides up to $2,266 per month to veterans who need help with daily living tasks 
                            or are unable to leave home. This guide explains who qualifies, how to apply, and how to maximize your benefits.
                        </p>

                        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-12">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-blue-900 mb-2">Critical Fact About VA Benefits</h3>
                                    <p className="text-sm text-blue-800">
                                        Over 60% of eligible Texas veterans never apply because they don't know they qualify. 
                                        The waiting process is slow—applications can take 4-12 months—so apply now even if you don't 
                                        need benefits immediately. You'll receive back pay to the approval date.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Current Benefit Amounts (2026)</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {benefits.map((item, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow border border-gray-200 p-4">
                                        <p className="font-bold text-[#1e3a5f] mb-1">{item.benefit}</p>
                                        <p className="text-[#d4af37] font-bold mb-2">{item.amount}</p>
                                        <p className="text-sm text-[#2d3436]">{item.eligible}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-600 mt-4">*Amounts increase each year with COLA (Cost of Living Adjustment)</p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-12"
                        >
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Who Qualifies: Service Requirements</h2>
                            <ul className="space-y-3">
                                {qualifications.map((qual, index) => (
                                    <li key={index} className="flex items-start gap-3 text-[#2d3436]">
                                        <CheckCircle className="w-5 h-5 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                        <span>{qual}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Medical Conditions That Qualify</h2>
                            <p className="text-[#2d3436] mb-4">You may qualify with any of these conditions:</p>
                            <ul className="space-y-2">
                                {disabilities.map((disability, index) => (
                                    <li key={index} className="flex items-start gap-3 text-[#2d3436]">
                                        <CheckCircle className="w-5 h-5 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                        <span>{disability}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white mb-12">
                            <h2 className="text-2xl font-bold mb-6">Why You Should Apply Now</h2>
                            <div className="space-y-4">
                                {whyApply.map((item, index) => (
                                    <div key={index} className="border-b border-white/20 pb-4 last:border-0">
                                        <p className="font-bold text-[#d4af37] mb-1">{item.reason}</p>
                                        <p className="text-sm text-gray-200">{item.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#f8f9fa] rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Income and Asset Limits</h2>
                            <div className="space-y-3 text-[#2d3436]">
                                <p><strong>Good news:</strong> The income limits are quite generous for veterans with care needs.</p>
                                <p><strong>Countable Income (2026):</strong> Single veteran with A&A can earn up to approximately $30,000/year</p>
                                <p><strong>Countable Assets:</strong> Up to $123,613 (excludes primary home, one vehicle)</p>
                                <p><strong>Example:</strong> A veteran with $40,000/year in military pension might still qualify after deducting medical expenses</p>
                                <p className="text-sm mt-4"><strong>Contact VA directly</strong> to verify your specific situation—eligibility is case-by-case</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Ready to Apply for VA Benefits?</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        We can help you navigate the application process and connect with VA resources
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                                Get Application Help
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