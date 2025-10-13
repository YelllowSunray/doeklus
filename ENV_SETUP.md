# 🔐 Environment Variables Setup

## ⚠️ CRITICAL: Required Before Running

You **MUST** create a `.env.local` file with valid Firebase credentials before the app will work.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Name it: `doeklus` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click **"Create project"**

### Step 2: Get Firebase Credentials

1. In Firebase Console, click the **⚙️ gear icon** (Project Settings)
2. Scroll down to **"Your apps"** section
3. Click **`</>`** (Web app icon)
4. Register app with nickname: `Doeklus Web`
5. **Copy the config object** - you'll see something like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "doeklus.firebaseapp.com",
  projectId: "doeklus",
  storageBucket: "doeklus.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
  measurementId: "G-ABC123"
};
```

### Step 3: Create `.env.local` File

Create a file named `.env.local` in the **root directory** of the project with this content:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=doeklus.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=doeklus
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=doeklus.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABC123
```

**⚠️ Replace all values with YOUR actual Firebase credentials!**

### Step 4: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable **Email/Password**
5. Enable **Google** (choose a support email)
6. Click **Save**

### Step 5: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"**
4. Select location: **europe-west3** (or closest to you)
5. Click **"Enable"**

### Step 6: Update Security Rules

1. In Firestore Database, go to **"Rules"** tab
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if true; // Public profiles
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Tasks collection
    match /tasks/{taskId} {
      allow read: if true; // Anyone can see tasks
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.uid in resource.data.assignedKlussers);
    }
  }
}
```

3. Click **"Publish"**

### Step 7: Enable Storage

1. In Firebase Console, go to **Storage**
2. Click **"Get started"**
3. Choose **"Start in production mode"**
4. Use same location as Firestore
5. Click **"Done"**

### Step 8: Update Storage Rules

1. In Storage, go to **"Rules"** tab
2. Replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **"Publish"**

---

## ✅ Verify Setup

Run these commands:

```bash
npm install
npm run dev
```

If you see the error:
```
auth/invalid-api-key
```

→ Your `.env.local` file is missing or has invalid credentials!

---

## 🔒 Security Notes

- ✅ `.env.local` is in `.gitignore` - **never commit it!**
- ✅ All Firebase keys are safe to expose in client-side code
- ✅ Security is enforced by Firestore/Storage rules, not API keys
- ⚠️ Never share your `.env.local` file publicly

---

## 📋 Checklist

Before running the app, make sure you have:

- [ ] Created Firebase project
- [ ] Created `.env.local` file with valid credentials
- [ ] Enabled Email/Password authentication
- [ ] Enabled Google authentication
- [ ] Created Firestore database
- [ ] Updated Firestore security rules
- [ ] Enabled Storage
- [ ] Updated Storage security rules

---

## 🆘 Troubleshooting

### Error: `auth/invalid-api-key`
→ Check that `.env.local` exists and has the correct API key

### Error: `Firebase: Error (auth/configuration-not-found)`
→ Enable Email/Password and Google auth in Firebase Console

### Error: Missing or insufficient permissions
→ Update Firestore security rules as shown above

### Error: Index required
→ Click the link in the error message - Firebase will create it automatically

---

## 🎯 Next Steps

Once `.env.local` is configured:

1. Run `npm run dev`
2. Create a test account
3. Create the required Firestore indexes (see QUICK_SETUP.md)
4. Start using the app!

For detailed Firebase setup, see **FIREBASE_SETUP.md**

