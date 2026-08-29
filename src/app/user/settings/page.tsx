"use client";

import React, { useState , useEffect} from 'react';
import { AlertTriangle, Moon, Sun, Bell, Lock, Globe, ChevronRight, Check } from 'lucide-react';

import { useTheme } from "next-themes";
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import styles from '@/styles/user-shared.module.css';

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle} role="switch" aria-checked={on}
      className={styles.toggle}
      style={{ background: on ? 'var(--accent)' : 'var(--border)' }}
    >
      <div className={styles.toggleKnob} style={{ left: on ? 19 : 2 }}/>
    </button>
  );
}

function SettingRow({ label, description, on, onToggle }: { label:string; description?:string; on:boolean; onToggle:()=>void }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'12px 0', borderBottom:'1px solid var(--border)' }}>
      <div>
        <div style={{ fontSize:14, fontWeight:500 }}>{label}</div>
        {description && <div style={{ fontSize:12, color:'var(--muted-foreground)', marginTop:2 }}>{description}</div>}
      </div>
      <Toggle on={on} onToggle={onToggle}/>
    </div>
  );
}

export default function SettingsPage() {

  
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({ dueSoon:true, overdue:true, resReady:true, newArrivals:false, newsletter:false });
  const [privacy, setPrivacy] = useState({ publicProfile:true, showActivity:false });

  function save() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

   const { resolvedTheme, setTheme } = useTheme();


  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };
  
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Settings</h1>
          <p className={styles.pageSub}>Manage your preferences</p>
        </div>
        <Button variant="primary" size="sm" leadingIcon={saved?<Check size={13}/>:undefined} onClick={save}>
          {saved ? 'Saved!' : 'Save changes'}
        </Button>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:16, maxWidth:660 }}>
        {/* Appearance */}
        <Card>
          <Card.Header>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              {isDark?<Moon size={15}/>:<Sun size={15}/>}
              <Card.Title>Appearance</Card.Title>
            </div>
          </Card.Header>
          <Card.Body>
            <div style={{ display:'flex', gap:10 }}>
              {[{id:'light',label:'Light',icon:<Sun size={16}/>},{id:'dark',label:'Dark',icon:<Moon size={16}/>},{id:'system',label:'System',icon:<Globe size={16}/>}].map(opt => {
                const active = opt.id === (isDark?'dark':'light');
                return (
                  <button key={opt.id} onClick={opt.id!=='system'?toggleTheme:undefined}
                    style={{ flex:1, padding:'12px 8px', borderRadius:10, cursor:'pointer', border:`1.5px solid ${active?'var(--accent)':'var(--border)'}`, background:active?'color-mix(in srgb,var(--accent) 8%,transparent)':'transparent', display:'flex', flexDirection:'column', alignItems:'center', gap:6, color:active?'var(--accent)':'var(--muted-foreground)', fontFamily:'inherit' }}
                  >
                    {opt.icon}
                    <span style={{ fontSize:12, fontWeight:500 }}>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </Card.Body>
        </Card>

        {/* Notifications */}
        <Card>
          <Card.Header><div style={{ display:'flex', alignItems:'center', gap:8 }}><Bell size={15}/><Card.Title>Notifications</Card.Title></div></Card.Header>
          <Card.Body>
            <SettingRow label="Due-soon reminders" description="3 days before a book is due" on={notifs.dueSoon} onToggle={() => setNotifs(p=>({...p,dueSoon:!p.dueSoon}))}/>
            <SettingRow label="Overdue alerts" description="Immediately when a book is overdue" on={notifs.overdue} onToggle={() => setNotifs(p=>({...p,overdue:!p.overdue}))}/>
            <SettingRow label="Reservation ready" description="When a reserved book is available" on={notifs.resReady} onToggle={() => setNotifs(p=>({...p,resReady:!p.resReady}))}/>
            <SettingRow label="New arrivals" description="Weekly digest of new catalog additions" on={notifs.newArrivals} onToggle={() => setNotifs(p=>({...p,newArrivals:!p.newArrivals}))}/>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'12px 0' }}>
              <div>
                <div style={{ fontSize:14, fontWeight:500 }}>Newsletter</div>
                <div style={{ fontSize:12, color:'var(--muted-foreground)', marginTop:2 }}>Monthly reading tips and recommendations</div>
              </div>
              <Toggle on={notifs.newsletter} onToggle={() => setNotifs(p=>({...p,newsletter:!p.newsletter}))}/>
            </div>
          </Card.Body>
        </Card>

        {/* Privacy */}
        <Card>
          <Card.Header><div style={{ display:'flex', alignItems:'center', gap:8 }}><Globe size={15}/><Card.Title>Privacy</Card.Title></div></Card.Header>
          <Card.Body>
            <SettingRow label="Public profile" description="Allow members to see your reading stats" on={privacy.publicProfile} onToggle={() => setPrivacy(p=>({...p,publicProfile:!p.publicProfile}))}/>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'12px 0' }}>
              <div>
                <div style={{ fontSize:14, fontWeight:500 }}>Show reading activity</div>
                <div style={{ fontSize:12, color:'var(--muted-foreground)', marginTop:2 }}>Let friends see what you are reading</div>
              </div>
              <Toggle on={privacy.showActivity} onToggle={() => setPrivacy(p=>({...p,showActivity:!p.showActivity}))}/>
            </div>
          </Card.Body>
        </Card>

        {/* Security */}
        <Card>
          <Card.Header><div style={{ display:'flex', alignItems:'center', gap:8 }}><Lock size={15}/><Card.Title>Security</Card.Title></div></Card.Header>
          <Card.Body style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {[
              { label:'Change password', desc:'Update your account password' },
              { label:'Two-factor authentication', desc:'Add an extra layer of security', badge:'Recommended' },
              { label:'Active sessions', desc:'Manage where you are signed in' },
            ].map(item => (
              <button key={item.label} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', borderRadius:10, border:'1px solid var(--border)', background:'var(--background)', cursor:'pointer', textAlign:'left', fontFamily:'inherit' }}>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:14, fontWeight:500 }}>{item.label}</span>
                    {(item as any).badge && <span style={{ fontSize:10, fontWeight:600, padding:'2px 6px', borderRadius:4, background:'color-mix(in srgb,var(--accent) 15%,transparent)', color:'var(--accent)' }}>{(item as any).badge}</span>}
                  </div>
                  <div style={{ fontSize:12, color:'var(--muted-foreground)', marginTop:2 }}>{item.desc}</div>
                </div>
                <ChevronRight size={16} color="var(--muted-foreground)"/>
              </button>
            ))}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
