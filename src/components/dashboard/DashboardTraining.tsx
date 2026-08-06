import { useState, useEffect } from 'react';
import { PlayCircle, BookOpen, Target, CheckCircle2, Award, Video, CheckCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const TRAINING_VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Placeholder, replace with actual Launchpad Video URL

interface ChecklistState {
  connectCRM: boolean;
  voiceAgent: boolean;
  sipTrunk: boolean;
  testCall: boolean;
}

const DEFAULT_CHECKLIST: ChecklistState = {
  connectCRM: true, // They are already in GHL, so CRM is connected!
  voiceAgent: false,
  sipTrunk: false,
  testCall: false,
};

export function DashboardTraining() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Load state from local storage based on client ID
  const storageKey = `nws_onboarding_${user?.clientId || 'default'}`;
  
  const [checklist, setChecklist] = useState<ChecklistState>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : DEFAULT_CHECKLIST;
  });

  // Save to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checklist));
  }, [checklist, storageKey]);

  const toggleCheck = (key: keyof ChecklistState, e: React.MouseEvent) => {
    e.stopPropagation();
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateProgress = () => {
    const values = Object.values(checklist);
    const completed = values.filter(Boolean).length;
    return Math.round((completed / values.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-8 mb-12">
        <div>
          <p className="text-[12px] font-bold text-sky-500 uppercase tracking-[0.18em] mb-2">Training & Resources</p>
          <h1 className="text-4xl text-slate-900 font-black tracking-tight">Launchpad</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
            <Award className="text-amber-500 w-5 h-5" />
            <span className="font-bold text-slate-700 text-sm tracking-wide">
              {progress === 100 ? 'Level 2: Certified' : 'Level 1: Novice'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        
        {/* Main Video / Featured Course */}
        <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-[24px] border-2 border-slate-100 p-8 shadow-sm relative overflow-hidden group flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col h-full flex-grow">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center border border-sky-100">
                  <PlayCircle className="text-sky-600 w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Platform Masterclass</h3>
              </div>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {isPlaying ? 'Watching' : '0% Completed'}
              </span>
            </div>

            {isPlaying ? (
              <div className="flex-1 bg-slate-900 rounded-[16px] relative overflow-hidden flex items-center justify-center min-h-[350px] mb-6 shadow-inner w-full">
                <iframe 
                  src={`${TRAINING_VIDEO_URL}?autoplay=1`}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div 
                className="flex-1 bg-slate-900 rounded-[16px] relative overflow-hidden flex items-center justify-center min-h-[350px] mb-6 shadow-inner group/video cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover/video:opacity-50 transition-opacity"></div>
                <div className="absolute inset-0 bg-slate-900/40"></div>
                <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover/video:scale-110 transition-transform">
                  <PlayCircle className="text-white w-8 h-8" />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-auto">
              <div>
                <p className="font-bold text-slate-900">Module 1: Welcome to the Business OS</p>
                <p className="text-sm text-slate-500 mt-1">Learn how to navigate the dashboard and manage your AI agents.</p>
              </div>
              {!isPlaying && (
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] text-white px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-widest shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  Start Course
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Progress & Checklist */}
        <div className="bg-white/95 backdrop-blur-sm rounded-[24px] border-2 border-slate-100 p-8 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <Target className="text-sky-600 w-6 h-6" />
            <h3 className="text-xl font-bold text-slate-900">Onboarding</h3>
          </div>

          <div className="space-y-4 flex-1">
            {/* Checklist Item 1 */}
            <div 
              className="flex gap-4 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-200"
              onClick={() => navigate('/dashboard/settings')}
            >
              <button onClick={(e) => toggleCheck('connectCRM', e)} className="shrink-0 mt-0.5 outline-none">
                {checklist.connectCRM ? <CheckCircle className="text-emerald-500 w-6 h-6" /> : <CheckCircle2 className="text-slate-300 w-6 h-6 hover:text-sky-400" />}
              </button>
              <div className="flex-1">
                <p className={`font-bold ${checklist.connectCRM ? 'text-slate-900 line-through opacity-70' : 'text-slate-700'}`}>Connect CRM</p>
                <p className="text-xs text-slate-500 mt-1">Authorize GoHighLevel to sync your leads and pipelines.</p>
              </div>
            </div>

            {/* Checklist Item 2 */}
            <div 
              className="flex gap-4 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-200"
              onClick={() => navigate('/dashboard/ai-studio')}
            >
              <button onClick={(e) => toggleCheck('voiceAgent', e)} className="shrink-0 mt-0.5 outline-none">
                {checklist.voiceAgent ? <CheckCircle className="text-emerald-500 w-6 h-6" /> : <CheckCircle2 className="text-slate-300 w-6 h-6 hover:text-sky-400" />}
              </button>
              <div className="flex-1">
                <p className={`font-bold ${checklist.voiceAgent ? 'text-slate-900 line-through opacity-70' : 'text-slate-900'}`}>Configure Voice Agent</p>
                <p className="text-xs text-slate-500 mt-1">Select voice parameters and business hours.</p>
              </div>
            </div>

            {/* Checklist Item 3 */}
            <div 
              className="flex gap-4 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-200"
              onClick={() => navigate('/dashboard/operations')}
            >
              <button onClick={(e) => toggleCheck('sipTrunk', e)} className="shrink-0 mt-0.5 outline-none">
                {checklist.sipTrunk ? <CheckCircle className="text-emerald-500 w-6 h-6" /> : <CheckCircle2 className="text-slate-300 w-6 h-6 hover:text-sky-400" />}
              </button>
              <div className="flex-1">
                <p className={`font-bold ${checklist.sipTrunk ? 'text-slate-900 line-through opacity-70' : 'text-slate-700'}`}>Set Up SIP Trunk</p>
                <p className="text-xs text-slate-500 mt-1">Route your PBX traffic to your AI agents.</p>
              </div>
            </div>

            {/* Checklist Item 4 */}
            <div 
              className="flex gap-4 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-200"
              onClick={() => navigate('/dashboard/ai-studio')}
            >
              <button onClick={(e) => toggleCheck('testCall', e)} className="shrink-0 mt-0.5 outline-none">
                {checklist.testCall ? <CheckCircle className="text-emerald-500 w-6 h-6" /> : <CheckCircle2 className="text-slate-300 w-6 h-6 hover:text-sky-400" />}
              </button>
              <div className="flex-1">
                <p className={`font-bold ${checklist.testCall ? 'text-slate-900 line-through opacity-70' : 'text-slate-700'}`}>Complete Test Call</p>
                <p className="text-xs text-slate-500 mt-1">Run a live test call to verify latency and tool mapping.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Progress</span>
              <span className="text-xs font-bold text-sky-600">{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-sky-500 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Library */}
      <h3 className="text-xl font-bold text-slate-900 mb-6">Resource Library</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white rounded-[20px] border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow group block">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="text-blue-600 w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-900 mb-2">Prompt Engineering Guide</h4>
          <p className="text-sm text-slate-500 mb-4">Learn how to instruct your AI agents for better call outcomes.</p>
          <span className="text-blue-600 text-sm font-bold flex items-center gap-1">Read Guide <ExternalLink className="w-4 h-4 ml-1" /></span>
        </a>

        <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white rounded-[20px] border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow group block">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Video className="text-purple-600 w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-900 mb-2">Advanced Automations</h4>
          <p className="text-sm text-slate-500 mb-4">A deep dive into complex CRM webhook mapping.</p>
          <span className="text-purple-600 text-sm font-bold flex items-center gap-1">Watch Video <ExternalLink className="w-4 h-4 ml-1" /></span>
        </a>

        <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white rounded-[20px] border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow group block">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Target className="text-amber-600 w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-900 mb-2">Best Practices</h4>
          <p className="text-sm text-slate-500 mb-4">The ultimate checklist before taking your AI agents live.</p>
          <span className="text-amber-600 text-sm font-bold flex items-center gap-1">View Checklist <ExternalLink className="w-4 h-4 ml-1" /></span>
        </a>

      </div>
    </>
  );
}
