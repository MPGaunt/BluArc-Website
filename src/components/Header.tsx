import Link from "next/link";
import type { CompanyInfo } from "@/lib/types";
import { CompanyLogo } from "./CompanyLogo";

export function Header({ company }: { company: CompanyInfo }) {
  return (
    <header className="sticky top-0 z-30 px-3 py-3">
      <div className="mx-auto flex max-w-[1840px] flex-col items-center gap-3 rounded-[2.5rem] border border-slate-700 bg-[#111827] px-4 py-4 shadow-2xl shadow-slate-950/25 sm:flex-row sm:justify-between sm:rounded-full sm:py-3">
        <Link href="/" className="flex items-center gap-3 sm:ml-5" aria-label={`${company.name} home`}>
          <CompanyLogo company={company} className="h-24 max-w-64 sm:h-20 sm:max-w-80" />
          {!company.logoUrl ? <span className="text-base font-semibold text-white sm:text-lg">{company.name}</span> : null}
        </Link>
        <nav className="grid w-full grid-cols-3 gap-1 rounded-full bg-white/[0.04] p-1 text-center text-sm font-bold text-slate-200 sm:flex sm:w-auto sm:items-center sm:gap-2 sm:text-lg lg:text-2xl">
          <Link className="rounded-full px-2 py-3 transition hover:bg-white/10 hover:text-white sm:px-5 lg:px-7" href="/apps">
            Apps
          </Link>
          <Link className="rounded-full px-2 py-3 transition hover:bg-white/10 hover:text-white sm:px-5 lg:px-7" href="/privacy">
            Legal
          </Link>
          <Link className="rounded-full bg-sky-400 px-2 py-3 text-slate-950 shadow-lg shadow-sky-500/25 transition hover:bg-white sm:px-7 lg:px-9" href="/support">
            Support
          </Link>
        </nav>
      </div>
    </header>
  );
}
