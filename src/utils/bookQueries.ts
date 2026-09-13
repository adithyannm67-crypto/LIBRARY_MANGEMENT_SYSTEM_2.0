import { cache } from "react";
import { createClient } from "@/lib/server";
import type { Book } from "@/types/database";
import { getCategoryForBook, type BookCategory } from "@/utils/dbUtils";

export const getBook = cache(async (bookId: string): Promise<Book | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("books_with_authors")
    .select("*")
    .eq("book_id", bookId)
    .single<Book>();
  if (error) console.error(error);
  return data ?? null;
});

export const getBookCategory = cache(
  async (book: Book): Promise<BookCategory | null> => getCategoryForBook(book),
);