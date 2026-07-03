import { useState } from 'react';
import { CATEGORIES, useProjectState } from '../../../hooks/useProjectState';
import type { Category, TaskStatus } from '../../../hooks/useProjectState';
import { PipelineCard } from './PipelineCard';
import { PipelineEditor } from './PipelineEditor';
import { useAuth } from '../../../contexts/AuthContext';
import * as LucideIcons from 'lucide-react';

export function PipelineBoard() {
  const { user } = useAuth();
  const { 
    state, 
    isLoading, 
    updateCategoryStatus, 
    updateTextData, 
    addFiles, 
    removeFile 
  } = useProjectState(user?.id, user?.email);
  
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <LucideIcons.Loader2 className="w-8 h-8 text-[#c392ff] animate-spin mb-4" />
        <p className="text-[#9297a8]">Loading pipeline...</p>
      </div>
    );
  }

  const getCardsByStatus = (status: TaskStatus) => 
    CATEGORIES.filter(cat => (state.status[cat.id] || 'todo') === status);

  const pendingCards = getCardsByStatus('todo');
  const processingCards = getCardsByStatus('inprogress');
  const readyCards = getCardsByStatus('ready');

  const handleSave = (categoryId: string, status: TaskStatus, textUpdates: Record<string, string>) => {
    Object.entries(textUpdates).forEach(([key, value]) => {
      updateTextData(key, value);
    });
    updateCategoryStatus(categoryId, status);
  };

  return (
    <div className="flex gap-6 items-start pb-10 overflow-x-auto">
      {/* Pending Column */}
      <div className="flex-1 min-w-[320px] max-w-[400px] flex flex-col gap-4">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-bold text-[#9297a8] uppercase tracking-widest flex items-center gap-2">
            Pending <span className="w-1.5 h-1.5 rounded-full bg-[#9297a8]"></span>
          </span>
          <span className="text-xs font-bold text-[#9297a8]">{pendingCards.length}</span>
        </div>
        <div className="flex flex-col gap-5">
          {pendingCards.map(cat => (
            <PipelineCard key={cat.id} category={cat} state={state} onClick={setActiveCategory} />
          ))}
        </div>
      </div>

      {/* Processing Column */}
      <div className="flex-1 min-w-[320px] max-w-[400px] flex flex-col gap-4">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-bold text-[#9297a8] uppercase tracking-widest flex items-center gap-2">
            Processing <span className="w-1.5 h-1.5 rounded-full bg-[#c392ff] shadow-[0_0_8px_rgba(195,146,255,0.6)]"></span>
          </span>
          <span className="text-xs font-bold text-[#9297a8]">{processingCards.length}</span>
        </div>
        <div className="flex flex-col gap-5">
          {processingCards.map(cat => (
            <PipelineCard key={cat.id} category={cat} state={state} onClick={setActiveCategory} />
          ))}
        </div>
      </div>

      {/* Ready Column */}
      <div className="flex-1 min-w-[320px] max-w-[400px] flex flex-col gap-4">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-bold text-[#9297a8] uppercase tracking-widest flex items-center gap-2">
            Ready <span className="w-1.5 h-1.5 rounded-full bg-[#ffadba] shadow-[0_0_8px_rgba(255,173,186,0.6)]"></span>
          </span>
          <span className="text-xs font-bold text-[#9297a8]">{readyCards.length}</span>
        </div>
        <div className="flex flex-col gap-5">
          {readyCards.map(cat => (
            <PipelineCard key={cat.id} category={cat} state={state} onClick={setActiveCategory} />
          ))}
        </div>
      </div>

      <PipelineEditor 
        category={activeCategory} 
        state={state} 
        onClose={() => setActiveCategory(null)} 
        onSave={handleSave}
        onAddFiles={addFiles}
        onRemoveFile={removeFile}
      />
    </div>
  );
}
