import React from 'react';
import { FormField } from './FormField';
import { FormConfig, FormData } from '../types/form';

interface DynamicFormProps {
  formConfig: FormConfig;
  formData: FormData;
  errors: Record<string, string>;
  onFieldChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  formConfig,
  formData,
  errors,
  onFieldChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formConfig.fields.map((field) => (
          <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
            <FormField
              field={field}
              value={formData[field.name]?.toString() || ''}
              error={errors[field.name]}
              onChange={onFieldChange}
            />
          </div>
        ))}
      </div>
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-6 rounded-lg font-medium hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          Submit
        </button>
      </div>
    </form>
  );
};