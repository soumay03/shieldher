'use client';

import type { Psychiatrist, NGO } from '@/lib/support-types';
import {
  MapPin,
  Phone,
  Star,
  Clock,
  Globe,
  BadgeCheck,
  Zap,
  Mail,
} from 'lucide-react';
import styles from './ProfessionalCard.module.css';

// ── Availability helpers ──────────────────────────────────────────────────────

function AvailabilityBadge({ status }: { status: Psychiatrist['availability'] }) {
  const map: Record<Psychiatrist['availability'], { label: string; cls: string }> = {
    available: { label: 'Available', cls: styles.availAvailable },
    busy:      { label: 'Busy',      cls: styles.availBusy },
    offline:   { label: 'Offline',   cls: styles.availOffline },
  };
  const { label, cls } = map[status];
  return (
    <span className={`${styles.availBadge} ${cls}`}>
      <span className={styles.availDot} />
      {label}
    </span>
  );
}

// ── Psychiatrist Card ─────────────────────────────────────────────────────────

interface PsyCardProps {
  data: Psychiatrist;
}

export function PsychiatristCard({ data }: PsyCardProps) {
  const initials = data.name
    .split(' ')
    .slice(1, 3)
    .map((w) => w[0])
    .join('');

  return (
    <article className={`${styles.card} ${data.isEmergency ? styles.cardEmergency : ''}`}>
      {data.isEmergency && (
        <div className={styles.emergencyRibbon} aria-label="Emergency contact available">
          <Zap size={11} />
          Emergency
        </div>
      )}

      <div className={styles.cardTop}>
        <div className={styles.avatar} aria-hidden="true">
          {initials}
        </div>
        <div className={styles.cardTopInfo}>
          <h3 className={styles.name}>{data.name}</h3>
          <p className={styles.title}>{data.title}</p>
          <AvailabilityBadge status={data.availability} />
        </div>
      </div>

      <div className={styles.tags}>
        {data.specializations.map((s) => (
          <span key={s} className={styles.tag}>{s}</span>
        ))}
      </div>

      <div className={styles.metaList}>
        <div className={styles.metaItem}>
          <MapPin size={14} className={styles.metaIcon} />
          <span>{data.location}</span>
        </div>
        <div className={styles.metaItem}>
          <Clock size={14} className={styles.metaIcon} />
          <span>Next: {data.nextSlot}</span>
        </div>
        <div className={styles.metaItem}>
          <Star size={14} className={`${styles.metaIcon} ${styles.starIcon}`} />
          <span>{data.rating} <span className={styles.metaDim}>({data.reviewCount} reviews)</span></span>
        </div>
      </div>

      <div className={styles.languages}>
        {data.languages.map((l) => (
          <span key={l} className={styles.langPill}>{l}</span>
        ))}
      </div>

      <div className={styles.cardActions}>
        <a
          href={`tel:${data.phone}`}
          className={styles.connectBtn}
          rel="noopener noreferrer"
          aria-label={`Call ${data.name}`}
        >
          <Phone size={15} />
          Connect Now
        </a>
        <a
          href={`mailto:${data.email}`}
          className={styles.emailBtn}
          rel="noopener noreferrer"
          aria-label={`Email ${data.name}`}
        >
          <Mail size={15} />
        </a>
      </div>
    </article>
  );
}

// ── NGO Card ─────────────────────────────────────────────────────────────────

interface NGOCardProps {
  data: NGO;
}

export function NGOCard({ data }: NGOCardProps) {
  const initials = data.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  return (
    <article className={`${styles.card} ${styles.cardNGO} ${data.isEmergency ? styles.cardEmergency : ''}`}>
      {data.isEmergency && (
        <div className={styles.emergencyRibbon} aria-label="24/7 emergency contact">
          <Zap size={11} />
          24/7
        </div>
      )}

      <div className={styles.cardTop}>
        <div className={`${styles.avatar} ${styles.avatarNgo}`} aria-hidden="true">
          {initials}
        </div>
        <div className={styles.cardTopInfo}>
          <div className={styles.nameRow}>
            <h3 className={styles.name}>{data.name}</h3>
            {data.isVerified && (
              <span className={styles.verifiedBadge} title="Verified NGO">
                <BadgeCheck size={16} />
                Verified
              </span>
            )}
          </div>
          <p className={styles.tagline}>{data.tagline}</p>
        </div>
      </div>

      <div className={styles.metaList}>
        <div className={styles.metaItem}>
          <MapPin size={14} className={styles.metaIcon} />
          <span>{data.location}{data.distance ? ` · ${data.distance}` : ''}</span>
        </div>
        <div className={styles.metaItem}>
          <Clock size={14} className={styles.metaIcon} />
          <span>{data.operatingHours}</span>
        </div>
      </div>

      <div className={styles.services}>
        {data.services.slice(0, 4).map((s) => (
          <span key={s} className={styles.serviceTag}>{s}</span>
        ))}
      </div>

      <div className={styles.cardActions}>
        <a
          href={`tel:${data.contactPhone}`}
          className={styles.connectBtn}
          rel="noopener noreferrer"
          aria-label={`Call ${data.name}`}
        >
          <Phone size={15} />
          Contact Now
        </a>
        {data.website && (
          <a
            href={data.website}
            className={styles.websiteBtn}
            rel="noopener noreferrer"
            target="_blank"
            aria-label={`Visit ${data.name} website`}
          >
            <Globe size={15} />
          </a>
        )}
      </div>
    </article>
  );
}
