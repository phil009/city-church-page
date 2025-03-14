"use client";
import { GlobalHero } from "@/components/global-hero";
import { givingBg } from "@/constants/AppImages";
import { useLiveStatus } from "@/hooks/useLiveStatus";
import { useNextService } from "@/hooks/useNextService";
import LiveStatusBanner from "@/components/live/LiveStatusBanner";
import VideoPlayer from "@/components/live/VideoPlayer";
import IntroMessage from "@/components/live/IntroMessage";
import PreviousSermons from "@/components/live/PreviousSermons";
import ServiceSchedule from "@/components/live/ServiceSchedule";
import ConnectWays from "@/components/live/ConnectWays";
import UpcomingEvents from "@/components/live/UpcomingEvents";

const channelID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

// Service schedule data
const serviceSchedule = [
  { day: "Sunday", time: "9:00 AM", type: "First Service" },
  { day: "Sunday", time: "11:30 AM", type: "Second Service" },
];

// Previous sermons data
const previousSermons = [
  {
    id: "1",
    title: "Broken",
    date: "March 2, 2025",
    embed: "https://www.youtube.com/embed/Bfh0I0b5IZo?si=pDPvoaC9GN8bYXZX",
    link: "https://www.youtube.com/watch?v=Bfh0I0b5IZo&t=2383s",
  },
  {
    id: "2",
    title: "Family Values",
    date: "February 23, 2025",
    embed: "https://www.youtube.com/embed/wd0SdgGwDgg?si=vxPYZHTt2mOmFWwK",
    link: "https://www.youtube.com/watch?v=wd0SdgGwDgg&t=2941s",
  },
  {
    id: "3",
    title: "Life is a Journey",
    date: "February 2, 2025",
    embed: "https://www.youtube.com/embed/3dCsh09DChU?si=D9RfkaK0pYHDYTEA",
    link: "https://www.youtube.com/watch?v=3dCsh09DChU",
  },
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

  return (
    <>
      <GlobalHero
        backgroundImage={givingBg}
        title="Join Us Live"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Watch", href: "/live" },
        ]}
      />

      <div className="container px-2 md:px-20 py-16">
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
            <VideoPlayer isLive={isLive} channelID={channelID} />

            {/* Introductory Message */}
            <IntroMessage
              isLive={isLive}
              handleShare={handleShare}
              handleNotificationSubscribe={handleNotificationSubscribe}
            />

            {/* Previous Sermons Section */}
            {!isLive && <PreviousSermons sermons={previousSermons} />}
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
      </div>
    </>
  );
}
