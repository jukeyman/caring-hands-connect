import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Brain, CheckCircle, Phone, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EarlySignsDementia() {
    const signs = [
        {
            title: "Memory Loss That Disrupts Daily Life",
            description: "Forgetting recently learned information, important dates, or asking the same questions repeatedly. While occasional forgetfulness is normal, frequent memory loss that affects daily activities is concerning.",
            examples: ["Forgetting appointments consistently", "Unable to recall conversations from earlier the same day", "Relying heavily on memory aids or family members for routine information"]
        },
        {
            title: "Difficulty Planning or Solving Problems",
            description: "Trouble following familiar recipes, managing bills, or working with numbers. Taking much longer to complete tasks that were once routine.",
            examples: ["Unable to follow a recipe they've made for years", "Difficulty managing monthly bills or checkbook", "Trouble concentrating on tasks requiring sequential steps"]
        },
        {
            title: "Challenges Completing Familiar Tasks",
            description: "Difficulty completing daily tasks at home, work, or leisure. Getting lost driving to familiar locations or forgetting rules of favorite games.",
            examples: ["Unable to drive to familiar locations", "Forgetting how to make coffee", "Difficulty remembering rules of a lifelong hobby"]
        },
        {
            title: "Confusion with Time or Place",
            description: "Losing track of dates, seasons, and passage of time. Forgetting where they are or how they got there.",
            examples: ["Not knowing what day of the week it is", "Forgetting where they are while out", "Confusion about whether something happened yesterday or last week"]
        },
        {
            title: "Trouble Understanding Visual Images and Spatial Relationships",
            description: "Difficulty reading, judging distance, determining color or contrast, which may cause problems with driving or recognizing faces.",
            examples: ["Difficulty recognizing their own reflection", "Problems judging distance when parking", "Trouble reading or understanding what they're looking at"]
        },
        {
            title: "New Problems with Words in Speaking or Writing",
            description: "Struggling with vocabulary, finding the right word, or calling things by wrong names. Stopping mid-conversation unable to continue.",
            examples: ["Calling things by wrong names (e.g., 'that thing for your mouth' for toothbrush)", "Repeating themselves in conversation", "Difficulty following or joining conversations"]
        },
        {
            title: "Misplacing Things and Losing the Ability to Retrace Steps",
            description: "Putting things in unusual places and being unable to retrace steps to find them. Sometimes accusing others of stealing.",
            examples: ["Finding car keys in the refrigerator", "Unable to remember where they placed important items", "Accusing family members of taking their belongings"]
        },
        {
            title: "Decreased or Poor Judgment",
            description: "Changes in judgment or decision-making, particularly regarding money or personal grooming.",
            examples: ["Giving large amounts of money to telemarketers", "Paying less attention to grooming and hygiene", "Making poor financial decisions"]
        },
        {
            title: "Withdrawal from Work or Social Activities",
            description: "Removing themselves from hobbies, social activities, or work projects. Avoiding social engagements due to difficulty keeping up.",
            examples: ["Stopping favorite hobbies", "Avoiding social gatherings", "No longer following favorite sports team"]
        },
        {
            title: "Changes in Mood and Personality",
            description: "Becoming confused, suspicious, depressed, fearful, or anxious. Easily upset when out of their comfort zone.",
            examples: ["Increased anxiety or fearfulness", "Becoming more suspicious of others", "Mood swings or personality changes"]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* HERO SECTION */}
            <section className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to={createPageUrl('Resources')} className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Resources
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                <Brain className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-200 mb-1">Alzheimer's & Dementia Care</p>
                                <p className="text-sm text-gray-300">6 minute read</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            10 Early Signs of Dementia Every Family Should Know
                        </h1>
                        <p className="text-xl text-gray-200">
                            Learn to recognize the subtle warning signs that may indicate cognitive decline and when to seek professional evaluation
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ARTICLE CONTENT */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                            Early detection of dementia can make a significant difference in managing the condition and planning for the future. 
                            While everyone experiences occasional forgetfulness, certain patterns of cognitive decline may signal something more serious. 
                            Understanding these early warning signs empowers families to seek timely medical evaluation and support.
                        </p>

                        <div className="bg-[#f8f9fa] rounded-xl p-6 mb-12 border-l-4 border-[#4a90e2]">
                            <p className="text-[#2d3436] mb-0">
                                <strong>Important:</strong> Experiencing one or more of these signs doesn't automatically mean someone has dementia. 
                                Many conditions can cause similar symptoms. Always consult with a healthcare professional for proper evaluation and diagnosis.
                            </p>
                        </div>

                        <div className="space-y-12">
                            {signs.map((sign, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                    className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-[#4a90e2] flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold">{index + 1}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-[#1e3a5f]">{sign.title}</h2>
                                    </div>
                                    <p className="text-[#2d3436] leading-relaxed mb-4 ml-14">
                                        {sign.description}
                                    </p>
                                    <div className="ml-14">
                                        <p className="text-sm font-semibold text-[#1e3a5f] mb-2">Warning Signs to Watch For:</p>
                                        <ul className="space-y-2">
                                            {sign.examples.map((example, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-[#2d3436]">
                                                    <CheckCircle className="w-4 h-4 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                                    <span>{example}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-16 bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white">
                            <h2 className="text-2xl font-bold mb-4">What to Do If You Notice These Signs</h2>
                            <div className="space-y-4 text-gray-200">
                                <p><strong>1. Schedule a Medical Evaluation:</strong> Make an appointment with your loved one's primary care physician. Early diagnosis allows for better treatment options and planning.</p>
                                <p><strong>2. Keep a Journal:</strong> Document specific examples of concerning behaviors, including dates and circumstances. This information helps doctors make accurate assessments.</p>
                                <p><strong>3. Be Supportive, Not Confrontational:</strong> Approach the conversation with compassion. Focus on specific concerns rather than labeling behavior as "dementia."</p>
                                <p><strong>4. Explore Support Resources:</strong> Whether it's a diagnosis or just age-related changes, support services can help families navigate next steps.</p>
                                <p><strong>5. Plan for the Future:</strong> If dementia is diagnosed, work together while your loved one can still participate in decisions about care, finances, and legal matters.</p>
                            </div>
                        </div>

                        <div className="mt-12 bg-[#f8f9fa] rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">The Difference Between Normal Aging and Dementia</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-bold text-[#4a90e2] mb-3">Normal Age-Related Changes:</h3>
                                    <ul className="space-y-2 text-sm text-[#2d3436]">
                                        <li>• Occasionally forgetting names or appointments</li>
                                        <li>• Occasionally misplacing things</li>
                                        <li>• Sometimes having difficulty finding the right word</li>
                                        <li>• Forgetting which day it is, then remembering later</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#d4af37] mb-3">Potential Warning Signs:</h3>
                                    <ul className="space-y-2 text-sm text-[#2d3436]">
                                        <li>• Forgetting recently learned information frequently</li>
                                        <li>• Misplacing things and unable to retrace steps</li>
                                        <li>• Unable to continue or join conversations</li>
                                        <li>• Complete disorientation about time and place</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">
                        Need Support Caring for a Loved One with Dementia?
                    </h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        Our trained caregivers specialize in compassionate dementia and Alzheimer's care
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                                Request Free Consultation
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