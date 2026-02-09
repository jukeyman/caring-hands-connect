import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', page: 'Home' },
        { name: 'Services', page: 'Services' },
        { name: 'About', page: 'About' },
        { name: 'Locations', page: 'Locations' },
        { name: 'Resources', page: 'Resources' },
        { name: 'Careers', page: 'Careers' },
        { name: 'Contact', page: 'Contact' },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            <style>{`
                :root {
                    --primary: #1e3a5f;
                    --secondary: #d4af37;
                    --accent: #4a90e2;
                    --background: #f8f9fa;
                    --text: #2d3436;
                }
            `}</style>
            
            {/* Sticky Navigation */}
            <nav className="sticky top-0 z-50 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24 py-2">
                        {/* Logo */}
                        <Link to={createPageUrl('Home')} className="flex items-center gap-2">
                            <img 
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/11b93742a_CaringHandsHomeHealthLogo.png" 
                                alt="Caring Hands Home Health" 
                                className="h-24 w-auto"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.page}
                                    to={createPageUrl(link.page)}
                                    className={`text-sm font-medium transition-colors hover:text-[#d4af37] ${
                                        currentPageName === link.page ? 'text-[#d4af37]' : 'text-[#2d3436]'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link to={createPageUrl('Contact')}>
                                <Button className="bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f] font-semibold">
                                    Get Started
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="lg:hidden p-2 rounded-md text-[#1e3a5f]"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t bg-white">
                        <div className="px-4 py-4 space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.page}
                                    to={createPageUrl(link.page)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                        currentPageName === link.page
                                            ? 'bg-[#1e3a5f] text-white'
                                            : 'text-[#2d3436] hover:bg-gray-100'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link to={createPageUrl('Contact')} className="w-full">
                                <Button className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f] font-semibold">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Page Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-[#1e3a5f] text-white py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <img 
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6977ebfa16ae77d8c58161b6/11b93742a_CaringHandsHomeHealthLogo.png" 
                                    alt="Caring Hands Home Health" 
                                    className="h-16 w-auto"
                                />
                            </div>
                            <p className="text-gray-300 text-sm">
                                Compassionate, veteran-owned home health care services in Central Texas.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3 text-[#d4af37]">Contact</h3>
                            <div className="space-y-2 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    <span>(512) 436-0774</span>
                                </div>
                                <div className="space-y-1 mt-3">
                                    <p className="text-xs text-gray-400">General Inquiries:</p>
                                    <p>Info@caringhandshomehealthtx.com</p>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">Austin, Texas | TX License #023937</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3 text-[#d4af37]">Quick Links</h3>
                            <div className="space-y-2 text-sm">
                                {navLinks.slice(0, 5).map((link) => (
                                    <div key={link.page}>
                                        <Link
                                            to={createPageUrl(link.page)}
                                            className="text-gray-300 hover:text-[#d4af37] transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-400">
                        <p>© 2026 Caring Hands Home Health. All rights reserved. | Austin & Surrounding Areas (Region 7)</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}