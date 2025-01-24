import Image from "next/image";
import { Leaf } from "lucide-react";

interface PrayerEvent {
  title: string;
  time: string;
  location: string;
}

const prayerEvents: PrayerEvent[] = [
  {
    title: "Friday Prayers",
    time: "Time: 6pm to 7pm",
    location: "Location: The Big Tent, 98 Marian Road, Calabar",
  },
  {
    title: "Pre-Service Prayers",
    time: "Time: Sundays 8.30am to 9am",
    location: "Location: The Big Tent",
  },
  {
    title: "Hour of Tongues",
    time: "Time: Mondays-Fridays 5am to 6am",
    location: "Location: City Church Telegram channel",
  },
];

export const Prayers = () => {
  return (
    <section className="flex">
      <div className="relative md:w-3/5">
        <Image
          src="/images/prayers-bg.jpeg"
          alt="prayers"
          width={500}
          height={500}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative grid gap-3 sm:gap-7 z-10 px-4 sm:px-12 md:px-20 py-28 text-white">
          <p className="text-lg sm:text-2xl text-appRed">Our Prayer Life</p>
          <h1 className="text-2xl sm:text-5xl font-semibold">
            We believe in the efficacy of personal and corporate prayers.
          </h1>
          <p className="tex-base sm:text-xl">
            The prayer of faith is a heartfelt, confident prayer rooted in trust
            in God&apos;s power and willingness to answer. It aligns with
            God&apos;s will, believing that He can and will act according to His
            divine purpose, often accompanied by actions demonstrating that
            trust. It&apos;s a potent expression of unwavering belief.
          </p>
          <div className="max-w-3xl mt-8 space-y-12">
            {prayerEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-red-600 shadow-lg rounded-lg p-3 shrink-0">
                  <Leaf className="w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 text-white" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-base sm:text-2xl font-semibold mb-2 sm:mb-4">
                    {event.title}
                  </h2>
                  <p className="text-xs sm:text-base text-gray-300">
                    {event.time}
                  </p>
                  <p className="text-xs sm:text-base text-gray-300">
                    {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t text-sm sm:text-base border-zinc-800">
            <p className="text-gray-300">
              Connect with us on our social media platforms to stay updated
              weekly:
            </p>
            <p className="text-gray-300 mt-2">
              @citychurchcalabar or +234 803 681 1155
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:block w-2/5">
        <Image
          src="/images/pastors/daddy-t-in-red.jpg"
          alt="prayers"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};
