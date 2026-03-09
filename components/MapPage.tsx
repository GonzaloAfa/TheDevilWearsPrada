'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { CategoryKey, Dataset, Lang, Location } from '../lib/types';
import { CATEGORY_META } from '../lib/categories';
import { MapClient, type MapClientHandle } from './MapClient';
import { LocationImage } from './LocationImage';
import { AdSlot } from './AdSlot';
import { ShareBar } from './ShareBar';
import { Footer } from './Footer';
import { SiteHeader } from './SiteHeader';
import {
  formatTimestampValue,
  getCategoryLabel,
  getCoffeeLabel,
  getLocationI18n,
  getLocationSearchText,
  useUiText
} from '../lib/i18n';

const ALL_CATEGORIES = Object.keys(CATEGORY_META) as CategoryKey[];

function renderTimestamp(timestamp: string, lang: Lang) {
  return formatTimestampValue(timestamp, lang);
}

function matchSearch(loc: Location, query: string) {
  if (!query) return true;
  const haystack = [
    getLocationSearchText(loc),
    loc.address,
    loc.city,
    loc.category,
    ...(loc.brands || [])
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(query);
}

export function MapPage({ lang, data }: { lang: Lang; data: Dataset }) {
  const ui = useUiText();
  const [search, setSearch] = useState('');
  const [activeCats, setActiveCats] = useState<Set<CategoryKey>>(
    () => new Set(ALL_CATEGORIES)
  );
  const [tourRunning, setTourRunning] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const mapRef = useRef<MapClientHandle | null>(null);
  const tourIndexRef = useRef(0);
  const pathname = usePathname();

  const filteredLocations = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data.locations.filter((loc) => {
      if (!activeCats.has(loc.category)) return false;
      return matchSearch(loc, query);
    });
  }, [search, activeCats, data.locations]);

  const filteredIds = useMemo(() => filteredLocations.map((loc) => loc.id), [filteredLocations]);

  const stats = useMemo(() => {
    const coffee = filteredLocations.reduce((acc, loc) => acc + (loc.coffee || 0), 0);
    const exact = filteredLocations.filter((loc) => loc.confidence === 'exact').length;
    const approx = filteredLocations.length - exact;
    return { coffee, exact, approx, total: filteredLocations.length };
  }, [filteredLocations]);

  const sortedLocations = useMemo(() => {
    return [...filteredLocations].sort((a, b) => {
      const city = a.city.localeCompare(b.city);
      if (city) return city;
      return getLocationI18n(a, lang).name.localeCompare(getLocationI18n(b, lang).name);
    });
  }, [filteredLocations, lang]);

  useEffect(() => {
    if (!tourRunning) return;
    if (!filteredLocations.length) return;
    const go = () => {
      const loc = filteredLocations[tourIndexRef.current % filteredLocations.length];
      mapRef.current?.focusLocation(loc.id, true);
      tourIndexRef.current += 1;
    };
    go();
    const timer = setInterval(go, 4300);
    return () => clearInterval(timer);
  }, [tourRunning, filteredLocations]);

  const toggleCategory = (cat: CategoryKey) => {
    setActiveCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const adSlotSidebar = process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR;
  const adSlotInline = process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE;
  const shareUrl = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    return `${base}${pathname || ''}`;
  }, [pathname]);

  return (
    <div id="app">
      <aside id="sidebar" className={panelOpen ? '' : 'sidebar-collapsed'}>
        <div className="sheet-handle">
          <div className="small">{ui.map.panelTitle}</div>
          <button
            className="secondary"
            onClick={() => setPanelOpen((prev) => !prev)}
            style={{ padding: '6px 10px' }}
          >
            {panelOpen ? ui.map.panelCollapse : ui.map.panelExpand}
          </button>
        </div>
        <div className="sidebar-content">
        <div className="header" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <SiteHeader lang={lang} showLanguageSwitch pathSuffix="/map" />
          <div>
            <h1>{ui.title.split('\n').map((line, idx) => (
              <span key={idx}>
                {line}
                {idx === 0 ? <br /> : null}
              </span>
            ))}</h1>
            <div className="sub">{ui.subtitle}</div>
          </div>
        </div>

        <div className="card">
          <div className="grid2">
            <div className="stat">
              <div className="k">{ui.stats.pins}</div>
              <div className="v">{stats.total}</div>
            </div>
            <div className="stat">
              <div className="k">{ui.stats.coffee}</div>
              <div className="v">{stats.coffee} ☕</div>
            </div>
            <div className="stat">
              <div className="k">{ui.stats.exact}</div>
              <div className="v">{stats.exact}</div>
            </div>
            <div className="stat">
              <div className="k">{ui.stats.approx}</div>
              <div className="v">{stats.approx}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <ShareBar url={shareUrl} title={ui.map.shareText} />
        </div>

        <div className="card">
          <div style={{ fontWeight: 800, marginBottom: 10 }}>{ui.introTitle}</div>
          {ui.introBody.map((line) => (
            <div key={line} className="small" style={{ marginBottom: 8 }}>
              {line}
            </div>
          ))}
        </div>

        {adSlotSidebar ? (
          <div className="card">
            <AdSlot slot={adSlotSidebar} />
          </div>
        ) : null}

        <div className="card">
          <input
            className="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={ui.searchPlaceholder}
          />
          <div className="row">
            <button onClick={() => setTourRunning((prev) => !prev)}>
              {tourRunning ? ui.buttons.stop : ui.buttons.tour}
            </button>
            <button className="secondary" onClick={() => mapRef.current?.fitLocations(filteredIds)}>
              {ui.buttons.fit}
            </button>
            <button className="secondary" onClick={() => mapRef.current?.flyToCity('nyc')}>
              {ui.buttons.nyc}
            </button>
            <button className="secondary" onClick={() => mapRef.current?.flyToCity('paris')}>
              {ui.buttons.paris}
            </button>
          </div>
        </div>

        <div className="card">
          <div style={{ fontWeight: 800, marginBottom: 10 }}>{ui.sections.categories}</div>
          <div className="chips">
            {ALL_CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat];
              const active = activeCats.has(cat);
              return (
                <div
                  key={cat}
                  className={`chip ${active ? 'active' : ''}`}
                  onClick={() => toggleCategory(cat)}
                >
                  {meta.icon} {getCategoryLabel(meta, lang)}
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div style={{ fontWeight: 800, marginBottom: 10 }}>{ui.sections.timeline}</div>
          <div className="timeline">
            {data.coffee_events.map((evt, idx) => {
              const loc = data.locations.find((l) => l.id === evt.location_id);
              return (
                <div
                  key={`${evt.location_id}-${evt.ts}`}
                  className="event"
                  onClick={() => mapRef.current?.focusLocation(evt.location_id, true)}
                >
                  <div>
                    <strong>#{idx + 1}</strong> · {evt.ts} · ☕
                  </div>
                  <div className="meta">{getCoffeeLabel(evt, lang)}</div>
                  <div className="meta">{loc ? getLocationI18n(loc, lang).name : ''}</div>
                </div>
              );
            })}
          </div>
        </div>

        {adSlotInline ? (
          <div className="card">
            <AdSlot slot={adSlotInline} />
          </div>
        ) : null}

        <div className="card">
          <div style={{ fontWeight: 800, marginBottom: 10 }}>{ui.sections.pins}</div>
          <div className="list">
            {sortedLocations.length ? (
              sortedLocations.map((loc) => {
                const meta = CATEGORY_META[loc.category];
                const confLabel = loc.confidence === 'exact' ? ui.popup.exact : ui.popup.approx;
                const hasImage = Boolean(loc.image_url);
                return (
                  <div
                    key={loc.id}
                    className={`item${hasImage ? ' with-image' : ''}`}
                    onClick={() => mapRef.current?.focusLocation(loc.id, true)}
                  >
                    {hasImage ? (
                      <LocationImage
                        src={loc.image_url}
                        alt={getLocationI18n(loc, lang).name}
                        className="thumb"
                      />
                    ) : null}
                    <div className="content">
                      <div className="name">{getLocationI18n(loc, lang).name}</div>
                      <div className="meta">{loc.address}</div>
                      <div className="meta">
                        {renderTimestamp(loc.timestamp, lang)} · {getLocationI18n(loc, lang).scene}
                      </div>
                      <div>
                        <span className="pill">
                          {meta.icon} {getCategoryLabel(meta, lang)}
                        </span>
                        <span className="pill">☕ {loc.coffee || 0}</span>
                        <span className="pill">📍 {confLabel}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="small">{ui.empty}</div>
            )}
          </div>
        </div>

        <div className="card small">
          <strong>{ui.notesTitle}</strong>
          <br />
          <br />
          {ui.notes.map((note) => (
            <div key={note} style={{ marginBottom: 6 }}>
              - {note}
            </div>
          ))}
        </div>

        <Footer />
        </div>
      </aside>

      <main>
        <MapClient
          ref={mapRef}
          locations={data.locations}
          lang={lang}
          filteredIds={filteredIds}
          categoryMeta={CATEGORY_META}
        />
      </main>
    </div>
  );
}
