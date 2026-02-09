import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Scale, Phone, ArrowLeft, CheckCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VAVsPrivateCare() {
    const comparison = [
        {
            aspect: "Cost",
            va: "Up to $2,266/month; covers caregiving hours",
            private: "Average $20-30/hour; higher for specialized care"
        },
        {
            aspect: "Who Pays",
            va: "Government pays directly or reimburses veteran",
            private: "Veteran or family pays out-of-pocket"
        },
        {
            aspect: "Caregiver Selection",
            va: "VA assigns or limits choices based on availability",
            private: "Choose and interview caregivers; more flexibility"
        },
        {
            aspect: "Caregiver Training",
            va: "VA-trained staff meets federal standards",
            private: "Varies widely; you're responsible for vetting"
        },
        {
            aspect: "Scheduling",
            va: "Limited hours; less flexibility",
            private: "Can arrange 24/7 care as needed"
        },
        {
            aspect: "Availability",
            va: "Months-long waitlist in some areas",
            private: "Often available within days/weeks"
        },
        {
            aspect: "Supervision",
            va: "VA monitors quality and compliance",
            private: "You manage and oversee care quality"
        },
        {
            aspect: "Replacement Caregiver",
            va: "VA provides substitute if regular unavailable",
            private: "You arrange backup or go without"
        },
        {
            aspect: "Specialized Care",
            va: "Limited; may not cover all needs",
            private: "Full range of specialties available"
        },
        {
            aspect: "Paperwork",
            va: "Complex VA requirements and documentation",
            private: "Employment and tax paperwork required"
        }
    ];

    const choosingGuidelines = [
        "Can combine both: use VA benefits + private pay for additional hours",
        "Use VA for consistent baseline care",
        "Hire private caregivers for specialized needs VA doesn't cover",
        "Many veterans use VA to subsidize private home care company",
        "Example: VA pays $2,000/month, family pays additional $1,000 for premium agency care"
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
                                <Scale className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-200 mb-1">Veterans Benefits</p>
                                <p className="text-sm text-gray-300">7 minute read • Written by Daniel Ford, Disabled U.S. Military Veteran (7+ years service)</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            VA vs. Private Home Care: Understanding Your Options
                        </h1>
                        <p className="text-xl text-gray-200">
                            Comparing VA-provided care with private home health services to make an informed decision
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                            When qualifying for VA home care benefits, many veterans wonder: should I use VA-provided care or private caregivers? 
                            The answer isn't always black and white. Both options have advantages and limitations. Many veterans use a combination 
                            approach, maximizing benefits while supplementing with private care for flexibility and specialized needs.
                        </p>

                        <div className="bg-[#f8f9fa] rounded-xl p-6 mb-12 border-l-4 border-[#4a90e2]">
                            <p className="text-[#2d3436] mb-0">
                                <strong>Key Strategy:</strong> You don't have to choose one or the other. Use VA benefits as your financial foundation 
                                and supplement with private caregivers for additional hours, specialized skills, or flexibility. This hybrid approach 
                                gives you the best of both.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Side-by-Side Comparison</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-[#1e3a5f] text-white">
                                            <th className="border border-gray-300 p-3 text-left">Aspect</th>
                                            <th className="border border-gray-300 p-3 text-left">VA Care</th>
                                            <th className="border border-gray-300 p-3 text-left">Private Care</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparison.map((row, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fa]'}>
                                                <td className="border border-gray-300 p-3 font-bold text-[#1e3a5f]">{row.aspect}</td>
                                                <td className="border border-gray-300 p-3 text-[#2d3436]">{row.va}</td>
                                                <td className="border border-gray-300 p-3 text-[#2d3436]">{row.private}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-12"
                        >
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Best of Both: Hybrid Approach</h2>
                            <div className="space-y-3">
                                {choosingGuidelines.map((guideline, index) => (
                                    <li key={index} className="flex items-start gap-3 text-[#2d3436]" style={{listStyle: 'none'}}>
                                        <CheckCircle className="w-5 h-5 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                        <span>{guideline}</span>
                                    </li>
                                ))}
                            </div>
                        </motion.div>

                        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white mb-12">
                            <h2 className="text-2xl font-bold mb-6">Real-World Example: Making It Work</h2>
                            <div className="space-y-4 text-gray-200">
                                <p><strong>Situation:</strong> 72-year-old Navy veteran with arthritis and mobility issues needs daily assistance</p>
                                <p><strong>VA Benefit:</strong> Approved for $2,000/month Aid & Attendance benefit</p>
                                <p><strong>The Plan:</strong></p>
                                <ul className="ml-4 space-y-2">
                                    <li>• Use $2,000 to cover 4 hours/day of private caregiver (70 hours/month)</li>
                                    <li>• Private agency provides trained caregivers, background checks, substitutes</li>
                                    <li>• Can choose caregiver and schedule around family involvement</li>
                                    <li>• If family can add $500/month, veteran gets 95 hours/month instead of 70</li>
                                    <li>• Total monthly cost: only $500 instead of $2,000+ for private care alone</li>
                                </ul>
                                <p className="mt-4"><strong>Result:</strong> Veteran maintains independence at home with proper support at an affordable cost.</p>
                            </div>
                        </div>

                        <div className="bg-[#f8f9fa] rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">How to Decide What's Right for You</h2>
                            <div className="space-y-4 text-[#2d3436]">
                                <div>
                                    <p className="font-bold mb-2">Choose VA Care If:</p>
                                    <ul className="text-sm space-y-1 ml-4">
                                        <li>• Budget is limited and you need maximum financial help</li>
                                        <li>• You trust government-supervised care standards</li>
                                        <li>• Flexibility and caregiver choice aren't critical</li>
                                        <li>• You prefer consistent government oversight</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-bold mb-2">Choose Private Care If:</p>
                                    <ul className="text-sm space-y-1 ml-4">
                                        <li>• You need flexibility, longer hours, or 24/7 care</li>
                                        <li>• You want choice in selecting your caregiver</li>
                                        <li>• You need immediate care without waiting</li>
                                        <li>• You prefer specialized or personalized care</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-bold mb-2">Choose Both (Hybrid) If:</p>
                                    <ul className="text-sm space-y-1 ml-4">
                                        <li>• You qualify for VA benefits and can afford to supplement</li>
                                        <li>• You want financial help + flexibility and choice</li>
                                        <li>• You need more hours than VA will cover</li>
                                        <li>• You want best of both worlds</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Unsure Which Option Is Right for You?</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        We can help you navigate VA benefits and private care options to create the best plan
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                                Schedule Consultation
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