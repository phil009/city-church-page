import type { Metadata } from "next";
// import { Rubik } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Loading from "./loading";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";
import WelcomeModal from "@/components/welcomebanner";

// const font = Rubik({
//   subsets: ["latin"],
//   variable: "--font-rubik",
// });

export const metadata: Metadata = {
  title: "City Church Calabar",
  description: "",
  icons: "/images/favicon.png",
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
          <Toaster richColors />
          <WelcomeModal />
        </Suspense>
      </body>
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </html>
  );
}
