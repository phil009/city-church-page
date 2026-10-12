"use client";

import Link from "next/link";
import { HeartHandshake, Users, MapPin, Youtube, ArrowRight, Compass } from "lucide-react";

export default function DiscipleshipNextSteps() {
  const steps = [
    {
      title: "Need Prayer?",
      description:
        "You don't have to walk through life's challenges alone. Share a request and let our pastoral and prayer team stand with you in faith.",
      cta: "Request Prayer",
      href: "/prayer-request",
      icon: HeartHandshake,
      badge: "Confidential & Caring",
    },
    {
      title: "Find a Small Group",
      description:
        "Real community happens in smaller circles. Connect with people near you across Calabar for friendship, discussion, and spiritual support.",
      cta: "Find a Group Near You",
      href: "/small-groups",
      icon: Users,
      badge: "Midweek Community",
    },
    {
      title: "Plan Your Visit",
      description:
        "Come worship with us this Sunday! Join us at The Big Tent, 98 Marian Road for our 9:30 AM or 11:00 AM service. We'd love to welcome you.",
      cta: "Plan Your Visit",
      href: "/plan-your-visit",
      icon: MapPin,
      badge: "In-Person Sunday",
    },
    {
      title: "Explore More Messages",
      description:
        "Search our full video archive on YouTube including sermon series, live stream replays, and worship moments whenever you need a word.",
      cta: "Browse YouTube Channel",
      href: "https://www.youtube.com/@CityChurchCalabar",
      icon: Youtube,
      external: true,
      badge: "Sermon Archive",
    },
  ];

  const pathway = [
    { step: "01", name: "Discover", desc: "Learn who City Church is" },
    { step: "02", name: "Visit", desc: "Plan a first Sunday visit" },
    { step: "03", name: "Watch", desc: "Engage with Bible teaching" },
    { step: "04", name: "Connect", desc: "Join a Small Group" },
    { step: "05", name: "Grow", desc: "Prayer, Word & Serving" },
    { step: "06", name: "Influence", desc: "Live as a change agent" },
  ];

  return (
    <section className="mt-14 pt-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-appRed/10 text-appRed text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            Your Next Step
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Moving from Watching to Connecting & Growing
          </h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Faith isn&apos;t meant to be lived in isolation. Wherever you are on your spiritual journey, there is a meaningful next step waiting for you.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-[#18181b] border border-gray-800 hover:border-appRed/50 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-appRed/10 text-appRed flex items-center justify-center group-hover:bg-appRed group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-500 bg-[#242427] px-2 py-0.5 rounded">
                      {step.badge}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-800/80">
                  {step.external ? (
                    <a
                      href={step.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-semibold text-appRed hover:text-red-400 transition-colors"
                    >
                      {step.cta}
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </a>
                  ) : (
                    <Link
                      href={step.href}
                      className="inline-flex items-center text-xs font-semibold text-appRed hover:text-red-400 transition-colors"
                    >
                      {step.cta}
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Discipleship Pathway Bar (Section 16) */}
        <div className="bg-[#151518] border border-gray-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-white font-bold text-lg">
                The Discipleship Journey at City Church
              </h4>
              <p className="text-gray-400 text-xs sm:text-sm">
                From your first moment of curiosity to becoming a change agent who impacts our city.
              </p>
            </div>
            <Link
              href="/plan-your-visit"
              className="text-xs text-appRed hover:underline font-semibold flex items-center gap-1 self-start md:self-auto"
            >
              Start Your Journey →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {pathway.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#1f1f23] rounded-lg p-3 border border-gray-800/80 flex flex-col justify-between"
              >
                <span className="text-[10px] font-bold text-appRed">{item.step}</span>
                <span className="text-sm font-semibold text-white mt-1">{item.name}</span>
                <span className="text-[11px] text-gray-400 mt-1 leading-tight">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
