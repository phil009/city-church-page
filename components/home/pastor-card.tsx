"use client";

import { useEffect, useRef } from "react";

interface PastorCardProps {
    name: string;
    position: string;
    video: string;
    play: boolean;
}

export const PastorCard = ({
    name,
    position,
    video,
    play,
}: PastorCardProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const el = videoRef.current;
        if (!el || !play) return;

        el.currentTime = 0;
        el.play().catch(() => {});
    }, [play]);

    return (
        <div className="rounded-3xl bg-appDark overflow-hidden relative aspect-[3/4] w-full max-w-64">
            <video
                ref={videoRef}
                src={video}
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-appDark/90 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-base sm:text-xl font-bold sm:mb-2">
                    {name}
                </h3>
                <p className="text-gray-300 text-sm">{position}</p>
            </div>
        </div>
    );
};
