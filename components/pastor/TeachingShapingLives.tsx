"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Briefcase, 
  Crown, 
  Coins, 
  Play, 
  ExternalLink, 
  ShoppingBag, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    title: "Faith",
    tagline: "Anchored in Scripture",
    description:
      "Deepening spiritual conviction, understanding the authority of the Word, and learning to walk in communion with the Holy Spirit daily.",
    icon: BookOpen,
    accent: "from-red-500/20 to-transparent",
    border: "border-red-500/30",
  },
  {
    title: "Work & Career",
    tagline: "Kingdom in the Marketplace",
    description:
      "Bridging the sacred and secular divide. Equipping professionals and entrepreneurs to lead with excellence, integrity, and divine wisdom.",
    icon: Briefcase,
    accent: "from-amber-500/20 to-transparent",
    border: "border-amber-500/30",
  },
  {
    title: "Leadership",
    tagline: "Character & Influence",
    description:
      "Raising servant leaders who inspire, mentor, and build people. Cultivating the courage and capacity to drive positive change.",
    icon: Crown,
    accent: "from-rose-500/20 to-transparent",
    border: "border-rose-500/30",
  },
  {
    title: "Stewardship",
    tagline: "Purposeful Management",
    description:
      "Managing time, personal finances, resources, and God-given talents with biblical wisdom to build enduring value and generosity.",
    icon: Coins,
    accent: "from-emerald-500/20 to-transparent",
    border: "border-emerald-500/30",
  },
];

const featuredTeachings = [
  {
    title: "Becoming a Change Agent: Walking in Divine Influence",
    series: "Change Agents Series",
    duration: "48 mins",
    summary: "How ordinary believers are positioned by God to bring supernatural answers to cultural and societal challenges.",
    videoId: "kJQP7kiw5Fk",
  },
  {
    title: "Living as Salt & Light in the Marketplace",
    series: "Kingdom Life",
    duration: "52 mins",
    summary: "Practical frameworks for Christian professionals to stand out without compromising biblical convictions.",
    videoId: "3JZ_D3ELwOQ",
  },
  {
    title: "You, Your Money and God",
    series: "Stewardship & Wealth",
    duration: "Store Special",
    summary: "Breaking financial lack through revelation, kingdom diligence, and purposeful capital stewardship.",
    videoId: "bHQq00Wl3pA",
  },
];

export default function TeachingShapingLives() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="py-24 px-4 sm:px-8 md:px-16 lg:px-20 bg-black text-white relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-appRed bg-red-950/80 border border-red-500/25 px-4 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Biblical Insights & Practical Living</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Teaching That Shapes Lives
          </h2>
          <p className="text-xl text-zinc-300 font-medium">
            The Word of God is central to the life and ministry of City Church.
          </p>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Through biblical teaching and practical insights, Pastor Tony encourages people to understand Scripture, apply its principles and make faith-informed decisions in their everyday lives.
          </p>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            His wider teaching and communication work also explores practical aspects of Christian living, including <span className="text-white font-semibold">faith, work, leadership</span> and <span className="text-white font-semibold">stewardship</span>.
          </p>
        </div>

        {/* 4 Teaching Dimensions (Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className={`p-6 sm:p-7 rounded-2xl bg-gradient-to-b ${pillar.accent} to-zinc-950 border ${pillar.border} flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-lg`}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                    <Icon className="w-6 h-6 text-appRed" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-zinc-400">
                      {pillar.tagline}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-0.5">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Sermon Series Spotlight */}
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-appRed">
                Curated Series
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Spotlight Teachings & Messages
              </h3>
              <p className="text-sm text-zinc-400 mt-1 max-w-xl">
                Experience practical revelation straight from the pulpit to fuel your everyday walk.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/live"
                className="bg-appRed hover:bg-red-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors shadow-sm"
              >
                <span>Watch Full Live Library</span>
                <Play className="w-3.5 h-3.5 fill-current" />
              </Link>
              <Link
                href="/store"
                className="border border-zinc-700 hover:border-zinc-500 bg-zinc-800 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors"
              >
                <span>Browse Store Audio Series</span>
                <ShoppingBag className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTeachings.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-zinc-700 flex flex-col justify-between space-y-4 group transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="text-appRed font-semibold">{item.series}</span>
                    <span>{item.duration}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/live?sermon=${item.videoId}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-appRed transition-colors"
                  >
                    <span>Watch Message</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
