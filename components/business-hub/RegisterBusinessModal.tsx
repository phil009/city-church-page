"use client";

import React, { useState } from "react";
import { businessCategories } from "@/data/business-hub-data";
import { Business } from "@/types/business-hub";
import { Icon } from "@iconify/react";
import { toast } from "sonner";

interface RegisterBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newBusiness: Business) => void;
}

export const RegisterBusinessModal: React.FC<RegisterBusinessModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    category: "agribusiness",
    description: "",
    servicesInput: "",
    ownerName: "",
    unitOrFellowship: "",
    contactPerson: "",
    memberDiscountTitle: "",
    memberDiscountTerms: "",
    address: "",
    area: "",
    city: "Calabar",
    state: "Cross River",
    phone: "",
    whatsapp: "",
    email: "",
    website: "",
    instagram: "",
    openingHours: "",
    imageUrl: "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.ownerName || !formData.phone || !formData.whatsapp) {
      toast.error("Please fill in all required fields (marked with *)");
      return;
    }

    setIsSubmitting(true);

    try {
      // Parse services
      const servicesArray = formData.servicesInput
        ? formData.servicesInput.split(",").map((s) => s.trim()).filter(Boolean)
        : ["Quality customer service", "Custom orders"];

      const fallbackImage =
        formData.imageUrl ||
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80";

      const newBusiness: Business = {
        id: `biz-${Date.now()}`,
        name: formData.name,
        tagline: formData.tagline || `${formData.name} - Quality & Excellence`,
        category: formData.category,
        description: formData.description,
        services: servicesArray,
        churchEngagement: {
          ownerName: formData.ownerName,
          unitOrFellowship: formData.unitOrFellowship || "City Church Member",
          contactPerson: formData.contactPerson || formData.ownerName,
        },
        memberDiscount: formData.memberDiscountTitle
          ? {
              title: formData.memberDiscountTitle,
              codeOrTerms: formData.memberDiscountTerms || "Quote ACCELER8 City Church Member",
            }
          : undefined,
        location: {
          address: formData.address || "Calabar, Cross River",
          city: formData.city || "Calabar",
          state: formData.state || "Cross River",
          area: formData.area || "Calabar",
        },
        contact: {
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          email: formData.email,
          website: formData.website,
          instagram: formData.instagram,
        },
        openingHours: formData.openingHours || "Monday – Saturday: 8:00 AM – 6:00 PM",
        images: [fallbackImage],
        isVerified: true,
        isFeatured: false,
        createdAt: new Date().toISOString().split("T")[0],
      };

      // API Call to register endpoint (tolerant of missing Airtable credentials)
      try {
        await fetch("/api/business-hub/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBusiness),
        });
      } catch (err) {
        console.warn("API route notice:", err);
      }

      onSuccess(newBusiness);
      toast.success("Business Registered Successfully!", {
        description: "Your business has been added to the ACCELER8 Business Hub directory.",
      });
      onClose();
    } catch {
      toast.error("An error occurred while registering your business.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto z-10 border border-zinc-200">
        {/* Header */}
        <div className="p-6 border-b border-zinc-200 bg-zinc-50 rounded-t-3xl flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-appRed bg-red-50 px-2 py-0.5 rounded">
                ACCELER8 Hub Enrollment
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
              List Your Enterprise
            </h2>
            <p className="text-xs text-zinc-600 mt-1">
              Document your business for intentional cross-patronage across the City Church family.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 p-1 rounded-full transition-colors"
          >
            <Icon icon="solar:close-circle-bold" className="text-2xl" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-3 bg-zinc-100 border-b border-zinc-200 flex justify-between items-center text-xs font-semibold">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`flex items-center gap-1.5 ${step === 1 ? "text-appRed font-bold" : "text-zinc-500"}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? "bg-appRed text-white" : "bg-zinc-300 text-zinc-700"}`}>
              1
            </span>
            <span>Business Profile</span>
          </button>
          <span className="text-zinc-300">/</span>
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`flex items-center gap-1.5 ${step === 2 ? "text-appRed font-bold" : "text-zinc-500"}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? "bg-appRed text-white" : "bg-zinc-300 text-zinc-700"}`}>
              2
            </span>
            <span>Contact & Location</span>
          </button>
          <span className="text-zinc-300">/</span>
          <button
            type="button"
            onClick={() => setStep(3)}
            className={`flex items-center gap-1.5 ${step === 3 ? "text-appRed font-bold" : "text-zinc-500"}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? "bg-appRed text-white" : "bg-zinc-300 text-zinc-700"}`}>
              3
            </span>
            <span>Church & Member Perks</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {/* STEP 1: Business Identity & Overview */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1">
                  Registered / Trading Business Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Royal Stitch Atelier"
                  className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-appRed transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    Industry Sector *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full text-sm border border-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-appRed transition-colors bg-white"
                  >
                    {businessCategories
                      .filter((c) => c.id !== "all")
                      .map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    Core Slogan / Tagline
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleChange}
                    placeholder="e.g. Handcrafted Contemporary African Fashion"
                    className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-appRed transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1">
                  Detailed Description of Business & Operations *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  required
                  placeholder="Provide a comprehensive summary of your enterprise, target clientele, and what makes your offering unique..."
                  className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-appRed transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1">
                  Key Products or Services (comma-separated)
                </label>
                <input
                  type="text"
                  name="servicesInput"
                  value={formData.servicesInput}
                  onChange={handleChange}
                  placeholder="e.g. Kaftan Tailoring, Corporate Suits, Express Measurement"
                  className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-appRed transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1">
                  Cover Photo / Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/... or paste image link"
                  className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-appRed transition-colors"
                />
                <span className="text-[11px] text-zinc-400 mt-0.5 block">
                  Leave blank to use a curated sector photo automatically.
                </span>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-appRed hover:bg-red-700 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <span>Next: Contact & Location</span>
                  <Icon icon="solar:arrow-right-bold" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Contact & Location */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    Operational Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+234 803 123 4567"
                    className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-appRed transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    Official WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    placeholder="2348031234567 (with country code)"
                    className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-appRed transition-colors"
                  />
                  <span className="text-[11px] text-zinc-400 mt-0.5 block">
                    Used for direct member WhatsApp chat links.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1">
                  Physical Office / Shop Address in Calabar *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 45 Marian Road, Opposite AP Filling Station"
                  className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-appRed transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    Area / Landmark
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="e.g. Marian, MCC, State Housing"
                    className="w-full text-sm border border-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-appRed transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full text-sm border border-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-appRed transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full text-sm border border-zinc-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-appRed transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    Business Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contact@mybusiness.com"
                    className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-appRed transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    Instagram Handle or Website
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="@mybusiness or https://..."
                    className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-appRed transition-colors"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-zinc-600 hover:text-zinc-900 text-xs font-semibold py-2 px-4 rounded-xl border border-zinc-300"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-appRed hover:bg-red-700 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <span>Next: Church & Member Perks</span>
                  <Icon icon="solar:arrow-right-bold" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Church Engagement & Member Discount */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-2 text-appRed font-bold text-xs uppercase mb-1">
                  <Icon icon="solar:shield-check-bold" className="text-base" />
                  <span>Blueprint Requirement: High-Trust Network</span>
                </div>
                <p className="text-xs text-zinc-700">
                  Per the ACCELER8 Blueprint, capturing your active ministry unit or fellowship helps foster intentional cross-patronage and accountability within City Church Calabar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    Founder / Owner Full Name *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Brother Samuel Bessey"
                    className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-appRed transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800 mb-1">
                    Church Unit / Fellowship Alignment *
                  </label>
                  <input
                    type="text"
                    name="unitOrFellowship"
                    value={formData.unitOrFellowship}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Sweet Incense Choir / Small Group 4 / Ushering"
                    className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-appRed transition-colors"
                  />
                </div>
              </div>

              {/* Special Member Offer */}
              <div className="bg-amber-50/70 border-2 border-dashed border-amber-300 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs uppercase mb-2">
                  <Icon icon="solar:sale-square-bold" className="text-amber-600 text-lg" />
                  <span>Exclusive City Church Member Perk / Discount</span>
                </div>
                <p className="text-xs text-zinc-600 mb-3">
                  Offer an exclusive discount or bonus to fellow members to drive intentional patronage!
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-800 mb-1">
                      Discount / Offer Headline
                    </label>
                    <input
                      type="text"
                      name="memberDiscountTitle"
                      value={formData.memberDiscountTitle}
                      onChange={handleChange}
                      placeholder="e.g. 15% Off All Orders for City Church Members"
                      className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-appRed transition-colors bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-800 mb-1">
                      Terms / How to Claim
                    </label>
                    <input
                      type="text"
                      name="memberDiscountTerms"
                      value={formData.memberDiscountTerms}
                      onChange={handleChange}
                      placeholder="e.g. Show Sunday bulletin or mention ACCELER8"
                      className="w-full text-sm border border-zinc-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-appRed transition-colors bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-zinc-600 hover:text-zinc-900 text-xs font-semibold py-2 px-4 rounded-xl border border-zinc-300"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs py-3 px-8 rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <Icon icon="solar:check-read-bold" className="text-base" />
                  <span>{isSubmitting ? "Submitting..." : "Complete Registration"}</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
