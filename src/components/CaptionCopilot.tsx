import React, { useState } from 'react';
import { CardState } from '../types/card';
import { Copy, Check, Linkedin, Twitter, Hash, MessageSquare, Clock } from 'lucide-react';

interface CaptionCopilotProps {
  card: CardState;
  onUpdateCaption: (field: 'linkedInCaption' | 'twitterPost', val: any) => void;
}

export const CaptionCopilot: React.FC<CaptionCopilotProps> = ({
  card,
  onUpdateCaption,
}) => {
  const [activePlatformTab, setActivePlatformTab] = useState<'linkedin' | 'twitter'>('linkedin');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const wordCount = card.linkedInCaption.split(/\s+/).filter(Boolean).length;
  const readTimeMin = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="w-full lg:w-80 bg-slate-950 border-l border-slate-800/80 text-left p-4 flex flex-col h-full shrink-0">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
        <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-sky-400" />
          <span>Post Caption Copilot</span>
        </h3>

        {/* Read time pill */}
        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-500" />
          <span>{readTimeMin} min read</span>
        </span>
      </div>

      {/* Platform Switcher */}
      <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg mb-4">
        <button
          onClick={() => setActivePlatformTab('linkedin')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activePlatformTab === 'linkedin'
              ? 'bg-sky-500 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Linkedin className="w-3.5 h-3.5" />
          <span>LinkedIn Post</span>
        </button>

        <button
          onClick={() => setActivePlatformTab('twitter')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activePlatformTab === 'twitter'
              ? 'bg-sky-500 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Twitter className="w-3.5 h-3.5" />
          <span>Twitter / Thread</span>
        </button>
      </div>

      {/* LINKEDIN CAPTION BODY */}
      {activePlatformTab === 'linkedin' && (
        <div className="flex-1 flex flex-col space-y-3 overflow-y-auto">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Post Body & Hashtags</span>
            <span className="font-mono text-[11px] text-slate-500">{card.linkedInCaption.length} chars</span>
          </div>

          <textarea
            value={card.linkedInCaption}
            onChange={(e) => onUpdateCaption('linkedInCaption', e.target.value)}
            className="w-full flex-1 min-h-[220px] p-3 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-sky-500 leading-relaxed resize-none"
            placeholder="Write or generate your LinkedIn post caption here..."
          />

          <button
            onClick={() => handleCopy(card.linkedInCaption, 'linkedin')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 font-semibold text-xs rounded-xl transition-colors"
          >
            {copiedKey === 'linkedin' ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">LinkedIn Post Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy LinkedIn Post</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* TWITTER / X THREAD BODY */}
      {activePlatformTab === 'twitter' && (
        <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
          {/* Main Tweet */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-medium text-slate-300">1. Main Tweet</span>
              <span className={`font-mono text-[11px] ${
                card.twitterPost.mainTweet.length > 280 ? 'text-rose-400 font-bold' : 'text-slate-500'
              }`}>
                {card.twitterPost.mainTweet.length}/280
              </span>
            </div>

            <textarea
              value={card.twitterPost.mainTweet}
              onChange={(e) => onUpdateCaption('twitterPost', { ...card.twitterPost, mainTweet: e.target.value })}
              className="w-full h-24 p-3 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-sky-500 leading-relaxed resize-none"
            />

            <button
              onClick={() => handleCopy(card.twitterPost.mainTweet, 'main_tweet')}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] font-medium rounded-lg transition-colors"
            >
              {copiedKey === 'main_tweet' ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Copied Main Tweet
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Copy className="w-3 h-3" /> Copy Main Tweet
                </span>
              )}
            </button>
          </div>

          {/* Thread Tweets */}
          {card.twitterPost.threadTweets && card.twitterPost.threadTweets.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Thread Replies ({card.twitterPost.threadTweets.length})
              </span>

              {card.twitterPost.threadTweets.map((tweet, idx) => (
                <div key={idx} className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Tweet #{idx + 2}</span>
                    <span className="font-mono">{tweet.length}/280</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{tweet}</p>
                </div>
              ))}

              <button
                onClick={() => {
                  const fullThread = [card.twitterPost.mainTweet, ...card.twitterPost.threadTweets].join('\n\n---\n\n');
                  handleCopy(fullThread, 'full_thread');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 font-semibold text-xs rounded-xl transition-colors"
              >
                {copiedKey === 'full_thread' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Entire Thread Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Complete Thread</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
