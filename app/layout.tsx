import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://ends.to";
const SITE_NAME = "ends.to";
const DESCRIPTION =
  "Create a short link with a fully custom preview — choose the title, description, and thumbnail that show when it's shared, then point it anywhere you want.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Custom Link Preview Generator",
    template: "%s · ends.to",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "custom link preview",
    "link preview generator",
    "change link thumbnail",
    "custom open graph image",
    "link preview editor",
    "url shortener with custom preview",
    "edit link preview",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Custom Link Preview Generator",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Link Preview Generator",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const noFlashScript = `(function(){try{var m=localStorage.getItem("mode");if(m!=="dark"&&m!=="light"){m="dark";}document.documentElement.setAttribute("data-mode",m);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-mode="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
