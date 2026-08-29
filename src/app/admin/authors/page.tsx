import { Plus} from "lucide-react";

import { AUTHORS } from "@/mock/adminData";
import Button from "@/components/ui/Button";
import styles from "@/styles/admin-shared.module.css";

import PageProvider from "@/context/admin-authers-page-context";
import AutherRow from "@/components/features/admin-authers-row";
import FilterBar from "@/components/features/admin-filterBar";

interface Props {
  searchParams: Promise<{
    q?: string;
    sort?: string;
  }>;
}
export default async function AuthorsPage({ searchParams }: Props) {
  const params = await searchParams;
  const { q, sort } = params;
  const query = q ?? "";

  const filtered = AUTHORS.filter(
    (a) =>
      !query ||
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.nationality.toLowerCase().includes(query.toLowerCase()),
  ).sort((a, b) =>
    sort === "borrows"
      ? b.borrowCount - a.borrowCount
      : sort === "rating"
        ? b.rating - a.rating
        : a.name.localeCompare(b.name),
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
            <Button
              variant="primary"
              size="sm"
              leadingIcon={<Plus size={14} />}
            >
              Add Author
            </Button>
          </div>
        </div>

        <FilterBar />

        <div className={styles.section}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {[
                    "Author",
                    "Nationality",
                    "Books",
                    "Borrows",
                    "Rating",
                    "",
                  ].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <AutherRow key={a.id} a={a} />
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  padding: "32px",
                  fontSize: 13,
                  color: "var(--muted-foreground)",
                  margin: 0,
                }}
              >
                No authors match.
              </p>
            )}
          </div>
        </div>
      </div>
    </PageProvider>
  );
}
