/**
 * Koordinaten (WGS84, Ortszentren) für die schematische Einsatzgebiet-Karte.
 * Neue Gemeinde in site.ts → hier Koordinaten ergänzen (z. B. aus map.geo.admin.ch), sonst erscheint sie nur in der Liste.
 */
export const origin = { name: 'Zug', lat: 47.1662, lon: 8.5155 };

/** label: Position der Beschriftung relativ zum Punkt (r = rechts, l = links, t = oben, b = unten) */
export const towns: Record<string, { lat: number; lon: number; label: 'r' | 'l' | 't' | 'b' }> = {
  Baar: { lat: 47.1963, lon: 8.5295, label: 'r' },
  Cham: { lat: 47.1821, lon: 8.4636, label: 'r' },
  Steinhausen: { lat: 47.1951, lon: 8.4858, label: 't' },
  Hünenberg: { lat: 47.1754, lon: 8.4251, label: 'b' },
  'Risch-Rotkreuz': { lat: 47.1411, lon: 8.4314, label: 'r' },
  Walchwil: { lat: 47.1019, lon: 8.5159, label: 'r' },
  Menzingen: { lat: 47.1777, lon: 8.592, label: 'r' },
  Neuheim: { lat: 47.2055, lon: 8.5777, label: 'r' },
  Oberägeri: { lat: 47.136, lon: 8.613, label: 'b' },
  Unterägeri: { lat: 47.1372, lon: 8.5856, label: 'l' },
};

/** Grobe Seeumrisse (schematisch, nicht massstabsgetreu) */
export const lakes = {
  zugersee: [
    [47.186, 8.47], [47.181, 8.495], [47.171, 8.51], [47.15, 8.506], [47.12, 8.506], [47.1, 8.509], [47.075, 8.513],
    [47.06, 8.518], [47.065, 8.495], [47.09, 8.487], [47.12, 8.48], [47.14, 8.46], [47.16, 8.448], [47.176, 8.452],
  ],
  aegerisee: [[47.132, 8.588], [47.13, 8.61], [47.115, 8.625], [47.098, 8.632], [47.1, 8.618], [47.115, 8.6]],
} as const;

/** Luftlinie in km (Haversine) */
export const distanceKm = (a: { lat: number; lon: number }, b: { lat: number; lon: number }) => {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

/** Einfache Projektion auf ein SVG-Raster (1 Einheit = 100 m) */
export const bounds = { north: 47.225, south: 47.08, west: 8.395, east: 8.645 };
const kmPerLon = 111.32 * Math.cos((47.15 * Math.PI) / 180);
export const project = (lat: number, lon: number) => ({
  x: (lon - bounds.west) * kmPerLon * 10,
  y: (bounds.north - lat) * 111.2 * 10,
});
export const viewBox = (() => {
  const br = project(bounds.south, bounds.east);
  return { w: Math.round(br.x), h: Math.round(br.y) };
})();
