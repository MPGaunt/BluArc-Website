export type Platform =
  | "iOS"
  | "Android"
  | "tvOS"
  | "watchOS"
  | "macOS"
  | "Web";

export type PrivacyPolicy = {
  effectiveDate: string;
  informationCollected: string;
  howInformationIsUsed: string;
  thirdPartyServices: string;
  adsAnalyticsDisclosure: string;
  childrensPrivacy: string;
  contactEmail: string;
  updates: string;
};

export type TermsOfService = {
  effectiveDate: string;
  acceptance: string;
  permittedUse: string;
  purchases: string;
  userContent: string;
  disclaimers: string;
  limitationOfLiability: string;
  termination: string;
  changes: string;
  contactEmail: string;
};

export type AppRecord = {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  platforms: Platform[];
  iconUrl: string;
  appStoreUrl: string;
  googlePlayUrl: string;
  supportUrl: string;
  privacy: PrivacyPolicy;
  terms: TermsOfService;
};

export type CompanyInfo = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  logoUrl: string;
  supportMessage: string;
};

export type SiteContent = {
  company: CompanyInfo;
  apps: AppRecord[];
};
