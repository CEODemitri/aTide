import React, { useState } from 'react';
import { CardState, CarouselSlide } from '../types/card';
import { CardCanvas } from './CardCanvas';
import { Plus, Trash2, ArrowLeft, ArrowRight, Download, Layers, Sparkles, RefreshCw } from 'lucide-react';

interface CarouselBuilderProps {
  card: CardState;
  onUpdateSlides: (slides: CarouselSlide[]) => void;
  onExportSingleSlide: (slideNum: number) => void;
  onBatchExportAllSlides: () => void;
  isExporting: boolean;
}

export const CarouselBuilder: React.FC<CarouselBuilderProps> = ({
  card,
  onUpdateSlides,
  onExportSingleSlide,
  onBatchExportAllSlides,
  isExporting,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slides = card.carouselSlides && card.carouselSlides.length > 0
    ? card.carouselSlides
    : [
        {
          id: 's1',
          slideNumber: 1,
          title: 'How to Build High-Converting Social Cards',
          subtitle: 'The 2026 Founder Framework',
          bodyText: 'Swipe through to learn the 3 essential rules →'
        },
        {
          id: 's2',
          slideNumber: 2,
          title: '01. High Contrast Visual Anchor',
          subtitle: 'Stop the scroll instantly',
          bodyText: 'Use bold display typography and a high-contrast accent color to grab reader attention in mobile feeds.'
        },
        {
          id: 's3',
          slideNumber: 3,
          title: '02. Actionable Bullet Takeaways',
          subtitle: 'Scannable value delivery',
          bodyText: 'Keep copy concise. Readers want 3 clear takeaways rather than wall-of-text paragraphs.'
        },
        {
          id: 's4',
          slideNumber: 4,
          title: '03. Strong Call to Action',
          subtitle: 'Convert engagement into action',
          bodyText: 'Conclude with a clear ask: bookmark, share, or visit your product link in the comments.'
        }
      ];

  const currentSlide = slides[activeSlideIndex] || slides[0];

  const handleAddSlide = () => {
    const newSlide: CarouselSlide = {
      id: `s_${Date.now()}`,
      slideNumber: slides.length + 1,
      title: `Slide ${slides.length + 1} Title`,
      subtitle: 'Key takeaway or sub-headline',
      bodyText: 'Explain your point in 1-2 punchy sentences.'
    };
    onUpdateSlides([...slides, newSlide]);
    setActiveSlideIndex(slides.length);
  };

  const handleRemoveSlide = (idx: number) => {
    if (slides.length <= 1) return;
    const updated = slides.filter((_, i) => i !== idx).map((s, i) => ({ ...s, slideNumber: i + 1 }));
    onUpdateSlides(updated);
    setActiveSlideIndex(Math.max(0, idx - 1));
  };

  const handleUpdateCurrentSlide = (field: keyof CarouselSlide, val: any) => {
    const updated = slides.map((s, idx) => {
      if (idx === activeSlideIndex) {
        return { ...s, [field]: val };
      }
      return s;
    });
    onUpdateSlides(updated);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-slate-950 text-left text-slate-100">
      {/* Left Sidebar: Slide Thumbnails & Sequence Editor */}
      <div className="w-full lg:w-80 border-r border-slate-800/80 p-5 overflow-y-auto space-y-6 shrink-0 bg-slate-950">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 font-semibold text-xs text-slate-200 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-sky-400" />
            <span>Deck Slides ({slides.length})</span>
          </div>

          <button
            onClick={handleAddSlide}
            className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 font-medium"
          >
            <Plus className="w-3.5 h-3.5" /> Add Slide
          </button>
        </div>

        {/* Slide List */}
        <div className="space-y-2.5">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => setActiveSlideIndex(idx)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                activeSlideIndex === idx
                  ? 'bg-sky-500/15 border-sky-500 text-white font-medium shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="w-6 h-6 rounded-lg bg-slate-800 text-sky-400 font-mono text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div className="truncate">
                  <div className="text-xs font-semibold text-slate-200 truncate">{s.title || `Slide ${idx + 1}`}</div>
                  <div className="text-[10px] text-slate-500 truncate">{s.subtitle || s.bodyText}</div>
                </div>
              </div>

              {slides.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveSlide(idx);
                  }}
                  className="p-1 text-slate-500 hover:text-rose-400 transition-colors shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Slide Copy Editor */}
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Edit Slide #{activeSlideIndex + 1}
          </span>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Slide Title</label>
            <input
              type="text"
              value={currentSlide.title}
              onChange={(e) => handleUpdateCurrentSlide('title', e.target.value)}
              className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Subtitle / Subhead</label>
            <input
              type="text"
              value={currentSlide.subtitle}
              onChange={(e) => handleUpdateCurrentSlide('subtitle', e.target.value)}
              className="w-full p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Body Text / Takeaway</label>
            <textarea
              value={currentSlide.bodyText}
              onChange={(e) => handleUpdateCurrentSlide('bodyText', e.target.value)}
              className="w-full h-20 p-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 resize-none"
            />
          </div>
        </div>

        {/* Batch Export Button */}
        <button
          onClick={onBatchExportAllSlides}
          disabled={isExporting}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-all active:scale-98 disabled:opacity-50"
        >
          {isExporting ? (
            <RefreshCw className="w-4 h-4 animate-spin text-sky-200" />
          ) : (
            <Download className="w-4 h-4 text-sky-200" />
          )}
          <span>{isExporting ? 'Exporting Deck...' : `Export All ${slides.length} Carousel Slides (PNG)`}</span>
        </button>
      </div>

      {/* Main Viewport: Active Carousel Slide Preview */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-900/50 overflow-y-auto">
        {/* Navigation Bar */}
        <div className="flex items-center gap-4 mb-6 bg-slate-950/80 px-4 py-2 rounded-full border border-slate-800/80">
          <button
            onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeSlideIndex === 0}
            className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-medium text-slate-300">
            Slide {activeSlideIndex + 1} of {slides.length}
          </span>

          <button
            onClick={() => setActiveSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
            disabled={activeSlideIndex === slides.length - 1}
            className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Slide Canvas */}
        <CardCanvas
          card={card}
          zoomLevel={0.85}
          slideOverride={{
            slideNumber: activeSlideIndex + 1,
            totalSlides: slides.length,
            title: currentSlide.title,
            subtitle: currentSlide.subtitle,
            bodyText: currentSlide.bodyText,
          }}
        />
      </div>
    </div>
  );
};
