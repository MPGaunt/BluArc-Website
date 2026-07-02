import { promises as fs } from "node:fs";
import path from "node:path";
import { normalizeSlug } from "./app-utils";
import type { AppRecord, SiteContent } from "./types";

const contentPath = path.join(process.cwd(), "data", "site-content.json");

export async function getSiteContent(): Promise<SiteContent> {
  const raw = await fs.readFile(contentPath, "utf8");
  const content = JSON.parse(raw) as SiteContent;
  return {
    ...content,
    apps: content.apps
      .map((app) => ({ ...app, slug: normalizeSlug(app.slug || app.name) }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  };
}

export async function saveSiteContent(content: SiteContent) {
  const normalized: SiteContent = {
    company: content.company,
    apps: content.apps.map((app) => ({
      ...app,
      id: app.id || normalizeSlug(app.name),
      slug: normalizeSlug(app.slug || app.name),
      platforms: app.platforms || [],
    })),
  };

  await fs.writeFile(contentPath, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
}

export async function getAppBySlug(slug: string): Promise<AppRecord | undefined> {
  const content = await getSiteContent();
  return content.apps.find((app) => app.slug === slug);
}
