import { Logo } from "@/components/molecules/logo";
import { Disclaimer } from "@/components/organisms/disclaimer";
import Link from "next/link";

export default function DisclaimerPage() {
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
            Disclaimer
          </h1>

          <div
            className="text-white/70 space-y-8 leading-relaxed"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            {/* Section 1 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                1. General Risk Disclosure
              </h2>
              <p>
                MATRIX UNLOCKED MANAGEMENT CONSULTANCY - FZCO provides
                educational content and trading strategies for informational
                purposes only. All content is strictly educational and should
                not be considered as investment advice, financial advice, or a
                recommendation to buy or sell any financial instrument.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                2. Trading Risks
              </h2>
              <p className="mb-3">
                Trading in financial markets involves significant risks,
                including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="text-white font-medium">
                    Loss of Capital:
                  </span>{" "}
                  You may lose some or all of your invested capital
                </li>
                <li>
                  <span className="text-white font-medium">
                    Market Volatility:
                  </span>{" "}
                  Prices can fluctuate rapidly and unpredictably
                </li>
                <li>
                  <span className="text-white font-medium">Leverage Risk:</span>{" "}
                  Leveraged trading can amplify both gains and losses
                </li>
                <li>
                  <span className="text-white font-medium">
                    Liquidity Risk:
                  </span>{" "}
                  Inability to exit positions at desired prices
                </li>
                <li>
                  <span className="text-white font-medium">
                    Technical Risk:
                  </span>{" "}
                  System failures or connectivity issues
                </li>
                <li>
                  <span className="text-white font-medium">
                    Regulatory Risk:
                  </span>{" "}
                  Changes in laws and regulations
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                3. No Guarantee of Results
              </h2>
              <p>
                The Matrix Unlocked makes no representations or warranties that
                any trading strategy, algorithm, or methodology will be
                profitable or will not result in losses. Historical performance,
                backtesting results, or simulated performance are not reliable
                indicators of future results.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                4. Educational Purpose Only
              </h2>
              <p>
                All materials, courses, and strategies provided by The Matrix
                Unlocked are for educational purposes only. They are not
                intended as specific investment advice for any individual&apos;s
                particular circumstances.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                5. Professional Advice Recommendation
              </h2>
              <p className="mb-3">
                Before making any trading decisions, you should:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Consult with a qualified financial advisor</li>
                <li>
                  Carefully consider your financial situation and risk tolerance
                </li>
                <li>Only invest money you can afford to lose</li>
                <li>
                  Understand the specific risks of your chosen trading
                  instruments
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                6. Algorithmic Trading Risks
              </h2>
              <p className="mb-3">
                Algorithmic trading strategies carry additional risks:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="text-white font-medium">Model Risk:</span>{" "}
                  Algorithms may not perform as expected in all market
                  conditions
                </li>
                <li>
                  <span className="text-white font-medium">
                    Over-optimization:
                  </span>{" "}
                  Strategies may be curve-fitted to historical data
                </li>
                <li>
                  <span className="text-white font-medium">
                    Technology Dependence:
                  </span>{" "}
                  Reliance on technology systems and infrastructure
                </li>
                <li>
                  <span className="text-white font-medium">
                    Market Changes:
                  </span>{" "}
                  Market dynamics may change, affecting algorithm performance
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                7. Testimonials and Case Studies
              </h2>
              <p>
                Any testimonials, case studies, or success stories presented are
                not typical and may not be representative of the experience of
                other users. Individual results vary significantly based on many
                factors including market conditions, experience, and capital
                allocation.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                8. Regulatory Considerations
              </h2>
              <p>
                The Matrix Unlocked is not a registered investment advisor,
                broker-dealer, or financial institution. We do not provide
                personalized investment advice or recommendations for specific
                securities or trading strategies.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                9. International Trading
              </h2>
              <p className="mb-3">
                If you are trading in international markets, you may be subject
                to additional risks including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Currency exchange rate fluctuations</li>
                <li>Different regulatory environments</li>
                <li>Political and economic instability</li>
                <li>Time zone differences affecting market access</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                10. Psychological Factors
              </h2>
              <p className="mb-3">
                Trading can be emotionally challenging and may lead to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Stress and anxiety</li>
                <li>Impulsive decision-making</li>
                <li>Overconfidence or fear</li>
                <li>Addiction-like behaviors</li>
              </ul>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                11. Due Diligence
              </h2>
              <p className="mb-3">You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Conducting your own research and analysis</li>
                <li>Verifying all information independently</li>
                <li>Understanding the terms and conditions of your broker</li>
                <li>
                  Staying informed about market conditions and regulatory
                  changes
                </li>
              </ul>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                12. Limitation of Liability
              </h2>
              <p>
                MATRIX UNLOCKED MANAGEMENT CONSULTANCY - FZCO, its officers,
                directors, employees, and affiliates shall not be liable for any
                trading losses, damages, or claims arising from the use of our
                educational materials or strategies.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-white text-2xl font-semibold mb-3">
                13. Acknowledgment
              </h2>
              <p>
                By using MATRIX UNLOCKED MANAGEMENT CONSULTANCY - FZCO services,
                you acknowledge that you have read, understood, and agree to
                this risk disclaimer. You accept full responsibility for your
                trading decisions and any resulting gains or losses.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Disclaimer />
    </div>
  );
}
