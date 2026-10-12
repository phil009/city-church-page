"use client";

import Link from "next/link";
import { Bell, Share2, Youtube, Users, HeartHandshake, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConnectWaysProps {
  channelID: string | undefined;
}

export default function ConnectWays({ channelID }: ConnectWaysProps) {
  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: "City Church Calabar",
        text: "Join us for worship and discipleship at City Church Calabar",
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Ways to Connect Card */}
      <div className="bg-[#18181b] border border-gray-800 text-appOffWhite rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-appRed" />
          Ways to Connect
        </h3>
        
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="bg-red-500/10 p-2 rounded-lg text-appRed shrink-0 mt-0.5">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <div className="font-semibold text-sm text-white">Sunday In-Person</div>
              <p className="text-xs text-gray-400">
                9:30 AM & 11:00 AM at The Big Tent, 98 Marian Road
              </p>
              <Link href="/plan-your-visit" className="text-xs text-appRed hover:underline font-medium inline-block mt-1">
                Plan Your Visit →
              </Link>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="bg-red-500/10 p-2 rounded-lg text-appRed shrink-0 mt-0.5">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <div className="font-semibold text-sm text-white">Midweek Small Groups</div>
              <p className="text-xs text-gray-400">
                Wednesdays, 6:00 PM across neighborhood locations
              </p>
              <Link href="/small-groups" className="text-xs text-appRed hover:underline font-medium inline-block mt-1">
                Find a Group →
              </Link>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="bg-red-500/10 p-2 rounded-lg text-appRed shrink-0 mt-0.5">
              <HeartHandshake className="h-4 w-4" />
            </div>
            <div>
              <div className="font-semibold text-sm text-white">Prayer Support</div>
              <p className="text-xs text-gray-400">
                Our prayer team is standing by to pray with you
              </p>
              <Link href="/prayer-request" className="text-xs text-appRed hover:underline font-medium inline-block mt-1">
                Request Prayer →
              </Link>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="bg-red-500/10 p-2 rounded-lg text-appRed shrink-0 mt-0.5">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div>
              <div className="font-semibold text-sm text-white">Chat on WhatsApp</div>
              <p className="text-xs text-gray-400">
                Have questions or need someone to speak with?
              </p>
              <a
                href="https://wa.me/2348036811155"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-green-400 hover:underline font-medium inline-block mt-1"
              >
                0803 681 1155 ↗
              </a>
            </div>
          </li>
        </ul>

        <div className="pt-4 mt-4 border-t border-gray-800 space-y-2">
          <Button
            className="w-full bg-appRed hover:bg-appRed/90 text-white flex items-center justify-center gap-2"
            onClick={() =>
              window.open(
                channelID
                  ? `https://www.youtube.com/channel/${channelID}`
                  : "https://www.youtube.com/@CityChurchCalabar",
                "_blank"
              )
            }
          >
            <Youtube className="w-4 h-4" />
            YouTube Channel
          </Button>

          <Button
            variant="outline"
            className="w-full border-gray-700 text-gray-300 hover:text-white hover:bg-white/5 flex items-center justify-center gap-2"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
            Share Service Link
          </Button>
        </div>
      </div>
    </div>
  );
}

