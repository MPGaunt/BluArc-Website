import { setAdminSession, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };

  if (!verifyPassword(body.password || "")) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  await setAdminSession();
  return Response.json({ ok: true });
}
