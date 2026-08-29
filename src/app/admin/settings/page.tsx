"use client"
import  { useState } from 'react';
import { AlertTriangle, Save } from 'lucide-react';

import Button from '@/components/ui/Button';
import styles from "@/styles/admin-shared.module.css";



export function AdminSettingsLoading() {
  return <div className={styles.page}><div className={styles.skeleton}/></div>;
}
export function AdminSettingsError({ onRetry }: { onRetry: () => void }) {
  return <div className={styles.page}><div className={styles.errorState}><AlertTriangle size={28} color="var(--destructive)"/><button onClick={onRetry} style={{fontSize:13,cursor:'pointer',background:'none',border:'1px solid var(--border)',borderRadius:6,padding:'6px 14px',fontFamily:'inherit'}}>Retry</button></div></div>;
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div onClick={onChange} style={{ width:36, height:20, borderRadius:10, background: checked ? 'var(--accent)' : 'var(--border)', cursor:'pointer', position:'relative', transition:'background 150ms', flexShrink:0 }}>
      <div style={{ position:'absolute', top:3, left: checked ? 18 : 3, width:14, height:14, borderRadius:'50%', background:'#fff', transition:'left 150ms', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }}/>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [loanDays, setLoanDays]     = useState('14');
  const [maxLoans, setMaxLoans]     = useState('5');
  const [maxRenews, setMaxRenews]   = useState('2');
  const [renewDays, setRenewDays]   = useState('7');
  const [holdDays, setHoldDays]     = useState('3');
  const [fineRate, setFineRate]     = useState('0.25');
  const [maxFine, setMaxFine]       = useState('5.00');
  const [autoOverdue, setAutoOverdue] = useState(true);
  const [autoNotify, setAutoNotify]   = useState(true);
  const [selfRenew, setSelfRenew]     = useState(true);
  const [waitlistNotify, setWaitlistNotify] = useState(true);
  const [libraryName, setLibraryName] = useState('LibraryOS');
  const [libraryEmail, setLibraryEmail] = useState('admin@library.dev');
  const [timezone, setTimezone] = useState('America/New_York');

  const QUICK_SETTINGS=[
              { l:'Loan period (days)', v:loanDays, s:setLoanDays, d:'Standard loan duration per book' },
              { l:'Max active loans', v:maxLoans, s:setMaxLoans, d:'Per standard member' },
              { l:'Max renewals', v:maxRenews, s:setMaxRenews, d:'Renewals allowed per loan' },
              { l:'Renewal period (days)', v:renewDays, s:setRenewDays, d:'Days added per renewal' },
              { l:'Hold expiry (days)', v:holdDays, s:setHoldDays, d:'Days to pick up a reservation' },
            ]

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Settings</h1>
          <p className={styles.pageSub}>System configuration and library policies</p>
        </div>
        <div className={styles.pageActions}>
          <Button variant="primary" size="sm" leadingIcon={<Save size={14}/>}>Save Changes</Button>
        </div>
      </div>

      <div className={styles.twoCol}>
        {/* Loan policies */}
        <div className={styles.section}>
          <div className={styles.sectionHead}><span className={styles.sectionTitle}>Loan Policies</span></div>
          <div className={styles.sectionBody}>
            {QUICK_SETTINGS.map(row => (
              <div key={row.l} className={styles.formRow}>
                <div>
                  <div className={styles.formLabel}>{row.l}</div>
                  <div className={styles.formDesc}>{row.d}</div>
                </div>
                <input type="number" className={styles.formInput} value={row.v} onChange={e => row.s(e.target.value)} style={{ maxWidth:80, textAlign:'center' }}/>
              </div>
            ))}
          </div>
        </div>

        {/* Fine settings */}
        <div className={styles.section}>
          <div className={styles.sectionHead}><span className={styles.sectionTitle}>Fines & Fees</span></div>
          <div className={styles.sectionBody}>
            {[
              { l:'Daily fine rate ($)', v:fineRate, s:setFineRate, d:'Charged per day per overdue book' },
              { l:'Maximum fine per book ($)', v:maxFine, s:setMaxFine, d:'Fine cap per individual book' },
            ].map(row => (
              <div key={row.l} className={styles.formRow}>
                <div>
                  <div className={styles.formLabel}>{row.l}</div>
                  <div className={styles.formDesc}>{row.d}</div>
                </div>
                <input type="number" step="0.01" className={styles.formInput} value={row.v} onChange={e => row.s(e.target.value)} style={{ maxWidth:80, textAlign:'center' }}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.twoCol}>
        {/* Automation */}
        <div className={styles.section}>
          <div className={styles.sectionHead}><span className={styles.sectionTitle}>Automation</span></div>
          <div className={styles.sectionBody}>
            {[
              { l:'Auto overdue notices', d:'Send email when loan is past due', v:autoOverdue, s:() => setAutoOverdue(v => !v) },
              { l:'Auto return notifications', d:'Notify when a reservation is ready', v:autoNotify, s:() => setAutoNotify(v => !v) },
              { l:'Member self-renewal', d:'Allow members to renew via portal', v:selfRenew, s:() => setSelfRenew(v => !v) },
              { l:'Waitlist notifications', d:'Notify next in queue when available', v:waitlistNotify, s:() => setWaitlistNotify(v => !v) },
            ].map(row => (
              <div key={row.l} className={styles.formRow}>
                <div style={{ flex:1 }}>
                  <div className={styles.formLabel}>{row.l}</div>
                  <div className={styles.formDesc}>{row.d}</div>
                </div>
                <Toggle checked={row.v} onChange={row.s}/>
              </div>
            ))}
          </div>
        </div>

        {/* Library info */}
        <div className={styles.section}>
          <div className={styles.sectionHead}><span className={styles.sectionTitle}>Library Information</span></div>
          <div className={styles.sectionBody}>
            <div className={styles.formRow}>
              <div><div className={styles.formLabel}>Library name</div></div>
              <input className={styles.formInput} value={libraryName} onChange={e => setLibraryName(e.target.value)}/>
            </div>
            <div className={styles.formRow}>
              <div><div className={styles.formLabel}>Admin email</div></div>
              <input className={styles.formInput} type="email" value={libraryEmail} onChange={e => setLibraryEmail(e.target.value)}/>
            </div>
            <div className={styles.formRow}>
              <div><div className={styles.formLabel}>Timezone</div></div>
              <select className={styles.formInput} value={timezone} onChange={e => setTimezone(e.target.value)}>
                <option value="America/New_York">Eastern (UTC-5)</option>
                <option value="America/Chicago">Central (UTC-6)</option>
                <option value="America/Denver">Mountain (UTC-7)</option>
                <option value="America/Los_Angeles">Pacific (UTC-8)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className={styles.section} style={{ border:'1px solid color-mix(in srgb,var(--destructive) 30%,transparent)' }}>
        <div className={styles.sectionHead} style={{ borderColor:'color-mix(in srgb,var(--destructive) 20%,transparent)' }}>
          <span className={styles.sectionTitle} style={{ color:'var(--destructive)' }}>Danger Zone</span>
        </div>
        <div className={styles.sectionBody}>
          {[
            { l:'Purge overdue fines', d:'Clear all outstanding fines across all members' },
            { l:'Reset catalog', d:'Remove all books and inventory records — irreversible' },
            { l:'Export all data', d:'Download full database as JSON archive' },
          ].map(row => (
            <div key={row.l} className={styles.formRow}>
              <div style={{ flex:1 }}>
                <div className={styles.formLabel}>{row.l}</div>
                <div className={styles.formDesc}>{row.d}</div>
              </div>
              <Button variant="destructive" size="sm">
                {row.l.startsWith('Export') ? 'Export' : 'Execute'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
