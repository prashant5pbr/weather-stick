'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from '@/css/map-picker-link.module.css';

// Props for the map-picker trigger; the popup and its open state live inside
interface MapPickerLinkProps {
  logoClassName: string;
  className?: string;
  label?: string;
}

// Component to allow selecting place from the map (currently not available)
const MapPickerLink = function ({ logoClassName, className, label }: MapPickerLinkProps) {
  // State to decide if the popup opens or not
  const [open, setOpen] = useState(false);

  // Close the popup on Escape while it is open
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = function (e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <>
      <Link
        className={className}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        <img className={logoClassName} src="/map-symbol2.svg" draggable="false" />
        {label}
      </Link>

      {/* React portal to blur the whole body and not just the form */}
      {open &&
        createPortal(
          <div className={styles.overlay} onClick={() => setOpen(false)}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
              <p className={styles.message}>Map picker isn't available yet.</p>
              <button type="button" className={styles.button} onClick={() => setOpen(false)}>
                OK
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export { MapPickerLink };
