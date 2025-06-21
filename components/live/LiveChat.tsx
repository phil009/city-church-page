import { getLiveVideoId } from "@/hooks/useLiveStatus";
import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface LiveChatProps {
  isLive: boolean;
  channelID?: string;
}

export default function LiveChat({ isLive, channelID }: LiveChatProps) {
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideo() {
      if (isLive && channelID) {
        const id = await getLiveVideoId(
          channelID,
          process.env.NEXT_PUBLIC_YT_API_KEY
        );
        setVideoId(id);
      } else {
        setVideoId(null);
      }
    }
    fetchVideo();
  }, [isLive, channelID]);

  if (!isLive) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <MessageCircle className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Chat Not Available
        </h3>
        <p className="text-gray-500">
          Live chat is only available during live streams.
        </p>
      </div>
    );
  }

  if (!videoId) {
    return <div className="flex-center">Connecting to live chat…</div>;
  }

  const domain = typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <iframe
      src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${domain}`}
      width="100%"
      height="100%"
      frameBorder="0"
      allow="autoplay; encrypted-media"
      title="YouTube Live Chat"
    />
  );
}
