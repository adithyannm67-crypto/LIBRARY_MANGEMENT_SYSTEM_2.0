"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Star, BookOpen, Calendar, Globe, Hash, Building,
  Heart, CalendarClock, BookMarked, Share2, AlertTriangle, CheckCircle,
} from 'lucide-react';
import { getBook, BOOKS, LOANS, WISHLIST, fmtDateShort } from '@/mock/portalData';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import BookCard from '@/components/features/BookCard';
import styles from './BookDetailsPage.module.css';

import { useParams } from 'next/navigation';

interface Props { bookId: string;  }

const MOCK_REVIEWS = [
  { name:'Maya R.', rating:5, text:'An absolute must-read. Dense, practical, and timeless.', date:'Mar 2026' },
  { name:'James T.', rating:4, text:'Excellent real-world coverage. Some chapters feel dated but core ideas hold.', date:'Jan 2026' },
  { name:'Priya K.', rating:5, text:'Changed how I approach every coding session. Cannot recommend enough.', date:'Nov 2025' },
];


import { useRouter } from 'next/navigation';

export default function BookDetailsPage() {

  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const bookId = id

  const book = getBook(bookId);
  const [wishlisted, setWishlisted] = useState(() => WISHLIST.some(w => w.bookId === bookId));
  const [borrowed, setBorrowed] = useState(false);
  const [reserved, setReserved] = useState(false);
  const activeLoad = LOANS.find(l => l.bookId === bookId && l.status !== 'returned');
  const isAvailable = book ? book.availableCopies > 0 : false;
  const related = book ? BOOKS.filter(b => b.id !== bookId && b.category === book.category).slice(0,3) : [];

  if (!book) throw new Error(`Book with ID ${bookId} not found`);

  return (
    <div className={styles.page}>
      <button onClick={router.back} className={styles.back}>
        <ArrowLeft size={14}/> Back to catalog
      </button>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.cover} style={{ background:`linear-gradient(160deg,${book.coverColor},${book.coverAccent})` }}>
          <div className={styles.spine}/>
          {book.isBestseller && <Badge variant="warning" className={styles.b1}>Bestseller</Badge>}
          {book.isNew && <Badge variant="accent" className={book.isBestseller ? styles.b2 : styles.b1}>New</Badge>}
        </div>

        <div className={styles.info}>
          <div className={styles.cat}>
            {typeof book.category === 'string' ? book.category: book.category.name} · {book.subcategory}</div>
          <h1 className={styles.title}>{book.title}</h1>
          <div className={styles.author}>by {book.author}</div>

          <div className={styles.ratingRow}>
            {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i<=Math.round(book.rating)?'#F59E0B':'transparent'} color="#F59E0B"/>)}
            <span style={{ fontWeight:600, fontSize:14 }}>{book.rating}</span>
            <span style={{ fontSize:12, color:'var(--muted-foreground)' }}>({book.reviewCount.toLocaleString()} reviews)</span>
          </div>

          {/* Status */}
          {activeLoad ? (
            <div className={`${styles.banner} ${styles.bannerAccent}`}>
              <CheckCircle size={14}/> You have this checked out · Due {fmtDateShort(activeLoad.dueAt)}
            </div>
          ) : borrowed ? (
            <div className={`${styles.banner} ${styles.bannerSuccess}`}>
              <CheckCircle size={14}/> Borrowed! Check My Borrows for due date.
            </div>
          ) : reserved ? (
            <div className={`${styles.banner} ${styles.bannerWarning}`}>
              <CalendarClock size={14}/> Reserved! We'll notify you when ready.
            </div>
          ) : (
            <div className={styles.avail} style={{ color: isAvailable ? 'var(--success)' : 'var(--destructive)' }}>
              {isAvailable ? `${book.availableCopies} of ${book.totalCopies} copies available` : `All ${book.totalCopies} copies checked out`}
            </div>
          )}

          {/* Actions */}
          {!activeLoad && !borrowed && !reserved && (
            <div className={styles.actions}>
              {isAvailable ? (
                <Button variant="primary" size="lg" leadingIcon={<BookMarked size={15}/>} onClick={() => setBorrowed(true)}>Borrow now</Button>
              ) : (
                <Button variant="outline" size="lg" leadingIcon={<CalendarClock size={15}/>} onClick={() => setReserved(true)}>Reserve</Button>
              )}
              <Button variant={wishlisted?'accent':'outline'} size="lg" iconOnly onClick={() => setWishlisted(v=>!v)} aria-label="Wishlist">
                <Heart size={16} fill={wishlisted?'currentColor':'none'}/>
              </Button>
              <Button variant="ghost" size="lg" iconOnly aria-label="Share"><Share2 size={16}/></Button>
            </div>
          )}

          {/* Metadata */}
          <div className={styles.meta}>
            {[
              { icon:<Calendar size={13}/>, label:'Published', value:String(book.publishedYear) },
              { icon:<BookOpen size={13}/>, label:'Pages', value:book.pages.toLocaleString() },
              { icon:<Globe size={13}/>, label:'Language', value:book.language },
              { icon:<Building size={13}/>, label:'Publisher', value:book.publisher },
              { icon:<Hash size={13}/>, label:'ISBN', value:book.isbn },
            ].map(m => (
              <div key={m.label} className={styles.metaItem}>
                <span style={{ color:'var(--muted-foreground)' }}>{m.icon}</span>
                <div>
                  <div style={{ fontSize:10, color:'var(--muted-foreground)', marginBottom:1 }}>{m.label}</div>
                  <div style={{ fontSize:12, fontWeight:500 }}>{m.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <Card>
          <Card.Header><Card.Title>About this book</Card.Title></Card.Header>
          <Card.Body>
            <p style={{ fontSize:14, lineHeight:1.7, margin:0 }}>{book.description}</p>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:14 }}>
              {book.tags.map(t => <Badge key={t} variant="outline">#{t}</Badge>)}
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <div>
              <Card.Title>Reader reviews</Card.Title>
              <Card.Description>{book.reviewCount.toLocaleString()} reviews · {book.rating} average</Card.Description>
            </div>
          </Card.Header>
          <Card.Body style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {MOCK_REVIEWS.map(r => (
              <div key={r.name} style={{ paddingBottom:14, borderBottom:'1px solid var(--border)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:28, height:28, borderRadius:'50%', background:'var(--muted)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700 }}>{r.name[0]}</div>
                    <span style={{ fontSize:13, fontWeight:600 }}>{r.name}</span>
                  </div>
                  <div style={{ display:'flex', gap:2 }}>
                    {[1,2,3,4,5].map(i => <Star key={i} size={11} fill={i<=r.rating?'#F59E0B':'transparent'} color="#F59E0B"/>)}
                  </div>
                </div>
                <p style={{ fontSize:13, color:'var(--muted-foreground)', lineHeight:1.6, margin:'0 0 4px' }}>{r.text}</p>
                <span style={{ fontSize:11, color:'var(--muted-foreground)' }}>{r.date}</span>
              </div>
            ))}
          </Card.Body>
        </Card>

        {related.length > 0 && (
          <div>
            <div className={styles.relatedTitle}>More in {typeof book.category === 'string' ? book.category: book.category.name}</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px,1fr))', gap:14 }}>
              {related.map(b => <BookCard key={b.id} book={b}/>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
