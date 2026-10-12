import React from "react";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";

const IntroSection = () => {
  return (
    <section className="px-4 sm:px-12 md:px-20 py-10 md:py-14 border-b border-gray-100">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 text-appRed text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
            <Calendar className="w-4 h-4" />
            Gatherings & Life Together
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-appDark leading-tight">
            Connecting Beyond Sunday
          </h2>
          <p className="text-sm md:text-base text-gray-600 mt-3 leading-relaxed">
            We believe church is more than a schedule of programmes—it&apos;s a family learning to follow Jesus together. From our vibrant Sunday worship at The Big Tent to midweek Small Groups across Calabar, there&apos;s a place for you to belong, grow, and serve.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/plan-your-visit"
            className="inline-flex items-center gap-2 bg-appRed hover:bg-appRed/90 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg shadow-sm transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Plan Your Visit
          </Link>
          <Link
            href="/small-groups"
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <Users className="w-4 h-4" />
            Find a Small Group
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;

