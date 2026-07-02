import Link from "next/link";
import type { CompanyInfo } from "@/lib/types";

export function Footer({ company }: { company: CompanyInfo }) {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
        <div className="flex gap-5">
          <Link href="/privacy" className="hover:text-sky-300">
            Privacy
          </Link>
          <Link href="/support" className="hover:text-sky-300">
            Support
          </Link>
          <Link href="/admin-portal" className="hover:text-sky-300">
            Admin
          </Link>
          <a href={`mailto:${company.email}`} className="hover:text-sky-300">
            {company.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
