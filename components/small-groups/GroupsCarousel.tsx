"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  MoveHorizontalIcon as SwipeHorizontal,
} from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { motion, AnimatePresence } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface GroupsCarouselProps {
  groups: Array<{
    id: number;
    name: string;
    leaderName: string;
    leaderStory: string;
    meetingDay: string;
    meetingTime: string;
    location: string;
    vision: string;
    description: string;
  }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onJoinGroup: (group: any) => void;
}

export default function GroupsCarousel({ groups }: GroupsCarouselProps) {
  const [domLoaded, setDomLoaded] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [visionSeeMore, setVisionSeeMore] = useState(false);
  const [descriptionSeeMore, setDescriptionSeeMore] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  useEffect(() => {
    setDomLoaded(true);

    // Hide swipe hint after 5 seconds
    if (isMobile) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  const handleSwipe = () => {
    // Hide the swipe hint once user has swiped
    setShowSwipeHint(false);
  };

  if (!domLoaded) {
    return (
      <div className="relative max-w-5xl mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <div className="glassmorphic-card p-6 md:p-8 rounded-xl animate-pulse">
              {/* Title and leader skeleton */}
              <div className="h-8 bg-gray-200 rounded-md mb-2 w-3/4"></div>
              <div className="h-5 bg-gray-200 rounded-md mb-6 w-1/2"></div>

              {/* Meeting details skeleton */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-start">
                    <div className="h-5 w-5 bg-gray-200 rounded-full mr-2 mt-0.5"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded-md mb-1 w-20"></div>
                      <div className="h-5 bg-gray-200 rounded-md w-24"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description skeleton */}
              <div className="mb-6">
                <div className="h-5 bg-gray-200 rounded-md mb-2 w-40"></div>
                <div className="h-4 bg-gray-200 rounded-md mb-1 w-full"></div>
                <div className="h-4 bg-gray-200 rounded-md mb-1 w-full"></div>
                <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
              </div>

              {/* Button skeleton */}
              <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            </div>
          </div>
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-3 h-3 rounded-full bg-gray-200"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-80"></div>

      {/* Mobile swipe indicator */}
      {isMobile && showSwipeHint && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 right-0 z-20 flex justify-center"
          >
            <div className="bg-appDark/80 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg">
              <SwipeHorizontal className="h-5 w-5 text-appRed" />
              <span className="text-sm">Swipe to see more groups</span>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {/* Swipe indicator for mobile (persistent at bottom) */}
      {isMobile && (
        <div className="flex justify-center mt-2 mb-4">
          <div className="flex items-center text-appOffWhite text-sm">
            <SwipeHorizontal className="h-4 w-4 mr-1 text-appRed" />
            <span>Swipe to explore more groups</span>
          </div>
        </div>
      )}
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        initialSlide={1}
        coverflowEffect={{
          rotate: 5,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
        onSlideChange={handleSwipe}
      >
        {groups.map((group) => (
          <SwiperSlide
            key={group.id}
            className="max-w-lg mb-8 md:mb-12 text-white"
          >
            <div className="glassmorphic-card p-6 md:p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-2">{group.name}</h3>
              <p className="text-gray-400 mb-4">Led by {group.leaderName}</p>

              {/* Leader's Story with Show More/Less */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Leader&apos;s Story</h4>
                <p className={`text-gray-300 ${seeMore ? "" : "line-clamp-3"}`}>
                  {group.leaderStory}
                </p>
                {seeMore ? (
                  <span
                    onClick={() => setSeeMore(false)}
                    className="text-appRed cursor-pointer"
                  >
                    ...see less
                  </span>
                ) : (
                  <span
                    onClick={() => setSeeMore(true)}
                    className="text-appRed cursor-pointer"
                  >
                    ...see more
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-appRed mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm">Meeting Day</p>
                    <p className="font-medium text-gray-400 text-xs sm:text-sm">
                      {group.meetingDay}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-appRed mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm">Meeting Time</p>
                    <p className="font-medium text-gray-400 text-xs sm:text-sm">
                      {group.meetingTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-appRed mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm">Location</p>
                    <p className="font-medium text-gray-400 text-xs sm:text-sm">
                      {group.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-appRed mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm">Group Vision</p>
                    <p
                      className={`font-medium text-gray-400 ${
                        visionSeeMore ? "" : "line-clamp-2"
                      }`}
                    >
                      {group.vision}
                    </p>
                    {visionSeeMore ? (
                      <span
                        onClick={() => setVisionSeeMore(false)}
                        className="text-appRed cursor-pointer"
                      >
                        ...see less
                      </span>
                    ) : (
                      <span
                        onClick={() => setVisionSeeMore(true)}
                        className="text-appRed cursor-pointer"
                      >
                        ...see more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">What to Expect</h4>
                <p
                  className={`text-gray-300 ${
                    descriptionSeeMore ? "" : "line-clamp-3"
                  }`}
                >
                  {group.description}
                </p>
                {descriptionSeeMore ? (
                  <span
                    onClick={() => setDescriptionSeeMore(false)}
                    className="text-appRed cursor-pointer"
                  >
                    ...see less
                  </span>
                ) : (
                  <span
                    onClick={() => setDescriptionSeeMore(true)}
                    className="text-appRed cursor-pointer"
                  >
                    ...see more
                  </span>
                )}
              </div>

              <a
                href="https://airtable.com/apphS7w9HaRtskLSI/pagB9I0FABWKmcK1m/form"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border block text-center p-2 border-appBorderGray"
              >
                Join This Group
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {!isMobile && (
        <>
          <div className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10">
            <button
              className="bg-appRed/80 backdrop-blur-sm rounded-full aspect-square h-10 opacity-80 p-1 shadow-md hover:bg-appDark hover:text-white transition-all"
              aria-label="Previous group"
            >
              <ChevronLeft className="h-12 w-12 text-appOffWhite" />
            </button>
          </div>

          <div className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10">
            <button
              className="bg-appRed/80 backdrop-blur-sm rounded-full aspect-square h-10 opacity-80 p-1 shadow-md hover:bg-appDark hover:text-white transition-all"
              aria-label="Next group"
            >
              <ChevronRight className="h-12 w-12 text-appOffWhite" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
