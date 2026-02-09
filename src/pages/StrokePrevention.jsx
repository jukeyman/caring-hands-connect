import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Shield, Phone, ArrowLeft, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Strokeprevention() {
    const riskFactors = [
        { factor: "High Blood Pressure (Hypertension)", control: "Keep readings below 130/80 mmHg with medication and lifestyle" },
        { factor: "Atrial Fibrillation (AFib)", control: "Medication to regulate heartbeat; anticoagulants to prevent clots" },
        { factor: "High Cholesterol", control: "Statin medications; diet low in saturated fat" },
        { factor: "Diabetes", control: "Blood sugar control; monitor glucose regularly" },
        { factor: "Smoking", control: "Complete cessation is essential—smoking doubles stroke risk" },
        { factor: "Obesity", control: "Gradual weight loss through diet and exercise" },
        { factor: "Sedentary Lifestyle", control: "150 minutes moderate exercise weekly" },
        { factor: "Excessive Alcohol", control: "Limit to 1 drink/day for women, 2 for men" }
    ];

    const warningSign = [
        "Face drooping on one side",
        "Arm weakness or numbness (especially one side)",
        "Speech difficulty or slurring",
        "Time to call 911—don't wait or drive yourself",
        "Treatment works best if given within 4.5 hours of onset"
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
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-200 mb-1">Stroke Recovery</p>
                                <p className="text-sm text-gray-300">7 minute read • Written by Daniel Ford, Disabled U.S. Military Veteran (7+ years service)</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Preventing a Second Stroke: Risk Factors and Prevention
                        </h1>
                        <p className="text-xl text-gray-200">
                            Critical lifestyle changes, medication management, and warning signs every survivor should know
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                        After a stroke, your risk of having another is significantly elevated. But here's the encouraging news: 
                        80% of strokes are preventable through lifestyle changes and medical management. By addressing your risk factors, 
                        taking medications as prescribed, and maintaining healthy habits, you can dramatically reduce your chances of 
                        experiencing a second stroke.
                    </p>

                    <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-12">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-red-900 mb-2">Stroke Risk is Highest in First Year</h3>
                                <p className="text-sm text-red-800">
                                    Your risk of recurrent stroke is highest in the first 3-12 months after initial stroke. 
                                    This is critical time to aggressively manage all risk factors.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Critical Risk Factors & Control</h2>
                        <div className="space-y-3">
                            {riskFactors.map((item, index) => (
                                <div key={index} className="bg-white rounded-lg shadow border border-gray-200 p-4">
                                    <p className="font-bold text-[#1e3a5f] mb-1">{item.factor}</p>
                                    <p className="text-[#2d3436] text-sm">{item.control}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white mb-12">
                        <h2 className="text-2xl font-bold mb-4">Recognize Stroke Warning Signs (FAST)</h2>
                        <div className="space-y-2 text-gray-200">
                            {warningSign.map((sign, index) => (
                                <p key={index} className="text-sm">• {sign}</p>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#f8f9fa] rounded-xl p-8">
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Medications You May Need</h2>
                        <div className="space-y-2 text-[#2d3436] text-sm">
                            <p><strong>Antiplatelet Drugs:</strong> Aspirin, clopidogrel (Plavix) to prevent clots</p>
                            <p><strong>Anticoagulants:</strong> Warfarin or NOACs for AFib-related stroke risk</p>
                            <p><strong>Statins:</strong> Lower cholesterol and stabilize plaques</p>
                            <p><strong>Blood Pressure Meds:</strong> Multiple medications often needed to reach goal</p>
                            <p><strong>Diabetes Meds:</strong> Tight blood sugar control is essential</p>
                            <p><strong>IMPORTANT:</strong> Take medications exactly as prescribed—missing doses significantly increases risk</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Recovery & Prevention Support</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        Professional caregivers can help manage medication compliance and lifestyle goals
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