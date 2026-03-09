'use client';

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import type { CategoryMeta, CategoryKey, Lang, Location } from '../lib/types';
import type { UiText } from '../lib/uiText';
import L from 'leaflet';
import { getLocationI18n } from '../lib/i18n';

export type MapClientHandle = {
  focusLocation: (id: string, openPopup?: boolean) => void;
  fitLocations: (ids: string[]) => void;
  flyToCity: (city: 'nyc' | 'paris') => void;
};

type MapClientProps = {
  locations: Location[];
  lang: Lang;
  filteredIds: string[];
  categoryMeta: Record<CategoryKey, CategoryMeta>;
  ui: UiText;
};

type MarkerWithLoc = L.Marker & { __locId?: string };

const NYC_CENTER: [number, number] = [40.758, -73.982];
const PARIS_CENTER: [number, number] = [48.866, 2.316];

function esc(value: string = '') {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[ch] || ch);
}

function renderTimestamp(timestamp: string, lang: Lang) {
  if (!timestamp) return lang === 'en' ? 'N/A' : lang === 'pt' ? 'S/D' : 'N/D';
  if (timestamp === 'varios') return lang === 'en' ? 'various' : lang === 'pt' ? 'vários' : 'varios';
  if (timestamp === 'escena eliminada') {
    return lang === 'en' ? 'deleted scene' : lang === 'pt' ? 'cena deletada' : 'escena eliminada';
  }
  return timestamp;
}

export const MapClient = forwardRef<MapClientHandle, MapClientProps>(
  ({ locations, lang, filteredIds, categoryMeta, ui }, ref) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<Map<string, MarkerWithLoc>>(new Map());
    const hasFitRef = useRef(false);

    const locationById = useMemo(() => {
      return new Map(locations.map((loc) => [loc.id, loc]));
    }, [locations]);

    const pinHtml = (category: CategoryKey) => {
      const meta = categoryMeta[category] || { icon: '📍', color: '#d73f60', label: { es: category, en: category } };
      return `<div class="pin" style="background:${meta.color}"><span>${meta.icon}</span></div>`;
    };

    const popupHtml = (loc: Location) => {
      const tags = (loc.brands || []).map((b) => `<span class="tag">👠 ${esc(b)}</span>`).join('');
      const srcs = (loc.sources || []).map((s) => `<span class="tag">📚 ${esc(s)}</span>`).join('');
      const conf = loc.confidence === 'exact' ? ui.popup.exact : ui.popup.approx;
      const meta = categoryMeta[loc.category] || { icon: '📍', color: '#d73f60', label: { es: 'Pin', en: 'Pin' } };
      const t = getLocationI18n(loc, lang);
      return `
        <div class="popup" style="min-width:280px;max-width:340px;">
          <div class="hero">${meta.icon}</div>
          <p><strong>${esc(t.name)}</strong></p>
          <p>${esc(t.scene)}</p>
          <p class="muted"><strong>${esc(ui.popup.timestamp)}:</strong> ${esc(renderTimestamp(loc.timestamp, lang))} · <strong>${esc(ui.popup.city)}:</strong> ${esc(loc.city)}</p>
          <p class="muted"><strong>${esc(ui.popup.address)}:</strong> ${esc(loc.address)}</p>
          <p class="muted"><strong>${esc(ui.popup.confidence)}:</strong> ${esc(conf)} · <strong>${esc(ui.popup.coffee)}:</strong> ${loc.coffee || 0} ☕</p>
          <p class="muted">${esc(t.production_note || '')}</p>
          <div class="tags">${tags || `<span class=\"tag\">${esc(ui.popup.noBrands)}</span>`}</div>
          <div class="tags" style="margin-top:8px;">${srcs}</div>
          <div style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;">
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.lat + ',' + loc.lng)}" target="_blank" rel="noreferrer">${esc(ui.popup.maps)}</a>
            <a href="${esc(loc.clip_url)}" target="_blank" rel="noreferrer">${esc(ui.popup.clip)}</a>
          </div>
        </div>
      `;
    };

    useEffect(() => {
      if (!mapContainerRef.current || mapRef.current) return;
      const map = L.map(mapContainerRef.current, { preferCanvas: true }).setView(NYC_CENTER, 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      mapRef.current = map;

      locations.forEach((loc) => {
        const marker = L.marker([loc.lat, loc.lng], {
          icon: L.divIcon({
            className: '',
            html: pinHtml(loc.category),
            iconSize: [36, 36],
            iconAnchor: [18, 36],
            popupAnchor: [0, -30]
          })
        }) as MarkerWithLoc;
        marker.__locId = loc.id;
        marker.bindPopup(popupHtml(loc), { maxWidth: 360 });
        marker.addTo(map);
        markersRef.current.set(loc.id, marker);
      });

      return () => {
        map.remove();
        mapRef.current = null;
        markersRef.current.clear();
      };
    }, [locations]);

    useEffect(() => {
      const map = mapRef.current;
      if (!map) return;
      const allowed = new Set(filteredIds);
      markersRef.current.forEach((marker, id) => {
        if (allowed.has(id)) {
          if (!map.hasLayer(marker)) marker.addTo(map);
        } else if (map.hasLayer(marker)) {
          map.removeLayer(marker);
        }
      });
    }, [filteredIds]);

    useEffect(() => {
      if (hasFitRef.current) return;
      const map = mapRef.current;
      if (!map || !filteredIds.length) return;
      const points = filteredIds
        .map((id) => locationById.get(id))
        .filter(Boolean)
        .map((loc) => [loc!.lat, loc!.lng]) as [number, number][];
      if (!points.length) return;
      map.fitBounds(points, { padding: [40, 40] });
      hasFitRef.current = true;
    }, [filteredIds, locationById]);

    useEffect(() => {
      markersRef.current.forEach((marker) => {
        const locId = marker.__locId;
        if (!locId) return;
        const loc = locationById.get(locId);
        if (!loc) return;
        marker.setPopupContent(popupHtml(loc));
      });
    }, [lang, ui, locationById]);

    useImperativeHandle(ref, () => ({
      focusLocation: (id: string, openPopup = true) => {
        const map = mapRef.current;
        const marker = markersRef.current.get(id);
        const loc = locationById.get(id);
        if (!map || !marker || !loc) return;
        const zoom = loc.city === 'Paris' ? 14 : 16;
        map.flyTo(marker.getLatLng(), zoom, { duration: 1.2 });
        if (openPopup) {
          setTimeout(() => marker.openPopup(), 800);
        }
      },
      fitLocations: (ids: string[]) => {
        const map = mapRef.current;
        if (!map) return;
        const points = ids
          .map((id) => locationById.get(id))
          .filter(Boolean)
          .map((loc) => [loc!.lat, loc!.lng]) as [number, number][];
        if (!points.length) return;
        map.fitBounds(points, { padding: [40, 40] });
      },
      flyToCity: (city: 'nyc' | 'paris') => {
        const map = mapRef.current;
        if (!map) return;
        if (city === 'paris') {
          map.flyTo(PARIS_CENTER, 14, { duration: 1.2 });
        } else {
          map.flyTo(NYC_CENTER, 12, { duration: 1.2 });
        }
      }
    }));

    return <div id="map" ref={mapContainerRef} />;
  }
);

MapClient.displayName = 'MapClient';
