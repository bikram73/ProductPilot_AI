import { Handler } from '@netlify/functions';
import { GoogleGenAI, Type } from '@google/genai';

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
    const { userQuery, preferences, topProducts } = JSON.parse(event.body || '{}');
    const ai = getGeminiClient();

    if (!ai) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary: "Based on your criteria, these products offer the optimal combination of performance, battery life, and overall build quality within your target scope.",
          buyingTips: [
            "Compare battery runtime under real-world usage conditions.",
            "Check warranty coverage and post-purchase customer support.",
            "Evaluate port availability for your existing accessories."
          ],
          thingsToConsider: "Pay attention to non-upgradeable components like soldered memory.",
          valueWinner: topProducts?.[0]?.name || "Primary recommendation"
        }),
      };
    }

    const prompt = `User Request: "${userQuery}"
Extracted Preferences: ${JSON.stringify(preferences)}
Top Ranked Products: ${JSON.stringify((topProducts || []).map((p: any) => ({ name: p.name, brand: p.brand, price: p.price, specs: p.specs, pros: p.pros, cons: p.cons })))}

Provide personalized buying advice and explanations for why these products suit the user's requirements.
Output JSON format:
{
  "summary": "2-3 sentences overview explaining why the top choice wins for their explicit need",
  "buyingTips": ["Tip 1", "Tip 2", "Tip 3"],
  "thingsToConsider": "Key trade-off or caution to keep in mind",
  "valueWinner": "Name of product that provides the best value for money"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are ProductPilot AI, an expert product buying advisor. Provide clear, objective, concise buying advice based on the catalog provided.",
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            buyingTips: { type: Type.ARRAY, items: { type: Type.STRING } },
            thingsToConsider: { type: Type.STRING },
            valueWinner: { type: Type.STRING },
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed),
    };
  } catch (error: any) {
    console.error('Error in Netlify explain-recommendations:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message || 'Failed to generate buying advice' }),
    };
  }
};
