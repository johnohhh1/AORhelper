import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AOR Leader App",
  description: "Area of Ownership Leader Management Application for Chili's Bar & Grill",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
