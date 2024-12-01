import React from 'react';
import { ClipboardList } from 'lucide-react';

interface HeaderProps {
  formType: string;
  onFormTypeChange: (type: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ formType, onFormTypeChange }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-lg">
          <ClipboardList className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Dynamic Form Builder
          </h1>
          <p className="text-gray-600 mt-1">Create and manage dynamic forms with ease</p>
        </div>
      </div>
      <select
        value={formType}
        onChange={(e) => onFormTypeChange(e.target.value)}
        className="w-full sm:w-auto px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-all duration-200 bg-white shadow-sm appearance-none cursor-pointer bg-no-repeat bg-right pr-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: '1.5rem',
        }}
      >
        <option value="userInfo">User Information</option>
        <option value="address">Address Information</option>
        <option value="payment">Payment Information</option>
        <option value="jobApplication">Job Application</option>
        <option value="survey">Survey</option>
        <option value="contactForm">Contact Form</option>
      </select>
    </div>
  );
};