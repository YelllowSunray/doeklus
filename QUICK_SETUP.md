# 🚀 Quick Setup Guide - Doeklus

## Firestore Index Error Fix

Je ziet deze error omdat Firestore composite indexes nodig zijn voor complexe queries.

### ⚡ Snelste Oplossing (1 klik):

**Klik op de link in de error message:**
```
https://console.firebase.google.com/v1/r/project/doeklus/firestore/indexes?create_composite=...
```

Dit opent Firebase Console en maakt automatisch de juiste index aan!

### 📋 Of Handmatig:

1. Ga naar [Firebase Console](https://console.firebase.google.com/)
2. Selecteer project: **doeklus**
3. Klik op **Firestore Database** in het menu
4. Klik op **Indexes** tab (bovenaan)
5. Klik op **Create Index**

**Maak deze index aan:**
- Collection ID: `tasks`
- Fields to index:
  - `status` → Ascending
  - `createdAt` → Descending
- Query scope: `Collection`
- Klik **Create**

**Wacht 2-5 minuten** tot de index status "Enabled" is!

### 🔄 Na Index Aanmaken:

1. Refresh de pagina (`F5`)
2. De klusser dashboard laadt nu correct
3. Beschikbare klussen worden getoond

### 📊 Welke Indexes Je Nodig Hebt:

| Index | Collection | Fields | Waarom |
|-------|-----------|---------|--------|
| **Tasks by Status** | `tasks` | `status` (ASC), `createdAt` (DESC) | Klusser dashboard - open tasks |
| **My Tasks** | `tasks` | `userId` (ASC), `createdAt` (DESC) | Customer - mijn klussen |

### ⚠️ Troubleshooting:

**Error blijft?**
- Check of index status "Enabled" is (niet "Building")
- Wacht tot alle indexes klaar zijn
- Hard refresh: `Ctrl+Shift+R`

**Nog steeds errors?**
- Klik op de specifieke link in elke error message
- Firebase maakt automatisch de juiste index aan
- Elke query kan een andere index nodig hebben

### ✨ Eenmalige Setup:

Dit hoef je maar **1 keer** te doen. Daarna werken alle queries permanent!

---

**Pro tip:** Als je een nieuwe query toevoegt en een index error krijgt, klik gewoon op de link in de error. Firebase doet de rest! 🎯

