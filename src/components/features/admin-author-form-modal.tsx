"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import type { Author } from "@/types/database";
import { createClient } from "@/lib/client";


interface AuthorFormModalProps {
  author?: Author;
  params: URLSearchParams;
}

type FormData = {
  name: string;
  nationality: string;
  rating: number;
  bio: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function emptyForm(): FormData {
  return {
    name: "",
    nationality: "",
    rating: 0,
    bio: "",
  };
}

function initialForm(author: Author): FormData {
  return {
    name: author.name,
    nationality: author.nationality,
    rating: author.rating,
    bio: author.bio ?? "",
  };
}

function validate(form: FormData): FormErrors {
  const e: FormErrors = {};

  if (!form.name.trim()) e.name = "Name is required.";

  const rating = Number(form.rating);
  if (
    form.rating === undefined ||
    form.rating === null ||
    form.rating === ("" as unknown as number)
  )
    e.rating = "Rating is required.";
  else if (isNaN(rating) || rating < 0 || rating > 5)
    e.rating = "Rating must be between 0 and 5.";

  return e;
}

const errorTextStyle: React.CSSProperties = {
  fontSize: 11,
  color: "var(--destructive)",
  marginTop: 3,
  lineHeight: 1.3,
};

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <div style={errorTextStyle}>{msg}</div>;
}

export default function AuthorFormModal({
  author,
  
  params,
}: AuthorFormModalProps) {

  const router = useRouter();
  const clearParam = (param: string) => {
    const p = new URLSearchParams(params);
    p.delete(param);
    router.replace(`?${p.toString()}`);
  };
  const [form, setForm] = useState(author ? initialForm(author) : emptyForm());
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  const isEdit = !!author;

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
      const original = initialForm(author);
      const changed = (Object.keys(form) as (keyof FormData)[]).some(
        (k) => form[k] !== original[k],
      );
      if (!changed) {
        clearParam("edit");
        return;
      }
    }

    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.rpc("save_author", {
        p_author_id: isEdit ? author.author_id : "",
        p_name: form.name.trim(),
        p_nationality: form.nationality.trim(),
        p_bio: form.bio.trim(),
        p_rating: Number(form.rating),
      });
      if (error) throw error;
      clearParam("edit");
    } catch (err) {
      console.error("Failed to save author:", err);
      alert(isEdit ? "Failed to save author changes." : "Failed to add author.");
    } finally {
      setSaving(false);
    }
  };

  const errorBorder = (field: keyof FormErrors): React.CSSProperties =>
    errors[field] ? { borderColor: "var(--destructive)" } : {};

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "7px 11px",
    border: "1px solid var(--border)",
    borderRadius: 8,
    fontFamily: "inherit",
    fontSize: 13,
    background: "var(--input-background)",
    color: "var(--foreground)",
    outline: "none",
    transition: "border-color var(--transition-fast, 80ms ease)",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 500,
    minWidth: 160,
    flexShrink: 0,
    color: "var(--foreground)",
  };

  const requiredDot: React.CSSProperties = {
    color: "var(--destructive)",
    marginLeft: 2,
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "12px 0",
    borderBottom: "1px solid var(--border)",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: 40,
        overflowY: "auto",
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        animation: "fadeUp 150ms ease both",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) clearParam("edit");
      }}
    >
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          width: "90%",
          maxWidth: 560,
          maxHeight: "85vh",
          overflow: "auto",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <h2
            style={{
              fontSize: 16,
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {isEdit ? "Edit Author" : "Add Author"}
          </h2>
          <button
            onClick={()=>clearParam("edit")}
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              border: "none",
              background: "var(--muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--muted-foreground)",
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Form */}
        <div style={{ padding: "8px 20px 20px" }}>
          {/* Row: Name */}
          <div style={rowStyle}>
            <label style={labelStyle}>
              Name<span style={requiredDot}>*</span>
            </label>
            <div style={{ flex: 1 }}>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                style={{ ...inputStyle, ...errorBorder("name") }}
              />
              <FieldError msg={errors.name} />
            </div>
          </div>
          {/* Row: Nationality */}
          <div style={rowStyle}>
            <label style={labelStyle}>Nationality</label>
            <div style={{ flex: 1 }}>
              <input
                name="nationality"
                value={form.nationality}
                onChange={handleChange}
                placeholder="e.g. American"
                style={inputStyle}
              />
            </div>
          </div>
          {/* Row: Rating */}
          <div style={rowStyle}>
            <label style={labelStyle}>
              Rating<span style={requiredDot}>*</span>
            </label>
            <div style={{ flex: 1, maxWidth: 120 }}>
              <input
                name="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={form.rating}
                onChange={handleChange}
                style={{ ...inputStyle, maxWidth: 120, ...errorBorder("rating") }}
              />
              <FieldError msg={errors.rating} />
            </div>
          </div>
          {/* Bio */}
          <div style={{ padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
            <label style={{ ...labelStyle, display: "block", marginBottom: 8 }}>
              Bio
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
          {/* Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              paddingTop: 8,
            }}
          >
            <Button variant="outline" size="sm" onClick={()=>clearParam("edit")}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              loading={saving}
              onClick={handleSave}
            >
              {isEdit ? "Save Changes" : "Add Author"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}