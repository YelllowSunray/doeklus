// App Constants

// Service Categories
export const SERVICES = [
  {
    slug: 'meubelmontage',
    name: 'Meubelmontage',
    icon: '🪛',
    description: 'IKEA of andere meubels monteren',
    priceFrom: 25,
    category: 'Huis & Interieur'
  },
  {
    slug: 'schilderen',
    name: 'Schilderen',
    icon: '🎨',
    description: 'Binnen- of buitenschilderwerk',
    priceFrom: 30,
    category: 'Huis & Interieur'
  },
  {
    slug: 'verhuizen',
    name: 'Verhuizen',
    icon: '📦',
    description: 'Sjouwen, inpakken en transporteren',
    priceFrom: 28,
    category: 'Verhuizen & Transport'
  },
  {
    slug: 'tuinonderhoud',
    name: 'Tuinonderhoud',
    icon: '🌱',
    description: 'Maaien, snoeien en onderhouden',
    priceFrom: 25,
    category: 'Tuin & Buitenruimte'
  },
  {
    slug: 'schoonmaken',
    name: 'Schoonmaken',
    icon: '🧹',
    description: 'Huis of kantoor schoonmaken',
    priceFrom: 22,
    category: 'Huis & Interieur'
  },
  {
    slug: 'klusjesman',
    name: 'Algemene klussen',
    icon: '🔧',
    description: 'Kleine reparaties en klusjes',
    priceFrom: 28,
    category: 'Klussen & Reparaties'
  },
  {
    slug: 'elektrische-klussen',
    name: 'Elektrische klussen',
    icon: '💡',
    description: 'Lampen, stopcontacten, schakelaars',
    priceFrom: 35,
    category: 'Klussen & Reparaties'
  },
  {
    slug: 'loodgieter',
    name: 'Loodgieterswerk',
    icon: '🚰',
    description: 'Lekken, kranen, wc\'s en afvoeren',
    priceFrom: 40,
    category: 'Klussen & Reparaties'
  }
] as const;

// Task Status
export const TASK_STATUS = {
  OPEN: 'open',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  KLUSSER: 'klusser',
  ADMIN: 'admin'
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  REFUNDED: 'refunded'
} as const;

// Offer Status
export const OFFER_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected'
} as const;

// Booking Status
export const BOOKING_STATUS = {
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

// Service Fee (percentage)
export const SERVICE_FEE_PERCENTAGE = 15;

// Urgency Multipliers
export const URGENCY_MULTIPLIERS = {
  normal: 1,
  'same-day': 1.3,
  urgent: 1.5
} as const;

// Dutch Cities (top 20)
export const DUTCH_CITIES = [
  'Amsterdam',
  'Rotterdam',
  'Den Haag',
  'Utrecht',
  'Eindhoven',
  'Groningen',
  'Tilburg',
  'Almere',
  'Breda',
  'Nijmegen',
  'Apeldoorn',
  'Haarlem',
  'Arnhem',
  'Zaanstad',
  'Amersfoort',
  'Hoofddorp',
  'Maastricht',
  'Leiden',
  'Dordrecht',
  'Zoetermeer'
] as const;

// Working Days
export const WORKING_DAYS = [
  'Maandag',
  'Dinsdag',
  'Woensdag',
  'Donderdag',
  'Vrijdag',
  'Zaterdag',
  'Zondag'
] as const;

// Time Slots
export const TIME_SLOTS = [
  { value: 'morning', label: 'Ochtend (8:00 - 12:00)' },
  { value: 'afternoon', label: 'Middag (12:00 - 17:00)' },
  { value: 'evening', label: 'Avond (17:00 - 21:00)' }
] as const;

// App Config
export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'Doeklus',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supportEmail: 'help@doeklus.nl',
  supportPhone: '020 123 4567',
  maxImageSize: 5 * 1024 * 1024, // 5MB
  maxImagesPerTask: 10,
  maxPortfolioImages: 20
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_EMAIL: 'Ongeldig e-mailadres',
    WEAK_PASSWORD: 'Wachtwoord moet minimaal 6 tekens zijn',
    USER_NOT_FOUND: 'Gebruiker niet gevonden',
    WRONG_PASSWORD: 'Onjuist wachtwoord',
    EMAIL_IN_USE: 'E-mailadres is al in gebruik'
  },
  UPLOAD: {
    FILE_TOO_LARGE: 'Bestand is te groot (max 5MB)',
    INVALID_FILE_TYPE: 'Ongeldig bestandstype',
    UPLOAD_FAILED: 'Upload mislukt, probeer opnieuw'
  },
  GENERAL: {
    NETWORK_ERROR: 'Netwerkfout, controleer je internetverbinding',
    UNKNOWN_ERROR: 'Er is iets misgegaan, probeer het opnieuw'
  }
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  AUTH: {
    SIGNUP_SUCCESS: 'Account succesvol aangemaakt!',
    LOGIN_SUCCESS: 'Succesvol ingelogd!',
    LOGOUT_SUCCESS: 'Succesvol uitgelogd',
    PASSWORD_RESET_SENT: 'Wachtwoord reset e-mail verzonden'
  },
  TASK: {
    CREATED: 'Klus succesvol geplaatst!',
    UPDATED: 'Klus bijgewerkt',
    DELETED: 'Klus verwijderd',
    OFFER_SENT: 'Aanbieding verzonden'
  },
  BOOKING: {
    CONFIRMED: 'Boeking bevestigd!',
    COMPLETED: 'Klus afgerond',
    CANCELLED: 'Boeking geannuleerd'
  }
} as const;

