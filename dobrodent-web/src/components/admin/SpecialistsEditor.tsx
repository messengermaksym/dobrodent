"use client";

import { useState } from "react";
import { Specialist } from "@/data/defaultSpecialists";
import { uploadImage } from "@/lib/contentService";
import { Plus, Trash2, Save, CheckCircle2, RefreshCw, Upload, ChevronUp, ChevronDown } from "lucide-react";
import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";

interface SpecialistsEditorProps {
  specialists: Specialist[];
  onChange: (list: Specialist[]) => void;
  onSave: (list: Specialist[]) => Promise<boolean>;
}

export default function SpecialistsEditor({ specialists, onChange, onSave }: SpecialistsEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  // Prepend new specialist so it appears at top immediately
  const addSpecialist = () => {
    const newSpec: Specialist = {
      id: `spec-${Date.now()}`,
      name: "ПІБ Нового Лікаря",
      role: "Лікар-стоматолог",
      specialties: ["Терапія"],
      education: "Освіта та досвід роботи...",
      category: "Вища категорія",
      image: "/doctor-placeholder.svg?v=2",
    };
    onChange([newSpec, ...specialists]);
  };

  const moveSpecialist = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= specialists.length) return;
    const updated = [...specialists];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    onChange(updated);
  };

  const updateSpecialist = (id: string, field: keyof Specialist, value: any) => {
    onChange(
      specialists.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const removeSpecialist = (id: string) => {
    if (confirm("Ви дійсно хочете видалити цього спеціаліста?")) {
      onChange(specialists.filter((s) => s.id !== id));
    }
  };

  const handlePhotoUpload = async (id: string, file: File) => {
    setUploadingId(id);
    try {
      const url = await uploadImage(file, "specialists");
      updateSpecialist(id, "image", url);
    } catch (e) {
      alert("Помилка завантаження фотографії");
    } finally {
      setUploadingId(null);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    const ok = await onSave(specialists);
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
          <h2 className="text-lg font-bold text-foreground">Редагування Спеціалістів</h2>
          <p className="text-xs text-muted-foreground">Керуйте списком лікарів, їхніми посадами, категоріями та світлинами</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={addSpecialist}
            className="px-4 py-2 border border-primary/20 text-primary hover:bg-primary/5 text-sm font-semibold rounded-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Додати лікаря
          </button>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {specialists.map((person, specIndex) => (
          <div key={person.id} className="bg-background rounded-2xl border border-border p-6 shadow-sm flex flex-col space-y-4 relative hover:border-primary/30 transition-colors">
            {/* Top Controls: Reordering & Delete */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveSpecialist(specIndex, -1)}
                  disabled={specIndex === 0}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-all"
                  title="Перемістити лікаря вище"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveSpecialist(specIndex, 1)}
                  disabled={specIndex === specialists.length - 1}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-all"
                  title="Перемістити лікаря нижче"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => removeSpecialist(person.id)}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-1.5 rounded-lg cursor-pointer transition-all"
                title="Видалити спеціаліста"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Preview & Upload */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-xl bg-muted overflow-hidden border border-border relative flex-shrink-0">
                <ImageWithPlaceholder
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2 flex-grow">
                <label className="block text-xs font-semibold text-muted-foreground">Світлина лікаря</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handlePhotoUpload(person.id, e.target.files[0]);
                      }
                    }}
                    className="hidden"
                    id={`file-upload-${person.id}`}
                  />
                  <label
                    htmlFor={`file-upload-${person.id}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold rounded-lg border border-border cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
                  >
                    {uploadingId === person.id ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    {uploadingId === person.id ? "Завантаження..." : "Завантажити фото"}
                  </label>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">ПІБ</label>
                  <input
                    type="text"
                    value={person.name}
                    onChange={(e) => updateSpecialist(person.id, "name", e.target.value)}
                    className="w-full px-3 py-2 bg-muted/40 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    placeholder="ПІБ лікаря"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Посада</label>
                  <input
                    type="text"
                    value={person.role}
                    onChange={(e) => updateSpecialist(person.id, "role", e.target.value)}
                    className="w-full px-3 py-2 bg-muted/40 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    placeholder="Посада (наприклад, Директор)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Категорія</label>
                <input
                  type="text"
                  value={person.category || ""}
                  onChange={(e) => updateSpecialist(person.id, "category", e.target.value)}
                  className="w-full px-3 py-2 bg-muted/40 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  placeholder="Вища категорія / Перша категорія"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Спеціалізації (через кому)
                </label>
                <input
                  type="text"
                  value={person.specialties.join(", ")}
                  onChange={(e) =>
                    updateSpecialist(
                      person.id,
                      "specialties",
                      e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                    )
                  }
                  className="w-full px-3 py-2 bg-muted/40 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  placeholder="Хірургія, Імплантація"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Освіта</label>
                <textarea
                  value={person.education || ""}
                  onChange={(e) => updateSpecialist(person.id, "education", e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-muted/40 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                  placeholder="Закінчив університет у..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
