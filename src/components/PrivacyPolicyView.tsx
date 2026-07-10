import type { AppRecord } from "@/lib/types";

const sections = [
  ["Information Collected", "informationCollected"],
  ["How Information Is Used", "howInformationIsUsed"],
  ["Third-Party Services and SDKs", "thirdPartyServices"],
  ["Ads and Analytics", "adsAnalyticsDisclosure"],
  ["Children's Privacy", "childrensPrivacy"],
  ["Updates to This Policy", "updates"],
] as const;

export function PrivacyPolicyView({ app }: { app: AppRecord }) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20 sm:p-8">
        <p className="text-sm font-black uppercase tracking-wide text-sky-300">Privacy Policy</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{app.name}</h1>
        <p className="mt-3 text-slate-300">Effective date: {app.privacy.effectiveDate}</p>
      </div>
      <div className="mt-6 space-y-4">
        {sections.map(([label, key]) => (
          <section key={key} className="rounded-[1.5rem] bg-white/95 p-6 shadow-lg shadow-slate-300/40">
            <h2 className="text-xl font-black text-slate-950">{label}</h2>
            <p className="mt-3 whitespace-pre-line leading-7 text-slate-700">{app.privacy[key]}</p>
          </section>
        ))}
        {app.privacy.additionalSections?.map((section) => (
          <section key={section.title} className="rounded-[1.5rem] bg-white/95 p-6 shadow-lg shadow-slate-300/40">
            <h2 className="text-xl font-black text-slate-950">{section.title}</h2>
            <p className="mt-3 whitespace-pre-line leading-7 text-slate-700">{section.content}</p>
          </section>
        ))}
        <section className="rounded-[1.5rem] bg-sky-50 p-6 shadow-lg shadow-slate-300/40">
          <h2 className="text-xl font-black text-slate-950">Contact</h2>
          <p className="mt-3 leading-7 text-slate-700">
            Questions about this privacy policy can be sent to{" "}
            <a className="font-black text-sky-700 hover:text-sky-900" href={`mailto:${app.privacy.contactEmail}`}>
              {app.privacy.contactEmail}
            </a>
            .
          </p>
          {app.privacy.contactWebsite ? (
            <p className="mt-2 leading-7 text-slate-700">
              Website:{" "}
              <a className="font-black text-sky-700 hover:text-sky-900" href={`https://${app.privacy.contactWebsite.toLowerCase()}`}>
                {app.privacy.contactWebsite}
              </a>
            </p>
          ) : null}
        </section>
      </div>
    </article>
  );
}
