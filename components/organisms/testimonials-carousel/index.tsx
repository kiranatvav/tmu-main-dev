"use client";

const testimonials = [
  {
    id: "7bJTMMeG_n4",
    url: "https://www.youtube.com/embed/7bJTMMeG_n4",
  },
  {
    id: "95p3BjCd3fQ",
    url: "https://www.youtube.com/embed/95p3BjCd3fQ",
  },
  {
    id: "svjPRvDf5Sw",
    url: "https://www.youtube.com/embed/svjPRvDf5Sw",
  },
  {
    id: "TiIrjF0DTik",
    url: "https://www.youtube.com/embed/TiIrjF0DTik",
  },
  {
    id: "9XMCuDi-Jwc",
    url: "https://www.youtube.com/embed/9XMCuDi-Jwc",
  },
  {
    id: "nTMUW-fddA8",
    url: "https://www.youtube.com/embed/nTMUW-fddA8",
  },
];

export const TestimonialsCarousel = () => {
  return (
    <section className="pb-8 md:pb-24 w-full flex justify-center">
      <div className="w-full max-w-[90vw] lg:max-w-[85vw] px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center">
          <h2
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            style={{
              fontFamily: "General Sans, Satoshi, sans-serif",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            Testimonials
          </h2>
          <p
            className="text-base md:text-lg mx-auto max-w-2xl px-4"
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontFamily: "Satoshi, sans-serif",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
            }}
          >
            Our students learn to trade with confidence, clarity, and
            consistency—thanks to a structured protocol designed to help remove
            emotion from their decisions.
          </p>
        </div>

        {/* Video Grid - 2 rows x 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((video) => (
            <div key={video.id} className="w-full">
              {/* Glass effect container with gradient border */}
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: "20px",
                  background: "rgba(255, 255, 255, 0.02)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid transparent",
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                  backgroundImage:
                    "linear-gradient(rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), linear-gradient(135deg, rgba(0, 255, 5, 0.6) 0%, rgba(0, 255, 5, 0) 40%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0.3) 100%)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              >
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "56.25%" }}
                >
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={video.url}
                    title={`Testimonial video ${video.id}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Disclaimer */}
        <div className="mt-8 text-center">
          <p
            className="text-xs text-white/70 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            *Individual results vary. Testimonials are not representative of
            typical results. Trading involves risk of loss. See our{" "}
            <a
              href="/disclaimer"
              className="text-white/80 hover:text-[#00ff05] underline transition-colors"
            >
              full disclaimer
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};
