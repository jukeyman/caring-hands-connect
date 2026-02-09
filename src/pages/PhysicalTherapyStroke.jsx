import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Activity, AlertTriangle, Phone, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PhysicalTherapyStroke() {
    const exercises = [
        {
            category: "Leg Strengthening & Mobility",
            exercises: [
                {
                    name: "Seated Marching",
                    description: "Sit in a sturdy chair with feet flat. Lift one knee toward chest, hold 3 seconds, lower. Alternate legs.",
                    reps: "10-15 each leg, 2-3 sets",
                    benefits: "Strengthens hip flexors, improves walking ability"
                },
                {
                    name: "Ankle Pumps",
                    description: "Sitting or lying down, flex foot up (toes toward shin), then point toes down. Move slowly through full range.",
                    reps: "20 each foot, 3 sets",
                    benefits: "Prevents blood clots, improves circulation, increases ankle mobility"
                },
                {
                    name: "Sit-to-Stand",
                    description: "From seated position, lean forward slightly and push through feet to stand. Use arms for support if needed. Lower back down with control.",
                    reps: "5-10 repetitions, 2-3 sets",
                    benefits: "Builds leg strength, improves balance, essential for daily function"
                }
            ]
        },
        {
            category: "Arm & Hand Exercises",
            exercises: [
                {
                    name: "Shoulder Flexion",
                    description: "Sitting or standing, raise affected arm forward and up as high as comfortable. Use other arm to assist if needed.",
                    reps: "10-15 repetitions, 2-3 sets",
                    benefits: "Increases shoulder range of motion, reduces stiffness"
                },
                {
                    name: "Finger Taps",
                    description: "Touch thumb to each fingertip in sequence (index, middle, ring, pinky). Repeat backward.",
                    reps: "5-10 sequences, 3 sets",
                    benefits: "Improves fine motor control, hand coordination"
                },
                {
                    name: "Grasp and Release",
                    description: "Squeeze a soft ball or towel, hold 5 seconds, release. Focus on full finger extension when releasing.",
                    reps: "10-15 squeezes, 2-3 sets",
                    benefits: "Builds grip strength, reduces hand stiffness"
                }
            ]
        },
        {
            category: "Balance & Coordination",
            exercises: [
                {
                    name: "Single-Leg Stance",
                    description: "Stand near counter for support. Lift one foot slightly off ground, hold 10-30 seconds. Keep body upright.",
                    reps: "3-5 holds each leg",
                    benefits: "Improves balance, builds confidence for walking"
                },
                {
                    name: "Heel-to-Toe Walk",
                    description: "Walk forward placing heel of one foot directly in front of toes of other foot. Use wall for balance support.",
                    reps: "10-20 steps, 2-3 sets",
                    benefits: "Enhances balance, gait coordination"
                },
                {
                    name: "Sit-to-Stand with Reach",
                    description: "Stand from chair and reach for an object placed at shoulder height. Return to seated position.",
                    reps: "8-10 repetitions",
                    benefits: "Combines strength, balance, and coordination"
                }
            ]
        },
        {
            category: "Core & Posture",
            exercises: [
                {
                    name: "Seated Rotation",
                    description: "Sit tall, arms crossed over chest. Rotate upper body left and right, keeping hips still.",
                    reps: "10 each direction, 2 sets",
                    benefits: "Improves trunk rotation, balance, posture"
                },
                {
                    name: "Bridge Exercise",
                    description: "Lie on back, knees bent, feet flat. Lift hips toward ceiling, hold 5 seconds, lower.",
                    reps: "10-15 repetitions, 2 sets",
                    benefits: "Strengthens glutes, lower back, core"
                },
                {
                    name: "Wall Angels",
                    description: "Stand with back against wall. Raise arms to form 'W' shape, then slide arms up overhead into 'Y' shape.",
                    reps: "10-15 repetitions, 2 sets",
                    benefits: "Improves posture, shoulder mobility, upper body strength"
                }
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
                                <p className="text-sm text-gray-300">8 minute read</p>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Physical Therapy Exercises You Can Do at Home
                        </h1>
                        <p className="text-xl text-gray-200">
                            Safe, effective exercises to improve mobility, strength, and coordination during stroke rehabilitation
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-8">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-bold text-red-900 mb-2">Safety First</h3>
                                    <p className="text-sm text-red-800 mb-2">
                                        <strong>Always consult with your physical therapist or doctor before starting any exercise program.</strong> 
                                        These exercises are general guidelines—your therapy plan should be customized to your specific needs and abilities.
                                    </p>
                                    <ul className="text-sm text-red-800 space-y-1">
                                        <li>• Have someone nearby for assistance, especially with balance exercises</li>
                                        <li>• Stop immediately if you experience pain, dizziness, or shortness of breath</li>
                                        <li>• Use sturdy furniture or counters for support</li>
                                        <li>• Start slowly and progress gradually</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <p className="text-lg text-[#2d3436] leading-relaxed mb-8">
                            Consistent home exercise is crucial for stroke recovery. These exercises complement professional therapy sessions 
                            and help maintain progress between appointments. Remember: neuroplasticity—the brain's ability to rewire itself—requires 
                            repetition and consistency. The more you practice, the stronger those new neural pathways become.
                        </p>

                        <div className="space-y-12">
                            {exercises.map((section, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
                                >
                                    <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">{section.category}</h2>
                                    <div className="space-y-6">
                                        {section.exercises.map((exercise, i) => (
                                            <div key={i} className="bg-[#f8f9fa] rounded-lg p-6">
                                                <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">{exercise.name}</h3>
                                                <div className="space-y-2">
                                                    <p className="text-[#2d3436]">
                                                        <strong className="text-[#4a90e2]">How to do it:</strong> {exercise.description}
                                                    </p>
                                                    <p className="text-[#2d3436]">
                                                        <strong className="text-[#4a90e2]">Repetitions:</strong> {exercise.reps}
                                                    </p>
                                                    <p className="text-[#2d3436]">
                                                        <strong className="text-[#d4af37]">Benefits:</strong> {exercise.benefits}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-16 bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] rounded-2xl p-8 text-white">
                            <h2 className="text-2xl font-bold mb-4">Tips for Success</h2>
                            <div className="grid md:grid-cols-2 gap-6 text-gray-200">
                                <div>
                                    <h3 className="font-bold mb-3">Building a Routine</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li>• Exercise at the same time each day</li>
                                        <li>• Start with 10-15 minutes, gradually increase</li>
                                        <li>• Break into shorter sessions if fatigued</li>
                                        <li>• Track progress in a journal</li>
                                        <li>• Celebrate small victories</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-3">Staying Motivated</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li>• Set realistic, achievable goals</li>
                                        <li>• Exercise with family or friends</li>
                                        <li>• Play music during exercises</li>
                                        <li>• Focus on function, not perfection</li>
                                        <li>• Remember: progress isn't always linear</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 bg-[#f8f9fa] rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">When to Progress Exercises</h2>
                            <p className="text-[#2d3436] mb-4">Signs you're ready to increase difficulty:</p>
                            <ul className="space-y-2 text-[#2d3436]">
                                <li>✓ You can complete all sets without excessive fatigue</li>
                                <li>✓ The exercise feels easier than when you started</li>
                                <li>✓ You're maintaining good form throughout</li>
                                <li>✓ Your therapist approves the progression</li>
                            </ul>
                            <p className="text-[#2d3436] mt-4">
                                <strong>Ways to progress:</strong> Add repetitions, increase hold times, reduce support, add light weights, 
                                or combine exercises into functional movements.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Need Help with Home Exercise Programs?</h2>
                    <p className="text-lg text-[#2d3436] mb-8">
                        Our caregivers can assist with daily exercises and ensure proper technique
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={createPageUrl('Contact')}>
                            <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold">
                                Request Care Support
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