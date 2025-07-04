"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import {
  MapPin,
  Phone,
  Landmark,
  Map,
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
    leadersNumber: string;
    location: string;
    landmark: string;
    whatsAppLink: string;
  }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onJoinGroup: (group: any) => void;
}

export default function GroupsCarousel({ groups }: GroupsCarouselProps) {
  const [domLoaded, setDomLoaded] = useState(false);
  const [mapLoadingStates, setMapLoadingStates] = useState<
    Record<number, boolean>
  >({});
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  useEffect(() => {
    setDomLoaded(true);
    // Initialize loading states for all groups
    const initialLoadingStates = groups.reduce((acc, group) => {
      acc[group.id] = true;
      return acc;
    }, {} as Record<number, boolean>);
    setMapLoadingStates(initialLoadingStates);

    if (isMobile) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isMobile, groups]);

  const handleSwipe = () => {
    setShowSwipeHint(false);
  };

  const handleMapLoad = (groupId: number) => {
    setMapLoadingStates((prev) => ({
      ...prev,
      [groupId]: false,
    }));
  };

  if (!domLoaded) {
    return (
      <div className="relative max-w-5xl mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <div className="glassmorphic-card p-6 md:p-8 rounded-xl animate-pulse">
              <div className="h-8 bg-gray-200 rounded-md mb-2 w-3/4"></div>
              <div className="h-5 bg-gray-200 rounded-md mb-6 w-1/2"></div>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-start">
                    <div className="h-5 w-5 bg-gray-200 rounded-full mr-2 mt-0.5"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded-md mb-1 w-20"></div>
                      <div className="h-5 bg-gray-200 rounded-md w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-10 bg-gray-200 rounded-md w-full"></div>
            </div>
          </div>
        </div>
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
        initialSlide={0}
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
              <div className="mb-2 flex items-center">
                <span className="text-gray-400 mr-2">Led by</span>
                <span className="font-semibold text-gray-200">
                  {group.leaderName}
                </span>
              </div>
              <div className="mb-2 flex items-center">
                <Phone className="h-5 w-5 text-appRed mr-2" />
                <a
                  href={`tel:${group.leadersNumber}`}
                  className="text-gray-300 hover:text-appRed transition-colors"
                >
                  {group.leadersNumber}
                </a>
              </div>
              <div className="mb-2 flex items-center">
                <MapPin className="h-5 w-5 text-appRed mr-2" />
                <span className="text-gray-300">{group.location}</span>
              </div>
              {group.landmark && (
                <div className="mb-4 flex items-center">
                  <Landmark className="h-5 w-5 text-appRed mr-2" />
                  <span className="text-gray-300">{group.landmark}</span>
                </div>
              )}

              {/* Google Maps Section */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Map className="h-5 w-5 text-appRed mr-2" />
                  <span className="text-gray-400 text-sm">Location</span>
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden border border-gray-600">
                  {mapLoadingStates[group.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-10">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-appRed rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-appRed rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-appRed rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <span className="text-gray-600 text-sm ml-2">
                          Loading map...
                        </span>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=${
                      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                    }&q=${encodeURIComponent(
                      group.location + ", Calabar, Nigeria"
                    )}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map for ${group.name}`}
                    onLoad={() => handleMapLoad(group.id)}
                  />
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    group.location + ", Calabar, Nigeria"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-appRed hover:text-red-400 transition-colors mt-1"
                >
                  <Map className="h-4 w-4 mr-1" />
                  Open in Google Maps
                </a>
              </div>
              <a
                href={group.whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border block text-center p-2 border-appBorderGray bg-appRed/80 text-white rounded hover:text-white hover:bg-appRed transition-all mt-4"
              >
                Join WhatsApp Group
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
