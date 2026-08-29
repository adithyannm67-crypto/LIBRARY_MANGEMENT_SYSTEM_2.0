"use client";

import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, MessageCircle, Phone, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import SearchBar from '@/components/ui/SearchBar';
import styles from '@/styles/user-shared.module.css';

const FAQS = [
  { id:'f1', cat:'Borrowing', q:'How many books can I borrow at once?', a:'Standard members can borrow up to 5 books simultaneously. Premium members have a limit of 10 books. Your current usage is shown on the My Borrows page.' },
  { id:'f2', cat:'Borrowing', q:'How long can I keep a borrowed book?', a:'Standard loan period is 14 days. You can renew a book up to 2 times (extending by 7 days each time) unless another member has reserved it.' },
  { id:'f3', cat:'Borrowing', q:'How do I return a book?', a:'Visit the library desk and present your member card. Books can also be returned through the drop-box outside the library for after-hours returns.' },
  { id:'f4', cat:'Reservations', q:'How do reservations work?', a:'When all copies are checked out, you can join the reservation queue. When a copy becomes available, we notify you and hold it for 3 days.' },
  { id:'f5', cat:'Reservations', q:'Can I cancel a reservation?', a:'Yes, cancel any pending reservation from the Reservations page. Cancelling removes you from the queue immediately.' },
  { id:'f6', cat:'Fines', q:'What are the late return fees?', a:'Overdue books incur $0.25 per day per book. Maximum fine per book is $5.00. Accounts with unpaid fines over $10.00 are suspended until cleared.' },
  { id:'f7', cat:'Account', q:'How do I update my email?', a:'Email changes require verification. Go to Profile > Edit, enter your new email, and confirm via the link sent to both addresses.' },
  { id:'f8', cat:'Account', q:'Can I delete my account?', a:'Yes, from the Profile page. Deletion is permanent — all history and achievements will be removed.' },
];

const CATS = ['All', 'Borrowing', 'Reservations', 'Fines', 'Account'];

export default function HelpPage() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState<string|null>(null);

  const filtered = FAQS.filter(f => {
    const matchCat = cat === 'All' || f.cat === cat;
    const q = query.toLowerCase();
    const matchQ = !query || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Help & Support</h1>
          <p className={styles.pageSub}>Find answers and get in touch</p>
        </div>
      </div>

      {/* Hero */}
      <div style={{ borderRadius:14, background:'linear-gradient(135deg,var(--accent),#818cf8)', padding:'24px 20px', marginBottom:24, textAlign:'center' }}>
        <div style={{ fontSize:17, fontWeight:700, color:'#fff', marginBottom:4 }}>How can we help?</div>
        <div style={{ fontSize:13, color:'rgba(255,255,255,0.75)', marginBottom:14 }}>Search our knowledge base or browse by category</div>
        <div style={{ maxWidth:440, margin:'0 auto' }}>
          <SearchBar value={query} onChange={setQuery} placeholder="Search help articles…"/>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ display:'flex', gap:6, marginBottom:20, flexWrap:'wrap' }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            style={{ padding:'5px 14px', borderRadius:20, border:'1px solid', fontSize:12, fontWeight:500, cursor:'pointer', fontFamily:'inherit',
              background: cat===c?'var(--accent)':'transparent', color:cat===c?'#fff':'var(--muted-foreground)', borderColor:cat===c?'var(--accent)':'var(--border)' }}
          >{c}</button>
        ))}
      </div>

      <div className={styles.twoCol}>
        {/* FAQ accordion */}
        <div>
          <div className={styles.sectionLabel}>Frequently asked questions</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign:'center', padding:'32px 16px', color:'var(--muted-foreground)', fontSize:14 }}>No results. Try a different search.</div>
            ) : filtered.map(f => (
              <div key={f.id} style={{ borderRadius:10, border:`1px solid ${open===f.id?'color-mix(in srgb,var(--accent) 30%,transparent)':'var(--border)'}`, background:'var(--card)', overflow:'hidden' }}>
                <button onClick={() => setOpen(open===f.id?null:f.id)}
                  style={{ width:'100%', padding:'13px 16px', textAlign:'left', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', display:'flex', justifyContent:'space-between', alignItems:'center', gap:10 }}
                >
                  <span style={{ fontSize:14, fontWeight:500, flex:1 }}>{f.q}</span>
                  {open===f.id ? <ChevronUp size={16} color="var(--muted-foreground)"/> : <ChevronDown size={16} color="var(--muted-foreground)"/>}
                </button>
                {open===f.id && <div style={{ padding:'0 16px 14px', fontSize:13, color:'var(--muted-foreground)', lineHeight:1.7 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Contact + Hours */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div className={styles.sectionLabel}>Contact support</div>
          {[
            { icon:<MessageCircle size={18}/>, label:'Live chat', color:'var(--accent)', desc:'Mon–Fri, 9am–6pm EST', action:'Start chat' },
            { icon:<Mail size={18}/>, label:'Email support', color:'var(--success)', desc:'Response within 24 hours', action:'Send email' },
            { icon:<Phone size={18}/>, label:'Phone', color:'var(--warning)', desc:'+1 (800) 555-0123', action:'Call now' },
          ].map(c => (
            <div key={c.label} style={{ padding:14, borderRadius:10, border:'1px solid var(--border)', background:'var(--card)', display:'flex', alignItems:'flex-start', gap:12 }}>
              <div style={{ width:36, height:36, borderRadius:10, flexShrink:0, background:`color-mix(in srgb,${c.color} 12%,transparent)`, display:'flex', alignItems:'center', justifyContent:'center', color:c.color }}>{c.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600, marginBottom:2 }}>{c.label}</div>
                <div style={{ fontSize:12, color:'var(--muted-foreground)', marginBottom:8 }}>{c.desc}</div>
                <Button variant="outline" size="sm">{c.action}</Button>
              </div>
            </div>
          ))}

          <div className={styles.miniCard}>
            <div style={{ fontSize:13, fontWeight:600, marginBottom:10 }}>Library hours</div>
            {[
              { day:'Mon – Fri', hours:'8:00 AM – 8:00 PM' },
              { day:'Saturday', hours:'9:00 AM – 5:00 PM' },
              { day:'Sunday', hours:'12:00 PM – 4:00 PM' },
            ].map(h => (
              <div key={h.day} style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:6, color:'var(--muted-foreground)' }}>
                <span>{h.day}</span>
                <span style={{ fontWeight:500, color:'var(--foreground)' }}>{h.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
