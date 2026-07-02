import Link from "next/link";
import type { CompanyInfo } from "@/lib/types";
import { CompanyLogo } from "./CompanyLogo";

export function Header({ company }: { company: CompanyInfo }) {
  return (
    <header className="sticky top-0 z-30 px-3 py-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-slate-700 bg-[#111827] px-4 py-3 shadow-2xl shadow-slate-950/25">
        <Link href="/" className="ml-3 flex items-center gap-3 sm:ml-5" aria-label={`${company.name} home`}>
          <CompanyLogo company={company} className="h-16 max-w-64 sm:h-20 sm:max-w-80" />
          {!company.logoUrl ? <span className="text-base font-semibold text-white sm:text-lg">{company.name}</span> : null}
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-200 sm:gap-3">
          <Link className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white" href="/apps">
            Apps
          </Link>
          <Link className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white" href="/privacy">
            Privacy
          </Link>
          <Link className="rounded-full bg-sky-400 px-3 py-2 text-slate-950 shadow-sm shadow-sky-500/30 transition hover:bg-white sm:px-4" href="/support">
            Support
          </Link>
        </nav>
      </div>
    </header>
  );
}
