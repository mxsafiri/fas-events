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
