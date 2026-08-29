"use client";

import React, { useState } from 'react';
import { AlertTriangle, Camera, Mail, Phone, Calendar, Edit3, Check, X } from 'lucide-react';
import { USER_PROFILE } from '@/mock/portalData';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import styles from '@/styles/user-shared.module.css';


export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(USER_PROFILE.name);
  const [phone, setPhone] = useState(USER_PROFILE.phone);
  const [bio, setBio] = useState(USER_PROFILE.bio);

  function handleSave() { setEditing(false); setSaved(true); setTimeout(() => setSaved(false), 2000); }

  const inputStyle: React.CSSProperties = {
    width:'100%', padding:'8px 12px', borderRadius:8, border:'1px solid var(--border)',
    background:'var(--background)', fontFamily:'inherit', fontSize:14, color:'var(--foreground)',
    outline:'none', boxSizing:'border-box',
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>My Profile</h1>
          <p className={styles.pageSub}>Member since {new Date(USER_PROFILE.memberSince).toLocaleDateString('en-US',{month:'long',year:'numeric'})}</p>
        </div>
      </div>

      {saved && <div className={styles.successBanner}><Check size={15}/> Profile updated.</div>}

      <div className={styles.twoCol}>
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Avatar card */}
          <Card>
            <Card.Body style={{ textAlign:'center', padding:'28px 20px' }}>
              <div style={{ position:'relative', display:'inline-block', marginBottom:14 }}>
                <div style={{ width:80, height:80, borderRadius:'50%', background:'linear-gradient(135deg,var(--accent),#818cf8)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:30, fontWeight:800, color:'#fff' }}>
                  {USER_PROFILE.name[0]}
                </div>
                <button style={{ position:'absolute', bottom:0, right:0, width:26, height:26, borderRadius:'50%', background:'var(--card)', border:'2px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                  <Camera size={12} color="var(--muted-foreground)"/>
                </button>
              </div>
              <div style={{ fontSize:17, fontWeight:700, marginBottom:4 }}>{name}</div>
              <div style={{ fontSize:12, color:'var(--muted-foreground)', marginBottom:10 }}>{USER_PROFILE.email}</div>
              <Badge variant="accent">Premium member</Badge>
            </Card.Body>
          </Card>

          {/* Stats */}
          <Card>
            <Card.Header><Card.Title>Reading stats</Card.Title></Card.Header>
            <Card.Body style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {[
                { label:'Total borrowed', value: USER_PROFILE.stats.totalBorrowed },
                { label:'Active', value: USER_PROFILE.stats.active },
                { label:'Returned', value: USER_PROFILE.stats.returned },
                { label:'Achievements', value: USER_PROFILE.stats.achievements },
              ].map(s => (
                <div key={s.label} style={{ textAlign:'center', padding:'12px 8px', borderRadius:8, background:'var(--muted)', border:'1px solid var(--border)' }}>
                  <div style={{ fontSize:20, fontWeight:800, letterSpacing:'-0.04em', marginBottom:2 }}>{s.value}</div>
                  <div style={{ fontSize:11, color:'var(--muted-foreground)', fontWeight:500 }}>{s.label}</div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Info form */}
          <Card>
            <Card.Header>
              <Card.Title>Personal information</Card.Title>
              {!editing ? (
                <Button variant="outline" size="sm" leadingIcon={<Edit3 size={13}/>} onClick={() => setEditing(true)}>Edit</Button>
              ) : (
                <div style={{ display:'flex', gap:6 }}>
                  <Button variant="ghost" size="sm" iconOnly onClick={() => setEditing(false)} aria-label="Cancel"><X size={14}/></Button>
                  <Button variant="primary" size="sm" leadingIcon={<Check size={13}/>} onClick={handleSave}>Save</Button>
                </div>
              )}
            </Card.Header>
            <Card.Body style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {[
                { label:'Full name', value:name, setter:setName, editable:true },
                { label:'Phone', value:phone, setter:setPhone, editable:true },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ fontSize:11, fontWeight:700, color:'var(--muted-foreground)', textTransform:'uppercase', letterSpacing:'0.06em', display:'block', marginBottom:6 }}>{f.label}</label>
                  {editing && f.editable ? (
                    <input value={f.value} onChange={e => f.setter(e.target.value)} style={inputStyle}/>
                  ) : (
                    <div style={{ fontSize:14, fontWeight:500 }}>{f.value}</div>
                  )}
                </div>
              ))}

              <div>
                <label style={{ fontSize:11, fontWeight:700, color:'var(--muted-foreground)', textTransform:'uppercase', letterSpacing:'0.06em', display:'block', marginBottom:6 }}>Email</label>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontSize:14 }}>{USER_PROFILE.email}</span>
                  <Badge variant="success" size="sm">Verified</Badge>
                </div>
              </div>

              <div>
                <label style={{ fontSize:11, fontWeight:700, color:'var(--muted-foreground)', textTransform:'uppercase', letterSpacing:'0.06em', display:'block', marginBottom:6 }}>Bio</label>
                {editing ? (
                  <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} style={{ ...inputStyle, resize:'vertical' }}/>
                ) : (
                  <div style={{ fontSize:13, color:'var(--muted-foreground)', lineHeight:1.6 }}>{bio}</div>
                )}
              </div>

              <div style={{ paddingTop:6, borderTop:'1px solid var(--border)', fontSize:11, color:'var(--muted-foreground)', display:'flex', alignItems:'center', gap:6 }}>
                <Calendar size={12}/> Member since {new Date(USER_PROFILE.memberSince).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}
              </div>
            </Card.Body>
          </Card>

          {/* Danger zone */}
          <Card>
            <Card.Header><Card.Title>Danger zone</Card.Title></Card.Header>
            <Card.Body>
              <div style={{ fontSize:13, color:'var(--muted-foreground)', marginBottom:10, lineHeight:1.6 }}>Account deletion is permanent and cannot be undone. All history and preferences will be removed.</div>
              <Button variant="outline" size="sm" style={{ color:'var(--destructive)', borderColor:'color-mix(in srgb,var(--destructive) 30%,transparent)' } as any}>Delete account</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
