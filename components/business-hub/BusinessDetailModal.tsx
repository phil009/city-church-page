"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Business } from "@/types/business-hub";
import { Icon } from "@iconify/react";

interface BusinessDetailModalProps {
  business: Business | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BusinessDetailModal: React.FC<BusinessDetailModalProps> = ({
  business,
  isOpen,
  onClose,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !business) return null;

  const whatsappUrl = `https://wa.me/${business.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello ${business.name}, I am a City Church member reaching out through the ACCELER8 Business Hub!`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto z-10 border border-zinc-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/90 text-white rounded-full p-2 backdrop-blur-md transition-colors"
          aria-label="Close dialog"
        >
          <Icon icon="solar:close-circle-bold" className="text-2xl" />
        </button>

        {/* Gallery Section */}
        <div className="relative h-64 sm:h-80 w-full bg-zinc-900">
          <Image
            src={business.images[activeImageIndex] || business.images[0] || "/placeholder.svg"}
            alt={business.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="bg-appRed text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
              {business.category}
            </span>
            {business.isVerified && (
              <span className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow">
                <Icon icon="solar:verified-check-bold" />
                Verified City Church Member
              </span>
            )}
          </div>

          {/* Name & Tagline on Image bottom */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-md">
              {business.name}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-200 font-medium drop-shadow">
              {business.tagline}
            </p>
          </div>
        </div>

        {/* Thumbnails row (if multiple images) */}
        {business.images.length > 1 && (
          <div className="flex gap-2 p-3 bg-zinc-100 overflow-x-auto border-b border-zinc-200">
            {business.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative h-14 w-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx ? "border-appRed scale-105" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`Preview ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-6">
          {/* Member Exclusive Benefit Highlight Card */}
          {business.memberDiscount && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
              <div className="bg-amber-500 text-zinc-950 p-2.5 rounded-xl flex-shrink-0 mt-0.5">
                <Icon icon="solar:gift-bold" className="text-2xl" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                  ACCELER8 Church Member Benefit
                </span>
                <h4 className="text-base sm:text-lg font-bold text-zinc-900 mt-1">
                  {business.memberDiscount.title}
                </h4>
                {business.memberDiscount.codeOrTerms && (
                  <p className="text-xs text-zinc-700 mt-0.5">
                    <b>Terms / How to claim:</b> {business.memberDiscount.codeOrTerms}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* About Section */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 uppercase tracking-wide text-xs text-appRed mb-2">
              About the Enterprise
            </h3>
            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
              {business.description}
            </p>
          </div>

          {/* Products & Services Offered */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 uppercase tracking-wide text-xs text-appRed mb-3">
              Key Products & Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {business.services.map((srv, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 bg-zinc-50 border border-zinc-200/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-800"
                >
                  <Icon icon="solar:check-circle-bold" className="text-emerald-600 text-base flex-shrink-0" />
                  <span>{srv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Church Alignment & Trust Info */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm mb-2">
              <Icon icon="solar:users-group-rounded-bold" className="text-appRed text-lg" />
              <span>Church Fellowship & Alignment</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-zinc-500 block text-xs">Proprietor / Founder:</span>
                <b className="text-zinc-900 font-semibold">{business.churchEngagement.ownerName}</b>
              </div>
              <div>
                <span className="text-zinc-500 block text-xs">Primary Unit / Fellowship:</span>
                <b className="text-zinc-900 font-semibold">{business.churchEngagement.unitOrFellowship}</b>
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 mt-3 pt-3 border-t border-zinc-200">
              Verified through the City Church ACCELER8 Business Hub protocol for kingdom accountability and excellence.
            </p>
          </div>

          {/* Location & Opening Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs uppercase text-zinc-500 mb-1">
                <Icon icon="solar:map-point-bold" className="text-appRed text-base" />
                <span>Physical Address</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-800 font-medium">
                {business.location.address}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {business.location.city}, {business.location.state}
              </p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs uppercase text-zinc-500 mb-1">
                <Icon icon="solar:clock-circle-bold" className="text-appRed text-base" />
                <span>Operating Hours</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-800 font-medium">
                {business.openingHours || "Monday – Saturday: Regular Business Hours"}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-2xl shadow transition-colors text-sm"
            >
              <Icon icon="logos:whatsapp-icon" className="text-xl" />
              <span>Connect on WhatsApp</span>
            </a>

            <a
              href={`tel:${business.contact.phone}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-3 px-5 rounded-2xl shadow transition-colors text-sm"
            >
              <Icon icon="solar:phone-calling-bold" className="text-lg text-appRed" />
              <span>Call Business</span>
            </a>

            {business.contact.website && (
              <a
                href={business.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-zinc-300 hover:bg-zinc-100 text-zinc-800 font-semibold py-3 px-4 rounded-2xl transition-colors text-sm"
              >
                <Icon icon="solar:global-bold" className="text-base" />
                <span>Website</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
