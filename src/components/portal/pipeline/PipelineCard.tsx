import * as LucideIcons from 'lucide-react';
import type { Category, ProjectState } from '../../../hooks/useProjectState';

interface PipelineCardProps {
  category: Category;
  state: ProjectState;
  onClick: (category: Category) => void;
}

export function PipelineCard({ category, state, onClick }: PipelineCardProps) {
  const status = state.status[category.id] || 'todo';
  
  let metaInfo = '';
  if (category.id === 'voice-talent') {
    metaInfo = `${state.talentCount || 0} units`;
  } else {
    metaInfo = `${state.files[category.id]?.length || 0} items`;
  }

  const statusText = status === 'ready' ? 'Ready' : (status === 'inprogress' ? 'Processing' : 'Pending');
  const statusColor = status === 'ready' ? 'text-accent-pink' : (status === 'inprogress' ? 'text-accent-purple' : 'text-text-secondary');

  const IconComponent = (LucideIcons as any)[category.icon] || LucideIcons.File;

  return (
    <div 
      onClick={() => onClick(category)}
      className="bg-[#1f2232] border border-[rgba(255,255,255,0.06)] rounded-[20px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] p-6 cursor-pointer hover:border-[rgba(255,255,255,0.15)] hover:bg-[#262a3d] transition-all group relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] text-text-secondary text-[0.65rem] font-bold tracking-[0.05em] uppercase py-1 px-2.5 rounded-full">
          {category.id.replace('-', ' ')}
        </span>
        <button className="text-text-secondary hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); }}>
          <LucideIcons.MoreVertical className="w-4 h-4" />
        </button>
      </div>
      <h4 className="text-lg font-medium text-white tracking-wide mb-2">{category.title}</h4>
      <p className="text-sm text-text-secondary mb-6 leading-relaxed line-clamp-2">{category.desc}</p>
      
      <div className="flex justify-between items-center pt-4 border-t border-[rgba(255,255,255,0.06)] mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center">
            <IconComponent className="w-3 h-3 text-accent-purple" />
          </div>
          <span className="text-xs text-text-secondary font-medium">{metaInfo}</span>
        </div>
        <span className={`text-xs font-bold tracking-wide ${statusColor}`}>{statusText}</span>
      </div>
    </div>
  );
}
