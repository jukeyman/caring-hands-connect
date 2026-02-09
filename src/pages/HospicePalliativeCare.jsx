import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Heart, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HospicePalliativeCare() {
    const comparison = [
        {
            aspect: "Primary Goal",
            palliative: "Relieve pain and suffering while pursuing curative treatment",
            hospice: "Comfort and dignity when cure is no longer possible"
        },
        {
            aspect: "Cure Focused?",
            palliative: "Yes, combined with comfort care",
            hospice: "No, shifted from cure to comfort"
        },
        {
            aspect: "Prognosis",
            palliative: "Can start at any stage of serious illness",
            hospice: "Typically 6 months or less to live (prognosis-based)"
        },
        {
            aspect: "Where Care Happens",
            palliative: "Hospitals, clinics, home, any setting",
            hospice: "Primarily at home, can be facility or hospice center"
        },
        {
            aspect: "Medical Interventions",
            palliative: "Full range including chemo, surgery, medication",
            hospice: "Comfort medications only (pain, nausea, anxiety)"
        },
        {
            aspect: "Duration",
            palliative: "Weeks to years, can be ongoing",
            hospice: "Typically weeks to months"
        },
        {
            aspect: "Focus Areas",
            palliative: "Pain, side effects, emotional support",
            hospice: "Pain, emotional, spiritual, family support"
        },
        {
            aspect: "Insurance Coverage",
            palliative: "Often covered, varies by insurance",
            hospice: "Medicare/Medicaid typically cover 100%"
        }
    ];

    const hospiceServices = [
        "Nurse visits 2-3 times weekly (24/7 on-call)",
        "Home health aide assistance with personal care",
        "Spiritual and emotional counseling",
        "Medications for pain, nausea, anxiety, shortness of breath",
        "Medical equipment (hospital bed, oxygen, etc.)",
        "Volunteer support for patient and family",
        "Bereavement support for 12+ months after death"
    ];

    const decisionFactors = [
        "Has the patient been told a cure is no longer possible?",
        "Is comfort the primary goal rather than prolonging life?",
        "Would the family benefit from additional support at home?",
        "Is the patient interested in addressing life completion issues?",
        "Does the patient want to be at home in final weeks/months?",
        "Can the family accept the approaching death?",
        "Are there emotional, spiritual, or practical needs unmet?"
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
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-200 mb-1">End-of-Life Planning</p>
                                <p className="text-sm text-gray-300">6 minute read</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Hospice vs. Palliative Care: Understanding the Difference
                        </h1>
                        <p className="text-xl text-gray-200">
                            Clear explanations of these two care types and how to know which is right for your loved one
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                            When a serious illness becomes terminal, families face difficult decisions about the best care approach. 
                            Two terms—palliative care and hospice—are often confused because they share similar goals: alleviating pain 
                            and focusing on comfort. However, they differ in timing, intensity, and when they're appropriate. Understanding 
                            these distinctions can help you make the right choice for your loved one.
                        </p>

                        <div className="bg-[#f8f9fa] rounded-xl p-6 mb-12 border-l-4 border-[#4a90e2]">
                            <p className="text-[#2d3436] mb-0">
                                <strong>Key Distinction:</strong> Palliative care can be provided alongside curative treatment at any stage of 
                                serious illness. Hospice is chosen when cure is no longer the goal and the focus shifts entirely to comfort in 
                                the final chapter of life.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Side-by-Side Comparison</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-[#1e3a5f] text-white">
                                            <th className="border border-gray-300 p-3 text-left">Aspect</th>
                                            <th className="border border-gray-300 p-3 text-left">Palliative Care</th>
                                            <th className="border border-gray-300 p-3 text-left">Hospice Care</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparison.map((row, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fa]'}>
                                                <td className="border border-gray-300 p-3 font-bold text-[#1e3a5f]">{row.aspect}</td>
                                                <td className="border border-gray-300 p-3 text-[#2d3436]">{row.palliative}</td>
                                                <td className="border border-gray-300 p-3 text-[#2d3436]">{row.hospice}</td>
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
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">What Hospice Care Includes</h2>
                            <ul className="space-y-3">
                                {hospiceServices.map((service, index) => (
                                    <li key={index} className="flex items-start gap-3 text-[#2d3436]">
                                        <CheckCircle className="w-5 h-5 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                        <span>{service}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white mb-12">
                            <h2 className="text-2xl font-bold mb-6">Is Your Loved One Ready for Hospice?</h2>
                            <p className="text-gray-200 mb-4">Consider these questions:</p>
                            <ul className="space-y-3 text-gray-200">
                                {decisionFactors.map((factor, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="text-[#d4af37] font-bold flex-shrink-0">•</span>
                                        <span>{factor}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-[#f8f9fa] rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Common Hospice Myths</h2>
                            <div className="space-y-4 text-[#2d3436]">
                                <div>
                                    <p className="font-bold mb-1">Myth: "Choosing hospice means giving up."</p>
                                    <p className="text-sm">Truth: Choosing hospice means shifting focus to what matters most—dignity, comfort, and meaningful time together. It's a brave choice about priorities.</p>
                                </div>
                                <div>
                                    <p className="font-bold mb-1">Myth: "Hospice hastens death."</p>
                                    <p className="text-sm">Truth: Studies show hospice patients live as long as those pursuing aggressive treatment, with better quality of life and less suffering.</p>
                                </div>
                                <div>
                                    <p className="font-bold mb-1">Myth: "We can only do hospice at the end."</p>
                                    <p className="text-sm">Truth: Earlier hospice enrollment means more time for symptom management, family support, and life completion conversations.</p>
                                </div>
                                <div>
                                    <p className="font-bold mb-1">Myth: "Hospice is just pain management."</p>
                                    <p className="text-sm">Truth: Modern hospice is comprehensive—managing physical, emotional, spiritual, and practical needs for patient and family.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Need Guidance on Care Options?</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        We can help you explore what's best for your loved one
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                                Request Consultation
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