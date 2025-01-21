import { GenericCard } from "./generic-card";

const services = [
  {
    title: "Refreshing Worship",
    text: "We create a space where our congregation can come together to connect with God, strengthen their faith, and find spiritual renewal and inspiration. It's a central aspect of Christian community life and practice.",
    icon: "mdi:music-note",
    image: "/images/choir/bernice-first-sunday-2.jpg",
  },
  {
    title: "Word by Revelation",
    text: "The Word helps you deepen your understanding of the Bible and its teachings. It provides spiritual nourishment, guidance, and a sense of community among church members.",
    icon: "mdi:book-open-page-variant",
    image: "/images/pastors/daddy-t-in-blue-3.jpg",
  },
  {
    title: "Believers' Community",
    text: "We believe regular fellowship and worship within a Christian community are important for mutual edification, encouragement, and spiritual growth.",
    icon: "mdi:account-group",
    image: "/images/outdoors/choir-group-and-daddy-t.jpg",
  },
  {
    title: "The Kingdom Seeds",
    text: "Our involvement of children in church helps to nurture their spiritual development, teach them about their faith, and foster a sense of belonging and community.",
    icon: "mdi:seed-outline",
    image: "/images/outdoors/dominion-and-friends-walking-in.jpg",
  },
];

export const Introduction = () => {
  return (
    <section className="px-20 py-14 bg-appOffWhite">
      <div className="mb-16 flex justify-between">
        <div>
          <p className="text-appRed text-xl">Welcome to</p>
          <h2 className="text-4xl font-bold">City Church Calabar</h2>
        </div>
        <p className="max-w-[38ch] text-xl">
          A Life Development Church with practical teachings and loving
          relationships, led by Tony Aleogena-Raphael
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {services.map((service, index) => (
          <GenericCard
            key={index}
            type="info"
            title={service.title}
            description={service.text}
            icon={service.icon}
            imageSrc={service.image}
            imageAlt="Pictures"
          />
        ))}
      </div>
      <p className="text-center text-2xl my-16">
        We currently run two amazing services on{" "}
        <span className="text-appRed">Sundays - 9:30am and 11am</span>. In those
        ninety minutes, we make it easy for attendees to connect intimately with
        God using contemporary worship music, reflect on His person and nature
        using other artistic and creative art forms; and challenge them to make
        deliberate behavioural and character change with a Bible-based teaching
        format giving them principles they can readily apply.
      </p>
    </section>
  );
};
