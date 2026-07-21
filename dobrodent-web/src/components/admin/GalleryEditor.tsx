"use client";

import { useState } from "react";
import { GalleryImage } from "@/data/defaultGallery";
import { uploadImage } from "@/lib/contentService";
import { Plus, Trash2, Save, CheckCircle2, RefreshCw, Upload, ArrowLeft, ArrowRight } from "lucide-react";
import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";

interface GalleryEditorProps {
  initialImages: GalleryImage[];
  onSave: (images: GalleryImage[]) => Promise<boolean>;
}

export default function GalleryEditor({ initialImages, onSave }: GalleryEditorProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Prepend new uploaded images to top
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newUploaded: GalleryImage[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const file = files[i];
        const url = await uploadImage(file, "gallery");
        newUploaded.push({
          id: `img-${Date.now()}-${i}`,
          url,
          title: file.name.replace(/\.[^/.]+$/, ""),
        });
      } catch (e) {
        console.error("Upload error", e);
      }
    }

    setImages((prev) => [...newUploaded, ...prev]);
    setIsUploading(false);
  };

  const moveImage = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setImages(updated);
  };

  const updateTitle = (id: string, title: string) => {
    setImages(images.map((img) => (img.id === id ? { ...img, title } : img)));
  };

  const removeImage = (id: string) => {
    if (confirm("Видалити це фото з галереї?")) {
      setImages(images.filter((img) => img.id !== id));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    const ok = await onSave(images);
    setIsSaving(false);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/40 p-4 rounded-xl border border-border">
        <div>
          <h2 className="text-lg font-bold text-foreground">Редагування Фотогалереї</h2>
          <p className="text-xs text-muted-foreground">Завантажуйте нові фотографії, міняйте їх порядок та підписи</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground text-sm font-semibold rounded-xl hover:bg-secondary/80 hover:scale-[1.02] active:scale-[0.98] cursor-pointer transition-all duration-150 shadow-sm">
            <Upload className="w-4 h-4" />
            {isUploading ? "Завантаження..." : "Завантажити фото"}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
              disabled={isUploading}
            />
          </label>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] cursor-pointer transition-all duration-150 shadow-sm disabled:opacity-50"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : saveSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-green-300" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saveSuccess ? "Збережено!" : "Зберегти зміни"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, imgIndex) => (
          <div key={img.id} className="bg-background rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col group relative hover:border-primary/30 transition-colors">
            {/* Top Toolbar: Move & Delete */}
            <div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-1 bg-background/90 backdrop-blur-md p-1 rounded-xl shadow-md pointer-events-auto">
                <button
                  onClick={() => moveImage(imgIndex, -1)}
                  disabled={imgIndex === 0}
                  className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-all"
                  title="Перемістити ліворуч"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveImage(imgIndex, 1)}
                  disabled={imgIndex === images.length - 1}
                  className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-all"
                  title="Перемістити праворуч"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => removeImage(img.id)}
                className="bg-background/90 backdrop-blur-md text-destructive hover:bg-destructive hover:text-white p-1.5 rounded-xl cursor-pointer transition-all shadow-md pointer-events-auto"
                title="Видалити фото"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-[4/3] bg-muted relative overflow-hidden">
              <ImageWithPlaceholder
                src={img.url}
                alt={img.title || "Фото клініки"}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-3">
              <input
                type="text"
                value={img.title || ""}
                onChange={(e) => updateTitle(img.id, e.target.value)}
                placeholder="Підпис до фото (необов'язково)"
                className="w-full px-3 py-1.5 bg-muted/30 border border-border rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-text"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
