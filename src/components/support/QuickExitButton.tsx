'use client';

import { DoorOpen } from 'lucide-react';
import styles from './QuickExitButton.module.css';

export default function QuickExitButton() {
  const handleExit = () => {
    // Replace history so the user cannot navigate back to ShieldHer
    window.location.replace('https://www.google.com');
  };

  return (
    <button
      className={styles.btn}
      onClick={handleExit}
      aria-label="Quick Exit — leave this page immediately"
      title="Quick Exit (closes this page safely)"
      type="button"
    >
      <DoorOpen size={18} />
      <span className={styles.label}>Quick Exit</span>
    </button>
  );
}
