"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export const HomeBusinessHubBanner = () => {
  return (
    <section className="px-4 sm:px-12 md:px-20 py-12 bg-white">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white p-8 sm:p-12 border border-zinc-800 shadow-xl">
        {/* Glow decorative effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-appRed/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-appRed/20 border border-appRed/40 text-appRed px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <Icon icon="solar:crown-star-bold" className="text-sm" />
              <span>ACCELER8 Business Hub • Kingdom Economy</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Support City Church Member Businesses & Enjoy Exclusive Discounts
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Explore verified commercial enterprises, agribusinesses, tech studios, artisans, and professional services operated by members of our congregation. Build intentional cross-patronage across our church family.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-[11px] bg-white/10 text-zinc-200 px-3 py-1 rounded-full">
                🌾 Agribusiness & Farms
              </span>
              <span className="text-[11px] bg-white/10 text-zinc-200 px-3 py-1 rounded-full">
                💻 Tech & Digital Studios
              </span>
              <span className="text-[11px] bg-white/10 text-zinc-200 px-3 py-1 rounded-full">
                ☕ Dining & Bakeries
              </span>
              <span className="text-[11px] bg-white/10 text-zinc-200 px-3 py-1 rounded-full">
                ✂️ Fashion & Tailoring
              </span>
              <span className="text-[11px] bg-white/10 text-zinc-200 px-3 py-1 rounded-full">
                🏷️ Member-Only Discounts
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
            <Link
              href="/business-hub"
              className="bg-appRed hover:bg-red-700 text-white font-bold text-sm py-3.5 px-7 rounded-2xl shadow-lg transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Explore Business Directory</span>
              <Icon icon="solar:arrow-right-bold" className="text-base" />
            </Link>

            <Link
              href="/business-hub#directory"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm py-3.5 px-7 rounded-2xl border border-white/15 transition-colors text-center flex items-center justify-center gap-2"
            >
              <Icon icon="solar:shop-2-bold" className="text-amber-400 text-lg" />
              <span>List Your Enterprise</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
