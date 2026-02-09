import React from 'react';
import { Mail } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-[#1e3a5f] mb-4">Privacy Policy</h1>
                    <p className="text-gray-600">Effective as of January 1, 2024</p>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none space-y-8">
                    {/* Section 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">1. Information We Collect</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We collect information that you provide directly to us, including:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>Personal identification information (name, email address, phone number, mailing address)</li>
                            <li>Health information necessary to provide care services</li>
                            <li>Payment and billing information</li>
                            <li>Emergency contact information</li>
                            <li>Communications between you and Caring Hands Home Health</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            We also automatically collect certain information when you visit our website, including IP address, 
                            browser type, device information, and usage data through cookies and similar technologies.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">2. How We Use Your Information</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>Provide, maintain, and improve our home care services</li>
                            <li>Process and complete transactions</li>
                            <li>Send you service-related communications and updates</li>
                            <li>Respond to your inquiries and provide customer support</li>
                            <li>Comply with legal obligations and protect our rights</li>
                            <li>Conduct internal research and analytics to improve our services</li>
                            <li>Send marketing communications (with your consent)</li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">3. Information Sharing and Disclosure</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We do not sell your personal information. We may share your information in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li><strong>With Caregivers:</strong> We share necessary information with assigned caregivers to provide services</li>
                            <li><strong>Service Providers:</strong> We share information with third-party vendors who perform services on our behalf (payment processors, email services, etc.)</li>
                            <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests</li>
                            <li><strong>Healthcare Providers:</strong> With your consent, we may share information with healthcare providers involved in your care</li>
                            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">4. Data Security</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We implement appropriate technical and organizational measures to protect your personal information 
                            against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, 
                            secure servers, access controls, and regular security assessments. However, no method of transmission 
                            over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">5. Your Privacy Rights</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Depending on your location, you may have the following rights:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                            <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                            <li><strong>Opt-Out:</strong> Opt out of marketing communications at any time</li>
                            <li><strong>Data Portability:</strong> Request a copy of your data in a structured format</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            To exercise these rights, please contact us at privacy@caringhandstx.com.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">6. Cookies and Tracking</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We use cookies and similar tracking technologies to collect information about your browsing activities. 
                            Cookies help us improve your experience, remember your preferences, and analyze site traffic. You can 
                            control cookies through your browser settings, but disabling cookies may limit certain features of our website.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">7. HIPAA Compliance</h2>
                        <p className="text-gray-700 leading-relaxed">
                            As a licensed home health provider, we comply with the Health Insurance Portability and Accountability 
                            Act (HIPAA) and protect the privacy and security of your protected health information (PHI). We maintain 
                            strict policies and procedures to safeguard your medical information and only use or disclose PHI as 
                            permitted by law or authorized by you. Our caregivers and staff are trained in HIPAA compliance and sign 
                            confidentiality agreements.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">8. Children's Privacy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal 
                            information from children. If we become aware that we have collected personal information from a child 
                            without parental consent, we will take steps to delete such information.
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">9. Changes to This Policy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any material changes by 
                            posting the new Privacy Policy on this page and updating the "Effective Date" at the top. Your continued 
                            use of our services after such changes constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">10. Contact Us</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us:
                        </p>
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <p className="text-[#1e3a5f] font-semibold mb-2">Caring Hands Home Health</p>
                            <p className="text-gray-700">123 Main St, Austin, TX 78701</p>
                            <p className="text-gray-700">Phone: (512) 555-1234</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Mail className="w-4 h-4 text-[#4a90e2]" />
                                <a href="mailto:privacy@caringhandstx.com" className="text-[#4a90e2] hover:underline">
                                    privacy@caringhandstx.com
                                </a>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-600">
                        If you have questions about this Privacy Policy, contact us at{' '}
                        <a href="mailto:privacy@caringhandstx.com" className="text-[#4a90e2] hover:underline font-semibold">
                            privacy@caringhandstx.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}