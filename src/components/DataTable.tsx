import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { FormEntry } from '../types/form';

interface DataTableProps {
  entries: FormEntry[];
  currentFormType: string;
  onEdit: (entry: FormEntry) => void;
  onDelete: (id: string) => void;
}

export const DataTable: React.FC<DataTableProps> = ({ 
  entries, 
  currentFormType, 
  onEdit, 
  onDelete 
}) => {
  // Filter entries based on the current form type
  const filteredEntries = entries.filter(entry => entry.formType === currentFormType);

  if (filteredEntries.length === 0) {
    return (
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-center">
          No entries found for {currentFormType.replace(/([A-Z])/g, ' $1').toLowerCase()}
        </p>
      </div>
    );
  }

  const keys = Object.keys(filteredEntries[0])
    .filter(key => !['id', 'timestamp', 'formType'].includes(key));

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          {currentFormType.replace(/([A-Z])/g, ' $1').toLowerCase()} Entries
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {keys.map((key) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEntries.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                {keys.map((key) => (
                  <td key={key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry[key]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(entry)}
                    className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
                    title="Edit entry"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(entry.id)}
                    className="text-red-600 hover:text-red-900 transition-colors"
                    title="Delete entry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};