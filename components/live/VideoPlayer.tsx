interface VideoPlayerProps {
  isLive: boolean
  channelID: string | undefined
}

export default function VideoPlayer({ isLive, channelID }: VideoPlayerProps) {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden mb-6">
      <div className="aspect-video w-full">
        {isLive ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/live_stream?channel=${channelID}`}
            title="Live Service"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        ) : (
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/AXbmAZrk6WM?si=kHAzmcLXDkMPE4ZD"
            title="Welcome Video"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        )}
      </div>
    </div>
  )
}

