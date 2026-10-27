import React, { useState } from 'react';
import { Sparkles, Download, Copy, Bookmark, Check, RefreshCw, LayoutGrid } from 'lucide-react';
import { CARD_PRESETS } from '../data/presets';
import { CardState } from '../types/card';

interface HeaderProps {
  onSelectPreset: (preset: CardState) => void;
  onExportPng: (scale: number) => void;
  onCopyCaption: () => void;
  onSaveDraft: () => void;
  isExporting: boolean;
  copiedCaption: boolean;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectPreset,
  onExportPng,
  onCopyCaption,
  onSaveDraft,
  isExporting,
  copiedCaption,
  savedCount,
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showPresetMenu, setShowPresetMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-6 px-6 py-3 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Zone 1: Single text element wordmark */}
      <a 
        href="#" 
        onClick={(e) => e.preventDefault()}
        className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 via-indigo-500 to-fuchsia-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="font-outfit text-xl bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          aTide
        </span>
      </a>

      {/* Zone 2: Quick Template Presets Dropdown */}
      <div className="hidden md:flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setShowPresetMenu(!showPresetMenu)}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-sky-400" />
            <span>Load Preset Template</span>
            <span className="text-[10px] text-slate-500">▼</span>
          </button>

          {showPresetMenu && (
            <div 
              className="absolute left-0 mt-2 w-64 p-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 text-xs text-slate-200 space-y-1"
              onMouseLeave={() => setShowPresetMenu(false)}
            >
              <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Quick Preset Templates
              </div>
              {CARD_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelectPreset(p);
                    setShowPresetMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 flex flex-col gap-0.5 transition-colors"
                >
                  <span className="font-semibold text-slate-100">{p.title}</span>
                  <span className="text-[10px] text-slate-400 truncate">{p.headline}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Zone 3: Single Primary Export & Quick Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onSaveDraft}
          title="Save draft to local library"
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <Bookmark className="w-3.5 h-3.5 text-amber-400" />
          <span>Save Draft</span>
          {savedCount > 0 && (
            <span className="px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded text-[10px] font-mono">
              {savedCount}
            </span>
          )}
        </button>

        <button
          onClick={onCopyCaption}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          {copiedCaption ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Caption Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Post Text</span>
            </>
          )}
        </button>

        <div className="relative">
          <div className="flex items-center">
            <button
              onClick={() => onExportPng(2)}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 active:scale-95 rounded-l-lg shadow-md transition-all whitespace-nowrap shrink-0 disabled:opacity-50"
            >
              {isExporting ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{isExporting ? 'Exporting...' : 'Export High-Res PNG'}</span>
            </button>
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isExporting}
              className="px-2 py-2 text-xs font-semibold text-white bg-indigo-700 hover:bg-indigo-600 border-l border-indigo-500/40 rounded-r-lg transition-colors"
              title="DPI Scale Options"
            >
              ▼
            </button>
          </div>

          {showExportMenu && (
            <div 
              className="absolute right-0 mt-2 w-48 p-1.5 bg-slate-900 border border-slate-800 rounded-lg shadow-xl z-50 text-xs text-slate-200"
              onMouseLeave={() => setShowExportMenu(false)}
            >
              <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                PNG Resolution Scale
              </div>
              <button
                onClick={() => { onExportPng(1); setShowExportMenu(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800 flex items-center justify-between"
              >
                <span>Standard (1x DPI)</span>
                <span className="text-[10px] text-slate-500 font-mono">100%</span>
              </button>
              <button
                onClick={() => { onExportPng(2); setShowExportMenu(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800 flex items-center justify-between text-sky-400 font-medium"
              >
                <span>HD High DPI (2x)</span>
                <span className="text-[10px] bg-sky-500/20 px-1 rounded text-sky-300 font-mono">Rec</span>
              </button>
              <button
                onClick={() => { onExportPng(3); setShowExportMenu(false); }}
                className="w-full text-left px-2.5 py-1.5 rounded hover:bg-slate-800 flex items-center justify-between"
              >
                <span>Ultra HD (3x DPI)</span>
                <span className="text-[10px] text-slate-500 font-mono">Max</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
