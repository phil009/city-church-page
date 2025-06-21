"use client";
import { fetchLatestSermons, useLiveStatus } from "@/hooks/useLiveStatus";
import { useNextService } from "@/hooks/useNextService";
import LiveStatusBanner from "@/components/live/LiveStatusBanner";
import VideoPlayer from "@/components/live/VideoPlayer";
import IntroMessage from "@/components/live/IntroMessage";
import PreviousSermons from "@/components/live/PreviousSermons";
import ConnectWays from "@/components/live/ConnectWays";
import UpcomingEvents from "@/components/live/UpcomingEvents";
import LiveStreamTabs from "@/components/live/LiveStreamTabs";
import { useState, useEffect } from "react";
import { SquareChartGantt, X } from "lucide-react";

const channelID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export default function LiveStream() {
  const isLive = useLiveStatus(channelID, YOUTUBE_API_KEY);
  const { nextServiceTime, timeRemaining } = useNextService();

  // Modal state for mobile LiveStreamTabs
  const [tabsModalOpen, setTabsModalOpen] = useState(false);

  const handleNotificationSubscribe = () => {
    // Implementation for notification subscription
    alert("You'll be notified when we go live!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Join us for live worship at City Church",
          text: "Watch our live service at City Church Calabar",
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert("Copy this link to share: " + window.location.href);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [latestVideo, setLatestVideo] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recentVideos, setRecentVideos] = useState<any[]>([]);

  useEffect(() => {
    const getVideos = async () => {
      const videos = await fetchLatestSermons(channelID, YOUTUBE_API_KEY);
      setLatestVideo(videos[0]); // First video (most recent)
      setRecentVideos(videos.slice(2)); // Next 3 videos
      console.log("Latest Video:", videos[0]);
    };

    getVideos();
  }, []);

  return (
    <>
      <section className="px-4 bg-appDark md:px-20 py-16 before:block before:h-20">
        {/* Live Status Banner */}
        <LiveStatusBanner
          isLive={isLive}
          timeRemaining={timeRemaining}
          nextServiceTime={nextServiceTime}
        />

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Section - Takes up 2/3 on desktop */}
          <div className="lg:col-span-2">
            <VideoPlayer
              isLive={isLive}
              video={latestVideo}
              channelID={channelID}
            />

            {/* Introductory Message */}
            <IntroMessage
              isLive={isLive}
              handleShare={handleShare}
              handleNotificationSubscribe={handleNotificationSubscribe}
            />

            {/* Previous Sermons Section */}
            {!isLive && <PreviousSermons video={recentVideos} />}
          </div>

          {/* Interactive Sidebar */}
          <div className="space-y-8">
            {/* Desktop: Show LiveStreamTabs as usual */}
            <div className="hidden lg:block">
              <LiveStreamTabs isLive={isLive} channelID={channelID} />
            </div>

            {/* Ways to Connect */}
            <ConnectWays channelID={channelID} />

            {/* Upcoming Events Teaser */}
            <UpcomingEvents />
          </div>
        </div>

        {/* Mobile: Floating button to open LiveStreamTabs modal */}
        <button
          className="fixed bottom-6 right-6 bg-appRed z-50 flex items-center px-2 py-2 rounded-full bg-primary text-white shadow-lg lg:hidden"
          onClick={() => setTabsModalOpen(true)}
          aria-label="Open interactive features"
        >
          {/* You can use an icon here if you want */}
          <SquareChartGantt />
        </button>

        {/* Mobile: Modal for LiveStreamTabs */}
        {tabsModalOpen && (
          <div className="fixed inset-0 z-[100] bg-black bg-opacity-70 flex items-end sm:items-center justify-center lg:hidden">
            <div className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
              <LiveStreamTabs isLive={isLive} channelID={channelID} />
            </div>
            <button
              className="absolute rounded-full z-[1000] bottom-2 right-2 text-white bg-appRed p-1 text-sm"
              onClick={() => setTabsModalOpen(false)}
              aria-label="Close interactive features"
            >
              <X />
            </button>
          </div>
        )}
      </section>
    </>
  );
}
