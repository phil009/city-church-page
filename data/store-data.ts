import type { Book, AudioMessage } from "@/types/store"

export const books: Book[] = [
  {
    id: "book-1",
    title: "Walking in Divine Favor",
    description:
      "Discover the principles of walking in God's favor and experiencing His blessings in every area of your life.",
    price: 15.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "book",
    author: "Pastor John Smith",
    pages: 234,
    isbn: "978-1234567890",
  },
  {
    id: "book-2",
    title: "Prayer That Works",
    description: "Learn the secrets of effective prayer and how to develop a powerful prayer life that brings results.",
    price: 12.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "book",
    author: "Pastor John Smith",
    pages: 186,
    isbn: "978-0987654321",
  },
]

export const audioMessages: AudioMessage[] = [
  {
    id: "audio-1",
    title: "The Power of Faith",
    description:
      "In this powerful message, learn how faith can move mountains and transform your life. Pastor John shares personal testimonies and biblical principles about walking in faith.",
    price: 5.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "audio",
    speaker: "Pastor John Smith",
    duration: "45:30",
    previewClip: "/sample-audio.mp3",
    date: "2024-02-01",
  },
  {
    id: "audio-2",
    title: "Understanding God's Grace",
    description:
      "Discover the transformative power of God's grace and how it enables us to live victoriously. This message will help you understand the depth of God's love and mercy.",
    price: 5.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "audio",
    speaker: "Pastor John Smith",
    duration: "38:15",
    previewClip: "/sample-audio.mp3",
    date: "2024-01-15",
  },
]

