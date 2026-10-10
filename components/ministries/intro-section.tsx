"use client";

import React from "react";
import { Sparkles, Users, HeartHandshake, ArrowDown } from "lucide-react";

const IntroSection = () => {
  return (
    <section className="px-4 sm:px-12 md:px-20 py-12 md:py-16 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs sm:text-sm uppercase font-bold tracking-widest text-appRed bg-red-50 px-3.5 py-1.5 rounded-full inline-block">
              Find Your Place
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
              Ministries at City Church
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
              We believe every person has God-given gifts to serve others and grow in faith. Whether you are passionate about welcoming newcomers, music, mentoring teenagers, or behind-the-scenes production, there is a meaningful place for you to make a difference.
            </p>
          </div>

          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-4 max-w-md w-full shadow-sm">
            <h3 className="font-bold text-zinc-900 text-sm uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-appRed" />
              How Each Ministry Works
            </h3>
            <ul className="text-xs sm:text-sm space-y-2.5 text-zinc-700">
              <li className="flex items-start gap-2">
                <strong className="text-zinc-900 shrink-0">1. Who is this for?</strong>
                <span>Clear age group and life stage.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-zinc-900 shrink-0">2. What happens here?</strong>
                <span>Hands-on spiritual growth and serving.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-zinc-900 shrink-0">3. How can I connect?</strong>
                <span>Simple step to join and meet the team.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
