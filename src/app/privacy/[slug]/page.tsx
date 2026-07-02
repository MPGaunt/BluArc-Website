import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { PrivacyPolicyView } from "@/components/PrivacyPolicyView";
import { getAppBySlug, getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [content, app] = await Promise.all([getSiteContent(), getAppBySlug(slug)]);

  if (!app) {
    notFound();
  }

  return (
    <PageShell company={content.company}>
      <PrivacyPolicyView app={app} />
    </PageShell>
  );
}
