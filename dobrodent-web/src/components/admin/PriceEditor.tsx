"use client";

import { useState } from "react";
import { PriceCategory, PriceItem } from "@/data/defaultPrices";
import { Plus, Trash2, Save, CheckCircle2, RefreshCw, ChevronUp, ChevronDown } from "lucide-react";

interface PriceEditorProps {
  categories: PriceCategory[];
  onChange: (categories: PriceCategory[]) => void;
  onSave: (categories: PriceCategory[]) => Promise<boolean>;
}

export default function PriceEditor({ categories, onChange, onSave }: PriceEditorProps) {
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
    onChange([newCategory, ...categories]);
  };

  const moveCategory = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= categories.length) return;
    const updated = [...categories];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    onChange(updated);
  };

  const updateCategoryName = (catId: string, name: string) => {
    onChange(
      categories.map((c) => (c.id === catId ? { ...c, name } : c))
    );
  };

  const removeCategory = (catId: string) => {
    if (confirm("Ви дійсно хочете видалити цю категорію зі всіма послугами?")) {
      onChange(categories.filter((c) => c.id !== catId));
    }
  };

  // Item Operations
  const addItem = (catId: string) => {
    const newItem: PriceItem = {
      id: `p-${Date.now()}`,
      name: "Нова послуга",
      price: "1000 грн",
    };
    onChange(
      categories.map((c) =>
        c.id === catId ? { ...c, items: [newItem, ...c.items] } : c
      )
    );
  };

  const moveItem = (catId: string, index: number, direction: -1 | 1) => {
    onChange(
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
    onChange(
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
    onChange(
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
        <div className="flex items-center gap-2">
          <button
            onClick={addCategory}
            className="px-4 py-2 border border-primary/20 text-primary hover:bg-primary/5 text-sm font-semibold rounded-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Додати категорію
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

      <div className="space-y-6">
        {categories.map((category, catIndex) => (
          <div key={category.id} className="bg-background rounded-2xl border border-border p-6 shadow-sm space-y-4 hover:border-primary/20 transition-colors">
            {/* Category Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-border pb-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Order buttons */}
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => moveCategory(catIndex, -1)}
                    disabled={catIndex === 0}
                    className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-all"
                    title="Перемістити вгору"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveCategory(catIndex, 1)}
                    disabled={catIndex === categories.length - 1}
                    className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-all"
                    title="Перемістити вниз"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => updateCategoryName(category.id, e.target.value)}
                  className="text-lg font-bold bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none px-1 py-0.5 w-full sm:w-80 text-foreground transition-all"
                  placeholder="Назва категорії"
                />
              </div>

              <div className="flex items-center gap-2 ml-auto sm:ml-0">
                <button
                  onClick={() => addItem(category.id)}
                  className="px-3 py-1.5 border border-border hover:bg-muted text-xs font-semibold rounded-lg text-foreground cursor-pointer transition-all"
                >
                  Додати послугу
                </button>
                <button
                  onClick={() => removeCategory(category.id)}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-1.5 rounded-lg cursor-pointer transition-all"
                  title="Видалити категорію"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Category Items */}
            <div className="divide-y divide-border">
              {category.items.map((item, itemIndex) => (
                <div key={item.id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 hover:bg-muted/10 px-2 rounded-lg transition-all group">
                  {/* Reordering buttons for items */}
                  <div className="flex items-center gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => moveItem(category.id, itemIndex, -1)}
                      disabled={itemIndex === 0}
                      className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-all"
                      title="Перемістити послугу вгору"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveItem(category.id, itemIndex, 1)}
                      disabled={itemIndex === category.items.length - 1}
                      className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-all"
                      title="Перемістити послугу вниз"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(category.id, item.id, "name", e.target.value)}
                    className="flex-grow bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none px-1 py-0.5 text-sm text-foreground transition-all w-full sm:w-auto"
                    placeholder="Назва послуги"
                  />
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <input
                      type="text"
                      value={item.price}
                      onChange={(e) => updateItem(category.id, item.id, "price", e.target.value)}
                      className="w-32 bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none px-1 py-0.5 text-sm font-bold text-primary text-right transition-all"
                      placeholder="Ціна"
                    />
                    <button
                      onClick={() => removeItem(category.id, item.id)}
                      className="text-muted-foreground hover:text-destructive p-1 rounded hover:bg-muted cursor-pointer transition-all"
                      title="Видалити послугу"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
