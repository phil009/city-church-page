"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import Logo from "./logo";

export default function Navbar() {
    const scrollDirection = useScrollDirection();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);

        return () => {
            window.removeEventListener("resize", checkIsMobile);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="w-full text-sm text-white fixed top-0 z-50">
            <AnimatePresence>
                {scrollDirection === "up" && !isMobile && (
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
                                        The Big Tent, 98 Marian road, Calabar
                                    </span>
                                </span>
                                <span className="opacity-70">/</span>
                                <a
                                    href="mailto:info@citychurchcalabar.org"
                                    className="cursor-pointer hover:text-appRed"
                                >
                                    info@citychurchcalabar.org
                                </a>
                            </div>

                            <ul className="hidden md:flex gap-4">
                                <li>
                                    <Link href={"/events"}>Events</Link>
                                </li>
                                <span className="opacity-70">/</span>
                                <li>
                                    <Link href={"/store"}>Store</Link>
                                </li>
                                <span className="opacity-70">/</span>
                                <li>
                                    <Link href={"/prayer-request"}>
                                        Send Prayer Request
                                    </Link>
                                </li>
                                <span className="opacity-70">/</span>
                                <li>
                                    <Link href={"/giving"}>Give</Link>
                                </li>
                                {/* <span className="opacity-70">/</span>
                                <li>
                                    <Link href={"/shape-assessment"}>
                                        S.H.A.P.E.
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className={`flex w-full py-3 px-4 md:px-10 bg-appDark justify-between ${
                    isMobile ? "" : "bg-opacity-80"
                } items-center`}
                animate={{
                    paddingTop: scrollDirection === "up" ? "0.75rem" : "1rem",
                    paddingBottom:
                        scrollDirection === "up" ? "0.75rem" : "1rem",
                }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex gap-6 items-center">
                    <div className="w-32 lg:w-60">
                        <Logo />
                    </div>
                    <ul className="hidden lg:flex gap-5 lg:gap-7 uppercase text-xs lg:text-sm font-semibold tracking-wide items-center">
                        <li className="hover:text-appRed transition-colors">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="hover:text-appRed transition-colors">
                            <Link href="/about">About</Link>
                        </li>
                        <li className="hover:text-appRed transition-colors">
                            <Link href="/live">Watch</Link>
                        </li>
                        <li className="hover:text-appRed transition-colors">
                            <Link href="/small-groups">Connect</Link>
                        </li>
                        <li className="hover:text-appRed transition-colors">
                            <Link href="/ministries">Ministries</Link>
                        </li>
                        <li className="hover:text-appRed transition-colors">
                            <Link href="/events">Events</Link>
                        </li>
                        <li className="hover:text-appRed transition-colors">
                            <Link href="/giving">Give</Link>
                        </li>
                    </ul>
                </div>
                <div className="hidden lg:flex items-center gap-4">
                    <Link
                        href="/plan-your-visit"
                        className="bg-appRed hover:bg-red-700 text-white font-semibold text-xs lg:text-sm px-4 py-2.5 rounded-full uppercase tracking-wider transition-colors shadow-md"
                    >
                        Plan Your Visit
                    </Link>
                    <a
                        href="tel:+2348036811155"
                        className="hidden xl:flex items-center gap-2 hover:text-appRed transition-colors"
                    >
                        <Icon
                            className="text-2xl lg:text-4xl text-appRed"
                            icon={"solar:phone-line-duotone"}
                        />
                        <div className="text-xs">
                            We CARE! Call us: <br />
                            <b className="text-sm">+234 803 681 1155</b>
                        </div>
                    </a>
                </div>
                {isMobile && (
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <Icon
                            icon={isMenuOpen ? "mdi:close" : "mdi:menu"}
                            className="text-3xl"
                        />
                    </button>
                )}
            </motion.div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobile && isMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-y-0 right-0 w-64 bg-appDark shadow-lg z-50"
                    >
                        <div className="flex flex-col h-full">
                            <div className="p-4 border-b border-appBorderGray">
                                <button
                                    onClick={closeMenu}
                                    className="text-white focus:outline-none"
                                    aria-label="Close menu"
                                >
                                    <Icon
                                        icon="mdi:close"
                                        className="text-3xl"
                                    />
                                </button>
                            </div>
                            <ul className="flex-grow p-4 space-y-3.5 text-sm font-medium">
                                <li className="hover:text-appRed">
                                    <Link href="/" onClick={closeMenu}>Home</Link>
                                </li>
                                <li className="hover:text-appRed">
                                    <Link href="/about" onClick={closeMenu}>About</Link>
                                </li>
                                <li className="hover:text-appRed">
                                    <Link href="/live" onClick={closeMenu}>Watch</Link>
                                </li>
                                <li className="hover:text-appRed">
                                    <Link href="/small-groups" onClick={closeMenu}>Connect / Small Groups</Link>
                                </li>
                                <li className="hover:text-appRed">
                                    <Link href="/ministries" onClick={closeMenu}>Ministries</Link>
                                </li>
                                <li className="hover:text-appRed">
                                    <Link href="/events" onClick={closeMenu}>Events</Link>
                                </li>
                                <li className="hover:text-appRed">
                                    <Link href="/giving" onClick={closeMenu}>Give</Link>
                                </li>
                                <li className="hover:text-appRed">
                                    <Link href="/prayer-request" onClick={closeMenu}>Prayer Request</Link>
                                </li>
                                <li className="hover:text-appRed">
                                    <Link href="/contact" onClick={closeMenu}>Contact</Link>
                                </li>
                            </ul>
                            <div className="p-4 border-t border-appBorderGray">
                                <Link
                                    href="/plan-your-visit"
                                    onClick={closeMenu}
                                    className="block w-full text-center bg-appRed hover:bg-red-700 text-white font-semibold text-sm py-2.5 rounded-full uppercase tracking-wider mb-4 shadow"
                                >
                                    Plan Your Visit
                                </Link>
                                <a
                                    href="tel:+2348036811155"
                                    className="flex items-center gap-2 mb-3 hover:text-appRed transition-colors"
                                >
                                    <Icon
                                        className="text-2xl text-appRed"
                                        icon={"solar:phone-line-duotone"}
                                    />
                                    <div className="text-xs">
                                        We CARE! Call us: <br />
                                        <b className="text-sm">+234 803 681 1155</b>
                                    </div>
                                </a>
                                <div className="text-xs grid gap-1.5 opacity-90">
                                    <p>
                                        <b className="text-white">Address:</b> The Big Tent, 98 Marian road, Calabar
                                    </p>
                                    <p>
                                        <b className="text-white">Email:</b>{" "}
                                        <a href="mailto:info@citychurchcalabar.org" className="hover:text-appRed">
                                            info@citychurchcalabar.org
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
