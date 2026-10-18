"use client";

import React from "react";
import Image from "next/image";
import { Business } from "@/types/business-hub";
import { Icon } from "@iconify/react";

interface BusinessSpotlightProps {
  business: Business;
  onSelect: (business: Business) => void;
}

export const BusinessSpotlight: React.FC<BusinessSpotlightProps> = ({
  business,
  onSelect,
}) => {
  const whatsappUrl = `https://wa.me/${business.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello ${business.name}, I am reaching out from City Church through the ACCELER8 Business Spotlight!`
  )}`;

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white p-6 sm:p-10 border border-zinc-800 shadow-2xl">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-appRed/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Story & Spotlight Info */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 bg-appRed/20 border border-appRed/40 text-appRed px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
            <Icon icon="solar:star-bold" className="text-sm" />
            <span>ACCELER8 Member Spotlight</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {business.name}
          </h3>

          <p className="text-sm sm:text-base text-zinc-300 font-medium leading-snug">
            {business.tagline}
          </p>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
            {business.description}
          </p>

          {/* Member Special Offer Card */}
          {business.memberDiscount && (
            <div className="bg-amber-500/15 border border-amber-500/40 rounded-2xl p-4 flex items-center gap-3 max-w-xl">
              <div className="bg-amber-500 text-zinc-950 p-2 rounded-xl flex-shrink-0">
                <Icon icon="solar:gift-bold" className="text-xl" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                  Church Member Benefit
                </span>
                <p className="text-xs sm:text-sm font-bold text-white">
                  {business.memberDiscount.title}
                </p>
              </div>
            </div>
          )}

          {/* Alignment Badge */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-2">
            <div className="flex items-center gap-1.5">
              <Icon icon="solar:user-bold" className="text-appRed" />
              <span>Proprietor: <b className="text-white">{business.churchEngagement.ownerName}</b></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon icon="solar:church-bold" className="text-appRed" />
              <span>Unit: <b className="text-white">{business.churchEngagement.unitOrFellowship}</b></span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelect(business)}
              className="bg-appRed hover:bg-red-700 text-white font-bold text-xs sm:text-sm py-2.5 px-6 rounded-xl transition-colors shadow-md"
            >
              View Full Profile
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-xl transition-colors shadow-md"
            >
              <Icon icon="logos:whatsapp-icon" className="text-base" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Column: Imagery Showcase */}
        <div className="lg:col-span-5">
          <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-2xl border border-zinc-700/60">
            <Image
              src={business.images[0] || "/placeholder.svg"}
              alt={business.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs bg-white/90 text-zinc-900 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {business.location.area || business.location.city}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
