"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import type { Book } from "@/types/database";
import { createClient } from "@/lib/client";
import { cn } from "@/lib/utils";
import styles from "@/styles/admin-modal.module.css";

interface BookFormModalProps {
  book?: Book;
  existingBooks?: Book[];
  onClose: () => void;
  onSaved: () => void;
}

type FormData = {
  title: string;
  authors: string[];
  isbn: string;
  category: string;
  subcategory: string;
  description: string;
  publisher: string;
  published_year: number;
  pages: number;
  language: string;
  rating: number;
  total_copies: number;
  available_copies: number;
  tags: string;
  is_new: boolean;
  is_bestseller: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function emptyForm(): FormData {
  return {
    title: "",
    authors: [],
    isbn: "",
    category: "",
    subcategory: "",
    description: "",
    publisher: "",
    published_year: new Date().getFullYear(),
    pages: 300,
    language: "English",
    rating: 0,
    total_copies: 1,
    available_copies: 1,
    tags: "",
    is_new: false,
    is_bestseller: false,
  };
}

function initialForm(book: Book): FormData {
  const names = book.authors?.map((a) => a.name) ?? [];
  return {
    title: book.title,
    authors: names.length ? names : book.author ? [book.author] : [],
    isbn: book.isbn,
    category: book.category,
    subcategory: book.subcategory,
    description: book.description,
    publisher: book.publisher,
    published_year: book.published_year,
    pages: book.pages,
    language: book.language,
    rating: book.rating,
    total_copies: book.total_copies,
    available_copies: book.available_copies,
    tags: book.tags,
    is_new: book.is_new,
    is_bestseller: book.is_bestseller,
  };
}

/** Next available book_id (mock/live ids follow the `b<N>` pattern). */
function nextBookId(books: Book[]): string {
  let max = 0;
  for (const b of books) {
    const n = parseInt(b.book_id.replace(/^b/i, ""), 10);
    if (!Number.isNaN(n) && n > max) max = n;
  }
  return `b${max + 1}`;
}

/** ISBN-10 or ISBN-13 (digits only, or with hyphens/spaces) */
const ISBN_RE = /^(?:\d[\d- ]{8,16}\d)$/;

function validate(form: FormData): FormErrors {
  const e: FormErrors = {};

  if (!form.title.trim()) e.title = "Title is required.";
  else if (form.title.trim().length < 1) e.title = "Title cannot be blank.";

  const authorNames = form.authors.map((a) => a.trim()).filter(Boolean);
  if (authorNames.length === 0) e.authors = "At least one author is required.";

  if (!form.isbn.trim()) e.isbn = "ISBN is required.";
  else if (!ISBN_RE.test(form.isbn.replace(/\s/g, "")))
    e.isbn = "Enter a valid ISBN (10 or 13 digits).";

  if (!form.category.trim()) e.category = "Category is required.";

  if (!form.publisher.trim()) e.publisher = "Publisher is required.";

  const year = Number(form.published_year);
  if (!form.published_year && form.published_year !== 0)
    e.published_year = "Year is required.";
  else if (!Number.isInteger(year) || year < 1000 || year > 2099)
    e.published_year = "Enter a year between 1000 and 2099.";

  const pages = Number(form.pages);
  if (!form.pages && form.pages !== 0) e.pages = "Pages is required.";
  else if (!Number.isInteger(pages) || pages < 1)
    e.pages = "Pages must be a positive integer.";

  if (!form.language.trim()) e.language = "Language is required.";

  const rating = Number(form.rating);
  if (form.rating === undefined || form.rating === null || form.rating === ("" as unknown as number))
    e.rating = "Rating is required.";
  else if (isNaN(rating) || rating < 0 || rating > 5)
    e.rating = "Rating must be between 0 and 5.";

  const totalCopies = Number(form.total_copies);
  const availCopies = Number(form.available_copies);
  if (!form.total_copies && form.total_copies !== 0)
    e.total_copies = "Total copies is required.";
  else if (!Number.isInteger(totalCopies) || totalCopies < 0)
    e.total_copies = "Must be a non-negative integer.";

  if (!form.available_copies && form.available_copies !== 0)
    e.available_copies = "Available copies is required.";
  else if (!Number.isInteger(availCopies) || availCopies < 0)
    e.available_copies = "Must be a non-negative integer.";
  else if (totalCopies >= 0 && availCopies > totalCopies)
    e.available_copies = "Cannot exceed total copies.";

  if (!form.description.trim()) e.description = "Description is required.";

  return e;
}

/** Build the save_book RPC params (excluding p_book_id) from the form. */
function serialize(form: FormData): Record<string, unknown> {
  return {
    p_title: form.title.trim(),
    p_author_names: form.authors.map((a) => a.trim()).filter(Boolean),
    p_isbn: form.isbn.trim(),
    p_category: form.category.trim(),
    p_subcategory: form.subcategory.trim(),
    p_publisher: form.publisher.trim(),
    p_published_year: Number(form.published_year),
    p_pages: Number(form.pages),
    p_language: form.language.trim(),
    p_rating: Number(form.rating),
    p_total_copies: Number(form.total_copies),
    p_available_copies: Number(form.available_copies),
    p_tags: form.tags.trim(),
    p_is_new: form.is_new,
    p_is_bestseller: form.is_bestseller,
    p_description: form.description.trim(),
  };
}

/** Legacy save_book params (single p_author_name) for DBs without migration 016. */
function serializeLegacy(form: FormData, authorName: string): Record<string, unknown> {
  const params = serialize(form);
  delete params.p_author_names;
  return { ...params, p_author_name: authorName };
}

/**
 * Fallback for databases still running the pre-016 save_book (single author).
 * Saves the book with the first author via the existing RPC, then resolves
 * or creates each remaining author and adds its mapping row directly, and
 * finally keeps authors.book_count in sync for the newly-attached authors.
 */
async function saveBookLegacy(
  supabase: ReturnType<typeof createClient>,
  bookId: string,
  form: FormData,
  authors: string[],
): Promise<void> {
  const [first = "", ...extra] = authors;

  const { error: rpcError } = await supabase.rpc("save_book", {
    p_book_id: bookId,
    ...serializeLegacy(form, first),
  });
  if (rpcError) throw rpcError;

  for (const name of extra) {
    const clean = name.trim();
    const { data: found } = await supabase
      .from("authors")
      .select("author_id")
      .ilike("name", clean)
      .maybeSingle();

    let authorId = found?.author_id ?? "";

    if (!authorId) {
      const { data: idRows } = await supabase.from("authors").select("author_id");
      let max = 0;
      for (const r of idRows ?? []) {
        const n = parseInt((r.author_id ?? "").replace(/\D/g, ""), 10);
        if (!Number.isNaN(n) && n > max) max = n;
      }
      authorId = `au${max + 1}`;
      const { error: insertErr } = await supabase
        .from("authors")
        .insert({ author_id: authorId, name: clean, book_count: 0, borrow_count: 0 });
      if (insertErr) throw insertErr;
    }

    const { error: mapErr } = await supabase
      .from("book_auther_mapping")
      .insert({ book_id: bookId, author_id: authorId });
    if (mapErr) throw mapErr;

    const { data: mapped } = await supabase
      .from("book_auther_mapping")
      .select("book_id")
      .eq("author_id", authorId);
    await supabase
      .from("authors")
      .update({ book_count: mapped?.length ?? 0 })
      .eq("author_id", authorId);
  }
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <div className={styles.errorText}>{msg}</div>;
}

export default function BookFormModal({ book, existingBooks, onClose, onSaved }: BookFormModalProps) {
  const [form, setForm] = useState(book ? initialForm(book) : emptyForm());
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  const isEdit = !!book;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const next =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm((prev) => ({ ...prev, [name]: next }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name as keyof FormErrors];
        return copy;
      });
    }
  };

  const updateAuthor = (idx: number, value: string) => {
    setForm((prev) => {
      const next = [...prev.authors];
      next[idx] = value;
      return { ...prev, authors: next };
    });
    if (errors.authors) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.authors;
        return copy;
      });
    }
  };

  const addAuthor = () =>
    setForm((prev) => ({ ...prev, authors: [...prev.authors, ""] }));

  const removeAuthor = (idx: number) =>
    setForm((prev) => ({
      ...prev,
      authors: prev.authors.filter((_, i) => i !== idx),
    }));

  const handleSave = async () => {
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (isEdit) {
      const original = initialForm(book);
      const changed = (Object.keys(form) as (keyof FormData)[]).some((k) => {
        const a = form[k];
        const b = original[k];
        if (Array.isArray(a) || Array.isArray(b))
          return JSON.stringify(a) !== JSON.stringify(b);
        return a !== b;
      });
      if (!changed) {
        onClose();
        return;
      }
    }

    setSaving(true);
    try {
      const supabase = createClient();
      const bookId = isEdit ? book.book_id : nextBookId(existingBooks ?? []);
      const authors = form.authors.map((a) => a.trim()).filter(Boolean);

      const { error } = await supabase.rpc("save_book", {
        p_book_id: bookId,
        ...serialize(form),
      });

      if (error?.code === "PGRST202") {
        // DB still runs the pre-016 single-author save_book.
        await saveBookLegacy(supabase, bookId, form, authors);
      } else if (error) {
        throw error;
      }
      onSaved();
    } catch (err) {
      console.error("Failed to save book:", err);
      alert(isEdit ? "Failed to save book changes." : "Failed to add book.");
    } finally {
      setSaving(false);
    }
  };

  const inputCls = (field: keyof FormErrors, ...extras: (string | false | undefined)[]) =>
    cn(styles.input, extras, errors[field] && styles.inputError);

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={cn(styles.dialog, styles.dialogTop)}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isEdit ? "Edit Book" : "Add Book"}
          </h2>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={14} />
          </button>
        </div>

        {/* Form */}
        <div className={styles.form}>
          {/* Row: Title */}
          <div className={styles.row}>
            <label className={styles.label}>
              Title<span className={styles.requiredDot}>*</span>
            </label>
            <div className={styles.field}>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className={inputCls("title")}
              />
              <FieldError msg={errors.title} />
            </div>
          </div>
          {/* Row: Authors */}
          <div className={styles.row}>
            <label className={styles.label}>
              Authors<span className={styles.requiredDot}>*</span>
            </label>
            <div className={styles.field}>
              {form.authors.map((author, idx) => (
                <div key={idx} className={styles.authorRow}>
                  <input
                    value={author}
                    onChange={(e) => updateAuthor(idx, e.target.value)}
                    placeholder={`Author ${idx + 1}`}
                    className={inputCls("authors")}
                  />
                  <button
                    type="button"
                    onClick={() => removeAuthor(idx)}
                    aria-label={`Remove author ${idx + 1}`}
                    className={styles.iconBtnSm}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {form.authors.length === 0 && (
                <div className={styles.hint}>No authors added yet.</div>
              )}
              <button type="button" onClick={addAuthor} className={styles.linkBtn}>
                + Add Author
              </button>
              <FieldError msg={errors.authors} />
            </div>
          </div>
          {/* Row: ISBN */}
          <div className={styles.row}>
            <label className={styles.label}>
              ISBN<span className={styles.requiredDot}>*</span>
            </label>
            <div className={styles.field}>
              <input
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                className={inputCls("isbn", styles.inputMono)}
              />
              <FieldError msg={errors.isbn} />
            </div>
          </div>
          {/* Row: Category */}
          <div className={styles.row}>
            <label className={styles.label}>
              Category<span className={styles.requiredDot}>*</span>
            </label>
            <div className={styles.field}>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputCls("category")}
              />
              <FieldError msg={errors.category} />
            </div>
          </div>
          {/* Row: Subcategory */}
          <div className={styles.row}>
            <label className={styles.label}>Subcategory</label>
            <div className={styles.field}>
              <input
                name="subcategory"
                value={form.subcategory}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>
          {/* Row: Publisher */}
          <div className={styles.row}>
            <label className={styles.label}>
              Publisher<span className={styles.requiredDot}>*</span>
            </label>
            <div className={styles.field}>
              <input
                name="publisher"
                value={form.publisher}
                onChange={handleChange}
                className={inputCls("publisher")}
              />
              <FieldError msg={errors.publisher} />
            </div>
          </div>
          {/* Row: Year / Pages */}
          <div className={styles.row}>
            <label className={styles.label}>
              Year<span className={styles.requiredDot}>*</span>
            </label>
            <div className={styles.fieldSm}>
              <input
                name="published_year"
                type="number"
                value={form.published_year}
                onChange={handleChange}
                className={inputCls("published_year", styles.inputSm)}
              />
              <FieldError msg={errors.published_year} />
            </div>
            <label className={cn(styles.label, styles.labelGap)}>
              Pages<span className={styles.requiredDot}>*</span>
            </label>
            <div className={styles.fieldSm}>
              <input
                name="pages"
                type="number"
                value={form.pages}
                onChange={handleChange}
                className={inputCls("pages", styles.inputSm)}
              />
              <FieldError msg={errors.pages} />
            </div>
          </div>
          {/* Row: Language */}
          <div className={styles.row}>
            <label className={styles.label}>
              Language<span className={styles.requiredDot}>*</span>
            </label>
            <div className={styles.field}>
              <input
                name="language"
                value={form.language}
                onChange={handleChange}
                className={inputCls("language")}
              />
              <FieldError msg={errors.language} />
            </div>
          </div>
          {/* Row: Rating */}
          <div className={styles.row}>
            <label className={styles.label}>
              Rating<span className={styles.requiredDot}>*</span>
            </label>
            <div className={styles.fieldMd}>
              <input
                name="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={form.rating}
                onChange={handleChange}
                className={inputCls("rating", styles.inputMd)}
              />
              <FieldError msg={errors.rating} />
            </div>
          </div>
          {/* Row: Total Copies / Available */}
          <div className={styles.row}>
            <label className={styles.label}>
              Total Copies<span className={styles.requiredDot}>*</span>
            </label>
            <div className={styles.fieldSm}>
              <input
                name="total_copies"
                type="number"
                value={form.total_copies}
                onChange={handleChange}
                className={inputCls("total_copies", styles.inputSm)}
              />
              <FieldError msg={errors.total_copies} />
            </div>
            <label className={cn(styles.label, styles.labelGap)}>
              Available<span className={styles.requiredDot}>*</span>
            </label>
            <div className={styles.fieldSm}>
              <input
                name="available_copies"
                type="number"
                value={form.available_copies}
                onChange={handleChange}
                className={inputCls("available_copies", styles.inputSm)}
              />
              <FieldError msg={errors.available_copies} />
            </div>
          </div>
          {/* Row: Tags */}
          <div className={styles.row}>
            <label className={styles.label}>Tags</label>
            <div className={styles.field}>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>
          {/* Description */}
          <div className={styles.fieldBlock}>
            <label className={cn(styles.label, styles.labelBlock)}>
              Description<span className={styles.requiredDot}>*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className={inputCls("description", styles.textarea)}
            />
            <FieldError msg={errors.description} />
          </div>
          {/* Checkboxes */}
          <div className={styles.checkRow}>
            <label className={styles.checkLabel}>
              <input
                type="checkbox"
                name="is_new"
                checked={form.is_new}
                onChange={handleChange}
                className={styles.checkInput}
              />
              New Arrival
            </label>
            <label className={styles.checkLabel}>
              <input
                type="checkbox"
                name="is_bestseller"
                checked={form.is_bestseller}
                onChange={handleChange}
                className={styles.checkInput}
              />
              Bestseller
            </label>
          </div>
          {/* Actions */}
          <div className={styles.formActions}>
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" loading={saving} onClick={handleSave}>
              {isEdit ? "Save Changes" : "Add Book"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}