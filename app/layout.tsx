import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
// import { BlackFridayBanner } from "@/components/organisms/black-friday-banner";
import { Toaster } from "sonner";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "The Matrix Unlocked",
  description: "Watch the full movie now",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WRK7MS2P');`}
        </Script>
        {/* Font */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@1,900,700,500,301,701,300,501,401,901,400,2&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Aguafina+Script&display=swap"
          rel="stylesheet"
        ></link>
        {/* VTurb Optimization Preloads */}
        <link
          rel="preload"
          href="https://scripts.converteai.net/2f1a2a53-b695-4680-8c86-09db4b468975/players/6924cc5a3752bd8e79933f36/v4/player.js"
          as="script"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js"
          as="script"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdn.converteai.net/2f1a2a53-b695-4680-8c86-09db4b468975/692186de929a71f0a170a206/main.m3u8"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://cdn.converteai.net" />
        <link rel="dns-prefetch" href="https://scripts.converteai.net" />
        <link rel="dns-prefetch" href="https://images.converteai.net" />
        <link rel="dns-prefetch" href="https://api.vturb.com.br" />
      </head>
      <body className="antialiased">
        <PostHogProvider>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-WRK7MS2P"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          {/* End Google Tag Manager (noscript) */}
          {/* <BlackFridayBanner /> */}
          {children}
          <Toaster
            position="bottom-right"
            theme="dark"
            richColors
            toastOptions={{
              style: {
                background: "#0f0f0f",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                color: "#ffffff",
              },
            }}
          />
          <Analytics />
          <SpeedInsights />
        </PostHogProvider>
      </body>
    </html>
  );
}
