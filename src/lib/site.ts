export const siteConfig = {
  name: "Dermot Cox Counselling",
  url: "https://www.dermotcox.com",
  description:
    "Dermot Cox offers psychotherapy and counselling in person in Little Hampden, near Great Missenden, Buckinghamshire, for individuals and couples. Online sessions are also available.",
  email: "dermot@dermotcox.com",
  phoneDisplay: "07831 572050",
  phoneHref: "tel:+447831572050",
  place: "Little Hampden, near Great Missenden, Buckinghamshire",
} as const;

export function isProductionHost() {
  return process.env.NEXT_PUBLIC_SITE_URL === siteConfig.url;
}

export type MenuChild = { id: string; label: string };

export type MenuItem = {
  id: string;
  label: string;
  children?: MenuChild[];
};

export const menuItems: MenuItem[] = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  {
    id: "services",
    label: "Services",
    children: [
      { id: "individual-therapy", label: "Individual therapy" },
      { id: "grief", label: "Grief and loss" },
      { id: "couples-therapy", label: "Couples therapy" },
      { id: "relating", label: "Sexual identity and open relating" },
    ],
  },
  { id: "approach", label: "Approach" },
  { id: "in-person", label: "Visit in person" },
  { id: "online", label: "Online sessions" },
  { id: "fees", label: "Fees & questions" },
  { id: "contact", label: "Contact" },
];

export const desktopNav = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "in-person", label: "Visit" },
  { id: "fees", label: "Fees" },
  { id: "contact", label: "Contact" },
] as const;

export const sectionIds = [
  "top",
  "services",
  "individual-therapy",
  "grief",
  "work-and-life",
  "couples-therapy",
  "relating",
  "about",
  "approach",
  "experience",
  "in-person",
  "online",
  "fees",
  "contact",
] as const;

const serviceIds = new Set([
  "services",
  "individual-therapy",
  "grief",
  "work-and-life",
  "couples-therapy",
  "relating",
]);

export function navIsCurrent(itemId: string, activeId: string) {
  if (itemId === "services") return serviceIds.has(activeId);
  if (itemId === "fees") return activeId === "fees" || activeId === "questions";
  return itemId === activeId;
}

export const chapterLabels: Record<string, string> = {
  top: "Little Hampden",
  services: "Individual and couples",
  "individual-therapy": "Individual therapy",
  grief: "Grief and loss",
  "work-and-life": "Work and a personal life",
  "couples-therapy": "Couples",
  relating: "Sexual identity",
  about: "About",
  approach: "Working together",
  experience: "Working together",
  "in-person": "Little Hampden",
  online: "Online",
  fees: "Fees",
  questions: "Fees",
  contact: "Get in touch",
};
