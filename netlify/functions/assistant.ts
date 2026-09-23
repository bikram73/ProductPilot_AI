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

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages, contextProducts } = JSON.parse(event.body || '{}');
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

    const systemInstruction = `You are ProductPilot AI, an intelligent, objective product recommendation assistant.
Available products in catalog:
${JSON.stringify((contextProducts || []).map((p: any) => ({ id: p.id, name: p.name, price: p.price, specs: p.specs, pros: p.pros, cons: p.cons, category: p.category })))}

Help the user compare items, understand trade-offs, find budget options, or clarify technical specs.
Be friendly, direct, concise, and helpful. Mention specific product names when relevant.`;

    const formattedContents = (messages || []).map((m: any) => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n');

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
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
    console.error('Error in Netlify assistant:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message || 'Assistant failed to reply' }),
    };
  }
};
