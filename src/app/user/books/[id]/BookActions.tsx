"use client";
import React, { useState } from 'react';
import { Heart, CalendarClock, BookMarked, Share2, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from './BookDetailsPage.module.css';

interface BookActionsProps {
  isAvailable: boolean;
}

export default function BookActions({ isAvailable }: BookActionsProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [borrowed, setBorrowed] = useState(false);
  const [reserved, setReserved] = useState(false);

  if (borrowed) {
    return (
      <div className={`${styles.banner} ${styles.bannerSuccess}`}>
        <CheckCircle size={14}/> Borrowed! Check My Borrows for due date.
      </div>
    );
  }

  if (reserved) {
    return (
      <div className={`${styles.banner} ${styles.bannerWarning}`}>
        <CalendarClock size={14}/> Reserved! We'll notify you when ready.
      </div>
    );
  }

  return (
    <div className={styles.actions}>
      {isAvailable ? (
        <Button variant="primary" size="lg" leadingIcon={<BookMarked size={15}/>} onClick={() => setBorrowed(true)}>Borrow now</Button>
      ) : (
        <Button variant="outline" size="lg" leadingIcon={<CalendarClock size={15}/>} onClick={() => setReserved(true)}>Reserve</Button>
      )}
      <Button variant={wishlisted ? 'accent' : 'outline'} size="lg" iconOnly onClick={() => setWishlisted(v => !v)} aria-label="Wishlist">
        <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'}/>
      </Button>
      <Button variant="ghost" size="lg" iconOnly aria-label="Share"><Share2 size={16}/></Button>
    </div>
  );
}
