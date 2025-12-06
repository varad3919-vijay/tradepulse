import { GoogleGenAI } from "@google/genai";
import { Stock, AIAnalysisResult } from '../types';

export const analyzeMarket = async (stocks: Stock[]): Promise<AIAnalysisResult> => {
  if (!process.env.API_KEY) {
    return {
      summary: "API Key missing. Please configure your Gemini API Key to receive AI insights.",
      sentiment: "NEUTRAL",
      keyPoints: ["System configuration required."]
    };
  }

  const topGainers = stocks.sort((a, b) => b.changePercent - a.changePercent).slice(0, 3);
  const topLosers = stocks.sort((a, b) => a.changePercent - b.changePercent).slice(0, 3);
  
  const prompt = `
    Analyze the following Indian stock market snapshot. 
    Top Gainers: ${topGainers.map(s => `${s.name} (${s.changePercent}%)`).join(', ')}.
    Top Losers: ${topLosers.map(s => `${s.name} (${s.changePercent}%)`).join(', ')}.
    
    Provide a concise market sentiment summary (max 3 sentences), a sentiment tag (BULLISH, BEARISH, or NEUTRAL), and 3 bullet points explaining likely reasons based on general financial knowledge of these sectors (e.g., IT, Finance, Energy).
    
    Respond in JSON format:
    {
      "summary": "string",
      "sentiment": "BULLISH" | "BEARISH" | "NEUTRAL",
      "keyPoints": ["string", "string", "string"]
    }
  `;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIAnalysisResult;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      summary: "Unable to generate AI analysis at this moment due to high traffic or connectivity issues.",
      sentiment: "NEUTRAL",
      keyPoints: ["Check back later for AI insights."]
    };
  }
};
