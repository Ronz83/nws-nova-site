import React, { useState, useEffect, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import type { Category, ProjectState, TaskStatus } from '../../../hooks/useProjectState';

interface PipelineEditorProps {
  category: Category | null;
  state: ProjectState;
  onClose: () => void;
  onSave: (categoryId: string, status: TaskStatus, textUpdates: Record<string, string>) => void;
  onAddFiles: (categoryId: string, files: File[]) => void;
  onRemoveFile: (categoryId: string, fileId: string) => void;
}

export function PipelineEditor({ category, state, onClose, onSave, onAddFiles, onRemoveFile }: PipelineEditorProps) {
  const [isReady, setIsReady] = useState(false);
  const [textUpdates, setTextUpdates] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (category) {
      setIsReady(state.status[category.id] === 'ready');
      setTextUpdates({});
    }
  }, [category, state.status]);

  if (!category) return null;

  const IconComponent = (LucideIcons as any)[category.icon] || LucideIcons.File;

  const handleTextChange = (key: string, value: string) => {
    setTextUpdates(prev => ({ ...prev, [key]: value }));
  };

  const getTextValue = (key: string) => {
    return textUpdates[key] !== undefined ? textUpdates[key] : state.textData[key] || '';
  };

  const handleSave = () => {
    onSave(category.id, isReady ? 'ready' : 'inprogress', textUpdates);
    onClose();
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onAddFiles(category.id, Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFiles(category.id, Array.from(e.target.files));
    }
  };

  // Render specific inputs based on category
  const renderFields = () => {
    if (category.id === 'client-playbook') {
      return (
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Client Playbook Editor</label>
          <textarea 
            className="bg-black/20 border border-[rgba(255,255,255,0.06)] text-white rounded-xl p-4 text-sm min-h-[300px] font-mono focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple"
            value={getTextValue('clientPlaybook')}
            onChange={(e) => handleTextChange('clientPlaybook', e.target.value)}
          />
        </div>
      );
    }
    
    if (category.id === 'tech-setup') {
      return (
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Tech Setup Notes</label>
          <textarea 
            className="bg-black/20 border border-[rgba(255,255,255,0.06)] text-white rounded-xl p-4 text-sm min-h-[150px] font-mono focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple"
            value={getTextValue('techSetupNotes')}
            onChange={(e) => handleTextChange('techSetupNotes', e.target.value)}
            placeholder="DNS configuration, email setup details..."
          />
        </div>
      );
    }

    if (category.id === 'assets-handover') {
      return (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Handover Notes</label>
            <textarea 
              className="bg-black/20 border border-[rgba(255,255,255,0.06)] text-white rounded-xl p-4 text-sm min-h-[100px] font-mono focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple"
              value={getTextValue('handoverNotes')}
              onChange={(e) => handleTextChange('handoverNotes', e.target.value)}
              placeholder="Any specific delivery instructions..."
            />
          </div>
          
          <div 
            className="border border-dashed border-[rgba(255,255,255,0.1)] hover:border-accent-purple bg-[rgba(0,0,0,0.2)] hover:bg-[rgba(195,146,255,0.05)] rounded-[20px] p-8 text-center transition-all cursor-pointer relative"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] flex items-center justify-center mx-auto mb-3">
              <LucideIcons.UploadCloud className="w-5 h-5 text-accent-purple" />
            </div>
            <p className="text-sm font-medium text-white mb-1">Secure Drop Zone</p>
            <p className="text-[10px] text-text-secondary uppercase tracking-widest">Brand Assets, Logos, Docs</p>
            <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
          </div>

          {state.files[category.id] && state.files[category.id].length > 0 && (
            <ul className="flex flex-col gap-3">
              {state.files[category.id].map(file => (
                <li key={file.id} className="flex items-center justify-between bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.05)] p-4 rounded-[12px]">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-8 h-8 rounded-[8px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] flex items-center justify-center shrink-0">
                      <LucideIcons.File className="w-4 h-4 text-accent-purple" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-medium text-white truncate max-w-[200px]">{file.name}</span>
                      <span className="text-[10px] text-text-secondary uppercase tracking-widest mt-0.5">{file.size}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemoveFile(category.id, file.id)}
                    className="text-text-secondary hover:text-white p-2"
                  >
                    <LucideIcons.Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    // Default basic text area for other categories
    return (
      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Notes & Configuration</label>
        <textarea 
          className="bg-black/20 border border-[rgba(255,255,255,0.06)] text-white rounded-xl p-4 text-sm min-h-[150px] font-mono focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple"
          value={getTextValue(`${category.id.replace('-', '')}Notes`)}
          onChange={(e) => handleTextChange(`${category.id.replace('-', '')}Notes`, e.target.value)}
          placeholder="Enter configuration notes..."
        />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-[#0f111a]/90 backdrop-blur-sm z-50 flex justify-end">
      <div className="w-full max-w-xl bg-[#151723] border-l border-[rgba(255,255,255,0.06)] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="px-8 py-8 border-b border-[rgba(255,255,255,0.06)] flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-accent-purple" />
            </div>
            <h2 className="text-xl font-bold tracking-wide text-white">{category.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 text-text-secondary hover:bg-[rgba(255,255,255,0.05)] hover:text-white rounded-full transition-colors">
            <LucideIcons.X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-8 flex-1 overflow-y-auto">
          {renderFields()}
        </div>
        
        <div className="px-8 py-6 border-t border-[rgba(255,255,255,0.06)] bg-[#0f111a] shrink-0 flex justify-between items-center">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input 
                type="checkbox" 
                className="peer sr-only"
                checked={isReady}
                onChange={(e) => setIsReady(e.target.checked)}
              />
              <div className="w-5 h-5 border border-text-secondary rounded bg-[rgba(255,255,255,0.05)] peer-checked:bg-accent-purple peer-checked:border-accent-purple transition-all"></div>
              <LucideIcons.Check className="absolute w-3.5 h-3.5 text-[#0f111a] opacity-0 peer-checked:opacity-100 transition-opacity font-bold" />
            </div>
            <span className="text-sm font-medium text-text-secondary group-hover:text-white transition-colors tracking-wide">Mark block as Ready</span>
          </label>
          <button 
            onClick={handleSave}
            className="bg-gradient-to-r from-accent-purple to-accent-pink text-black font-semibold shadow-[0_0_20px_rgba(195,146,255,0.3)] hover:shadow-[0_0_30px_rgba(195,146,255,0.5)] px-8 py-3 rounded-full tracking-wide transition-all hover:-translate-y-[1px]"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
