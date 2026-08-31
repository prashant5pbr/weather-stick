'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type * as LTypes from 'leaflet';
import { getPlaceFromCoords } from '@/services/get-place-from-coords';
import { osmTileURL } from '@/services/endpoints';
import { placeLabel } from '@/util/place-format';
import type { PlaceSuggestion } from '@/types/place-suggestion.types';

import 'leaflet/dist/leaflet.css';
import styles from '@/css/map-picker-link.module.css';

// Props for the map-picker trigger; the popup and its map live inside
interface MapPickerLinkProps {
  logoClassName: string;
  className?: string;
  label?: string;
  onPlaceSelect: (place: PlaceSuggestion) => void;
}

// Component to allow selecting a place by clicking on a map
const MapPickerLink = function ({ logoClassName, className, label, onPlaceSelect }: MapPickerLinkProps) {
  // State to decide if the popup opens or not
  const [open, setOpen] = useState(false);

  // The place resolved from the last map click (null until the user clicks)
  const [picked, setPicked] = useState<PlaceSuggestion | null>(null);

  // Whether a reverse-geocode lookup is currently in flight
  const [loading, setLoading] = useState(false);

  // The div Leaflet draws the map into (exists only while the popup is open)
  const mapRef = useRef<HTMLDivElement>(null);

  // Close the popup on Escape while it is open
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = function (e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Build the Leaflet map once the popup (and its container div) is on screen
  useEffect(() => {
    if (!open || !mapRef.current) return;

    // Fresh popup: clear any place picked in a previous session
    setPicked(null);
    setLoading(false);

    // Handles created inside the async load; the cleanup below tears them down
    let map: LTypes.Map | null = null;
    let frame = 0;
    let cancelled = false;
    const controller = new AbortController();

    // Import Leaflet only in the browser (its module code touches window, which does not exist during Next's server render)
    (async () => {
      const L = (await import('leaflet')).default;

      // Popup may have closed while Leaflet was loading
      if (cancelled || !mapRef.current) return;

      // Create the map centred on the whole world at a low zoom
      map = L.map(mapRef.current, { center: [20, 0], zoom: 2 });

      // Draw the map
      L.tileLayer(osmTileURL, {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      // Measure the frame size
      frame = requestAnimationFrame(() => map?.invalidateSize());

      // A single dot marking the last click (no image asset, so no bundler icon bug)
      let marker: LTypes.CircleMarker | null = null;

      // Fetch the coordinates of the place when clicked on map
      map.on('click', async (e: LTypes.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;

        // Drop the dot on first click, move it on later clicks
        if (marker) marker.setLatLng(e.latlng);
        else marker = L.circleMarker(e.latlng, { radius: 7, color: '#5b7cfa', fillOpacity: 0.9 }).addTo(map!);

        setPicked(null);
        setLoading(true);

        try {
          const place = await getPlaceFromCoords(lat, lng, controller.signal);
          setPicked(place);
        } catch {
          // AbortError (popup closed) or a failed lookup: leave nothing picked
          setPicked(null);
        } finally {
          setLoading(false);
        }
      });
    })();

    // Runs when the popup closes: cancel the pending frame + fetch, then destroy the map
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      controller.abort();
      map?.remove();
    };
  }, [open]);

  // Commit the picked place to the form and close
  const handleConfirm = function () {
    if (!picked) return;
    onPlaceSelect(picked);
    setOpen(false);
  };

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
              {/* Leaflet draws into this div; the map-lifecycle effect fills it */}
              <div ref={mapRef} className={styles.map} />

              <div className={styles.confirmBar}>
                <span className={styles.placeName}>
                  {loading ? (
                    <span className={styles.hint}>Finding place…</span>
                  ) : picked ? (
                    placeLabel(picked)
                  ) : (
                    <span className={styles.hint}>Click the map to pick a spot</span>
                  )}
                </span>

                <button type="button" className={styles.button} onClick={handleConfirm} disabled={!picked}>
                  Use this location
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export { MapPickerLink };
