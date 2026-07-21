"use client";

import { useState } from "react";
import { PriceCategory, PriceItem } from "@/data/defaultPrices";
import { Plus, Trash2, Save, CheckCircle2, RefreshCw, ChevronUp, ChevronDown } from "lucide-react";

interface PriceEditorProps {
  initialCategories: PriceCategory[];
  onSave: (categories: PriceCategory[]) => Promise<boolean>;
}

export default function PriceEditor({ initialCategories, onSave }: PriceEditorProps) {
  const [categories, setCategories] = useState<PriceCategory[]>(initialCategories);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Category Operations (Prepends new category to top)
  const addCategory = () => {
    const newCategory: PriceCategory = {
      id: `cat-${Date.now()}`,
      name: "Нова категорія послуг",
      items: [
        { id: `p-${Date.now()}`, name: "Нова послуга", price: "1000 грн" }
      ]
    };
    setCategories([newCategory, ...categories]);
  };

  const moveCategory = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= categories.length) return;
    const updated = [...categories];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setCategories(updated);
  };

  const updateCategoryName = (catId: string, name: string) => {
    setCategories(
      categories.map((c) => (c.id === catId ? { ...c, name } : c))
    );
  };

  const removeCategory = (catId: string) => {
    if (confirm("Ви дійсно хочете видалити цю категорію зі всіма послугами?")) {
      setCategories(categories.filter((c) => c.id !== catId));
    }
  };

  // Item Operations
  const addItem = (catId: string) => {
    const newItem: PriceItem = {
      id: `p-${Date.now()}`,
      name: "Нова послуга",
      price: "1000 грн",
    };
    setCategories(
      categories.map((c) =>
        c.id === catId ? { ...c, items: [newItem, ...c.items] } : c
      )
    );
  };

  const moveItem = (catId: string, index: number, direction: -1 | 1) => {
    setCategories(
      categories.map((c) => {
        if (c.id !== catId) return c;
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= c.items.length) return c;
        const updatedItems = [...c.items];
        const [moved] = updatedItems.splice(index, 1);
        updatedItems.splice(targetIndex, 0, moved);
        return { ...c, items: updatedItems };
      })
    );
  };

  const updateItem = (catId: string, itemId: string, field: "name" | "price", value: string) => {
    setCategories(
      categories.map((c) => {
        if (c.id !== catId) return c;
        return {
          ...c,
          items: c.items.map((item) =>
            item.id === itemId ? { ...item, [field]: value } : item
          ),
        };
      })
    );
  };

  const removeItem = (catId: string, itemId: string) => {
    setCategories(
      categories.map((c) => {
        if (c.id !== catId) return c;
        return {
          ...c,
          items: c.items.filter((item) => item.id !== itemId),
        };
      })
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    const ok = await onSave(categories);
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
          <h2 className="text-lg font-bold text-foreground">Редагування Прайс-листа</h2>
          <p className="text-xs text-muted-foreground">Змінюйте назви, ціни, додавайте та впорядковуйте категорії</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={addCategory}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground text-sm font-semibold rounded-xl hover:bg-secondary/80 hover:scale-[1.02] active:scale-[0.98] cursor-pointer transition-all duration-150 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Додати категорію
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

      <div className="space-y-6">
        {categories.map((category, catIndex) => (
          <div key={category.id} className="bg-background rounded-2xl border border-border overflow-hidden shadow-sm hover:border-primary/30 transition-colors">
            {/* Category Header */}
            <div className="bg-muted/60 px-4 sm:px-6 py-3.5 border-b border-border flex items-center justify-between gap-3">
              {/* Order buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveCategory(catIndex, -1)}
                  disabled={catIndex === 0}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-all"
                  title="Перемістити вгору"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveCategory(catIndex, 1)}
                  disabled={catIndex === categories.length - 1}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-all"
                  title="Перемістити вниз"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <input
                type="text"
                value={category.name}
                onChange={(e) => updateCategoryName(category.id, e.target.value)}
                placeholder="Назва категорії"
                className="font-bold text-lg text-foreground bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none transition-colors w-full cursor-text"
              />
              <span className="font-heading font-bold text-lg text-foreground whitespace-nowrap hidden sm:inline-block mr-2">
                Ціна
              </span>
              <button
                onClick={() => removeCategory(category.id)}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-2 rounded-lg cursor-pointer transition-all"
                title="Видалити категорію"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Price Items */}
            <div className="divide-y divide-border p-4 sm:p-6 space-y-3">
              {category.items.map((item, itemIndex) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 first:pt-0">
                  {/* Item Order buttons */}
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() => moveItem(category.id, itemIndex, -1)}
                      disabled={itemIndex === 0}
                      className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-all"
                      title="Підняти послугу"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveItem(category.id, itemIndex, 1)}
                      disabled={itemIndex === category.items.length - 1}
                      className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-all"
                      title="Опустити послугу"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(category.id, item.id, "name", e.target.value)}
                    placeholder="Назва послуги"
                    className="flex-grow px-3 py-2 bg-muted/20 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-text"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.price}
                      onChange={(e) => updateItem(category.id, item.id, "price", e.target.value)}
                      placeholder="Ціна (напр. від 800 грн)"
                      className="w-36 px-3 py-2 bg-muted/20 border border-border rounded-lg text-sm font-semibold text-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-text"
                    />
                    <button
                      onClick={() => removeItem(category.id, item.id)}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-2 rounded-lg cursor-pointer transition-all"
                      title="Видалити послугу"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-3">
                <button
                  onClick={() => addItem(category.id)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 hover:bg-primary/5 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Додати послугу в цю категорію
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
