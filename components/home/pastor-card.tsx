"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface PastorCardProps {
    name: string;
    position: string;
    video: string;
    play: boolean;
    href?: string;
}

export const PastorCard = ({
    name,
    position,
    video,
    play,
    href,
}: PastorCardProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const el = videoRef.current;
        if (!el || !play) return;

        el.currentTime = 0;
        el.play().catch(() => {});
    }, [play]);

    const cardContent = (
        <div className="rounded-3xl bg-appDark overflow-hidden relative aspect-[3/4] w-full max-w-64 border border-zinc-800/80 group-hover:border-appRed/50 transition-all duration-300 shadow-lg">
            <video
                ref={videoRef}
                src={video}
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-appDark/95 via-appDark/40 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1">
                {href && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-appRed bg-red-950/70 border border-red-500/30 px-2.5 py-0.5 rounded-full mb-1">
                        <span>Meet Pastor</span>
                        <ArrowUpRight className="w-3 h-3" />
                    </span>
                )}
                <h3 className="text-base sm:text-xl font-bold sm:mb-1 group-hover:text-red-300 transition-colors">
                    {name}
                </h3>
                <p className="text-gray-300 text-sm">{position}</p>
            </div>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="group block cursor-pointer">
                {cardContent}
            </Link>
        );
    }

    return cardContent;
};

