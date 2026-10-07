"use client";

import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { getYouTubeId, videoTestimonies } from "@/data/video-testimonies";
import Image from "next/image";
import { testimonialBg } from "@/constants/AppImages";

export default function VideoTestimonies() {
    const items = videoTestimonies
        .map((t) => ({ ...t, id: getYouTubeId(t.url) }))
        .filter((t): t is typeof t & { id: string } => Boolean(t.id));

    const [playing, setPlaying] = useState<string | null>(null);

    if (items.length === 0) return null;

    return (
        <section className="py-20 px-4 md:px-10 bg-white relative">
            <Image
                width={1000}
                height={1000}
                src={testimonialBg}
                alt=""
                className="w-full h-full absolute top-0 left-0 object-cover"
            />
            <div className="max-w-7xl mx-auto relative">
                <div className="mb-8 sm:mb-12">
                    <p className="text-red-600 text-base sm:text-xl font-medium sm:mb-2">
                        Watch &amp; Be Encouraged
                    </p>
                    <h2 className="text-3xl sm:text-5xl font-bold">
                        Video Testimonies
                    </h2>
                    <p className="text-gray-600 text-base sm:text-xl max-w-3xl">
                        Testimonies contribute to the spiritual growth and
                        edification of believers, fostering a deeper sense of
                        faith, unity, and connection among members. We celebrate
                        God&apos;s work in individuals&apos; lives because it
                        provides valuable lessons and inspiration to the entire
                        congregation.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <article
                            key={item.id}
                            className="rounded-lg overflow-hidden border-t-2 border-appRed shadow-sm bg-white"
                        >
                            <div className="relative aspect-video bg-black">
                                {playing === item.id ? (
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${item.id}?autoplay=1&rel=0&playsinline=1`}
                                        title={`${item.name ?? "Testimony"} video`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    />
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setPlaying(item.id)}
                                        aria-label={`Play testimony${item.name ? ` by ${item.name}` : ""}`}
                                        className="group absolute inset-0 w-full h-full"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
                                            alt=""
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                        />
                                        <span className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                                        <span className="absolute inset-0 flex items-center justify-center">
                                            <span className="w-16 h-16 rounded-full bg-appRed text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                <Play
                                                    className="w-7 h-7 ml-1"
                                                    fill="currentColor"
                                                />
                                            </span>
                                        </span>
                                    </button>
                                )}
                            </div>
                            <div className="p-4 flex items-start justify-between gap-4">
                                <div>
                                    {item.title && (
                                        <h3 className="font-semibold text-lg">
                                            {item.title}
                                        </h3>
                                    )}
                                    {item.name && (
                                        <p className="text-gray-600">
                                            {item.name}
                                        </p>
                                    )}
                                </div>
                                <a
                                    href={`https://www.youtube.com/watch?v=${item.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto shrink-0 inline-flex items-center gap-1 text-sm font-medium text-appRed hover:underline"
                                >
                                    Watch on YouTube
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
