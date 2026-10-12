/**
 * Returns the correct public asset URL regardless of deployment base path.
 * Works for local dev (base = '/') and GitHub Pages (base = '/design_silicon_vlsi/').
 *
 * Usage: assetPath('/images/dsv-badge-dark.jpg')
 */
export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL; // e.g. '/' or '/design_silicon_vlsi/'
  // Remove leading slash from path and trailing slash from base to avoid doubles
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = base.endsWith('/') ? base : base + '/';
  return cleanBase + cleanPath;
}
