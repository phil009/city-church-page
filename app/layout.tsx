import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import Logo from "@/components/logo";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Footer from "@/components/footer";

const font = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "City Church Calabr",
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
        <nav className="w-full text-sm text-white fixed top-0">
          <div className="flex w-full py-3 px-10 bg-appDark justify-between">
            <div className="flex gap-3">
              <span>
                Address:{" "}
                <span className="cursor-pointer hover:text-appRed">
                  98 Ndidem Usang Iso Rd, Efut Ekondo 540222, Calabar, Cross
                  River
                </span>
              </span>
              <span className="opacity-70">/</span>
              <span className="cursor-pointer hover:text-appRed">
                info@citychurchcalabar.org
              </span>
            </div>

            <ul className="flex gap-4">
              <li>
                <Link href={"/about"}>About</Link>
              </li>
              <span className="opacity-70">/</span>
              <li>
                <Link href={"/ministries"}>Ministries</Link>
              </li>
              <span className="opacity-70">/</span>
              <li>
                <Link href={"/prayer-request"}>Send Prayer Request</Link>
              </li>
              <span className="opacity-70">/</span>
              <li>
                <Link href={"/giving"}>Give</Link>
              </li>
            </ul>
          </div>
          <div className="flex w-full py-3 px-10 bg-appDark justify-between bg-opacity-90">
            <div className="flex gap-6 items-center">
              <div className="w-full flex items-center justify-between max-w-72">
                <Logo />
              </div>
              <ul className="flex gap-4 uppercase text-lg font-bold">
                <li>
                  <Link href={"/about"}>About</Link>
                </li>
                <li>
                  <Link href={"/ministries"}>Ministries</Link>
                </li>
                <li>
                  <Link href={"/events"}>Events</Link>
                </li>
                <li>
                  <Link href={"/giving"}>Giving</Link>
                </li>
                <li>
                  <Link href={"/store"}>Store</Link>
                </li>
                <li>
                  <Link href={"/contact"}>Contact</Link>
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-2">
              <Icon
                className="text-5xl text-appRed"
                icon={"solar:phone-line-duotone"}
              />
              <div>
                We CARE! Call us: <br />
                <b>+234 803 681 1155</b>
              </div>
            </div>
          </div>
        </nav>
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Footer />
      </body>
    </html>
  );
}
