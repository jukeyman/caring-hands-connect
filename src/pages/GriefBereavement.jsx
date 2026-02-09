import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Heart, Phone, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GriefBereavement() {
    const griefStages = [
        {
            stage: "Denial",
            description: "Shock or disbelief that the death has occurred",
            experience: "\"This can't be real.\" Numbness, difficulty accepting reality.",
            healthyResponse: "Allow yourself to feel numb; it's protective. Slowly engage with reality as you're ready."
        },
        {
            stage: "Anger",
            description: "Frustration and powerlessness emerges as shock wears off",
            experience: "\"Why them? Why now? This isn't fair.\" Anger at the person who died, doctors, God, or yourself.",
            healthyResponse: "Feelings are valid. Find safe outlets: journal, talk with support, physical activity."
        },
        {
            stage: "Bargaining",
            description: "Desperate attempts to negotiate or postpone the reality",
            experience: "\"If only...\" Replaying events, imagining different outcomes, guilt about things unsaid.",
            healthyResponse: "Recognize these thoughts as normal grief, not reality. Practice self-compassion."
        },
        {
            stage: "Depression",
            description: "Deep sadness and the full weight of loss settles in",
            experience: "Emptiness, fatigue, meaninglessness, withdrawal from others",
            healthyResponse: "Maintain basic self-care, connection with others, and patience with yourself."
        },
        {
            stage: "Acceptance",
            description: "Coming to terms with the reality and learning to live with the loss",
            experience: "Not forgetting or 'being over it,' but integrating the loss into your life",
            healthyResponse: "Build new routines, find meaning, honor their memory, live forward."
        }
    ];

    const resources = [
        {
            category: "Support Groups (Central Texas)",
            items: [
                { name: "GriefShare", description: "13-week group for loss of any kind; meets at many churches" },
                { name: "The Dinner Party", description: "Free gatherings for young adults grieving loss of a loved one" },
                { name: "Area Agency on Aging", description: "Grief support groups; (512) 916-6000" },
                { name: "Hospice Bereavement Programs", description: "Many hospices offer free grief support to families" }
            ]
        },
        {
            category: "Professional Counseling",
            items: [
                { name: "Grief Counselor/Therapist", description: "Individual therapy specifically for grief processing" },
                { name: "Psychiatrist", description: "For complicated grief or depression symptoms" },
                { name: "Chaplain Services", description: "Spiritual support integrated with grief work" },
                { name: "Employee Assistance Program (EAP)", description: "Many employers provide free counseling sessions" }
            ]
        },
        {
            category: "Online & Phone Resources",
            items: [
                { name: "What's Your Grief", description: "Articles, tools, and community for grievers" },
                { name: "Grief Recovery Institute", description: "Support and resources for grief" },
                { name: "The Dinner Party Circles", description: "Online peer support groups" },
                { name: "Crisis Text Line", description: "Text HOME to 741741 if in crisis" }
            ]
        }
    ];

    const copingStrategies = [
        "Allow yourself to feel all emotions without judgment—grief isn't linear",
        "Take care of your body: eat, sleep, exercise even when you don't want to",
        "Maintain some routine while allowing flexibility for grief episodes",
        "Connect with others who understand; avoid those who minimize your loss",
        "Create a ritual to honor their memory—plant a tree, donate, write a letter",
        "Journal about memories, feelings, or messages you wish you could say",
        "Volunteer or help others—purpose can begin to emerge",
        "Be patient with anniversaries and holidays; plan ahead with support",
        "Don't rush to discard their belongings; do it when you're ready",
        "Consider counseling if grief becomes complicated or you're not functioning"
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
                                <p className="text-sm text-gray-300">4 minute read</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Resources for Grief and Bereavement Support
                        </h1>
                        <p className="text-xl text-gray-200">
                            Support groups, counseling services, and coping strategies for families experiencing loss
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                            Grief is the price we pay for love. It's a deeply personal journey that doesn't follow a timeline or 
                            a predetermined path. While grief is a normal response to loss, it can feel overwhelming and isolating. 
                            You don't have to navigate it alone. This guide provides resources and strategies to support you through 
                            one of life's most challenging experiences.
                        </p>

                        <div className="bg-[#f8f9fa] rounded-xl p-6 mb-12 border-l-4 border-[#4a90e2]">
                            <p className="text-[#2d3436] mb-0">
                                <strong>Important Truth:</strong> Grief doesn't have stages you "complete." You don't "get over" grief or move on. 
                                Instead, you learn to integrate the loss into your life. You carry your loved one with you, finding new ways to honor 
                                them while living forward.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Understanding Grief: The Five Stages</h2>
                            <div className="space-y-6">
                                {griefStages.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#4a90e2] text-white flex items-center justify-center flex-shrink-0 font-bold">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">{item.stage}</h3>
                                                <p className="text-[#d4af37] font-semibold mb-2">{item.description}</p>
                                                <div className="bg-[#f8f9fa] rounded-lg p-3 mb-3">
                                                    <p className="text-[#2d3436] text-sm"><strong>What it feels like:</strong> {item.experience}</p>
                                                </div>
                                                <p className="text-[#2d3436] text-sm"><strong>Healthy response:</strong> {item.healthyResponse}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white mb-12">
                            <h2 className="text-2xl font-bold mb-6">Coping Strategies That Help</h2>
                            <ul className="space-y-2 text-gray-200">
                                {copingStrategies.map((strategy, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="text-[#d4af37] font-bold flex-shrink-0">•</span>
                                        <span className="text-sm">{strategy}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Support Resources Available</h2>
                            <div className="space-y-8">
                                {resources.map((section, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                    >
                                        <h3 className="text-xl font-bold text-[#1e3a5f] mb-4">{section.category}</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {section.items.map((item, i) => (
                                                <div key={i} className="bg-white rounded-lg shadow border border-gray-200 p-4">
                                                    <p className="font-bold text-[#1e3a5f] mb-1">{item.name}</p>
                                                    <p className="text-sm text-[#2d3436]">{item.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#f8f9fa] rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">When to Seek Professional Help</h2>
                            <div className="space-y-3 text-[#2d3436]">
                                <p><strong>Consider counseling if:</strong></p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li>Grief prevents you from functioning in daily life after several months</li>
                                    <li>You're having thoughts of harming yourself</li>
                                    <li>You're unable to eat, sleep, or care for yourself</li>
                                    <li>Substance use is becoming a coping mechanism</li>
                                    <li>You're isolating completely from others</li>
                                    <li>You feel stuck in one stage of grief for an extended period</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">You Don't Have to Grieve Alone</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        Our team is here to support you through this difficult time
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                                Request Support
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