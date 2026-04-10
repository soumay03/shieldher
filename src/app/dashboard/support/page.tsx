'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  HeartHandshake,
  Search,
  MapPin,
  Phone,
  Globe,
  BadgeCheck,
  Zap,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Mail,
  Plus,
  Star,
  Clock,
} from 'lucide-react';
import type { SupportCategory, SupportFilter } from '@/lib/support-types';
import { getPsychiatrists, getNGOs, ALL_CITIES } from '@/lib/support-data';
import type { Psychiatrist, NGO } from '@/lib/support-types';
import EmergencyBanner from '@/components/support/EmergencyBanner';
import QuickExitButton from '@/components/support/QuickExitButton';
import styles from './page.module.css';

const DEBOUNCE_MS = 320;

// ── City tabs (ordered by population / relevance) ───────────────────────────
const CITY_TABS = ['All', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'] as const;
type CityTab = (typeof CITY_TABS)[number];

// ── Top-level tabs ───────────────────────────────────────────────────────────
type Section = 'psychiatrists' | 'ngos';

// ── Helper: initials ─────────────────────────────────────────────────────────
function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  if (parts.length === 0) return 'SH';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
}

// ── Tone cycle (matches lawyers palette) ─────────────────────────────────────
const TONES = [styles.tone1, styles.tone2, styles.tone3, styles.tone4, styles.tone5];

// ─────────────────────────────────────────────────────────────────────────────
export default function SupportPage() {
  // ── State ─────────────────────────────────────────────────────────────────
  const [section, setSection] = useState<Section>('psychiatrists');
  const [cityTab, setCityTab]   = useState<CityTab>('All');
  const [rawQuery, setRawQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [emergencyOnly, setEmergencyOnly]   = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback((value: string) => {
    setRawQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQuery(value), DEBOUNCE_MS);
  }, []);

  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current); }, []);

  // ── Build filter ─────────────────────────────────────────────────────────
  const filter = useMemo<SupportFilter>(() => ({
    query: debouncedQuery,
    category: 'all' as SupportCategory,
    city: cityTab === 'All' ? '' : cityTab,
    emergencyOnly,
  }), [debouncedQuery, cityTab, emergencyOnly]);

  // ── Data ─────────────────────────────────────────────────────────────────
  const psychiatrists = useMemo(() => getPsychiatrists(filter), [filter]);
  const ngos          = useMemo(() => getNGOs(filter),          [filter]);

  // Stats for highlight cards
  const totalPsy      = getPsychiatrists({ query: '', category: 'all', city: '', emergencyOnly: false }).length;
  const totalNgo      = getNGOs({ query: '', category: 'all', city: '', emergencyOnly: false }).length;
  const citiesCount   = ALL_CITIES.length - 1; // minus 'all'

  const activeList    = section === 'psychiatrists' ? psychiatrists : ngos;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <div className={styles.page}>

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.headerMain}>
            <h1 className={styles.title}>Support & Counseling</h1>
            <p className={styles.subtitle}>
              Connect with verified psychiatrists and NGOs who specialize in online harassment,
              gender-based violence, and trauma recovery — all in one place.
            </p>
          </div>

          <div className={styles.highlights}>
            <div className={styles.highlightCard}>
              <strong>{totalPsy}</strong>
              <span>Psychiatrists</span>
            </div>
            <div className={styles.highlightCard}>
              <strong>{totalNgo}</strong>
              <span>NGOs Listed</span>
            </div>
            <div className={styles.highlightCard}>
              <strong>{citiesCount}</strong>
              <span>Cities Covered</span>
            </div>
          </div>
        </div>

        {/* ── Emergency banner ─────────────────────────────────────────────── */}
        {emergencyOnly && <EmergencyBanner />}

        {/* ── Search + controls ────────────────────────────────────────────── */}
        <div className={styles.searchWrap}>
          <div className={styles.searchField}>
            <Search size={18} />
            <input
              type="text"
              value={rawQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={
                section === 'psychiatrists'
                  ? 'Search by name, specialization, or city…'
                  : 'Search NGOs by name, service, or city…'
              }
              aria-label="Search support directory"
            />
          </div>

          {/* Emergency toggle (replaces search button position) */}
          <button
            type="button"
            className={`${styles.emergencyBtn} ${emergencyOnly ? styles.emergencyBtnOn : ''}`}
            onClick={() => setEmergencyOnly((v) => !v)}
            aria-pressed={emergencyOnly}
          >
            <AlertCircle size={15} />
            <span>Emergency</span>
            {emergencyOnly
              ? <ToggleRight size={18} />
              : <ToggleLeft  size={18} />}
          </button>
        </div>

        {/* ── Section tabs ─────────────────────────────────────────────────── */}
        <div className={styles.sectionTabs} role="tablist" aria-label="Support type">
          <button
            role="tab"
            aria-selected={section === 'psychiatrists'}
            className={`${styles.sectionTab} ${section === 'psychiatrists' ? styles.sectionTabActive : ''}`}
            onClick={() => setSection('psychiatrists')}
            type="button"
          >
            <HeartHandshake size={15} />
            Psychiatrists
          </button>
          <button
            role="tab"
            aria-selected={section === 'ngos'}
            className={`${styles.sectionTab} ${section === 'ngos' ? styles.sectionTabActive : ''}`}
            onClick={() => setSection('ngos')}
            type="button"
          >
            <BadgeCheck size={15} />
            NGOs
          </button>
        </div>

        {/* ── City tabs ────────────────────────────────────────────────────── */}
        <div className={styles.cityRow} role="group" aria-label="Filter by city">
          {CITY_TABS.map((c) => (
            <button
              key={c}
              type="button"
              className={`${styles.cityChip} ${cityTab === c ? styles.cityChipActive : ''}`}
              onClick={() => setCityTab(c)}
              aria-pressed={cityTab === c}
            >
              {c !== 'All' && <MapPin size={12} />}
              {c}
            </button>
          ))}
        </div>

        {/* ── Result count ─────────────────────────────────────────────────── */}
        <p className={styles.resultCount} aria-live="polite">
          {activeList.length === 0
            ? 'No matches. Try a different search or city.'
            : `${activeList.length} ${section === 'psychiatrists' ? (activeList.length === 1 ? 'psychiatrist' : 'psychiatrists') : (activeList.length === 1 ? 'NGO' : 'NGOs')} found`}
        </p>

        {/* ── Cards grid ───────────────────────────────────────────────────── */}
        {activeList.length > 0 ? (
          <div className={styles.grid}>
            {section === 'psychiatrists'
              ? psychiatrists.map((p, i) => (
                  <PsychiatristCard key={p.id} data={p} toneClass={TONES[i % TONES.length]} />
                ))
              : ngos.map((n, i) => (
                  <NGOCard key={n.id} data={n} toneClass={TONES[i % TONES.length]} />
                ))
            }

            {/* Request card (dashed, last cell) */}
            <article className={styles.requestCard}>
              <div className={styles.requestIcon}>
                <Plus size={26} />
              </div>
              <h4>Request a Referral</h4>
              <p>Can&apos;t find the right specialist? Our team will help connect you with the best match for your situation.</p>
            </article>
          </div>
        ) : (
          <div className={styles.empty}>
            <HeartHandshake size={38} />
            <h4>No results found</h4>
            <p>Try a different keyword, city, or turn off the Emergency filter.</p>
          </div>
        )}

        {/* ── Privacy footer ───────────────────────────────────────────────── */}
        <p className={styles.disclaimer}>
          All connections are private. ShieldHer never shares your identity without consent.
          Outbound links open with <code>rel=&quot;noopener noreferrer&quot;</code> for your privacy.
        </p>
      </div>

      <QuickExitButton />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Psychiatrist Card
// ─────────────────────────────────────────────────────────────────────────────
function PsychiatristCard({ data, toneClass }: { data: Psychiatrist; toneClass: string }) {
  const initials = getInitials(data.name);
  const availMap: Record<Psychiatrist['availability'], { label: string; cls: string }> = {
    available: { label: 'Available',  cls: styles.availAvailable },
    busy:      { label: 'Busy',       cls: styles.availBusy },
    offline:   { label: 'Offline',    cls: styles.availOffline },
  };
  const { label: availLabel, cls: availCls } = availMap[data.availability];

  return (
    <article className={styles.card}>
      {/* Portrait banner */}
      <div className={`${styles.portrait} ${toneClass}`}>
        <div className={styles.portraitShade} />
        <div className={styles.portraitInitials}>{initials}</div>
        <span className={`${styles.badge} ${data.isEmergency ? styles.badgeEmergency : ''}`}>
          {data.isEmergency ? '⚡ Emergency' : 'Verified'}
        </span>
        <span className={`${styles.availBadge} ${availCls}`}>
          <span className={styles.availDot} />
          {availLabel}
        </span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <h4 className={styles.name}>{data.name}</h4>
          <span className={styles.joined}>{data.title.split(',')[0]}</span>
        </div>

        <div className={styles.metaGrid}>
          <div className={styles.metaRow}>
            <span>Specialization</span>
            <strong>{data.specializations[0]}</strong>
          </div>
          <div className={styles.metaRow}>
            <span>Location</span>
            <strong>{data.city}</strong>
          </div>
          <div className={styles.metaRow}>
            <span>Next Slot</span>
            <strong>{data.nextSlot}</strong>
          </div>
        </div>

        {data.specializations.length > 1 && (
          <div className={styles.tags}>
            {data.specializations.slice(1).map((s) => (
              <span key={s} className={styles.tag}>{s}</span>
            ))}
          </div>
        )}

        <div className={styles.inlineMeta}>
          <div className={styles.inlineMetaItem}>
            <MapPin size={13} />
            <span>{data.location}</span>
          </div>
          <div className={styles.inlineMetaItem}>
            <Star size={13} className={styles.starIcon} />
            <span>{data.rating} ({data.reviewCount} reviews)</span>
          </div>
          <div className={styles.inlineMetaItem}>
            <Clock size={13} />
            <span>Languages: {data.languages.join(', ')}</span>
          </div>
        </div>

        <div className={styles.actionRow}>
          <a
            href={`tel:${data.phone}`}
            className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
            rel="noopener noreferrer"
            aria-label={`Call ${data.name}`}
          >
            <Phone size={14} />
            Connect Now
          </a>
          <a
            href={`mailto:${data.email}`}
            className={styles.actionBtnIcon}
            rel="noopener noreferrer"
            aria-label={`Email ${data.name}`}
          >
            <Mail size={15} />
          </a>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NGO Card
// ─────────────────────────────────────────────────────────────────────────────
function NGOCard({ data, toneClass }: { data: NGO; toneClass: string }) {
  const initials = getInitials(data.name);

  return (
    <article className={styles.card}>
      {/* Portrait banner */}
      <div className={`${styles.portrait} ${styles.portraitNgo} ${toneClass}`}>
        <div className={styles.portraitShade} />
        <div className={styles.portraitInitials}>{initials}</div>
        <span className={`${styles.badge} ${data.isEmergency ? styles.badgeEmergency : ''}`}>
          {data.isEmergency ? '⚡ 24/7' : 'NGO'}
        </span>
        {data.isVerified && (
          <span className={styles.verifiedBadge}>
            <BadgeCheck size={12} /> Verified
          </span>
        )}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <h4 className={styles.name}>{data.name}</h4>
          <span className={styles.joined}>{data.city}</span>
        </div>

        <p className={styles.bio}>{data.tagline}</p>

        <div className={styles.metaGrid}>
          <div className={styles.metaRow}>
            <span>Hours</span>
            <strong>{data.operatingHours}</strong>
          </div>
          <div className={styles.metaRow}>
            <span>Location</span>
            <strong>{data.location.split(',')[0]}</strong>
          </div>
        </div>

        <div className={styles.tags}>
          {data.services.slice(0, 3).map((s) => (
            <span key={s} className={styles.tag}>{s}</span>
          ))}
        </div>

        <div className={styles.inlineMeta}>
          <div className={styles.inlineMetaItem}>
            <MapPin size={13} />
            <span>{data.location}</span>
          </div>
          <div className={styles.inlineMetaItem}>
            <Phone size={13} />
            <span>{data.contactPhone}</span>
          </div>
        </div>

        <div className={styles.actionRow}>
          <a
            href={`tel:${data.contactPhone}`}
            className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
            rel="noopener noreferrer"
            aria-label={`Call ${data.name}`}
          >
            <Phone size={14} />
            Contact Now
          </a>
          {data.website && (
            <a
              href={data.website}
              className={styles.actionBtnIcon}
              rel="noopener noreferrer"
              target="_blank"
              aria-label={`Visit ${data.name} website`}
            >
              <Globe size={15} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
