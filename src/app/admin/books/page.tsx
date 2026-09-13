
import styles from "@/styles/admin-shared.module.css";

import Filterbar from "@/components/features/admin-filterBar";
import BooksTable from "@/components/features/admin-books-table";
import AddBookButton from "@/components/features/admin-add-book-button";
import { createClient } from '@/lib/server'
import type { Book } from '@/types/database'


interface Props {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    cat?: string;
  }>;
}
export default async function AdminBooksPage({ searchParams }: Props) {
  
   const supabase = await createClient()
 
 const { data, error } = await supabase
  .from('books_with_authors')
  .select('*').returns<Book[]>()
 
  if (error) console.error(error)

  console.log(JSON.stringify(data, null, 2))

  const { data: categories } = await supabase
    .from("categories")
    .select("name")
    .order("name");

 

  const params = await searchParams;
  const { q, sort, cat } = params;
  const query = q ?? "";

  const cats = ["All", ...(categories??[])?.map((c) => c.name)];

  const books: Book[] = data ?? [];

  const filtered = books.filter((b) => {
    const q = query.toLowerCase();
    if (
      q &&
      !b.title.toLowerCase().includes(q) &&
      !b.author.toLowerCase().includes(q) &&
      !b.isbn.includes(q)
    )
      return false;
    if (cat !== "All" && b.category !== cat) return false;
    return true;
  }  ).sort((a, b) =>
    sort === "rating"
      ? b.rating - a.rating
      : a.title.localeCompare(b.title),
  );

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Books</h1>
          <p className={styles.pageSub}>
            {books.length} titles in catalog
          </p>
        </div>
        <div className={styles.pageActions}>
          <AddBookButton books={books} />
        </div>
      </div>

      <Filterbar cats={cats} />

      <div className={styles.section}>
        <BooksTable books={filtered} />
      </div>
    </div>
  );
}
