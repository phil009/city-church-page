"use client";
import { GlobalHero } from "@/components/global-hero";
import { watchBg } from "@/constants/AppImages";
import { fetchLatestSermons, useLiveStatus } from "@/hooks/useLiveStatus";
import { useNextService } from "@/hooks/useNextService";
import LiveStatusBanner from "@/components/live/LiveStatusBanner";
import VideoPlayer from "@/components/live/VideoPlayer";
import IntroMessage from "@/components/live/IntroMessage";
import PreviousSermons from "@/components/live/PreviousSermons";
import ServiceSchedule from "@/components/live/ServiceSchedule";
import ConnectWays from "@/components/live/ConnectWays";
import UpcomingEvents from "@/components/live/UpcomingEvents";
import { useState, useEffect } from "react";

const channelID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

// Service schedule data
const serviceSchedule = [
  { day: "Sunday", time: "9:30 AM", type: "First Service" },
  { day: "Sunday", time: "11:00 AM", type: "Second Service" },
];

export default function LiveStream() {
  const isLive = useLiveStatus(channelID, YOUTUBE_API_KEY);
  const { nextServiceTime, timeRemaining } = useNextService();

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
      <GlobalHero
        backgroundImage={watchBg}
        title="Join Us Live"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Watch", href: "/live" },
        ]}
      />

      <section className="px-4 bg-appDark md:px-20 py-16">
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

          {/* Sidebar - Takes up 1/3 on desktop */}
          <div className="space-y-8">
            {/* Service Schedule */}
            <ServiceSchedule services={serviceSchedule} />

            {/* Ways to Connect */}
            <ConnectWays channelID={channelID} />

            {/* Upcoming Events Teaser */}
            <UpcomingEvents />
          </div>
        </div>
      </section>
    </>
  );
}
