import type { AppRecord } from "./types";

export function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function makeDefaultApp(): AppRecord {
  const effectiveDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "America/Detroit",
  }).format(new Date());

  return {
    id: globalThis.crypto.randomUUID(),
    name: "New App",
    slug: "new-app",
    description: "Short app description.",
    longDescription: "Longer app description for the app detail page.",
    platforms: ["iOS"],
    iconUrl: "",
    appStoreUrl: "#",
    googlePlayUrl: "#",
    supportUrl: "/support#new-app",
    privacy: {
      effectiveDate,
      informationCollected: "This app does not collect personal data from users.",
      howInformationIsUsed:
        "Because this app does not collect personal data, no personal information is used for tracking, profiling, or advertising.",
      thirdPartyServices:
        "This app may use platform services for app distribution, crash reporting, purchases, or basic device functionality.",
      adsAnalyticsDisclosure:
        "This app does not include third-party advertising or analytics SDKs unless this policy is updated to disclose them.",
      childrensPrivacy:
        "This app is not intended to knowingly collect personal information from children. If you believe a child has provided personal information, contact us so we can address it.",
      contactEmail: "support@bluarcllc.com",
      updates:
        "We may update this privacy policy from time to time. Updates will be posted on this page with a revised effective date.",
    },
  };
}
