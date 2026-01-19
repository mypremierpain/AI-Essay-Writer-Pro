
import { GoogleGenAI } from "@google/genai";
import { EssayRequest } from '../types';

/**
 * Generates an essay using Gemini's streaming capability for the fastest possible response.
 * We bypass the non-existent WP endpoint to avoid loading delays in this environment.
 */
export const generateEssayStream = async (
  data: EssayRequest, 
  onChunk: (text: string) => void
): Promise<{ success: boolean; error?: string }> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    
    const prompt = `Write a high-quality ${data.tone} essay about the topic: "${data.topic}". 
    Target word count: ${data.words} words. 
    Ensure it has a clear introduction, well-structured body paragraphs, and a compelling conclusion.
    Format with clear paragraph breaks. Start writing immediately.`;

    const result = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction: "You are a professional, high-speed essay writing assistant. You produce high-quality academic and creative content instantly.",
        temperature: 0.7,
      },
    });

    let fullText = "";
    for await (const chunk of result) {
      const chunkText = chunk.text;
      if (chunkText) {
        fullText += chunkText;
        onChunk(fullText);
      }
    }

    return { success: true };

  } catch (error) {
    console.error('Generation Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred during generation.'
    };
  }
};
