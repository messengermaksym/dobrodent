import { defaultPrices, PriceCategory } from "@/data/defaultPrices";
import { defaultSpecialists, Specialist } from "@/data/defaultSpecialists";
import { defaultGalleryImages, GalleryImage } from "@/data/defaultGallery";
import staticPrices from "@/content/prices.json";
import staticSpecialists from "@/content/specialists.json";
import staticGallery from "@/content/gallery.json";

// ---------------- PRICES ----------------
export async function fetchPrices(): Promise<PriceCategory[]> {
  return staticPrices as PriceCategory[];
}

export async function savePrices(categories: PriceCategory[]): Promise<boolean> {
  return true;
}

// ---------------- SPECIALISTS ----------------
export async function fetchSpecialists(): Promise<Specialist[]> {
  return staticSpecialists as Specialist[];
}

export async function saveSpecialists(specialists: Specialist[]): Promise<boolean> {
  return true;
}

// ---------------- GALLERY ----------------
export async function fetchGallery(): Promise<GalleryImage[]> {
  return staticGallery as GalleryImage[];
}

export async function saveGallery(images: GalleryImage[]): Promise<boolean> {
  return true;
}

// ---------------- FAST & OPTIMIZED IMAGE UPLOAD ----------------
export async function uploadImage(file: File, folder: string = "uploads"): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          // Convert to compressed WebP Data URL (~40-80KB)
          const dataUrl = canvas.toDataURL("image/webp", 0.85);
          resolve(dataUrl);
        } catch (err) {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => {
        resolve(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
