import { CardState } from '../types/card';

export const CARD_PRESETS: CardState[] = [
  {
    id: 'preset_saas_launch',
    title: 'SaaS Product Launch',
    headline: 'Introducing aTide 2.0: AI Social Cards in Seconds',
    subtitle: 'Generate high-converting LinkedIn post cards, Twitter graphics, and carousel decks with a single prompt.',
    badgeText: 'PRODUCT ANNOUNCEMENT',
    statValue: '10x',
    statLabel: 'Faster Content Output',
    bullets: [
      'Instant AI text & visual theme generation',
      'Pixel-perfect 2x/3x high DPI PNG export',
      'LinkedIn carousel deck builder & caption writer'
    ],
    quoteText: '',
    codeSnippet: {
      language: 'typescript',
      code: ''
    },
    platform: 'both',
    aspectRatio: 'linkedin_landscape',
    layoutTemplate: 'saas_spotlight',
    themePreset: 'obsidian_dark',
    fontFamily: 'Plus Jakarta Sans',
    borderRadius: 16,
    patternOverlay: 'grid',
    hasGlowBorder: true,
    bgImageOpacity: 0.15,
    author: {
      name: 'Alex Vance',
      handle: '@alexvance_tech',
      role: 'Founder & Head of Product at aTide.ai',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      isVerified: true,
      showPlatformBadge: true
    },
    linkedInCaption: `🚀 Big news! We're officially launching aTide 2.0 today.

Over the last 6 months, we built an engine to generate high-converting LinkedIn cards, code snippets, and carousel decks in seconds.

Here is what's new:
✨ AI Content Copilot (Gemini-powered)
🎨 12+ Professional Theme Engine
⚡ 1-Click High DPI PNG & PDF Deck Export
📱 Auto-formatting for LinkedIn, Twitter/X, & Threads

Try it out today and elevate your personal brand! 👇
#SaaS #ProductLaunch #TechFounders #GenerativeAI #SocialMediaMarketing`,
    twitterPost: {
      mainTweet: '🚀 Introducing aTide 2.0: Turn raw thoughts into viral LinkedIn & Twitter cards in seconds with Gemini AI.\n\nHere is how it transforms your content pipeline 👇',
      threadTweets: [
        '1/ High-converting visual cards generate 3.4x higher click-through rates on LinkedIn & Twitter/X compared to plain text.',
        '2/ aTide handles the copy, color theory, typography, code syntax, and even 1-click carousel deck generation.',
        '3/ Try it free today: https://atide.app (No credit card required).'
      ]
    },
    carouselSlides: [
      {
        id: 's1',
        slideNumber: 1,
        title: 'How to 10x Your LinkedIn Reach in 2026',
        subtitle: 'The simple visual content blueprint for tech founders and creators',
        bodyText: 'Swipe to see the 3 rules of high-converting social cards →'
      },
      {
        id: 's2',
        slideNumber: 2,
        title: 'Rule 1: Lead with 1 Clear Metric',
        subtitle: 'Stop burying the headline',
        bodyText: 'A bold stat ("10x", "$1M ARR") instantly anchors user attention in the fast-scrolling feed.'
      },
      {
        id: 's3',
        slideNumber: 3,
        title: 'Rule 2: High Contrast Typography',
        subtitle: 'Mobile viewport readability',
        bodyText: '80% of readers are on mobile devices. Use bold display typography with high contrast.'
      },
      {
        id: 's4',
        slideNumber: 4,
        title: 'Rule 3: Give Actionable Bullets',
        subtitle: 'Scannable value delivery',
        bodyText: 'Break complex advice into 3 concise, highly actionable bullet points.'
      }
    ],
    createdAt: Date.now()
  },
  {
    id: 'preset_code_tip',
    title: 'Code Snippet / Developer Tip',
    headline: 'Clean Async Error Handling in Modern TypeScript',
    subtitle: 'Stop nesting try-catch blocks everywhere. Use the Safe Result pattern.',
    badgeText: 'TYPESCRIPT TIP',
    statValue: '0',
    statLabel: 'Unhandled Promises',
    bullets: [],
    quoteText: '',
    codeSnippet: {
      language: 'typescript',
      code: `async function safeFetch<T>(promise: Promise<T>): Promise<[T | null, Error | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as Error];
  }
}

// Clean usage without ugly nested try-catch:
const [data, err] = await safeFetch(api.getUser());
if (err) return handleFallback(err);`
    },
    platform: 'twitter',
    aspectRatio: 'twitter_landscape',
    layoutTemplate: 'code_snippet',
    themePreset: 'midnight_neon',
    fontFamily: 'JetBrains Mono',
    borderRadius: 12,
    patternOverlay: 'dots',
    hasGlowBorder: true,
    bgImageOpacity: 0.1,
    author: {
      name: 'Elena Rostova',
      handle: '@elena_dev',
      role: 'Staff Systems Engineer @ CloudNode',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
      isVerified: true,
      showPlatformBadge: true
    },
    linkedInCaption: `💡 TypeScript Tip: Stop nesting try-catch blocks everywhere!

The "Safe Result tuple" pattern allows you to write clean async code that handles errors gracefully like Go or Rust.

Key benefits:
1. No unhandled promise rejections
2. Clear type-safe error boundaries
3. Clean, linear code flow without deep nesting

Save this snippet for your next refactor! 📌
#TypeScript #WebDev #SoftwareEngineering #CodeQuality #React`,
    twitterPost: {
      mainTweet: '💡 TypeScript Tip: Stop writing ugly nested try-catch blocks for async functions.\n\nUse the Safe Result Tuple pattern instead 🧵👇',
      threadTweets: [
        'This pattern returns [data, error] tuples, making error checks explicit and linear.',
        'It eliminates unhandled promise rejections and gives you clean, Go-like error handling in TS.'
      ]
    },
    carouselSlides: [],
    createdAt: Date.now() - 10000
  },
  {
    id: 'preset_metric_stat',
    title: 'Metric & Growth Infographic',
    headline: 'Why Visual Social Cards Outperform Plain Text Posts',
    subtitle: 'Data analyzed across 50,000 tech executive posts on LinkedIn and X in 2026',
    badgeText: 'DATA INSIGHT',
    statValue: '+340%',
    statLabel: 'Higher Engagement Rate',
    bullets: [
      '2.8x longer dwell time in mobile feed',
      '4.1x higher profile view conversions',
      '68% increase in organic reposts & bookmarking'
    ],
    quoteText: '',
    codeSnippet: { language: 'typescript', code: '' },
    platform: 'linkedin',
    aspectRatio: 'linkedin_portrait',
    layoutTemplate: 'stat_infographic',
    themePreset: 'executive_navy',
    fontFamily: 'Outfit',
    borderRadius: 20,
    patternOverlay: 'radial_glow',
    hasGlowBorder: false,
    bgImageOpacity: 0.2,
    author: {
      name: 'Marcus Vance',
      handle: '@marcus_growth',
      role: 'Growth Director @ ScaleMatrix',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
      isVerified: true,
      showPlatformBadge: true
    },
    linkedInCaption: `📊 Data Insight: Visual posts are dominating the LinkedIn algorithm in 2026.

We analyzed 50,000 executive posts and found a staggering +340% boost in engagement for posts featuring structured visual cards.

Why?
1. The feed is crowded — high-contrast graphics stop the scroll.
2. Dwell time increases by 2.8x when readers scan structured metrics.
3. Bookmarks and shares skyrocket for visual cheat sheets.

Are you using visual cards in your content strategy yet? Let's discuss in the comments! 👇
#ContentMarketing #PersonalBranding #LinkedInGrowth #DataAnalytics`,
    twitterPost: {
      mainTweet: '📊 We analyzed 50,000 tech posts on X and LinkedIn.\n\nPosts with structured visual cards saw a +340% boost in engagement over plain text.\n\nHere are 3 key takeaways 🧵👇',
      threadTweets: [
        '1/ Mobile feed dwell time jumped 2.8x because readers can digest key metrics instantly.',
        '2/ Bookmarking jumped 68% for infographic cheat sheets and code cards.'
      ]
    },
    carouselSlides: [],
    createdAt: Date.now() - 20000
  },
  {
    id: 'preset_thought_quote',
    title: 'Thought Leader Quote',
    headline: 'Building Great Software in the AI Era',
    subtitle: 'On craft, focus, and why speed without clarity is just noise.',
    badgeText: 'FOUNDER WISDOM',
    statValue: '',
    statLabel: '',
    bullets: [],
    quoteText: '"The ultimate leverage in engineering isn\'t writing code faster with AI—it is possessing the clarity of thought to know exactly what NOT to build."',
    codeSnippet: { language: 'typescript', code: '' },
    platform: 'both',
    aspectRatio: 'linkedin_square',
    layoutTemplate: 'bold_quote',
    themePreset: 'warm_editorial',
    fontFamily: 'Playfair Display',
    borderRadius: 8,
    patternOverlay: 'none',
    hasGlowBorder: false,
    bgImageOpacity: 0.05,
    author: {
      name: 'David K. Mercer',
      handle: '@davidmercer',
      role: 'Co-founder & CEO @ Synthetix AI',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
      isVerified: true,
      showPlatformBadge: true
    },
    linkedInCaption: `💭 "The ultimate leverage in engineering isn't writing code faster with AI—it is possessing the clarity of thought to know exactly what NOT to build."

As AI tools generate code faster than ever, the most valuable skill for software leaders becomes domain discernment and product taste.

What are your thoughts on product craft in the AI era?
#SoftwareEngineering #Leadership #AI #ProductManagement #StartupLife`,
    twitterPost: {
      mainTweet: '"The ultimate leverage in engineering isn\'t writing code faster with AI—it is possessing the clarity of thought to know exactly what NOT to build."',
      threadTweets: []
    },
    carouselSlides: [],
    createdAt: Date.now() - 30000
  },
  {
    id: 'preset_hiring_announcement',
    title: 'Hiring Announcement',
    headline: 'We Are Hiring: Senior AI Engineer',
    subtitle: 'Join us in building the next generation of generative creative engines in San Francisco or Remote.',
    badgeText: 'WE ARE HIRING',
    statValue: '$210k-$260k',
    statLabel: 'Base Equity Package',
    bullets: [
      'Scale distributed LLM inference pipelines',
      'Collaborate with world-class product designers',
      '100% remote flexibility & generous healthcare'
    ],
    quoteText: '',
    codeSnippet: { language: 'typescript', code: '' },
    platform: 'linkedin',
    aspectRatio: 'linkedin_landscape',
    layoutTemplate: 'key_takeaways',
    themePreset: 'emerald_mint',
    fontFamily: 'Plus Jakarta Sans',
    borderRadius: 16,
    patternOverlay: 'dots',
    hasGlowBorder: true,
    bgImageOpacity: 0.12,
    author: {
      name: 'Sarah Chen',
      handle: '@sarahchen_ai',
      role: 'VP of Engineering @ Craft.ai',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
      isVerified: true,
      showPlatformBadge: true
    },
    linkedInCaption: `🌱 We're expanding the team! Craft.ai is hiring a Senior AI Engineer to lead our core inference & real-time canvas engine.

What you'll work on:
• Multi-modal generative workflows
• High-performance WebGL & Canvas rendering
• Direct customer-facing AI features with zero slop

Apply or refer a friend in the link below! 👇
#Hiring #SoftwareEngineer #AIEngineer #RemoteJobs #TechCareers`,
    twitterPost: {
      mainTweet: '🌱 We are hiring a Senior AI Engineer @ Craft.ai ($210k-$260k + equity, Remote/SF).\n\nIf you love building high-performance AI engines, DM me or apply below 👇',
      threadTweets: []
    },
    carouselSlides: [],
    createdAt: Date.now() - 40000
  }
];
