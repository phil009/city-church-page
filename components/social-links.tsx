import { Icon } from "@iconify/react";
import Link from "next/link";

export interface SocialLinkProps {
  href: string;
  label?: string;
  type: string;
}

export default function SocialLink({ href, type, label }: SocialLinkProps) {
  let iconName = "";

  switch (type) {
    case "TW":
      iconName = "mdi:twitter";
      break;
    case "FB":
      iconName = "mdi:facebook";
      break;
    case "IG":
      iconName = "mdi:instagram";
      break;
    case "YT":
      iconName = "mdi:youtube";
      break;
    default:
      iconName = "mdi:web";
      break;
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white w-6 md:w-12 h-6 md:h-12 flex items-center justify-center border border-white rounded-full"
      aria-label={label || type}
    >
      <Icon icon={iconName} className="text-base md:text-2xl" />
    </Link>
  );
}
