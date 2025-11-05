
import { GoogleGenAI, Type } from "@google/genai";
import type { TestType, Recommendation } from '../types';

export async function getCareerRecommendations(
  testType: TestType,
  questions: string[],
  answers: string[]
): Promise<Recommendation[]> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const formattedQA = questions
    .map((q, i) => `Question: ${q}\nAnswer: ${answers[i] || "No answer provided"}`)
    .join("\n\n");

  const prompt = `
    You are an expert career assessment counselor for students. Based on the following assessment, provide a list of 5 suitable career recommendations. For each recommendation, provide a brief (1-2 sentences) explanation of why it's a good fit based on the student's answers.

    Assessment Type: ${testType}

    Questions and Answers:
    ${formattedQA}

    Return your response as a JSON object.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      recommendations: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            career: {
              type: Type.STRING,
              description: "The name of the recommended career.",
            },
            reason: {
              type: Type.STRING,
              description: "A brief explanation for the recommendation.",
            },
          },
          required: ["career", "reason"],
        },
      },
    },
    required: ["recommendations"],
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      }
    });
    
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result.recommendations as Recommendation[];
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get recommendations from AI. Please check your API key and try again.");
  }
}
