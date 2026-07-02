/* eslint-disable @next/next/no-img-element */

export function AppIcon({ iconUrl, name }: { iconUrl: string; name: string }) {
  if (iconUrl) {
    return <img src={iconUrl} alt={`${name} app icon`} className="h-16 w-16 rounded-[20px] object-cover shadow-lg shadow-slate-950/15" />;
  }

  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="grid h-16 w-16 place-items-center rounded-[20px] bg-[linear-gradient(135deg,#0284c7,#22d3ee,#f8fafc)] text-lg font-black text-slate-950 shadow-lg shadow-sky-500/25">
      {initials}
    </div>
  );
}
