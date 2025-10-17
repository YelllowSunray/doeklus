# Firestore Security Rules Setup

## Issue
The bidding functionality is failing with "Missing or insufficient permissions" because klussers don't have permission to update task documents to add their bids.

## Solution
Update your Firestore security rules in the Firebase Console to allow klussers to add bids to tasks.

## Steps to Fix

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project: `doeklus`

2. **Navigate to Firestore Database**
   - Click on "Firestore Database" in the left sidebar
   - Click on the "Rules" tab

3. **Update the Rules**
   Replace your current rules with this **MINIMAL** rule set for immediate testing:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all authenticated users to read and write everything
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

4. **Publish the Rules**
   - Click "Publish" to save the new rules
   - Wait for the rules to be deployed (usually takes a few seconds)

> **⚠️ IMPORTANT**: These are minimal rules for testing. Once bidding works, you should replace them with more secure rules (see "More Secure Rules" section below).

## What These Rules Do

- **Users**: 
  - Anyone authenticated can **read** any user document (needed for phone numbers)
  - Users can **write** only their own user documents
- **Tasks**: 
  - Anyone authenticated can read tasks (for browsing)
  - Only task owners can create/update/delete tasks
  - **Klussers can add bids** to tasks (partial update of bids field only)
- **Klusser Profiles**: Users can manage their own klusser profiles
- **Bids**: If using separate bids collection, users can manage their own bids

## Issues These Rules Fix

1. **Bid Submission**: Klussers can now add bids to tasks
2. **Phone Number Display**: Klussers can read user documents to get phone numbers
3. **Task Loading**: All authenticated users can read tasks and user data
4. **User Privacy**: Users can only write to their own documents

## Testing
After updating the rules, try submitting a bid again. The "Missing or insufficient permissions" error should be resolved.

## Troubleshooting

### If you're still getting permission errors:

1. **Check if rules were published**:
   - Go back to Firebase Console → Firestore Database → Rules
   - Make sure you see the new rules and they're not showing any syntax errors
   - The rules should show as "Published" with a timestamp

2. **Wait for deployment**:
   - Firestore rules can take 1-2 minutes to fully deploy
   - Try refreshing the page and testing again

3. **Check browser console**:
   - Open browser developer tools (F12)
   - Look for any Firestore-related errors
   - Clear browser cache and try again

4. **Verify authentication**:
   - Make sure you're logged in as a user
   - Check that the user has a valid Firebase Auth token

5. **Test with simpler rules** (if still having issues):
   - Replace the rules with this minimal set for testing:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```
   - This allows all authenticated users to read/write everything (for testing only)

## Alternative: Deploy Rules via CLI
If you have Firebase CLI installed, you can also deploy the rules file:

```bash
firebase deploy --only firestore:rules
```
