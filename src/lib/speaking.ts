import { places, type PlaceId, type Talk } from '../data/talks';
import { dotRadius, landPath, mapHeight, mapWidth, project } from '../data/worldMap';

/** An event is upcoming until the day after its last conference day. */
export function isUpcoming(talk: Talk, today: string): boolean {
  return (talk.dateEnd ?? talk.date) >= today;
}

/** Marker diameter in CSS pixels; grows with the number of events. */
const markerSize = (eventCount: number) => 13 + Math.min(eventCount - 1, 4) * 3;
/** Clear space in CSS pixels between two marker edges before they collide. */
const MARKER_GAP = 7;
/** Below this the marker sits on its city and needs no leader line. */
const LEADER_THRESHOLD = 1.5;
/**
 * Width the map is drawn at on a desktop viewport. Marker sizes are expressed
 * in CSS pixels, the map in viewBox units - this converts between the two so
 * markers stay the same size no matter how far the map is cropped in.
 */
const REFERENCE_WIDTH = 950;
/** Breathing room in viewBox units between the outermost marker and the edge. */
const CROP_PADDING = 50;
/** Never crop tighter than this, or two nearby cities fill the whole map. */
const MIN_CROP_WIDTH = 420;
/** Width / height the crop aims for; a flat sliver of map reads as a bar chart. */
const CROP_RATIO = 2.6;

export interface MapMarker {
  id: PlaceId;
  city: string;
  country: string;
  flag: string;
  /** Marker position in percent of the map view - nudged away from its neighbours. */
  left: number;
  top: number;
  /** Diameter in percent of the map width, so markers scale with the map. */
  size: number;
  /** Leader line back to the real city, in viewBox units; absent when unmoved. */
  leader?: { x1: number; y1: number; x2: number; y2: number };
  /** Where the tooltip hangs, so it never runs off the map edge. */
  align: 'start' | 'center' | 'end';
  /** Events at this place, newest first. */
  events: Talk[];
  /** Event years at this place - the year filter hides markers without a match. */
  years: string[];
  upcoming: boolean;
}

export interface MapView {
  viewBox: string;
  width: number;
  height: number;
  /** Land dots trimmed to the visible window. */
  landPath: string;
  dotRadius: number;
}

/**
 * Crops the world down to the region that actually has events, plus padding.
 * Deriving this from the data rather than hard-coding a window means a talk on
 * a new continent widens the map by itself instead of falling off the edge.
 */
function cropTo(anchors: { x: number; y: number }[]): { x: number; y: number; width: number; height: number } {
  if (anchors.length === 0) return { x: 0, y: 0, width: mapWidth, height: mapHeight };

  const xs = anchors.map((anchor) => anchor.x);
  const ys = anchors.map((anchor) => anchor.y);
  const minX = Math.min(...xs) - CROP_PADDING;
  const maxX = Math.max(...xs) + CROP_PADDING;
  const minY = Math.min(...ys) - CROP_PADDING;
  const maxY = Math.max(...ys) + CROP_PADDING;

  let width = Math.max(maxX - minX, MIN_CROP_WIDTH);
  let height = width / CROP_RATIO;
  // Tall clusters (say Cape Town and Oslo) grow the width instead.
  if (maxY - minY > height) {
    height = maxY - minY;
    width = height * CROP_RATIO;
  }

  width = Math.min(width, mapWidth);
  height = Math.min(height, mapHeight);

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const clamp = (value: number, max: number) => Math.min(Math.max(value, 0), max);

  return {
    x: clamp(centerX - width / 2, mapWidth - width),
    y: clamp(centerY - height / 2, mapHeight - height),
    width,
    height,
  };
}

/** Drops the land dots outside the crop - they would only bloat the HTML. */
function trimLand(crop: { x: number; y: number; width: number; height: number }): string {
  const margin = dotRadius + 1;
  const kept: string[] = [];

  for (const dot of landPath.split('M')) {
    if (!dot) continue;
    const [x, y] = dot.replace('h0', '').split(' ').map(Number);
    if (x < crop.x - margin || x > crop.x + crop.width + margin) continue;
    if (y < crop.y - margin || y > crop.y + crop.height + margin) continue;
    kept.push(`M${x} ${y}h0`);
  }

  return kept.join('');
}

/**
 * Pushes overlapping markers apart while a weak spring keeps pulling them back
 * towards their city. Cities like Berlin and Frankfurt are only a few pixels
 * apart on a world map, so without this the European events pile up into one
 * unclickable blob.
 */
function separate(points: { x: number; y: number; r: number; ax: number; ay: number }[], gap: number): void {
  for (let pass = 0; pass < 80; pass += 1) {
    let moved = false;

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const a = points[i];
        const b = points[j];
        const minDistance = a.r + b.r + gap;
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let distance = Math.hypot(dx, dy);
        if (distance >= minDistance) continue;

        // Identical coordinates would divide by zero - break the tie arbitrarily.
        if (distance === 0) {
          dx = 1;
          dy = -1;
          distance = Math.SQRT2;
        }

        const push = ((minDistance - distance) / distance) * 0.25;
        a.x -= dx * push;
        a.y -= dy * push;
        b.x += dx * push;
        b.y += dy * push;
        moved = true;
      }
    }

    for (const point of points) {
      point.x += (point.ax - point.x) * 0.06;
      point.y += (point.ay - point.y) * 0.06;
    }

    if (!moved) break;
  }
}

/** One marker per venue, plus the cropped map window they are drawn on. */
export function buildSpeakingMap(talks: Talk[], today: string): { markers: MapMarker[]; view: MapView } {
  const byPlace = new Map<PlaceId, Talk[]>();
  for (const talk of talks) {
    const list = byPlace.get(talk.place) ?? [];
    list.push(talk);
    byPlace.set(talk.place, list);
  }

  const entries = [...byPlace.entries()]
    .map(([id, events]) => {
      const place = places[id];
      const { x, y } = project(place.coords[0], place.coords[1]);
      return { id, place, events, anchor: { x, y } };
    })
    // Draw the busiest places last so their bigger markers stay on top.
    .sort((a, b) => a.events.length - b.events.length);

  const crop = cropTo(entries.map((entry) => entry.anchor));
  // One viewBox unit is this many CSS pixels once the map is drawn.
  const unitsPerPixel = crop.width / REFERENCE_WIDTH;

  const points = entries.map((entry) => ({
    x: entry.anchor.x,
    y: entry.anchor.y,
    r: (markerSize(entry.events.length) / 2) * unitsPerPixel,
    ax: entry.anchor.x,
    ay: entry.anchor.y,
  }));
  separate(points, MARKER_GAP * unitsPerPixel);

  const markers = entries.map((entry, index) => {
    const point = points[index];
    const left = ((point.x - crop.x) / crop.width) * 100;
    const offset = Math.hypot(point.x - entry.anchor.x, point.y - entry.anchor.y);
    const sorted = [...entry.events].sort((a, b) => b.date.localeCompare(a.date));

    return {
      id: entry.id,
      city: entry.place.city,
      country: entry.place.country,
      flag: entry.place.flag,
      left,
      top: ((point.y - crop.y) / crop.height) * 100,
      size: (markerSize(entry.events.length) / REFERENCE_WIDTH) * 100,
      leader:
        offset > LEADER_THRESHOLD
          ? { x1: entry.anchor.x, y1: entry.anchor.y, x2: point.x, y2: point.y }
          : undefined,
      align: left < 20 ? ('start' as const) : left > 80 ? ('end' as const) : ('center' as const),
      events: sorted,
      years: [...new Set(sorted.map((talk) => talk.date.slice(0, 4)))],
      upcoming: entry.events.some((talk) => isUpcoming(talk, today)),
    };
  });

  return {
    markers,
    view: {
      viewBox: `${crop.x.toFixed(1)} ${crop.y.toFixed(1)} ${crop.width.toFixed(1)} ${crop.height.toFixed(1)}`,
      width: crop.width,
      height: crop.height,
      landPath: trimLand(crop),
      dotRadius,
    },
  };
}

export interface SpeakingStats {
  events: number;
  countries: number;
  sessions: number;
  /** Distinct event years, newest first - used for the filter chips. */
  years: number[];
}

export function speakingStats(talks: Talk[]): SpeakingStats {
  return {
    events: talks.length,
    countries: new Set(talks.map((talk) => places[talk.place].country)).size,
    sessions: talks.reduce((total, talk) => total + talk.sessions.length, 0),
    years: [...new Set(talks.map((talk) => Number(talk.date.slice(0, 4))))].sort((a, b) => b - a),
  };
}
