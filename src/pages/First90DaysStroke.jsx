import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Activity, Clock, Phone, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function First90DaysStroke() {
    const timeline = [
        {
            phase: "Days 1-7: Acute Hospital Phase",
            focus: "Stabilization and Initial Treatment",
            whatHappens: [
                "Medical team works to stabilize condition and prevent further brain damage",
                "Brain imaging (CT or MRI scans) to assess stroke type and extent",
                "Medications to prevent blood clots or manage bleeding",
                "Monitoring of vital signs and neurological status",
                "Initial assessment of speech, movement, and swallowing abilities",
                "Begin planning for rehabilitation needs"
            ],
            familyRole: [
                "Learn about stroke type and affected brain areas",
                "Ask questions about medications and treatment plan",
                "Begin educating yourself about recovery expectations",
                "Coordinate with hospital social worker about next steps",
                "Document any changes in abilities or concerns"
            ]
        },
        {
            phase: "Days 7-21: Early Rehabilitation",
            focus: "Beginning Recovery and Skill Rebuilding",
            whatHappens: [
                "Transfer to inpatient rehabilitation facility (if needed)",
                "Intensive therapy begins: 3+ hours daily",
                "Physical therapy to regain movement and strength",
                "Occupational therapy for daily living skills",
                "Speech therapy for communication and swallowing",
                "Cognitive assessments and memory exercises",
                "Family training on how to assist with care"
            ],
            familyRole: [
                "Participate in therapy sessions when possible",
                "Learn proper techniques for transfers and mobility assistance",
                "Practice communication strategies with speech therapist",
                "Begin making home modifications for safety",
                "Coordinate outpatient therapy arrangements",
                "Join caregiver support groups"
            ]
        },
        {
            phase: "Days 21-60: Active Recovery Phase",
            focus: "Consistent Progress and Adaptation",
            whatHappens: [
                "Transition to outpatient therapy or home health services",
                "Continued physical, occupational, and speech therapy",
                "Increased independence in daily activities",
                "Medication adjustments to optimize recovery",
                "Assessment of cognitive abilities and emotional state",
                "Development of long-term care plan",
                "Return of some functions, plateau in others"
            ],
            familyRole: [
                "Establish home therapy routines and exercises",
                "Monitor for signs of depression or frustration",
                "Encourage independence while ensuring safety",
                "Track progress and communicate with therapy team",
                "Adjust home environment as abilities change",
                "Balance caregiving with self-care"
            ]
        },
        {
            phase: "Days 60-90: Stabilization Phase",
            focus: "Establishing New Normal",
            whatHappens: [
                "Rate of recovery may slow but continue",
                "Focus shifts to adapting to remaining deficits",
                "Fine-tuning of medications and therapies",
                "Evaluation of assistive devices and equipment needs",
                "Discussion of return to work or modified activities",
                "Long-term care planning and goal setting",
                "Emotional adjustment to life after stroke"
            ],
            familyRole: [
                "Accept current level of recovery while staying hopeful",
                "Adapt family routines to accommodate changes",
                "Continue therapy exercises at home",
                "Explore community resources and support",
                "Plan for long-term care needs",
                "Focus on quality of life and meaningful activities"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <section className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to={createPageUrl('Resources')} className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Resources
                    </Link>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                <Activity className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-200 mb-1">Stroke Recovery</p>
                                <p className="text-sm text-gray-300">10 minute read</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            The First 90 Days After a Stroke: What to Expect
                        </h1>
                        <p className="text-xl text-gray-200">
                            A comprehensive timeline of stroke recovery stages and what family caregivers should prepare for
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                            The first 90 days after a stroke are critical for recovery. While every stroke survivor's journey is unique, 
                            understanding the typical recovery timeline helps families prepare emotionally, practically, and financially. 
                            This guide breaks down what to expect during each phase and how you can best support your loved one.
                        </p>

                        <div className="bg-[#f8f9fa] rounded-xl p-6 mb-12 border-l-4 border-[#4a90e2]">
                            <p className="text-[#2d3436] mb-0">
                                <strong>Important:</strong> Every stroke is different. Recovery speed and extent depend on stroke severity, 
                                location of brain damage, age, overall health, and quality of rehabilitation. These timelines are general 
                                guidelines—your loved one's experience may vary.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {timeline.map((phase, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-full bg-[#4a90e2] flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-[#1e3a5f]">{phase.phase}</h2>
                                            <p className="text-[#d4af37] font-semibold">{phase.focus}</p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-bold text-[#1e3a5f] mb-3">What Happens</h3>
                                            <ul className="space-y-2 text-sm text-[#2d3436]">
                                                {phase.whatHappens.map((item, i) => (
                                                    <li key={i}>• {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#1e3a5f] mb-3">Your Role as Family Caregiver</h3>
                                            <ul className="space-y-2 text-sm text-[#2d3436]">
                                                {phase.familyRole.map((item, i) => (
                                                    <li key={i}>• {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-16 bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white">
                            <h2 className="text-2xl font-bold mb-4">Key Recovery Principles</h2>
                            <div className="space-y-4 text-gray-200">
                                <p><strong>Neuroplasticity is Real:</strong> The brain can rewire itself. Consistent therapy and practice help create new neural pathways.</p>
                                <p><strong>The 3-6 Month Window:</strong> Most rapid recovery occurs in the first 3-6 months, but improvement can continue for years with ongoing therapy.</p>
                                <p><strong>Consistency Matters:</strong> Daily practice of exercises and activities is more effective than occasional intensive sessions.</p>
                                <p><strong>Emotional Recovery Takes Time:</strong> Depression affects 30-50% of stroke survivors. Mental health support is as important as physical therapy.</p>
                                <p><strong>Family Support Impacts Outcomes:</strong> Studies show stroke survivors with strong family support recover better and faster.</p>
                            </div>
                        </div>

                        <div className="mt-12 bg-[#f8f9fa] rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Warning Signs Requiring Immediate Medical Attention</h2>
                            <p className="text-[#2d3436] mb-4">Call 911 immediately if you notice:</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <ul className="space-y-2 text-sm text-[#2d3436]">
                                    <li>• Sudden weakness or numbness</li>
                                    <li>• Sudden severe headache</li>
                                    <li>• Sudden vision changes</li>
                                    <li>• Sudden difficulty speaking</li>
                                </ul>
                                <ul className="space-y-2 text-sm text-[#2d3436]">
                                    <li>• Sudden confusion or disorientation</li>
                                    <li>• Sudden trouble walking or dizziness</li>
                                    <li>• Loss of consciousness</li>
                                    <li>• Seizures</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Need Support During Stroke Recovery?</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        Our caregivers provide specialized stroke recovery support and rehabilitation assistance
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