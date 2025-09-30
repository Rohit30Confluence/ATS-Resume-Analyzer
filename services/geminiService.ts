import { GoogleGenAI, Type } from "@google/genai";
import type { ATSAnalysis } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    overallScore: {
      type: Type.NUMBER,
      description: "A score from 1 to 10 on how well the resume matches the job description and ATS best practices."
    },
    firstImpression: {
      type: Type.STRING,
      description: "A brief, overall first impression of the resume."
    },
    atsKeywordsMatch: {
      type: Type.OBJECT,
      properties: {
        matchingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
        missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
        summary: { type: Type.STRING }
      },
      required: ['matchingKeywords', 'missingKeywords', 'summary']
    },
    actionVerbs: {
      type: Type.OBJECT,
      properties: {
        strongVerbsUsed: { type: Type.ARRAY, items: { type: Type.STRING } },
        suggestions: { type: Type.STRING, description: "Suggestions for using stronger action verbs." }
      },
      required: ['strongVerbsUsed', 'suggestions']
    },
    formattingClarity: {
      type: Type.OBJECT,
      properties: {
        positivePoints: { type: Type.ARRAY, items: { type: Type.STRING } },
        areasForImprovement: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ['positivePoints', 'areasForImprovement']
    },
    suggestedImprovements: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of actionable suggestions for overall improvement."
    },
    revisedResume: {
      type: Type.STRING,
      description: "The full text of an improved, ATS-friendly resume."
    }
  },
  required: ['overallScore', 'firstImpression', 'atsKeywordsMatch', 'actionVerbs', 'formattingClarity', 'suggestedImprovements', 'revisedResume']
};

export const analyzeResume = async (resume: string, jobDescription: string): Promise<ATSAnalysis> => {
  const prompt = `
    Act as an expert career coach and professional resume writer specializing in ATS optimization.
    Analyze the following resume in the context of the provided job description.

    **Resume:**
    ${resume}

    **Job Description:**
    ${jobDescription}

    Provide a detailed analysis and generate an improved resume.
    Your response must be a JSON object matching the provided schema.
    Focus on keyword alignment, action verbs, clarity, and formatting.
    The 'revisedResume' should be a complete, ready-to-use text document.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema
      }
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText) as ATSAnalysis;
    return result;
  } catch (error) {
    console.error("Error analyzing resume with Gemini API:", error);
    throw new Error("Failed to get analysis from AI. Please check the console for details.");
  }
};

export const getRefinementTip = async (revisedResume: string): Promise<string> => {
    const prompt = `
    You are an elite career coach and senior hiring manager reviewing a resume that has already been optimized for ATS.
    Your task is to provide one final, powerful suggestion to improve its impact on a human reader.
    Do not comment on keywords or basic formatting. Focus on tone, impact, storytelling, or high-level strategy.
    Your feedback should be a single, concise paragraph.

    **Resume to review:**
    ${revisedResume}

    Provide your single, most impactful tip.
    `;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error getting refinement tip from Gemini API:", error);
        // Return a graceful failure message instead of throwing an error
        return "Could not retrieve the final refinement tip due to an issue with the AI service.";
    }
};
