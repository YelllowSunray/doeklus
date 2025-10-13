import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll
} from 'firebase/storage';
import { storage } from './config';

// Upload file
export const uploadFile = async (file: File, path: string) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Upload multiple files
export const uploadFiles = async (files: File[], basePath: string) => {
  try {
    const uploadPromises = files.map((file, index) => {
      const path = `${basePath}/${Date.now()}_${index}_${file.name}`;
      return uploadFile(file, path);
    });
    
    return await Promise.all(uploadPromises);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Delete file
export const deleteFile = async (path: string) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get all files in a folder
export const getFilesInFolder = async (folderPath: string) => {
  try {
    const folderRef = ref(storage, folderPath);
    const result = await listAll(folderRef);
    
    const urls = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return { path: itemRef.fullPath, url };
      })
    );
    
    return urls;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Upload task images
export const uploadTaskImages = async (taskId: string, files: File[]) => {
  return uploadFiles(files, `tasks/${taskId}/images`);
};

// Upload klusser profile image
export const uploadKlusserProfileImage = async (klusserId: string, file: File) => {
  return uploadFile(file, `klussers/${klusserId}/profile`);
};

// Upload klusser portfolio images
export const uploadKlusserPortfolio = async (klusserId: string, files: File[]) => {
  return uploadFiles(files, `klussers/${klusserId}/portfolio`);
};

