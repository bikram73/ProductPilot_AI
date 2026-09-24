// Utility to ensure the ProductPilot logo is rendered with 100% fidelity on the browser tab title / favicon
export const LOGO_SVG_RAW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="navBgGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#006b2c" />
      <stop offset="50%" stop-color="#005221" />
      <stop offset="100%" stop-color="#003915" />
    </linearGradient>
    <linearGradient id="pilotLogoGrad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#7ffc97" />
      <stop offset="55%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#bdcaba" />
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="60" height="60" rx="16" ry="16" fill="url(#navBgGrad)" stroke="#7ffc97" stroke-width="2" stroke-opacity="0.45" />
  <g transform="translate(12, 12) scale(1.25)">
    <path d="M16 3L27 25L16 20.5L5 25L16 3Z" fill="url(#pilotLogoGrad)" />
    <path d="M16 3V20.5" stroke="#003915" stroke-width="1.6" stroke-linecap="round" />
    <circle cx="16" cy="11" r="1.75" fill="#003915" />
    <path d="M24 3L25 6L28 7L25 8L24 11L23 8L20 7L23 6L24 3Z" fill="#7ffc97" />
  </g>
</svg>`;

export const SVG_DATA_URI = `data:image/svg+xml,${encodeURIComponent(LOGO_SVG_RAW)}`;

export function initFavicon(): void {
  try {
    // 1. Set SVG favicon directly
    updateOrCreateLink('icon', 'image/svg+xml', SVG_DATA_URI);
    updateOrCreateLink('alternate icon', 'image/svg+xml', '/favicon.svg');
    updateOrCreateLink('shortcut icon', 'image/x-icon', SVG_DATA_URI);
    updateOrCreateLink('apple-touch-icon', 'image/png', SVG_DATA_URI);

    // 2. Render to canvas to create high-compatibility PNG favicon
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, 64, 64);
          const pngDataUri = canvas.toDataURL('image/png');
          updateOrCreateLink('icon', 'image/png', pngDataUri, '64x64');
          updateOrCreateLink('apple-touch-icon', 'image/png', pngDataUri);
        }
      } catch {
        // Fallback silently
      }
    };
    img.src = SVG_DATA_URI;
  } catch {
    // Fallback silently
  }
}

function updateOrCreateLink(rel: string, type: string, href: string, sizes?: string): void {
  let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"][type="${type}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    link.type = type;
    if (sizes) link.sizes.add(sizes);
    document.head.appendChild(link);
  }
  link.href = href;
}
