import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { MapPin, Star, Phone, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Locations() {
    const cities = [
        {
            name: "Austin",
            isPrimary: true,
            description: "Our headquarters and primary service area. We serve all Austin neighborhoods including Downtown, West Lake Hills, Tarrytown, Hyde Park, and more.",
            zipCodes: "78701-78759"
        },
        {
            name: "Round Rock",
            isPrimary: false,
            description: "Comprehensive home care services for Round Rock families. Fast response times, local caregivers.",
            zipCodes: "78664, 78665, 78681"
        },
        {
            name: "Cedar Park",
            isPrimary: false,
            description: "Trusted home health care in Cedar Park and Leander. Serving the 78613, 78641, and 78645 zip codes.",
            zipCodes: "78613, 78641, 78645"
        },
        {
            name: "Georgetown",
            isPrimary: false,
            description: "Quality senior care in Georgetown and surrounding Williamson County communities.",
            zipCodes: "78626, 78628, 78633"
        },
        {
            name: "Leander",
            isPrimary: false,
            description: "Compassionate caregivers serving Leander families with custom care plans.",
            zipCodes: "78641, 78645"
        }
    ];

    const zipCodesByCounty = {
        "Travis County": [
            "78701", "78702", "78703", "78704", "78705", "78712", "78717", "78721", "78722", "78723", 
            "78724", "78725", "78726", "78727", "78728", "78729", "78730", "78731", "78732", "78733", 
            "78734", "78735", "78736", "78737", "78738", "78739", "78741", "78742", "78744", "78745", 
            "78746", "78747", "78748", "78749", "78750", "78751", "78752", "78753", "78754", "78756", 
            "78757", "78758", "78759"
        ],
        "Williamson County": [
            "78613", "78626", "78628", "78633", "78641", "78642", "78645", "78660", "78664", "78665", 
            "78681", "78683"
        ],
        "Hays County": [
            "78610", "78640", "78666", "78676"
        ]
    };

    const testimonials = [
        {
            location: "Austin, TX",
            quote: "We tried two other agencies before finding Caring Hands. The difference is night and day. They actually listen, they customize the care plan, and the caregiver feels like family now. I can't recommend them enough.",
            name: "Robert M., Tarrytown"
        },
        {
            location: "Round Rock, TX",
            quote: "As a Round Rock resident, I was worried about finding quality care outside of Austin proper. Caring Hands proved me wrong — their caregiver arrives on time every day, and my mother absolutely loves her.",
            name: "Linda P., Round Rock"
        },
        {
            location: "Cedar Park, TX",
            quote: "The caregiver assigned to my mom lives 10 minutes away in Cedar Park. That local connection matters — she knows the area, the doctors, the pharmacies. It's personal, not corporate.",
            name: "David K., Cedar Park"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-br from-[#1e3a5f] to-[#4a90e2] text-white py-20 lg:py-32 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Serving Families Across<br />
                            <span className="text-[#d4af37]">Central Texas</span>
                        </h1>
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                            Compassionate home care in Travis, Williamson, and Hays Counties
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* PRIMARY CITIES SECTION */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Austin & Surrounding Areas (Region 7)
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            Local caregivers, personalized service, community-focused care
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cities.map((city, index) => (
                            <motion.div
                                key={city.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-[#4a90e2] to-[#1e3a5f]">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-[#1e3a5f]">{city.name}</h3>
                                    </div>
                                </div>
                                <p className="text-[#2d3436] mb-4 leading-relaxed">
                                    {city.description}
                                </p>
                                <a href={createPageUrl('Contact') + '?city=' + city.name}>
                                    <Button className="w-full bg-[#4a90e2] hover:bg-[#1e3a5f] text-white">
                                        Request Care in {city.name}
                                    </Button>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COVERAGE MAP SECTION */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            Full Service Area
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            Travis, Williamson, and Hays Counties
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d442580.3252694118!2d-97.94693384999999!3d30.307182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b599a0cc032f%3A0x5d9b464bd469d57a!2sAustin%2C%20TX!5e0!3m2!1sen!2sus!4v1234567890"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
                        <div className="text-center p-6 bg-gradient-to-br from-[#f8f9fa] to-gray-100 rounded-xl">
                            <h3 className="font-bold text-[#1e3a5f] mb-2">Office Location</h3>
                            <p className="text-sm text-[#2d3436]">
                                Austin, TX 78660
                            </p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-[#f8f9fa] to-gray-100 rounded-xl">
                            <h3 className="font-bold text-[#1e3a5f] mb-2">Response Time</h3>
                            <p className="text-sm text-[#2d3436]">
                                24-48 hours typical<br />
                                Same-day for urgent needs
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* LOCAL TESTIMONIALS SECTION */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                            What Central Texas Families Are Saying
                        </h2>
                        <p className="text-lg text-[#2d3436]">
                            Real stories from real families in your community
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                {/* Location Tag */}
                                <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#4a90e2] to-[#1e3a5f] rounded-full">
                                    <span className="text-white text-sm font-semibold flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        {testimonial.location}
                                    </span>
                                </div>

                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-[#2d3436] italic mb-4 leading-relaxed">
                                    "{testimonial.quote}"
                                </p>

                                {/* Name */}
                                <p className="font-semibold text-[#1e3a5f]">
                                    — {testimonial.name}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA SECTION */}
            <section className="py-20 bg-gradient-to-br from-[#d4af37] to-[#b8941f]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-6">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-[#2d3436] mb-8">
                            Request your free care assessment today
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href={createPageUrl('Contact')}>
                                <Button size="lg" className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-bold text-lg px-8 py-6">
                                    Request Assessment
                                </Button>
                            </a>
                            <a href="tel:5124360774">
                                <Button size="lg" variant="outline" className="border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white font-semibold text-lg px-8 py-6">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Call (512) 436-0774
                                </Button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}