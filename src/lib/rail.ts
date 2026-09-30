/**
 * Klassen für Karussell-Einträge (<li data-rail-item>) je nach Umschaltpunkt.
 * Unterhalb des Breakpoints: Wisch-Karussell, darüber: normales Raster.
 */
export type RailBreakpoint = 'sm' | 'md';

export const railItemClass: Record<RailBreakpoint, string> = {
  sm: 'grid w-[86%] shrink-0 snap-start xs:w-[78%] sm:w-auto',
  md: 'grid w-[86%] shrink-0 snap-start xs:w-[78%] sm:w-[60%] md:w-auto',
};

export const railTrackClass: Record<RailBreakpoint, string> = {
  sm: 'sm:mx-0 sm:grid sm:snap-none sm:overflow-visible sm:px-0 sm:pb-0',
  md: 'sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:snap-none md:overflow-visible md:px-0 md:pb-0',
};

export const railControlsHidden: Record<RailBreakpoint, string> = {
  sm: 'sm:hidden',
  md: 'md:hidden',
};

/** Media-Query, in der das Karussell aktiv ist (für Autoplay) */
export const railMobileQuery: Record<RailBreakpoint, string> = {
  sm: '(width < 40rem)',
  md: '(width < 48rem)',
};
