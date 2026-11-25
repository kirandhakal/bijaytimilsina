import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Bijay Timilsina — Developer · Designer · Creator",
  description:
    "Crafting exceptional digital experiences from Pokhara, Nepal. UI/UX designer, web developer, freelancer, and digital creator.",
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
