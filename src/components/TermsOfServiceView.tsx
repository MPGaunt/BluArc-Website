import type { AppRecord } from "@/lib/types";

const sections = [
  ["Acceptance of Terms", "acceptance"],
  ["Permitted Use", "permittedUse"],
  ["Purchases and Billing", "purchases"],
  ["User Content", "userContent"],
  ["Disclaimers", "disclaimers"],
  ["Limitation of Liability", "limitationOfLiability"],
  ["Termination", "termination"],
  ["Changes to These Terms", "changes"],
] as const;

export function TermsOfServiceView({ app }: { app: AppRecord }) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20 sm:p-8">
        <p className="text-sm font-black uppercase tracking-wide text-sky-300">Terms of Service</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{app.name}</h1>
        <p className="mt-3 text-slate-300">Effective date: {app.terms.effectiveDate}</p>
      </div>
      <div className="mt-6 space-y-4">
        {sections.map(([label, key]) => (
          <section key={key} className="rounded-[1.5rem] bg-white/95 p-6 shadow-lg shadow-slate-300/40">
            <h2 className="text-xl font-black text-slate-950">{label}</h2>
            <p className="mt-3 whitespace-pre-line leading-7 text-slate-700">{app.terms[key]}</p>
          </section>
        ))}
        {app.terms.additionalSections?.map((section) => (
          <section key={section.title} className="rounded-[1.5rem] bg-white/95 p-6 shadow-lg shadow-slate-300/40">
            <h2 className="text-xl font-black text-slate-950">{section.title}</h2>
            <p className="mt-3 whitespace-pre-line leading-7 text-slate-700">{section.content}</p>
          </section>
        ))}
        <section className="rounded-[1.5rem] bg-sky-50 p-6 shadow-lg shadow-slate-300/40">
          <h2 className="text-xl font-black text-slate-950">Contact</h2>
          <p className="mt-3 leading-7 text-slate-700">
            Questions about these Terms of Service can be sent to{" "}
            <a className="font-black text-sky-700 hover:text-sky-900" href={`mailto:${app.terms.contactEmail}`}>
              {app.terms.contactEmail}
            </a>
            .
          </p>
          {app.terms.contactWebsite ? (
            <p className="mt-2 leading-7 text-slate-700">
              Website:{" "}
              <a className="font-black text-sky-700 hover:text-sky-900" href={`https://${app.terms.contactWebsite.toLowerCase()}`}>
                {app.terms.contactWebsite}
              </a>
            </p>
          ) : null}
        </section>
      </div>
    </article>
  );
}
