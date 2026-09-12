import { notFound } from 'next/navigation';

import {
  ArrowLeft, Star, BookOpen, Calendar, Globe, Hash, Building,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import BookCard from '@/components/features/BookCard';
import styles from './BookDetailsPage.module.css';
import { createClient } from '@/lib/server';
import type { Book, Review } from '@/types/database';
import BookActions from './BookActions';


interface Props {
  params: Promise<{ id: string }>;
}

export default async function BookDetailsPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch book
  const { data: bookUntyped, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', id)
    .single()
    
  const book=bookUntyped as Book
    
  if (!book || error) {
    notFound();
  }

  // Fetch related books (same category, excluding current)
  const { data: relatedUntyped } = await supabase
    .from('books')
    .select('*')
    .eq('category', book.category)
    .neq('id', id)
    .limit(3)

  const related = relatedUntyped as Book[]

  // Fetch reviews for this book
  const { data: reviewsUntyped } = await supabase
    .from('reviews')
    .select('*')
    .eq('book_id', id)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(10)

  const reviews = (reviewsUntyped ?? []) as Review[];
  return (
    <div className={styles.page}>
      <Button isBackButton className={styles.back}>
        <ArrowLeft size={14}/> Back to catalog
      </Button>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.cover} style={{ background:`linear-gradient(160deg,${book.coverColor},${book.coverAccent})` }}>
          <div className={styles.spine}/>
          {book.isBestseller && <Badge variant="warning" className={styles.b1}>Bestseller</Badge>}
          {book.isNew && <Badge variant="accent" className={book.isBestseller ? styles.b2 : styles.b1}>New</Badge>}
        </div>

        <div className={styles.info}>
          <div className={styles.cat}>{book.category} · {book.subcategory}</div>
          <h1 className={styles.title}>{book.title}</h1>
          <div className={styles.author}>by {book.author}</div>

          <div className={styles.ratingRow}>
            {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i<=Math.round(book.rating)?'#F59E0B':'transparent'} color="#F59E0B"/>)}
            <span style={{ fontWeight:600, fontSize:14 }}>{book.rating}</span>
            <span style={{ fontSize:12, color:'var(--muted-foreground)' }}>({book.reviewCount.toLocaleString()} reviews)</span>
          </div>

          {/* Interactive actions — only this part is a client component */}
          <BookActions isAvailable={book.availableCopies > 0} />

          {/* Metadata — pure server render */}
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

      {/* Body — all server-rendered */}
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
            {reviews.length === 0 ? (
              <p style={{ fontSize:13, color:'var(--muted-foreground)', textAlign:'center', padding:'16px 0' }}>No reviews yet. Be the first!</p>
            ) : reviews.map(r => (
              <div key={r.id} style={{ paddingBottom:14, borderBottom:'1px solid var(--border)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:28, height:28, borderRadius:'50%', background:'var(--muted)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700 }}>{r.member_name[0]}</div>
                    <span style={{ fontSize:13, fontWeight:600 }}>{r.member_name}</span>
                  </div>
                  <div style={{ display:'flex', gap:2 }}>
                    {[1,2,3,4,5].map(i => <Star key={i} size={11} fill={i<=r.rating?'#F59E0B':'transparent'} color="#F59E0B"/>)}
                  </div>
                </div>
                <p style={{ fontSize:13, color:'var(--muted-foreground)', lineHeight:1.6, margin:'0 0 4px' }}>{r.content}</p>
                <span style={{ fontSize:11, color:'var(--muted-foreground)' }}>{new Date(r.created_at).toLocaleDateString('en-US', { month:'short', year:'numeric' })}</span>
              </div>
            ))}
          </Card.Body>
        </Card>

        {(related ?? []).length > 0 && (
          <div>
            <div className={styles.relatedTitle}>More in {book.category}</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px,1fr))', gap:14 }}>
              {related!.map(b => <BookCard key={b.id} book={b}/>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
