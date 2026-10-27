export type Platform = 'linkedin' | 'twitter' | 'both';

export type AspectRatio = 
  | 'linkedin_landscape' // 1200x627 (1.91:1)
  | 'linkedin_square'    // 1080x1080 (1:1)
  | 'linkedin_portrait'  // 1080x1350 (4:5)
  | 'linkedin_banner'    // 1584x396  (4:1)
  | 'twitter_landscape'   // 1200x675  (16:9)
  | 'twitter_square'      // 1200x1200 (1:1)
  | 'twitter_header';     // 1500x500  (3:1)

export type LayoutTemplate = 
  | 'minimalist'
  | 'saas_spotlight'
  | 'stat_infographic'
  | 'code_snippet'
  | 'bold_quote'
  | 'key_takeaways'
  | 'photo_split';

export type ThemePreset = 
  | 'obsidian_dark'
  | 'executive_navy'
  | 'sunset_gradient'
  | 'emerald_mint'
  | 'clean_minimal'
  | 'cyber_purple'
  | 'warm_editorial'
  | 'midnight_neon';

export type FontFamily = 
  | 'Plus Jakarta Sans'
  | 'Outfit'
  | 'Bricolage Grotesque'
  | 'Playfair Display'
  | 'JetBrains Mono';

export interface AuthorProfile {
  name: string;
  handle: string;
  role: string;
  avatarUrl: string;
  isVerified: boolean;
  showPlatformBadge: boolean;
  customLogoUrl?: string;
}

export interface CodeSnippet {
  language: string;
  code: string;
}

export interface CarouselSlide {
  id: string;
  slideNumber: number;
  title: string;
  subtitle: string;
  bodyText: string;
  badgeText?: string;
  statValue?: string;
  statLabel?: string;
}

export interface CardState {
  id: string;
  title: string;
  headline: string;
  subtitle: string;
  badgeText: string;
  statValue: string;
  statLabel: string;
  bullets: string[];
  quoteText: string;
  codeSnippet: CodeSnippet;
  
  // Platform & Dimension
  platform: Platform;
  aspectRatio: AspectRatio;
  layoutTemplate: LayoutTemplate;
  
  // Design & Theme
  themePreset: ThemePreset;
  fontFamily: FontFamily;
  customBgColor?: string;
  customGradientFrom?: string;
  customGradientTo?: string;
  customTextColor?: string;
  customAccentColor?: string;
  customCardBg?: string;
  borderRadius: number; // 0 to 24px
  patternOverlay: 'none' | 'dots' | 'grid' | 'noise' | 'radial_glow';
  hasGlowBorder: boolean;
  
  // Image / Visual Asset
  bgImageUrl?: string;
  bgImageOpacity: number; // 0 to 1
  
  // Author
  author: AuthorProfile;
  
  // Generated Captions
  linkedInCaption: string;
  twitterPost: {
    mainTweet: string;
    threadTweets: string[];
  };
  
  // Carousel Deck
  carouselSlides: CarouselSlide[];
  
  createdAt: number;
}
