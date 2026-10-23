"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Globe, 
  ExternalLink, 
  Layers, 
  Briefcase, 
  Sparkles, 
  ArrowRight,
  BookMarked,
  Mail
} from "lucide-react";
import { Icon } from "@iconify/react";
import { pastorTonyTraditionalSmile } from "@/constants/AppImages";
import MinistryInviteDialog from "./MinistryInviteDialog";
import PersonalWebsiteDialog, { PASTOR_SOCIALS } from "./PersonalWebsiteDialog";

export default function BeyondThePulpit() {
  return (
    <section className="py-24 px-4 sm:px-8 md:px-16 lg:px-20 bg-zinc-950 text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Main Banner Card */}
        <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Text side */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-appRed bg-red-950/80 border border-red-500/25 px-4 py-1.5 rounded-full">
                <Globe className="w-3.5 h-3.5" />
                <span>Wider Ministry & Platforms</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Beyond the Pulpit
              </h2>

              <p className="text-zinc-200 text-lg sm:text-xl font-medium leading-relaxed">
                Pastoral leadership extends beyond the church service. It includes the ongoing work of equipping people, developing leaders and helping individuals apply biblical principles to the realities of daily life.
              </p>

              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
                Through his wider ministry and communication platforms, Pastor Tony shares teachings and resources intended to encourage growth, deepen understanding and support purposeful living.
              </p>

              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
                <p className="text-zinc-300 text-sm sm:text-base font-normal">
                  To explore more of his work, teachings and resources, visit his personal platform or connect directly:
                </p>
                <div className="pt-2 flex flex-wrap gap-3.5 items-center">
                  <PersonalWebsiteDialog />
                  <MinistryInviteDialog />
                </div>
              </div>
            </div>

            {/* Visual preview card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/80 p-6 space-y-6 shadow-xl">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-700">
                  <Image
                    src={pastorTonyTraditionalSmile}
                    alt="Pastor Tony Aleogena Raphael outside the pulpit"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-xs text-white bg-black/60 backdrop-blur-md p-2.5 rounded-lg border border-white/10">
                    <span className="font-bold block">Kingdom Leadership & Mentorship</span>
                    Equipping minds, cultivating character, shaping destinies
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-800 pb-2">
                    <span className="text-white font-semibold">Connect Directly</span>
                    <span className="text-appRed">Pastor Tony</span>
                  </div>

                  {/* LinkedIn */}
                  <a
                    href={PASTOR_SOCIALS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0077b5]/15 border border-[#0077b5]/30 flex items-center justify-center text-[#0a66c2]">
                        <Icon icon="mdi:linkedin" className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                          LinkedIn
                        </div>
                        <div className="text-xs text-zinc-400">
                          Professional & Leadership Profile
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                  </a>

                  {/* Facebook */}
                  <a
                    href={PASTOR_SOCIALS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1877f2]/15 border border-[#1877f2]/30 flex items-center justify-center text-[#1877f2]">
                        <Icon icon="mdi:facebook" className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                          Facebook
                        </div>
                        <div className="text-xs text-zinc-400">
                          Ministry Updates & Community
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${PASTOR_SOCIALS.email}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-appRed">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                          Direct Email
                        </div>
                        <div className="text-xs text-zinc-400">
                          {PASTOR_SOCIALS.email}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
