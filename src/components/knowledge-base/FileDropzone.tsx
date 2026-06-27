import React, { useCallback, useState } from 'react';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FileDropzoneProps {
  onFileSelect: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({ 
  onFileSelect, 
  maxFiles = 5,
  accept = ".pdf,.csv,.txt,.docx"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files).slice(0, maxFiles);
      setSelectedFiles(prev => [...prev, ...files].slice(0, maxFiles));
      onFileSelect(files);
    }
  }, [maxFiles, onFileSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).slice(0, maxFiles);
      setSelectedFiles(prev => [...prev, ...files].slice(0, maxFiles));
      onFileSelect(files);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <div
        className={twMerge(clsx(
          "relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 cursor-pointer overflow-hidden",
          isDragging 
            ? "border-blue-500 bg-blue-50/50" 
            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        ))}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          multiple 
          accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChange}
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={twMerge(clsx(
            "p-4 rounded-full transition-colors duration-200",
            isDragging ? "bg-blue-100" : "bg-gray-100"
          ))}>
            <UploadCloud className={twMerge(clsx(
              "w-8 h-8",
              isDragging ? "text-blue-600" : "text-gray-500"
            ))} />
          </div>
          <div className="text-sm">
            <span className="font-semibold text-blue-600">Click to upload</span>
            <span className="text-gray-600"> or drag and drop</span>
          </div>
          <p className="text-xs text-gray-500">
            PDF, TXT, CSV, DOCX (Max {maxFiles} files)
          </p>
        </div>
      </div>

      <AnimatePresence>
        {selectedFiles.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 space-y-2"
          >
            <h4 className="text-sm font-medium text-gray-700 mb-3">Selected Files</h4>
            {selectedFiles.map((file, idx) => (
              <motion.div 
                key={`${file.name}-${idx}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2 bg-blue-50 rounded-md shrink-0">
                    <FileIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFile(idx)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
            
            <div className="pt-4 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
                    Upload & Train AI
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
