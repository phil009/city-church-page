import { GlobalHero } from "@/components/global-hero";
import IntroSection from "@/components/ministries/intro-section";
import { Ministry } from "@/components/ministries/ministry";
import { ministriesBg } from "@/constants/AppImages";

const ministries = [
  {
    title: "Ministry Team",
    subcategories: [
      {
        name: "Discovery",
        description:
          "Uncover your God-given purpose and explore the unique gifts placed within you to impact the world.",
        icon: "mdi:magnify",
        head: null,
      },
      {
        name: "School of Ministry",
        description:
          "Equipping believers to lead, serve, and thrive in their calling through structured training and mentorship.",
        icon: "mdi:school",
        head: null,
      },
      {
        name: "M.D.C",
        description:
          "Empowering disciples through a holistic mentoring experience to grow spiritually and lead boldly.",
        icon: "mdi:account-group",
        head: null,
      },
    ],
  },
  {
    title: "Membership",
    subcategories: [
      {
        name: "MANdate",
        description:
          "A vibrant community for men to find strength, purpose, and support as leaders in faith and family.",
        icon: "mdi:account-tie",
        head: null,
        image: "/images/ministries/mandate.jpg",
      },
      {
        name: "City Queens",
        description:
          "A fellowship of nurturing mothers and role models creating a legacy of faith and love in the city.",
        icon: "mdi:crown",
        head: null,
        image: "/images/ministries/city-queens-5.jpg",
      },
      {
        name: "City Kings",
        description:
          "A brotherhood of fathers championing godly leadership and inspiring the next generation.",
        icon: "mdi:crown-outline",
        head: null,
        image: "/images/ministries/city-king-1.jpg",
      },
      {
        name: "Singles Fellowship",
        description:
          "A dynamic community where singles find purpose, friendship, and encouragement to thrive in their season of singleness.",
        icon: "mdi:account-heart",
        head: null,
        image: "/images/ministries/singles fellowship.jpg",
      },
      {
        name: "Big Nestle",
        description:
          "Celebrating life’s most cherished milestones and fostering joy within the church family.",
        icon: "mdi:party-popper",
        head: null,
        image: "/images/city-kings/city-king-4.jpg",
      },
      {
        name: "Baptism",
        description:
          "A sacred journey of faith as members publicly declare their devotion to Christ through baptism.",
        icon: "mdi:water",
        head: null,
      },
    ],
  },
  {
    title: "Maturity",
    subcategories: [
      {
        name: "Prayer Teams",
        description:
          "Dedicated intercessors storming the heavens with prayers for the church, community, and beyond.",
        icon: "tabler:pray",
        head: null,
      },
      {
        name: "Growth Academy",
        description:
          "Transforming lives through tailored programs that nurture spiritual depth and biblical knowledge.",
        icon: "mdi:book-open",
        head: null,
      },
    ],
  },
  {
    title: "Missions",
    subcategories: [
      {
        name: "Mobilization Team",
        description:
          "Activating and empowering the church to reach the unreached and bring hope to the nations.",
        icon: "mdi:earth",
        head: null,
      },
    ],
  },
  {
    title: "Junior Church",
    subcategories: [
      {
        name: "Kids R.O.C.K.",
        description:
          "(Kids Church) A fun and engaging environment where children learn about God through interactive lessons, activities, and fellowship, helping them build a strong foundation of faith from an early age.",
        icon: "mdi:school",
        head: null,
      },
      {
        name: "NextGen",
        description:
          "(Teens Church) A vibrant community designed to equip and empower teenagers with biblical teachings, mentorship, and meaningful discussions that prepare them for life and spiritual growth.",
        icon: "mdi:account-group",
        head: null,
      },
    ],
  },
  {
    title: "Magnification",
    subcategories: [
      {
        name: "Sweet Incense",
        description:
          "Our church choir, filling the atmosphere with melodies of worship that uplift and inspire.",
        icon: "mdi:music-note",
        head: null,
        image: "/images/ministries/sweet incense.jpg",
      },
      {
        name: "Vertical Blade",
        description:
          "The heartbeat of city church’s sound—our musical band delivering powerful, spirit-filled music.",
        icon: "mdi:guitar-acoustic",
        head: null,
        image: "/images/ministries/vertical-blade3.jpg",
      },
    ],
  },
  {
    title: "Directorate of Service Operations",
    subcategories: [
      {
        name: "Production",
        description:
          "Seamlessly orchestrating technical excellence for impactful services and events.",
        icon: "mdi:video",
        head: null,
      },
      {
        name: "Need to Know (NTK)",
        description:
          "Your go-to team for keeping the church family informed and engaged with all the latest updates.",
        icon: "mdi:information-outline",
        head: null,
      },
      {
        name: "Service Programming",
        description:
          "Crafting meaningful and dynamic service experiences that leave a lasting spiritual impact.",
        icon: "mdi:calendar-clock",
        head: null,
      },
      {
        name: "Creative Arts Department",
        description:
          "Bringing the gospel to life through drama, dance, and other forms of creative expression.",
        icon: "mdi:palette",
        head: null,
      },
      {
        name: "Guest Connect",
        description:
          "Creating memorable first impressions by warmly welcoming and connecting with every guest.",
        icon: "mdi:account-multiple",
        head: null,
      },
      {
        name: "Guest Services",
        description:
          "Providing exceptional hospitality to ensure every guest feels loved, valued, and at home.",
        icon: "mdi:coffee",
        head: null,
      },
    ],
  },
];

export default function Ministries() {
  return (
    <section className="before:block before:h-12">
      <GlobalHero
        backgroundImage={ministriesBg}
        title="Ministries"
        breadcrumbs={[
          { label: "City Church", href: "/" },
          { label: "Ministries", href: "/ministries" },
        ]}
      />
      <IntroSection />
      {ministries.map((ministry, index) => (
        <Ministry
          key={index}
          title={ministry.title}
          subcategories={ministry.subcategories}
        />
      ))}
    </section>
  );
}
