import styles from "@/styles/admin-shared.module.css";

import PageProvider from "@/context/admin-authers-page-context";
import AuthersTable from "@/components/features/admin-authers-table";
import FilterBar from "@/components/features/admin-filterBar";
import AddAuthorButton from "@/components/features/admin-add-author-button";

import { createClient } from "@/lib/server";
import type { Author } from "@/types/database";

interface Props {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    edit?: string;
    delete?: string;
    expand?: string;
  }>;
}

export default async function AuthorsPage({ searchParams }: Props) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .returns<Author[]>();

  if (error) console.error(error);
  const AUTHORS: Author[] = data ?? [];

  const params = await searchParams;
  const { q, sort } = params;
  const query = q ?? "";

  const filtered = AUTHORS.filter(
    (a) =>
      !query ||
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.nationality.toLowerCase().includes(query.toLowerCase()),
  ).sort((a, b) =>
    sort === "rating" ? b.rating - a.rating : a.name.localeCompare(b.name),
  );

  return (
    <PageProvider DATA={AUTHORS}>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Authors</h1>
            <p className={styles.pageSub}>
              {AUTHORS.length} authors in catalog
            </p>
          </div>
          <div className={styles.pageActions}>
            <AddAuthorButton />
          </div>
        </div>

        <FilterBar />

        <div className={styles.section}>
          <AuthersTable authors={filtered} searchParams={searchParams} />
        </div>
      </div>
    </PageProvider>
  );
}
