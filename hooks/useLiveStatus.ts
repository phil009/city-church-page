"use client";

import { useState, useEffect } from "react";

export function useLiveStatus(
  channelID: string | undefined,
  apiKey: string | undefined
) {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const checkLiveStatus = async () => {
      if (!channelID || !apiKey) return;
      console.log(channelID, apiKey);
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&type=video&eventType=live&key=${apiKey}`
        );
        const data = await response.json();
        setIsLive(data.items?.length > 0); // If items exist, a live stream is active
      } catch (error) {
        console.error("Error checking live status:", error);
      }
    };

    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, 7200000); // Check every 1hr

    return () => clearInterval(interval);
  }, [channelID, apiKey]);

  return isLive;
}

export const fetchLatestSermons = async (
  channelID: string | undefined,
  apiKey: string | undefined
) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelID}&order=date&maxResults=5&key=${apiKey}`
  );
  const data = await response.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.items.map((video: any) => ({
    id: video.id.videoId,
    title: video.snippet.title,
    thumbnail: video.snippet.thumbnails.high.url,
    publishedAt: video.snippet.publishedAt,
  }));
};
