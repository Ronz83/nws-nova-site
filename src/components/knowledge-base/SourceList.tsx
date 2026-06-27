import React from 'react';
import { Trash2, FileText, Link as LinkIcon, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SourceInfo {
  id: string;
  name: string;
  type: 'file' | 'url' | 'text';
  status: 'processing' | 'trained' | 'failed';
  dateAdded: string;
}

interface SourceListProps {
  sources: SourceInfo[];
  onDelete: (id: string) => void;
  onRefresh?: (id: string) => void;
}

export const SourceList: React.FC<SourceListProps> = ({ sources, onDelete, onRefresh }) => {
  if (sources.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
        <p className="text-sm text-gray-500">No sources added yet. Upload files or add URLs to train your AI.</p>
      </div>
    );
  }

  const getStatusIcon = (status: SourceInfo['status']) => {
    switch (status) {
      case 'processing': return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'trained': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: SourceInfo['status']) => {
    const baseClasses = "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium w-max";
    switch (status) {
      case 'processing': return twMerge(clsx(baseClasses, "bg-blue-50 text-blue-700"));
      case 'trained': return twMerge(clsx(baseClasses, "bg-emerald-50 text-emerald-700"));
      case 'failed': return twMerge(clsx(baseClasses, "bg-red-50 text-red-700"));
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Source Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Added
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sources.map((source) => (
            <tr key={source.id} className="hover:bg-gray-50 transition-colors group">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="shrink-0 p-2 bg-gray-100 rounded-md">
                    {source.type === 'file' && <FileText className="w-4 h-4 text-gray-600" />}
                    {source.type === 'url' && <LinkIcon className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{source.name}</div>
                    <div className="text-xs text-gray-500 uppercase">{source.type}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={getStatusBadge(source.status)}>
                  {getStatusIcon(source.status)}
                  <span className="capitalize">{source.status}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {source.dateAdded}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {source.type === 'url' && onRefresh && (
                    <button 
                      onClick={() => onRefresh(source.id)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Re-scrape URL"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => onDelete(source.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete Source"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
