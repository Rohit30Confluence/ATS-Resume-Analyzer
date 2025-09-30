import React, { useState, useCallback, DragEvent } from 'react';
import { UploadIcon } from './icons/UploadIcon';

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
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const isButtonDisabled = !resume || !jobDescription || isLoading;

  const handleFile = useCallback((file: File) => {
    setUploadError(null);
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          setResume(text);
        }
      };
      reader.onerror = () => {
        setUploadError('Failed to read the file.');
      };
      reader.readAsText(file);
    } else {
      setUploadError('Invalid file type. Please upload a .txt file.');
      setTimeout(() => setUploadError(null), 3000);
    }
  }, [setResume]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, [handleFile]);

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-lg p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-2 flex flex-col h-full">
          <label htmlFor="resume-input" className="block text-lg font-semibold text-slate-700 dark:text-slate-300">Your Resume</label>
          
          <label
            htmlFor="resume-file-upload"
            className={`flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-md appearance-none cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 focus:outline-none flex-shrink-0 ${isDragging ? 'border-indigo-500 bg-indigo-50 dark:bg-slate-600' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
             <input id="resume-file-upload" type="file" accept=".txt" className="sr-only" onChange={handleFileChange} />
             <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-center">
                <UploadIcon className="w-8 h-8 flex-shrink-0"/>
                <span className="font-medium">
                  {isDragging ? 'Drop file here' : 'Drop .txt file or click to upload'}
                </span>
             </div>
             <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">PDF/DOCX support coming soon</p>
          </label>
          
          {uploadError && <p className="text-sm text-red-500 flex-shrink-0">{uploadError}</p>}

          <div className="flex items-center flex-shrink-0" aria-hidden="true">
            <div className="w-full border-t border-slate-300 dark:border-slate-600" />
            <span className="px-2 text-slate-500 dark:text-slate-400 text-sm">OR</span>
            <div className="w-full border-t border-slate-300 dark:border-slate-600" />
          </div>

          <textarea
            id="resume-input"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="...paste your full resume text here"
            className="w-full flex-grow p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out min-h-64"
            aria-label="Resume text input"
          />
        </div>
        <div className="flex flex-col h-full">
          <label htmlFor="jd-input" className="block text-lg font-semibold mb-2 text-slate-700 dark:text-slate-300">Job Description</label>
          <textarea
            id="jd-input"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the target job description here..."
            className="w-full h-full flex-grow p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out min-h-[30rem]"
            aria-label="Job description text input"
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