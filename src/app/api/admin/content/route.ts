import { isAdminAuthenticated } from "@/lib/auth";
import { getSiteContent, saveSiteContent } from "@/lib/content";
import type { SiteContent } from "@/lib/types";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json(await getSiteContent());
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = (await request.json()) as SiteContent;

  if (!content.company?.name || !Array.isArray(content.apps)) {
    return Response.json({ error: "Invalid site content" }, { status: 400 });
  }

  await saveSiteContent(content);
  return Response.json({ ok: true, content: await getSiteContent() });
}
