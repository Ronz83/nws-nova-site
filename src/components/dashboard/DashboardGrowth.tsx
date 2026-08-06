import { useState, useEffect } from 'react';
import { 
  Megaphone, Calendar, BarChart2, TrendingUp,
  Play, Pause, Edit3, MoreHorizontal,
  MessageCircle, Camera, Briefcase, Mail, Smartphone,
  Star, Loader2, Sparkles, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeatures } from '../../contexts/FeatureContext';
import { useAuth } from '../../contexts/AuthContext';

type TabType = 'campaigns' | 'social' | 'analytics' | 'reputation';

export function DashboardGrowth() {
  const { flags } = useFeatures();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState<TabType>('campaigns');
  
  // Data states
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [campaignsLoading, setCampaignsLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);

  useEffect(() => {
    if (!flags.enable_growth || !user?.clientId) return;

    async function fetchCampaigns() {
      setCampaignsLoading(true);
      try {
        const res = await fetch(`/api/crm/campaigns?locationId=${user?.clientId}`);
        if (res.ok) {
          const data = await res.json();
          setCampaigns(data.campaigns || []);
        }
      } catch (e) {
        console.error("Failed to fetch campaigns", e);
      } finally {
        setCampaignsLoading(false);
      }
    }

    async function fetchSocialPosts() {
      setPostsLoading(true);
      try {
        const res = await fetch(`/api/crm/social-posts?locationId=${user?.clientId}`);
        if (res.ok) {
          const data = await res.json();
          // Map GHL posts format
          const mapped = (data.posts || data.data || []).map((p: any) => ({
            id: p.id || Math.random().toString(),
            content: p.summary || p.content || 'Social Post',
            platform: p.accountType || 'Social',
            status: p.status || 'scheduled',
            time: p.scheduleDate ? new Date(p.scheduleDate).toLocaleString() : 'Pending'
          }));
          setPosts(mapped);
        }
      } catch (e) {
        console.error("Failed to fetch posts", e);
      } finally {
        setPostsLoading(false);
      }
    }

    fetchCampaigns();
    fetchSocialPosts();
  }, [flags.enable_growth, user?.clientId]);

  if (!flags.enable_growth) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Feature Not Enabled</h2>
        <p className="text-slate-700">The Growth Hub is currently disabled for your account.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
    { id: 'social', label: 'Social Planner', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'reputation', label: 'Reputation', icon: Star }
  ] as const;

  const renderCampaigns = () => (
    <div className="bg-white/95 backdrop-blur-sm rounded-[24px] border-2 border-slate-100 shadow-sm overflow-hidden">
      <div className="p-4 md:p-6 border-b-2 border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-50/30">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Active Campaigns</h2>
        <button className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] hover:from-[#0c2a4a] hover:to-[#0369a1] text-white rounded-xl text-[12px] uppercase tracking-[0.18em] font-bold shadow-md flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:scale-[1.02]">
          Create Campaign
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="border-b-2 border-slate-200 text-xs uppercase tracking-widest text-slate-700 bg-white">
              <th className="p-4 md:p-6 font-bold whitespace-nowrap">Name</th>
              <th className="p-4 md:p-6 font-bold whitespace-nowrap">Type</th>
              <th className="p-4 md:p-6 font-bold whitespace-nowrap">Status</th>
              <th className="p-4 md:p-6 font-bold text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-slate-100">
            {campaignsLoading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  <div className="flex justify-center mb-2"><Loader2 className="w-6 h-6 animate-spin text-sky-500" /></div>
                  Loading campaigns...
                </td>
              </tr>
            ) : campaigns.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500 font-medium">
                  No active campaigns found.
                </td>
              </tr>
            ) : campaigns.map(camp => (
              <tr key={camp.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="p-4 md:p-6 whitespace-nowrap">
                  <div className="font-bold text-slate-900 group-hover:text-sky-700 transition-colors">{camp.name || 'Unnamed Campaign'}</div>
                </td>
                <td className="p-4 md:p-6 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium capitalize">
                    {camp.type === 'Email' ? <Mail className="w-4 h-4" /> : camp.type === 'SMS' ? <Smartphone className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                    {camp.type || 'marketing'}
                  </div>
                </td>
                <td className="p-4 md:p-6 whitespace-nowrap">
                  <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md border shadow-sm ${
                    camp.status === 'published' || camp.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}>
                    {camp.status || 'draft'}
                  </span>
                </td>
                <td className="p-4 md:p-6 text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2 text-slate-600">
                    <button className="p-2 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors">
                      {camp.status === 'active' || camp.status === 'published' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button className="p-2 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSocial = () => (
    <div className="bg-white/95 backdrop-blur-sm rounded-[24px] border-2 border-slate-100 shadow-sm overflow-hidden max-w-4xl mx-auto min-h-[600px]">
      <div className="p-4 md:p-6 border-b-2 border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-50/30">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Content Calendar</h2>
        <button className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] hover:from-[#0c2a4a] hover:to-[#0369a1] text-white rounded-xl text-[12px] uppercase tracking-[0.18em] font-bold shadow-md flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:scale-[1.02]">
          Schedule Post
        </button>
      </div>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {postsLoading ? (
           <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-sky-500" /></div>
        ) : posts.length === 0 ? (
           <div className="text-center text-slate-500 py-8">No scheduled posts found.</div>
        ) : posts.map(post => (
          <div key={post.id} className="border-2 border-slate-200 rounded-2xl p-4 md:p-5 hover:border-sky-300 transition-colors shadow-sm group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  post.platform?.toLowerCase().includes('linkedin') ? 'bg-[#0077b5]' : 
                  post.platform?.toLowerCase().includes('facebook') ? 'bg-[#1877f2]' : 
                  'bg-gradient-to-tr from-[#fd5949] to-[#d6249f]'
                }`}>
                  {post.platform?.toLowerCase().includes('linkedin') ? <Briefcase className="w-5 h-5" /> : 
                   post.platform?.toLowerCase().includes('facebook') ? <MessageCircle className="w-5 h-5" /> : 
                   <Camera className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-bold text-slate-900 capitalize">{post.platform}</div>
                  <div className="text-xs text-slate-500 font-medium">{post.time}</div>
                </div>
              </div>
              <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                post.status === 'scheduled' || post.status === 'published'
                  ? 'bg-sky-50 text-sky-700 border-sky-200' 
                  : 'bg-slate-100 text-slate-600 border-slate-300'
              }`}>
                {post.status}
              </span>
            </div>
            <p className="text-slate-700 font-medium mb-4">"{post.content}"</p>
            <div className="flex justify-between items-center border-t-2 border-slate-100 pt-4 mt-4">
              <div className="flex gap-4">
                <div className="text-sm">
                  <span className="font-bold text-slate-900">0</span> <span className="text-slate-500">Likes</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-slate-900">0</span> <span className="text-slate-500">Comments</span>
                </div>
              </div>
              <button className="text-slate-400 hover:text-slate-700 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="bg-white/95 backdrop-blur-sm rounded-[24px] border-2 border-slate-100 shadow-sm overflow-hidden max-w-4xl mx-auto flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
        <Sparkles className="w-8 h-8 text-blue-500" />
      </div>
      <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3">AI-Managed Analytics</h3>
      <p className="text-slate-600 max-w-lg mb-8 leading-relaxed">
        Your ad spend, reporting, and conversions are fully optimized and managed by your dedicated growth team in the backend. 
      </p>
      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
        <CheckCircle2 className="w-5 h-5" /> All Campaigns Healthy
      </div>
    </div>
  );

  const renderReputation = () => (
    <div className="bg-white/95 backdrop-blur-sm rounded-[24px] border-2 border-slate-100 shadow-sm overflow-hidden max-w-4xl mx-auto flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
      <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
        <Star className="w-8 h-8 text-amber-500" />
      </div>
      <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3">AI Reputation Manager</h3>
      <p className="text-slate-600 max-w-lg mb-8 leading-relaxed">
        Your Google and Facebook reviews are actively monitored and replied to by your custom AI Agent. 
        All review interactions can be viewed directly in your <strong>Unified Inbox</strong> on the Operations Hub.
      </p>
      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
        <CheckCircle2 className="w-5 h-5" /> Agent Active & Responding
      </div>
    </div>
  );

  return (
    <>
      <header className="mb-10 mt-8">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8">
          <div>
            <h1 className="text-4xl text-slate-900 font-black mb-4 tracking-tight">Growth Hub</h1>
            <p className="text-lg text-slate-700 max-w-2xl">Manage your marketing, social presence, and analytics.</p>
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
                  layoutId="activeGrowthTab"
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
            {activeTab === 'campaigns' && renderCampaigns()}
            {activeTab === 'social' && renderSocial()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'reputation' && renderReputation()}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
