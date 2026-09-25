import { places, type PlaceId, type Talk } from '../data/talks';

/** An event is upcoming until the day after its last conference day. */
export function isUpcoming(talk: Talk, today: string): boolean {
  return (talk.dateEnd ?? talk.date) >= today;
}

export interface GlobeCity {
  id: PlaceId;
  city: string;
  country: string;
  flag: string;
  lat: number;
  lng: number;
  /** Events at this place, newest first. */
  events: Talk[];
  /** Event years at this place - the year filter hides cities without a match. */
  years: string[];
  upcoming: boolean;
}

/** One marker per venue, ordered so the busiest city wins a tie on the globe. */
export function buildGlobeCities(talks: Talk[], today: string): GlobeCity[] {
  const byPlace = new Map<PlaceId, Talk[]>();
  for (const talk of talks) {
    const list = byPlace.get(talk.place) ?? [];
    list.push(talk);
    byPlace.set(talk.place, list);
  }

  return [...byPlace.entries()]
    .map(([id, events]) => {
      const place = places[id];
      const sorted = [...events].sort((a, b) => b.date.localeCompare(a.date));
      return {
        id,
        city: place.city,
        country: place.country,
        flag: place.flag,
        lng: place.coords[0],
        lat: place.coords[1],
        events: sorted,
        years: [...new Set(sorted.map((talk) => talk.date.slice(0, 4)))],
        upcoming: events.some((talk) => isUpcoming(talk, today)),
      };
    })
    .sort((a, b) => b.events.length - a.events.length || a.city.localeCompare(b.city));
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
