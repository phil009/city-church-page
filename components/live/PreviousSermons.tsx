"use client"

import { Video } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Sermon {
  id: string
  title: string
  date: string
  embed: string
  link: string
}

interface PreviousSermonsProps {
  sermons: Sermon[]
}

export default function PreviousSermons({ sermons }: PreviousSermonsProps) {
  return (
    <div className="mb-8 text-appDark">
      <h2 className="text-2xl font-bold mb-4">Previous Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sermons.map((sermon) => (
          <div key={sermon.id} className="bg-appGhost border-b-4 border-appRed rounded-lg overflow-hidden shadow-md">
            <div className="relative">
              <iframe
                width="100%"
                height="100%"
                src={sermon.embed}
                title="Welcome Video"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/80 hover:bg-white opacity-70"
                  onClick={() => window.open(`${sermon.link}`, "_blank")}
                >
                  <Video className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{sermon.title}</h3>
              <p className="text-sm text-gray-500">{sermon.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

