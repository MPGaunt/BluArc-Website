"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { makeDefaultApp, normalizeSlug } from "@/lib/app-utils";
import type { AppRecord, Platform, SiteContent } from "@/lib/types";

const platformOptions: Platform[] = ["iOS", "Android", "tvOS", "watchOS", "macOS", "Web"];

export default function AdminDashboard({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState(initialContent);
  const [selectedId, setSelectedId] = useState(initialContent.apps[0]?.id || "");
  const [status, setStatus] = useState("");
  const selectedApp = useMemo(
    () => content.apps.find((app) => app.id === selectedId) || content.apps[0],
    [content.apps, selectedId],
  );

  function updateCompany(field: keyof SiteContent["company"], value: string) {
    setContent((current) => ({
      ...current,
      company: { ...current.company, [field]: value },
    }));
  }

  function updateApp(appId: string, updater: (app: AppRecord) => AppRecord) {
    setContent((current) => ({
      ...current,
      apps: current.apps.map((app) => (app.id === appId ? updater(app) : app)),
    }));
  }

  function addApp() {
    const app = makeDefaultApp();
    setContent((current) => ({ ...current, apps: [...current.apps, app] }));
    setSelectedId(app.id);
    setStatus("New app added. Save changes when ready.");
  }

  function deleteApp(appId: string) {
    setContent((current) => {
      const nextApps = current.apps.filter((app) => app.id !== appId);
      setSelectedId(nextApps[0]?.id || "");
      return { ...current, apps: nextApps };
    });
  }

  async function save() {
    setStatus("Saving...");
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });

    if (!response.ok) {
      setStatus("Save failed. Check the password session and try again.");
      return;
    }

    const result = (await response.json()) as { content: SiteContent };
    setContent(result.content);
    setStatus("Saved.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Hidden admin portal</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">BluArc website content</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
              View site
            </Link>
            <button onClick={logout} className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Sign out
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <button onClick={addApp} className="w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              Add app
            </button>
            <div className="mt-4 space-y-2">
              {content.apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedId(app.id)}
                  className={`w-full rounded-md px-3 py-3 text-left text-sm font-semibold transition ${
                    selectedApp?.id === app.id ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {app.name}
                </button>
              ))}
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Company name" value={content.company.name} onChange={(value) => updateCompany("name", value)} />
                <TextField label="Contact email" value={content.company.email} onChange={(value) => updateCompany("email", value)} />
                <TextField label="Logo URL" value={content.company.logoUrl} onChange={(value) => updateCompany("logoUrl", value)} />
                <TextField label="Tagline" value={content.company.tagline} onChange={(value) => updateCompany("tagline", value)} />
              </div>
              <TextArea label="Company description" value={content.company.description} onChange={(value) => updateCompany("description", value)} />
              <TextArea label="Support message" value={content.company.supportMessage} onChange={(value) => updateCompany("supportMessage", value)} />
            </div>

            {selectedApp ? (
              <AppEditor
                app={selectedApp}
                onChange={(nextApp) => updateApp(selectedApp.id, () => nextApp)}
                onDelete={() => deleteApp(selectedApp.id)}
              />
            ) : (
              <div className="rounded-lg border border-slate-200 bg-white p-5 text-slate-600 shadow-sm">No apps yet.</div>
            )}

            <div className="sticky bottom-4 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-slate-600">{status || "Unsaved edits stay in this browser until you save."}</p>
              <button onClick={save} className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                Save changes
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function AppEditor({
  app,
  onChange,
  onDelete,
}: {
  app: AppRecord;
  onChange: (app: AppRecord) => void;
  onDelete: () => void;
}) {
  function update<K extends keyof AppRecord>(field: K, value: AppRecord[K]) {
    const next = { ...app, [field]: value };
    if (field === "name") {
      next.slug = normalizeSlug(String(value));
      next.supportUrl = `/support#${next.slug}`;
    }
    onChange(next);
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">{app.name}</h2>
          <p className="mt-1 text-sm text-slate-500">Privacy URL: /privacy/{app.slug}</p>
          <p className="mt-1 text-sm text-slate-500">Terms URL: /terms/{app.slug}</p>
        </div>
        <button onClick={onDelete} className="rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">
          Delete app
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <TextField label="App name" value={app.name} onChange={(value) => update("name", value)} />
        <TextField label="Slug" value={app.slug} onChange={(value) => update("slug", normalizeSlug(value))} />
        <TextField label="Icon URL" value={app.iconUrl} onChange={(value) => update("iconUrl", value)} />
        <TextField label="Support URL" value={app.supportUrl} onChange={(value) => update("supportUrl", value)} />
        <TextField label="App Store URL" value={app.appStoreUrl} onChange={(value) => update("appStoreUrl", value)} />
      </div>

      <PlatformPicker selected={app.platforms} onChange={(platforms) => update("platforms", platforms)} />
      <TextArea label="Short description" value={app.description} onChange={(value) => update("description", value)} />
      <TextArea label="Long description" value={app.longDescription} onChange={(value) => update("longDescription", value)} />

      <div className="mt-8 border-t border-slate-200 pt-6">
        <h3 className="text-xl font-semibold text-slate-950">Privacy policy</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <TextField
            label="Effective date"
            value={app.privacy.effectiveDate}
            onChange={(value) => onChange({ ...app, privacy: { ...app.privacy, effectiveDate: value } })}
          />
          <TextField
            label="Policy contact email"
            value={app.privacy.contactEmail}
            onChange={(value) => onChange({ ...app, privacy: { ...app.privacy, contactEmail: value } })}
          />
        </div>
        {([
          ["Information collected", "informationCollected"],
          ["How information is used", "howInformationIsUsed"],
          ["Third-party services/SDKs", "thirdPartyServices"],
          ["Ads/analytics disclosure", "adsAnalyticsDisclosure"],
          ["Children's privacy", "childrensPrivacy"],
          ["Updates to policy", "updates"],
        ] as const).map(([label, key]) => (
          <TextArea
            key={key}
            label={label}
            value={app.privacy[key]}
            onChange={(value) =>
              onChange({
                ...app,
                privacy: { ...app.privacy, [key]: value },
              })
            }
          />
        ))}
      </div>

      <div className="mt-8 border-t border-slate-200 pt-6">
        <h3 className="text-xl font-semibold text-slate-950">Terms of Service</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <TextField
            label="Effective date"
            value={app.terms.effectiveDate}
            onChange={(value) => onChange({ ...app, terms: { ...app.terms, effectiveDate: value } })}
          />
          <TextField
            label="Terms contact email"
            value={app.terms.contactEmail}
            onChange={(value) => onChange({ ...app, terms: { ...app.terms, contactEmail: value } })}
          />
        </div>
        {[
          ["Acceptance of terms", "acceptance"],
          ["Permitted use", "permittedUse"],
          ["Purchases and billing", "purchases"],
          ["User content", "userContent"],
          ["Disclaimers", "disclaimers"],
          ["Limitation of liability", "limitationOfLiability"],
          ["Termination", "termination"],
          ["Changes to terms", "changes"],
        ].map(([label, key]) => (
          <TextArea
            key={key}
            label={label}
            value={app.terms[key as keyof AppRecord["terms"]]}
            onChange={(value) =>
              onChange({
                ...app,
                terms: { ...app.terms, [key]: value },
              })
            }
          />
        ))}
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 shadow-sm"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="mt-4 block text-sm font-medium text-slate-700">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 shadow-sm"
      />
    </label>
  );
}

function PlatformPicker({
  selected,
  onChange,
}: {
  selected: Platform[];
  onChange: (platforms: Platform[]) => void;
}) {
  return (
    <fieldset className="mt-5">
      <legend className="text-sm font-medium text-slate-700">Platforms</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {platformOptions.map((platform) => {
          const active = selected.includes(platform);
          return (
            <button
              key={platform}
              type="button"
              onClick={() =>
                onChange(active ? selected.filter((item) => item !== platform) : [...selected, platform])
              }
              className={`rounded-full border px-3 py-1 text-sm font-semibold ${
                active ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-blue-300"
              }`}
            >
              {platform}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
