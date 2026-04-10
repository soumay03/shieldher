'use client';

import type { SupportCategory } from '@/lib/support-types';
import styles from './FilterChips.module.css';

interface FilterOption {
  value: SupportCategory;
  label: string;
  emoji: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'all',          label: 'All',          emoji: '✦' },
  { value: 'mental-health',label: 'Mental Health', emoji: '🧠' },
  { value: 'legal-aid',    label: 'Legal Aid',     emoji: '⚖️' },
  { value: 'shelter',      label: 'Shelter',       emoji: '🏠' },
  { value: 'crisis-line',  label: 'Crisis Line',   emoji: '📞' },
  { value: 'medical',      label: 'Medical',       emoji: '🏥' },
];

interface FilterChipsProps {
  active: SupportCategory;
  onFilter: (category: SupportCategory) => void;
}

export default function FilterChips({ active, onFilter }: FilterChipsProps) {
  return (
    <div className={styles.row} role="group" aria-label="Filter by category">
      {FILTER_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          className={`${styles.chip} ${active === opt.value ? styles.chipActive : ''}`}
          onClick={() => onFilter(opt.value)}
          aria-pressed={active === opt.value}
          type="button"
        >
          <span aria-hidden="true">{opt.emoji}</span>
          {opt.label}
        </button>
      ))}
    </div>
  );
}
