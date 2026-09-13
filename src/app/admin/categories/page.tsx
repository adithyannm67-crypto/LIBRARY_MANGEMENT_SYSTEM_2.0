import { createClient } from "@/lib/server";
import styles from "@/styles/admin-shared.module.css";

import AddCategoryButton from "@/components/features/admin-add-category-button";
import CategoriesManager from "@/components/features/admin-categories-manager";

const CAT_COLORS: Record<string, string> = {
  Engineering: "#6366F1",
  Algorithms: "#22C55E",
  Databases: "#9B59B6",
  JavaScript: "#F59E0B",
  TypeScript: "#3178C6",
  Python: "#4B8BBE",
  Self_Help: "#FF6B35",
  "Self-Help": "#FF6B35",
  Psychology: "#F1C40F",
  Business: "#1ABC9C",
  Finance: "#27AE60",
  History: "#E74C3C",
  Science: "#2980B9",
  Fiction: "#8E44AD",
};

export default async function CategoriesPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("category_id, name, description, book_count")
    .order("name")
    .returns<{
      category_id: string;
      name: string;
      description: string | null;
      book_count: number | null;
    }[]>();

  if (error) console.error(error);

  const categories = (data ?? []).map((row) => ({
    id: row.category_id,
    name: row.name,
    description: row.description ?? "",
    bookCount: row.book_count ?? 0,
    color: CAT_COLORS[row.name] ?? "#6B7280",
  }));

  const total = categories.reduce((s, c) => s + c.bookCount, 0);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Categories</h1>
          <p className={styles.pageSub}>
            {categories.length} categories · {total} books total
          </p>
        </div>
        <div className={styles.pageActions}>
          <AddCategoryButton />
        </div>
      </div>

      <CategoriesManager categories={categories} total={total} />
    </div>
  );
}