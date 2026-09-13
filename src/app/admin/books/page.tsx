
import styles from "@/styles/admin-shared.module.css";

import Filterbar from "@/components/features/admin-filterBar";
import AddBookButton from "@/components/features/admin-add-book-button";
import { createClient } from '@/lib/server';
import type { Book } from '@/types/database';


import BookFormModal from "@/components/features/admin-book-form-modal";
import DeleteBookModal from "@/components/features/admin-delete-book-modal";

import RowActions from "@/components/features/admin-book-row-actions";




interface Props {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    cat?: string;
    edit?: string;
    delete?: string;
  }>;
}
export default async function AdminBooksPage({ searchParams }: Props) {
  
   const supabase = await createClient()
 
 const [{ data, error: error1 }, { data: categories, error: error2 }] = await Promise.all([
  supabase .from('books_with_authors') .select('*').order('title'),
  supabase.from("categories").select("name").order("name"),
 ]);
 
  if (error1 || error2) console.error(error1 || error2);

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
  }  ).sort((a, b) => sort === "rating" ? b.rating - a.rating : a.title.localeCompare(b.title), );

 
  const editingBook = filtered.find((b) => b.book_id === params?.edit) ?? null;
  const deletingBook = filtered.find((b) => b.book_id === params?.delete) ?? null;


  return (
    <><div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Books</h1>
          <p className={styles.pageSub}> {books.length} titles in catalog </p>
        </div>
        <div className={styles.pageActions}> <AddBookButton books={books} /> </div>
      </div>

      <Filterbar cats={cats} />

      <div className={styles.section}>
        <div className={styles.tableWrap}>
        
        {filtered.length === 0 ? 
          ( <p className={styles.emptyState}> No books match your filters. </p> )
          :   (<table className={styles.table}>
          <thead>
            <tr>{["Book", "ISBN", "Category", "Copies", "Rating", ""].map((h) => ( <th key={h}>{h}</th> ))}</tr>
          </thead>
          <tbody>
            {filtered.map((b) => ( 
              <tr key={b.book_id}>
                <td>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-10 w-[30px] shrink-0 rounded shadow-[inset_-2px_0_4px_rgba(0,0,0,0.15)]"
                        style={{ background: b.coverColor }}
                      />
                      <div>
                        <div className="max-w-[150px] truncate font-semibold">
                          {b.title}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {" "}
                          {b.author}{" "}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-[11px] text-muted-foreground">
                    {b.isbn}
                  </td>
                  <td className="text-muted-foreground"> {b.category}</td>
                  <td>
                    <span className="font-semibold">{b.available_copies}</span>
                    <span className="text-muted-foreground">/{b.total_copies}</span>
                  </td>
                  <td>★ {b.rating.toFixed(1)}</td>
                  <td>
                    <RowActions b={b} params={params} />
                  </td>
            </tr> ))}
          </tbody>
        </table>)}
      </div>
      
      </div>
    </div>
    {editingBook && <BookFormModal book={editingBook} params={params} />}
    {deletingBook && <DeleteBookModal book={deletingBook} params={params} />}</>
  );
}
