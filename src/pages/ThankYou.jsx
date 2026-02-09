import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { CheckCircle, Phone, Mail, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThankYou() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-white flex items-center justify-center py-20">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center"
                >
                    {/* Success Icon */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-white" />
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
                        Thank You for Reaching Out!
                    </h1>

                    {/* Message */}
                    <p className="text-lg text-[#2d3436] mb-6 leading-relaxed">
                        We've received your request for a free care assessment. A member of our team will contact you 
                        within <strong className="text-[#1e3a5f]">30 minutes during business hours</strong> (or first thing 
                        the next business day if you submitted after hours).
                    </p>

                    {/* What's Next */}
                    <div className="bg-gradient-to-br from-[#f8f9fa] to-gray-100 rounded-xl p-6 mb-8 text-left">
                        <h3 className="font-bold text-[#1e3a5f] mb-4">What Happens Next:</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                <span className="text-[#2d3436]">We'll call to discuss your unique care needs</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                <span className="text-[#2d3436]">We'll answer your questions and explain our services</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                <span className="text-[#2d3436]">We'll schedule a free in-home assessment (if appropriate)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-[#4a90e2] mt-0.5 flex-shrink-0" />
                                <span className="text-[#2d3436]">We'll create a custom care plan just for your family</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Options */}
                    <div className="space-y-4 mb-8">
                        <p className="text-[#2d3436] font-semibold">Need to speak with us immediately?</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="tel:5125551234">
                                <Button className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Call (512) 555-1234
                                </Button>
                            </a>
                            <a href="mailto:info@caringhandstx.com">
                                <Button variant="outline" className="border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white">
                                    <Mail className="w-5 h-5 mr-2" />
                                    Email Us
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Return to Home */}
                    <Link to={createPageUrl('Home')}>
                        <Button variant="ghost" className="text-[#4a90e2] hover:text-[#1e3a5f]">
                            <Home className="w-4 h-4 mr-2" />
                            Return to Home
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}