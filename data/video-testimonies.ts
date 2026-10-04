export interface VideoTestimony {
  /** Full YouTube link (watch, youtu.be, shorts, or embed) or a bare 11-char video ID */
  url: string;
  /** Name of the person giving the testimony (optional) */
  name?: string;
  /** Short headline, e.g. "God healed my body" */
  title?: string;
}

/**
 * Add your YouTube testimonies here. Example:
 *
 * { url: "https://www.youtube.com/watch?v=XXXXXXXXXXX", name: "Jane Doe", title: "God healed my body" },
 *
 * The section on the home page is hidden automatically while this list is empty.
 */
export const videoTestimonies: VideoTestimony[] = [
  { url: "https://youtu.be/TlH5QbbFv5Q" },
  { url: "https://youtu.be/GQjWWn0EAzE" },
  { url: "https://youtu.be/qEsuyaVftDg" },
];

export function getYouTubeId(input: string): string | null {
  const value = input.trim();
  if (/^[\w-]{11}$/.test(value)) return value;
  try {
    const url = new URL(value);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.slice(1).split("/")[0] || null;
    }
    const v = url.searchParams.get("v");
    if (v) return v;
    const match = url.pathname.match(/\/(?:shorts|embed|live)\/([\w-]{11})/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}
