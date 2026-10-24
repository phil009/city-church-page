"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles, Globe, Mail, ArrowRight } from "lucide-react";
import { Icon } from "@iconify/react";

export const PASTOR_SOCIALS = {
  website: "https://tonyaleogena.com/",
  linkedin: "https://www.linkedin.com/in/tony-aleogena-raphael-91b05235",
  facebook: "https://www.facebook.com/share/18FHVULmys/",
  facebookProfile: "https://www.facebook.com/share/18FHVULmys/",
  facebookPage: "https://www.facebook.com/share/1CWJ8C8VGo/",
  email: "t.aleogena@gmail.com",
};

interface PersonalWebsiteDialogProps {
  triggerButton?: React.ReactNode;
}

export default function PersonalWebsiteDialog({
  triggerButton,
}: PersonalWebsiteDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <button
            type="button"
            className="bg-appRed hover:bg-red-700 text-white font-semibold px-7 py-3.5 rounded-full text-sm sm:text-base transition-all duration-300 flex items-center gap-2 shadow-lg shadow-red-950/40 hover:shadow-red-700/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Visit Pastor Tony&apos;s Website</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-zinc-950 border border-zinc-800 text-white p-6 sm:p-8">
        <DialogHeader className="text-left space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Official Platforms
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Pastor Tony Aleogena Raphael</span>
          </DialogTitle>
          <DialogDescription className="text-zinc-300 text-sm leading-relaxed">
            Connect with Pastor Tony on his official website, executive network, social channels, and pastoral office.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2.5">
            {/* Official Website */}
            <a
              href={PASTOR_SOCIALS.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-red-950/40 to-zinc-900 hover:from-red-900/50 hover:to-zinc-800/90 border border-red-500/30 hover:border-red-500/60 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-red-300 transition-colors flex items-center gap-2">
                    <span>Official Website</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Live
                    </span>
                  </div>
                  <div className="text-xs text-zinc-300 font-mono">
                    tonyaleogena.com
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            </a>

            {/* LinkedIn */}
            <a
              href={PASTOR_SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800 hover:border-blue-500/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0077b5]/15 border border-[#0077b5]/30 flex items-center justify-center text-[#0a66c2]">
                  <Icon icon="mdi:linkedin" className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    LinkedIn Profile
                  </div>
                  <div className="text-xs text-zinc-400">
                    Tony Aleogena-Raphael
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </a>

            {/* Facebook 1 - Profile */}
            <a
              href={PASTOR_SOCIALS.facebookProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800 hover:border-blue-600/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#1877f2]/15 border border-[#1877f2]/30 flex items-center justify-center text-[#1877f2]">
                  <Icon icon="mdi:facebook" className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    Facebook Profile
                  </div>
                  <div className="text-xs text-zinc-400">
                    Personal Profile & Community
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </a>

            {/* Facebook 2 - Page */}
            <a
              href={PASTOR_SOCIALS.facebookPage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800 hover:border-blue-600/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#1877f2]/15 border border-[#1877f2]/30 flex items-center justify-center text-[#1877f2]">
                  <Icon icon="mdi:facebook" className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    Facebook Page
                  </div>
                  <div className="text-xs text-zinc-400">
                    Official Ministry Updates & Announcements
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </a>

            {/* Direct Email */}
            <a
              href={`mailto:${PASTOR_SOCIALS.email}?subject=Inquiry%20for%20Pastor%20Tony%20Aleogena%20Raphael`}
              className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800 hover:border-red-500/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-950/50 border border-red-500/30 flex items-center justify-center text-appRed">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                    Email Directly
                  </div>
                  <div className="text-xs text-zinc-400">
                    {PASTOR_SOCIALS.email}
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </a>
          </div>

          <div className="pt-2 text-center">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="text-xs text-zinc-400 hover:text-white"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
