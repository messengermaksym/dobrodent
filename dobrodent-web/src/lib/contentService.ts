import { db, storage, isFirebaseConfigured } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { defaultPrices, PriceCategory } from "@/data/defaultPrices";
import { defaultSpecialists, Specialist } from "@/data/defaultSpecialists";
import { defaultGalleryImages, GalleryImage } from "@/data/defaultGallery";

const STORAGE_KEY_PRICES = "dobrodent_custom_prices";
const STORAGE_KEY_SPECIALISTS = "dobrodent_custom_specialists";
const STORAGE_KEY_GALLERY = "dobrodent_custom_gallery";

// ---------------- PRICES ----------------
export async function fetchPrices(): Promise<PriceCategory[]> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "content", "prices");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().categories) {
        return docSnap.data().categories as PriceCategory[];
      }
    } catch (e) {
      console.warn("Failed to fetch prices from Firestore, using fallback", e);
    }
  }

  // LocalStorage check (for local testing before DB keys added)
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY_PRICES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
  }

  return defaultPrices;
}

export async function savePrices(categories: PriceCategory[]): Promise<boolean> {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_PRICES, JSON.stringify(categories));
  }

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "content", "prices");
      await setDoc(docRef, { categories, updatedAt: new Date().toISOString() });
      return true;
    } catch (e) {
      console.error("Error saving prices to Firestore", e);
      return false;
    }
  }

  return true;
}

// ---------------- SPECIALISTS ----------------
export async function fetchSpecialists(): Promise<Specialist[]> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "content", "specialists");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().list) {
        return docSnap.data().list as Specialist[];
      }
    } catch (e) {
      console.warn("Failed to fetch specialists from Firestore, using fallback", e);
    }
  }

  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY_SPECIALISTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
  }

  return defaultSpecialists;
}

export async function saveSpecialists(list: Specialist[]): Promise<boolean> {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_SPECIALISTS, JSON.stringify(list));
  }

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "content", "specialists");
      await setDoc(docRef, { list, updatedAt: new Date().toISOString() });
      return true;
    } catch (e) {
      console.error("Error saving specialists to Firestore", e);
      return false;
    }
  }

  return true;
}

// ---------------- GALLERY ----------------
export async function fetchGallery(): Promise<GalleryImage[]> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "content", "gallery");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().images) {
        return docSnap.data().images as GalleryImage[];
      }
    } catch (e) {
      console.warn("Failed to fetch gallery from Firestore, using fallback", e);
    }
  }

  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY_GALLERY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
  }

  return defaultGalleryImages;
}

export async function saveGallery(images: GalleryImage[]): Promise<boolean> {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_GALLERY, JSON.stringify(images));
  }

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, "content", "gallery");
      await setDoc(docRef, { images, updatedAt: new Date().toISOString() });
      return true;
    } catch (e) {
      console.error("Error saving gallery to Firestore", e);
      return false;
    }
  }

  return true;
}

// ---------------- IMAGE UPLOAD ----------------
export async function uploadImage(file: File, folder: string = "uploads"): Promise<string> {
  if (isFirebaseConfigured && storage) {
    try {
      const filename = `${folder}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (e) {
      console.error("Error uploading to Firebase Storage", e);
    }
  }

  // Fallback to data URL for offline / pre-firebase testing
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
