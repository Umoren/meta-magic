import type { Metadata } from "next";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { AnalyticsWrapper } from "./ui/components/AnalyticsWrapper";
import Script from "next/script";

export const metadata: Metadata = {
  title: "MetaEenfo | AI-Powered Meta Content Generator",
  description: "Generate optimized metadata for your articles and boost your SEO with MetaEenfo's AI-powered content generator. Streamline your content strategy and improve visibility.",
  keywords: ["meta content generator", "SEO optimization", "AI content generator", "metadata generator", "content strategy"],
  authors: [{ name: "Samuel Umoren", url: "https://umoren.vercel.app" }],
  creator: "Samuel Umoren",
  publisher: "Samuel Umoren",
  metadataBase: new URL("https://metaeenfo.live"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://metaeenfo.live",
    title: "MetaEenfo | AI-Powered Meta Content Generator",
    description: "Boost your SEO with AI-generated metadata. Create compelling meta titles, descriptions, and keywords instantly.",
    siteName: "MetaEenfo",
    images: [
      {
        url: "https://metaeenfo.live/og-image.png", // Make sure to create and host this image
        width: 1200,
        height: 630,
        alt: "MetaEenfo AI Content Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@saameeey",
    creator: "@saameeey",
    title: "MetaEenfo | AI Meta Content Generator",
    description: "Generate SEO-optimized metadata instantly with AI. Improve your content strategy and visibility.",
    images: ["https://metaeenfo.live/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  verification: {
    google: "google-site-verification=RsKzNzYrsr-BlFprCE3V8l4gjgQTa_MiSe_yEd8JpQY",
    // yandex: "yandex-verification-code",
    // bing: "bing-verification-code",
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AnalyticsWrapper>
          <div className="flex-grow  flex-1">{children}</div>
          <footer className="bg-gray-100 py-4 text-center">
            <p>
              hey {" "}

              <a href="https://umoren.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                samuel
              </a>
              {" "} built this
            </p>
          </footer>
        </AnalyticsWrapper>
        <Script id="schema-org" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "MetaEenfo",
              "description": "AI-Powered Meta Content Generator for SEO optimization",
              "url": "https://metaeenfo.live",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Person",
                "name": "Samuel Umoren"
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}