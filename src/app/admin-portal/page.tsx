import { isAdminAuthenticated } from "@/lib/auth";
import { getSiteContent } from "@/lib/content";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";

export const dynamic = "force-dynamic";

export default async function AdminPortalPage() {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const content = await getSiteContent();
  return <AdminDashboard initialContent={content} />;
}
