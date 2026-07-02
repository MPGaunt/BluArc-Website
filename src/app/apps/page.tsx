import { AppCard } from "@/components/AppCard";
import { PageShell } from "@/components/PageShell";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AppsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const content = await getSiteContent();
  const query = ((await searchParams).q || "").trim().toLowerCase();
  const apps = query
    ? content.apps.filter((app) =>
        [app.name, app.description, app.longDescription, app.platforms.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(query),
      )
    : content.apps;

  return (
    <PageShell company={content.company}>
      <section className="bg-[#eef6ff] px-5 py-12">
        <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/15 bg-slate-950/80 p-6 text-white shadow-2xl shadow-slate-950/20 backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-sky-300">Apps</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">The BluArc shelf.</h1>
              <p className="mt-3 max-w-2xl text-slate-300">
                A simple catalog of what is live, what is supported, and where each app keeps its privacy policy.
              </p>
            </div>
            <form className="flex w-full max-w-sm gap-2" action="/apps">
              <input
                name="q"
                defaultValue={query}
                placeholder="Search apps"
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm"
              />
              <button className="rounded-full bg-sky-300 px-5 py-3 text-sm font-black text-slate-950 hover:bg-white">
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
        {apps.length === 0 ? <p className="mt-8 rounded-3xl bg-white/80 p-5 text-slate-600">No apps matched that search.</p> : null}
        </div>
      </section>
    </PageShell>
  );
}
