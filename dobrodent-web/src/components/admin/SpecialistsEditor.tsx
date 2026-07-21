"use client";

import { useState } from "react";
import { Specialist } from "@/data/defaultSpecialists";
import { uploadImage } from "@/lib/contentService";
import { Plus, Trash2, Save, CheckCircle2, RefreshCw, Upload, ChevronUp, ChevronDown } from "lucide-react";
import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";

interface SpecialistsEditorProps {
  initialSpecialists: Specialist[];
  onSave: (list: Specialist[]) => Promise<boolean>;
}

export default function SpecialistsEditor({ initialSpecialists, onSave }: SpecialistsEditorProps) {
  const [specialists, setSpecialists] = useState<Specialist[]>(initialSpecialists);
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
    setSpecialists([newSpec, ...specialists]);
  };

  const moveSpecialist = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= specialists.length) return;
    const updated = [...specialists];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setSpecialists(updated);
  };

  const updateSpecialist = (id: string, field: keyof Specialist, value: any) => {
    setSpecialists(
      specialists.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const removeSpecialist = (id: string) => {
    if (confirm("Ви дійсно хочете видалити цього спеціаліста?")) {
      setSpecialists(specialists.filter((s) => s.id !== id));
    }
  };

  const handlePhotoUpload = async (id: string, file: File) => {
    setUploadingId(id);
    try {
      const url = await uploadImage(file, "specialists");
      updateSpecialist(id, "image", url);
    } catch (e) {
      alert("Помилка завантаження зображення");
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
          <h2 className="text-lg font-bold text-foreground">Редагування Команди Спеціалістів</h2>
          <p className="text-xs text-muted-foreground">Додавайте лікарів, змінюйте їх порядок, фотографії та спеціалізацію</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={addSpecialist}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground text-sm font-semibold rounded-xl hover:bg-secondary/80 hover:scale-[1.02] active:scale-[0.98] cursor-pointer transition-all duration-150 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Додати лікаря
          </button>
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
                <span className="text-xs font-semibold text-muted-foreground ml-1">
                  Позиція #{specIndex + 1}
                </span>
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
                <label className="block text-xs font-semibold text-muted-foreground">Фото лікаря</label>
                <label className="inline-flex items-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 text-foreground text-xs font-medium rounded-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all border border-border">
                  <Upload className="w-3.5 h-3.5" />
                  {uploadingId === person.id ? "Завантаження..." : "Завантажити нове фото"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handlePhotoUpload(person.id, e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">ПІБ Лікаря</label>
                <input
                  type="text"
                  value={person.name}
                  onChange={(e) => updateSpecialist(person.id, "name", e.target.value)}
                  className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-sm font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-text"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Посада</label>
                  <input
                    type="text"
                    value={person.role}
                    onChange={(e) => updateSpecialist(person.id, "role", e.target.value)}
                    className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-text"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Категорія</label>
                  <input
                    type="text"
                    value={person.category || ""}
                    onChange={(e) => updateSpecialist(person.id, "category", e.target.value)}
                    placeholder="Напр. Вища категорія"
                    className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-text"
                  />
                </div>
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
                  className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Освіта та досвід</label>
                <textarea
                  rows={2}
                  value={person.education}
                  onChange={(e) => updateSpecialist(person.id, "education", e.target.value)}
                  className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none cursor-text"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
