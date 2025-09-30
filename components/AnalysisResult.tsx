import React, { useState } from 'react';
import type { ATSAnalysis } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { ClipboardCheckIcon } from './icons/ClipboardCheckIcon';
import { SparkleIcon } from './icons/SparkleIcon';

interface AnalysisResultProps {
  result: ATSAnalysis;
  refinementTip: string | null;
}

const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 10) * circumference;
  const scoreColor = score >= 8 ? 'text-green-500' : score >= 5 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="10" className="text-slate-200 dark:text-slate-700" fill="transparent" />
        <circle
          cx="50" cy="50" r="45"
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${scoreColor} transition-all duration-1000 ease-in-out`}
        />
      </svg>
      <span className={`text-4xl font-bold ${scoreColor}`}>{score}</span>
      <span className="absolute bottom-4 text-xs font-medium text-slate-500 dark:text-slate-400">/ 10</span>
    </div>
  );
};

const FeedbackCard: React.FC<{ title: string; children: React.ReactNode, icon?: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          {icon && <div className="mr-3">{icon}</div>}
          <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{title}</h3>
        </div>
        {children}
    </div>
);

const KeywordPill: React.FC<{ keyword: string, type: 'match' | 'missing' }> = ({ keyword, type }) => {
    const baseClasses = "inline-block px-3 py-1 text-sm font-medium rounded-full mr-2 mb-2";
    const typeClasses = type === 'match'
        ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
        : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300";
    return <span className={`${baseClasses} ${typeClasses}`}>{keyword}</span>;
}

const InlineSpinner: React.FC = () => (
    <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">Senior agent is reviewing...</span>
    </div>
);


const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, refinementTip }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.revisedResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 bg-white dark:bg-slate-800/50 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
                 <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Overall Score</h3>
                 <ScoreCircle score={result.overallScore} />
            </div>
             <div className="md:col-span-2 bg-white dark:bg-slate-800/50 rounded-xl shadow-lg p-6 flex flex-col justify-center">
                 <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">First Impression</h3>
                 <p className="text-slate-600 dark:text-slate-300 text-lg">{result.firstImpression}</p>
            </div>
        </div>

        <FeedbackCard title="ATS Keyword Match">
            <p className="text-slate-600 dark:text-slate-300 mb-4">{result.atsKeywordsMatch.summary}</p>
            <div className="mb-4">
                <h4 className="font-semibold mb-2">Matching Keywords:</h4>
                <div>{result.atsKeywordsMatch.matchingKeywords.map(k => <KeywordPill key={k} keyword={k} type="match" />)}</div>
            </div>
             <div>
                <h4 className="font-semibold mb-2">Missing Keywords:</h4>
                <div>{result.atsKeywordsMatch.missingKeywords.map(k => <KeywordPill key={k} keyword={k} type="missing" />)}</div>
            </div>
        </FeedbackCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeedbackCard title="Action Verbs">
                 <p className="text-slate-600 dark:text-slate-300 mb-4">{result.actionVerbs.suggestions}</p>
                 <h4 className="font-semibold mb-2">Strong Verbs Used:</h4>
                 <div className="flex flex-wrap">
                    {result.actionVerbs.strongVerbsUsed.map(v => <span key={v} className="text-sm bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded mr-2 mb-2">{v}</span>)}
                 </div>
            </FeedbackCard>
             <FeedbackCard title="Formatting & Clarity">
                 <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">Positive Points:</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                           {result.formattingClarity.positivePoints.map((p,i) => <li key={i}>{p}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 text-yellow-600 dark:text-yellow-400">Areas for Improvement:</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                           {result.formattingClarity.areasForImprovement.map((p,i) => <li key={i}>{p}</li>)}
                        </ul>
                    </div>
                </div>
            </FeedbackCard>
        </div>
        
        <FeedbackCard title="Suggested Improvements">
             <ul className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300">
                {result.suggestedImprovements.map((s,i) => <li key={i}>{s}</li>)}
             </ul>
        </FeedbackCard>

        <FeedbackCard title="Senior Agent's Final Polish" icon={<SparkleIcon className="w-6 h-6 text-amber-500" />}>
            {refinementTip ? (
                <p className="text-slate-600 dark:text-slate-300 italic">{refinementTip}</p>
            ) : (
                <InlineSpinner />
            )}
        </FeedbackCard>

        <FeedbackCard title="Your New ATS-Friendly Resume">
            <div className="relative">
                 <button onClick={handleCopy} className="absolute top-2 right-2 p-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                    {copied ? <ClipboardCheckIcon className="w-5 h-5 text-green-500" /> : <ClipboardIcon className="w-5 h-5" />}
                 </button>
                 <pre className="whitespace-pre-wrap bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg text-sm text-slate-700 dark:text-slate-300 overflow-x-auto">
                    {result.revisedResume}
                 </pre>
            </div>
        </FeedbackCard>
    </div>
  );
};

export default AnalysisResult;
