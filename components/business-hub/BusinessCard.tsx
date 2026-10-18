"use client";

import React from "react";
import Image from "next/image";
import { Business } from "@/types/business-hub";
import { Icon } from "@iconify/react";

interface BusinessCardProps {
  business: Business;
  onSelect: (business: Business) => void;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business, onSelect }) => {
  const whatsappUrl = `https://wa.me/${business.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello ${business.name}, I found your business on the City Church ACCELER8 Business Hub!`
  )}`;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:border-zinc-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Cover Image Container */}
        <div className="relative h-52 w-full overflow-hidden bg-zinc-100">
          <Image
            src={business.images[0] || "/placeholder.svg"}
            alt={business.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center gap-2">
            <span className="bg-white/90 backdrop-blur-md text-zinc-900 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <Icon icon="solar:map-point-bold" className="text-appRed text-sm" />
              {business.location.area || business.location.city}
            </span>

            {business.isVerified && (
              <span className="bg-emerald-600/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Icon icon="solar:check-circle-bold" className="text-white text-sm" />
                Church Member
              </span>
            )}
          </div>

          {/* Member Discount Strip Overlay */}
          {business.memberDiscount && (
            <div className="absolute bottom-2 left-3 right-3 bg-amber-500/95 backdrop-blur-md text-zinc-950 font-bold text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
              <Icon icon="solar:sale-square-bold" className="text-zinc-950 text-sm flex-shrink-0" />
              <span className="truncate">{business.memberDiscount.title}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium mb-1.5">
            <span className="uppercase tracking-wider font-bold text-appRed">{business.category}</span>
            <span>•</span>
            <span className="truncate text-zinc-600">{business.churchEngagement.unitOrFellowship}</span>
          </div>

          <h3 className="text-lg font-bold text-zinc-900 line-clamp-1 group-hover:text-appRed transition-colors">
            {business.name}
          </h3>

          <p className="text-xs text-zinc-500 font-medium line-clamp-1 mb-2">
            {business.tagline}
          </p>

          <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed mb-4">
            {business.description}
          </p>

          {/* Services Pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {business.services.slice(0, 2).map((srv, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-zinc-100 text-zinc-700 font-medium px-2 py-0.5 rounded-md truncate max-w-[200px]"
              >
                {srv}
              </span>
            ))}
            {business.services.length > 2 && (
              <span className="text-[11px] bg-zinc-100 text-zinc-500 font-medium px-1.5 py-0.5 rounded-md">
                +{business.services.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-5 pt-0 border-t border-zinc-100 mt-2 flex items-center gap-2">
        <button
          onClick={() => onSelect(business)}
          className="flex-1 text-center py-2 px-3 text-xs font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors"
        >
          View Profile
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm"
          title="Chat directly on WhatsApp"
        >
          <Icon icon="logos:whatsapp-icon" className="text-sm" />
          <span>Chat</span>
        </a>
      </div>
    </div>
  );
};
