import { PlayCircle, BookOpen, Target, CheckCircle2, Award, ArrowRight, Video } from 'lucide-react';

export function DashboardTraining() {
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
            <span className="font-bold text-slate-700 text-sm tracking-wide">Level 1: Novice</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        
        {/* Main Video / Featured Course */}
        <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-[24px] border-2 border-slate-100 p-8 shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center border border-sky-100">
                  <PlayCircle className="text-sky-600 w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Platform Masterclass</h3>
              </div>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">0% Completed</span>
            </div>

            <div className="flex-1 bg-slate-900 rounded-[16px] relative overflow-hidden flex items-center justify-center min-h-[300px] mb-6 shadow-inner group/video cursor-pointer">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover/video:opacity-50 transition-opacity"></div>
              <div className="absolute inset-0 bg-slate-900/40"></div>
              <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover/video:scale-110 transition-transform">
                <PlayCircle className="text-white w-8 h-8" />
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div>
                <p className="font-bold text-slate-900">Module 1: Welcome to the Business OS</p>
                <p className="text-sm text-slate-500 mt-1">Learn how to navigate the dashboard and manage your AI agents.</p>
              </div>
              <button className="bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] text-white px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-widest shadow-md hover:shadow-lg transition-all hover:scale-[1.02]">
                Start Course
              </button>
            </div>
          </div>
        </div>

        {/* Progress & Checklist */}
        <div className="bg-white/95 backdrop-blur-sm rounded-[24px] border-2 border-slate-100 p-8 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <Target className="text-sky-600 w-6 h-6" />
            <h3 className="text-xl font-bold text-slate-900">Onboarding</h3>
          </div>

          <div className="space-y-6 flex-1">
            <div className="flex gap-4 items-start">
              <CheckCircle2 className="text-slate-300 w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-700">Connect CRM</p>
                <p className="text-xs text-slate-500 mt-1">Authorize GoHighLevel to sync your leads and pipelines.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <CheckCircle2 className="text-emerald-500 w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Configure Voice Agent</p>
                <p className="text-xs text-slate-500 mt-1">Select voice parameters and business hours.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <CheckCircle2 className="text-slate-300 w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-700">Set Up SIP Trunk</p>
                <p className="text-xs text-slate-500 mt-1">Route your PBX traffic to your AI agents.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <CheckCircle2 className="text-slate-300 w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-700">Complete Test Call</p>
                <p className="text-xs text-slate-500 mt-1">Run a live test call to verify latency and tool mapping.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Progress</span>
              <span className="text-xs font-bold text-sky-600">25%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-sky-500 h-full rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Library */}
      <h3 className="text-xl font-bold text-slate-900 mb-6">Resource Library</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-[20px] border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="text-blue-600 w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-900 mb-2">Prompt Engineering Guide</h4>
          <p className="text-sm text-slate-500 mb-4">Learn how to instruct your AI agents for better call outcomes.</p>
          <span className="text-blue-600 text-sm font-bold flex items-center gap-1">Read Guide <ArrowRight className="w-4 h-4" /></span>
        </div>

        <div className="bg-white rounded-[20px] border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Video className="text-purple-600 w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-900 mb-2">Advanced Automations</h4>
          <p className="text-sm text-slate-500 mb-4">A deep dive into complex CRM webhook mapping.</p>
          <span className="text-purple-600 text-sm font-bold flex items-center gap-1">Watch Video <ArrowRight className="w-4 h-4" /></span>
        </div>

        <div className="bg-white rounded-[20px] border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Target className="text-amber-600 w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-900 mb-2">Best Practices</h4>
          <p className="text-sm text-slate-500 mb-4">The ultimate checklist before taking your AI agents live.</p>
          <span className="text-amber-600 text-sm font-bold flex items-center gap-1">View Checklist <ArrowRight className="w-4 h-4" /></span>
        </div>

      </div>
    </>
  );
}
