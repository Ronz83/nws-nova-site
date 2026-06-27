import React from 'react';
import { FileText, Link as LinkIcon, Type, HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type KBTab = 'files' | 'urls' | 'text' | 'qna';

interface KBSidebarProps {
  activeTab: KBTab;
  setActiveTab: (tab: KBTab) => void;
}

export const KBSidebar: React.FC<KBSidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'files', label: 'Documents', icon: FileText },
    { id: 'urls', label: 'URLs', icon: LinkIcon },
    { id: 'text', label: 'Raw Text', icon: Type },
    { id: 'qna', label: 'Q&A', icon: HelpCircle },
  ] as const;

  return (
    <div className="w-64 border-r border-gray-200 bg-gray-50/50 p-4 min-h-[600px] flex flex-col gap-2">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
        Source Types
      </h3>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as KBTab)}
            className={twMerge(
              clsx(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors w-full text-left",
                isActive 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )
            )}
          >
            <Icon className={twMerge(clsx("w-4 h-4", isActive ? "text-blue-600" : "text-gray-400"))} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
