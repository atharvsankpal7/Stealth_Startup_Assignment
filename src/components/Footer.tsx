import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-8 py-4 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-center text-gray-600 text-sm">
          Dynamic Form Builder © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};