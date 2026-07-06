import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function TermsIndexPage() {
  const content = await getSiteContent();

  return (
    <PageShell company={content.company}>
      <section className="bg-[#eef6ff] px-5 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[2rem] bg-white/90 p-6 shadow-2xl shadow-slate-300/60 sm:p-8">
            <p className="text-sm font-black uppercase tracking-wide text-sky-700">Terms</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Terms of Service by app.</h1>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              Each app has its own Terms of Service page, kept next to its privacy policy.
            </p>
          </div>
          <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-[2rem] border border-white bg-white/95 shadow-xl shadow-slate-300/50">
            {content.apps.map((app) => (
              <Link key={app.id} href={`/terms/${app.slug}`} className="flex items-center justify-between gap-4 p-5 transition hover:bg-sky-50">
                <span>
                  <span className="block font-black text-slate-950">{app.name}</span>
                  <span className="mt-1 block text-sm text-slate-600">/terms/{app.slug}</span>
                </span>
                <span className="rounded-full bg-slate-950 px-3 py-1 text-sm font-bold text-white">Open</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
