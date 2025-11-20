import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import LayoutProvider from "@/components/LayoutProvider";

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fas Exclusive Planners - Creating Memorable Moments in Dar es Salaam",
  description: "Full-service event planning, catering & décor — seamless, stylish, unforgettable. Weddings, corporate events, and private celebrations in Dar es Salaam, Tanzania.",
  keywords: "event planning, wedding planner, catering, décor, Dar es Salaam, Tanzania, corporate events",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
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
      <body className={`${body.variable} font-body antialiased bg-[var(--background)] text-[var(--foreground)]`}>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
