/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { GenericCard } from "../home/generic-card";
import {
  eventSundayService,
  eventSmallGroup,
  eventTelegramPrayer,
  eventCityQueens,
  eventMandate,
  eventBlaze,
  eventCouplesFellowship,
  eventFathersDay,
  eventNightOfIncense,
  eventChristmas,
} from "@/constants/AppImages";

const weeklyEvents = [
  {
    title: "Small Group",
    description: "Grow in faith and fellowship in a small, intimate setting.",
    icon: "mdi:account-group",
    image: eventSmallGroup,
    time: "Wednesdays, 6:00 PM",
    venue: "The Big Tent",
  },
  {
    title: "Prayer Service",
    description: "A time of intense prayer and intercession.",
    icon: "mdi:hands-pray",
    time: "Fridays, 6:00 PM",
    venue: "The Big Tent",
  },
  {
    title: "Sunday Service",
    description: "Join us for a powerful time of worship and the word.",
    icon: "mdi:church",
    image: eventSundayService,
    time: "1st Service: 9:30 AM | 2nd Service: 11:00 AM",
    venue: "The Big Tent",
  },
  {
    title: "Telegram Prayer",
    description: "Start your day in prayer with the church family on Telegram.",
    icon: "mdi:send-circle",
    image: eventTelegramPrayer,
    time: "Monday - Friday, 5:00 AM - 6:00 AM",
    venue: "Telegram",
  },
];

const monthlyEvents = [
  {
    title: "Women's Fellowship (City Queens)",
    description: "A gathering for the women of the house to connect and grow together.",
    icon: "mdi:crown",
    image: eventCityQueens,
    time: "1st Monday, 6:00 PM",
    venue: "The Big Tent",
  },
  {
    title: "Mandate",
    description: "A time of teaching and impartation for the vision of the house.",
    icon: "mdi:book-open-page-variant",
    image: eventMandate,
    time: "3rd Saturday, 8:00 AM",
    venue: "The Big Tent",
  },
  {
    title: "Blaze - Singles & Youth's Fellowship",
    description: "A vibrant gathering for singles and youths to worship and connect.",
    icon: "mdi:fire",
    image: eventBlaze,
    time: "3rd Sunday, 6:00 PM",
    venue: "The Big Tent",
  },
  {
    title: "Couple's Fellowship",
    description: "A special time of fellowship for couples in the house.",
    icon: "mdi:heart-multiple",
    image: eventCouplesFellowship,
    time: "Last Sunday, 6:00 PM",
    venue: "The Big Tent",
  },
];

const specialEvents = [
  {
    title: "Mother's Day",
    description: "A special service celebrating and honoring mothers.",
    icon: "mdi:flower",
  },
  {
    title: "Father's Day",
    description: "A special service celebrating and honoring fathers.",
    icon: "mdi:account-tie",
    image: eventFathersDay,
  },
  {
    title: "Friends Service",
    description: "A special service to bring your friends and loved ones to church.",
    icon: "mdi:account-multiple-plus",
  },
  {
    title: "Night of Incense",
    description: "A quarterly night of worship, prayer, and encounter.",
    icon: "mdi:smoke",
    image: eventNightOfIncense,
    time: "Quarterly",
  },
  {
    title: "Free to Worship",
    description: "A yearly gathering dedicated to pure, unhindered worship.",
    icon: "mdi:music-note",
    time: "Yearly",
  },
  {
    title: "Christmas @ City Church",
    description: "A special week celebrating the birth of Christ with various activities.",
    icon: "mingcute:christmas-hat-line",
    image: eventChristmas,
    time: "Yearly",
  },
];

const EventGrid = ({
  events,
}: {
  events: {
    title: string;
    description: string;
    icon: string;
    image?: any;
    time?: string;
    venue?: string;
  }[];
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {events.map((event, index) => (
      <GenericCard
        key={index}
        type="event"
        title={event.title}
        description={event.description}
        icon={event.icon}
        time={event.time}
        venue={event.venue}
        imageSrc={event.image}
      />
    ))}
  </div>
);

export const EventsSection = () => {
  return (
    <div className="px-4 sm:px-12 md:px-20 py-14 flex flex-col gap-16">
      <div>
        <p className="text-2xl text-center text-appRed mb-12">Weekly</p>
        <EventGrid events={weeklyEvents} />
      </div>
      <div>
        <p className="text-2xl text-center text-appRed mb-12">Monthly</p>
        <EventGrid events={monthlyEvents} />
      </div>
      <div>
        <p className="text-2xl text-center text-appRed mb-12">Events</p>
        <EventGrid events={specialEvents} />
      </div>
    </div>
  );
};
