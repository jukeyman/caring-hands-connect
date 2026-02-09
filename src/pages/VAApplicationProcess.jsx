import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { FileText, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VAApplicationProcess() {
    const steps = [
        {
            step: "1",
            title: "Gather Documents",
            details: [
                "Original or certified DD-214 (discharge papers)",
                "Valid government ID (driver's license or passport)",
                "Social Security number",
                "Marriage certificate (if applicable)",
                "Birth certificates of dependents",
                "Medical records supporting disability claim"
            ]
        },
        {
            step: "2",
            title: "Get Medical Evidence",
            details: [
                "Current medical exam by VA or private doctor",
                "Documentation of daily care needs (functional limitations)",
                "Hospital discharge summaries (if recent)",
                "Prescription list showing current medications",
                "Statements from family about care needs"
            ]
        },
        {
            step: "3",
            title: "Complete VA Forms",
            details: [
                "Form 21-526EZ (Application for Disability Compensation)",
                "Form 21-0779 (Statement in Support of Claim for Aid & Attendance)",
                "Financial statement if you need benefits now",
                "Forms available at va.gov or through VSO"
            ]
        },
        {
            step: "4",
            title: "Submit Application",
            details: [
                "Online at VA.gov (fastest method)",
                "Mail to VA regional office",
                "In person at nearest VA facility",
                "Through Veteran Service Officer (VSO) for guidance"
            ]
        },
        {
            step: "5",
            title: "Medical Evaluation",
            details: [
                "VA schedules C&P exam (Compensation & Pension)",
                "Exam confirms medical conditions and care needs",
                "Be honest about daily limitations",
                "Exam typically occurs 1-3 months after application"
            ]
        },
        {
            step: "6",
            title: "Wait for Decision",
            details: [
                "Processing takes 4-12 months average",
                "Check status at VA.gov (VA ebenefits portal)",
                "Subscribe to email updates",
                "Contact VSO if delays exceed 6 months"
            ]
        }
    ];

    const documents = [
        { category: "Military Documents", items: ["DD-214 (certified copy)", "Military ID"] },
        { category: "Medical Evidence", items: ["Disability rating decision", "Recent medical exams", "Hospital records", "Medication list"] },
        { category: "Financial", items: ["Last 2 years tax returns", "Bank statements", "Asset documentation"] },
        { category: "Family", items: ["Marriage certificate", "Birth certificates of dependents", "Divorce decrees if applicable"] }
    ];

    const timeline = [
        { phase: "Initial Review", days: "2-4 weeks", description: "VA verifies military service and completeness of application" },
        { phase: "C&P Exam Scheduling", days: "2-6 weeks", description: "VA schedules medical evaluation with examiner" },
        { phase: "Exam Completion", days: "1-8 weeks", description: "You attend medical exam; could be in-home visit" },
        { phase: "Rating Decision", days: "2-8 weeks", description: "VA reviews exam and makes decision on benefits" },
        { phase: "Total Average", days: "4-12 months", description: "Varies greatly; can be expedited for hardship cases" }
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
                                <p className="text-sm text-gray-200 mb-1">Veterans Benefits</p>
                                <p className="text-sm text-gray-300">10 minute read • Written by Daniel Ford, Disabled U.S. Military Veteran (7+ years service)</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            How to Apply for VA Home Care Benefits
                        </h1>
                        <p className="text-xl text-gray-200">
                            Step-by-step application process, required documents, and what to expect during review
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                            Applying for VA benefits can feel overwhelming, but the process is straightforward when you know what to expect. 
                            This step-by-step guide walks you through gathering documents, completing forms, and navigating the approval process.
                        </p>

                        <div className="bg-[#f8f9fa] rounded-xl p-6 mb-12 border-l-4 border-[#4a90e2]">
                            <p className="text-[#2d3436] mb-0">
                                <strong>Pro Tip:</strong> Use a Veteran Service Officer (VSO) to help with your application. 
                                It's free and they know exactly what the VA needs. Contact your county veteran service office or organizations 
                                like the American Legion, VFW, or DAV for help.
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">The 6-Step Application Process</h2>
                            <div className="space-y-6">
                                {steps.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#4a90e2] text-white flex items-center justify-center flex-shrink-0 font-bold">
                                                {item.step}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-[#1e3a5f] mb-4">{item.title}</h3>
                                                <ul className="space-y-2">
                                                    {item.details.map((detail, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-[#2d3436]">
                                                            <CheckCircle className="w-4 h-4 text-[#4a90e2] mt-1 flex-shrink-0" />
                                                            <span className="text-sm">{detail}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white mb-12">
                            <h2 className="text-2xl font-bold mb-6">Documents You'll Need</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {documents.map((doc, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-[#d4af37] mb-3">{doc.category}</p>
                                        <ul className="space-y-2">
                                            {doc.items.map((item, i) => (
                                                <li key={i} className="text-sm text-gray-200 flex items-start gap-2">
                                                    <span className="text-[#d4af37] font-bold">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-12"
                        >
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Timeline Expectations</h2>
                            <div className="space-y-3">
                                {timeline.map((item, index) => (
                                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="font-bold text-[#1e3a5f]">{item.phase}</p>
                                            <span className="bg-[#4a90e2] text-white px-3 py-1 rounded-full text-sm font-semibold">{item.days}</span>
                                        </div>
                                        <p className="text-[#2d3436] text-sm">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="bg-[#f8f9fa] rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Getting Help During the Process</h2>
                            <div className="space-y-3 text-[#2d3436]">
                                <p><strong>Veteran Service Officers (VSO):</strong> Free help from county office, American Legion, VFW, or DAV</p>
                                <p><strong>VA Customer Service:</strong> Call 1-800-827-1000 for questions about your application status</p>
                                <p><strong>Local VA Office:</strong> Schedule appointment to discuss your specific situation</p>
                                <p><strong>Online Portal:</strong> Check application status at VA.gov (ebenefits account required)</p>
                                <p><strong>Hardship Expedite:</strong> Ask about expedited processing if you're in immediate financial need</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Need Help with Your Application?</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        Our team can help you understand your benefits and prepare for home care
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                                Get Expert Help
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