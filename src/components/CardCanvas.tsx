import React, { forwardRef } from 'react';
import { CardState } from '../types/card';
import { THEME_CONFIGS, ASPECT_RATIOS } from '../data/themes';
import { CheckCircle2, Quote, Linkedin, Twitter, Sparkles, Terminal, ShieldCheck, ArrowRight, TrendingUp } from 'lucide-react';

interface CardCanvasProps {
  card: CardState;
  zoomLevel: number;
  onUpdateField?: (field: keyof CardState, value: any) => void;
  slideOverride?: {
    slideNumber: number;
    totalSlides: number;
    title: string;
    subtitle: string;
    bodyText: string;
  };
}

export const CardCanvas = forwardRef<HTMLDivElement, CardCanvasProps>(({
  card,
  zoomLevel,
  onUpdateField,
  slideOverride,
}, ref) => {
  const theme = THEME_CONFIGS[card.themePreset] || THEME_CONFIGS.obsidian_dark;
  const dimension = ASPECT_RATIOS[card.aspectRatio] || ASPECT_RATIOS.linkedin_landscape;

  // Pattern overlays SVG background
  const getPatternBg = () => {
    switch (card.patternOverlay) {
      case 'dots':
        return 'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)';
      case 'grid':
        return 'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)';
      case 'radial_glow':
        return `radial-gradient(circle at 80% 20%, ${theme.accentColor}25 0%, transparent 60%)`;
      default:
        return 'none';
    }
  };

  const patternSize = card.patternOverlay === 'grid' ? '24px 24px' : card.patternOverlay === 'dots' ? '16px 16px' : 'auto';

  // Apply custom colors if specified
  const bgStyle: React.CSSProperties = {
    background: card.customBgColor
      ? card.customBgColor
      : card.customGradientFrom && card.customGradientTo
      ? `linear-gradient(135deg, ${card.customGradientFrom}, ${card.customGradientTo})`
      : undefined,
  };

  const cardStyle: React.CSSProperties = {
    borderRadius: `${card.borderRadius}px`,
    fontFamily: card.fontFamily || theme.fontFamily,
    color: card.customTextColor || undefined,
  };

  const headlineText = slideOverride ? slideOverride.title : card.headline;
  const subtitleText = slideOverride ? slideOverride.subtitle : card.subtitle;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Aspect Ratio & Resolution Info Bar */}
      <div className="flex items-center gap-3 mb-3 text-xs text-slate-400 font-mono bg-slate-900/60 px-3 py-1 rounded-full border border-slate-800/60">
        <span className="flex items-center gap-1.5 font-sans font-medium text-slate-300">
          {card.platform === 'linkedin' ? (
            <Linkedin className="w-3.5 h-3.5 text-sky-400" />
          ) : card.platform === 'twitter' ? (
            <Twitter className="w-3.5 h-3.5 text-sky-400" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          )}
          <span>{dimension.platformName}</span>
        </span>
        <span className="text-slate-600">·</span>
        <span>{dimension.width} × {dimension.height} px</span>
        <span className="text-slate-600">·</span>
        <span className="text-slate-400">{dimension.label}</span>
      </div>

      {/* Scalable Container Frame */}
      <div 
        className="relative shadow-2xl transition-all duration-200"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top center',
          width: `${dimension.width > 1200 ? 1200 : dimension.width}px`,
          maxWidth: '100%',
        }}
      >
        {/* The Card Node captured by HTML-to-Image */}
        <div
          ref={ref}
          id="social-card-node"
          className={`relative overflow-hidden w-full ${dimension.aspectRatioCss} ${
            !card.customBgColor && !card.customGradientFrom ? theme.bgClass : ''
          } p-8 md:p-12 flex flex-col justify-between text-left border ${
            card.hasGlowBorder ? 'border-sky-500/40 shadow-[0_0_40px_rgba(56,189,248,0.15)]' : theme.borderClass
          }`}
          style={{
            ...bgStyle,
            ...cardStyle,
          }}
        >
          {/* Background Image Layer */}
          {card.bgImageUrl && (
            <div 
              className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
              style={{
                backgroundImage: `url(${card.bgImageUrl})`,
                opacity: card.bgImageOpacity,
              }}
            />
          )}

          {/* Pattern Overlay Layer */}
          {card.patternOverlay !== 'none' && (
            <div 
              className="absolute inset-0 pointer-events-none z-0 opacity-40"
              style={{
                backgroundImage: getPatternBg(),
                backgroundSize: patternSize,
              }}
            />
          )}

          {/* Top Header Row: Category Badge & Platform Badge */}
          <div className="relative z-10 flex items-center justify-between gap-4 w-full mb-6">
            {/* Category Kicker Badge */}
            {card.badgeText && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold tracking-wider uppercase font-mono ${theme.badgeBgClass} ${theme.badgeTextClass}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {card.badgeText}
              </span>
            )}

            {/* Slide Counter if Carousel mode */}
            {slideOverride && (
              <span className="ml-auto text-xs font-mono font-medium text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/50">
                {slideOverride.slideNumber} / {slideOverride.totalSlides}
              </span>
            )}

            {/* Platform Icon Badge */}
            {card.author.showPlatformBadge && !slideOverride && (
              <div className="ml-auto flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-800/80">
                {card.platform === 'linkedin' ? (
                  <>
                    <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                    <span className="font-medium text-slate-300">LinkedIn</span>
                  </>
                ) : card.platform === 'twitter' ? (
                  <>
                    <Twitter className="w-3.5 h-3.5 text-sky-400" />
                    <span className="font-medium text-slate-300">Twitter / X</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="font-medium text-slate-300">aTide</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Main Content Area based on Layout Template */}
          <div className="relative z-10 my-auto flex-1 flex flex-col justify-center gap-5 py-2">
            
            {/* Layout 1: SaaS Spotlight / Standard Card */}
            {(card.layoutTemplate === 'saas_spotlight' || card.layoutTemplate === 'minimalist') && (
              <div className="space-y-4">
                <h1 className={`text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${theme.textClass}`}>
                  {headlineText}
                </h1>
                
                {subtitleText && (
                  <p className={`text-sm md:text-lg font-normal leading-relaxed ${theme.mutedTextClass} max-w-3xl`}>
                    {subtitleText}
                  </p>
                )}

                {/* Metric callout pill if stat value provided */}
                {card.statValue && (
                  <div className="inline-flex items-center gap-3 p-3 px-4 rounded-xl bg-slate-900/80 border border-slate-800/80 text-slate-100 shadow-lg">
                    <div className="text-2xl md:text-3xl font-black font-mono text-sky-400">
                      {card.statValue}
                    </div>
                    {card.statLabel && (
                      <div className="text-xs md:text-sm font-medium text-slate-300 leading-snug">
                        {card.statLabel}
                      </div>
                    )}
                  </div>
                )}

                {/* Bullet Points */}
                {card.bullets && card.bullets.length > 0 && (
                  <ul className="grid gap-2.5 pt-2 max-w-2xl">
                    {card.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Layout 2: Code Snippet Frame */}
            {card.layoutTemplate === 'code_snippet' && (
              <div className="space-y-4 w-full">
                <div className="space-y-1">
                  <h1 className={`text-xl md:text-3xl font-bold tracking-tight ${theme.textClass}`}>
                    {headlineText}
                  </h1>
                  {subtitleText && (
                    <p className={`text-xs md:text-sm ${theme.mutedTextClass}`}>
                      {subtitleText}
                    </p>
                  )}
                </div>

                {/* macOS Code Editor Frame */}
                <div className="w-full rounded-xl bg-slate-950/90 border border-slate-800 shadow-2xl overflow-hidden text-left font-jetbrains">
                  {/* Editor Window Header */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <Terminal className="w-3 h-3 text-sky-400" />
                      <span>{card.codeSnippet.language || 'typescript'}</span>
                    </div>
                  </div>
                  {/* Code Body */}
                  <pre className="p-4 text-xs md:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                    <code>{card.codeSnippet.code || '// Paste your code snippet here'}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Layout 3: Stat & Metric Infographic */}
            {card.layoutTemplate === 'stat_infographic' && (
              <div className="grid md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 space-y-3">
                  <h1 className={`text-2xl md:text-4xl font-extrabold tracking-tight ${theme.textClass}`}>
                    {headlineText}
                  </h1>
                  {subtitleText && (
                    <p className={`text-xs md:text-sm ${theme.mutedTextClass}`}>
                      {subtitleText}
                    </p>
                  )}
                  {card.bullets && card.bullets.length > 0 && (
                    <div className="space-y-2 pt-2">
                      {card.bullets.map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-slate-200">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Big Stat Box */}
                <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-sky-500/10 to-indigo-500/10 border border-sky-500/30 text-center shadow-xl">
                  <div className="text-4xl md:text-6xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
                    {card.statValue || '+100%'}
                  </div>
                  {card.statLabel && (
                    <div className="mt-2 text-xs md:text-sm font-medium text-slate-300 uppercase tracking-wider font-mono">
                      {card.statLabel}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Layout 4: Bold Quote & Wisdom */}
            {card.layoutTemplate === 'bold_quote' && (
              <div className="space-y-4 max-w-3xl">
                <Quote className="w-10 h-10 md:w-14 md:h-14 text-sky-400/40" />
                <p className={`text-xl md:text-3xl lg:text-4xl font-serif italic leading-relaxed tracking-tight ${theme.textClass}`}>
                  {card.quoteText || headlineText}
                </p>
                {subtitleText && (
                  <p className={`text-xs md:text-sm font-sans ${theme.mutedTextClass}`}>
                    — {subtitleText}
                  </p>
                )}
              </div>
            )}

            {/* Layout 5: Key Takeaways List */}
            {card.layoutTemplate === 'key_takeaways' && (
              <div className="space-y-4">
                <h1 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${theme.textClass}`}>
                  {headlineText}
                </h1>
                {card.bullets && card.bullets.length > 0 && (
                  <div className="grid gap-3 pt-2">
                    {card.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                        <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold font-mono shrink-0">
                          0{idx + 1}
                        </span>
                        <span className="text-xs md:text-sm text-slate-200 leading-snug">{bullet}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Layout 6: Carousel Slide View */}
            {slideOverride && (
              <div className="space-y-4 max-w-2xl my-auto">
                <h1 className={`text-2xl md:text-4xl font-bold tracking-tight ${theme.textClass}`}>
                  {slideOverride.title}
                </h1>
                {slideOverride.subtitle && (
                  <p className={`text-sm md:text-base font-medium text-sky-400`}>
                    {slideOverride.subtitle}
                  </p>
                )}
                {slideOverride.bodyText && (
                  <p className={`text-xs md:text-sm leading-relaxed ${theme.mutedTextClass}`}>
                    {slideOverride.bodyText}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Footer Signature: Author Profile Lockup */}
          <div className="relative z-10 pt-6 border-t border-slate-800/60 flex items-center justify-between gap-4 mt-auto">
            <div className="flex items-center gap-3">
              {card.author.avatarUrl ? (
                <img
                  src={card.author.avatarUrl}
                  alt={card.author.name}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover ring-2 ring-sky-500/40 shadow-md"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm ring-2 ring-sky-500/40 shadow-md">
                  {card.author.name ? card.author.name.charAt(0) : 'A'}
                </div>
              )}

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-100">
                  <span>{card.author.name || 'Author Name'}</span>
                  {card.author.isVerified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  )}
                </div>
                <div className="text-[11px] md:text-xs text-slate-400 truncate max-w-[280px]">
                  {card.author.role || card.author.handle || '@handle'}
                </div>
              </div>
            </div>

            {/* Custom Logo or Callout Footer */}
            {card.author.customLogoUrl ? (
              <img src={card.author.customLogoUrl} alt="Logo" className="h-6 object-contain opacity-80" />
            ) : (
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest hidden sm:block">
                aTide · AI Card
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

CardCanvas.displayName = 'CardCanvas';
