"use client"

import { useState, useEffect } from "react"

export function useLiveStatus(channelID: string | undefined, apiKey: string | undefined) {
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    const checkLiveStatus = async () => {
      if (!channelID || !apiKey) return

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&type=video&eventType=live&key=${apiKey}`,
        )
        const data = await response.json()
        setIsLive(data.items?.length > 0) // If items exist, a live stream is active
      } catch (error) {
        console.error("Error checking live status:", error)
      }
    }

    checkLiveStatus()
    const interval = setInterval(checkLiveStatus, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [channelID, apiKey])

  return isLive
}

