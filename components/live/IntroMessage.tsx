"use client";
import Link from "next/link";
import { Share2, HeartHandshake, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IntroMessageProps {
  isLive: boolean;
  handleShare: () => void;
  handleNotificationSubscribe?: () => void;
}

export default function IntroMessage({
  isLive,
  handleShare,
}: IntroMessageProps) {
  return (
    <div className="mb-8 text-appGhost">
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
        {isLive
          ? "Welcome to Our Live Service"
          : "There's Something Here for Your Next Step"}
      </h2>

      {isLive ? (
        <div className="space-y-4">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            We&apos;re excited you&apos;ve joined us for today&apos;s live service! Get ready for a time of worship, praise and teaching in the presence of God.
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">
            Feel free to share the stream with friends and family, request prayer, or connect with our church community.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={handleShare}
              className="bg-appRed hover:bg-appRed/90 text-white flex items-center"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Stream
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-gray-600 text-white hover:bg-white/10"
            >
              <Link href="/prayer-request" className="flex items-center">
                <HeartHandshake className="mr-2 h-4 w-4 text-appRed" />
                Request Prayer
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Catch up on recent messages, revisit a series, or find a word for where you are right now. Whether you&apos;re exploring faith or growing as a change agent, engage with God&apos;s word at your own pace.
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">
            Join us live every Sunday at 9:30 AM & 11:00 AM, or watch previous sermons below anytime.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleShare}
              className="border-gray-600 text-white hover:bg-white/10 flex items-center"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share with a Friend
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-gray-600 text-white hover:bg-white/10"
            >
              <Link href="/prayer-request" className="flex items-center">
                <HeartHandshake className="mr-2 h-4 w-4 text-appRed" />
                Need Prayer?
              </Link>
            </Button>
            <Button
              asChild
              className="bg-appRed hover:bg-appRed/90 text-white"
            >
              <Link href="/plan-your-visit" className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                Plan Your Visit
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

