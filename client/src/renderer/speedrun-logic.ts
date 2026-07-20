// Pure route-building logic for FEATURE_ADDENDUM §B2, DOM-free and
// unit-tested (same split as checklist-logic.ts / settings-logic.ts).
// A route is an ordered list of location names; order is the order the
// player clicked them in — that IS the route.

export function toggleStop(route: string[], name: string): string[] {
  return route.includes(name) ? route.filter((n) => n !== name) : [...route, name];
}

export function removeStopAt(route: string[], index: number): string[] {
  return route.filter((_, i) => i !== index);
}

export function serializeRoute(route: string[]): string {
  return JSON.stringify(route);
}

export function deserializeRoute(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n): n is string => typeof n === 'string') : [];
  } catch {
    return [];
  }
}
