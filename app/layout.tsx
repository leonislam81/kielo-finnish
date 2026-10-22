import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kielo — Learn Finnish",
  description: "Learn Finnish with English or Bangla support and stories from Finland.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
