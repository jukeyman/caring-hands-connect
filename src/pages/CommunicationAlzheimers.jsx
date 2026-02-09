import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { MessageCircle, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CommunicationAlzheimers() {
    const strategies = [
        { strategy: "Stay Calm & Patient", description: "Your tone sets the mood. Speak slowly, clearly, with warmth" },
        { strategy: "Use Simple, Clear Language", description: "Short sentences, common words, one topic at a time" },
        { strategy: "Ask Yes/No Questions", description: "Avoid open-ended questions they may struggle to answer" },
        { strategy: "Listen Without Correcting", description: "Don't argue about facts or correct their memory" },
        { strategy: "Use Visual Aids", description: "Photos, gestures, and pointing help understanding" },
        { strategy: "Validate Their Feelings", description: "Acknowledge emotions, even if logic doesn't match reality" },
        { strategy: "Offer Choices", description: "\"Would you like tea or coffee?\" gives control and engagement" },
        { strategy: "Use Their Name", description: "Personalize the conversation; it captures attention" }
    ];

    const whatToAvoid = [
        "Don't argue or correct errors—they can't remember anyway",
        "Don't ask \"Do you remember...?\"—likely triggers frustration",
        "Don't use medical jargon or complex explanations",
        "Don't speak about them to others as if they're not present",
        "Don't raise your voice—they hear fine, they understand less",
        "Don't take accusations or anger personally—it's the disease",
        "Don't test their memory or quiz them",
        "Don't ignore them or leave them in confusion"
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
                                <MessageCircle className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-200 mb-1">Alzheimer's & Dementia Care</p>
                                <p className="text-sm text-gray-300">5 minute read • Written by Daniel Ford, Disabled U.S. Military Veteran (7+ years service)</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Communication Tips for Alzheimer's Caregivers
                        </h1>
                        <p className="text-xl text-gray-200">
                            Effective strategies for connecting with loved ones experiencing memory loss and cognitive changes
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                        As Alzheimer's progresses, communication becomes increasingly difficult. Your loved one may struggle to find words, 
                        forget what you just said, or misunderstand your intentions. But connection is still possible—it just requires a different approach. 
                        These strategies help you stay connected even as language abilities decline.
                    </p>

                    <div className="bg-[#f8f9fa] rounded-xl p-6 mb-12 border-l-4 border-[#4a90e2]">
                        <p className="text-[#2d3436] mb-0">
                            <strong>Key Principle:</strong> In advanced dementia, communication becomes less about exchanging information 
                            and more about exchanging presence and emotion. Focus on connection, not correction.
                        </p>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">8 Communication Strategies That Work</h2>
                        <div className="space-y-4">
                            {strategies.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-lg shadow border border-gray-200 p-4"
                                >
                                    <p className="font-bold text-[#1e3a5f] mb-2">{item.strategy}</p>
                                    <p className="text-[#2d3436] text-sm">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-12">
                        <h2 className="font-bold text-red-900 mb-4">What NOT to Do</h2>
                        <ul className="space-y-2">
                            {whatToAvoid.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-red-800 text-sm">
                                    <span className="font-bold flex-shrink-0">✕</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white">
                        <h2 className="text-2xl font-bold mb-4">Communicating Through Late Stages</h2>
                        <p className="text-gray-200 mb-4">
                            When words fail, use non-verbal communication:
                        </p>
                        <ul className="text-gray-200 space-y-2">
                            <li>• Hold their hand or maintain gentle physical contact</li>
                            <li>• Make eye contact and smile</li>
                            <li>• Use warm, soothing tone of voice</li>
                            <li>• Play their favorite music</li>
                            <li>• Use touch, massage, or gentle movement</li>
                            <li>• Sit together in comfortable silence</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Professional Support Helps</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        Trained caregivers understand dementia communication and can provide respite
                    </p>
                    <a href={createPageUrl('Contact')}>
                        <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                            Learn More About Our Care
                        </Button>
                    </a>
                </div>
            </section>
        </div>
    );
}