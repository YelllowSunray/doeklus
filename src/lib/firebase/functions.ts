// Firebase Cloud Functions helpers and triggers
// Note: These would normally run on Firebase Cloud Functions
// For now, we'll simulate with client-side checks

import { setOrUpdateDocument, getDocument } from './firestore';

/**
 * Auto-approve klusser after 1 minute
 * In production, this would be a Cloud Function with a scheduled trigger
 * For now, we check on user load
 */
export const checkAndAutoApproveKlusser = async (userId: string) => {
  try {
    const userDoc = await getDocument('users', userId);
    
    if (!userDoc) return;
    
    // Check if user is a klusser with pending status
    if (userDoc.role === 'klusser' && userDoc.klusserProfile?.status === 'pending') {
      const createdAt = userDoc.createdAt?.toDate?.() || new Date(userDoc.createdAt);
      const now = new Date();
      const oneMinuteInMs = 1 * 60 * 1000;
      
      // Check if 1 minute has passed
      const timePassed = now.getTime() - createdAt.getTime();
      
      if (timePassed >= oneMinuteInMs) {
        // Auto-approve the klusser
        await setOrUpdateDocument('users', userId, {
          klusserProfile: {
            ...userDoc.klusserProfile,
            status: 'approved',
            approvedAt: new Date().toISOString(),
            approvalMethod: 'auto'
          }
        });
        
        console.log(`Klusser ${userId} auto-approved after 1 minute`);
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error checking auto-approval:', error);
    return false;
  }
};

/**
 * Get time remaining until auto-approval (in milliseconds)
 */
export const getTimeUntilApproval = (createdAt: any): number => {
  const created = createdAt?.toDate?.() || new Date(createdAt);
  const now = new Date();
  const oneMinuteInMs = 1 * 60 * 1000;
  const timePassed = now.getTime() - created.getTime();
  const timeRemaining = oneMinuteInMs - timePassed;
  
  return Math.max(0, timeRemaining);
};

/**
 * Format milliseconds to readable time
 */
export const formatTimeRemaining = (ms: number): string => {
  if (ms <= 0) return 'Nu beschikbaar!';
  
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  
  if (minutes > 0) {
    return `${minutes} min ${seconds} sec`;
  }
  return `${seconds} sec`;
};

