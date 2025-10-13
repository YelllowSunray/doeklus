# Firebase Setup Guide voor Doeklus

## 🔥 Firebase Console Setup

### 1. Create Firebase Project
1. Ga naar [Firebase Console](https://console.firebase.google.com/)
2. Klik op "Add project" of "Create a project"
3. Project naam: `doeklus`
4. Enable Google Analytics (optioneel)
5. Klik op "Create project"

### 2. Enable Authentication

#### Email/Password Authentication
1. In Firebase Console, ga naar **Authentication**
2. Klik op **Get started**
3. Ga naar **Sign-in method** tab
4. Klik op **Email/Password**
5. Enable **Email/Password**
6. Klik op **Save**

#### Google Authentication
1. Blijf in **Authentication** > **Sign-in method**
2. Klik op **Google**
3. Enable **Google Sign-In**
4. Kies een **Project support email** (je eigen email)
5. Klik op **Save**

### 3. Create Web App
1. In Firebase Console, ga naar **Project settings** (tandwiel icoon)
2. Scroll naar beneden naar "Your apps"
3. Klik op het **</>** (Web) icoon
4. App nickname: `Doeklus Web`
5. ✅ Check **"Also set up Firebase Hosting"** (optioneel)
6. Klik op **Register app**
7. **Kopieer de Firebase config** (dit heb je al in `.env.local`)

### 4. Setup Firestore Database
1. In Firebase Console, ga naar **Firestore Database**
2. Klik op **Create database**
3. Kies **Production mode** (of Test mode voor development)
4. Kies een **Cloud Firestore location** (bijv. `europe-west3`)
5. Klik op **Enable**

#### Firestore Security Rules (Production)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update, delete: if request.auth != null && request.auth.uid == userId;
    }
    
    // Klussers collection
    match /klussers/{klusserId} {
      allow read: if true; // Public profiles
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Tasks collection
    match /tasks/{taskId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         resource.data.klusserId == request.auth.uid);
      allow delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    // Reviews collection
    match /reviews/{reviewId} {
      allow read: if true; // Public reviews
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    // Bookings collection
    match /bookings/{bookingId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         resource.data.klusserId == request.auth.uid);
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         resource.data.klusserId == request.auth.uid);
    }
  }
}
```

### 5. Setup Cloud Storage
1. In Firebase Console, ga naar **Storage**
2. Klik op **Get started**
3. Kies **Production mode** (of Test mode voor development)
4. Kies een **location** (bijv. `europe-west3`)
5. Klik op **Done**

**LET OP:** Zorg dat je de Storage Security Rules hieronder toepast, anders krijg je 403 errors bij foto uploads!

#### Storage Security Rules (Production)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // User profile photos
    match /users/{userId}/{allPaths=**} {
      allow read: if true; // Public profile photos
      allow write: if request.auth != null && 
        request.auth.uid == userId && // Only own profile
        request.resource.size < 5 * 1024 * 1024 && // 5MB limit
        request.resource.contentType.matches('image/.*'); // Only images
    }
    
    // Tasks images
    match /tasks/{taskId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.resource.size < 5 * 1024 * 1024 && // 5MB limit
        request.resource.contentType.matches('image/.*');
    }
    
    // Klusser profiles
    match /klussers/{klusserId}/{allPaths=**} {
      allow read: if true; // Public profiles
      allow write: if request.auth != null && 
        request.resource.size < 5 * 1024 * 1024 && // 5MB limit
        request.resource.contentType.matches('image/.*');
    }
  }
}
```

### 6. Setup Firestore Indexes (VEREIST!)
Deze indexes zijn nodig voor de queries in de app. Zonder deze krijg je errors.

**BELANGRIJK:** Klik op de link in de error message om automatisch de index aan te maken, of volg onderstaande stappen:

1. Ga naar **Firestore** > **Indexes**
2. Klik op **Create Index**

#### Tasks Index 1 (Voor klusser dashboard - open tasks)
- Collection: `tasks`
- Fields:
  - `status` (Ascending)
  - `createdAt` (Descending)
- Query scope: `Collection`

**OF gebruik deze link (vervang met je eigen link uit de error):**
https://console.firebase.google.com/v1/r/project/doeklus/firestore/indexes?create_composite=...

#### Tasks Index 2 (Voor customer - my tasks)
- Collection: `tasks`
- Fields:
  - `userId` (Ascending)
  - `createdAt` (Descending)
- Query scope: `Collection`

#### Klussers Index (Optioneel)
- Collection: `klussers`
- Fields: 
  - `city` (Ascending)
  - `rating` (Descending)
- Query scope: `Collection`

#### Reviews Index (Optioneel)
- Collection: `reviews`
- Fields:
  - `klusserId` (Ascending)
  - `createdAt` (Descending)
- Query scope: `Collection`

**Indexes duren 2-5 minuten om te builden. Wacht tot ze klaar zijn voordat je de query's gebruikt!**

## 🔐 Google Sign-In Extra Setup

### Voor Development (localhost)
Google Sign-In werkt out-of-the-box op localhost!

### Voor Production
1. In Firebase Console, ga naar **Authentication** > **Settings**
2. Scroll naar **Authorized domains**
3. Klik op **Add domain**
4. Voeg je productie domain toe (bijv. `doeklus.nl`)

### OAuth Consent Screen (als je errors krijgt)
1. Ga naar [Google Cloud Console](https://console.cloud.google.com/)
2. Selecteer je Firebase project
3. Ga naar **APIs & Services** > **OAuth consent screen**
4. Kies **External** user type
5. Vul de vereiste velden in:
   - App name: `Doeklus`
   - User support email: je email
   - Developer contact: je email
6. Klik op **Save and Continue**
7. Skip Scopes (of add email en profile)
8. Add test users als je in development bent
9. Klik op **Save and Continue**

## 📱 Email Verification (Optioneel)
Als je email verificatie wilt toevoegen:

1. In Firebase Console, ga naar **Authentication** > **Templates**
2. Kies **Email address verification**
3. Customize de template
4. Klik op **Save**

In je code:
```typescript
import { sendEmailVerification } from 'firebase/auth';

// Na signup
const user = await signUp(email, password, name);
await sendEmailVerification(user);
```

## 🌍 Firestore Database Structure

### Collections Schema

#### `users`
```
{
  uid: string (doc ID = auth uid)
  email: string
  displayName: string
  photoURL: string | null
  role: 'customer' | 'klusser' | 'admin'
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

#### `klussers`
```
{
  id: string (auto-generated)
  userId: string (ref naar users)
  name: string
  bio: string
  city: string
  services: string[]
  hourlyRate: number
  rating: number
  reviewCount: number
  completedJobs: number
  verified: boolean
  photoURL: string | null
  portfolioImages: string[]
  availability: {
    day: string
    available: boolean
    hours: string
  }[]
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

#### `tasks`
```
{
  id: string (auto-generated)
  userId: string
  klusserId: string | null
  title: string
  description: string
  service: string
  location: {
    address: string
    postcode: string
    city: string
  }
  scheduledDate: Timestamp
  scheduledTime: string
  budget: {
    min: number
    max: number
  }
  images: string[]
  status: 'open' | 'assigned' | 'in-progress' | 'completed' | 'cancelled'
  offers: Offer[]
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

#### `reviews`
```
{
  id: string (auto-generated)
  taskId: string
  klusserId: string
  userId: string
  userName: string
  rating: number (1-5)
  comment: string
  service: string
  createdAt: Timestamp
}
```

#### `bookings`
```
{
  id: string (auto-generated)
  taskId: string
  userId: string
  klusserId: string
  price: number
  scheduledDate: Timestamp
  status: 'confirmed' | 'completed' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

## 🧪 Testing

### Test Google Sign-In
1. Start je dev server: `npm run dev`
2. Ga naar `http://localhost:3000/aanmelden`
3. Klik op "Doorgaan met Google"
4. Kies je Google account
5. Je wordt doorgestuurd naar `/dashboard`

### Test Email/Password
1. Ga naar `http://localhost:3000/aanmelden`
2. Vul je gegevens in
3. Klik op "Account aanmaken"
4. Check Firebase Console > Authentication of je user is aangemaakt

## 🚨 Troubleshooting

### "Firebase: Error (auth/unauthorized-domain)"
- Ga naar Firebase Console > Authentication > Settings
- Voeg je domain toe aan Authorized domains

### "Firebase: Error (auth/popup-blocked)"
- Check of popup blocker uit staat
- Probeer signInWithRedirect i.p.v. signInWithPopup

### "Firebase: Error (auth/operation-not-allowed)"
- Enable Email/Password en/of Google in Firebase Console > Authentication

### Google Sign-In doet niks
- Check of Firebase config correct is in `.env.local`
- Ververs de pagina en probeer opnieuw
- Check browser console voor errors

## ✅ Checklist
- [ ] Firebase project aangemaakt
- [ ] Email/Password authentication enabled
- [ ] Google authentication enabled
- [ ] Firestore database aangemaakt
- [ ] Firestore security rules ingesteld
- [ ] Cloud Storage aangemaakt
- [ ] Storage security rules ingesteld
- [ ] Firebase config in `.env.local`
- [ ] Google Sign-In getest
- [ ] Email/Password getest

## 📚 Nuttige Links
- [Firebase Docs](https://firebase.google.com/docs)
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Firestore Docs](https://firebase.google.com/docs/firestore)
- [Firebase Console](https://console.firebase.google.com/)

