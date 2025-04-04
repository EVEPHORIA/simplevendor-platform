
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";

// Generic type for document data
export interface FirestoreDocument {
  id: string;
  [key: string]: any;
}

// Add a document to a collection
export const addDocument = async <T extends Record<string, any>>(
  collectionName: string, 
  data: T
) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

// Get a document by ID
export const getDocument = async <T extends FirestoreDocument>(
  collectionName: string, 
  docId: string
): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
};

// Update a document
export const updateDocument = async <T extends Record<string, any>>(
  collectionName: string, 
  docId: string, 
  data: Partial<T>
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { id: docId, ...data };
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

// Delete a document
export const deleteDocument = async (
  collectionName: string, 
  docId: string
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

// Get all documents from a collection
export const getAllDocuments = async <T extends FirestoreDocument>(
  collectionName: string
): Promise<T[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
};

// Query documents from a collection
export const queryDocuments = async <T extends FirestoreDocument>(
  collectionName: string,
  field: string,
  operator: "==" | "<" | "<=" | ">" | ">=",
  value: any
): Promise<T[]> => {
  try {
    const q = query(
      collection(db, collectionName),
      where(field, operator, value)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  } catch (error) {
    console.error("Error querying documents:", error);
    throw error;
  }
};
