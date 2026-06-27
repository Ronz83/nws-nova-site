import React, { useState } from 'react';
import { KBSidebar } from './KBSidebar';
import type { KBTab } from './KBSidebar';
import { FileDropzone } from './FileDropzone';
import { SourceList } from './SourceList';
import type { SourceInfo } from './SourceList';
import { Database, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const KnowledgeBaseManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<KBTab>('files');
  const [isUploading, setIsUploading] = useState(false);
  
  // Mock data - in production this comes from Vapi API or Supabase
  const [sources, setSources] = useState<SourceInfo[]>([
    { id: '1', name: 'company_handbook.pdf', type: 'file', status: 'trained', dateAdded: '2026-06-20' },
    { id: '2', name: 'https://noveltywebsolutions.com/services', type: 'url', status: 'trained', dateAdded: '2026-06-21' },
    { id: '3', name: 'price_list_v2.csv', type: 'file', status: 'processing', dateAdded: '2026-06-25' },
  ]);

  const handleDelete = (id: string) => {
    setSources(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="flex h-full min-h-[700px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Sidebar Navigation */}
      <KBSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              Knowledge Base
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Train your AI on documents, websites, and text.
            </p>
          </div>
          
          <button 
            onClick={() => setIsUploading(!isUploading)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
          >
            {isUploading ? 'View Sources' : <><Plus className="w-4 h-4" /> Add Source</>}
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-8 bg-gray-50/30 overflow-y-auto">
          <AnimatePresence mode="wait">
            {isUploading ? (
              <motion.div
                key="upload-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-3xl mx-auto"
              >
                {activeTab === 'files' && (
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Upload Documents</h3>
                    <p className="text-sm text-gray-500 mb-6">Upload PDFs, CSVs, or text files to train your assistant. Files are processed securely via Vapi.</p>
                    <FileDropzone onFileSelect={(files) => console.log('Selected:', files)} />
                  </div>
                )}

                {activeTab === 'urls' && (
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Scrape Website</h3>
                    <p className="text-sm text-gray-500 mb-6">Enter a URL to scrape its content and add it to the knowledge base.</p>
                    
                    <div className="flex gap-3">
                      <input 
                        type="url" 
                        placeholder="https://example.com"
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                      <button className="px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
                        Scrape URL
                      </button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'text' && (
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Raw Text</h3>
                    <p className="text-sm text-gray-500 mb-4">Paste raw text content directly into the knowledge base.</p>
                    <textarea 
                      rows={6}
                      placeholder="Paste text here..."
                      className="w-full rounded-lg border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                    ></textarea>
                     <div className="mt-4 flex justify-end">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
                            Save Text
                        </button>
                    </div>
                  </div>
                )}
                
                 {activeTab === 'qna' && (
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Q&A Pairs</h3>
                    <p className="text-sm text-gray-500 mb-4">Add direct Question and Answer pairs to strictly guide the AI's responses.</p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                            <input type="text" placeholder="e.g. Do you offer refunds?" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                            <textarea rows={3} placeholder="e.g. We offer a 30-day money back guarantee." className="w-full rounded-lg border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                        </div>
                    </div>
                     <div className="mt-4 flex justify-end">
                        <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
                            Add Q&A
                        </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="list-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-5xl mx-auto"
              >
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Current Sources</h3>
                  <p className="text-sm text-gray-500">Manage the data your AI assistant uses to answer questions.</p>
                </div>
                <SourceList sources={sources} onDelete={handleDelete} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
