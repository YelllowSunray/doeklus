// Firebase Error Handler - Translates Firebase errors to Dutch

export const getAuthErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    // Auth errors
    'auth/email-already-in-use': 'Dit e-mailadres is al in gebruik',
    'auth/invalid-email': 'Ongeldig e-mailadres',
    'auth/operation-not-allowed': 'Deze login methode is niet toegestaan',
    'auth/weak-password': 'Wachtwoord is te zwak (minimaal 6 tekens)',
    'auth/user-disabled': 'Dit account is uitgeschakeld',
    'auth/user-not-found': 'Gebruiker niet gevonden',
    'auth/wrong-password': 'Onjuist wachtwoord',
    'auth/too-many-requests': 'Te veel pogingen. Probeer later opnieuw',
    'auth/network-request-failed': 'Netwerkfout. Check je internetverbinding',
    
    // Google Sign-In specific
    'auth/popup-closed-by-user': 'Inloggen geannuleerd',
    'auth/cancelled-popup-request': 'Inloggen geannuleerd',
    'auth/popup-blocked': 'Popup geblokkeerd. Sta popups toe en probeer opnieuw',
    'auth/unauthorized-domain': 'Dit domein is niet toegestaan voor Google Sign-In',
    'auth/invalid-credential': 'Ongeldige inloggegevens',
    'auth/account-exists-with-different-credential': 'Account bestaat al met andere login methode',
    
    // Session & token errors
    'auth/requires-recent-login': 'Log opnieuw in voor deze actie',
    'auth/invalid-api-key': 'Configuratiefout. Neem contact op met support',
    'auth/app-deleted': 'App is verwijderd',
    'auth/expired-action-code': 'Link is verlopen',
    'auth/invalid-action-code': 'Ongeldige link',
    
    // Default
    'default': 'Er is iets misgegaan. Probeer het opnieuw'
  };

  return errorMessages[errorCode] || errorMessages['default'];
};

export const handleAuthError = (error: any): string => {
  if (error?.code) {
    return getAuthErrorMessage(error.code);
  }
  
  if (error?.message) {
    // Check for specific error patterns
    if (error.message.includes('email-already-in-use')) {
      return 'Dit e-mailadres is al in gebruik';
    }
    if (error.message.includes('popup')) {
      return 'Popup geblokkeerd of gesloten. Probeer opnieuw';
    }
    if (error.message.includes('network')) {
      return 'Netwerkfout. Check je internetverbinding';
    }
    
    return error.message;
  }
  
  return 'Er is iets misgegaan. Probeer het opnieuw';
};

// Firestore error handler
export const getFirestoreErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    'permission-denied': 'Je hebt geen toestemming voor deze actie',
    'not-found': 'Document niet gevonden',
    'already-exists': 'Document bestaat al',
    'resource-exhausted': 'Te veel verzoeken. Probeer later opnieuw',
    'failed-precondition': 'Voorwaarde niet voldaan',
    'aborted': 'Actie afgebroken',
    'out-of-range': 'Waarde buiten bereik',
    'unimplemented': 'Functie niet beschikbaar',
    'internal': 'Interne fout',
    'unavailable': 'Service tijdelijk niet beschikbaar',
    'data-loss': 'Gegevensverlies gedetecteerd',
    'unauthenticated': 'Niet ingelogd. Log in en probeer opnieuw',
    'default': 'Database fout. Probeer het opnieuw'
  };

  return errorMessages[errorCode] || errorMessages['default'];
};

// Storage error handler
export const getStorageErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    'storage/unknown': 'Onbekende fout bij upload',
    'storage/object-not-found': 'Bestand niet gevonden',
    'storage/bucket-not-found': 'Storage niet gevonden',
    'storage/project-not-found': 'Project niet gevonden',
    'storage/quota-exceeded': 'Opslaglimiet bereikt',
    'storage/unauthenticated': 'Niet ingelogd voor upload',
    'storage/unauthorized': 'Geen toestemming om te uploaden',
    'storage/retry-limit-exceeded': 'Upload mislukt na meerdere pogingen',
    'storage/invalid-checksum': 'Bestandsintegriteit check mislukt',
    'storage/canceled': 'Upload geannuleerd',
    'storage/invalid-event-name': 'Ongeldige event naam',
    'storage/invalid-url': 'Ongeldige URL',
    'storage/invalid-argument': 'Ongeldig argument',
    'storage/no-default-bucket': 'Geen standaard storage bucket',
    'storage/cannot-slice-blob': 'Kan bestand niet verwerken',
    'storage/server-file-wrong-size': 'Bestandsgrootte komt niet overeen',
    'default': 'Upload fout. Probeer het opnieuw'
  };

  return errorMessages[errorCode] || errorMessages['default'];
};

// General error handler
export const handleFirebaseError = (error: any, type: 'auth' | 'firestore' | 'storage' = 'auth'): string => {
  if (!error) return 'Er is iets misgegaan';

  const errorCode = error?.code || '';

  switch (type) {
    case 'auth':
      return getAuthErrorMessage(errorCode);
    case 'firestore':
      return getFirestoreErrorMessage(errorCode);
    case 'storage':
      return getStorageErrorMessage(errorCode);
    default:
      return 'Er is iets misgegaan. Probeer het opnieuw';
  }
};

