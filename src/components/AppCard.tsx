import Link from "next/link";
import type { AppRecord } from "@/lib/types";
import { AppIcon } from "./AppIcon";
import { PlatformBadge } from "./PlatformBadge";

export function AppCard({ app }: { app: AppRecord }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/95 p-5 text-slate-950 shadow-xl shadow-slate-200/70 ring-1 ring-sky-100/60 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-200/60">
      <div className="relative flex items-start gap-4">
        <div className="rounded-[24px] bg-white p-2 shadow-inner shadow-slate-200">
          <AppIcon iconUrl={app.iconUrl} name={app.name} />
        </div>
        <div className="min-w-0">
          <h3 className="text-2xl font-black tracking-tight text-slate-950">{app.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{app.description}</p>
        </div>
      </div>
      <div className="relative mt-5 flex flex-wrap gap-2">
        {app.platforms.map((platform) => (
          <PlatformBadge key={platform} platform={platform} />
        ))}
      </div>
      <div className="relative mt-6 grid gap-2 text-sm font-bold sm:grid-cols-2">
        <Link href={`/apps/${app.slug}`} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-slate-700 hover:border-sky-300 hover:text-sky-700">
          Details
        </Link>
        <Link href={`/privacy/${app.slug}`} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-slate-700 hover:border-sky-300 hover:text-sky-700">
          Privacy
        </Link>
        <Link href={`/terms/${app.slug}`} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-slate-700 hover:border-sky-300 hover:text-sky-700">
          Terms
        </Link>
        <a href={app.appStoreUrl || "#"} className="rounded-2xl bg-slate-950 px-3 py-3 text-center text-white hover:bg-sky-600">
          App Store
        </a>
        <a href={app.googlePlayUrl || "#"} className="rounded-2xl bg-slate-100 px-3 py-3 text-center text-slate-800 hover:bg-sky-50 hover:text-sky-700">
          Google Play
        </a>
      </div>
    </article>
  );
}
