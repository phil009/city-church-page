"use client"

import { useState, useEffect } from "react"
import { Volume2, Type, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

const bibleBooks = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Songs",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
]

const translations = ["NIV", "ESV", "NKJV", "NLT", "NASB", "KJV"]

const sampleVerses = {
  "Genesis 1": {
    title: "The Beginning",
    verses: [
      { number: 1, text: "In the beginning God created the heavens and the earth." },
      {
        number: 2,
        text: "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.",
      },
      { number: 3, text: 'And God said, "Let there be light," and there was light.' },
      { number: 4, text: "God saw that the light was good, and he separated the light from the darkness." },
      {
        number: 5,
        text: 'God called the light "day," and the darkness he called "night." And there was evening, and there was morning—the first day.',
      },
    ],
  },
  "John 3": {
    title: "Jesus Teaches Nicodemus",
    verses: [
      {
        number: 16,
        text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      },
      {
        number: 17,
        text: "For God did not send his Son into the world to condemn the world, but to save the world through him.",
      },
      {
        number: 18,
        text: "Whoever believes in him is not condemned, but whoever does not believe stands condemned already because they have not believed in the name of God's one and only Son.",
      },
    ],
  },
  "Psalms 23": {
    title: "The Lord is My Shepherd",
    verses: [
      { number: 1, text: "The Lord is my shepherd, I lack nothing." },
      { number: 2, text: "He makes me lie down in green pastures, he leads me beside quiet waters," },
      { number: 3, text: "he refreshes my soul. He guides me along the right paths for his name's sake." },
      {
        number: 4,
        text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
      },
      {
        number: 5,
        text: "You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows.",
      },
      {
        number: 6,
        text: "Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the Lord forever.",
      },
    ],
  },
}

export default function BibleReader() {
  const [selectedBook, setSelectedBook] = useState("Genesis")
  const [selectedChapter, setSelectedChapter] = useState("1")
  const [selectedTranslation, setSelectedTranslation] = useState("NIV")
  const [currentPassage, setCurrentPassage] = useState("Genesis 1")

  useEffect(() => {
    setCurrentPassage(`${selectedBook} ${selectedChapter}`)
  }, [selectedBook, selectedChapter])

  const getChapterOptions = (book: string) => {
    // Simplified chapter counts for demo
    const chapterCounts: { [key: string]: number } = {
      Genesis: 50,
      Exodus: 40,
      Psalms: 150,
      Matthew: 28,
      John: 21,
      Romans: 16,
    }
    const count = chapterCounts[book] || 28
    return Array.from({ length: count }, (_, i) => (i + 1).toString())
  }

  const currentVerses = sampleVerses[currentPassage as keyof typeof sampleVerses] || sampleVerses["Genesis 1"]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">YouVersion</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Type className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Book and Translation Selectors */}
        <div className="flex gap-2">
          <Select value={selectedBook} onValueChange={setSelectedBook}>
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {bibleBooks.map((book) => (
                <SelectItem key={book} value={book}>
                  {book}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedChapter} onValueChange={setSelectedChapter}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {getChapterOptions(selectedBook).map((chapter) => (
                <SelectItem key={chapter} value={chapter}>
                  {chapter}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTranslation} onValueChange={setSelectedTranslation}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {translations.map((translation) => (
                <SelectItem key={translation} value={translation}>
                  {translation}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bible Content */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-none">
          <h1 className="text-2xl font-bold text-center mb-6 uppercase tracking-wide">{currentPassage}</h1>

          <h2 className="text-xl font-semibold mb-6">{currentVerses.title}</h2>

          <div className="space-y-4">
            {currentVerses.verses.map((verse) => (
              <p key={verse.number} className="text-base leading-relaxed">
                <sup className="text-sm font-semibold mr-1">{verse.number}</sup>
                {verse.text}
              </p>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Navigation */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button variant="ghost" size="sm">
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
