import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function SupportPage() {
  const content = await getSiteContent();

  return (
    <PageShell company={content.company}>
      <section className="bg-[#eef6ff] px-5 py-12">
        <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20 sm:p-8">
          <p className="text-sm font-black uppercase tracking-wide text-sky-300">Support</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Need a hand?</h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">{content.company.supportMessage}</p>
          <a href={`mailto:${content.company.email}`} className="mt-8 inline-flex rounded-full bg-sky-300 px-6 py-4 text-sm font-black text-slate-950 shadow-lg shadow-sky-950/30 hover:bg-white">
            {content.company.email}
          </a>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {content.apps.map((app) => (
            <article id={app.slug} key={app.id} className="rounded-[2rem] border border-white bg-white/95 p-5 shadow-xl shadow-slate-300/50">
              <h2 className="text-2xl font-black text-slate-950">{app.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{app.description}</p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-black">
                <Link href={`/apps/${app.slug}`} className="rounded-full bg-slate-950 px-4 py-2 text-white hover:bg-sky-600">
                  App details
                </Link>
                <Link href={`/privacy/${app.slug}`} className="rounded-full bg-sky-100 px-4 py-2 text-sky-800 hover:bg-sky-200">
                  Privacy policy
                </Link>
                <Link href={`/terms/${app.slug}`} className="rounded-full bg-slate-100 px-4 py-2 text-slate-800 hover:bg-slate-200">
                  Terms
                </Link>
              </div>
            </article>
          ))}
        </div>
        </div>
      </section>
    </PageShell>
  );
}
