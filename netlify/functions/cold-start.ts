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
    const { prompt } = JSON.parse(event.body || '{}');
    const ai = getGeminiClient();

    if (!ai) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questions: [
            "What is your target budget limit?",
            "What primary use case or purpose do you have in mind?",
            "Are there any specific required features (e.g. noise cancellation, battery life, weight)?"
          ]
        }),
      };
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `The user provided a very vague product query: "${prompt}". Ask up to 3 concise, highly relevant follow-up questions to help narrow down the exact product recommendation.`,
      config: {
        systemInstruction: "Ask at most 3 direct, friendly, high-impact clarifying questions. Output JSON with a 'questions' array of strings.",
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
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
    console.error('Error in Netlify cold-start:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message || 'Failed to generate cold start questions' }),
    };
  }
};
