/** Linien-Icons im Stil der Visitenkarte (24×24, Kontur). */
export const icons = {
  excavator:
    '<rect x="1.5" y="17" width="12" height="4" rx="2"/><path d="M4 17v-4h3.5l1-4H11v8"/><path d="M11 12.5 16 5l5.5 4.5"/><path d="M21.5 9.5v4.5h-3.5l1.5-2.5"/>',
  road: '<path d="M5 21 9 3M19 21 15 3"/><path d="M12 5v2M12 11v2M12 17v2"/>',
  pipe: '<path d="M2 8.5h11v7H2"/><rect x="13" y="6.5" width="3.5" height="11" rx="1"/><path d="M16.5 9.5H22M16.5 14.5H22"/>',
  manhole:
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6"/><path d="M8 10h8M7.5 12h9M8 14h8"/>',
  phone:
    '<path d="M5 3.5h3.5l1.8 4.5-2.3 1.5a11 11 0 0 0 6.5 6.5l1.5-2.3 4.5 1.8V19a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3 5.5a2 2 0 0 1 2-2Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6 8.5 7 8.5-7"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  check: '<path d="m4.5 12.5 5 5 10-11"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 3 3 5-6"/>',
  arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  swiss: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 7v10M7 12h10"/>',
  handshake:
    '<path d="m2 12 4-4 4 2 3-2 3 2 6-2"/><path d="m6 8 6 7a1.5 1.5 0 0 0 2.2 0l.3-.3a1.5 1.5 0 0 0 0-2.1L12 10"/><path d="m22 10-6 6"/>',
  shield: '<path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  layers: '<path d="m12 2.5 9 4.75-9 4.75-9-4.75Z"/><path d="m3 12 9 4.75L21 12"/><path d="m3 16.5 9 4.75 9-4.75"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v4h16v-4"/>',
  camera: '<path d="M3 8h4l2-3h6l2 3h4v11H3Z"/><circle cx="12" cy="13" r="3.5"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  close: '<path d="M5 5l14 14M19 5 5 19"/>',
  alert: '<path d="M12 3 2 20h20Z"/><path d="M12 10v4M12 17v.5"/>',
} as const;

export type IconName = keyof typeof icons;
