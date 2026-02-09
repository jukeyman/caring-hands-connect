import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Users, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FamilyEndOfLifeConversation() {
    const starters = [
        "I've been thinking about what matters most to me if I became seriously ill...",
        "I want to make sure my wishes are clear in case something happens to me...",
        "I'd like to talk about something important—what kind of care I'd want at the end of life...",
        "I found this article about advance directives, and I think we should talk about it...",
        "I don't want you to have to guess what I want if I can't speak for myself..."
    ];

    const discussions = [
        {
            topic: "Quality of Life",
            questions: [
                "What does a good quality of life look like to you?",
                "If you couldn't engage in activities that bring you joy, would life still be worth living?",
                "What conditions would make you say 'I don't want to live like this'?",
                "Would you rather have more time or better comfort?"
            ]
        },
        {
            topic: "Medical Interventions",
            questions: [
                "How do you feel about CPR if your heart stops?",
                "Would you want to be on a breathing machine?",
                "What about feeding tubes or artificial nutrition?",
                "How far would you want us to go with treatments?"
            ]
        },
        {
            topic: "Pain and Comfort",
            questions: [
                "How important is pain control versus prolonging life?",
                "Would you accept strong painkillers even if they might shorten your life?",
                "What would comfort mean to you at the end of life?",
                "How do you feel about sedation if you're suffering?"
            ]
        },
        {
            topic: "Family and Relationships",
            questions: [
                "Who do you want nearby during your final time?",
                "Are there relationships you want to heal or conversations you want to have?",
                "What conversations or time together matter most to you?",
                "Is there anything you want to say to people you love?"
            ]
        },
        {
            topic: "Spiritual/Meaning",
            questions: [
                "What brings your life meaning and purpose?",
                "Are there spiritual or religious practices that matter to you?",
                "What legacy do you want to leave?",
                "How do you want to be remembered?"
            ]
        },
        {
            topic: "Practical Matters",
            questions: [
                "Where do you want to be when you're dying?",
                "How do you feel about burial versus cremation?",
                "Do you want a funeral or memorial service?",
                "Who should we appoint to make decisions if you can't?"
            ]
        }
    ];

    const familyRoles = [
        { role: "Healthcare Agent/Power of Attorney", responsibility: "Makes medical decisions; most important role" },
        { role: "Successor Agent", responsibility: "Takes over if primary agent unavailable" },
        { role: "Document Holder", responsibility: "Keeps and shares copies of advance directive" },
        { role: "Emotional Support", responsibility: "Provides comfort to person and other family members" },
        { role: "Life Details Manager", responsibility: "Knows account locations, important documents, contacts" }
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
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-200 mb-1">End-of-Life Planning</p>
                                <p className="text-sm text-gray-300">5 minute read</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            How to Talk to Your Family About End-of-Life Wishes
                        </h1>
                        <p className="text-xl text-gray-200">
                            Starting difficult but necessary conversations about care preferences and final wishes
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                            End-of-life conversations are among the most important—and most avoided—discussions families have. 
                            Yet without them, families face confusion, conflict, and the anguish of guessing what their loved one would have wanted. 
                            These conversations, when done well, actually bring families closer and reduce stress when the time comes. 
                            Here's how to approach them with honesty and love.
                        </p>

                        <div className="bg-[#f8f9fa] rounded-xl p-6 mb-12 border-l-4 border-[#4a90e2]">
                            <p className="text-[#2d3436] mb-0">
                                <strong>The Paradox:</strong> Talking about death feels morbid, but avoiding it often leads to suffering 
                                at the time of death. These conversations are actually a gift of love—they honor your loved one's autonomy 
                                and spare your family impossible decisions.
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-12"
                        >
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">How to Start the Conversation</h2>
                            <p className="text-[#2d3436] mb-4">Here are some sentence starters that work:</p>
                            <ul className="space-y-3">
                                {starters.map((starter, index) => (
                                    <li key={index} className="flex items-start gap-3 text-[#2d3436]">
                                        <CheckCircle className="w-5 h-5 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                        <span>"{starter}"</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Key Topics to Discuss</h2>
                            <div className="space-y-6">
                                {discussions.map((discussion, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                                    >
                                        <h3 className="text-xl font-bold text-[#1e3a5f] mb-4">{discussion.topic}</h3>
                                        <ul className="space-y-3">
                                            {discussion.questions.map((question, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <span className="text-[#d4af37] font-bold flex-shrink-0">•</span>
                                                    <span className="text-[#2d3436] text-sm italic">"{question}"</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white mb-12">
                            <h2 className="text-2xl font-bold mb-6">Family Roles to Assign</h2>
                            <div className="space-y-4">
                                {familyRoles.map((item, index) => (
                                    <div key={index} className="border-b border-white/20 pb-4 last:border-0">
                                        <p className="font-bold text-[#d4af37] mb-1">{item.role}</p>
                                        <p className="text-sm text-gray-200">{item.responsibility}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#f8f9fa] rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Conversation Tips</h2>
                            <div className="space-y-3 text-[#2d3436]">
                                <p><strong>Choose the Right Setting:</strong> Private, comfortable, unhurried. Not during a crisis or when stressed.</p>
                                <p><strong>Don't Rush:</strong> These conversations can happen over multiple sessions. It's okay to take time.</p>
                                <p><strong>Ask More Than You Tell:</strong> Let them share their perspective first. Show you're listening.</p>
                                <p><strong>Write Things Down:</strong> Document wishes and keep a copy. Email key points to family after.</p>
                                <p><strong>Include Everyone:</strong> Siblings, adult children, and the spouse should understand the wishes to prevent later conflict.</p>
                                <p><strong>Update Periodically:</strong> Wishes may change with age, health, or life events. Revisit every few years.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Need Help Facilitating These Conversations?</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        Our care team can help guide family discussions with objectivity and compassion
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                                Schedule Family Meeting
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