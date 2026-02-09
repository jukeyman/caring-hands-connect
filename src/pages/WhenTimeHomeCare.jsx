import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { AlertCircle, Phone, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhenTimeHomeCare() {
    const warningSigns = [
        {
            sign: "Neglecting Personal Hygiene",
            description: "Not bathing regularly, wearing dirty clothes, or forgetting to brush teeth",
            whyItMatters: "Personal care requires memory, motivation, and physical ability. Decline often indicates cognitive or mobility issues.",
            examples: ["Body odor or unchanged clothing", "Unbrushed hair or teeth", "Skipped showers for days"]
        },
        {
            sign: "Weight Loss or Poor Nutrition",
            description: "Losing weight unintentionally, skipping meals, or eating spoiled food",
            whyItMatters: "May indicate difficulty cooking, forgetting to eat, or inability to shop for groceries.",
            examples: ["Empty refrigerator or expired food", "Noticeable weight loss", "Relying only on snacks or fast food"]
        },
        {
            sign: "Home Safety Hazards",
            description: "Clutter accumulation, burnt pots, or evidence of falls",
            whyItMatters: "A once-tidy home becoming messy suggests declining ability to manage daily tasks safely.",
            examples: ["Piles of mail or clutter", "Burn marks on counters", "Bruises suggesting falls"]
        },
        {
            sign: "Medication Mismanagement",
            description: "Missing doses, taking wrong amounts, or confusion about prescriptions",
            whyItMatters: "Critical medications like blood pressure or diabetes drugs require precise adherence.",
            examples: ["Pill bottles full when they should be empty", "Multiple doses missed", "Taking medications incorrectly"]
        },
        {
            sign: "Social Withdrawal",
            description: "Avoiding friends, missing activities they once enjoyed, increased isolation",
            whyItMatters: "May indicate depression, difficulty with transportation, or embarrassment about declining abilities.",
            examples: ["Stopped attending church or clubs", "No longer answers phone", "Refuses visitors"]
        },
        {
            sign: "Difficulty with Finances",
            description: "Unpaid bills, strange purchases, or falling victim to scams",
            whyItMatters: "Financial management requires executive function skills that decline with dementia or confusion.",
            examples: ["Overdue notices piling up", "Unusual credit card charges", "Difficulty balancing checkbook"]
        },
        {
            sign: "Mobility and Balance Issues",
            description: "Difficulty walking, frequent falls, or fear of moving around",
            whyItMatters: "Falls are leading cause of injury and hospitalization in seniors.",
            examples: ["Using walls for support", "Visible bruises", "Reluctance to leave chair"]
        },
        {
            sign: "Memory Problems Affecting Safety",
            description: "Forgetting stove is on, leaving doors unlocked, or getting lost in familiar places",
            whyItMatters: "Memory issues create serious safety risks including fire, theft, or wandering.",
            examples: ["Burnt pots left on stove", "Unlocked doors at night", "Getting lost driving"]
        },
        {
            sign: "Caregiver Burnout",
            description: "If you're the primary caregiver and feeling overwhelmed, exhausted, or resentful",
            whyItMatters: "Caregiver health matters too. Burnout leads to poorer care and health issues for both.",
            examples: ["Constant fatigue", "Feeling isolated", "Neglecting your own health"]
        },
        {
            sign: "Recent Hospital Discharge",
            description: "Returning home after hospitalization, surgery, or rehabilitation",
            whyItMatters: "Post-hospital period is critical for preventing readmission and ensuring proper recovery.",
            examples: ["Difficulty managing new medications", "Need for wound care", "Physical therapy follow-up needed"]
        },
        {
            sign: "Progressive Chronic Condition",
            description: "Worsening symptoms of Parkinson's, dementia, heart failure, or other chronic disease",
            whyItMatters: "As conditions progress, care needs increase. Early intervention prevents crises.",
            examples: ["Increasing tremors or rigidity", "More confusion episodes", "Shortness of breath with activity"]
        },
        {
            sign: "Unsafe Driving",
            description: "Dents on car, getting lost, or near-miss accidents",
            whyItMatters: "Driving problems often signal cognitive or physical decline requiring immediate attention.",
            examples: ["New scratches or dents", "Traffic violations", "Family members refusing to ride with them"]
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
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                <AlertCircle className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-200 mb-1">Aging in Place</p>
                                <p className="text-sm text-gray-300">5 minute read</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            When Is It Time to Consider Home Care? 12 Warning Signs
                        </h1>
                        <p className="text-xl text-gray-200">
                            Recognize the signals that your loved one may benefit from professional in-home support
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                            Deciding when to bring in professional home care is one of the most difficult decisions families face. 
                            Most people want their loved ones to maintain independence as long as possible, but waiting too long can 
                            lead to dangerous situations. These 12 warning signs help you recognize when it's time to have the conversation 
                            about additional support.
                        </p>

                        <div className="bg-[#f8f9fa] rounded-xl p-6 mb-12 border-l-4 border-[#d4af37]">
                            <p className="text-[#2d3436] mb-0">
                                <strong>Remember:</strong> One warning sign doesn't necessarily mean immediate intervention is needed. 
                                However, multiple signs or any sign involving safety should prompt action. Trust your instincts—if something 
                                feels wrong, it probably is.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {warningSigns.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#4a90e2] flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold">{index + 1}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-xl font-bold text-[#1e3a5f] mb-2">{item.sign}</h2>
                                            <p className="text-[#2d3436] mb-3">{item.description}</p>
                                            <div className="bg-[#f8f9fa] rounded-lg p-4">
                                                <p className="text-sm font-semibold text-[#4a90e2] mb-1">Why It Matters:</p>
                                                <p className="text-sm text-[#2d3436] mb-3">{item.whyItMatters}</p>
                                                <p className="text-sm font-semibold text-[#d4af37] mb-1">Look For:</p>
                                                <ul className="text-sm text-[#2d3436] space-y-1">
                                                    {item.examples.map((example, i) => (
                                                        <li key={i}>• {example}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-16 bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white">
                            <h2 className="text-2xl font-bold mb-6">How to Start the Conversation</h2>
                            <div className="space-y-4 text-gray-200">
                                <p><strong>Choose the Right Time:</strong> Have the conversation when everyone is calm, not during a crisis. Pick a private, comfortable setting.</p>
                                <p><strong>Focus on Independence:</strong> Frame home care as a way to maintain independence and stay at home longer, not as "giving up."</p>
                                <p><strong>Share Specific Concerns:</strong> Use concrete examples rather than general statements. "I noticed you've lost weight" is better than "You're not taking care of yourself."</p>
                                <p><strong>Listen More Than You Talk:</strong> Acknowledge fears and concerns. Ask "What are you most worried about?" and truly listen.</p>
                                <p><strong>Start Small:</strong> Suggest a trial period or start with just a few hours per week. Success builds acceptance.</p>
                                <p><strong>Involve Them in Decisions:</strong> Let them interview caregivers and make choices about their care. Control reduces resistance.</p>
                            </div>
                        </div>

                        <div className="mt-12 bg-[#f8f9fa] rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Levels of Home Care Support</h2>
                            <div className="space-y-4">
                                <div className="border-l-4 border-[#4a90e2] pl-4">
                                    <h3 className="font-bold text-[#1e3a5f] mb-2">Companionship Care (2-4 hours, 2-3 times/week)</h3>
                                    <p className="text-sm text-[#2d3436]">Light meal prep, medication reminders, errands, social interaction</p>
                                </div>
                                <div className="border-l-4 border-[#4a90e2] pl-4">
                                    <h3 className="font-bold text-[#1e3a5f] mb-2">Personal Care (4-8 hours daily)</h3>
                                    <p className="text-sm text-[#2d3436]">Bathing assistance, dressing, meal preparation, light housekeeping</p>
                                </div>
                                <div className="border-l-4 border-[#4a90e2] pl-4">
                                    <h3 className="font-bold text-[#1e3a5f] mb-2">Extended Care (20+ hours weekly)</h3>
                                    <p className="text-sm text-[#2d3436]">All personal care plus mobility assistance, safety supervision, complex meal prep</p>
                                </div>
                                <div className="border-l-4 border-[#4a90e2] pl-4">
                                    <h3 className="font-bold text-[#1e3a5f] mb-2">Live-In Care (24/7 with breaks)</h3>
                                    <p className="text-sm text-[#2d3436]">Around-the-clock supervision for advanced dementia, fall risk, or post-hospital recovery</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Ready to Discuss Your Options?</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        We offer free consultations to help you determine the right level of care
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                                Schedule Free Assessment
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