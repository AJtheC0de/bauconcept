/**
 * Koordinaten (WGS84, Ortszentren) für die schematische Einsatzgebiet-Karte.
 * Neuer Kanton in site.ts → hier Hauptort ergänzen (z. B. aus map.geo.admin.ch), sonst erscheint er nur in der Liste.
 */
export const origin = { name: 'Zug', lat: 47.1662, lon: 8.5155 };

type Label = 'r' | 'l' | 't' | 'b';

/** Kantone mit Hauptort. label: Position der Beschriftung relativ zum Punkt (r = rechts, l = links, t = oben, b = unten) */
export const cantons: Record<string, { hauptort: string; lat: number; lon: number; label: Label }> = {
  Luzern: { hauptort: 'Luzern', lat: 47.0502, lon: 8.3093, label: 'l' },
  Schwyz: { hauptort: 'Schwyz', lat: 47.0207, lon: 8.653, label: 'r' },
  Nidwalden: { hauptort: 'Stans', lat: 46.958, lon: 8.366, label: 'b' },
  Obwalden: { hauptort: 'Sarnen', lat: 46.8961, lon: 8.2456, label: 'r' },
  Uri: { hauptort: 'Altdorf', lat: 46.8804, lon: 8.6444, label: 'r' },
  Zürich: { hauptort: 'Zürich', lat: 47.3769, lon: 8.5417, label: 'r' },
};

/** Gemeinden im Kanton Zug – auf der Karte als kleine Punkte rund um den Standort */
export const towns: Record<string, { lat: number; lon: number; label: Label }> = {
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
  vierwaldstaettersee: [
    [47.052, 8.31], [47.047, 8.345], [47.05, 8.38], [47.07, 8.405], [47.085, 8.437], [47.079, 8.442], [47.06, 8.42],
    [47.042, 8.41], [47.034, 8.435], [47.012, 8.484], [46.997, 8.525], [46.999, 8.6], [46.99, 8.618], [46.95, 8.622],
    [46.903, 8.625], [46.886, 8.612], [46.92, 8.594], [46.965, 8.587], [46.983, 8.565], [46.982, 8.53], [46.972, 8.48],
    [46.975, 8.425], [46.985, 8.41], [47.0, 8.4], [47.0, 8.37], [46.99, 8.35], [46.977, 8.338], [46.965, 8.3],
    [46.952, 8.272], [46.958, 8.268], [46.972, 8.308], [46.986, 8.316], [47.01, 8.322], [47.035, 8.305],
  ],
  zuerichsee: [
    [47.366, 8.545], [47.32, 8.578], [47.28, 8.63], [47.255, 8.68], [47.24, 8.72], [47.232, 8.79], [47.228, 8.82],
    [47.218, 8.82], [47.216, 8.74], [47.21, 8.7], [47.232, 8.665], [47.255, 8.62], [47.285, 8.575], [47.31, 8.555],
    [47.355, 8.535],
  ],
  sarnersee: [[46.905, 8.235], [46.888, 8.245], [46.862, 8.216], [46.866, 8.204], [46.89, 8.22]],
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

/** Einfache Projektion auf ein SVG-Raster (1 Einheit = 200 m) */
export const UNITS_PER_KM = 5;
export const bounds = { north: 47.405, south: 46.845, west: 8.11, east: 8.79 };
const kmPerLon = 111.32 * Math.cos((47.12 * Math.PI) / 180);
export const project = (lat: number, lon: number) => ({
  x: (lon - bounds.west) * kmPerLon * UNITS_PER_KM,
  y: (bounds.north - lat) * 111.2 * UNITS_PER_KM,
});
export const viewBox = (() => {
  const br = project(bounds.south, bounds.east);
  return { w: Math.round(br.x), h: Math.round(br.y) };
})();
