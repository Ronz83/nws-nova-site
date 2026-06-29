import { useState, useEffect } from 'react';
import { Calendar, ChevronDown, Download, Users, UserPlus, ArrowUp, CalendarCheck, CreditCard, DollarSign, Bot, BrainCircuit, CheckCircle2, User, Sparkles, ArrowRight, PlusSquare, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function DashboardOverview() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<{ leads: number; appointments: number; revenue: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      if (!user?.clientId) {
        setMetrics({ leads: 0, appointments: 0, revenue: 0 });
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/ghl/metrics?locationId=${user.clientId}`);
        if (res.ok) {
          const data = await res.json();
          setMetrics({
            leads: data.leads || 0,
            appointments: data.appointments || 0,
            revenue: data.revenue || 0
          });
        } else {
          setMetrics({ leads: 0, appointments: 0, revenue: 0 });
        }
      } catch (e) {
        console.error("Failed to fetch metrics", e);
        setMetrics({ leads: 0, appointments: 0, revenue: 0 });
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
  }, [user?.clientId]);

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-8 mb-12">
        <div>
          <p className="text-[12px] font-bold text-sky-500 uppercase tracking-[0.18em] mb-2">Overview</p>
          <h1 className="text-4xl text-slate-900 font-black tracking-tight">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border-2 border-slate-300 rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer hover:border-sky-500 transition-colors">
            <Calendar className="text-sky-700 text-[18px]" />
            <span className="font-medium text-slate-900">Last 30 Days</span>
            <ChevronDown className="text-sky-700 text-[18px]" />
          </div>
          <button aria-label="Generate Report" className="bg-sky-700 hover:bg-sky-600 text-white rounded-lg p-2.5 transition-colors shadow-md">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bento Grid / KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        
        {/* KPI Card 1: Leads */}
        <div className="bg-white rounded-[24px] border-2 border-slate-200 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative overflow-hidden group hover:border-sky-200 hover:shadow-lg transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-5 text-sky-500 pointer-events-none">
            <Users className="text-[80px] -mr-4 -mt-4" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
              <UserPlus className="text-sky-700 w-5 h-5" />
            </div>
            <h3 className="font-medium text-slate-600">New Leads</h3>
          </div>
          <div className="flex items-baseline gap-2">
            {loading ? (
              <div className="h-10 w-24 bg-slate-200 animate-pulse rounded-md"></div>
            ) : (
              <span className="text-4xl font-black text-slate-900">{metrics?.leads.toLocaleString() || '0'}</span>
            )}
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm font-medium">
            <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUp className="text-[14px] mr-1" />
              12.5%
            </span>
            <span className="text-slate-700">vs last month</span>
          </div>
        </div>

        {/* KPI Card 2: Appointments */}
        <div className="bg-white rounded-[24px] border-2 border-slate-200 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative overflow-hidden group hover:border-sky-200 hover:shadow-lg transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-5 text-sky-500 pointer-events-none">
            <CalendarCheck className="text-[80px] -mr-4 -mt-4" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
              <Calendar className="text-sky-700 w-5 h-5" />
            </div>
            <h3 className="font-medium text-slate-600">Appointments</h3>
          </div>
          <div className="flex items-baseline gap-2">
            {loading ? (
              <div className="h-10 w-24 bg-slate-200 animate-pulse rounded-md"></div>
            ) : (
              <span className="text-4xl font-black text-slate-900">{metrics?.appointments.toLocaleString() || '0'}</span>
            )}
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm font-medium">
            <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUp className="text-[14px] mr-1" />
              8.2%
            </span>
            <span className="text-slate-700">vs last month</span>
          </div>
        </div>

        {/* KPI Card 3: Revenue */}
        <div className="bg-white rounded-[24px] border-2 border-slate-200 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative overflow-hidden group hover:border-sky-200 hover:shadow-lg transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-5 text-sky-500 pointer-events-none">
            <CreditCard className="text-[80px] -mr-4 -mt-4" />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
              <DollarSign className="text-sky-700 w-5 h-5" />
            </div>
            <h3 className="font-medium text-slate-600">Monthly Revenue</h3>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl text-slate-700 mb-1">$</span>
            {loading ? (
              <div className="h-10 w-32 bg-slate-200 animate-pulse rounded-md"></div>
            ) : (
              <span className="text-4xl font-black text-slate-900">{metrics?.revenue.toLocaleString() || '0'}</span>
            )}
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm font-medium">
            <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <ArrowUp className="text-[14px] mr-1" />
              24.1%
            </span>
            <span className="text-slate-700">vs last month</span>
          </div>
        </div>

        {/* KPI Card 4: AI Usage */}
        <div className="bg-white rounded-[24px] border-2 border-slate-200 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative overflow-hidden group hover:border-sky-200 hover:shadow-lg transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-5 text-sky-500 pointer-events-none">
            <Bot className="text-[80px] -mr-4 -mt-4" />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                <BrainCircuit className="text-sky-500 w-5 h-5" />
              </div>
              <h3 className="font-medium text-slate-600">AI Interactions</h3>
            </div>
            <span className="bg-amber-400 text-slate-900 text-[10px] px-2 py-1 rounded-full uppercase font-bold tracking-wider">High</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900">8,942</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="bg-sky-500 h-full rounded-full" style={{ width: "75%" }}></div>
          </div>
          <p className="mt-2 text-xs text-slate-700 text-right">75% of monthly limit</p>
        </div>

      </div>

      {/* Activity Section & Secondary Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity Column */}
        <div className="lg:col-span-2 bg-white rounded-[24px] border-2 border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex flex-col h-[500px]">
          <div className="p-8 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-2xl text-slate-900 font-bold">Recent Activity</h3>
            <button className="text-sky-500 hover:text-sky-600 font-bold text-[12px] uppercase tracking-widest transition-colors">View All</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            
            {/* Activity Item 1 */}
            <div className="flex gap-4">
              <div className="relative shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-white ring-1 ring-slate-200 z-10 relative">
                  <CheckCircle2 className="text-emerald-600 text-[20px]" />
                </div>
                <div className="absolute top-10 bottom-[-24px] left-1/2 w-px bg-slate-200 -translate-x-1/2 z-0"></div>
              </div>
              <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="font-medium text-slate-900">Payment Received</p>
                <p className="text-slate-700 mt-1">Invoice #INV-2023-089 paid by TechCorp Inc. via Stripe.</p>
                <span className="text-xs text-slate-600 mt-2 block">10 mins ago</span>
              </div>
            </div>

            {/* Activity Item 2 */}
            <div className="flex gap-4">
              <div className="relative shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white ring-1 ring-slate-200 z-10 relative">
                  <User className="text-sky-600 text-[20px]" />
                </div>
                <div className="absolute top-10 bottom-[-24px] left-1/2 w-px bg-slate-200 -translate-x-1/2 z-0"></div>
              </div>
              <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900">New Lead Assigned</p>
                  <span className="bg-sky-100 text-sky-700 text-xs px-2 py-0.5 rounded-full font-bold">CRM</span>
                </div>
                <p className="text-slate-700 mt-1">Sarah Jenkins was assigned 5 new inbound leads from the Fall Campaign.</p>
                <span className="text-xs text-slate-600 mt-2 block">1 hour ago</span>
              </div>
            </div>

            {/* Activity Item 3 */}
            <div className="flex gap-4">
              <div className="relative shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center border-2 border-white ring-1 ring-slate-200 z-10 relative">
                  <Bot className="text-purple-600 text-[20px]" />
                </div>
              </div>
              <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="font-medium text-slate-900">AI Voice Agent Triggered</p>
                <p className="text-slate-700 mt-1">NWS AI handled an after-hours booking request successfully.</p>
                <span className="text-xs text-slate-600 mt-2 block">3 hours ago</span>
              </div>
            </div>

          </div>
        </div>

        {/* Assistant / Action Column */}
        <div className="flex flex-col gap-8">
          
          {/* AI Assistant Teaser Card */}
          <div className="bg-slate-900 rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative overflow-hidden text-white flex-1 min-h-[234px] flex flex-col justify-center">
            {/* Decorative Background Element */}
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-sky-500 rounded-full blur-3xl opacity-30 mix-blend-screen pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="text-sky-300 text-[28px]" />
                <h3 className="text-2xl font-bold">NWS Insights</h3>
              </div>
              <p className="text-sky-100 mb-6">Your funnel conversion rate dropped by 2% today. Want me to analyze the drop-off points?</p>
              <button className="bg-sky-500 hover:bg-sky-400 text-white font-bold text-[12px] uppercase tracking-widest py-3 px-6 rounded-lg transition-colors w-fit flex items-center gap-2">
                Analyze Funnel
                <ArrowRight className="text-[16px]" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-[24px] border-2 border-slate-200 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex-1 min-h-[234px]">
            <h3 className="font-bold text-[12px] text-slate-700 uppercase tracking-widest mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-300 hover:bg-sky-50 hover:border-sky-500 transition-colors text-slate-900 group">
                <PlusSquare className="text-sky-700 group-hover:text-sky-500 transition-colors w-5 h-5" />
                <span className="text-sm font-medium">New Pipeline</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-300 hover:bg-sky-50 hover:border-sky-500 transition-colors text-slate-900 group">
                <Mail className="text-sky-700 group-hover:text-sky-500 transition-colors w-5 h-5" />
                <span className="text-sm font-medium">Campaign</span>
              </button>
            </div>
          </div>
          
        </div>

      </div>
    </>
  );
}
