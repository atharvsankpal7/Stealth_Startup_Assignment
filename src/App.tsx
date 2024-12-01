import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DynamicForm } from './components/DynamicForm';
import { ProgressBar } from './components/ProgressBar';
import { DataTable } from './components/DataTable';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { fetchFormConfig } from './data/mockApi';
import { useFormValidation } from './hooks/useFormValidation';
import { FormConfig, FormData, FormEntry } from './types/form';

function App() {
  const [formType, setFormType] = useState<string>('userInfo');
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [entries, setEntries] = useState<FormEntry[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { errors, validateForm, clearFieldError } = useFormValidation(formConfig);

  useEffect(() => {
    loadFormConfig();
  }, [formType]);

  const loadFormConfig = async () => {
    try {
      setLoading(true);
      const config = await fetchFormConfig(formType);
      setFormConfig(config);
      if (!isEditing) {
        setFormData({});
      }
    } catch (error) {
      showToast('Failed to load form configuration', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    clearFieldError(name);
  };

  const calculateProgress = (): number => {
    if (!formConfig) return 0;
    const requiredFields = formConfig.fields.filter(field => field.required);
    const completedFields = requiredFields.filter(field => {
      const value = formData[field.name];
      return value !== undefined && value !== '';
    });
    return (completedFields.length / requiredFields.length) * 100;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      showToast('Please correct the errors in the form', 'error');
      return;
    }

    if (isEditing && editingId) {
      setEntries(prev => prev.map(entry => 
        entry.id === editingId 
          ? { ...formData, id: editingId, timestamp: Date.now(), formType }
          : entry
      ));
      showToast('Entry updated successfully', 'success');
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newEntry: FormEntry = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        formType,
      };
      setEntries(prev => [...prev, newEntry]);
      showToast('Form submitted successfully!', 'success');
    }
    
    setFormData({});
  };

  const handleEdit = (entry: FormEntry) => {
    setFormType(entry.formType);
    setFormData(entry);
    setIsEditing(true);
    setEditingId(entry.id);
    showToast('Edit mode activated', 'info');
  };

  const handleDelete = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    showToast('Entry deleted successfully', 'success');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <Header formType={formType} onFormTypeChange={setFormType} />
            <ProgressBar progress={calculateProgress()} />

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : formConfig ? (
              <DynamicForm
                formConfig={formConfig}
                formData={formData}
                errors={errors}
                onFieldChange={handleFieldChange}
                onSubmit={handleSubmit}
              />
            ) : null}
          </div>

          <DataTable
            entries={entries}
            currentFormType={formType}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <Footer />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;