export const siteConfig = {
  name: "Dermot Cox Counselling",
  url: "https://www.dermotcox.com",
  description:
    "Dermot Cox offers psychotherapy and counselling for individuals and couples, in person in Little Hampden, near Great Missenden in Buckinghamshire, and online.",
  email: "dermot@dermotcox.com",
  phoneDisplay: "07831 572050",
  phoneHref: "tel:+447831572050",
  whatsappHref:
    "https://wa.me/447831572050?text=Hello%20Dermot%2C%20I%20would%20like%20to%20ask%20about%20a%20first%20conversation.",
  mapHref: "https://www.google.com/maps/search/?api=1&query=Little+Hampden+HP16+9PS",
  mapEmbed: "https://maps.google.com/maps?q=Little%20Hampden%2C%20HP16%209PS&z=14&output=embed",
  place: "Little Hampden, near Great Missenden, Buckinghamshire",
} as const;

const indexableHosts = new Set(["dermotcox.com", "www.dermotcox.com"]);

export function isIndexableHost(host: string) {
  return indexableHosts.has(host);
}

export const previewRobots = {
  index: false,
  follow: false,
  noarchive: true,
  nosnippet: true,
  noimageindex: true,
  googleBot: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
} as const;

export type MenuChild = { id: string; label: string };

export type MenuItem = {
  id: string;
  label: string;
  children?: MenuChild[];
};

export const menuItems: MenuItem[] = [
  { id: "about", label: "About" },
  { id: "individual-therapy", label: "Individual" },
  { id: "couples-therapy", label: "Couples" },
  { id: "in-person", label: "Location" },
  { id: "fees", label: "Fees" },
  { id: "contact", label: "Contact" },
];

export const desktopNav = [
  { id: "about", label: "About" },
  { id: "individual-therapy", label: "Individual" },
  { id: "couples-therapy", label: "Couples" },
  { id: "in-person", label: "Location" },
  { id: "fees", label: "Fees" },
  { id: "contact", label: "Contact" },
] as const;

export const sectionIds = [
  "top",
  "in-person",
  "individual-therapy",
  "couples-therapy",
  "about",
  "approach",
  "experience",
  "fees",
  "online",
  "questions",
  "contact",
] as const;

export function navIsCurrent(itemId: string, activeId: string) {
  if (itemId === "fees") return activeId === "fees" || activeId === "questions";
  if (itemId === "about") return activeId === "about" || activeId === "approach" || activeId === "experience";
  return itemId === activeId;
}

export const chapterLabels: Record<string, string> = {
  top: "Little Hampden",
  "in-person": "The garden room",
  "individual-therapy": "Individual therapy",
  grief: "Bereavement and loss",
  "work-and-life": "Work related issues",
  "couples-therapy": "Couples",
  relating: "Sexual identity",
  about: "About",
  approach: "Working together",
  experience: "Training and membership",
  online: "Online",
  fees: "Fees",
  questions: "Before you get in touch",
  contact: "Get in touch",
};
