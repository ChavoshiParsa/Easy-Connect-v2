import { Theme } from '@prisma/client';

export const colorNames: Theme[] = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
];

export const grn = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const gradientColors = {
  red: 'linear-gradient(to bottom, #fca5a5, #ef4444, #b91c1c)',
  orange: 'linear-gradient(to bottom, #fdba74, #f97316, #c2410c)',
  amber: 'linear-gradient(to bottom, #fcd34d, #f59e0b, #b45309)',
  yellow: 'linear-gradient(to bottom, #fde047, #eab308, #a16207)',
  lime: 'linear-gradient(to bottom, #bef264, #84cc16, #4d7c0f)',
  green: 'linear-gradient(to bottom, #86efac, #22c55e, #15803d)',
  emerald: 'linear-gradient(to bottom, #6ee7b7, #10b981, #047857)',
  teal: 'linear-gradient(to bottom, #5eead4, #14b8a6, #0f766e)',
  cyan: 'linear-gradient(to bottom, #67e8f9, #06b6d4, #0e7490)',
  sky: 'linear-gradient(to bottom, #7dd3fc, #0ea5e9, #0369a1)',
  blue: 'linear-gradient(to bottom, #93c5fd, #3b82f6, #1d4ed8)',
  indigo: 'linear-gradient(to bottom, #a5b4fc, #6366f1, #4338ca)',
  violet: 'linear-gradient(to bottom, #c4b5fd, #8b5cf6, #6d28d9)',
  purple: 'linear-gradient(to bottom, #d8b4fe, #a855f7, #7e22ce)',
  fuchsia: 'linear-gradient(to bottom, #f0abfc, #d946ef, #a21caf)',
  pink: 'linear-gradient(to bottom, #f9a8d4, #ec4899, #be185d)',
  rose: 'linear-gradient(to bottom, #fda4af, #f43f5e, #be123c)',
};
