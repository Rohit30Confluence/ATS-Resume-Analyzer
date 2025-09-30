
export interface ATSAnalysis {
  overallScore: number;
  firstImpression: string;
  atsKeywordsMatch: {
    matchingKeywords: string[];
    missingKeywords: string[];
    summary: string;
  };
  actionVerbs: {
    strongVerbsUsed: string[];
    suggestions: string;
  };
  formattingClarity: {
    positivePoints: string[];
    areasForImprovement: string[];
  };
  suggestedImprovements: string[];
  revisedResume: string;
}
