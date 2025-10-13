// Centralized service definitions for consistency across the site

export interface Service {
  slug: string;
  name: string;
  icon: string;
  description: string;
  priceFrom: number;
  keywords?: string[];
  included?: string[];
  faq?: { question: string; answer: string }[];
  category?: string;
}

export const services: Service[] = [
  // MONTAGE & INSTALLATIE
  {
    slug: "meubelmontage",
    name: "Meubelmontage",
    icon: "🪛",
    description: "IKEA, kasten, bedden en meer monteren",
    priceFrom: 25,
    category: "Montage & Installatie",
    keywords: ["ikea", "meubel", "monteren", "opbouwen", "kast", "bed", "assemble"],
  },
  {
    slug: "tv-ophangen",
    name: "TV Ophangen",
    icon: "📺",
    description: "TV's en beeldschermen monteren",
    priceFrom: 35,
    category: "Montage & Installatie",
    keywords: ["tv", "televisie", "ophangen", "muur", "beugel", "mount"],
  },
  {
    slug: "gordijnen-ophangen",
    name: "Gordijnen Ophangen",
    icon: "🪟",
    description: "Gordijnen en rolgordijnen installeren",
    priceFrom: 30,
    category: "Montage & Installatie",
    keywords: ["gordijn", "rolgordijn", "rail", "roede", "ophangen"],
  },
  {
    slug: "lampen-installeren",
    name: "Lampen Installeren",
    icon: "💡",
    description: "Hanglampen en verlichting monteren",
    priceFrom: 35,
    category: "Montage & Installatie",
    keywords: ["lamp", "verlichting", "kroonluchter", "hanglamp", "installeren"],
  },
  {
    slug: "keukenapparatuur",
    name: "Keukenapparatuur",
    icon: "🔌",
    description: "Vaatwasser, wasmachine aansluiten",
    priceFrom: 40,
    category: "Montage & Installatie",
    keywords: ["vaatwasser", "wasmachine", "droger", "oven", "aansluiten"],
  },
  {
    slug: "airco-installatie",
    name: "Airco Installatie",
    icon: "❄️",
    description: "Airconditioning en ventilatie",
    priceFrom: 50,
    category: "Montage & Installatie",
    keywords: ["airco", "airconditioning", "ventilatie", "klimaat"],
  },

  // SCHILDEREN & AFWERKING
  {
    slug: "schilderen",
    name: "Schilderen",
    icon: "🎨",
    description: "Binnen & buiten schilderwerk",
    priceFrom: 30,
    category: "Schilderen & Afwerking",
    keywords: ["verf", "muur", "plafond", "schilder", "binnen", "buiten"],
  },
  {
    slug: "behangen",
    name: "Behangen",
    icon: "📐",
    description: "Behang plakken en verwijderen",
    priceFrom: 28,
    category: "Schilderen & Afwerking",
    keywords: ["behang", "plakken", "stomen", "verwijderen", "muur"],
  },
  {
    slug: "stucwerk",
    name: "Stucwerk",
    icon: "🏗️",
    description: "Stucen en gladmaken muren",
    priceFrom: 35,
    category: "Schilderen & Afwerking",
    keywords: ["stuc", "pleister", "glad", "afwerken", "muur"],
  },
  {
    slug: "tegelwerk",
    name: "Tegelwerk",
    icon: "⬜",
    description: "Tegels leggen en repareren",
    priceFrom: 40,
    category: "Schilderen & Afwerking",
    keywords: ["tegel", "vloer", "muur", "badkamer", "keuken"],
  },

  // LOODGIETER & SANITAIR
  {
    slug: "loodgieter",
    name: "Loodgieter",
    icon: "🚰",
    description: "Lekken, kranen en sanitair",
    priceFrom: 40,
    category: "Loodgieter & Sanitair",
    keywords: ["lek", "kraan", "toilet", "douche", "cv", "sanitair"],
  },
  {
    slug: "afvoer-ontstoppen",
    name: "Afvoer Ontstoppen",
    icon: "🚿",
    description: "Verstoppingen verhelpen",
    priceFrom: 45,
    category: "Loodgieter & Sanitair",
    keywords: ["afvoer", "verstopping", "riool", "wc", "ontstoppen"],
  },
  {
    slug: "cv-onderhoud",
    name: "CV Onderhoud",
    icon: "♨️",
    description: "Centrale verwarming service",
    priceFrom: 50,
    category: "Loodgieter & Sanitair",
    keywords: ["cv", "ketel", "verwarming", "radiator", "onderhoud"],
  },

  // ELEKTRISCH
  {
    slug: "elektrisch",
    name: "Elektricien",
    icon: "⚡",
    description: "Stopcontacten en schakelaars",
    priceFrom: 35,
    category: "Elektrisch",
    keywords: ["elektra", "stopcontact", "schakelaar", "verlichting"],
  },
  {
    slug: "slimme-woning",
    name: "Slimme Woning",
    icon: "🏠",
    description: "Smart home installatie",
    priceFrom: 45,
    category: "Elektrisch",
    keywords: ["smart home", "nest", "philips hue", "alexa", "slimme"],
  },

  // VERHUIZEN & TRANSPORT
  {
    slug: "verhuizen",
    name: "Verhuizen",
    icon: "📦",
    description: "Sjouwen & transporteren",
    priceFrom: 28,
    category: "Verhuizen & Transport",
    keywords: ["verhuizing", "sjouwen", "tillen", "transport", "dozen"],
  },
  {
    slug: "meubels-verplaatsen",
    name: "Meubels Verplaatsen",
    icon: "🛋️",
    description: "Zware meubels verplaatsen",
    priceFrom: 30,
    category: "Verhuizen & Transport",
    keywords: ["meubel", "verplaatsen", "tillen", "zwaar", "bank"],
  },
  {
    slug: "spullen-ophalen",
    name: "Spullen Ophalen",
    icon: "🚚",
    description: "Items ophalen en bezorgen",
    priceFrom: 25,
    category: "Verhuizen & Transport",
    keywords: ["ophalen", "bezorgen", "delivery", "transport", "halen"],
  },
  {
    slug: "opslag-organiseren",
    name: "Opslag Organiseren",
    icon: "📋",
    description: "Zolder en kelder opruimen",
    priceFrom: 25,
    category: "Verhuizen & Transport",
    keywords: ["opslag", "zolder", "kelder", "organiseren", "opruimen"],
  },

  // TUIN & BUITENRUIMTE
  {
    slug: "tuinonderhoud",
    name: "Tuinonderhoud",
    icon: "🌱",
    description: "Maaien, snoeien en onderhoud",
    priceFrom: 25,
    category: "Tuin & Buitenruimte",
    keywords: ["tuin", "gras", "maaien", "snoeien", "heg", "gazon"],
  },
  {
    slug: "tuinieren",
    name: "Tuinaanleg",
    icon: "🌻",
    description: "Nieuwe tuin aanleggen",
    priceFrom: 30,
    category: "Tuin & Buitenruimte",
    keywords: ["aanleg", "beplanting", "borders", "planten", "tuinaanleg"],
  },
  {
    slug: "terras-aanleggen",
    name: "Terras Aanleggen",
    icon: "🪵",
    description: "Terras en patio bouwen",
    priceFrom: 40,
    category: "Tuin & Buitenruimte",
    keywords: ["terras", "patio", "tegels", "hout", "vlonder"],
  },
  {
    slug: "schutting-plaatsen",
    name: "Schutting Plaatsen",
    icon: "🏡",
    description: "Schutting en hekwerk",
    priceFrom: 35,
    category: "Tuin & Buitenruimte",
    keywords: ["schutting", "hek", "afrastering", "privacy", "tuin"],
  },
  {
    slug: "onkruid-verwijderen",
    name: "Onkruid Verwijderen",
    icon: "🌿",
    description: "Tuin onkruidvrij maken",
    priceFrom: 22,
    category: "Tuin & Buitenruimte",
    keywords: ["onkruid", "wieden", "verwijderen", "tuin", "bestrating"],
  },

  // SCHOONMAAK
  {
    slug: "schoonmaken",
    name: "Schoonmaken",
    icon: "🧹",
    description: "Huis en kantoor schoonmaken",
    priceFrom: 22,
    category: "Schoonmaak",
    keywords: ["schoon", "poetsen", "opruimen", "kantoor", "huis"],
  },
  {
    slug: "dieptereiniging",
    name: "Dieptereiniging",
    icon: "✨",
    description: "Grondige schoonmaakbeurt",
    priceFrom: 28,
    category: "Schoonmaak",
    keywords: ["deep cleaning", "grondig", "schoonmaak", "intensive"],
  },
  {
    slug: "ramen-wassen",
    name: "Ramen Wassen",
    icon: "🪟",
    description: "Ramen en kozijnen reinigen",
    priceFrom: 25,
    category: "Schoonmaak",
    keywords: ["raam", "wassen", "poetsen", "glas", "kozijn"],
  },
  {
    slug: "vloeren-reinigen",
    name: "Vloeren Reinigen",
    icon: "🧽",
    description: "Alle soorten vloeren",
    priceFrom: 24,
    category: "Schoonmaak",
    keywords: ["vloer", "parket", "laminaat", "tegels", "reinigen"],
  },
  {
    slug: "post-verbouwing",
    name: "Post-Verbouwing",
    icon: "🏗️",
    description: "Schoonmaken na verbouwing",
    priceFrom: 30,
    category: "Schoonmaak",
    keywords: ["verbouwing", "bouw", "stof", "opruimen", "afbouw"],
  },
  {
    slug: "tapijt-reinigen",
    name: "Tapijt Reinigen",
    icon: "🧼",
    description: "Tapijten en vloerkleden",
    priceFrom: 28,
    category: "Schoonmaak",
    keywords: ["tapijt", "vloerkleed", "reinigen", "carpet", "cleaning"],
  },

  // ALGEMENE KLUSSEN
  {
    slug: "klusjesman",
    name: "Algemene Klussen",
    icon: "🔧",
    description: "Alles wat kapot is repareren",
    priceFrom: 28,
    category: "Algemene Klussen",
    keywords: ["repareren", "maken", "fixen", "handyman", "allround"],
  },
  {
    slug: "ophangwerk",
    name: "Ophangwerk",
    icon: "🖼️",
    description: "Schilderijen en planken ophangen",
    priceFrom: 25,
    category: "Algemene Klussen",
    keywords: ["ophangen", "schilderij", "plank", "spiegels", "lijst"],
  },
  {
    slug: "deur-reparatie",
    name: "Deur Reparatie",
    icon: "🚪",
    description: "Deuren repareren en bijstellen",
    priceFrom: 30,
    category: "Algemene Klussen",
    keywords: ["deur", "repareren", "schuren", "bijstellen", "hang"],
  },
  {
    slug: "kozijnen",
    name: "Kozijnen",
    icon: "🪟",
    description: "Reparatie en schilderen",
    priceFrom: 35,
    category: "Algemene Klussen",
    keywords: ["raam", "deur", "kozijn", "schilderen", "repareren"],
  },

  // BEVEILIGING & SLOTEN
  {
    slug: "slotenmaker",
    name: "Slotenmaker",
    icon: "🔐",
    description: "Slot vervangen of repareren",
    priceFrom: 45,
    category: "Beveiliging & Sloten",
    keywords: ["slot", "deur", "cilinder", "sleutel", "inbraak", "beveiliging"],
  },
  {
    slug: "camera-installatie",
    name: "Camera Installatie",
    icon: "📹",
    description: "Beveiligingscamera's plaatsen",
    priceFrom: 50,
    category: "Beveiliging & Sloten",
    keywords: ["camera", "beveiliging", "cctv", "ring", "nest"],
  },
  {
    slug: "deurbel-installeren",
    name: "Deurbel Installeren",
    icon: "🔔",
    description: "Slimme en gewone deurbellen",
    priceFrom: 35,
    category: "Beveiliging & Sloten",
    keywords: ["deurbel", "ring", "video", "intercom", "bel"],
  },

  // TIMMERWERK
  {
    slug: "timmerwerk",
    name: "Timmerwerk",
    icon: "🪚",
    description: "Kasten en maatwerk maken",
    priceFrom: 40,
    category: "Timmerwerk",
    keywords: ["timmeren", "kast", "maatwerk", "hout", "bouwen"],
  },
  {
    slug: "vloer-leggen",
    name: "Vloer Leggen",
    icon: "📏",
    description: "Laminaat en parket leggen",
    priceFrom: 35,
    category: "Timmerwerk",
    keywords: ["vloer", "laminaat", "parket", "pvc", "leggen"],
  },
  {
    slug: "plinten-plaatsen",
    name: "Plinten Plaatsen",
    icon: "📐",
    description: "Plinten en hoeklijsten",
    priceFrom: 25,
    category: "Timmerwerk",
    keywords: ["plint", "hoeklijn", "afwerking", "vloer"],
  },

  // OPRUIMEN & ORGANISEREN
  {
    slug: "opruimen",
    name: "Opruimen",
    icon: "🗑️",
    description: "Huis of kantoor opruimen",
    priceFrom: 22,
    category: "Opruimen & Organiseren",
    keywords: ["opruimen", "declutter", "minimaliseren", "organiseren"],
  },
  {
    slug: "inboedel-verwijderen",
    name: "Inboedel Verwijderen",
    icon: "♻️",
    description: "Spullen weggooien en recyclen",
    priceFrom: 28,
    category: "Opruimen & Organiseren",
    keywords: ["inboedel", "verwijderen", "opruiming", "weggooien"],
  },
  {
    slug: "container-vullen",
    name: "Container Vullen",
    icon: "🚮",
    description: "Afval container vullen",
    priceFrom: 25,
    category: "Opruimen & Organiseren",
    keywords: ["container", "puin", "afval", "vullen", "slopen"],
  },

  // DIGITAAL & TECH
  {
    slug: "computer-hulp",
    name: "Computer Hulp",
    icon: "💻",
    description: "PC en laptop installatie",
    priceFrom: 35,
    category: "Digitaal & Tech",
    keywords: ["computer", "laptop", "pc", "installatie", "tech"],
  },
  {
    slug: "wifi-installatie",
    name: "WiFi Installatie",
    icon: "📡",
    description: "Internet en netwerk opzetten",
    priceFrom: 40,
    category: "Digitaal & Tech",
    keywords: ["wifi", "internet", "netwerk", "router", "mesh"],
  },
  {
    slug: "thuisbioscoop",
    name: "Thuisbioscoop",
    icon: "🎬",
    description: "Home cinema installeren",
    priceFrom: 50,
    category: "Digitaal & Tech",
    keywords: ["thuisbioscoop", "surround", "audio", "soundbar", "cinema"],
  },

  // AUTO & FIETS
  {
    slug: "fiets-reparatie",
    name: "Fiets Reparatie",
    icon: "🚲",
    description: "Fiets repareren en onderhoud",
    priceFrom: 25,
    category: "Auto & Fiets",
    keywords: ["fiets", "repareren", "lekke band", "schakeling"],
  },
  {
    slug: "auto-wassen",
    name: "Auto Wassen",
    icon: "🚗",
    description: "Auto binnen en buiten reinigen",
    priceFrom: 30,
    category: "Auto & Fiets",
    keywords: ["auto", "wassen", "poetsen", "reinigen", "car"],
  },

  // OVERIGE DIENSTEN
  {
    slug: "boodschappen-doen",
    name: "Boodschappen Doen",
    icon: "🛒",
    description: "Boodschappen halen en bezorgen",
    priceFrom: 20,
    category: "Overige Diensten",
    keywords: ["boodschappen", "supermarkt", "halen", "bezorgen"],
  },
  {
    slug: "wachtrij-staan",
    name: "Wachtrij Staan",
    icon: "⏰",
    description: "In de rij staan voor jou",
    priceFrom: 25,
    category: "Overige Diensten",
    keywords: ["wachtrij", "rij", "queue", "wachten"],
  },
  {
    slug: "huisdier-verzorging",
    name: "Huisdier Verzorging",
    icon: "🐕",
    description: "Uitlaten en oppassen",
    priceFrom: 18,
    category: "Overige Diensten",
    keywords: ["hond", "kat", "uitlaten", "oppassen", "pet"],
  },
  {
    slug: "event-hulp",
    name: "Event Hulp",
    icon: "🎉",
    description: "Feesten en events assisteren",
    priceFrom: 25,
    category: "Overige Diensten",
    keywords: ["event", "feest", "party", "evenement", "helpen"],
  },
  {
    slug: "inpakken",
    name: "Inpakken",
    icon: "🎁",
    description: "Spullen inpakken voor verhuizing",
    priceFrom: 22,
    category: "Overige Diensten",
    keywords: ["inpakken", "dozen", "verhuizen", "pakken"],
  },
  {
    slug: "winkelen-assistentie",
    name: "Winkelen Assistentie",
    icon: "🛍️",
    description: "Hulp bij winkelen en dragen",
    priceFrom: 22,
    category: "Overige Diensten",
    keywords: ["winkelen", "shoppen", "assistentie", "dragen"],
  }
];

// Helper to get service by slug
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}

// Get popular services (for homepage)
export function getPopularServices(): Service[] {
  return services.filter(s => 
    ['meubelmontage', 'schilderen', 'verhuizen', 'tuinonderhoud', 
     'schoonmaken', 'klusjesman', 'elektrisch', 'loodgieter'].includes(s.slug)
  );
}

// Get all unique categories
export function getCategories(): string[] {
  const categories = services.map(s => s.category).filter(Boolean) as string[];
  return Array.from(new Set(categories));
}

// Get services by category
export function getServicesByCategory(category: string): Service[] {
  return services.filter(s => s.category === category);
}
