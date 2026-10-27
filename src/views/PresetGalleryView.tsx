import React from 'react';
import { CARD_PRESETS } from '../data/presets';
import { CardState } from '../types/card';
import { Sparkles, ArrowRight, LayoutGrid, Check } from 'lucide-react';

interface PresetGalleryViewProps {
  onSelectPreset: (preset: CardState) => void;
}

export const PresetGalleryView: React.FC<PresetGalleryViewProps> = ({ onSelectPreset }) => {
  return (
    <div className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto text-left space-y-8">
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400 text-xs font-mono font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Social Card Templates</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-outfit">
          High-Converting Presets
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Select a pre-designed layout engineered for viral reach on LinkedIn & Twitter/X. Customize text, branding, and colors instantly.
        </p>
      </div>

      {/* Preset Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CARD_PRESETS.map((preset) => (
          <div
            key={preset.id}
            className="group relative bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-5 space-y-4 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
                {preset.badgeText || 'TEMPLATE'}
              </span>
              <span className="text-[11px] font-mono text-slate-500 bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800">
                {preset.platform}
              </span>
            </div>

            {/* Title & Preview */}
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                {preset.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {preset.headline}
              </p>
            </div>

            {/* Details & Author */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="capitalize">{preset.layoutTemplate.replace('_', ' ')}</span>
              <span className="capitalize text-slate-500">{preset.themePreset.replace('_', ' ')}</span>
            </div>

            {/* Use Template Action Button */}
            <button
              onClick={() => onSelectPreset(preset)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800 group-hover:bg-sky-500 text-slate-200 group-hover:text-white font-semibold text-xs rounded-xl transition-all shadow-md"
            >
              <span>Use This Template</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
