"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, BookOpen, Calendar, FileText } from "lucide-react"
//import LiveChat from "./LiveChat"
import BibleReader from "./BibleReader"
import ServiceSchedule from "./ServiceSchedule"
import NoteTaker from "./NoteTaker"

interface LiveStreamTabsProps {
  isLive: boolean
  channelID?: string
}

export default function LiveStreamTabs({ isLive, channelID }: LiveStreamTabsProps) {
  const [activeTab, setActiveTab] = useState("chat")

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-[600px] flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
        <TabsList className="grid w-full grid-cols-4 rounded-none border-b">
          {/*<TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Chat</span>
          </TabsTrigger>*/}
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Notes</span>
          </TabsTrigger>
          <TabsTrigger value="bible" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Bible</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Schedule</span>
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          {/*<TabsContent value="chat" className="h-full m-0">
            <LiveChat isLive={isLive} channelID={channelID} />
          </TabsContent>*/}

          <TabsContent value="notes" className="h-full m-0">
            <NoteTaker />
          </TabsContent>

          <TabsContent value="bible" className="h-full m-0">
            <BibleReader />
          </TabsContent>

          <TabsContent value="schedule" className="h-full m-0">
            <ServiceSchedule />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
