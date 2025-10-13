import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  WhereFilterOp,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { db } from './config';

// Generic CRUD operations
export const createDocument = async (collectionName: string, data: any, customId?: string) => {
  try {
    if (customId) {
      // Use setDoc for documents with custom IDs (like user documents)
      const docRef = doc(db, collectionName, customId);
      await setDoc(docRef, {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return customId;
    } else {
      // Use addDoc for auto-generated IDs
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getDocument = async (collectionName: string, id: string) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Set or update document (creates if doesn't exist, updates if exists)
export const setOrUpdateDocument = async (collectionName: string, id: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Document exists, update it
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      });
    } else {
      // Document doesn't exist, create it
      await setDoc(docRef, {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteDocument = async (collectionName: string, id: string) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Query documents
export const queryDocuments = async (
  collectionName: string,
  constraints: QueryConstraint[] = []
) => {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Collection-specific helpers
export const getKlussers = async (filters?: { city?: string; service?: string }) => {
  const constraints: QueryConstraint[] = [orderBy('rating', 'desc')];
  
  if (filters?.city) {
    constraints.push(where('city', '==', filters.city));
  }
  
  if (filters?.service) {
    constraints.push(where('services', 'array-contains', filters.service));
  }
  
  return queryDocuments('klussers', constraints);
};

export const getTasks = async (userId?: string, status?: string) => {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
  
  if (userId) {
    constraints.push(where('userId', '==', userId));
  }
  
  if (status) {
    constraints.push(where('status', '==', status));
  }
  
  return queryDocuments('tasks', constraints);
};

export const getReviews = async (klusserId: string) => {
  const constraints: QueryConstraint[] = [
    where('klusserId', '==', klusserId),
    orderBy('createdAt', 'desc')
  ];
  
  return queryDocuments('reviews', constraints);
};

