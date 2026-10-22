"use client";

import Link from "next/link";
import { 
  Users, 
  MapPin, 
  Clock, 
  Phone, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight,
  Compass
} from "lucide-react";

export default function ConnectCityChurch() {
  return (
    <section className="py-24 px-4 sm:px-8 md:px-16 lg:px-20 bg-zinc-900 text-white relative border-t border-zinc-800">
      <div className="max-w-5xl mx-auto space-y-14 text-center">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-appRed bg-red-950/80 border border-red-500/25 px-4 py-1.5 rounded-full">
            <Users className="w-3.5 h-3.5" />
            <span>Join Our Spiritual Family</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Get Connected with City Church
          </h2>

          <p className="text-lg sm:text-xl text-zinc-300 font-medium">
            Would you like to know more about City Church, join a service or become part of our community?
          </p>

          <p className="text-zinc-400 text-base sm:text-lg">
            We would love to connect with you.
          </p>
        </div>

        {/* Action Buttons as requested in document */}
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            href="/plan-your-visit"
            id="pastor-plan-your-visit-cta"
            className="bg-appRed hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 shadow-xl shadow-red-950/40 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
          >
            <span>Plan Your Visit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/about"
            id="pastor-explore-city-church-cta"
            className="border border-zinc-700 hover:border-zinc-500 bg-zinc-950 hover:bg-zinc-800 text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 flex items-center gap-2"
          >
            <span>Explore City Church</span>
            <Compass className="w-4 h-4" />
          </Link>
        </div>

        {/* Tagline Card from Document */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-950/50 via-zinc-950 to-zinc-900 border border-red-500/20 p-8 sm:p-12 shadow-2xl">
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
            &ldquo;City Church Calabar; a place to grow in faith, build meaningful relationships and live out God’s purpose.&rdquo;
          </blockquote>

          <div className="mt-8 pt-8 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-950/60 border border-red-500/20 flex items-center justify-center text-appRed shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-zinc-400 block">Service Times</span>
                <span className="text-sm font-semibold text-white block mt-0.5">Sundays: 9:30 AM & 11:00 AM</span>
                <span className="text-xs text-zinc-400">Fridays: 6:00 PM (Hour of Prayer)</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-950/60 border border-red-500/20 flex items-center justify-center text-appRed shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-zinc-400 block">Location</span>
                <span className="text-sm font-semibold text-white block mt-0.5">The Big Tent</span>
                <span className="text-xs text-zinc-400">98 Marian Road, Calabar, Cross River</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-950/60 border border-red-500/20 flex items-center justify-center text-appRed shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-zinc-400 block">Direct Line</span>
                <a 
                  href="tel:+2348036811155" 
                  className="text-sm font-semibold text-white hover:text-appRed transition-colors block mt-0.5"
                >
                  +234 803 681 1155
                </a>
                <span className="text-xs text-zinc-400">We care! Call or WhatsApp anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
