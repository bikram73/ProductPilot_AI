import { Handler } from '@netlify/functions';
import { GoogleGenAI } from '@google/genai';

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

const MODELS_FALLBACK_LIST = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];

async function generateWithFallback(ai: GoogleGenAI, params: { contents: string; config?: any }) {
  let lastError: any = null;
  for (const model of MODELS_FALLBACK_LIST) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });
      if (response && response.text) {
        return response;
      }
    } catch (err: any) {
      lastError = err;
    }
  }
  throw lastError || new Error('All models failed');
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { messages, contextProducts } = JSON.parse(event.body || '{}');
  const fallbackReply = {
    reply: "Based on our product catalog, our top picks offer class-leading performance, optimal battery runtime, and proven user satisfaction. Let me know if you want a detailed spec comparison!"
  };

  const ai = getGeminiClient();
  if (!ai) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reply: "I am ProductPilot AI. How can I help you choose the best product today?"
      }),
    };
  }

  try {
    const systemInstruction = `You are ProductPilot AI, an intelligent, objective product recommendation assistant.
Available products in catalog:
${JSON.stringify((contextProducts || []).map((p: any) => ({ id: p.id, name: p.name, price: p.price, specs: p.specs, pros: p.pros, cons: p.cons, category: p.category })))}

Help the user compare items, understand trade-offs, find budget options, or clarify technical specs.
Be friendly, direct, concise, and helpful. Mention specific product names when relevant.`;

    const formattedContents = (messages || []).map((m: any) => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n');

    const response = await generateWithFallback(ai, {
      contents: `Chat history:\n${formattedContents}\nAssistant:`,
      config: {
        systemInstruction,
      },
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: response.text }),
    };
  } catch (error: any) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fallbackReply),
    };
  }
};
