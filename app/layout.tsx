import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOOM | Digital Business Card",
  description: "MOOM Digital Business Card Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
