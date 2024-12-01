import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  id: string;
  accept?: string;
  multiple?: boolean;
  value: string;
  onChange: (files: FileList | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  id,
  accept,
  multiple,
  value,
  onChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // Validate file types
      const isValidFileType = Array.from(files).every(file => {
        if (!accept) return true;
        const acceptedTypes = accept.split(',');
        return acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          return file.type.match(new RegExp(type.replace('*', '.*')));
        });
      });

      if (!isValidFileType) {
        alert('Invalid file type. Please upload files matching the accepted formats.');
        return;
      }

      onChange(files);
    }
  }, [accept, onChange]);

  return (
    <div
      className={`relative ${
        isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 bg-gray-50'
      } border-2 border-dashed rounded-lg transition-all duration-200`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id={id}
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={(e) => onChange(e.target.files)}
      />
      <label
        htmlFor={id}
        className="flex flex-col items-center justify-center p-6 cursor-pointer group"
      >
        <div className={`p-3 rounded-full ${
          isDragging ? 'bg-primary-100' : 'bg-gray-100'
        } group-hover:bg-primary-100 transition-colors duration-200`}>
          <Upload className={`h-6 w-6 ${
            isDragging ? 'text-primary-600' : 'text-gray-400'
          } group-hover:text-primary-600 transition-colors duration-200`} />
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-gray-700">
            {isDragging ? (
              'Drop files here'
            ) : (
              <>
                <span className="text-primary-600">Click to upload</span>
                {' or drag and drop'}
              </>
            )}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {accept ? `Accepted formats: ${accept}` : 'All file types accepted'}
            {multiple && ' • Multiple files allowed'}
          </p>
        </div>
        {value && (
          <div className="mt-4 text-sm text-gray-500 max-w-full overflow-hidden">
            <p className="truncate">Selected: {value}</p>
          </div>
        )}
      </label>
    </div>
  );
};