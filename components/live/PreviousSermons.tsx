"use client";

import { useState, useMemo } from "react";
import { Search, ExternalLink, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoItem {
  id: string;
  title: string;
  publishedAt?: string;
  thumbnail?: string;
  speaker?: string;
  series?: string;
}

const DEFAULT_SERMONS: VideoItem[] = [
  {
    id: "kJQP7kiw5Fk",
    title: "Becoming a Change Agent: Walking in Divine Influence",
    speaker: "Pastor Emmanuel Efiong",
    series: "Change Agents",
    publishedAt: "2026-03-29T10:00:00Z",
  },
  {
    id: "bHQq00Wl3pA",
    title: "Rooted & Established in Faith",
    speaker: "City Church Pastoral Team",
    series: "Faith & Prayer",
    publishedAt: "2026-03-22T10:00:00Z",
  },
  {
    id: "3JZ_D3ELwOQ",
    title: "Living as Salt & Light in the Marketplace",
    speaker: "Pastor Emmanuel Efiong",
    series: "Kingdom Life",
    publishedAt: "2026-03-15T10:00:00Z",
  },
  {
    id: "fJ9rUzIMcZQ",
    title: "The Power of Authentic Community",
    speaker: "Pastoral Team",
    series: "Family & Community",
    publishedAt: "2026-03-08T10:00:00Z",
  },
  {
    id: "9bZkp7q19f0",
    title: "Anchored in Prayer: Seeking God First",
    speaker: "Pastor Emmanuel Efiong",
    series: "Faith & Prayer",
    publishedAt: "2026-03-01T10:00:00Z",
  },
  {
    id: "L_LUpnjgPso",
    title: "Called to Transform: 16 Years of Grace",
    speaker: "Pastor Emmanuel Efiong",
    series: "Change Agents",
    publishedAt: "2026-02-22T10:00:00Z",
  },
];

const CATEGORIES = [
  "All Messages",
  "Change Agents",
  "Faith & Prayer",
  "Kingdom Life",
  "Family & Community",
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PreviousSermons({ video }: { video: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Messages");

  // Format date nicely
  const friendlyDate = (dateString?: string) => {
    if (!dateString) return "Recent Service";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Recent Service";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Merge live API videos with default curated messages
  const allVideos: VideoItem[] = useMemo(() => {
    if (Array.isArray(video) && video.length > 0) {
      // Map API video items and augment
      const mapped = video.map((v, idx) => ({
        id: v.id,
        title: v.title || "Sunday Worship Service",
        publishedAt: v.publishedAt,
        thumbnail: v.thumbnail,
        speaker: v.speaker || "City Church Teaching Team",
        series: idx % 2 === 0 ? "Change Agents" : "Kingdom Life",
      }));
      return mapped;
    }
    return DEFAULT_SERMONS;
  }, [video]);

  // Filtered sermons
  const filteredVideos = useMemo(() => {
    return allVideos.filter((vid) => {
      const matchesSearch =
        vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (vid.speaker && vid.speaker.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (vid.series && vid.series.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCategory === "All Messages" ||
        vid.series === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [allVideos, searchQuery, selectedCategory]);

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-appRed text-sm font-semibold mb-1 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Digital Discipleship
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Recent Sermons & Teaching
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Browse through messages designed to build your faith and equip you to influence your world.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search topic or speaker..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-appRed transition-colors"
          />
        </div>
      </div>

      {/* Series / Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar text-xs sm:text-sm">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-appRed text-white font-medium shadow-sm"
                : "bg-[#1e1e1e] text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Sermons */}
      {filteredVideos.length === 0 ? (
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 text-center">
          <p className="text-gray-400 mb-2">No sermons found matching &ldquo;{searchQuery}&rdquo;</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Messages");
            }}
            className="border-gray-700 text-gray-300"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((vid) => (
            <div
              key={vid.id}
              className="bg-[#18181b] border border-gray-800/80 hover:border-gray-700 rounded-xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* YouTube Embed Player */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${vid.id}`}
                  title={vid.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              </div>

              {/* Sermon Details */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    {vid.series && (
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-appRed bg-appRed/10 px-2 py-0.5 rounded">
                        {vid.series}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {friendlyDate(vid.publishedAt)}
                    </span>
                  </div>

                  <h3 className="font-semibold text-white text-base leading-snug line-clamp-2 group-hover:text-red-400 transition-colors mb-1.5">
                    {vid.title}
                  </h3>

                  {vid.speaker && (
                    <p className="text-xs text-gray-400 mb-3">
                      Speaker: <span className="text-gray-300">{vid.speaker}</span>
                    </p>
                  )}
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-xs">
                  <a
                    href={`https://www.youtube.com/watch?v=${vid.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 mr-1 text-appRed fill-appRed" />
                    Watch on YouTube
                    <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Explore More on YouTube Banner */}
      <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-red-950/40 to-neutral-900 border border-red-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-white font-semibold text-sm sm:text-base">
            Want to explore our entire sermon archive?
          </h4>
          <p className="text-gray-400 text-xs sm:text-sm">
            Visit our YouTube channel for Sunday archives, midweek teachings, and special worship nights.
          </p>
        </div>
        <Button
          asChild
          size="sm"
          className="bg-appRed hover:bg-appRed/90 text-white whitespace-nowrap"
        >
          <a
            href="https://www.youtube.com/@CityChurchCalabar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5"
          >
            Explore Channel
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Button>
      </div>
    </div>
  );
}

