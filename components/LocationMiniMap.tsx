'use client';

import { useEffect, useRef } from 'react';
import type { Map as LeafletMap } from 'leaflet';

type LocationMiniMapProps = {
  lat: number;
  lng: number;
  label: string;
};

export function LocationMiniMap({ lat, lng, label }: LocationMiniMapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let active = true;

    const init = async () => {
      if (!containerRef.current || mapRef.current) return;
      const L = await import('leaflet');
      if (!active || !containerRef.current) return;

      const map = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: false
      }).setView([lat, lng], 16);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map);

      const pin = L.divIcon({
        className: '',
        html: '<div class="pin" style="background:#d73f60"><span>📍</span></div>',
        iconSize: [36, 36],
        iconAnchor: [18, 36]
      });

      L.marker([lat, lng], { icon: pin }).addTo(map).bindTooltip(label, {
        direction: 'top',
        offset: [0, -16]
      });

      mapRef.current = map;
    };

    void init();
    return () => {
      active = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lng, label]);

  return <div className="mini-map" ref={containerRef} />;
}
