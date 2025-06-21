interface VideoPlayerProps {
  isLive: boolean;
  channelID: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  video: any;
}

export default function VideoPlayer({
  isLive,
  channelID,
  video,
}: VideoPlayerProps) {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden mb-6">
      <div className="aspect-video w-full">
        {isLive ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/live_stream?channel=${channelID}&mute=1&controls=1&modestbranding=1&rel=0&showinfo=0`}
            title="Live Service"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        ) : (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video?.id}`}
            title={video?.title}
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        )}
      </div>
    </div>
  );
}
