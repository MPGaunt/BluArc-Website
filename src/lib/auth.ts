import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "bluarc_admin_session";

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "local-development-secret";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function verifyPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD || "change-me-now";
  const a = Buffer.from(password);
  const b = Buffer.from(expected);

  if (a.length !== b.length) {
    return false;
  }

  return timingSafeEqual(a, b);
}

export function createSessionValue() {
  const issuedAt = Date.now().toString();
  return `${issuedAt}.${sign(issuedAt)}`;
}

export function isValidSession(value?: string) {
  if (!value) {
    return false;
  }

  const [issuedAt, signature] = value.split(".");
  if (!issuedAt || !signature || sign(issuedAt) !== signature) {
    return false;
  }

  const age = Date.now() - Number(issuedAt);
  return Number.isFinite(age) && age < 1000 * 60 * 60 * 12;
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  return isValidSession(store.get(cookieName)?.value);
}

export async function setAdminSession() {
  const store = await cookies();
  store.set(cookieName, createSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(cookieName);
}
