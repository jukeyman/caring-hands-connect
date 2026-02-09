import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Home as HomeIcon, CheckCircle, Phone, ArrowLeft, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SafeHomeDementia() {
    const modifications = [
        {
            room: "Living Room & Common Areas",
            changes: [
                "Remove throw rugs and clutter to prevent falls",
                "Ensure adequate lighting, especially at night",
                "Use contrasting colors for furniture edges and steps",
                "Install grab bars near seating areas",
                "Remove or secure glass-top tables",
                "Cover or remove mirrors if they cause confusion",
                "Keep pathways clear and furniture in consistent locations"
            ]
        },
        {
            room: "Kitchen",
            changes: [
                "Install automatic shut-off devices on stove",
                "Use appliances with simple, clear controls",
                "Lock away cleaning supplies and sharp objects",
                "Remove or disable garbage disposal",
                "Install cabinet locks for hazardous items",
                "Keep frequently used items at accessible heights",
                "Use unbreakable dishes and cups"
            ]
        },
        {
            room: "Bathroom",
            changes: [
                "Install grab bars in shower and near toilet",
                "Use non-slip mats in tub and on floor",
                "Set water heater to 120°F to prevent burns",
                "Remove locks from bathroom doors",
                "Use a raised toilet seat if needed",
                "Keep nightlight on 24/7",
                "Store medications in locked cabinet"
            ]
        },
        {
            room: "Bedroom",
            changes: [
                "Lower bed height to make getting in/out easier",
                "Install bed rails if needed",
                "Use nightlight or motion-sensor lighting",
                "Keep clutter off the floor",
                "Label dresser drawers with pictures",
                "Use simple bedding (avoid busy patterns)",
                "Keep phone or alert system within reach"
            ]
        },
        {
            room: "Entryways & Exits",
            changes: [
                "Install locks high or low (not at eye level)",
                "Use door alarms or chimes",
                "Camouflage exits with curtains or paint",
                "Install childproof doorknob covers",
                "Keep car keys out of sight",
                "Ensure good lighting at all entrances",
                "Remove or secure outdoor access to pools/stairs"
            ]
        },
        {
            room: "General Home Safety",
            changes: [
                "Install smoke and carbon monoxide detectors",
                "Keep emergency numbers posted clearly",
                "Use automatic medication dispensers",
                "Remove or secure firearms",
                "Eliminate step-down areas or mark clearly",
                "Install motion-sensor outdoor lighting",
                "Label important items with pictures and words"
            ]
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
                                <HomeIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-200 mb-1">Alzheimer's & Dementia Care</p>
                                <p className="text-sm text-gray-300">8 minute read</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            How to Create a Safe Home Environment for Dementia Patients
                        </h1>
                        <p className="text-xl text-gray-200">
                            Practical modifications to reduce confusion, prevent wandering, and maintain safety while preserving independence
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ARTICLE CONTENT */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                            Creating a safe home environment for someone with dementia doesn't mean eliminating all risks—it means balancing 
                            safety with dignity and independence. As dementia progresses, perception, judgment, and problem-solving abilities 
                            decline, making once-familiar spaces potentially hazardous. These practical modifications help maintain safety while 
                            allowing your loved one to remain comfortable in their own home.
                        </p>

                        <div className="bg-[#f8f9fa] rounded-xl p-6 mb-12 border-l-4 border-[#d4af37]">
                            <p className="text-[#2d3436] mb-0">
                                <strong>Key Principle:</strong> Make changes gradually and observe how your loved one responds. What works for one 
                                person may not work for another. The goal is to create an environment that feels familiar and comfortable while 
                                minimizing hazards.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {modifications.map((section, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
                                >
                                    <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">{section.room}</h2>
                                    <ul className="space-y-3">
                                        {section.changes.map((change, i) => (
                                            <li key={i} className="flex items-start gap-3 text-[#2d3436]">
                                                <CheckCircle className="w-5 h-5 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                                <span>{change}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-16 bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white">
                            <h2 className="text-2xl font-bold mb-6">Preventing Wandering: A Critical Safety Concern</h2>
                            <p className="text-gray-200 mb-4">
                                Wandering is common in dementia patients and can be extremely dangerous. Implement these strategies:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white/10 rounded-lg p-4">
                                    <h3 className="font-bold mb-2">Environmental Modifications:</h3>
                                    <ul className="space-y-2 text-sm text-gray-200">
                                        <li>• Install locks high or low on doors</li>
                                        <li>• Use door alarms and chimes</li>
                                        <li>• Camouflage exit doors with curtains</li>
                                        <li>• Remove car keys from sight</li>
                                    </ul>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4">
                                    <h3 className="font-bold mb-2">Proactive Strategies:</h3>
                                    <ul className="space-y-2 text-sm text-gray-200">
                                        <li>• Register with MedicAlert + Safe Return</li>
                                        <li>• Use GPS tracking devices</li>
                                        <li>• Inform neighbors about wandering risk</li>
                                        <li>• Keep recent photos on hand</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-red-900 mb-2">Emergency Preparedness Checklist</h3>
                                    <ul className="space-y-2 text-sm text-red-800">
                                        <li>✓ Emergency contacts posted by every phone</li>
                                        <li>✓ Smoke and carbon monoxide detectors installed and tested</li>
                                        <li>✓ Fire extinguisher accessible and up to date</li>
                                        <li>✓ Medical alert system or wearable device set up</li>
                                        <li>✓ Medication list and medical history easily accessible</li>
                                        <li>✓ Neighbors informed and emergency plan shared</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 bg-[#f8f9fa] rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Balancing Safety with Quality of Life</h2>
                            <p className="text-[#2d3436] mb-4">
                                While safety is paramount, remember that excessive restrictions can lead to frustration, agitation, and decreased 
                                quality of life. Consider these principles:
                            </p>
                            <div className="space-y-3 text-[#2d3436]">
                                <p><strong>Maintain Familiarity:</strong> Keep treasured items and familiar furniture arrangements when possible. 
                                Sudden changes can increase confusion.</p>
                                <p><strong>Preserve Independence:</strong> Allow participation in safe activities. If they've always made coffee, 
                                adapt the process rather than removing it entirely.</p>
                                <p><strong>Create Safe Spaces:</strong> Designate areas where they can move freely without constant supervision, 
                                reducing the need for restrictive measures.</p>
                                <p><strong>Regular Reassessment:</strong> As dementia progresses, safety needs change. Regularly evaluate and 
                                adjust modifications accordingly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">
                        Need Professional Dementia Care Support?
                    </h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        Our caregivers are trained in dementia safety and can help implement these modifications
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                                Request Free Home Safety Assessment
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