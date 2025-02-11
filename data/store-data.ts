import type { Book, AudioMessage } from "@/types/store";

export const books: Book[] = [
  {
    id: "book-1",
    title: "You, Your Money, and God",
    description:
      "Discover the principles of walking in God's favor and experiencing His blessings in every area of your life.",
    price: 2500,
    image: "/images/messages/yymag.jpg",
    category: "book",
    author: "Pst. Tony Aleogena-Raphael",
    pages: 234,
    isbn: "978-1234567890",
  },
];

export const audioMessages: AudioMessage[] = [
  {
    id: "audio-1",
    title: "BE FAITHFUL - LIFE IS A JOURNEY",
    description:
      "In this powerful message, learn how faith can move mountains and transform your life. Pastor John shares personal testimonies and biblical principles about walking in faith.",
    price: 200,
    image:
      "/images/messages/be-faithful-life-is-a-jou-selar.co-6794dfb60cc92.jpeg",
    category: "audio",
    speaker: "Pastor John Smith",
    duration: "45:30",
    previewClip: "/sample-audio.mp3",
    date: "2024-02-01",
  },
  {
    id: "audio-2",
    title: "Focus on God - Crossover 2025",
    description:
      "Discover the transformative power of God's grace and how it enables us to live victoriously. This message will help you understand the depth of God's love and mercy.",
    price: 500,
    image:
      "/images/messages/focus-on-god-crossover-20-selar.co-678a4557e5037.jpg",
    category: "audio",
    speaker: "Pastor John Smith",
    duration: "38:15",
    previewClip: "/sample-audio.mp3",
    date: "2024-01-15",
  },
];
