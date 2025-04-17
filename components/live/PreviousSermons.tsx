"use client";

import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PreviousSermons({ video }: { video: any }) {
  const friendlyDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  };
  return (
    <div className="mb-8 text-appDark">
      <h2 className="text-2xl font-bold mb-4">Previous Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
        {video.map((vid: any) => (
          <div
            key={vid.id}
            className="bg-appGhost border-b-4 border-appRed rounded-lg overflow-hidden shadow-md"
          >
            <div className="relative">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${vid.id}`}
                title={vid.title}
                allowFullScreen
                className="w-full h-full"
              ></iframe>
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/80 hover:bg-white opacity-70"
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/https://www.youtube.com/watch?v=${vid.id}`,
                      "_blank"
                    )
                  }
                >
                  <Video className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1">{vid.title}</h3>
              <p className="text-xs text-gray-500">
                {friendlyDate(vid.publishedAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
