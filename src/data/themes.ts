import { ThemePreset, AspectRatio } from '../types/card';

export interface ThemeConfig {
  id: ThemePreset;
  name: string;
  bgClass: string;
  cardBgClass: string;
  textClass: string;
  mutedTextClass: string;
  accentColor: string;
  badgeBgClass: string;
  badgeTextClass: string;
  borderClass: string;
  isDark: boolean;
  fontFamily: string;
}

export const THEME_CONFIGS: Record<ThemePreset, ThemeConfig> = {
  obsidian_dark: {
    id: 'obsidian_dark',
    name: 'Obsidian Dark',
    bgClass: 'bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-950',
    cardBgClass: 'bg-slate-900/80 backdrop-blur-md',
    textClass: 'text-slate-100',
    mutedTextClass: 'text-slate-400',
    accentColor: '#38bdf8',
    badgeBgClass: 'bg-sky-500/10 border border-sky-500/30',
    badgeTextClass: 'text-sky-400',
    borderClass: 'border-slate-800',
    isDark: true,
    fontFamily: 'Plus Jakarta Sans',
  },
  executive_navy: {
    id: 'executive_navy',
    name: 'Executive Navy',
    bgClass: 'bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950',
    cardBgClass: 'bg-slate-900/90 backdrop-blur-md',
    textClass: 'text-slate-50',
    mutedTextClass: 'text-slate-300',
    accentColor: '#f59e0b',
    badgeBgClass: 'bg-amber-500/10 border border-amber-500/30',
    badgeTextClass: 'text-amber-400',
    borderClass: 'border-blue-900/50',
    isDark: true,
    fontFamily: 'Plus Jakarta Sans',
  },
  sunset_gradient: {
    id: 'sunset_gradient',
    name: 'Sunset Mesh',
    bgClass: 'bg-gradient-to-br from-indigo-950 via-purple-900 to-rose-950',
    cardBgClass: 'bg-purple-950/70 backdrop-blur-md',
    textClass: 'text-white',
    mutedTextClass: 'text-purple-200/80',
    accentColor: '#f43f5e',
    badgeBgClass: 'bg-rose-500/20 border border-rose-400/30',
    badgeTextClass: 'text-rose-300',
    borderClass: 'border-purple-800/40',
    isDark: true,
    fontFamily: 'Outfit',
  },
  emerald_mint: {
    id: 'emerald_mint',
    name: 'Emerald Mint',
    bgClass: 'bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950',
    cardBgClass: 'bg-emerald-950/70 backdrop-blur-md',
    textClass: 'text-emerald-50',
    mutedTextClass: 'text-emerald-300/70',
    accentColor: '#10b981',
    badgeBgClass: 'bg-emerald-500/15 border border-emerald-500/30',
    badgeTextClass: 'text-emerald-300',
    borderClass: 'border-emerald-800/40',
    isDark: true,
    fontFamily: 'Plus Jakarta Sans',
  },
  clean_minimal: {
    id: 'clean_minimal',
    name: 'Clean Light Minimal',
    bgClass: 'bg-gradient-to-br from-slate-100 via-white to-slate-200',
    cardBgClass: 'bg-white/90 backdrop-blur-md shadow-lg',
    textClass: 'text-slate-900',
    mutedTextClass: 'text-slate-600',
    accentColor: '#2563eb',
    badgeBgClass: 'bg-blue-50 border border-blue-200',
    badgeTextClass: 'text-blue-700',
    borderClass: 'border-slate-200',
    isDark: false,
    fontFamily: 'Plus Jakarta Sans',
  },
  cyber_purple: {
    id: 'cyber_purple',
    name: 'Cyber Violet',
    bgClass: 'bg-gradient-to-br from-purple-950 via-slate-950 to-violet-950',
    cardBgClass: 'bg-purple-950/80 backdrop-blur-md',
    textClass: 'text-fuchsia-100',
    mutedTextClass: 'text-purple-300/80',
    accentColor: '#e879f9',
    badgeBgClass: 'bg-fuchsia-500/15 border border-fuchsia-500/30',
    badgeTextClass: 'text-fuchsia-300',
    borderClass: 'border-purple-800/50',
    isDark: true,
    fontFamily: 'Bricolage Grotesque',
  },
  warm_editorial: {
    id: 'warm_editorial',
    name: 'Warm Editorial',
    bgClass: 'bg-[#f6f3ed]',
    cardBgClass: 'bg-[#faf8f5] shadow-sm border border-[#e5dfd5]',
    textClass: 'text-[#1c1917]',
    mutedTextClass: 'text-[#57534e]',
    accentColor: '#c2410c',
    badgeBgClass: 'bg-[#f2ece1] border border-[#d6cbba]',
    badgeTextClass: 'text-[#9a3412]',
    borderClass: 'border-[#e2dacd]',
    isDark: false,
    fontFamily: 'Playfair Display',
  },
  midnight_neon: {
    id: 'midnight_neon',
    name: 'Midnight Cyber',
    bgClass: 'bg-black',
    cardBgClass: 'bg-zinc-950/90 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.15)]',
    textClass: 'text-zinc-100',
    mutedTextClass: 'text-zinc-400',
    accentColor: '#22d3ee',
    badgeBgClass: 'bg-cyan-950 border border-cyan-500/50',
    badgeTextClass: 'text-cyan-300',
    borderClass: 'border-cyan-500/30',
    isDark: true,
    fontFamily: 'JetBrains Mono',
  },
};

export interface DimensionSpec {
  id: AspectRatio;
  label: string;
  platformName: string;
  width: number;
  height: number;
  aspectRatioCss: string;
  recommendedUse: string;
}

export const ASPECT_RATIOS: Record<AspectRatio, DimensionSpec> = {
  linkedin_landscape: {
    id: 'linkedin_landscape',
    label: 'LinkedIn Post (1.91:1)',
    platformName: 'LinkedIn',
    width: 1200,
    height: 627,
    aspectRatioCss: 'aspect-[1200/627]',
    recommendedUse: 'Standard feed posts & link cards',
  },
  linkedin_square: {
    id: 'linkedin_square',
    label: 'LinkedIn Square (1:1)',
    platformName: 'LinkedIn',
    width: 1080,
    height: 1080,
    aspectRatioCss: 'aspect-square',
    recommendedUse: 'High-engagement mobile feed posts',
  },
  linkedin_portrait: {
    id: 'linkedin_portrait',
    label: 'LinkedIn Portrait (4:5)',
    platformName: 'LinkedIn',
    width: 1080,
    height: 1350,
    aspectRatioCss: 'aspect-[4/5]',
    recommendedUse: 'Tall mobile feed dominates screen space',
  },
  linkedin_banner: {
    id: 'linkedin_banner',
    label: 'LinkedIn Header (4:1)',
    platformName: 'LinkedIn',
    width: 1584,
    height: 396,
    aspectRatioCss: 'aspect-[1584/396]',
    recommendedUse: 'Personal & Company profile headers',
  },
  twitter_landscape: {
    id: 'twitter_landscape',
    label: 'Twitter / X Post (16:9)',
    platformName: 'Twitter/X',
    width: 1200,
    height: 675,
    aspectRatioCss: 'aspect-video',
    recommendedUse: 'Large Summary card & tweet image',
  },
  twitter_square: {
    id: 'twitter_square',
    label: 'Twitter / X Square (1:1)',
    platformName: 'Twitter/X',
    width: 1200,
    height: 1200,
    aspectRatioCss: 'aspect-square',
    recommendedUse: 'Square tweet visual',
  },
  twitter_header: {
    id: 'twitter_header',
    label: 'Twitter / X Header (3:1)',
    platformName: 'Twitter/X',
    width: 1500,
    height: 500,
    aspectRatioCss: 'aspect-[3/1]',
    recommendedUse: 'Profile header backdrop banner',
  },
};
