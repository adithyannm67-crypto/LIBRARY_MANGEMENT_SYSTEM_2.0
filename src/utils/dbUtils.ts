import { createClient } from '@/lib/server';

import type { Book } from '@/types/database';

export async function getBookFromDb(id: string) {
     const supabase = await createClient();
    
      // Fetch book
      const { data: bookUntyped, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', id)
        .single()

      if (!bookUntyped || error) {
        throw new Error('Book not found');
      }
        
      const book=bookUntyped as Book

      return book
}

export interface BookCategory {
  category_id: string;
  name: string;
  description: string | null;
  book_count: number | null;
}

/**
 * Resolve the book's category from the `categories` table.
 * Prefers books.category_id; falls back to a name match against books.category.
 * Returns null when no category row exists.
 */
export async function getCategoryForBook(book: Book): Promise<BookCategory | null> {
  const supabase = await createClient();

  const { data: catRef } = await supabase
    .from("books")
    .select("category_id")
    .eq("book_id", book.book_id)
    .maybeSingle();

  const catId = (catRef as { category_id?: string } | null)?.category_id;

  const query = supabase
    .from("categories")
    .select("category_id, name, description, book_count");

  const { data } = catId
    ? await query.eq("category_id", catId).maybeSingle()
    : await query.eq("name", book.category).maybeSingle();

  return (data as BookCategory | null) ?? null;
}