"use client";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IntroMessageProps {
  isLive: boolean;
  handleShare: () => void;
  handleNotificationSubscribe: () => void;
}

export default function IntroMessage({
  isLive,
  handleShare,
}: IntroMessageProps) {
  return (
    <div className="mb-8 text-appGhost">
      <h2 className="text-2xl font-bold mb-4">
        {isLive
          ? "Welcome to Our Live Service"
          : "Welcome to Our Online Church"}
      </h2>

      {isLive ? (
        <div className="space-y-4">
          <p>
            We&apos;re excited you&apos;ve joined us for today&apos;s live
            service! Get ready for a time of worship, praise and teaching in the
            house of God.
          </p>
          <p>
            Feel free to engage in the live chat, share prayer requests, and
            connect with our online community. Our digital prayer team is
            standing by to pray with you.
          </p>
          <div className="flex space-x-4 mt-4">
            <Button onClick={handleShare} className="flex items-center">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                window.open("https://forms.gle/yourPrayerRequestForm", "_blank")
              }
            >
              Request Prayer
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p>
            Thank you for visiting our online church! While we&apos;re not
            currently streaming live, you can watch our previous services and
            prepare to join us for our next live service.
          </p>
          <p>
            Don&apos;t miss our next live stream! Subscribe to receive
            notifications when we go live, and check out our service schedule
            below.
          </p>
          <div className="flex space-x-4 mt-4">
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex items-center"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
