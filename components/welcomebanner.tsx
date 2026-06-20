"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { digitalDisciplesModal } from "@/constants/AppImages";

const SESSION_KEY = "dd_banner_seen";

export default function WelcomeModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem(SESSION_KEY)) return;
        const timer = setTimeout(() => setIsOpen(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        sessionStorage.setItem(SESSION_KEY, "1");
        setIsOpen(false);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) handleClose();
            }}
        >
            <DialogContent className="max-w-3xl bg-white flex flex-col md:flex-row p-0 overflow-hidden">
                {/* Image Section — swap src when the artwork is ready */}
                <div className="w-full md:w-2/5 relative bg-appDark min-h-[200px] md:min-h-0">
                    <Image
                        src={digitalDisciplesModal}
                        alt="Digital Disciples Campaign"
                        fill
                        priority
                        quality={100}
                        className="object-cover"
                    />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                    <div className="space-y-3">
                        <p className="text-appRed text-xs font-semibold tracking-widest uppercase">
                            City Church Socials
                        </p>

                        <h2 className="text-xl md:text-2xl font-bold text-appDark leading-tight">
                            Become a Digital Disciple
                        </h2>

                        <p className="text-gray-600 text-xs leading-relaxed">
                            City Church is building a{" "}
                            <span className="font-semibold text-appDark">
                                Structured Engagement Force
                            </span>{" "}
                            to carry the message further online. Join one of
                            three roles and help us cross the{" "}
                            <span className="font-semibold text-appRed">
                                Golden 15
                            </span>{" "}
                            — the first 15 minutes that determine how far every
                            post travels.
                        </p>

                        <ul className="space-y-2 text-xs text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="inline-flex w-5 h-5 bg-appRed rounded-full text-white items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                    A
                                </span>
                                <span>
                                    <span className="font-semibold">
                                        Amplifier
                                    </span>{" "}
                                    — like, comment &amp; share within 15
                                    minutes of every post.
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="inline-flex w-5 h-5 bg-appRed rounded-full text-white items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                    C
                                </span>
                                <span>
                                    <span className="font-semibold">
                                        Connector
                                    </span>{" "}
                                    — distribute content into WhatsApp groups
                                    &amp; communities.
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="inline-flex w-5 h-5 bg-appRed rounded-full text-white items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                    Cr
                                </span>
                                <span>
                                    <span className="font-semibold">
                                        Creator
                                    </span>{" "}
                                    — produce graphics, videos, and copy for the
                                    team.
                                </span>
                            </li>
                        </ul>

                        <div className="pt-3 space-y-2">
                            <Link
                                href="/digital-disciples"
                                onClick={handleClose}
                                className="block"
                            >
                                <Button className="w-full bg-appRed hover:bg-red-700 text-white font-semibold">
                                    Sign Up Now
                                </Button>
                            </Link>
                            <button
                                onClick={handleClose}
                                className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
                            >
                                Maybe later
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
