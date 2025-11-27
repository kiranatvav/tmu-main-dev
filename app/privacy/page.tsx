import { Logo } from "@/components/molecules/logo";
import { Disclaimer } from "@/components/organisms/disclaimer";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col">
      <div className="flex-1">
        <div className="pt-12 pb-8 px-6">
          <Logo />
        </div>

        <div className="max-w-4xl mx-auto px-6 pb-16">
          <Link
            href="/"
            className="text-[#00FF00] hover:text-[#00DD00] text-sm mb-6 inline-block"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            ← Back to Home
          </Link>

          <h1
            className="text-white text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "General Sans, Satoshi, sans-serif" }}
          >
            Privacy Policy
          </h1>

          <div
            className="text-white/70 space-y-8 leading-relaxed"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            <p className="text-white/50 text-sm">Last updated: January 2025</p>

            {/* Section 1 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                1. Information We Collect
              </h2>
              <p className="mb-4">
                MATRIX UNLOCKED MANAGEMENT CONSULTANCY - FZCO (&quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;) collects information you
                provide directly to us, such as when you create an account,
                subscribe to our services, or contact us for support.
              </p>
              <p className="mb-2 text-white font-medium">
                Information you provide to us:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Name, email address, and contact information</li>
                <li>
                  Payment information (processed securely through third-party
                  processors)
                </li>
                <li>Communications with us, including support requests</li>
                <li>Any other information you choose to provide</li>
              </ul>
              <p className="mb-2 text-white font-medium">
                Information we collect automatically:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Log data (IP address, browser type, pages visited)</li>
                <li>Device information and usage patterns</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                2. How We Use Your Information
              </h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>
                  Communicate about products, services, and promotional offers
                </li>
                <li>Monitor and analyze trends and usage</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                3. Information Sharing and Disclosure
              </h2>
              <p className="mb-3">
                We do not sell, trade, or otherwise transfer your personal
                information to third parties except:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and property</li>
                <li>With service providers who assist in our operations</li>
                <li>
                  In connection with a merger, acquisition, or sale of assets
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                4. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no
                method of transmission over the internet is 100% secure.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                5. Data Retention
              </h2>
              <p>
                We retain your personal information for as long as necessary to
                provide our services and fulfill the purposes outlined in this
                Privacy Policy, unless a longer retention period is required by
                law.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                6. Your Rights
              </h2>
              <p className="mb-3">
                Depending on your jurisdiction, you may have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and receive a copy of your personal information</li>
                <li>Rectify inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict processing of your information</li>
                <li>Data portability</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                7. Cookies and Tracking Technologies
              </h2>
              <p>
                We use cookies and similar tracking technologies to track
                activity on our service and store certain information. You can
                instruct your browser to refuse all cookies or to indicate when
                a cookie is being sent.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                8. Third-Party Services
              </h2>
              <p>
                Our service may contain links to third-party websites or
                services. We are not responsible for the privacy practices of
                these third parties.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                9. Children&apos;s Privacy
              </h2>
              <p>
                Our service is not intended for children under 18 years of age.
                We do not knowingly collect personal information from children
                under 18.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                10. International Data Transfers
              </h2>
              <p>
                Your information may be transferred to and processed in
                countries other than your country of residence. We ensure
                appropriate safeguards are in place for such transfers.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                11. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                12. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:teamthematrixunlocked@gmail.com"
                  className="text-[#00FF00] hover:text-[#00DD00] underline"
                >
                  teamthematrixunlocked@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>

      <Disclaimer />
    </div>
  );
}
