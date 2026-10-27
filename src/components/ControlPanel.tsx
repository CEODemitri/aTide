import React, { useState } from 'react';
import { CardState, Platform, LayoutTemplate, ThemePreset, FontFamily } from '../types/card';
import { THEME_CONFIGS, ASPECT_RATIOS } from '../data/themes';
import { Sparkles, RefreshCw, Image as ImageIcon, Plus, Trash2, ShieldCheck, Layers } from 'lucide-react';

interface ControlPanelProps {
  card: CardState;
  onChangeCard: (updated: Partial<CardState>) => void;
  onGenerateAiContent: (topic: string, contentType: string, tone: string) => Promise<void>;
  onGenerateAiImage: (prompt: string) => Promise<void>;
  isGeneratingAi: boolean;
  isGeneratingImage: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  card,
  onChangeCard,
  onGenerateAiContent,
  onGenerateAiImage,
  isGeneratingAi,
  isGeneratingImage,
}) => {
  const [topicInput, setTopicInput] = useState('');
  const [contentType, setContentType] = useState('thought_leadership');
  const [tone, setTone] = useState('professional');
  const [imagePrompt, setImagePrompt] = useState('');

  const starterPrompts = [
    'SaaS $1M ARR Milestone',
    'Why We Wrote Engine in Rust',
    'AI Search for Developers',
    '5 Principles of Frontend Design',
  ];

  const presetAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  ];

  const handleAddBullet = () => {
    onChangeCard({ bullets: [...card.bullets, 'New key takeaway'] });
  };

  const handleUpdateBullet = (index: number, val: string) => {
    const updated = [...card.bullets];
    updated[index] = val;
    onChangeCard({ bullets: updated });
  };

  const handleRemoveBullet = (index: number) => {
    const updated = card.bullets.filter((_, i) => i !== index);
    onChangeCard({ bullets: updated });
  };

  return (
    <div className="w-full lg:w-96 flex flex-col h-full bg-slate-950 border-r border-slate-800/80 text-left text-slate-200 shrink-0 overflow-y-auto p-5 space-y-6">
      
      {/* SECTION 1: AI GENERATOR COPILOT */}
      <div className="space-y-3.5 bg-slate-900/60 p-4 border border-slate-800/80 rounded-2xl">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>AI Card & Content Generator</span>
        </div>

        <div>
          <textarea
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            placeholder="Type your topic or paste raw notes e.g. Released new open source AI library with 10x faster inference..."
            className="w-full h-20 p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 resize-none"
          />
        </div>

        {/* Starters */}
        <div className="flex flex-wrap gap-1">
          {starterPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => setTopicInput(p)}
              className="text-[10px] px-2 py-0.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-md text-slate-300 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] font-medium text-slate-400 mb-1">Goal</label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full p-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
            >
              <option value="thought_leadership">Thought Leadership</option>
              <option value="product_launch">Product Launch</option>
              <option value="code_snippet">Code Snippet</option>
              <option value="stat_infographic">Stat Insight</option>
              <option value="bold_quote">Quote / Wisdom</option>
              <option value="hiring">Hiring Notice</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-medium text-slate-400 mb-1">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
            >
              <option value="professional">Executive Crisp</option>
              <option value="bold">Bold & Viral</option>
              <option value="tech">Developer / Tech</option>
              <option value="minimalist">Minimal Editorial</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => onGenerateAiContent(topicInput || 'SaaS launch', contentType, tone)}
          disabled={isGeneratingAi}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-50"
        >
          {isGeneratingAi ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-200" />
              <span>Generating AI Card...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-sky-200" />
              <span>Generate Card & Post Copy</span>
            </>
          )}
        </button>
      </div>

      {/* SECTION 2: FORMAT & LAYOUT */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Platform & Aspect Ratio
        </label>

        {/* Platform Selector */}
        <div className="grid grid-cols-3 gap-1.5">
          {(['linkedin', 'twitter', 'both'] as Platform[]).map((p) => (
            <button
              key={p}
              onClick={() => onChangeCard({ platform: p })}
              className={`py-1.5 px-2 text-xs font-medium rounded-lg border text-center capitalize transition-colors ${
                card.platform === p
                  ? 'bg-sky-500/15 border-sky-500 text-sky-400 font-semibold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Aspect Ratio Buttons */}
        <div className="grid grid-cols-2 gap-1.5">
          {Object.values(ASPECT_RATIOS).map((aspect) => (
            <button
              key={aspect.id}
              onClick={() => onChangeCard({ aspectRatio: aspect.id })}
              className={`p-2 rounded-lg border text-[11px] text-left transition-all ${
                card.aspectRatio === aspect.id
                  ? 'bg-sky-500/10 border-sky-500 text-white font-medium'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold text-slate-200 truncate">{aspect.label}</div>
              <div className="text-[10px] text-slate-500 font-mono">{aspect.width}×{aspect.height}</div>
            </button>
          ))}
        </div>

        {/* Layout Style */}
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Layout Style</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'saas_spotlight', label: 'SaaS Spot' },
              { id: 'code_snippet', label: 'Code Window' },
              { id: 'stat_infographic', label: 'Stat Box' },
              { id: 'bold_quote', label: 'Bold Quote' },
              { id: 'key_takeaways', label: 'Bullets List' },
              { id: 'minimalist', label: 'Minimalist' },
            ].map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => onChangeCard({ layoutTemplate: tmpl.id as LayoutTemplate })}
                className={`p-1.5 text-[11px] rounded-lg border text-center transition-colors truncate ${
                  card.layoutTemplate === tmpl.id
                    ? 'bg-sky-500/20 border-sky-500 text-sky-300 font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {tmpl.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-slate-800" />

      {/* SECTION 3: THEME & STYLING */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Theme & Colors
        </label>

        {/* Theme presets */}
        <div className="grid grid-cols-2 gap-1.5">
          {Object.values(THEME_CONFIGS).map((t) => (
            <button
              key={t.id}
              onClick={() => onChangeCard({ themePreset: t.id })}
              className={`p-2 rounded-lg border text-left flex items-center justify-between text-xs transition-colors ${
                card.themePreset === t.id
                  ? 'border-sky-500 bg-slate-900 text-sky-300 font-semibold'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
              }`}
            >
              <span className="truncate">{t.name}</span>
              <span
                className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                style={{ backgroundColor: t.accentColor }}
              />
            </button>
          ))}
        </div>

        {/* Font Family */}
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { name: 'Plus Jakarta Sans', label: 'Jakarta Sans' },
            { name: 'Outfit', label: 'Outfit Bold' },
            { name: 'Bricolage Grotesque', label: 'Bricolage' },
            { name: 'Playfair Display', label: 'Playfair Serif' },
            { name: 'JetBrains Mono', label: 'JetBrains Code' },
          ].map((f) => (
            <button
              key={f.name}
              onClick={() => onChangeCard({ fontFamily: f.name as FontFamily })}
              className={`p-1.5 text-[11px] rounded-lg border text-center transition-colors truncate ${
                card.fontFamily === f.name
                  ? 'border-sky-500 bg-slate-900 text-sky-300 font-semibold'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
              }`}
              style={{ fontFamily: f.name }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Corner Radius & Pattern */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Corner Radius</span>
            <span className="font-mono text-sky-400">{card.borderRadius}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="24"
            value={card.borderRadius}
            onChange={(e) => onChangeCard({ borderRadius: parseInt(e.target.value, 10) })}
            className="w-full accent-sky-500"
          />
        </div>
      </div>

      <hr className="border-slate-800" />

      {/* SECTION 4: TEXT CONTENT & COPY */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Edit Text Content
        </label>

        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Title / Headline</label>
          <textarea
            value={card.headline}
            onChange={(e) => onChangeCard({ headline: e.target.value })}
            className="w-full h-14 p-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 resize-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Subtitle / Subhead</label>
          <textarea
            value={card.subtitle}
            onChange={(e) => onChangeCard({ subtitle: e.target.value })}
            className="w-full h-14 p-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Kicker Badge</label>
            <input
              type="text"
              value={card.badgeText}
              onChange={(e) => onChangeCard({ badgeText: e.target.value })}
              className="w-full p-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 uppercase"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Stat Number</label>
            <input
              type="text"
              value={card.statValue}
              onChange={(e) => onChangeCard({ statValue: e.target.value })}
              className="w-full p-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200"
            />
          </div>
        </div>

        {/* Bullet points */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-slate-400">Bullet Points</span>
            <button onClick={handleAddBullet} className="text-[10px] text-sky-400 hover:underline flex items-center gap-0.5">
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
          <div className="space-y-1.5">
            {card.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => handleUpdateBullet(idx, e.target.value)}
                  className="flex-1 p-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200"
                />
                <button onClick={() => handleRemoveBullet(idx)} className="p-1 text-slate-500 hover:text-rose-400">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Code Snippet if Code layout */}
        {card.layoutTemplate === 'code_snippet' && (
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Code Snippet</label>
            <textarea
              value={card.codeSnippet.code}
              onChange={(e) => onChangeCard({ codeSnippet: { ...card.codeSnippet, code: e.target.value } })}
              className="w-full h-24 p-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 font-mono resize-none"
            />
          </div>
        )}
      </div>

      <hr className="border-slate-800" />

      {/* SECTION 5: AUTHOR & BRANDING */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Author Branding
        </label>

        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Name</label>
          <input
            type="text"
            value={card.author.name}
            onChange={(e) => onChangeCard({ author: { ...card.author, name: e.target.value } })}
            className="w-full p-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Role / Title / Handle</label>
          <input
            type="text"
            value={card.author.role}
            onChange={(e) => onChangeCard({ author: { ...card.author, role: e.target.value } })}
            className="w-full p-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200"
          />
        </div>

        {/* Avatars */}
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">Avatar Preset</label>
          <div className="flex items-center gap-2">
            {presetAvatars.map((url, i) => (
              <button
                key={i}
                onClick={() => onChangeCard({ author: { ...card.author, avatarUrl: url } })}
                className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-transform ${
                  card.author.avatarUrl === url ? 'border-sky-500 scale-110' : 'border-slate-700 opacity-60'
                }`}
              >
                <img src={url} alt="Avatar" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
