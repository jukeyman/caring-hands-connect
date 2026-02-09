import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Sun, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sundowning() {
    const techniques = [
        { technique: "Increase Daytime Activity", description: "Stimulation, exercise, and social engagement during day prevent afternoon crashes" },
        { technique: "Bright Light Exposure", description: "Morning and afternoon sunlight helps regulate circadian rhythm" },
        { technique: "Avoid Afternoon Stimulation", description: "Reduce TV, visits, or transitions as evening approaches" },
        { technique: "Maintain Routine", description: "Consistent meal times, activities, and sleep schedule reduce confusion" },
        { technique: "Quiet Evening Environment", description: "Dim lights, soft music, calm voices in late afternoon" },
        { technique: "Adequate Nutrition", description: "Low blood sugar worsens confusion—offer snacks before sundown" },
        { technique: "Medication Timing", description: "Discuss with doctor—some meds worsen sundowning at certain times" },
        { technique: "Address Underlying Pain", description: "Undiagnosed pain increases agitation—ensure comfort" }
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
                                <Sun className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-200 mb-1">Alzheimer's & Dementia Care</p>
                                <p className="text-sm text-gray-300">7 minute read • Written by Daniel Ford, Disabled U.S. Military Veteran (7+ years service)</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Understanding Sundowning: What It Is and How to Manage It
                        </h1>
                        <p className="text-xl text-gray-200">
                            Why late-afternoon agitation happens in dementia patients and proven techniques to ease symptoms
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                        If you care for someone with dementia, you may have noticed a pattern: as the sun sets, confusion and agitation rise. 
                        This phenomenon—called "sundowning"—affects up to 66% of dementia patients. The person becomes increasingly confused, 
                        anxious, agitated, or aggressive in late afternoon and evening. Understanding why it happens and how to prevent it can 
                        dramatically improve quality of life for both patient and caregiver.
                    </p>

                    <div className="bg-[#f8f9fa] rounded-xl p-6 mb-12 border-l-4 border-[#4a90e2]">
                        <p className="text-[#2d3436] mb-0">
                            <strong>Good News:</strong> Sundowning isn't inevitable. With the right strategies, you can reduce symptoms 
                            or prevent episodes entirely. It requires patience and consistency, but it works.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-12">
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Why Sundowning Happens</h2>
                        <div className="space-y-3 text-[#2d3436]">
                            <p><strong>Biological Confusion:</strong> Dementia damages the brain's internal clock. As light fades, the brain panics, not understanding day is ending.</p>
                            <p><strong>Exhaustion:</strong> By late afternoon, even mild dementia patients are mentally exhausted from trying to make sense of the world.</p>
                            <p><strong>Environmental Changes:</strong> Shadows, changes in light, and end-of-day activities trigger confusion.</p>
                            <p><strong>Medication Timing:</strong> Some medications peak in evening hours, worsening confusion.</p>
                            <p><strong>Fear:</strong> The person may fear nighttime, being left alone, or not knowing where they are.</p>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">8 Proven Techniques to Manage Sundowning</h2>
                        <div className="space-y-4">
                            {techniques.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-lg shadow border border-gray-200 p-4"
                                >
                                    <p className="font-bold text-[#1e3a5f] mb-2">{item.technique}</p>
                                    <p className="text-[#2d3436] text-sm">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white">
                        <h2 className="text-2xl font-bold mb-4">Sample Sundowning Prevention Schedule</h2>
                        <div className="space-y-2 text-gray-200 text-sm">
                            <p><strong>Morning:</strong> Early sunlight exposure, breakfast, light activity</p>
                            <p><strong>Midday:</strong> Exercise, stimulation, social engagement, lunch</p>
                            <p><strong>Early Afternoon:</strong> Continuation of activities, engagement</p>
                            <p><strong>Late Afternoon (3-4pm):</strong> Begin calming activities, snack with caffeine</p>
                            <p><strong>Approaching Evening:</strong> Dim lights, soft music, quiet activities, dinner</p>
                            <p><strong>Evening:</strong> Calm presence, familiar activities, bedtime routine</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Sundowning Support</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        Professional caregivers can help manage evening behaviors and provide respite
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