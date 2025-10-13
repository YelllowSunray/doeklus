# 🔨 Doeklus - Direct klussen regelen

Een modern platform voor het vinden en boeken van klussers in Nederland. Gebouwd met Next.js 15, Firebase, en TypeScript.

## ⚠️ BELANGRIJK: Eerste Setup

**Voordat je de app kunt runnen, moet je Firebase configureren!**

👉 **Zie [ENV_SETUP.md](ENV_SETUP.md) voor de complete setup guide (5 minuten)**

Zonder `.env.local` bestand krijg je deze error:
```
auth/invalid-api-key
```

## ✨ Features

- 🔐 **Authenticatie** - Firebase Auth met email/password en Google login
- 👥 **Klusser profielen** - Uitgebreide profielen met reviews en portfolio's
- 📝 **Klus plaatsen** - Eenvoudig klussen plaatsen en aanbiedingen ontvangen
- 💰 **Prijscalculator** - Bereken kosten vooraf
- ⭐ **Reviews** - Beoordelingen en ratings systeem
- 🔍 **Zoeken & Filteren** - Vind de perfecte klusser
- 📱 **Responsive** - Modern design dat overal werkt

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Language**: TypeScript
- **Font**: Geist Sans & Geist Mono

## 📦 Installatie

### 🚨 **Vereist: Firebase Setup**

**Dit project werkt NIET zonder Firebase configuratie!**

### Stap 1: Dependencies installeren

```bash
git clone <your-repo-url>
cd doeklus
npm install
```

### Stap 2: Firebase Setup (VERPLICHT!)

**📖 Volg deze guide:** [ENV_SETUP.md](ENV_SETUP.md)

In het kort:
1. ✅ Maak Firebase project aan
2. ✅ Kopieer credentials
3. ✅ Maak `.env.local` bestand aan in root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=doeklus.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=doeklus
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=doeklus.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABC123
```

4. ✅ Enable Authentication (Email + Google)
5. ✅ Create Firestore Database
6. ✅ Setup Security Rules

### Stap 3: Run de app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### ⚠️ Troubleshooting

**Error: `auth/invalid-api-key`**
→ Je mist `.env.local` of hebt ongeldige credentials

**Error: `index required`**  
→ Klik op de link in de error - Firebase maakt automatisch de index aan

**Error: `permission-denied`**
→ Update Firestore security rules (zie ENV_SETUP.md)

## 🗂️ Project Structuur

```
doeklus/
├── src/
│   ├── app/              # Next.js App Router pagina's
│   │   ├── diensten/     # Service pagina's
│   │   ├── klus-plaatsen/# Klus plaatsen flow
│   │   ├── word-klusser/ # Klusser aanmelden
│   │   └── ...
│   ├── lib/              # Utilities & configuratie
│   │   ├── firebase/     # Firebase setup
│   │   │   ├── config.ts
│   │   │   ├── auth.ts
│   │   │   ├── firestore.ts
│   │   │   └── storage.ts
│   │   ├── context/      # React Context
│   │   └── types/        # TypeScript types
│   └── components/       # Herbruikbare components (toekomstig)
├── public/               # Statische assets
├── .env.local           # Environment variabelen (niet in git)
└── .env.example         # Example env bestand
```

## 🔥 Firebase Setup

### Collections Schema

#### `users`
```typescript
{
  id: string;
  email: string;
  displayName: string;
  role: 'customer' | 'klusser' | 'admin';
  createdAt: Timestamp;
}
```

#### `klussers`
```typescript
{
  id: string;
  userId: string;
  name: string;
  bio: string;
  city: string;
  services: string[];
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  verified: boolean;
}
```

#### `tasks`
```typescript
{
  id: string;
  userId: string;
  title: string;
  description: string;
  service: string;
  location: { address, postcode, city };
  scheduledDate: Timestamp;
  status: 'open' | 'assigned' | 'completed';
  offers: Offer[];
}
```

#### `reviews`
```typescript
{
  id: string;
  taskId: string;
  klusserId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Timestamp;
}
```

### Storage Structure
```
storage/
├── klussers/
│   └── {klusserId}/
│       ├── profile/
│       └── portfolio/
└── tasks/
    └── {taskId}/
        └── images/
```

## 🎨 Design System

### Kleuren
- **Primary**: `#ff4d00` (Oranje)
- **Secondary**: `#0066ff` (Blauw)
- **Accent**: `#ffd900` (Geel)
- **Success**: `#00cc66` (Groen)

### Typography
- **Headings**: Font-black (900)
- **Body**: Font-normal (400)
- **Buttons**: Font-semibold (600)

## 📚 Firebase Hulpfuncties

### Auth
```typescript
import { signUp, signIn, signOut, signInWithGoogle } from '@/lib/firebase/auth';

// Email/Password signup
await signUp('email@example.com', 'password', 'Naam');

// Email/Password login
await signIn('email@example.com', 'password');

// Google login
await signInWithGoogle();

// Logout
await signOut();
```

### Firestore
```typescript
import { createDocument, getDocument, queryDocuments } from '@/lib/firebase/firestore';

// Create
await createDocument('tasks', { title: 'Klus', ... });

// Read
const task = await getDocument('tasks', 'taskId');

// Query
const klussers = await getKlussers({ city: 'Amsterdam' });
```

### Storage
```typescript
import { uploadFile, uploadTaskImages } from '@/lib/firebase/storage';

// Upload single file
const url = await uploadFile(file, 'path/to/file');

// Upload task images
const urls = await uploadTaskImages('taskId', files);
```

## 🔐 Auth Context

Gebruik de `useAuth` hook in je components:

```typescript
import { useAuth } from '@/lib/context/AuthContext';

function Component() {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;
  
  return <div>Welcome {user.displayName}</div>;
}
```

## 🚧 Development

### Turbopack
Dit project gebruikt Next.js Turbopack voor snellere builds:
```bash
npm run dev    # Development met Turbopack
npm run build  # Production build met Turbopack
```

### Linting
```bash
npm run lint
```

## 📝 To Do

- [ ] Implement authentication pages (login/signup)
- [ ] Add payment integration (Stripe/Mollie)
- [ ] Build klusser dashboard
- [ ] Add real-time chat functionality
- [ ] Implement notification system
- [ ] Add admin panel
- [ ] Create mobile app (React Native)

## 🤝 Contributing

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je changes (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📄 License

Dit project is gelicenseerd onder de MIT License.

## 📞 Contact

Doeklus - [@doeklus](https://twitter.com/doeklus)

Project Link: [https://github.com/yourusername/doeklus](https://github.com/yourusername/doeklus)

---

Gemaakt met ❤️ in Nederland 🇳🇱
