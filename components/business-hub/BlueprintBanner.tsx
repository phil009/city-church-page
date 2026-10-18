"use client";

import React from "react";
import { Icon } from "@iconify/react";

export const BlueprintBanner: React.FC = () => {
  const objectives = [
    {
      title: "Centralized Data Capture",
      desc: "Creating and maintaining a comprehensive, verified repository of member-owned businesses, trades, and commercial services.",
      icon: "solar:database-bold-duotone",
    },
    {
      title: "Increased Visibility",
      desc: "Ensuring every church member knows who does what, making it effortless to identify trusted suppliers within our assembly.",
      icon: "solar:eye-bold-duotone",
    },
    {
      title: "Intentional Patronage",
      desc: "Directing members seeking products or professional services toward fellow church members to keep financial resources circulating locally.",
      icon: "solar:hand-money-bold-duotone",
    },
    {
      title: "Trust & Accountability",
      desc: "Fostering a high-trust network where members serve each other with professional excellence, integrity, and kingdom values.",
      icon: "solar:shield-check-bold-duotone",
    },
  ];

  return (
    <section className="bg-zinc-900 text-white rounded-3xl p-8 sm:p-12 border border-zinc-800 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-appRed/10 rounded-full blur-3xl pointer-events-none" />

      {/* Blueprint Header */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 bg-white/10 text-zinc-300 text-xs font-semibold px-3.5 py-1 rounded-full mb-3">
          <Icon icon="solar:document-text-bold" className="text-appRed" />
          <span>Strategic Proposal & Blueprint</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
          Why the ACCELER8 Business Hub?
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Established under the visionary leadership of our Lead Pastor,{" "}
          <span className="text-white font-semibold">Pst. Tony Aleogena Raphael</span>, to foster mutual support, economic empowerment, and deliberate kingdom cross-patronage across the City Church Calabar family.
        </p>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {objectives.map((obj, idx) => (
          <div
            key={idx}
            className="bg-zinc-800/60 border border-zinc-700/60 rounded-2xl p-5 hover:border-zinc-500 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-appRed/10 border border-appRed/30 flex items-center justify-center text-appRed text-2xl mb-4">
              <Icon icon={obj.icon} />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">
              {obj.title}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {obj.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Strategic 3-Phase Process */}
      <div className="mt-10 pt-8 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-300">
        <div className="flex items-start gap-3">
          <span className="w-7 h-7 rounded-full bg-appRed text-white flex items-center justify-center font-bold flex-shrink-0 text-xs">
            1
          </span>
          <div>
            <b className="text-white block font-semibold mb-0.5">Phase 1: Enrollment</b>
            <p className="text-zinc-400">Digital intake & data collection of member enterprises.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="w-7 h-7 rounded-full bg-appRed text-white flex items-center justify-center font-bold flex-shrink-0 text-xs">
            2
          </span>
          <div>
            <b className="text-white block font-semibold mb-0.5">Phase 2: Verification</b>
            <p className="text-zinc-400">Vetting fellowship alignment & contact channels to maintain trust.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="w-7 h-7 rounded-full bg-appRed text-white flex items-center justify-center font-bold flex-shrink-0 text-xs">
            3
          </span>
          <div>
            <b className="text-white block font-semibold mb-0.5">Phase 3: Promotion</b>
            <p className="text-zinc-400">Web directory publication, spotlight series & service announcements.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
