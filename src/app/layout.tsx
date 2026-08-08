import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#060913",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mdalamin.site"),
  title: {
    default: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}`,
    template: `%s | ${PERSONAL_INFO.name}`,
  },
  description: PERSONAL_INFO.longBio,
  keywords: [
    "Shopify Developer",
    "Shopify App Developer",
    "Shopify Theme Developer",
    "React Developer",
    "Next.js Developer",
    "Frontend Engineer",
    "Liquid Shopify Expert",
    "Md Al Amin Islam",
    "Full Stack Web Developer",
    "Headless E-commerce Developer",
  ],
  authors: [{ name: PERSONAL_INFO.name, url: "https://mdalamin.site" }],
  creator: PERSONAL_INFO.name,
  publisher: PERSONAL_INFO.name,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mdalamin.site",
    title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}`,
    description: PERSONAL_INFO.bio,
    siteName: `${PERSONAL_INFO.name} Portfolio`,
    images: [
      {
        url: "/images/cover-profile.webp",
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
    images: ["/images/cover-profile.webp"],
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
    canonical: "https://mdalamin.site",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://mdalamin.site/#person",
        name: PERSONAL_INFO.name,
        jobTitle: PERSONAL_INFO.role,
        url: "https://mdalamin.site",
        image: "https://mdalamin.site/images/cover-profile.webp",
        sameAs: [
          PERSONAL_INFO.github,
          PERSONAL_INFO.linkedin,
          PERSONAL_INFO.facebook,
        ],
        knowsAbout: [
          "Shopify App Development",
          "Shopify Theme Development",
          "Liquid",
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "GraphQL Admin API",
          "Node.js",
          "Web Performance Optimization",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://mdalamin.site/#website",
        url: "https://mdalamin.site",
        name: `${PERSONAL_INFO.name} Portfolio`,
        description: PERSONAL_INFO.bio,
        author: {
          "@id": "https://mdalamin.site/#person",
        },
      },
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
