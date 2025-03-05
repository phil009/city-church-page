"use client";
import { GenericCard } from "../home/generic-card";

const events = [
  {
    title: "Sunday Service",
    description: "Join us for a powerful time of worship and the word.",
    icon: "mdi:church",
    image: "/images/events/sunday-service.jpg",
    time: "9:30 AM & 11:00 AM",
    venue: "The Big Tent",
  },
  {
    title: "Night of Incense",
    description: "A quarterly night of worship, prayer, and encounter.",
    icon: "mdi:fire",
    image: "/images/events/Night-of-Incense.png",
    time: "Last Friday of each quarter, 6:00 PM",
    venue: "The Big Tent",
  },
  {
    title: "Christmas @ City Church",
    description:
      "A special week celebrating the birth of Christ with various activites.",
    icon: "mingcute:christmas-hat-line",
    image: "/images/events/christmas-at-city-church.png",
    time: "Christmas Week",
    venue: "The Big Tent",
  },
  {
    title: "Movie Night",
    description: "A fun and inspiring movie night for all.",
    icon: "mdi:movie",
    image: "/images/events/MOVIE-NIGHT.png",
    time: "Every 3rd Friday, 7:00 PM",
    venue: "The Big Tent",
  },
  {
    title: "Power Point",
    description: "A time of teaching, impartation, communion, and prayer.",
    icon: "mdi:lightning-bolt",
    image: "/images/events/Power Point.jpg",
    time: "Last Friday of each month, 6:00 PM",
    venue: "The Big Tent",
  },
  {
    title: "Annual Thanksgiving Service",
    description:
      "A special time to give thanks and celebrate God’s faithfulness with worship, testimonies, and fellowship.",
    icon: "mdi:hand-heart",
    image: "/images/events/ANNUAL-THANKSGIVING.png",
    time: "First Sunday of January",
    venue: "The Big Tent",
  },
  {
    title: "Heritage Sunday",
    description: "Celebrating our rich cultural heritage in Christ.",
    icon: "mdi:earth",
    image: "/images/events/heritage-2.jpg",
    time: "First Sunday of each month",
    venue: "The Big Tent",
  },
  {
    title: "Friday Prayers",
    description: "A time of intense prayer and intercession.",
    icon: "mdi:hands-pray",
    // image:"/images/events/",
    time: "6:00 PM",
    venue: "The Big Tent",
  },
];

export const EventsSection = () => {
  return (
    <div className="px-4 sm:px-12 md:px-20 py-14">
      <p className="text-2xl text-center text-appRed mb-12">Reccuring Events</p>
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
    </div>
  );
};
