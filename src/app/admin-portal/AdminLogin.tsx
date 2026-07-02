"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      setError("That password did not work.");
      return;
    }

    window.location.reload();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-5">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">BluArc Admin</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-950">Admin portal</h1>
        <label className="mt-6 block text-sm font-medium text-slate-700" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 shadow-sm"
          autoComplete="current-password"
        />
        {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}
        <button className="mt-6 w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700" disabled={isSubmitting}>
          {isSubmitting ? "Checking..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
