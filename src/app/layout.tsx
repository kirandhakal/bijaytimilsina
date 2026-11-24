import type { Metadata } from "next";
import ScrollMotion from "@/components/ScrollMotion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { profile } from "@/data/portfolio";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: {
    default: "Bijay Timilsina | Developer & Digital Creator",
    template: "%s | Bijay Timilsina",
  },
  description: "Developer, designer, and digital creator in Pokhara, Nepal.",
  icons: { icon: "/favicon.png" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ScrollMotion />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
