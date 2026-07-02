import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { CompanyInfo } from "@/lib/types";

export function PageShell({
  company,
  children,
}: {
  company: CompanyInfo;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header company={company} />
      <main className="flex-1">{children}</main>
      <Footer company={company} />
    </>
  );
}
