import React from 'react';
import { CardState } from '../types/card';
import { Bookmark, ArrowRight, Trash2, Copy, Calendar, Plus } from 'lucide-react';

interface SavedCardsViewProps {
  savedCards: CardState[];
  onLoadCard: (card: CardState) => void;
  onDeleteCard: (id: string) => void;
  onDuplicateCard: (card: CardState) => void;
  onNewCard: () => void;
}

export const SavedCardsView: React.FC<SavedCardsViewProps> = ({
  savedCards,
  onLoadCard,
  onDeleteCard,
  onDuplicateCard,
  onNewCard,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto text-left space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400 text-xs font-mono font-medium">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Local Library</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-outfit">
            Saved Social Cards ({savedCards.length})
          </h1>
        </div>

        <button
          onClick={onNewCard}
          className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-xl shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Blank Card</span>
        </button>
      </div>

      {savedCards.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-slate-900/50 border border-slate-800 rounded-2xl text-center space-y-4">
          <Bookmark className="w-10 h-10 text-slate-600" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-300">No Saved Cards Yet</h3>
            <p className="text-xs text-slate-500 max-w-md">
              Save your custom cards in the Card Studio to build your personal reusable brand template library.
            </p>
          </div>
          <button
            onClick={onNewCard}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
          >
            Start Creating
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedCards.map((card) => (
            <div
              key={card.id}
              className="group bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-5 space-y-4 transition-all hover:shadow-xl"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-200 uppercase tracking-wider font-mono">
                  {card.badgeText || 'CARD'}
                </span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-slate-500">
                  <Calendar className="w-3 h-3" />
                  {new Date(card.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-100 group-hover:text-sky-300 transition-colors line-clamp-1">
                  {card.headline || 'Untitled Card'}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {card.subtitle}
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => onLoadCard(card)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-semibold text-xs rounded-xl transition-colors"
                >
                  <span>Open in Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDuplicateCard(card)}
                  title="Duplicate card"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDeleteCard(card.id)}
                  title="Delete saved card"
                  className="p-2 bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-xl transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
