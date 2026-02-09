import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Heart, AlertTriangle, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CaregiverBurnout() {
    const burnoutSigns = [
        { sign: "Constant exhaustion, even after rest", category: "Physical" },
        { sign: "Frequent illness or weakened immune system", category: "Physical" },
        { sign: "Changes in appetite or sleep patterns", category: "Physical" },
        { sign: "Chronic headaches or body pain", category: "Physical" },
        { sign: "Feeling overwhelmed, hopeless, or trapped", category: "Emotional" },
        { sign: "Increased irritability or anger", category: "Emotional" },
        { sign: "Anxiety or depression", category: "Emotional" },
        { sign: "Loss of interest in activities once enjoyed", category: "Emotional" },
        { sign: "Withdrawing from friends and family", category: "Social" },
        { sign: "Neglecting own health appointments", category: "Behavioral" },
        { sign: "Turning to unhealthy coping (alcohol, overeating)", category: "Behavioral" },
        { sign: "Feeling resentful toward care recipient", category: "Emotional" }
    ];

    const selfCareStrategies = [
        {
            category: "Daily Micro-Breaks",
            description: "Small moments of relief throughout the day",
            strategies: [
                "Take 5 deep breaths when feeling stressed",
                "Step outside for 10 minutes of fresh air",
                "Listen to one favorite song with headphones",
                "Enjoy coffee or tea without multitasking",
                "Do 5-minute stretching or meditation"
            ]
        },
        {
            category: "Ask for and Accept Help",
            description: "You don't have to do everything alone",
            strategies: [
                "Create a specific task list for volunteers",
                "Say yes when someone offers to help",
                "Hire respite care for regular breaks",
                "Join a caregiver support group",
                "Use meal delivery or grocery pickup services"
            ]
        },
        {
            category: "Set Boundaries",
            description: "Protecting your time and energy",
            strategies: [
                "Learn to say no to non-essential requests",
                "Establish visiting hours for other family",
                "Turn off phone during designated rest time",
                "Limit caregiving tasks to reasonable hours",
                "Don't feel guilty for taking breaks"
            ]
        },
        {
            category: "Maintain Your Identity",
            description: "You are more than a caregiver",
            strategies: [
                "Keep one hobby or interest active",
                "Stay connected with friends regularly",
                "Continue activities you enjoyed before caregiving",
                "Celebrate your own accomplishments",
                "Remember your own goals and dreams"
            ]
        },
        {
            category: "Physical Health",
            description: "Your body needs care too",
            strategies: [
                "Schedule and keep your own medical appointments",
                "Aim for 30 minutes of movement most days",
                "Prioritize 7-8 hours of sleep when possible",
                "Eat regular, nutritious meals",
                "Stay hydrated throughout the day"
            ]
        },
        {
            category: "Emotional Support",
            description: "Mental health is as important as physical",
            strategies: [
                "Consider therapy or counseling",
                "Join online or in-person support groups",
                "Journal about feelings and experiences",
                "Practice self-compassion, not self-criticism",
                "Acknowledge grief and loss when needed"
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
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-200 mb-1">Caregiver Support</p>
                                <p className="text-sm text-gray-300">6 minute read</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Avoiding Caregiver Burnout: Self-Care Strategies
                        </h1>
                        <p className="text-xl text-gray-200">
                            Recognize burnout symptoms and implement sustainable self-care practices to protect your wellbeing
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                            Caregiving is one of the most selfless acts of love—but it can also be one of the most exhausting. 
                            Caregiver burnout is a state of physical, emotional, and mental exhaustion that affects 40-70% of family caregivers. 
                            It's not a sign of weakness or failure—it's a signal that you need support too. This guide will help you recognize 
                            the warning signs and implement practical strategies to protect your wellbeing.
                        </p>

                        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-12">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-red-900 mb-2">Critical Truth About Caregiver Burnout</h3>
                                    <p className="text-sm text-red-800">
                                        <strong>You cannot pour from an empty cup.</strong> When you burn out, your ability to provide quality care 
                                        diminishes—and your own health suffers. Taking care of yourself isn't selfish; it's essential for sustainable 
                                        caregiving. Studies show caregivers have higher rates of depression, anxiety, and chronic health problems than 
                                        non-caregivers.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">12 Warning Signs of Caregiver Burnout</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {burnoutSigns.map((item, index) => (
                                    <div key={index} className="bg-[#f8f9fa] rounded-lg p-4 border-l-4 border-[#4a90e2]">
                                        <div className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-[#2d3436] font-medium">{item.sign}</p>
                                                <p className="text-xs text-[#d4af37] font-semibold">{item.category}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            {selfCareStrategies.map((section, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
                                >
                                    <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">{section.category}</h2>
                                    <p className="text-[#d4af37] font-semibold mb-4">{section.description}</p>
                                    <ul className="space-y-3">
                                        {section.strategies.map((strategy, i) => (
                                            <li key={i} className="flex items-start gap-3 text-[#2d3436]">
                                                <CheckCircle className="w-5 h-5 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                                <span>{strategy}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-16 bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white">
                            <h2 className="text-2xl font-bold mb-6">Creating Your Personal Respite Plan</h2>
                            <div className="space-y-4 text-gray-200">
                                <p><strong>Step 1: Identify Your Needs</strong> - What drains you most? What recharges you? Be honest about what you need.</p>
                                <p><strong>Step 2: Calculate Respite Hours</strong> - Aim for minimum 5-10 hours weekly of complete breaks from caregiving.</p>
                                <p><strong>Step 3: Explore Respite Options</strong> - Professional respite care, family rotation, adult day programs, or short-term facility placement.</p>
                                <p><strong>Step 4: Schedule It</strong> - Put respite time on the calendar like any other appointment. It's non-negotiable.</p>
                                <p><strong>Step 5: Let Go of Guilt</strong> - Your loved one benefits when you're rested and healthy. Respite is good for everyone.</p>
                            </div>
                        </div>

                        <div className="mt-12 bg-[#f8f9fa] rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Texas Caregiver Resources</h2>
                            <div className="space-y-3 text-[#2d3436]">
                                <p><strong>Area Agency on Aging of Central Texas:</strong> (512) 916-6000 - Free caregiver support groups and respite assistance</p>
                                <p><strong>Family Caregiver Support Program:</strong> Funded programs offering counseling, training, and respite services</p>
                                <p><strong>National Alliance for Caregiving:</strong> Online resources, toolkits, and support network</p>
                                <p><strong>Caregiver Action Network:</strong> Education, peer support, and advocacy</p>
                                <p><strong>ARCH National Respite Network:</strong> Respite care locator and resources</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Need Respite Care Support?</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        Professional caregivers can provide temporary relief so you can recharge
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                                Learn About Respite Care
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