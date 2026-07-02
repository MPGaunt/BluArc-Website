import Link from "next/link";
import { AppCard } from "@/components/AppCard";
import { CompanyLogo } from "@/components/CompanyLogo";
import { PageShell } from "@/components/PageShell";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();
  const featuredApps = content.apps.slice(0, 6);
  const firstApp = featuredApps[0];

  return (
    <PageShell company={content.company}>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_18%_8%,rgba(56,189,248,0.25),transparent_32rem),linear-gradient(145deg,#06111f_0%,#0b172a_58%,#10243d_100%)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-10 sm:pb-20 sm:pt-16 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div className="text-white">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-white/10 px-4 py-2 text-sm font-semibold text-sky-100 shadow-lg shadow-sky-950/20 backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.9)]" />
              Independent apps from a small studio
            </div>
            <h1 className="max-w-3xl text-5xl font-black tracking-tight text-white sm:text-7xl">
              Useful little apps, built with care.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              {content.company.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/apps" className="rounded-full bg-sky-300 px-6 py-4 text-center text-sm font-black text-slate-950 shadow-xl shadow-sky-900/30 transition hover:-translate-y-0.5 hover:bg-white">
                Browse the apps
              </Link>
              <Link href="/privacy" className="rounded-full border border-white/15 bg-white/10 px-6 py-4 text-center text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15">
                Privacy links
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-black text-white">{content.apps.length}</p>
                <p className="mt-1 text-slate-300">apps</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-black text-white">iOS</p>
                <p className="mt-1 text-slate-300">ready</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-black text-white">1:1</p>
                <p className="mt-1 text-slate-300">support</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -left-6 top-12 h-32 w-32 rounded-[2rem] bg-sky-300/20 blur-2xl" />
            <div className="absolute -right-4 bottom-10 h-40 w-40 rounded-[2rem] bg-cyan-200/20 blur-2xl" />
            <div className="relative rounded-[2.5rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
              <div className="overflow-hidden rounded-[2rem] bg-slate-950">
                <div className="border-b border-white/10 p-5">
                <CompanyLogo company={content.company} className="mx-auto h-auto max-h-64 w-full max-w-md" />
                </div>
                <div className="space-y-3 bg-white p-5 text-slate-950">
                  {featuredApps.map((app) => (
                    <Link key={app.id} href={`/apps/${app.slug}`} className="flex items-center justify-between rounded-3xl bg-slate-50 p-3 transition hover:bg-sky-50">
                      <span>
                        <span className="block text-sm font-black">{app.name}</span>
                        <span className="text-xs text-slate-500">{app.description}</span>
                      </span>
                      <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">
                        Open
                      </span>
                    </Link>
                  ))}
                  {firstApp ? (
                    <Link href={`/privacy/${firstApp.slug}`} className="block rounded-3xl bg-sky-100 p-4 text-sm font-bold text-sky-950 hover:bg-sky-200">
                      App Store privacy URL ready for {firstApp.name}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef6ff]">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-sky-700">Our Apps</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Small apps with a pulse.</h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Games, reading tools, and whatever useful thing comes next. Every app gets a real support path and a clean privacy page.
              </p>
            </div>
            <Link href="/apps" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-300 transition hover:bg-sky-600">
              See all apps
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {featuredApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
