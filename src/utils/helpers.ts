export function updateArrayItem<T>(
  array: T[],
  predicate: (item: T) => boolean,
  updater: (item: T) => T
): T[] {
  return array.map((item) => (predicate(item) ? updater(item) : item));
}

export function removeArrayItem<T>(
  array: T[],
  predicate: (item: T) => boolean
): T[] {
  return array.filter((item) => !predicate(item));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
