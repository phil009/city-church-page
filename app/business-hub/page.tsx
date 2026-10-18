"use client";

import React, { useState, useMemo } from "react";
import { GlobalHero } from "@/components/global-hero";
import { groupLifeBg } from "@/constants/AppImages";
import { businessCategories, initialBusinesses } from "@/data/business-hub-data";
import { Business } from "@/types/business-hub";
import { BusinessCard } from "@/components/business-hub/BusinessCard";
import { BusinessDetailModal } from "@/components/business-hub/BusinessDetailModal";
import { RegisterBusinessModal } from "@/components/business-hub/RegisterBusinessModal";
import { BusinessSpotlight } from "@/components/business-hub/BusinessSpotlight";
import { BlueprintBanner } from "@/components/business-hub/BlueprintBanner";
import { Icon } from "@iconify/react";

export default function BusinessHubPage() {
  const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [onlyMemberDiscount, setOnlyMemberDiscount] = useState<boolean>(false);

  // Modal States
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  // Distinct areas for location filter
  const areas = useMemo(() => {
    const list = new Set<string>();
    businesses.forEach((b) => {
      if (b.location.area) list.add(b.location.area);
    });
    return Array.from(list);
  }, [businesses]);

  // Filtered Businesses
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((b) => {
      // Category filter
      if (selectedCategory !== "all" && b.category !== selectedCategory) {
        return false;
      }

      // Member discount filter
      if (onlyMemberDiscount && !b.memberDiscount) {
        return false;
      }

      // Location area filter
      if (selectedArea !== "all" && b.location.area !== selectedArea) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = b.name.toLowerCase().includes(q);
        const matchesTagline = b.tagline.toLowerCase().includes(q);
        const matchesDesc = b.description.toLowerCase().includes(q);
        const matchesOwner = b.churchEngagement.ownerName.toLowerCase().includes(q);
        const matchesUnit = b.churchEngagement.unitOrFellowship.toLowerCase().includes(q);
        const matchesServices = b.services.some((s) => s.toLowerCase().includes(q));
        const matchesLocation = `${b.location.address} ${b.location.city} ${b.location.area || ""}`
          .toLowerCase()
          .includes(q);

        if (
          !matchesName &&
          !matchesTagline &&
          !matchesDesc &&
          !matchesOwner &&
          !matchesUnit &&
          !matchesServices &&
          !matchesLocation
        ) {
          return false;
        }
      }

      return true;
    });
  }, [businesses, selectedCategory, searchQuery, selectedArea, onlyMemberDiscount]);

  // Featured business for Spotlight section
  const featuredBusiness = useMemo(() => {
    return businesses.find((b) => b.isFeatured) || businesses[0];
  }, [businesses]);

  const handleSelectBusiness = (b: Business) => {
    setSelectedBusiness(b);
    setIsDetailOpen(true);
  };

  const handleBusinessAdded = (newBiz: Business) => {
    setBusinesses((prev) => [newBiz, ...prev]);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedArea("all");
    setOnlyMemberDiscount(false);
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    searchQuery.trim() !== "" ||
    selectedArea !== "all" ||
    onlyMemberDiscount;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Hero Header */}
      <GlobalHero
        backgroundImage={groupLifeBg || "/placeholder.svg?height=600&width=1600"}
        title="ACCELER8 Business Hub"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Business Hub", href: "/business-hub" },
        ]}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Intro Mission & Quick Actions Banner */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-red-50 text-appRed px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3">
              <Icon icon="solar:crown-star-bold" />
              <span>City Church Calabar • Kingdom Economy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight leading-tight">
              Mutual Support, Economic Empowerment & Intentional Patronage
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-2 leading-relaxed">
              Under the visionary leadership of Lead Pastor{" "}
              <b className="text-zinc-900">Tony Aleogena Raphael</b>, the ACCELER8 Business Hub documents and connects verified member-owned enterprises across our congregation. Discover trusted local businesses, support fellow believers, and enjoy exclusive church member perks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
            <button
              onClick={() => setIsRegisterOpen(true)}
              className="bg-appRed hover:bg-red-700 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Icon icon="solar:add-circle-bold" className="text-lg" />
              <span>List Your Business Free</span>
            </button>

            <a
              href="#directory"
              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold text-xs sm:text-sm py-3 px-6 rounded-2xl transition-colors flex items-center justify-center gap-2 text-center"
            >
              <Icon icon="solar:magnifer-bold" className="text-base text-zinc-600" />
              <span>Explore Directory</span>
            </a>
          </div>
        </section>

        {/* Member Business Spotlight */}
        {featuredBusiness && (
          <section>
            <BusinessSpotlight
              business={featuredBusiness}
              onSelect={handleSelectBusiness}
            />
          </section>
        )}

        {/* Interactive Directory Section */}
        <section id="directory" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-5">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-appRed">
                Directory & Mapping
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-1">
                Member Enterprises & Services
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Browse verified commercial activities operated by City Church members in Calabar and beyond.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-500 font-medium">
                Showing <b>{filteredBusinesses.length}</b> of {businesses.length} businesses
              </span>

              <button
                onClick={() => setIsRegisterOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs py-2 px-3.5 rounded-xl transition-colors"
              >
                <Icon icon="solar:shop-2-bold" className="text-appRed" />
                <span>Add Your Business</span>
              </button>
            </div>
          </div>

          {/* Search Bar & Filters Control Strip */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-zinc-200/80 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Search input */}
              <div className="md:col-span-6 relative">
                <Icon
                  icon="solar:magnifer-linear"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-lg"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by business name, services, owner, or keywords..."
                  className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-appRed focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    <Icon icon="solar:close-circle-bold" className="text-base" />
                  </button>
                )}
              </div>

              {/* Location area dropdown */}
              <div className="md:col-span-3">
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full text-xs sm:text-sm py-2.5 px-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-appRed focus:bg-white transition-all text-zinc-700"
                >
                  <option value="all">All Locations in Calabar</option>
                  {areas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              {/* Member discount toggle */}
              <div className="md:col-span-3 flex items-center justify-between sm:justify-start gap-2.5">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-zinc-700">
                  <input
                    type="checkbox"
                    checked={onlyMemberDiscount}
                    onChange={(e) => setOnlyMemberDiscount(e.target.checked)}
                    className="w-4 h-4 rounded text-appRed accent-appRed focus:ring-appRed cursor-pointer"
                  />
                  <span>Has Member Discount</span>
                </label>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-appRed font-semibold hover:underline ml-auto"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills (Horizontal Scrollable) */}
            <div className="flex gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
              {businessCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count =
                  cat.id === "all"
                    ? businesses.length
                    : businesses.filter((b) => b.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      isSelected
                        ? "bg-appRed text-white shadow-sm font-semibold"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                  >
                    <Icon icon={cat.icon} className="text-sm" />
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? "bg-red-800 text-white" : "bg-zinc-200 text-zinc-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Business Cards Grid */}
          {filteredBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map((b) => (
                <BusinessCard
                  key={b.id}
                  business={b}
                  onSelect={handleSelectBusiness}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200">
              <div className="w-16 h-16 rounded-full bg-zinc-100 mx-auto flex items-center justify-center text-zinc-400 text-3xl mb-4">
                <Icon icon="solar:sad-circle-bold-duotone" />
              </div>
              <h3 className="text-lg font-bold text-zinc-800 mb-1">
                No matching businesses found
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto mb-6">
                Try adjusting your search terms or clearing current category and discount filters.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={clearFilters}
                  className="bg-zinc-800 text-white text-xs font-semibold py-2.5 px-5 rounded-xl hover:bg-zinc-900 transition-colors"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="bg-appRed text-white text-xs font-semibold py-2.5 px-5 rounded-xl hover:bg-red-700 transition-colors"
                >
                  List This Business
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Strategic Blueprint Objectives Banner */}
        <BlueprintBanner />
      </div>

      {/* Business Detail Modal */}
      <BusinessDetailModal
        business={selectedBusiness}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedBusiness(null);
        }}
      />

      {/* Register Business Modal */}
      <RegisterBusinessModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={handleBusinessAdded}
      />
    </div>
  );
}
