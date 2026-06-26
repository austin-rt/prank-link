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

export const metadata: Metadata = {
  title: "Create a link",
  description: "Create a link with a custom preview that points wherever you want.",
};

// Set data-mode before paint so there's no flash of the wrong theme.
// Persisted choice wins; otherwise fall back to the OS preference.
const noFlashScript = `(function(){try{var m=localStorage.getItem("mode");if(m!=="dark"&&m!=="light"){m=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-mode",m);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-mode="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        {children}
      </body>
    </html>
  );
}
