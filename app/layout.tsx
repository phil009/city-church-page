import type { Metadata } from "next";
// import { Rubik } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";

// const font = Rubik({
//   subsets: ["latin"],
//   variable: "--font-rubik",
// });

export const metadata: Metadata = {
  title: "City Church Calabar",
  description: "",
  icons: "/images/favicon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-white relative`}>
        <Suspense fallback={<Loading />}>
          <Navbar />
          <div className="min-h-screen">{children}</div>
          <Footer />
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
