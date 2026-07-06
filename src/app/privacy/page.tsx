import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function PrivacyIndexPage() {
  const content = await getSiteContent();

  return (
    <PageShell company={content.company}>
      <section className="bg-[#eef6ff] px-5 py-12">
        <div className="mx-auto max-w-4xl">
        <div className="rounded-[2rem] bg-white/90 p-6 shadow-2xl shadow-slate-300/60 sm:p-8">
          <p className="text-sm font-black uppercase tracking-wide text-sky-700">Legal</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Privacy and terms links that are ready to paste.</h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Each app has dedicated Privacy Policy and Terms of Service pages, kept simple and easy to update.
          </p>
        </div>
        <div className="mt-6 space-y-4">
          {content.apps.map((app) => (
            <article key={app.id} className="rounded-[2rem] border border-white bg-white/95 p-5 shadow-xl shadow-slate-300/50">
              <h2 className="text-xl font-black text-slate-950">{app.name}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link href={`/privacy/${app.slug}`} className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-bold text-white hover:bg-sky-600">
                  Privacy Policy
                  <span className="mt-1 block text-xs font-medium text-slate-300">/privacy/{app.slug}</span>
                </Link>
                <Link href={`/terms/${app.slug}`} className="rounded-2xl bg-sky-100 px-4 py-3 text-center text-sm font-bold text-sky-950 hover:bg-sky-200">
                  Terms of Service
                  <span className="mt-1 block text-xs font-medium text-sky-700">/terms/{app.slug}</span>
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
