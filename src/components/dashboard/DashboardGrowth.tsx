import { useState } from 'react';
import { 
  Megaphone, Calendar, BarChart2, TrendingUp,
  Play, Pause, Edit3, MoreHorizontal,
  MessageCircle, Camera, Briefcase, Mail, Smartphone,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeatures } from '../../contexts/FeatureContext';

type TabType = 'campaigns' | 'social' | 'analytics' | 'reputation';

const MOCK_CAMPAIGNS = [
  { id: '1', name: 'Summer Special Offer', type: 'Email', status: 'active', sent: 1250, opened: '45%', clicked: '12%' },
  { id: '2', name: 'VIP Reactivation', type: 'SMS', status: 'active', sent: 450, opened: '98%', clicked: '34%' },
  { id: '3', name: 'Monthly Newsletter', type: 'Email', status: 'draft', sent: 0, opened: '-', clicked: '-' },
  { id: '4', name: 'Abandoned Cart Series', type: 'Automated', status: 'active', sent: 124, opened: '62%', clicked: '28%' }
];

const MOCK_POSTS = [
  { id: '1', content: 'Check out our latest case study on doubling conversion rates!', platform: 'LinkedIn', status: 'scheduled', time: 'Tomorrow, 10:00 AM' },
  { id: '2', content: 'Happy Friday! Here is a quick tip for your business operations.', platform: 'Instagram', status: 'scheduled', time: 'Friday, 3:00 PM' },
  { id: '3', content: 'We are hiring! Join our growing team.', platform: 'Facebook', status: 'draft', time: '-' },
];

export function DashboardGrowth() {
  const { flags } = useFeatures();
  const [activeTab, setActiveTab] = useState<TabType>('campaigns');

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

  const MOCK_REVIEWS = [
    { id: '1', author: 'John Doe', rating: 5, platform: 'Google', time: '2 hours ago', content: 'Fantastic service! They really helped me out when my car broke down.', status: 'unreplied' },
    { id: '2', author: 'Sarah Smith', rating: 4, platform: 'Facebook', time: '1 day ago', content: 'Good experience overall. Would recommend.', status: 'replied' },
  ];

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
              <th className="p-4 md:p-6 font-bold whitespace-nowrap">Performance</th>
              <th className="p-4 md:p-6 font-bold text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-slate-100">
            {MOCK_CAMPAIGNS.map(camp => (
              <tr key={camp.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="p-4 md:p-6 whitespace-nowrap">
                  <div className="font-bold text-slate-900 group-hover:text-sky-700 transition-colors">{camp.name}</div>
                </td>
                <td className="p-4 md:p-6 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    {camp.type === 'Email' ? <Mail className="w-4 h-4" /> : camp.type === 'SMS' ? <Smartphone className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                    {camp.type}
                  </div>
                </td>
                <td className="p-4 md:p-6 whitespace-nowrap">
                  <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md border shadow-sm ${
                    camp.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}>
                    {camp.status}
                  </span>
                </td>
                <td className="p-4 md:p-6 whitespace-nowrap">
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <div className="text-slate-500 text-xs">Sent</div>
                      <div className="font-bold text-slate-900">{camp.sent}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">Open</div>
                      <div className="font-bold text-slate-900">{camp.opened}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">Click</div>
                      <div className="font-bold text-slate-900">{camp.clicked}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 md:p-6 text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2 text-slate-600">
                    <button className="p-2 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors">
                      {camp.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
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
        {MOCK_POSTS.map(post => (
          <div key={post.id} className="border-2 border-slate-200 rounded-2xl p-4 md:p-5 hover:border-sky-300 transition-colors shadow-sm group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  post.platform === 'LinkedIn' ? 'bg-[#0077b5]' : 
                  post.platform === 'Facebook' ? 'bg-[#1877f2]' : 
                  'bg-gradient-to-tr from-[#fd5949] to-[#d6249f]'
                }`}>
                  {post.platform === 'LinkedIn' ? <Briefcase className="w-5 h-5" /> : 
                   post.platform === 'Facebook' ? <MessageCircle className="w-5 h-5" /> : 
                   <Camera className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{post.platform}</div>
                  <div className="text-xs text-slate-500 font-medium">{post.time}</div>
                </div>
              </div>
              <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                post.status === 'scheduled' 
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
    <div className="space-y-4 md:space-y-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Total Spend', value: '$1,245', trend: '+12%', positive: false },
          { label: 'Impressions', value: '45.2K', trend: '+24%', positive: true },
          { label: 'Clicks', value: '1,842', trend: '+8%', positive: true },
          { label: 'Conversions', value: '42', trend: '+15%', positive: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white/95 backdrop-blur-sm rounded-[24px] border-2 border-slate-100 p-5 md:p-6 shadow-sm group hover:border-sky-200 transition-all hover:-translate-y-1 transform duration-300 hover:shadow-lg">
            <div className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">{stat.label}</div>
            <div className="text-3xl font-black text-slate-900 mb-2">{stat.value}</div>
            <div className={`text-sm font-bold flex items-center gap-1 ${stat.positive ? 'text-emerald-500' : 'text-rose-500'}`}>
              <TrendingUp className="w-4 h-4" /> {stat.trend} from last month
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-[24px] border-2 border-slate-100 p-6 md:p-8 shadow-sm min-h-[400px] flex flex-col hover:shadow-md transition-all">
          <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Audience Growth</h3>
          <div className="flex-1 flex items-end gap-2 md:gap-4 mt-auto">
            {[40, 55, 45, 70, 65, 85, 95].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 md:gap-2 group">
                <div className="w-full bg-slate-100 rounded-t-xl relative h-[250px] overflow-hidden flex items-end">
                  <div 
                    className="w-full bg-sky-500 rounded-t-xl group-hover:bg-sky-600 transition-colors relative"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-sky-700/20 to-transparent"></div>
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-500">M{i+1}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-[24px] border-2 border-slate-100 p-6 md:p-8 shadow-sm min-h-[400px] hover:shadow-md transition-all">
          <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Channel Performance</h3>
          <div className="space-y-6">
            {[
              { channel: 'Facebook Ads', value: 45, color: 'bg-[#1877f2]' },
              { channel: 'Google Search', value: 30, color: 'bg-emerald-500' },
              { channel: 'Email Marketing', value: 15, color: 'bg-amber-500' },
              { channel: 'Organic Social', value: 10, color: 'bg-purple-500' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                  <span>{item.channel}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderReputation = () => (
    <div className="bg-white/95 backdrop-blur-sm rounded-[24px] border-2 border-slate-100 shadow-sm overflow-hidden max-w-4xl mx-auto min-h-[600px]">
      <div className="p-4 md:p-6 border-b-2 border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-50/30">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Reviews & Reputation</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full sm:w-auto">
          <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
             <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> 4.8 Avg Rating
          </div>
          <button className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] hover:from-[#0c2a4a] hover:to-[#0369a1] text-white rounded-xl text-[12px] uppercase tracking-[0.18em] font-bold shadow-md flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:scale-[1.02]">
            Ask for Review
          </button>
        </div>
      </div>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {MOCK_REVIEWS.map(rev => (
          <div key={rev.id} className="border-2 border-slate-200 rounded-2xl p-4 md:p-5 hover:border-sky-300 transition-colors shadow-sm group">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3 sm:gap-0">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${rev.platform === 'Google' ? 'bg-rose-500' : 'bg-blue-600'}`}>
                  {rev.platform === 'Google' ? 'G' : 'f'}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{rev.author}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{rev.time}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                rev.status === 'replied' 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}>
                {rev.status}
              </span>
            </div>
            <p className="text-slate-700 font-medium mb-4">"{rev.content}"</p>
            {rev.status === 'unreplied' && (
              <div className="flex gap-2 mt-4 pt-4 border-t-2 border-slate-100">
                <input type="text" placeholder="Type a reply..." className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-sky-500 transition-colors" />
                <button className="px-4 py-2 bg-sky-100 text-sky-700 font-bold text-sm rounded-xl hover:bg-sky-200 transition-colors">Reply</button>
              </div>
            )}
          </div>
        ))}
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
