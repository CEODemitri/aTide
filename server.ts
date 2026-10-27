import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to get Gemini client
const getAi = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing in server environment.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Endpoint: Generate Card Content & Design parameters from Gemini
app.post('/api/generate-card-content', async (req: Request, res: Response): Promise<void> => {
  try {
    const { topic, platform, contentType, tone, customNotes } = req.body;

    if (!topic || typeof topic !== 'string') {
      res.status(400).json({ error: 'Topic string is required.' });
      return;
    }

    const ai = getAi();

    const systemPrompt = `You are a world-class social media strategist and designer for tech founders, creators, executives, and software developers.
Your task is to take a user's topic or raw idea and generate:
1. High-impact card copy (headline, subtitle, badge tag, bullet points, statistics or quote).
2. Recommended visual theme (color scheme, layout template name, typography recommendation).
3. Ready-to-publish full post captions formatted for LinkedIn and Twitter/X (with compelling hook, body text, emojis, call-to-action, and relevant hashtags).
4. If the topic fits a carousel, provide a sequence of 3-5 concise slides.

Return ONLY a valid JSON object matching this TypeScript structure:
{
  "headline": "A short, viral, Punchy Headline (3-8 words)",
  "subtitle": "An engaging secondary subtitle explaining the value or insight",
  "badgeText": "UPPERCASE CATEGORY BADGE (e.g. ANNOUNCEMENT, TECH INSIGHT, CASE STUDY, MILESTONE, LESSON LEARNED)",
  "statValue": "Optional key metric (e.g. '$1.2M', '10x', '99.9%', '30 Days') or empty string",
  "statLabel": "Optional label for metric (e.g. 'ARR Reached', 'Faster Execution', 'Uptime Score') or empty string",
  "bullets": ["Point 1 concise actionable takeaway", "Point 2 concise actionable takeaway", "Point 3 concise actionable takeaway"],
  "quoteText": "Optional inspiring or authoritative quote or key takeaway if layout is quote type",
  "codeSnippet": {
    "language": "typescript",
    "code": "// Clean 4-8 line code snippet if contentType is code, otherwise empty string"
  },
  "suggestedTheme": "obsidian_dark | executive_navy | sunset_gradient | emerald_mint | clean_minimal | cyber_purple | warm_editorial",
  "suggestedLayout": "minimalist | saas_spotlight | stat_infographic | code_snippet | bold_quote | key_takeaways | photo_split",
  "linkedInCaption": "Full LinkedIn post text with hook, paragraphs, bullet points, call to action, and 3-5 hashtags",
  "twitterPost": {
    "mainTweet": "Main tweet under 280 characters with strong hook and hashtag",
    "threadTweets": ["Thread Tweet 1 with deeper detail", "Thread Tweet 2 with key takeaway", "Thread Tweet 3 with call to action"]
  },
  "carouselSlides": [
    {
      "slideNumber": 1,
      "title": "Slide 1 Title (Hook)",
      "subtitle": "Hook subtitle",
      "bodyText": "Core slide takeaway"
    },
    {
      "slideNumber": 2,
      "title": "Slide 2 Title (Insight 1)",
      "subtitle": "Detail subtitle",
      "bodyText": "Key explanation"
    },
    {
      "slideNumber": 3,
      "title": "Slide 3 Title (Action / CTA)",
      "subtitle": "Final takeaway",
      "bodyText": "Call to action or concluding summary"
    }
  ]
}`;

    const userPrompt = `Topic/Brief: "${topic}"
Platform Target: ${platform || 'both'}
Content Type Style: ${contentType || 'thought_leadership'}
Tone: ${tone || 'professional'}
Additional Context/Notes: ${customNotes || 'None'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const responseText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch (parseErr) {
      console.error('Failed to parse Gemini JSON output:', responseText);
      res.status(500).json({ error: 'Failed to format AI response.', raw: responseText });
      return;
    }

    res.json(parsedData);
  } catch (error: any) {
    console.error('Error in /api/generate-card-content:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// API Endpoint: AI Background/Illustration Image Generator using Gemini
app.post('/api/generate-image', async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, aspectRatio = '16:9' } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Image prompt string is required.' });
      return;
    }

    const ai = getAi();

    const imageResponse = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [
          {
            text: `High resolution social media background visual asset: ${prompt}. Clean, cinematic lighting, elegant texture, dark moody backdrop, non-distracting studio composition, perfect for text overlay.`
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio === '1:1' ? '1:1' : aspectRatio === '4:3' ? '4:3' : '16:9',
        }
      }
    });

    let imageUrl = '';
    const candidates = imageResponse.candidates;
    if (candidates && candidates.length > 0 && candidates[0].content?.parts) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      res.status(500).json({ error: 'No image data generated from model.' });
      return;
    }

    res.json({ imageUrl });
  } catch (error: any) {
    console.error('Error in /api/generate-image:', error);
    res.status(500).json({ error: error.message || 'Failed to generate image.' });
  }
});

// Mount Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`aTide server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Server launch failed:', err);
});
