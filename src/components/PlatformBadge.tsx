import type { Platform } from "@/lib/types";

export function PlatformBadge({ platform }: { platform: Platform | string }) {
  return (
    <span className="rounded-full border border-sky-200/70 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-800 shadow-sm">
      {platform}
    </span>
  );
}
