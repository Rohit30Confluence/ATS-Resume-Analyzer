
import React from 'react';
import { RobotIcon } from './icons/RobotIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-800/50 shadow-sm sticky top-0 z-10 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 md:px-8">
        <div className="flex items-center justify-center space-x-3">
          <RobotIcon className="w-8 h-8 text-indigo-500" />
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
            ATS Resume Analyzer
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
