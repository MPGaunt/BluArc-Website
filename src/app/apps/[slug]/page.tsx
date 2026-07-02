import Link from "next/link";
import { notFound } from "next/navigation";
import { AppIcon } from "@/components/AppIcon";
import { PageShell } from "@/components/PageShell";
import { PlatformBadge } from "@/components/PlatformBadge";
import { getAppBySlug, getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [content, app] = await Promise.all([getSiteContent(), getAppBySlug(slug)]);

  if (!app) {
    notFound();
  }

  return (
    <PageShell company={content.company}>
      <article className="bg-[#eef6ff] px-5 py-12">
        <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-300/70">
          <div className="bg-slate-950 p-6 text-white sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="rounded-[28px] bg-white/10 p-3">
                <AppIcon iconUrl={app.iconUrl} name={app.name} />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight sm:text-5xl">{app.name}</h1>
                <p className="mt-3 text-lg leading-8 text-slate-300">{app.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {app.platforms.map((platform) => (
                    <PlatformBadge key={platform} platform={platform} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-lg leading-8 text-slate-700">{app.longDescription}</p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <a href={app.appStoreUrl || "#"} className="rounded-2xl bg-slate-950 px-5 py-4 text-center text-sm font-black text-white hover:bg-sky-600">
                App Store
              </a>
              <a href={app.googlePlayUrl || "#"} className="rounded-2xl bg-slate-100 px-5 py-4 text-center text-sm font-black text-slate-800 hover:bg-sky-50 hover:text-sky-700">
                Google Play
              </a>
              <Link href={`/privacy/${app.slug}`} className="rounded-2xl border border-slate-200 px-5 py-4 text-center text-sm font-black text-slate-700 hover:border-sky-300 hover:text-sky-700">
                Privacy Policy
              </Link>
              <Link href={app.supportUrl || "/support"} className="rounded-2xl border border-slate-200 px-5 py-4 text-center text-sm font-black text-slate-700 hover:border-sky-300 hover:text-sky-700">
                Support
              </Link>
            </div>
          </div>
        </div>
        </div>
      </article>
    </PageShell>
  );
}
