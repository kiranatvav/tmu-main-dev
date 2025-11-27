import { Logo } from "@/components/molecules/logo";
import { Disclaimer } from "@/components/organisms/disclaimer";
import Link from "next/link";

export default function TermsPage() {
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
            Terms of Service
          </h1>

          <div
            className="text-white/70 space-y-8 leading-relaxed"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            <p className="text-white/50 text-sm">Last updated: January 2025</p>

            {/* Section 1 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                1. Agreement to Terms
              </h2>
              <p>
                These Terms of Service (&quot;Terms&quot;) govern your use of
                The Matrix Unlocked website and services operated by MATRIX
                UNLOCKED MANAGEMENT CONSULTANCY - FZCO (&quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;). By accessing or using our
                service, you agree to be bound by these Terms.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                2. Description of Service
              </h2>
              <p>
                The Matrix Unlocked provides trading education, algorithmic
                trading strategies, and related educational content. Our
                services include but are not limited to online courses,
                webinars, private consultations, and access to proprietary
                trading methodologies.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                3. User Accounts
              </h2>
              <p>
                When you create an account with us, you must provide information
                that is accurate, complete, and current at all times. You are
                responsible for safeguarding the password and for maintaining
                the confidentiality of your account.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                4. Prohibited Uses
              </h2>
              <p className="mb-3">You may not use our service:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  For any unlawful purpose or to solicit others to perform
                  unlawful acts
                </li>
                <li>
                  To violate any international, federal, provincial, or state
                  regulations, rules, laws, or local ordinances
                </li>
                <li>
                  To infringe upon or violate our intellectual property rights
                  or the intellectual property rights of others
                </li>
                <li>
                  To harass, abuse, insult, harm, defame, slander, disparage,
                  intimidate, or discriminate
                </li>
                <li>To submit false or misleading information</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                5. Educational Nature
              </h2>
              <p>
                All content provided by The Matrix Unlocked is for educational
                purposes only. We do not provide investment advice, and our
                content should not be construed as such. Trading involves
                substantial risk and is not suitable for all investors.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                6. Intellectual Property Rights
              </h2>
              <p>
                The service and its original content, features, and
                functionality are and will remain the exclusive property of
                MATRIX UNLOCKED MANAGEMENT CONSULTANCY - FZCO and its licensors.
                The service is protected by copyright, trademark, and other
                laws.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                7. Payment Terms
              </h2>
              <p>
                Payment for services must be made in advance. All fees are
                non-refundable except as required by law. We reserve the right
                to change our pricing at any time with notice.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                8. Termination
              </h2>
              <p>
                We may terminate or suspend your account and bar access to the
                service immediately, without prior notice or liability, under
                our sole discretion, for any reason whatsoever including without
                limitation if you breach the Terms.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                9. Limitation of Liability
              </h2>
              <p>
                In no event shall MATRIX UNLOCKED MANAGEMENT CONSULTANCY - FZCO,
                nor its directors, employees, partners, agents, suppliers, or
                affiliates, be liable for any indirect, incidental, special,
                consequential, or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other
                intangible losses.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                10. Governing Law
              </h2>
              <p>
                These Terms shall be interpreted and governed by the laws of the
                United Arab Emirates, without regard to its conflict of law
                provisions.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                11. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify or replace these Terms at any
                time. If a revision is material, we will provide at least 30
                days notice prior to any new terms taking effect.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                12. Contact Information
              </h2>
              <p>
                If you have any questions about these Terms of Service, please
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
