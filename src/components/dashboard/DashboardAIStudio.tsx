import { useState } from 'react';
import { Mic, FileEdit, List, Play, MessageSquare, BookOpen, Inbox, MessageCircle, Network, UploadCloud, FileText, Trash2, Code, File, RefreshCw, BrainCircuit } from 'lucide-react';
import { useFeatures } from '../../contexts/FeatureContext';
import { VoiceAIConfigModal } from './VoiceAIConfigModal';
import { ReviewAIModal } from './ReviewAIModal';

export function DashboardAIStudio() {
  const { flags } = useFeatures();
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  if (!flags.enable_ai_studio) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <BrainCircuit className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-black text-slate-900 mb-2">Feature Not Enabled</h2>
        <p className="text-slate-700">The AI Studio is currently disabled for your account.</p>
      </div>
    );
  }

  return (
    <>
      {/* Header Section */}
      <header className="mb-12 mt-8">
        <h1 className="text-3xl md:text-4xl text-slate-900 font-black mb-4 tracking-tight">AI Workforce Studio</h1>
        <p className="text-lg text-slate-700 max-w-2xl">Manage your autonomous AI agents for voice, chat, and reviews.</p>
      </header>

      {/* Bento Grid: Agents */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        
        {/* Voice AI Agent Card */}
        <article className="bg-white border-2 border-slate-200 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-6 md:p-8 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-700">
                <Mic className="text-[24px]" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Voice AI</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-[0.18em]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Online
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8 flex-grow">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-300/50">
              <p className="text-xs text-slate-700 font-medium mb-1">Calls Today</p>
              <p className="text-2xl font-bold text-slate-900">142</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-300/50">
              <p className="text-xs text-slate-700 font-medium mb-1">Avg Duration</p>
              <p className="text-2xl font-bold text-slate-900">4m</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 mt-auto">
            <button 
              onClick={() => setIsVoiceModalOpen(true)}
              className="w-full bg-sky-700 text-white rounded-xl py-3 px-6 text-[12px] font-bold uppercase tracking-widest hover:bg-sky-800 transition-colors flex items-center justify-center gap-2"
            >
              <FileEdit className="text-[18px]" />
              Edit Prompt
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="border-2 border-slate-300 bg-transparent text-slate-600 rounded-xl py-2 px-4 text-[11px] font-bold uppercase tracking-wider hover:border-sky-300 hover:text-sky-700 transition-colors flex items-center justify-center gap-1">
                <List className="text-[16px]" />
                Logs
              </button>
              <button className="border-2 border-slate-300 bg-transparent text-slate-600 rounded-xl py-2 px-4 text-[11px] font-bold uppercase tracking-wider hover:border-sky-300 hover:text-sky-700 transition-colors flex items-center justify-center gap-1">
                <Play className="text-[16px]" />
                Test
              </button>
            </div>
          </div>
        </article>

        {/* Chat AI Agent Card */}
        <article className="bg-white border-2 border-slate-200 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-6 md:p-8 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-700">
                <MessageSquare className="text-[24px]" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Chat AI</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-[0.18em]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Online
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8 flex-grow">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-300/50">
              <p className="text-xs text-slate-700 font-medium mb-1">Conversations</p>
              <p className="text-2xl font-bold text-slate-900">89</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-300/50">
              <p className="text-xs text-slate-700 font-medium mb-1">Resolution</p>
              <p className="text-2xl font-bold text-slate-900">98%</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 mt-auto">
            <button className="w-full bg-sky-700 text-white rounded-xl py-3 px-6 text-[12px] font-bold uppercase tracking-widest hover:bg-sky-800 transition-colors flex items-center justify-center gap-2">
              <BookOpen className="text-[18px]" />
              Edit Knowledge Base
            </button>
            <button className="w-full border-2 border-slate-300 bg-transparent text-slate-600 rounded-xl py-3 px-6 text-[12px] font-bold uppercase tracking-widest hover:border-sky-300 hover:text-sky-700 transition-colors flex items-center justify-center gap-2">
              <Inbox className="text-[18px]" />
              View Inbox
            </button>
          </div>
        </article>

        {/* Review AI Agent Card */}
        <article className="bg-white border-2 border-slate-200 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-6 md:p-8 flex flex-col h-full relative overflow-hidden group">
          {/* Subtle background pattern for standby state */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-dot-grid"></div>
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                <MessageCircle className="text-[24px]" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Review AI</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold uppercase tracking-[0.18em] border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Setup Required
            </span>
          </div>
          
          <div className="mb-8 flex-grow relative z-10 flex flex-col justify-center">
            <p className="text-base text-slate-700 leading-relaxed text-center px-4">
              Connect your Google Business Profile to automate review replies and manage reputation autonomously.
            </p>
          </div>
          
          <div className="mt-auto relative z-10">
            <button 
              onClick={() => setIsReviewModalOpen(true)}
              className="w-full border-2 border-slate-300 bg-white text-slate-700 rounded-xl py-3 px-6 text-[12px] font-bold uppercase tracking-widest hover:border-sky-300 hover:text-sky-700 hover:bg-sky-50 transition-all flex items-center justify-center gap-2"
            >
              <Network className="text-[18px]" />
              Connect Integration
            </button>
          </div>
        </article>

      </section>

      {/* Training & Knowledge Base Section */}
      <section className="mt-16">
        <header className="mb-8">
          <h2 className="text-2xl text-slate-900 font-black">Training &amp; Knowledge Base</h2>
          <p className="text-base text-slate-700 mt-2">Manage the context and data sources your agents use to formulate responses.</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Drag & Drop Zone */}
          <div className="lg:col-span-8">
            <div 
              onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
              className={`bg-white border-2 border-dashed rounded-[24px] p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center text-center transition-all duration-300 group cursor-pointer h-full min-h-[320px] ${
                isDragging ? 'border-sky-500 bg-sky-50/80 shadow-inner' : 'border-slate-300 hover:border-sky-500 hover:bg-sky-50/50'
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${isDragging ? 'bg-sky-100 text-sky-700 scale-110' : 'bg-slate-100 group-hover:bg-sky-100 group-hover:text-sky-700'}`}>
                <UploadCloud className={`text-[32px] transition-colors ${isDragging ? 'text-sky-700' : 'text-sky-600 group-hover:text-sky-700'}`} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Upload Knowledge Sources</h4>
              <p className="text-base text-slate-700 max-w-md mb-8">Drag and drop PDFs, DOCX, or text files here, or click to browse. Agents will instantly train on new documents.</p>
              <button className={`text-white rounded-xl py-3 px-8 text-[12px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md ${isDragging ? 'bg-sky-800 scale-105' : 'bg-sky-700 hover:bg-sky-800'}`}>
                Select Files
              </button>
            </div>
          </div>
          
          {/* Active Sources List */}
          <div className="lg:col-span-4">
            <div className="bg-white border-2 border-slate-200 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-4 sm:p-6 h-full flex flex-col">
              <h3 className="text-[12px] font-bold text-slate-600 uppercase tracking-widest mb-6">Active Sources</h3>
              
              <div className="flex flex-col gap-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                
                {/* Source Item 1 */}
                <div className="flex items-center justify-between p-4 rounded-xl border-2 border-slate-50 hover:border-slate-300 transition-colors group bg-slate-50/50">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
                      <FileText className="text-[20px]" />
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-bold text-slate-900 truncate">company-faqs.pdf</p>
                      <p className="text-xs text-slate-600">Synced 2h ago</p>
                    </div>
                  </div>
                  <button className="text-slate-600 hover:text-red-500 transition-colors p-2 opacity-0 group-hover:opacity-100 focus:opacity-100 rounded-full hover:bg-red-50">
                    <Trash2 className="text-[20px]" />
                  </button>
                </div>
                
                {/* Source Item 2 */}
                <div className="flex items-center justify-between p-4 rounded-xl border-2 border-slate-50 hover:border-slate-300 transition-colors group bg-slate-50/50">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                      <Code className="text-[20px]" />
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-bold text-slate-900 truncate">website-crawled-data.html</p>
                      <p className="text-xs text-slate-600">Synced 1d ago</p>
                    </div>
                  </div>
                  <button className="text-slate-600 hover:text-red-500 transition-colors p-2 opacity-0 group-hover:opacity-100 focus:opacity-100 rounded-full hover:bg-red-50">
                    <Trash2 className="text-[20px]" />
                  </button>
                </div>
                
                {/* Source Item 3 */}
                <div className="flex items-center justify-between p-4 rounded-xl border-2 border-slate-50 hover:border-slate-300 transition-colors group bg-slate-50/50">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0">
                      <File className="text-[20px]" />
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-bold text-slate-900 truncate">product_catalog_v2.csv</p>
                      <p className="text-xs text-slate-600">Synced 3d ago</p>
                    </div>
                  </div>
                  <button className="text-slate-600 hover:text-red-500 transition-colors p-2 opacity-0 group-hover:opacity-100 focus:opacity-100 rounded-full hover:bg-red-50">
                    <Trash2 className="text-[20px]" />
                  </button>
                </div>

              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-200 text-center">
                <button className="text-[10px] font-bold text-sky-500 hover:text-sky-700 uppercase tracking-wider flex items-center justify-center gap-1 w-full transition-colors">
                  <RefreshCw className="text-[16px]" />
                  Force Sync All
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Modals */}
      <VoiceAIConfigModal isOpen={isVoiceModalOpen} onClose={() => setIsVoiceModalOpen(false)} />
      <ReviewAIModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} />
    </>
  );
}
