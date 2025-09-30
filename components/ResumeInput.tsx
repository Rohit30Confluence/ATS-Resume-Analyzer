
import React from 'react';

interface ResumeInputProps {
  resume: string;
  setResume: (value: string) => void;
  jobDescription: string;
  setJobDescription: (value: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const ResumeInput: React.FC<ResumeInputProps> = ({
  resume,
  setResume,
  jobDescription,
  setJobDescription,
  onAnalyze,
  isLoading,
}) => {
  const isButtonDisabled = !resume || !jobDescription || isLoading;

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-lg p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="resume-input" className="block text-lg font-semibold mb-2 text-slate-700 dark:text-slate-300">Your Resume</label>
          <textarea
            id="resume-input"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your full resume text here..."
            className="w-full h-96 p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>
        <div>
          <label htmlFor="jd-input" className="block text-lg font-semibold mb-2 text-slate-700 dark:text-slate-300">Job Description</label>
          <textarea
            id="jd-input"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the target job description here..."
            className="w-full h-96 p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={onAnalyze}
          disabled={isButtonDisabled}
          className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          {isLoading ? 'Analyzing...' : 'Analyze My Resume'}
        </button>
      </div>
    </div>
  );
};

export default ResumeInput;
