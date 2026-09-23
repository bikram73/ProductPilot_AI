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

  const defaultQuestions = {
    questions: [
      "What is your target budget limit?",
      "What primary use case or purpose do you have in mind?",
      "Are there any specific required features (e.g. noise cancellation, battery life, weight)?"
    ]
  };

  const { prompt } = JSON.parse(event.body || '{}');
  const ai = getGeminiClient();

  if (!ai) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(defaultQuestions),
    };
  }

  try {
    const response = await generateWithFallback(ai, {
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
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(defaultQuestions),
    };
  }
};
