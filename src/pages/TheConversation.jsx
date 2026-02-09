import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { MessageCircle, Phone, ArrowLeft, X, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TheConversation() {
    const donts = [
        { text: "Don't ambush them with multiple family members", why: "Feels like an intervention, triggers defensiveness" },
        { text: "Don't start during a crisis or argument", why: "Emotions are high, not thinking clearly" },
        { text: "Don't use 'you can't' or 'you're not capable'", why: "Attacks dignity and independence" },
        { text: "Don't make it about your convenience", why: "They'll feel like a burden" },
        { text: "Don't present it as giving up or failure", why: "Creates shame and resistance" },
        { text: "Don't threaten or issue ultimatums", why: "Damages trust and relationship" }
    ];

    const dos = [
        { text: "Choose a calm, private setting", why: "Comfortable environment encourages openness" },
        { text: "Pick a time when everyone is rested", why: "Fatigue increases resistance" },
        { text: "Frame it as maintaining independence", why: "Aligns with their goals, not against them" },
        { text: "Use specific examples, not generalizations", why: "Harder to dismiss concrete observations" },
        { text: "Listen more than you talk", why: "Shows respect for their feelings and concerns" },
        { text: "Acknowledge their fears openly", why: "Validates emotions, builds trust" }
    ];

    const conversation = [
        {
            phase: "Opening",
            approach: "Express Love and Concern",
            script: "\"Dad, I want to talk with you about something that's been on my mind. I'm coming from a place of love and concern, and I want to hear your thoughts too.\"",
            why: "Sets collaborative, caring tone rather than confrontational"
        },
        {
            phase: "Share Observations",
            approach: "Use 'I Notice' Statements",
            script: "\"I've noticed you're having trouble remembering to take your medications. Last week you missed doses three times. I'm worried this could affect your health.\"",
            why: "Specific examples are hard to deny; focuses on concern, not criticism"
        },
        {
            phase: "Validate Feelings",
            approach: "Acknowledge Their Perspective",
            script: "\"I know you value your independence—I completely understand that. I would feel the same way. The last thing I want is for you to feel like you're losing control.\"",
            why: "Shows empathy; reduces perception of attack"
        },
        {
            phase: "Reframe the Goal",
            approach: "Position Help as Enabling Independence",
            script: "\"What if we could find some help that actually lets you stay in your home longer and keep doing the things you enjoy? That's what I want for you.\"",
            why: "Aligns help with their goal of independence"
        },
        {
            phase: "Explore Options Together",
            approach: "Collaborative Problem-Solving",
            script: "\"Let's explore some options together. Maybe someone could come a few hours a week to help with meals and medication reminders. What do you think would be most helpful?\"",
            why: "Gives them control and input in the decision"
        },
        {
            phase: "Address Concerns",
            approach: "Listen and Respond",
            script: "\"What worries you most about having someone help?\" (Listen) \"I hear you. Let's talk about how we can address that concern.\"",
            why: "Shows respect for their feelings; allows problem-solving"
        },
        {
            phase: "Suggest a Trial",
            approach: "Low-Pressure Start",
            script: "\"How about we try it for just a month? If it's not working, we'll figure out something else. No long-term commitment—just see how it goes.\"",
            why: "Reduces resistance with temporary, low-stakes approach"
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
                                <MessageCircle className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-200 mb-1">Caregiver Support</p>
                                <p className="text-sm text-gray-300">5 minute read</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            How to Have 'The Conversation' About Needing Help
                        </h1>
                        <p className="text-xl text-gray-200">
                            Approaching your loved one with compassion when it's time to discuss accepting care
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                            "The Conversation" is one of the hardest discussions adult children face—telling a parent they need help. 
                            It's emotionally loaded on both sides: you're worried about their safety, they're terrified of losing independence. 
                            But this conversation doesn't have to be a battle. With the right approach, it can be a collaborative discussion 
                            that strengthens your relationship while ensuring their wellbeing.
                        </p>

                        <div className="bg-[#f8f9fa] rounded-xl p-6 mb-12 border-l-4 border-[#4a90e2]">
                            <p className="text-[#2d3436] mb-0">
                                <strong>Key Principle:</strong> This isn't about convincing them to accept care—it's about understanding their 
                                fears, preserving dignity, and finding solutions together. Approach it as a partnership, not a power struggle.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div>
                                <h2 className="text-2xl font-bold text-red-700 mb-6 flex items-center gap-2">
                                    <X className="w-6 h-6" />
                                    What NOT to Do
                                </h2>
                                <div className="space-y-4">
                                    {donts.map((item, index) => (
                                        <div key={index} className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                                            <p className="font-bold text-red-900 mb-1">{item.text}</p>
                                            <p className="text-sm text-red-700">{item.why}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
                                    <CheckCircle className="w-6 h-6" />
                                    What TO Do
                                </h2>
                                <div className="space-y-4">
                                    {dos.map((item, index) => (
                                        <div key={index} className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                                            <p className="font-bold text-green-900 mb-1">{item.text}</p>
                                            <p className="text-sm text-green-700">{item.why}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">The Conversation: A Step-by-Step Guide</h2>
                            <div className="space-y-6">
                                {conversation.map((step, index) => (
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
                                                <h3 className="text-xl font-bold text-[#1e3a5f] mb-1">{step.phase}</h3>
                                                <p className="text-[#d4af37] font-semibold mb-3">{step.approach}</p>
                                                <div className="bg-[#f8f9fa] rounded-lg p-4 mb-3">
                                                    <p className="text-[#2d3436] italic">"{step.script}"</p>
                                                </div>
                                                <p className="text-sm text-[#2d3436]"><strong>Why it works:</strong> {step.why}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white mb-12">
                            <h2 className="text-2xl font-bold mb-6">Common Objections and How to Respond</h2>
                            <div className="space-y-4 text-gray-200">
                                <div>
                                    <p className="font-bold text-white mb-1">"I don't want a stranger in my house!"</p>
                                    <p className="text-sm">Response: "I understand. What if we meet a few caregivers together and you choose who you're comfortable with? 
                                    They won't be strangers for long—many clients say their caregiver becomes like family."</p>
                                </div>
                                <div>
                                    <p className="font-bold text-white mb-1">"I can't afford it."</p>
                                    <p className="text-sm">Response: "Let's look at the numbers together. We might qualify for VA benefits or other assistance. 
                                    And compare it to the cost of a hospital stay from a fall—prevention is often more affordable."</p>
                                </div>
                                <div>
                                    <p className="font-bold text-white mb-1">"I'm fine! You're overreacting."</p>
                                    <p className="text-sm">Response: "I hope you're right. But when I see [specific example], I worry. Can we at least talk to someone 
                                    together? Maybe I am overreacting, but I'd feel better hearing from a professional."</p>
                                </div>
                                <div>
                                    <p className="font-bold text-white mb-1">"You just want to put me in a home."</p>
                                    <p className="text-sm">Response: "Actually, this is the opposite. I want you to stay here as long as possible. Having some help 
                                    now makes that more likely. Without support, a crisis could force a facility move."</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#f8f9fa] rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">What If They Refuse?</h2>
                            <div className="space-y-3 text-[#2d3436]">
                                <p><strong>Don't give up after one conversation.</strong> It often takes multiple discussions over weeks or months.</p>
                                <p><strong>Plant seeds.</strong> Share articles, mention friends who use home care, let them see it's normal.</p>
                                <p><strong>Wait for an opening.</strong> Sometimes a health scare or difficult day makes them more receptive.</p>
                                <p><strong>Start very small.</strong> Just a few hours a week for "companionship" feels less threatening.</p>
                                <p><strong>Involve their doctor.</strong> Hearing recommendations from a trusted medical professional carries weight.</p>
                                <p><strong>Accept what you can control.</strong> If they have capacity to make decisions, they have the right to refuse. 
                                Focus on safety monitoring and being prepared for the next crisis.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Need Help Having This Conversation?</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        Our team can help facilitate the conversation and provide objective guidance
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                                Request Family Consultation
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