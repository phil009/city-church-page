"use client"
import { Clock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface LiveStatusBannerProps {
  isLive: boolean
  timeRemaining: string
  nextServiceTime: Date | null
}

export default function LiveStatusBanner({ isLive, timeRemaining, nextServiceTime }: LiveStatusBannerProps) {
  return isLive ? (
    <a href="https://ccubed.online.church/">
      
    <Alert className="bg-appRed hover:bg-appRed/70 transition duration-300 text-white border-none mb-6">
      <div className="flex justify-between items-center">
        <div>
          
      <div className="flex items-center">
        <div className="relative mr-2">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-3 h-3 bg-white rounded-full absolute top-0 animate-ping"></div>
        </div>
        <AlertTitle>We&apos;re Live Now!</AlertTitle>
      </div>
      <AlertDescription>Join our service in progress. Worship with us and participate in the chat.</AlertDescription>
</div>
      <span className="underline">Watch Now</span>
      </div>
    </Alert>
    </a>
  ) : (
    <Alert className="bg-appGhost text-appDark border-none mb-6">
      <Clock className="h-4 w-4 mr-2" />
      <AlertTitle>Next Service in {timeRemaining}</AlertTitle>
      <AlertDescription>
        Join us{" "}
        {nextServiceTime?.toLocaleDateString(undefined, {
          weekday: "long",
        })}{" "}
        at{" "}
        {nextServiceTime?.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </AlertDescription>
    </Alert>
  )
}

