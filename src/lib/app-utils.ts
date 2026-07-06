import type { AppRecord, TermsOfService } from "./types";

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
    terms: makeDefaultTerms("New App", effectiveDate),
  };
}

export function makeDefaultTerms(appName: string, effectiveDate: string): TermsOfService {
  return {
    effectiveDate,
    acceptance: `By downloading, accessing, or using ${appName}, you agree to these Terms of Service. If you do not agree, do not use the app.`,
    permittedUse: `${appName} is provided for personal, lawful use. You agree not to misuse the app, interfere with its operation, attempt unauthorized access, or use it in a way that violates applicable laws.`,
    purchases:
      "If the app offers paid downloads, subscriptions, or in-app purchases, those transactions are handled by the applicable app store. Refunds, billing, and cancellation rules are managed by that store's policies.",
    userContent:
      "If the app allows you to create, save, or share content, you are responsible for that content and for ensuring you have the rights needed to use it.",
    disclaimers:
      "The app is provided as is and as available. We work to keep it useful and reliable, but we do not guarantee uninterrupted or error-free operation.",
    limitationOfLiability:
      "To the maximum extent permitted by law, BluArc, LLC is not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the app.",
    termination:
      "We may suspend or discontinue access to the app if these terms are violated or if the app is no longer supported.",
    changes:
      "We may update these Terms of Service from time to time. Updates will be posted on this page with a revised effective date.",
    contactEmail: "support@bluarcllc.com",
  };
}
