import React, { useState, useCallback } from 'react';
import type { ATSAnalysis } from './types';
import { analyzeResume, getRefinementTip } from './services/geminiService';
import Header from './components/Header';
import ResumeInput from './components/ResumeInput';
import AnalysisResult from './components/AnalysisResult';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [refinementTip, setRefinementTip] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeClick = useCallback(async () => {
    if (!resumeText || !jobDescription) {
      setError('Please provide both a resume and a job description.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setRefinementTip(null);

    try {
      const result = await analyzeResume(resumeText, jobDescription);
      setAnalysis(result);
      // Main analysis is done, we can stop the main loader
      setIsLoading(false);

      // Now, asynchronously fetch the refinement tip from the second agent
      const tip = await getRefinementTip(result.revisedResume);
      setRefinementTip(tip);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      // Ensure loading is stopped on error
      setIsLoading(false);
    }
  }, [resumeText, jobDescription]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-lg text-slate-600 dark:text-slate-400 mb-8">
            Paste your resume and a target job description below. Our AI will provide detailed feedback and generate an optimized, ATS-friendly resume to help you stand out.
          </p>
          <ResumeInput
            resume={resumeText}
            setResume={setResumeText}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            onAnalyze={handleAnalyzeClick}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-8 bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {isLoading && <LoadingSpinner />}

          {analysis && !isLoading && (
            <div className="mt-8 animate-fade-in">
               <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100 mb-6">Your Analysis Results</h2>
              <AnalysisResult result={analysis} refinementTip={refinementTip} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
