import React from 'react';
import { FormField as FormFieldType } from '../types/form';
import { FileUpload } from './FileUpload';

interface FormFieldProps {
  field: FormFieldType;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  error,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (field.type === 'checkbox' && field.options) {
      const checkboxes = document.querySelectorAll<HTMLInputElement>(`input[name="${field.name}"]`);
      const selectedValues = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      onChange(field.name, selectedValues.join(','));
    } else {
      onChange(field.name, e.target.value);
    }
  };

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map(file => file.name);
      onChange(field.name, fileNames.join(', '));
    }
  };

  const baseInputClasses = "w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 transition-all duration-200 bg-white shadow-inner-lg";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1.5";
  const errorClasses = "mt-1.5 text-sm text-red-500";

  const renderField = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={handleChange}
            className={`${baseInputClasses} min-h-[100px] resize-y`}
            placeholder={`Enter ${field.label}`}
          />
        );

      case 'dropdown':
        return (
          <select
            value={value}
            onChange={handleChange}
            className={`${baseInputClasses} appearance-none bg-no-repeat bg-right pr-10`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundSize: '1.5rem',
            }}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-3 pt-1">
            {field.options?.map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name={field.name}
                    value={option}
                    checked={value === option}
                    onChange={handleChange}
                    className="w-5 h-5 border-2 border-gray-300 rounded-full appearance-none checked:border-primary-500 checked:border-[6px] transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-primary-200 focus:outline-none"
                  />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                  {option}
                </span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-3 pt-1">
            {field.options ? (
              field.options.map((option) => (
                <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name={field.name}
                      value={option}
                      checked={value.split(',').includes(option)}
                      onChange={handleChange}
                      className="w-5 h-5 border-2 border-gray-300 rounded appearance-none checked:bg-primary-500 checked:border-primary-500 transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-primary-200 focus:outline-none"
                    />
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {option}
                  </span>
                </label>
              ))
            ) : (
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={value === 'true'}
                    onChange={(e) => onChange(field.name, e.target.checked.toString())}
                    className="w-5 h-5 border-2 border-gray-300 rounded appearance-none checked:bg-primary-500 checked:border-primary-500 transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-primary-200 focus:outline-none"
                  />
                </div>
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                  {field.label}
                </span>
              </label>
            )}
          </div>
        );

      case 'file':
        return (
          <FileUpload
            id={field.name}
            accept={field.accept}
            multiple={field.multiple}
            value={value}
            onChange={handleFileChange}
          />
        );

      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={field.min}
              max={field.max}
              value={value}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{field.min}</span>
              <span>{value || '0'}</span>
              <span>{field.max}</span>
            </div>
          </div>
        );

      default:
        return (
          <input
            type={field.type}
            value={value}
            onChange={handleChange}
            className={baseInputClasses}
            placeholder={`Enter ${field.label}`}
          />
        );
    }
  };

  return (
    <div className="mb-5">
      <label className={labelClasses}>
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {error && <p className={errorClasses}>{error}</p>}
    </div>
  );
};