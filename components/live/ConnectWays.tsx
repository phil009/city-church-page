"use client";

import { Bell, Share2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConnectWaysProps {
  channelID: string | undefined;
}

export default function ConnectWays({ channelID }: ConnectWaysProps) {
  return (
    <div className="border border-appBorderGray text-appOffWhite rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Ways to Connect</h2>
      <ul className="space-y-3">
        <li className="flex items-start">
          <div className="bg-red-100 p-2 rounded-full mr-3">
            <Bell className="h-4 w-4 text-appRed" />
          </div>
          <div>
            <div className="font-medium">Subscribe to Notifications</div>
            <p className="text-sm">Get notified when we go live</p>
          </div>
        </li>
        <li className="flex items-start">
          <div className="bg-red-100 p-2 rounded-full mr-3">
            <Share2 className="h-4 w-4 text-appRed" />
          </div>
          <div>
            <div className="font-medium">Share with Friends</div>
            <p className="text-sm">Invite others to join our services</p>
          </div>
        </li>
        <li className="flex items-start">
          <div className="bg-red-100 p-2 rounded-full mr-3">
            <Video className="h-4 w-4 text-appRed" />
          </div>
          <div>
            <div className="font-medium">Subscribe to our Channel</div>
            <p className="text-sm">Never miss a video</p>
          </div>
        </li>
      </ul>
      <Button
        className="w-full mt-4 bg-appRed text-white"
        onClick={() =>
          window.open(`https://www.youtube.com/channel/${channelID}`, "_blank")
        }
      >
        Visit Our YouTube Channel
      </Button>
    </div>
  );
}
