import Link from "next/link";
import type { CompanyInfo } from "@/lib/types";
import { CompanyLogo } from "./CompanyLogo";

export function Header({ company }: { company: CompanyInfo }) {
  return (
    <header className="sticky top-0 z-30 px-3 py-3">
      <div className="mx-auto flex max-w-[1840px] items-center justify-between rounded-full border border-slate-700 bg-[#111827] px-4 py-3 shadow-2xl shadow-slate-950/25">
        <Link href="/" className="ml-3 flex items-center gap-3 sm:ml-5" aria-label={`${company.name} home`}>
          <CompanyLogo company={company} className="h-16 max-w-64 sm:h-20 sm:max-w-80" />
          {!company.logoUrl ? <span className="text-base font-semibold text-white sm:text-lg">{company.name}</span> : null}
        </Link>
        <nav className="flex items-center gap-1 rounded-full bg-white/[0.04] p-1 text-sm font-bold text-slate-200 sm:gap-2 sm:text-lg lg:text-2xl">
          <Link className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white sm:px-5 sm:py-3 lg:px-7" href="/apps">
            Apps
          </Link>
          <Link className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white sm:px-5 sm:py-3 lg:px-7" href="/privacy">
            Privacy
          </Link>
          <Link className="rounded-full bg-sky-400 px-4 py-2 text-slate-950 shadow-lg shadow-sky-500/25 transition hover:bg-white sm:px-7 sm:py-3 lg:px-9" href="/support">
            Support
          </Link>
        </nav>
      </div>
    </header>
  );
}
