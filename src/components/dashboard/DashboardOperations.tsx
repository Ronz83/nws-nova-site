import { useEffect, useState } from 'react';
import { 
  SlidersHorizontal, RefreshCw, Loader2, 
  Inbox, Kanban, Users, Calendar as CalendarIcon,
  Search, Filter, Plus, MoreHorizontal, Zap, Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeatures } from '../../contexts/FeatureContext';

interface Conversation {
  id: string;
  name: string;
  preview: string;
  time: string;
  type: string;
  unread: boolean;
  isVoice?: boolean;
}

const MOCK_PIPELINE_STAGES = [
  { id: 'new', name: 'New Lead' },
  { id: 'qualified', name: 'Qualified' },
  { id: 'proposal', name: 'Proposal Sent' },
  { id: 'won', name: 'Closed Won' }
];

const MOCK_PIPELINE_DEALS = [
  { id: '1', title: 'Website Redesign', contact: 'Alice Smith', value: 4500, stage: 'new' },
  { id: '2', title: 'SEO Campaign', contact: 'Bob Johnson', value: 2400, stage: 'new' },
  { id: '3', title: 'Custom App', contact: 'Charlie Davis', value: 15000, stage: 'qualified' },
  { id: '4', title: 'Consulting', contact: 'Diana Prince', value: 8000, stage: 'proposal' },
  { id: '5', title: 'CRM Setup', contact: 'Evan Wright', value: 3200, stage: 'won' },
];

const MOCK_CONTACTS = [
  { id: '1', name: 'Alice Smith', email: 'alice@example.com', phone: '(555) 012-3456', tags: ['VIP', 'Hot Lead'], lastActive: '2h ago' },
  { id: '2', name: 'Bob Johnson', email: 'bob@example.com', phone: '(555) 098-7654', tags: ['Follow Up'], lastActive: '1d ago' },
  { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', phone: '(555) 111-2222', tags: ['Customer', 'Automotive'], lastActive: '3d ago' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', phone: '(555) 333-4444', tags: ['VIP'], lastActive: '1w ago' },
];

const MOCK_EVENTS = [
  { id: '1', title: 'Strategy Call with Alice', time: '10:00 AM - 10:45 AM', type: 'call' },
  { id: '2', title: 'Demo: Custom App', time: '1:00 PM - 2:00 PM', type: 'meeting' },
  { id: '3', title: 'Follow-up Bob', time: '3:30 PM - 3:45 PM', type: 'task' },
];

type TabType = 'inbox' | 'pipeline' | 'contacts' | 'calendar';

export function DashboardOperations() {
  const { flags } = useFeatures();
  const [activeTab, setActiveTab] = useState<TabType>('inbox');

  const [convsLoading, setConvsLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [convsError, setConvsError] = useState('');

  const fetchConversations = async () => {
    setConvsLoading(true);
    setConvsError('');
    try {
      // Simulate network request for mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      setConversations([
        { id: '1', name: 'Alice Smith', preview: 'Is my car ready for pickup?', time: '10:05 AM', type: 'SMS', unread: true },
        { id: '2', name: 'Bob Johnson', preview: 'Can I schedule an appointment for next week?', time: 'Yesterday', type: 'GMB', unread: false },
        { id: '3', name: 'Charlie Davis', preview: 'Thanks for the quick turnaround.', time: 'Monday', type: 'Email', unread: false },
        { id: '4', name: 'David Lee (AI)', preview: 'Voice Transcript', time: 'Tuesday', type: 'Call', unread: true, isVoice: true }
      ]);
    } catch (e: any) {
      setConvsError(e.message);
    } finally {
      setConvsLoading(false);
    }
  };

  useEffect(() => {
    if (flags.enable_operations) {
      fetchConversations();
    }
  }, [flags.enable_operations]);

  if (!flags.enable_operations) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Feature Not Enabled</h2>
        <p className="text-slate-700">The Operations Hub is currently disabled for your account.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'inbox', label: 'Inbox', icon: Inbox },
    { id: 'pipeline', label: 'Pipeline', icon: Kanban },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon }
  ] as const;

  const renderInbox = () => (
    <div className="max-w-4xl mx-auto flex flex-col h-[600px] bg-white/95 backdrop-blur-md rounded-[24px] border-2 border-slate-100 shadow-sm relative overflow-hidden transition-all hover:shadow-lg">
      <div className="p-4 md:p-6 border-b-2 border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
          Unified Inbox
          {(convsLoading) && <Loader2 className="w-5 h-5 text-sky-500 animate-spin" />}
        </h2>
        <SlidersHorizontal className="text-sky-600 w-5 h-5" />
      </div>
      
      <div className="flex-1 overflow-y-auto divide-y-2 divide-slate-100 custom-scrollbar relative">
        {convsLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
            <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
          </div>
        ) : convsError ? (
          <div className="p-8 text-center text-red-500 font-medium">
            {convsError}
          </div>
        ) : conversations.length === 0 ? (
          <div className="p-8 text-center text-slate-700 font-medium flex flex-col items-center justify-center h-full">
            <p>No recent conversations.</p>
          </div>
        ) : (
          conversations.map(c => (
            <div key={c.id} className={`p-4 md:p-6 border-l-4 ${c.unread ? 'bg-sky-50 border-sky-500 hover:bg-sky-100/50' : 'border-transparent hover:bg-slate-50'} flex gap-3 md:gap-4 cursor-pointer transition-colors`}>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-base md:text-lg">
                {c.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`font-bold truncate ${c.unread ? 'text-slate-900' : 'text-slate-700'}`}>{c.name}</h3>
                  <span className="text-xs text-slate-600 font-medium shrink-0">{c.time}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.1em]">{c.type}</span>
                </div>
                {c.isVoice ? (
                  <div className="mt-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                       <button className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center hover:bg-sky-200 transition-colors">
                         <Play className="w-4 h-4 ml-0.5 fill-sky-600" />
                       </button>
                       <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                         <div className="h-full bg-sky-500 w-1/3"></div>
                       </div>
                       <span className="text-xs font-bold text-slate-500">0:42</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><strong className="text-sky-700">AI:</strong> "Hello, thanks for calling. How can I help you today?"</p>
                      <p><strong className="text-slate-700">Caller:</strong> "Hi, do you guys do oil changes for a 2019 Camry?"</p>
                      <p><strong className="text-sky-700">AI:</strong> "Yes, we certainly do! We can get you in as early as tomorrow at 9 AM. Would you like me to book that?"</p>
                    </div>
                  </div>
                ) : (
                  <p className={`truncate ${c.unread ? 'text-slate-600 font-medium' : 'text-slate-700'}`}>"{c.preview}"</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-4 md:p-6 bg-slate-50/30 border-t-2 border-slate-100 shrink-0">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 sm:gap-4 relative">
          <div className="flex-1">
            <textarea 
              className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/20 transition-all resize-none overflow-hidden h-[52px]" 
              placeholder="Type a message..." 
              rows={1}
            ></textarea>
          </div>
          <button className="bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] hover:from-[#0c2a4a] hover:to-[#0369a1] text-white font-bold text-[12px] uppercase tracking-[0.18em] px-8 h-[52px] rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] flex items-center justify-center shrink-0">
            SEND
          </button>
        </div>
      </div>
    </div>
  );

  const renderPipeline = () => (
    <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 custom-scrollbar min-h-[600px] -mx-4 px-4 md:mx-0 md:px-0">
      {MOCK_PIPELINE_STAGES.map(stage => (
        <div key={stage.id} className="min-w-[280px] md:min-w-[320px] w-[280px] md:w-[320px] bg-gradient-to-b from-sky-50/50 to-transparent rounded-[24px] p-4 md:p-5 border-2 border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-4 md:mb-5 shrink-0">
            <h3 className="font-black text-slate-900 tracking-tight">{stage.name}</h3>
            <span className="bg-white text-sky-700 text-xs font-bold px-2.5 py-1 rounded-full border border-sky-200 shadow-sm">
              {MOCK_PIPELINE_DEALS.filter(d => d.stage === stage.id).length}
            </span>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-1">
            {MOCK_PIPELINE_DEALS.filter(d => d.stage === stage.id).map(deal => (
              <div key={deal.id} className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border-2 border-slate-100 hover:border-sky-300 transition-all duration-300 cursor-grab group hover:-translate-y-1 hover:shadow-md">
                <h4 className="font-bold text-slate-900 mb-1 group-hover:text-sky-700 transition-colors">{deal.title}</h4>
                <p className="text-sm text-slate-600 mb-4 font-medium">{deal.contact}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="font-black text-sky-700 text-lg">${deal.value.toLocaleString()}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-700 border border-slate-300">
                    {deal.contact.charAt(0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderContacts = () => (
    <div className="bg-white/95 backdrop-blur-sm rounded-[24px] border-2 border-slate-100 shadow-sm overflow-hidden">
      <div className="p-4 md:p-6 border-b-2 border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-50/30">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button className="px-4 py-2.5 bg-white border-2 border-slate-200 hover:border-sky-300 rounded-xl text-sm font-bold text-slate-700 shadow-sm flex items-center justify-center gap-2 transition-colors w-full sm:w-auto">
            <Filter className="w-4 h-4 text-sky-600" /> Filter
          </button>
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-600" />
            <input type="text" placeholder="Search contacts..." className="pl-10 pr-4 py-2.5 border-2 border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/20 w-full sm:w-72 transition-all" />
          </div>
        </div>
        <button className="px-6 py-2.5 bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] hover:from-[#0c2a4a] hover:to-[#0369a1] text-white rounded-xl text-[12px] uppercase tracking-[0.18em] font-bold shadow-md flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:scale-[1.02] w-full sm:w-auto">
          <Plus className="w-4 h-4" /> New Contact
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="border-b-2 border-slate-200 text-xs uppercase tracking-widest text-slate-700 bg-white">
              <th className="p-4 md:p-6 font-bold">Name</th>
              <th className="p-4 md:p-6 font-bold">Contact Info</th>
              <th className="p-4 md:p-6 font-bold">Tags</th>
              <th className="p-4 md:p-6 font-bold">Last Active</th>
              <th className="p-4 md:p-6 font-bold"></th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-slate-100">
            {MOCK_CONTACTS.map(contact => (
              <tr key={contact.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="p-4 md:p-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-slate-300 shrink-0">
                      {contact.name.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-900 group-hover:text-sky-700 transition-colors whitespace-nowrap">{contact.name}</span>
                  </div>
                </td>
                <td className="p-4 md:p-6">
                  <div className="text-sm space-y-1 whitespace-nowrap">
                    <div className="text-slate-900 font-medium">{contact.email}</div>
                    <div className="text-slate-700">{contact.phone}</div>
                  </div>
                </td>
                <td className="p-4 md:p-6">
                  <div className="flex gap-2 flex-wrap min-w-[120px]">
                    {contact.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-white text-slate-600 text-[11px] font-bold uppercase tracking-wider rounded-md border border-slate-300 shadow-md whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 md:p-6 text-sm text-slate-700 font-medium whitespace-nowrap">{contact.lastActive}</td>
                <td className="p-4 md:p-6 text-right">
                  <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="bg-white rounded-[24px] border-2 border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row max-w-5xl mx-auto min-h-[600px]">
      <div className="w-full md:w-72 border-b-2 md:border-b-0 md:border-r-2 border-slate-100 p-6 md:p-8 bg-slate-50/50 flex flex-row md:flex-col gap-4 overflow-x-auto">
        <div className="text-xl md:text-2xl font-black text-slate-900 md:mb-8 shrink-0 flex items-center md:items-start tracking-tight">June 2026</div>
        <div className="flex flex-row md:flex-col gap-2 shrink-0">
          <div className="font-bold text-sky-700 bg-sky-50 border border-sky-200 px-4 py-2 md:py-3 rounded-xl cursor-pointer text-sm md:text-base whitespace-nowrap shadow-sm">Today</div>
          <div className="font-bold text-slate-600 hover:bg-white hover:shadow-sm hover:border hover:border-slate-200 px-4 py-2 md:py-3 rounded-xl cursor-pointer transition-all border border-transparent text-sm md:text-base whitespace-nowrap">Tomorrow</div>
          <div className="font-bold text-slate-600 hover:bg-white hover:shadow-sm hover:border hover:border-slate-200 px-4 py-2 md:py-3 rounded-xl cursor-pointer transition-all border border-transparent text-sm md:text-base whitespace-nowrap">Next Week</div>
        </div>
      </div>
      <div className="flex-1 p-6 md:p-8 lg:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.03]" style={{ background: "radial-gradient(circle, rgba(14,165,233,1) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="relative z-10 flex justify-between items-center mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Today's Agenda</h3>
          <button className="px-5 py-2.5 bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] hover:from-[#0c2a4a] hover:to-[#0369a1] text-white rounded-xl text-[12px] uppercase tracking-[0.18em] font-bold shadow-md flex items-center gap-2 hover:scale-[1.02] hover:shadow-lg transition-all">
            <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Event</span>
          </button>
        </div>
        <div className="space-y-4 md:space-y-6">
          {MOCK_EVENTS.map(ev => (
            <div key={ev.id} className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start group">
              <div className="w-full sm:w-32 sm:text-right pt-2 shrink-0 flex sm:block items-center gap-2">
                <div className="text-sm font-bold text-slate-900">{ev.time.split(' - ')[0]}</div>
                <div className="text-xs text-slate-700 font-medium sm:mt-1">- {ev.time.split(' - ')[1]}</div>
              </div>
              <div className="w-full flex-1 bg-white border-2 border-slate-200 shadow-md rounded-2xl p-4 md:p-5 flex gap-5 group-hover:border-sky-300 group-hover:shadow transition-all cursor-pointer relative overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${ev.type === 'call' ? 'bg-sky-500' : ev.type === 'meeting' ? 'bg-purple-500' : 'bg-emerald-500'}`}></div>
                <div className="pl-2">
                  <h4 className="font-bold text-slate-900 mb-1 text-base md:text-lg group-hover:text-sky-700 transition-colors">{ev.title}</h4>
                  <p className="text-[10px] md:text-[11px] text-slate-700 font-bold uppercase tracking-widest">{ev.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header className="mb-10 mt-8">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8">
          <div>
            <h1 className="text-4xl text-slate-900 font-black mb-4 tracking-tight">Operations Hub</h1>
            <p className="text-lg text-slate-700 max-w-2xl">Manage your inbox, pipeline, and schedule.</p>
          </div>
          {activeTab === 'inbox' && (
            <button 
              onClick={fetchConversations}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-300 rounded-xl font-bold text-slate-600 hover:text-sky-600 hover:border-sky-200 transition-colors shadow-md w-fit"
            >
              <RefreshCw className={`w-4 h-4 ${convsLoading ? 'animate-spin' : ''}`} />
              Sync Inbox
            </button>
          )}
        </div>

        {/* Industry-Specific SLAs & Metrics Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-white to-sky-50 border border-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden flex flex-col justify-between group hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <Zap className="w-24 h-24 text-sky-600" />
            </div>
            <div className="relative z-10">
              <p className="text-sky-600 text-xs font-bold uppercase tracking-widest mb-2">Automotive SLA</p>
              <p className="text-4xl font-black text-slate-900 mb-1">15 min</p>
              <p className="text-sm text-emerald-500 font-bold">Avg Lead Response Time</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-white to-slate-50 border border-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col justify-between group hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 transform hover:-translate-y-1">
            <div>
              <p className="text-slate-700 text-xs font-bold uppercase tracking-widest mb-2">Pipeline Health</p>
              <p className="text-4xl font-black text-slate-900 mb-1">92%</p>
              <p className="text-sm text-slate-700 font-medium">Deals progressing on track</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-white to-slate-50 border border-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col justify-between group hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 transform hover:-translate-y-1">
            <div>
              <p className="text-slate-700 text-xs font-bold uppercase tracking-widest mb-2">Active Smart Lists</p>
              <p className="text-4xl font-black text-slate-900 mb-1">4</p>
              <p className="text-sm text-slate-700 font-medium">Niche automotive segments</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl w-full md:w-fit overflow-x-auto border border-slate-200 shadow-sm custom-scrollbar relative z-10">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`relative flex items-center gap-2.5 px-5 py-2.5 md:px-7 md:py-3 rounded-xl text-sm font-bold transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'text-sky-700' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/80'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-sky-50 rounded-xl shadow-[0_2px_10px_rgba(14,165,233,0.1)] border border-sky-100"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </header>

      <div className="mb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === 'inbox' && renderInbox()}
            {activeTab === 'pipeline' && renderPipeline()}
            {activeTab === 'contacts' && renderContacts()}
            {activeTab === 'calendar' && renderCalendar()}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
