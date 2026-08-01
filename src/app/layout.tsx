import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PERSONAL_INFO } from "@/data/portfolioData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alamin-dev.vercel.app"),
  title: {
    default: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}`,
    template: `%s | ${PERSONAL_INFO.name}`,
  },
  description: PERSONAL_INFO.longBio,
  keywords: [
    "Senior Frontend Engineer",
    "Creative Developer",
    "Next.js 15 Portfolio",
    "React 19 Developer",
    "TypeScript Architect",
    "3D WebGL Developer",
    "GSAP Motion Developer",
    "Tailwind CSS Designer",
    "Awwwards Portfolio",
    "Headless Shopify Specialist",
  ],
  authors: [{ name: PERSONAL_INFO.name, url: "https://alamin-dev.vercel.app" }],
  creator: PERSONAL_INFO.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alamin-dev.vercel.app",
    title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}`,
    description: PERSONAL_INFO.bio,
    siteName: `${PERSONAL_INFO.name} Portfolio`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}`,
    description: PERSONAL_INFO.bio,
    creator: "@alamin_dev",
    images: ["/og-image.jpg"],
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
  alternates: {
    canonical: "https://alamin-dev.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.role,
    url: "https://alamin-dev.vercel.app",
    sameAs: [
      PERSONAL_INFO.github,
      PERSONAL_INFO.linkedin,
      PERSONAL_INFO.facebook,
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Three.js",
      "GSAP",
      "Framer Motion",
      "Shopify Liquid",
      "Web Performance Optimization",
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen text-white font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
