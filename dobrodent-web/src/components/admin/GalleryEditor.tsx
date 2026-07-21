"use client";

import { useState } from "react";
import { GalleryImage } from "@/data/defaultGallery";
import { uploadImage } from "@/lib/contentService";
import { Plus, Trash2, Save, CheckCircle2, RefreshCw, Upload, ArrowLeft, ArrowRight } from "lucide-react";
import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";

interface GalleryEditorProps {
  images: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
  onSave: (images: GalleryImage[]) => Promise<boolean>;
}

export default function GalleryEditor({ images, onChange, onSave }: GalleryEditorProps) {
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

    onChange([...newUploaded, ...images]);
    setIsUploading(false);
  };

  const moveImage = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    onChange(updated);
  };

  const updateTitle = (id: string, title: string) => {
    onChange(
      images.map((img) => (img.id === id ? { ...img, title } : img))
    );
  };

  const removeImage = (id: string) => {
    if (confirm("Ви дійсно хочете видалити це зображення?")) {
      onChange(images.filter((img) => img.id !== id));
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
          <p className="text-xs text-muted-foreground">Завантажуйте нові фото клініки, підписуйте їх та регулюйте порядок показу</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
            id="gallery-bulk-upload"
          />
          <label
            htmlFor="gallery-bulk-upload"
            className="inline-flex items-center gap-2 px-4 py-2 border border-primary/20 text-primary hover:bg-primary/5 text-sm font-semibold rounded-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
          >
            {isUploading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {isUploading ? "Завантаження..." : "Завантажити фото"}
          </label>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : saveSuccess ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saveSuccess ? "Збережено!" : "Зберегти зміни"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div key={img.id} className="bg-background rounded-2xl border border-border p-4 shadow-sm flex flex-col space-y-3 hover:border-primary/20 transition-colors">
            {/* Image Preview */}
            <div className="aspect-[4/3] w-full rounded-xl bg-muted overflow-hidden border border-border relative">
              <ImageWithPlaceholder
                src={img.url}
                alt={img.title || "Фото клініки"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title Input */}
            <input
              type="text"
              value={img.title || ""}
              onChange={(e) => updateTitle(img.id, e.target.value)}
              placeholder="Підпис до фото"
              className="w-full px-3 py-2 bg-muted/40 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />

            {/* Bottom Actions */}
            <div className="flex items-center justify-between border-t border-border pt-3">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveImage(index, -1)}
                  disabled={index === 0}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-all"
                  title="Перемістити ліворуч"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveImage(index, 1)}
                  disabled={index === images.length - 1}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-all"
                  title="Перемістити праворуч"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => removeImage(img.id)}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-1.5 rounded-lg cursor-pointer transition-all"
                title="Видалити зображення"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
