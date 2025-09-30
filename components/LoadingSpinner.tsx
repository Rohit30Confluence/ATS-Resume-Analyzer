
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-12">
      <div className="w-16 h-16 border-4 border-t-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        AI is analyzing your resume...
      </p>
    </div>
  );
};

export default LoadingSpinner;
