'use client';

import { Phone, AlertTriangle } from 'lucide-react';
import styles from './EmergencyBanner.module.css';

const HOTLINES = [
  { name: 'iCall (TISS)', number: '9152987821',    hours: 'Mon–Sat 8 AM–10 PM' },
  { name: 'Vandrevala Foundation', number: '1860-2662-345', hours: '24 × 7' },
  { name: 'Women Helpline (Govt)', number: '181',           hours: '24 × 7' },
];

export default function EmergencyBanner() {
  return (
    <div className={styles.banner} role="alert" aria-live="assertive">
      <div className={styles.bannerInner}>
        <div className={styles.bannerLeft}>
          <span className={styles.pulse} aria-hidden="true" />
          <AlertTriangle size={20} className={styles.alertIcon} />
          <div>
            <p className={styles.bannerTitle}>Emergency Mode Active</p>
            <p className={styles.bannerSub}>Showing priority contacts. Call any helpline below immediately.</p>
          </div>
        </div>
        <div className={styles.hotlines}>
          {HOTLINES.map((h) => (
            <a
              key={h.number}
              href={`tel:${h.number}`}
              className={styles.hotlineChip}
              rel="noopener noreferrer"
              aria-label={`Call ${h.name} at ${h.number}`}
            >
              <Phone size={13} />
              <span className={styles.hotlineName}>{h.name}</span>
              <strong>{h.number}</strong>
              <span className={styles.hotlineHours}>{h.hours}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
