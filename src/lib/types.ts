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
