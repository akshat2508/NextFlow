export function now(): Date {
  return new Date();
}

export function durationMs(
  start: Date,
  end: Date
): number {
  return end.getTime() - start.getTime();
}

export function toIso(date: Date): string {
  return date.toISOString();
}