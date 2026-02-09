import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Volume2, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SpeechRecoveryStroke() {
    const exercises = [
        { exercise: "Deep Breathing", description: "Foundation for voice control and speech clarity" },
        { exercise: "Humming Exercises", description: "Engage vocal cords without pressure of speech" },
        { exercise: "Reading Aloud", description: "Practice speech fluency with written guidance" },
        { exercise: "Word Repetition", description: "Strengthen neural pathways for common words" },
        { exercise: "Singing", description: "Different brain pathway for language—often easier than speech" },
        { exercise: "Conversation Practice", description: "Real-world application with familiar people" }
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
                                <Volume2 className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-200 mb-1">Stroke Recovery</p>
                                <p className="text-sm text-gray-300">6 minute read • Written by Daniel Ford, Disabled U.S. Military Veteran (7+ years service)</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Speech Recovery Techniques for Stroke Survivors
                        </h1>
                        <p className="text-xl text-gray-200">
                            Communication strategies and exercises to help regain language skills and rebuild confidence
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                        Speech problems after stroke can range from mild slurring to complete loss of spoken language. 
                        The good news: the brain is remarkably capable of rewiring itself, especially with early and consistent therapy. 
                        Most recovery happens in the first 3-6 months, but improvement can continue for years with practice.
                    </p>

                    <div className="bg-[#f8f9fa] rounded-xl p-6 mb-12 border-l-4 border-[#4a90e2]">
                        <p className="text-[#2d3436] mb-0">
                            <strong>Critical Insight:</strong> Speech recovery requires consistency. Daily practice—even 15-20 minutes—
                            produces better results than sporadic intensive sessions. Make speech practice part of your daily routine.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-[#1e3a5f] mb-4">Home Exercises</h2>
                            <div className="space-y-3">
                                {exercises.map((item, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-[#1e3a5f] text-sm mb-1">{item.exercise}</p>
                                        <p className="text-[#2d3436] text-sm">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-xl text-white p-6">
                            <h2 className="text-xl font-bold mb-4">Tips for Success</h2>
                            <ul className="space-y-2 text-sm">
                                <li>• Practice at same time daily (builds habit)</li>
                                <li>• Start sessions when energy is highest</li>
                                <li>• Keep practice session 15-20 minutes max</li>
                                <li>• Celebrate small improvements</li>
                                <li>• Use multi-sensory approach (speaking, hearing, reading, writing)</li>
                                <li>• Involve family in conversation practice</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-[#f8f9fa] rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">When to Seek Professional Help</h2>
                        <div className="space-y-3 text-[#2d3436]">
                            <p><strong>Speech-Language Pathologist (SLP):</strong> Essential for comprehensive therapy and personalized exercises</p>
                            <p><strong>How Often:</strong> 2-3 times weekly initially, can reduce as progress is made</p>
                            <p><strong>Telehealth Option:</strong> Therapy delivered over video is proven effective and more convenient</p>
                            <p><strong>Insurance Coverage:</strong> Usually covered during first 6 months post-stroke; check your plan</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Speech Recovery Support</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        Professional caregivers can provide encouragement and support during recovery
                    </p>
                    <a href={createPageUrl('Contact')}>
                        <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                            Get Care Support
                        </Button>
                    </a>
                </div>
            </section>
        </div>
    );
}