import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { MarketingHeader } from "@/components/marketing/shell/Header";
import { MarketingFooter } from "@/components/marketing/shell/Footer";
import { CookiesBanner } from "@/components/marketing/CookiesBanner";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col">
        <MarketingHeader />
        <main className="flex-1">{children}</main>
        <MarketingFooter />
        <CookiesBanner />
      </div>
    </SmoothScroll>
  );
}
