export const localPlaces = [
  "Little Hampden",
  "Great Missenden",
  "Prestwood",
  "Amersham",
  "Chesham",
  "High Wycombe",
  "Beaconsfield",
  "Princes Risborough",
  "Aylesbury",
] as const;

export const widerAreaSentence =
  "Clients can also travel from elsewhere in Buckinghamshire and surrounding areas.";

export const buckinghamshireAnswer = `Yes. People can come to the garden room in Little Hampden, near Great Missenden, from Prestwood, Amersham, Chesham, High Wycombe, Beaconsfield, Princes Risborough and Aylesbury, and from elsewhere in Buckinghamshire and the surrounding area. If the journey is too far, we can meet online.`;

export const areaServed = [
  { "@type": "Place" as const, name: "The Chilterns" },
  { "@type": "AdministrativeArea" as const, name: "Buckinghamshire" },
  ...localPlaces.map((name) => ({ "@type": "Place" as const, name })),
];
