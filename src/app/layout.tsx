import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Familjen_Grotesk, Inter } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const display = Familjen_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
  colorScheme: "dark",
};

// Runs before first paint: marks JS as available (so reveal styles only hide content
// when they can be undone) and plays the countdown intro once per browser session.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');
try{var r=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!r&&!sessionStorage.getItem('ja-intro')){d.classList.add('intro-on','intro-delay');sessionStorage.setItem('ja-intro','1');}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
