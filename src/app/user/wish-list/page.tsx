"use client";

import React, { useState } from 'react';
import { Heart, AlertTriangle, BookMarked, CalendarClock, Trash2 } from 'lucide-react';
import { WISHLIST, getBook, fmtDateShort } from '@/styles/mock/portalData';

import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import styles from '@/styles/user-shared.module.css';

import { USER_SIDEBAR_INITIAL_LINK } from '@/constants/user-sidebar-constants';

import Link from 'next/link';




export default function WishlistPage() {
  const [items, setItems] = useState(WISHLIST);
  function remove(id: string) { setItems(prev => prev.filter(w => w.id !== id)); }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Wishlist</h1>
          <p className={styles.pageSub}>{items.length} saved book{items.length!==1?'s':''}</p>
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={<Heart size={22}/>}
          title="Your wishlist is empty"
          description="Save books you want to read by tapping the heart icon on any book."
          actions={<Button variant="primary" size="sm" navigateTo={USER_SIDEBAR_INITIAL_LINK["books"]}>Browse catalog</Button>}
        />
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:14 }}>
          {items.map(item => {
            const book = getBook(item.bookId);
            if (!book) return null;
            const avail = book.availableCopies > 0;
            return (
              <div key={item.id} style={{ borderRadius:12, border:'1px solid var(--border)', background:'var(--card)', overflow:'hidden', display:'flex', flexDirection:'column' }}>
                <Link href={`/user/books/${book.id}`}  style={{ background:'none', border:'none', cursor:'pointer', padding:0, display:'block', width:'100%' }}>
                  <div style={{ height:110, background:`linear-gradient(135deg,${book.coverColor},${book.coverAccent})`, position:'relative' }}>
                    <Badge variant={avail?'success':'outline'} style={{ position:'absolute', bottom:8, left:8 } as any}>
                      {avail?`${book.availableCopies} available`:'Unavailable'}
                    </Badge>
                  </div>
                </Link>
                <div style={{ padding:'10px 12px', flex:1, display:'flex', flexDirection:'column', gap:3 }}>
                  <div style={{ fontSize:10, fontWeight:700, color:'var(--accent)', textTransform:'uppercase', letterSpacing:'0.07em' }}>{book.category}</div>
                  <Link href={`/user/books/${book.id}`} style={{ background:'none', border:'none', cursor:'pointer', padding:0, fontFamily:'inherit', textAlign:'left', fontSize:13, fontWeight:700, lineHeight:1.3 }}>{book.title}</Link>
                  <div style={{ fontSize:11, color:'var(--muted-foreground)' }}>by {book.author}</div>
                  <div style={{ fontSize:11, color:'var(--muted-foreground)', marginTop:'auto', paddingTop:6 }}>Saved {fmtDateShort(item.addedAt)}</div>
                </div>
                <div style={{ padding:'8px 12px', borderTop:'1px solid var(--border)', display:'flex', gap:6 }}>
                  <Button
                    variant={avail?'primary':'outline'} size="sm" style={{ flex:1 } as any}
                    leadingIcon={avail?<BookMarked size={13}/>:<CalendarClock size={13}/>}
                    
                    navigateTo={`/user/books/${book.id}`}
                  >
                    {avail?'Borrow':'Reserve'}
                  </Button>
                  <Button variant="ghost" size="sm" iconOnly onClick={() => remove(item.id)} aria-label="Remove" style={{ color:'var(--muted-foreground)' } as any}>
                    <Trash2 size={14}/>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
