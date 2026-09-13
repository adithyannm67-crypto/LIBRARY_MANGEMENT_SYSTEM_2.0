"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/client";
import { cn } from "@/lib/utils";
import styles from "@/styles/admin-modal.module.css";

interface CategoryInput {
  id: string;
  name: string;
  description: string;
  bookCount: number;
  color: string;
}

export type { CategoryInput };

interface CategoryFormModalProps {
  category?: CategoryInput;
  onClose: () => void;
  onSaved: () => void;
}

type FormData = {
  name: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function emptyForm(): FormData {
  return { name: "", description: "" };
}

function initialForm(category: CategoryInput): FormData {
  return {
    name: category.name,
    description: category.description,
  };
}

function validate(form: FormData): FormErrors {
  const e: FormErrors = {};
  if (!form.name.trim()) e.name = "Name is required.";
  return e;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <div className={styles.errorText}>{msg}</div>;
}

export default function CategoryFormModal({
  category,
  onClose,
  onSaved,
}: CategoryFormModalProps) {
  const [form, setForm] = useState(category ? initialForm(category) : emptyForm());
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  const isEdit = !!category;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name as keyof FormErrors];
        return copy;
      });
    }
  };

  const handleSave = async () => {
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (isEdit) {
      const original = initialForm(category);
      const changed = (Object.keys(form) as (keyof FormData)[]).some(
        (k) => form[k] !== original[k],
      );
      if (!changed) {
        onClose();
        return;
      }
    }

    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.rpc("save_category", {
        p_category_id: isEdit ? category.id : "",
        p_name: form.name.trim(),
        p_description: form.description.trim(),
      });
      if (error) throw error;
      onSaved();
    } catch (err) {
      console.error("Failed to save category:", err);
      alert(
        isEdit ? "Failed to save category changes." : "Failed to add category.",
      );
    } finally {
      setSaving(false);
    }
  };

  const inputCls = (field: keyof FormErrors) =>
    cn(styles.input, errors[field] && styles.inputError);

  return (
    <div
      className={cn(styles.overlay, styles.overlayScroll)}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={cn(styles.dialog, styles.dialogNarrow)}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isEdit ? "Edit Category" : "New Category"}
          </h2>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={14} />
          </button>
        </div>

        {/* Form */}
        <div className={styles.form}>
          {/* Row: Name */}
          <div className={styles.row}>
            <label className={styles.label}>
              Name<span className={styles.requiredDot}>*</span>
            </label>
            <div className={styles.field}>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputCls("name")}
              />
              <FieldError msg={errors.name} />
            </div>
          </div>
          {/* Row: Description */}
          <div className={styles.fieldBlock}>
            <label className={cn(styles.label, styles.labelBlock)}>
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className={cn(styles.input, styles.textarea)}
            />
          </div>
          {/* Actions */}
          <div className={styles.formActions}>
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              loading={saving}
              onClick={handleSave}
            >
              {isEdit ? "Save Changes" : "Add Category"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}