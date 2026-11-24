import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Spider-Man — Bahlil Morales",
  description: "A cinematic Spider-Man fan concept.",
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
        {children}
      </body>
    </html>
  );
}
