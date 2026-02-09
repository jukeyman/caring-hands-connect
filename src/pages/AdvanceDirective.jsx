import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { FileText, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdvanceDirective() {
    const steps = [
        {
            step: "1",
            title: "Understand Your Options",
            description: "Know what types of directives are available and which fit your values"
        },
        {
            step: "2",
            title: "Have Personal Conversations",
            description: "Talk with loved ones about your wishes before documenting"
        },
        {
            step: "3",
            title: "Choose Your Healthcare Agent",
            description: "Select someone trustworthy who will honor your wishes"
        },
        {
            step: "4",
            title: "Document Your Wishes",
            description: "Complete the official legal forms for your state"
        },
        {
            step: "5",
            title: "Get Witness Signatures",
            description: "Follow Texas requirements for valid documentation"
        },
        {
            step: "6",
            title: "Share Copies",
            description: "Give to doctor, agent, family, and keep original safe"
        }
    ];

    const document = [
        {
            type: "Living Will",
            description: "Document your wishes about life-sustaining treatment if you can't communicate",
            includes: [
                "Preferences for CPR, mechanical ventilation, feeding tubes",
                "Organ donation wishes",
                "Pain management preferences",
                "Applies only if you're terminally ill or in persistent vegetative state"
            ]
        },
        {
            type: "Durable Power of Attorney for Healthcare",
            description: "Legally appoint someone to make medical decisions on your behalf",
            includes: [
                "Can take effect immediately or when you become incapacitated",
                "Broader than living will—covers all healthcare decisions",
                "Your agent must follow your wishes and values",
                "Can be revoked anytime while you have capacity"
            ]
        },
        {
            type: "Do Not Resuscitate (DNR) Order",
            description: "Tell paramedics and medical staff not to perform CPR",
            includes: [
                "Critical for cardiac/respiratory conditions",
                "Honors your wishes if heart stops",
                "Wallet card available through Texas Health Steps",
                "Different from 'do not intubate' or 'comfort care only'"
            ]
        },
        {
            type: "HIPAA Authorization",
            description: "Allow doctors to share medical information with family",
            includes: [
                "Specifies which family members get information",
                "Necessary to discuss medical details with doctors",
                "Often included with healthcare power of attorney",
                "Without it, doctors can't talk to anyone"
            ]
        }
    ];

    const importantTopics = [
        { topic: "Life Support Decisions", description: "CPR, mechanical ventilation, feeding tubes, dialysis" },
        { topic: "Pain Management", description: "Willingness to use high-dose opioids even if life-shortening" },
        { topic: "Artificial Nutrition", description: "Feelings about feeding tubes or IV nutrition" },
        { topic: "Quality of Life", description: "What makes life worth living; when to stop treating" },
        { topic: "Organ/Tissue Donation", description: "Donation wishes; organ transplant desires" },
        { topic: "Funeral/Memorial", description: "Burial vs cremation, religious preferences, cost wishes" },
        { topic: "Financial", description: "Important accounts, bill payment, life insurance locations" },
        { topic: "Legacy", description: "Messages for family, unfinished business, forgiveness needed" }
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
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-200 mb-1">End-of-Life Planning</p>
                                <p className="text-sm text-gray-300">9 minute read</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Creating an Advance Directive: What You Need to Know
                        </h1>
                        <p className="text-xl text-gray-200">
                            Step-by-step guide to documenting healthcare wishes and ensuring they're legally binding in Texas
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                            An advance directive is a legal document that communicates your healthcare wishes if you become unable to make 
                            decisions. In Texas, it's one of the most important documents you can create—yet only 36% of adults have one. 
                            This guide walks you through the process step-by-step, making what seems overwhelming into a manageable task.
                        </p>

                        <div className="bg-[#f8f9fa] rounded-xl p-6 mb-12 border-l-4 border-[#4a90e2]">
                            <p className="text-[#2d3436] mb-0">
                                <strong>Critical Fact:</strong> Without an advance directive, doctors will do everything possible to extend your life, 
                                even if it contradicts your wishes. Your family may face agonizing decisions and potential disputes over your care.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">The 6-Step Process</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {steps.map((s, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * index }}
                                        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#4a90e2] text-white flex items-center justify-center font-bold mb-4">
                                            {s.step}
                                        </div>
                                        <h3 className="text-lg font-bold text-[#1e3a5f] mb-2">{s.title}</h3>
                                        <p className="text-[#2d3436] text-sm">{s.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Key Documents Explained</h2>
                            <div className="space-y-6">
                                {document.map((doc, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                                    >
                                        <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">{doc.type}</h3>
                                        <p className="text-[#2d3436] mb-4">{doc.description}</p>
                                        <ul className="space-y-2">
                                            {doc.includes.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-[#2d3436]">
                                                    <CheckCircle className="w-5 h-5 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white mb-12">
                            <h2 className="text-2xl font-bold mb-6">Important Topics to Address</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {importantTopics.map((item, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-[#d4af37] mb-1">{item.topic}</p>
                                        <p className="text-sm text-gray-200">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#f8f9fa] rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Texas-Specific Requirements</h2>
                            <div className="space-y-3 text-[#2d3436]">
                                <p><strong>Witnesses:</strong> Two witnesses (not family, not healthcare provider) must sign and date your living will</p>
                                <p><strong>Notarization:</strong> Living will should be notarized to prevent future disputes</p>
                                <p><strong>No Cost:</strong> Free forms available from State Bar of Texas and online resources</p>
                                <p><strong>Validity:</strong> Texas recognizes advance directives created in other states</p>
                                <p><strong>Update Schedule:</strong> Review every 3-5 years or after major life changes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Ready to Create Your Directive?</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        Free Texas forms and resources available—or we can help guide the conversation
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                                Get Planning Guidance
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