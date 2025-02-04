import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const font = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "City Church Calabar",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable} antialiased bg-white relative`}>
        <Navbar />
        <Suspense fallback={<Loading />}>
          <div className="min-h-screen">{children}</div>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
