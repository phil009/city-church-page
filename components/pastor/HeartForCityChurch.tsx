"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Heart, 
  BookOpen, 
  Sparkles, 
  Users, 
  Flame, 
  Compass, 
  ArrowUpRight 
} from "lucide-react";
import { 
  daddyTInAction, 
  pastorTonyTraditionalStanding, 
  daddyTHebrews 
} from "@/constants/AppImages";
import Link from "next/link";

const expressions = [
  {
    title: "Teaching",
    description: "Unpacking the Word of God with clarity, revelation, and practical depth.",
    icon: BookOpen,
  },
  {
    title: "Worship",
    description: "Creating an atmosphere of passionate, authentic adoration for Jesus.",
    icon: Flame,
  },
  {
    title: "Discipleship",
    description: "Walking alongside believers as they grow in Scripture and spiritual maturity.",
    icon: Compass,
  },
  {
    title: "Community",
    description: "Fostering loving, intentional relationships where everyone truly belongs.",
    icon: Users,
  },
];

export default function HeartForCityChurch() {
  return (
    <section 
      id="heart-for-city-church" 
      className="py-24 px-4 sm:px-8 md:px-16 lg:px-20 bg-zinc-900 text-white relative overflow-hidden"
    >
      {/* Background ambient accents */}
      <div className="absolute -top-24 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-appRed bg-red-950/80 border border-red-500/25 px-4 py-1.5 rounded-full">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Ministry Purpose</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            His Heart for City Church
          </h2>
          <p className="text-zinc-300 text-lg sm:text-xl font-medium leading-relaxed">
            Pastor Tony’s leadership at City Church is rooted in a commitment to the Word of God, spiritual growth and the development of people.
          </p>
        </div>

        {/* Narrative & Image Collage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text / Detailed Narrative */}
          <div className="lg:col-span-6 space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed">
            <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800 shadow-md">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-appRed" />
                Beyond Sunday Attendance
              </h3>
              <p className="text-zinc-300">
                His desire is to see people move beyond attending church to building a genuine relationship with God, growing in their understanding of Scripture and living out their faith in everyday life.
              </p>
            </div>

            <p>
              At City Church, this commitment finds expression through <strong className="text-white">teaching, worship, discipleship, community</strong> and the ongoing work of <strong className="text-white">raising change agents</strong> who can influence their world for good.
            </p>

            {/* Expression Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {expressions.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/80 hover:border-appRed/50 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-8 h-8 rounded-lg bg-red-950/50 border border-red-500/20 flex items-center justify-center text-appRed group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-white text-base">{item.title}</h4>
                    </div>
                    <p className="text-xs text-zinc-400 leading-snug">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-appRed hover:text-red-400 transition-colors"
              >
                <span>Read our full vision and 16-year story</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-12 gap-3.5 sm:gap-4 items-center">
              {/* Main Action Photo */}
              <div className="col-span-8 relative aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl group">
                <Image
                  src={daddyTInAction}
                  alt="Pastor Tony ministering in action at City Church"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-zinc-300 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <span className="font-bold text-white block">Passionate Preaching</span>
                  Unpacking revelation with clarity and fire
                </div>
              </div>

              {/* Stacked secondary photos */}
              <div className="col-span-4 space-y-3.5 sm:space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800 shadow-lg group">
                  <Image
                    src={pastorTonyTraditionalStanding}
                    alt="Pastor Tony Aleogena Raphael"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 shadow-lg group">
                  <Image
                    src={daddyTHebrews}
                    alt="City Church Pulpit Teaching"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-red-950/30" />
                </div>
              </div>
            </div>

            {/* Floating Pull Quote Badge */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-red-950/70 to-zinc-950 border border-red-500/20 text-xs sm:text-sm text-zinc-200 italic shadow-lg">
              &ldquo;Raising change agents who can influence their world for good.&rdquo;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
