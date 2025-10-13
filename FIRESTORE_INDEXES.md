# 🔥 Firestore Indexes - Complete Setup Guide

## Required Indexes for Doeklus

Firebase Firestore requires composite indexes for queries with multiple fields. Here are **all the indexes you need** to create.

---

## 🚨 Critical Indexes (App Won't Work Without These)

### 1. Tasks by Status (For Klusser Dashboard)
**Why:** Klussers need to see all open tasks ordered by newest first

- **Collection:** `tasks`
- **Fields:**
  1. `status` → **Ascending**
  2. `createdAt` → **Descending**
- **Query scope:** Collection

**Direct Link:**
https://console.firebase.google.com/v1/r/project/doeklus/firestore/indexes?create_composite=CkVwcm9qZWN0cy9kb2VrbHVzL2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy90YXNrcy9pbmRleGVzL18QARoKCgZzdGF0dXMQARoNCgljcmVhdGVkQXQQAhoMCghfX25hbWVfXxAC

---

### 2. My Tasks (For Customer Dashboard)
**Why:** Customers need to see their own tasks ordered by newest first

- **Collection:** `tasks`
- **Fields:**
  1. `userId` → **Ascending**
  2. `createdAt` → **Descending**
- **Query scope:** Collection

**How to create:**
1. Go to Firebase Console → Firestore → Indexes
2. Click "Create Index"
3. Collection ID: `tasks`
4. Add field: `userId` (Ascending)
5. Add field: `createdAt` (Descending)
6. Click "Create"

---

## 📋 How to Create Indexes

### Method 1: Click the Link (Easiest ⚡)
When you see the error in your app:
1. Look for the Firebase Console link in the error
2. Click it
3. Click "Create Index"
4. Done!

### Method 2: Manual Creation
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **doeklus**
3. Click **Firestore Database** in left menu
4. Click **Indexes** tab at the top
5. Click **Create Index** button
6. Fill in the details from above
7. Click **Create**

---

## ⏱️ Index Build Time

- Small databases: **30 seconds - 2 minutes**
- Medium databases: **2-5 minutes**
- Large databases: **5-15 minutes**

**Status indicators:**
- 🟡 **Building** - Wait, don't use the query yet
- 🟢 **Enabled** - Ready to use!
- 🔴 **Error** - Check your settings

---

## 🔍 Current Index Status

You can check your indexes here:
https://console.firebase.google.com/project/doeklus/firestore/indexes

---

## 📝 Full Index List for Doeklus

### Required Now:
- ✅ Tasks by status + createdAt (klusser dashboard)
- ✅ Tasks by userId + createdAt (customer my tasks)

### Optional (Add if you get errors):
- Reviews by klusserId + createdAt (for klusser profiles)
- Klussers by city + rating (for location-based search)
- Tasks by postcode + status (for location filtering)

---

## 🚀 Quick Commands

**View all indexes:**
```
Firebase Console → Firestore → Indexes tab
```

**Delete an index:**
Click the three dots (⋮) next to the index → Delete

**Clone an index:**
Click the three dots (⋮) next to the index → Duplicate

---

## ⚠️ Common Issues

### "The query requires an index"
**Solution:** Click the link in the error message, it creates the index automatically!

### "Index is building"
**Solution:** Wait 2-5 minutes, then refresh your app

### "Index failed to build"
**Solution:** 
1. Delete the failed index
2. Create it again
3. Make sure field names match exactly (case-sensitive!)

---

## 💡 Pro Tips

1. **Use the error links** - Firebase generates the exact index you need
2. **Wait for "Enabled"** - Don't use queries while index is building
3. **Check field names** - `createdAt` vs `created_at` matters!
4. **Ascending vs Descending** - Must match your query exactly

---

## 🎯 What Each Index Does

### Tasks by Status + CreatedAt
```typescript
// Klusser Dashboard Query
queryDocuments('tasks', [
  where('status', '==', 'open'),
  orderBy('createdAt', 'desc')
])
// Shows: All open tasks, newest first
```

### Tasks by UserId + CreatedAt
```typescript
// Customer My Tasks Query
queryDocuments('tasks', [
  where('userId', '==', user.uid),
  orderBy('createdAt', 'desc')
])
// Shows: User's own tasks, newest first
```

---

## ✅ Checklist

Before using the app, make sure:
- [ ] Index 1: `tasks` by `status` + `createdAt` (Enabled)
- [ ] Index 2: `tasks` by `userId` + `createdAt` (Enabled)
- [ ] Waited 2-5 minutes after creating
- [ ] Refreshed the app page

**Once enabled, indexes work forever!** You never have to touch them again. 🎉

