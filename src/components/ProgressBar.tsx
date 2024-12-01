import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-100 rounded-full h-3 mb-8 overflow-hidden shadow-inner">
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      >
        <div className="h-full w-full bg-gradient-to-r from-transparent to-white/20 animate-pulse" />
      </div>
    </div>
  );
};