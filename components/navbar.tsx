"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import Logo from "./logo";

export default function Navbar() {
  const scrollDirection = useScrollDirection();

  return (
    <nav className="w-full text-sm text-white fixed top-0 z-50">
      <AnimatePresence>
        {scrollDirection === "up" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col text-[10px] sm:text-xs md:text-sm lg:flex-row w-full min-h-12 py-3 px-4 md:px-10 bg-appDark border-b border-appBorderGray justify-between">
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

              <ul className="hidden md:flex gap-4">
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
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="flex w-full py-3 px-4 md:px-10 bg-appDark justify-between bg-opacity-80"
        animate={{
          paddingTop: scrollDirection === "up" ? "0.75rem" : "1rem",
          paddingBottom: scrollDirection === "up" ? "0.75rem" : "1rem",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex gap-6 items-center">
          <div className="w-full flex items-center justify-between max-w-48 sm:max-w-72">
            <Logo />
          </div>
          <ul className="hidden md:flex gap-4 uppercase text-sm lg:text-lg font-bold">
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
        <div className="hidden lg:flex items-center gap-2">
          <Icon
            className="text-2xl lg:text-5xl text-appRed"
            icon={"solar:phone-line-duotone"}
          />
          <div className="text-">
            We CARE! Call us: <br />
            <b>+234 803 681 1155</b>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
