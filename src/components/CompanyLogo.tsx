/* eslint-disable @next/next/no-img-element */

import type { CompanyInfo } from "@/lib/types";

export function CompanyLogo({
  company,
  className = "h-12 max-w-44",
}: {
  company: CompanyInfo;
  className?: string;
}) {
  if (company.logoUrl) {
    return (
      <img
        src={company.logoUrl}
        alt={`${company.name} logo`}
        className={`${className} w-auto object-contain`}
      />
    );
  }

  return (
    <span className="grid h-10 w-10 place-items-center rounded-md bg-blue-600 text-sm font-semibold text-white">
      BA
    </span>
  );
}
