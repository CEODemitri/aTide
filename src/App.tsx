import React, { useState, useRef, useEffect } from 'react';
import { CardState, CarouselSlide } from './types/card';
import { CARD_PRESETS } from './data/presets';
import { Header } from './components/Header';
import { CardCanvas } from './components/CardCanvas';
import { ControlPanel } from './components/ControlPanel';
import { CaptionCopilot } from './components/CaptionCopilot';
import { toPng } from 'html-to-image';
import { ZoomIn, ZoomOut, RotateCcw, Layers, Plus, Trash2, Download, RefreshCw } from 'lucide-react';

export default function App() {
  const [card, setCard] = useState<CardState>(CARD_PRESETS[0]);
  const [savedCards, setSavedCards] = useState<CardState[]>([]);
  const [zoomLevel, setZoomLevel] = useState(0.85);
  const [isExporting, setIsExporting] = useState(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);

  // Load saved cards on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('atide_saved_cards');
      if (stored) {
        setSavedCards(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load saved cards:', e);
    }
  }, []);

  const updateSavedCards = (cards: CardState[]) => {
    setSavedCards(cards);
    try {
      localStorage.setItem('atide_saved_cards', JSON.stringify(cards));
    } catch (e) {
      console.error('Failed to persist saved cards:', e);
    }
  };

  const handleUpdateCard = (updated: Partial<CardState>) => {
    setCard((prev) => ({ ...prev, ...updated }));
  };

  // AI Content Generator Call
  const handleGenerateAiContent = async (topic: string, contentType: string, tone: string) => {
    setIsGeneratingAi(true);
    try {
      const response = await fetch('/api/generate-card-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          platform: card.platform,
          contentType,
          tone,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'AI generation failed');
      }

      const data = await response.json();

      setCard((prev) => ({
        ...prev,
        headline: data.headline || prev.headline,
        subtitle: data.subtitle || prev.subtitle,
        badgeText: data.badgeText || prev.badgeText,
        statValue: data.statValue || '',
        statLabel: data.statLabel || '',
        bullets: Array.isArray(data.bullets) && data.bullets.length > 0 ? data.bullets : prev.bullets,
        quoteText: data.quoteText || '',
        codeSnippet: data.codeSnippet || prev.codeSnippet,
        themePreset: data.suggestedTheme && data.suggestedTheme in CARD_PRESETS ? data.suggestedTheme : prev.themePreset,
        layoutTemplate: data.suggestedLayout || prev.layoutTemplate,
        linkedInCaption: data.linkedInCaption || prev.linkedInCaption,
        twitterPost: data.twitterPost || prev.twitterPost,
        carouselSlides: Array.isArray(data.carouselSlides) && data.carouselSlides.length > 0 ? data.carouselSlides : prev.carouselSlides,
      }));
    } catch (error: any) {
      console.error('Error in AI generation:', error);
      alert(`AI Notice: ${error.message || 'Server call failed'}`);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // AI Image Background Generator Call
  const handleGenerateAiImage = async (prompt: string) => {
    setIsGeneratingImage(true);
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          aspectRatio: card.aspectRatio.includes('square') ? '1:1' : '16:9',
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Image generation failed');
      }

      const data = await response.json();
      if (data.imageUrl) {
        setCard((prev) => ({
          ...prev,
          bgImageUrl: data.imageUrl,
          bgImageOpacity: 0.25,
        }));
      }
    } catch (error: any) {
      console.error('Error generating AI background image:', error);
      alert(`Image Notice: ${error.message || 'Image generation failed'}`);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Export PNG via html-to-image
  const handleExportPng = async (scale: number = 2) => {
    const cardElement = cardRef.current || document.getElementById('social-card-node');
    if (!cardElement) {
      alert('Card element not ready.');
      return;
    }

    setIsExporting(true);
    try {
      const dataUrl = await toPng(cardElement as HTMLElement, {
        pixelRatio: scale,
        cacheBust: true,
      });

      const filename = `${card.headline.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 30) || 'social_card'}_${scale}x.png`;
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err: any) {
      console.error('PNG Export failed:', err);
      alert('Could not render PNG. Please retry.');
    } finally {
      setIsExporting(false);
    }
  };

  // Copy Post Caption
  const handleCopyCaption = () => {
    navigator.clipboard.writeText(card.linkedInCaption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  // Save Card Draft
  const handleSaveDraft = () => {
    const newDraft = { ...card, id: `draft_${Date.now()}`, createdAt: Date.now() };
    const updated = [newDraft, ...savedCards.filter((c) => c.id !== card.id)];
    updateSavedCards(updated);
    alert('Card saved to your local library draft!');
  };

  // Carousel Slide Operations
  const slides = card.carouselSlides && card.carouselSlides.length > 0 ? card.carouselSlides : [];
  const currentSlide = slides[activeSlideIndex];

  const handleAddSlide = () => {
    const newSlide: CarouselSlide = {
      id: `s_${Date.now()}`,
      slideNumber: slides.length + 1,
      title: `Slide ${slides.length + 1} Title`,
      subtitle: 'Key takeaway or sub-headline',
      bodyText: 'Explain your point in 1-2 punchy sentences.'
    };
    const updated = [...slides, newSlide];
    handleUpdateCard({ carouselSlides: updated });
    setActiveSlideIndex(updated.length - 1);
  };

  const handleRemoveSlide = (idx: number) => {
    const updated = slides.filter((_, i) => i !== idx).map((s, i) => ({ ...s, slideNumber: i + 1 }));
    handleUpdateCard({ carouselSlides: updated });
    setActiveSlideIndex(Math.max(0, idx - 1));
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Top Header */}
      <Header
        onSelectPreset={(p) => setCard({ ...p, id: `card_${Date.now()}` })}
        onExportPng={handleExportPng}
        onCopyCaption={handleCopyCaption}
        onSaveDraft={handleSaveDraft}
        isExporting={isExporting}
        copiedCaption={copiedCaption}
        savedCount={savedCards.length}
      />

      {/* Single Unified Screen Layout */}
      <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
        {/* Left Inspector Column: Full Control Inspector */}
        <ControlPanel
          card={card}
          onChangeCard={handleUpdateCard}
          onGenerateAiContent={handleGenerateAiContent}
          onGenerateAiImage={handleGenerateAiImage}
          isGeneratingAi={isGeneratingAi}
          isGeneratingImage={isGeneratingImage}
        />

        {/* Center Workspace: Live Canvas Studio */}
        <div className="flex-1 flex flex-col items-center justify-between p-6 bg-slate-900/40 overflow-y-auto relative">
          {/* Zoom & Canvas Controls */}
          <div className="flex items-center gap-2 mb-3 bg-slate-950/80 px-3 py-1.5 rounded-full border border-slate-800/80 shadow-md">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.4, z - 0.1))}
              className="p-1 text-slate-400 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-300 w-12 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.3, z + 0.1))}
              className="p-1 text-slate-400 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(0.85)}
              className="p-1 text-slate-400 hover:text-white transition-colors border-l border-slate-800 pl-2"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Rendered Live Card Canvas */}
          <CardCanvas
            ref={cardRef}
            card={card}
            zoomLevel={zoomLevel}
            slideOverride={currentSlide ? {
              slideNumber: activeSlideIndex + 1,
              totalSlides: slides.length,
              title: currentSlide.title,
              subtitle: currentSlide.subtitle,
              bodyText: currentSlide.bodyText,
            } : undefined}
          />

          <div className="mt-3 text-[11px] text-slate-500 font-mono">
            aTide · Single-Screen Live Inspector Studio
          </div>
        </div>

        {/* Right Column: Captions & Carousel Sequence */}
        <div className="w-full lg:w-80 bg-slate-950 border-l border-slate-800/80 flex flex-col h-full shrink-0 overflow-y-auto p-4 space-y-5">
          {/* Top Half: Formatted Captions Copilot */}
          <CaptionCopilot
            card={card}
            onUpdateCaption={(field, val) => handleUpdateCard({ [field]: val })}
          />

          {/* Bottom Half: Carousel Decks if present */}
          <div className="border-t border-slate-800/80 pt-4 space-y-3 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-sky-400" />
                <span>Carousel Decks ({slides.length})</span>
              </span>

              <button
                onClick={handleAddSlide}
                className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-medium"
              >
                <Plus className="w-3.5 h-3.5" /> Add Slide
              </button>
            </div>

            {slides.length === 0 ? (
              <button
                onClick={handleAddSlide}
                className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 text-xs rounded-xl transition-colors text-center"
              >
                + Convert Card to Multi-Slide Carousel
              </button>
            ) : (
              <div className="space-y-2">
                {slides.map((s, idx) => (
                  <div
                    key={s.id}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                      activeSlideIndex === idx
                        ? 'bg-sky-500/15 border-sky-500 text-white font-medium'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="truncate">
                      <div className="font-semibold text-slate-200 truncate">
                        Slide #{idx + 1}: {s.title}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">{s.subtitle}</div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSlide(idx);
                      }}
                      className="p-1 text-slate-500 hover:text-rose-400 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
