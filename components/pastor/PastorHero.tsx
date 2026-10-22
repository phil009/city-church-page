"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ExternalLink, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Compass, 
  Heart, 
  ShieldCheck,
  ChevronDown
} from "lucide-react";
import { pastorTonyBlueSuit } from "@/constants/AppImages";
import MinistryInviteDialog from "./MinistryInviteDialog";

export const PASTOR_PERSONAL_WEBSITE_URL = "https://tonyaleogenaraphael.com";

export default function PastorHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative min-h-[92vh] bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white pt-32 pb-20 px-4 sm:px-8 md:px-16 lg:px-20 overflow-hidden flex flex-col justify-center">
      {/* Background atmospheric glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-transparent to-black/90 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Column: Core Narrative & Persona */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 space-y-7"
        >
          {/* Eyebrow badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs uppercase font-extrabold tracking-widest text-appRed bg-red-950/80 border border-red-500/30 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-appRed animate-pulse" />
              Meet Pastor Tony
            </span>
            <span className="text-xs font-semibold tracking-wide text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-3.5 py-1.5 rounded-full">
              Lead Pastor • City Church Calabar
            </span>
          </div>

          {/* Three Subtitle Anchors from Document */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              A Life of Faith. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-200">
                A Heart for People.
              </span> <br />
              A Commitment to God&apos;s Purpose.
            </h1>
          </div>

          {/* Opening Paragraphs from Document */}
          <div className="space-y-4 text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            <p className="border-l-2 border-appRed pl-4 text-zinc-200 italic font-medium bg-red-950/20 py-2 rounded-r-lg">
              At City Church Calabar, leadership is more than a position. It is a responsibility to serve, teach, guide and help people grow in their relationship with God.
            </p>

            <p>
              <strong className="text-white font-semibold">Pastor Tony Aleogena Raphael (TAR)</strong> serves as the Lead Pastor of City Church Calabar, providing spiritual leadership and teaching as the church pursues its God-given vision.
            </p>

            <p className="text-zinc-400 text-sm sm:text-base">
              Through preaching, discipleship, leadership development and his investment in people, he is committed to helping believers grow in faith and live with purpose.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            {/* Primary link: Pastor's personal website backlink */}
            <a
              href={PASTOR_PERSONAL_WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="pastor-personal-website-btn"
              className="bg-appRed hover:bg-red-700 text-white font-semibold px-7 py-3.5 rounded-full text-sm sm:text-base transition-all duration-300 flex items-center gap-2 shadow-lg shadow-red-950/40 hover:shadow-red-700/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Visit Pastor Tony&apos;s Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <Link
              href="/plan-your-visit"
              className="border border-zinc-700 hover:border-zinc-500 bg-zinc-900/80 hover:bg-zinc-800 text-white font-semibold px-6 py-3.5 rounded-full text-sm sm:text-base transition-all duration-200 shadow-sm"
            >
              Plan Your Visit
            </Link>

            <MinistryInviteDialog />
          </div>

          {/* Quick Metrics / Pillar highlights */}
          <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">16+ Yrs</div>
              <div className="text-xs text-zinc-400 mt-0.5">Pastoral Leadership</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">TAR</div>
              <div className="text-xs text-zinc-400 mt-0.5">Spiritual Leader</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">Change Agents</div>
              <div className="text-xs text-zinc-400 mt-0.5">Life Development</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Visual Showcase (Portrait + Video Reel Reel) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative mx-auto max-w-[420px] sm:max-w-[460px]">
            {/* Outer subtle decorative frame */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-appRed/30 via-transparent to-red-500/20 rounded-3xl blur-xl" />

            {/* Main Portrait Card */}
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl aspect-[4/5]">
              <Image
                src={pastorTonyBlueSuit}
                alt="Pastor Tony Aleogena Raphael - Lead Pastor City Church Calabar"
                fill
                priority
                className="object-cover object-top"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

              {/* Floating Bottom Card Details */}
              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-1.5">
                <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs text-zinc-300 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-appRed" />
                  <span>Lead Pastor • City Church Calabar</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  Pst. Tony Aleogena Raphael
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  Providing spiritual leadership, revelation-grounded teaching, and equipping change agents.
                </p>
              </div>
            </div>

            {/* Floating Mini Video Reel Card (Corner pip) */}
            <div className="absolute -bottom-8 -left-4 sm:-left-8 w-44 sm:w-52 aspect-[9/14] rounded-2xl overflow-hidden border-2 border-zinc-700 bg-zinc-900 shadow-2xl hidden sm:block">
              <video
                ref={videoRef}
                src="/videos/pastor-tony-1.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

              {/* Video control buttons */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="w-7 h-7 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-colors border border-white/10"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="w-7 h-7 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-colors border border-white/10"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Caption */}
              <div className="absolute bottom-2.5 left-3 right-3 text-[11px] text-zinc-300 font-medium">
                <span className="block text-white font-bold text-xs">In His Element</span>
                Teaching & Shepherding
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Down arrow anchor */}
      <div className="mt-14 sm:mt-16 text-center relative z-10 flex justify-center">
        <a
          href="#heart-for-city-church"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
        >
          <span>Explore His Heart for City Church</span>
          <ChevronDown className="w-4 h-4 text-appRed animate-bounce" />
        </a>
      </div>
    </section>
  );
}
