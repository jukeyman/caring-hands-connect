import React from 'react';
import { Mail } from 'lucide-react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-[#1e3a5f] mb-4">Terms of Service</h1>
                    <p className="text-gray-600">Effective as of January 1, 2024</p>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none space-y-8">
                    {/* Section 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-700 leading-relaxed">
                            By accessing or using the services provided by Caring Hands Home Health ("we," "us," or "our"), 
                            you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not 
                            use our services. These terms constitute a legally binding agreement between you and Caring Hands Home Health.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">2. Services Provided</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Caring Hands Home Health provides non-medical home care services, including but not limited to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>Companionship and socialization</li>
                            <li>Assistance with activities of daily living (ADLs)</li>
                            <li>Medication reminders (not administration unless by certified personnel)</li>
                            <li>Meal preparation and planning</li>
                            <li>Light housekeeping</li>
                            <li>Transportation assistance</li>
                            <li>Respite care for family caregivers</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            We do not provide skilled nursing or medical services unless specifically stated and performed by 
                            licensed medical professionals.
                        </p>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">3. User Responsibilities</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            As a client or authorized representative, you agree to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>Provide accurate and complete information about care needs and medical conditions</li>
                            <li>Maintain a safe working environment for caregivers</li>
                            <li>Treat caregivers with respect and dignity</li>
                            <li>Notify us immediately of any changes in care needs or health status</li>
                            <li>Ensure payment is made according to agreed-upon terms</li>
                            <li>Provide at least 24 hours notice for schedule changes or cancellations when possible</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">4. Payment Terms</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Payment for services is due according to the terms outlined in your individual care agreement. 
                            Standard payment terms include:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>Invoices are issued bi-weekly or monthly as agreed</li>
                            <li>Payment is due within 15 days of invoice date (Net 15)</li>
                            <li>Accepted payment methods include credit card, ACH, check, or cash</li>
                            <li>Late payments may incur a fee of 1.5% per month on outstanding balances</li>
                            <li>Services may be suspended for accounts more than 30 days past due</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            A deposit may be required before services begin. Hourly rates are based on the level of care required 
                            and the caregiver's qualifications.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">5. Cancellation and Refund Policy</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            <strong>Client Cancellation:</strong> You may cancel services at any time with written notice. 
                            We request at least 24 hours notice for scheduled visits. Cancellations with less than 2 hours notice 
                            may incur a cancellation fee of up to 2 hours of the scheduled service rate.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            <strong>Agency Cancellation:</strong> We reserve the right to terminate services with 7 days written 
                            notice or immediately if client behavior threatens caregiver safety.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>Refunds:</strong> Services are billed based on actual hours worked. Prepaid amounts for 
                            undelivered services will be refunded within 30 days of cancellation.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">6. Limitation of Liability</h2>
                        <p className="text-gray-700 leading-relaxed">
                            To the fullest extent permitted by law, Caring Hands Home Health shall not be liable for any indirect, 
                            incidental, special, consequential, or punitive damages arising out of or relating to our services. 
                            Our total liability for any claim shall not exceed the amount paid by you for services during the 
                            three months prior to the claim. This limitation does not apply to cases of gross negligence or 
                            willful misconduct.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">7. Indemnification</h2>
                        <p className="text-gray-700 leading-relaxed">
                            You agree to indemnify and hold harmless Caring Hands Home Health, its officers, directors, employees, 
                            and agents from any claims, damages, losses, liabilities, and expenses (including attorney's fees) 
                            arising out of your use of our services, your violation of these terms, or your violation of any rights 
                            of another party.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">8. Governing Law</h2>
                        <p className="text-gray-700 leading-relaxed">
                            These Terms of Service shall be governed by and construed in accordance with the laws of the State of 
                            Texas, without regard to its conflict of law provisions. Any legal action or proceeding arising under 
                            these terms shall be brought exclusively in the state or federal courts located in Travis County, Texas.
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">9. Dispute Resolution</h2>
                        <p className="text-gray-700 leading-relaxed">
                            In the event of a dispute, we encourage you to contact us first to seek resolution. If we cannot 
                            resolve the dispute informally, you agree to participate in good-faith mediation before pursuing 
                            litigation. Any disputes that cannot be resolved through mediation shall be subject to binding 
                            arbitration in accordance with the rules of the American Arbitration Association.
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">10. Changes to Terms</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We reserve the right to modify these Terms of Service at any time. We will provide notice of material 
                            changes by posting the updated terms on our website and updating the "Effective Date." Your continued 
                            use of our services after changes are posted constitutes acceptance of the modified terms.
                        </p>
                    </section>

                    {/* Section 11 */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">11. Contact Information</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            For questions about these Terms of Service, please contact us:
                        </p>
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <p className="text-[#1e3a5f] font-semibold mb-2">Caring Hands Home Health</p>
                            <p className="text-gray-700">123 Main St, Austin, TX 78701</p>
                            <p className="text-gray-700">Phone: (512) 555-1234</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Mail className="w-4 h-4 text-[#4a90e2]" />
                                <a href="mailto:legal@caringhandstx.com" className="text-[#4a90e2] hover:underline">
                                    legal@caringhandstx.com
                                </a>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                    <p className="text-gray-600">
                        Questions? Contact us at{' '}
                        <a href="mailto:legal@caringhandstx.com" className="text-[#4a90e2] hover:underline font-semibold">
                            legal@caringhandstx.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}