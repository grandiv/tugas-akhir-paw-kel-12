import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SearchProvider } from "@/context/SearchContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ladang Lokal - Your Go To Local Market",
  description: "Fresh groceries from local farmers",
  icons: {
    icon: "/Logo_icon.png",
    shortcut: "/Logo_icon.png",
    apple: "/Logo_icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/Logo_icon.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SearchProvider>
          <Navbar />
          <main className="container mx-auto mt-4">{children}</main>
        </SearchProvider>
      </body>
    </html>
  );
}
