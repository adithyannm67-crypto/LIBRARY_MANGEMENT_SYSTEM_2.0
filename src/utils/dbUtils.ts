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