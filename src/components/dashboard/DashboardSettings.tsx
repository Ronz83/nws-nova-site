import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, ExternalLink, Download } from 'lucide-react';

import { useAuth } from '../../contexts/AuthContext';
export function DashboardSettings() {
  const [activeTab, setActiveTab] = useState<'integrations' | 'billing' | 'team'>('team');
  const { user } = useAuth();

  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [memberPermissions, setMemberPermissions] = useState<Record<string, any>>({});
  const [loadingTeam, setLoadingTeam] = useState(false);

  useEffect(() => {
    if (activeTab === 'team' && user?.role === 'agency_admin') {
      const fetchTeam = async () => {
        setLoadingTeam(true);
        try {
          const res = await fetch('/api/ghl/users');
          if (!res.ok) throw new Error('Failed to fetch users');
          const data = await res.json();
          const usersList = data.users || [];
          setTeamMembers(usersList);

          if (usersList.length > 0) {
            const userIds = usersList.map((u: any) => u.id);
            const { data: perms } = await supabase
              .from('user_permissions')
              .select('*')
              .in('ghl_user_id', userIds);
            
            const permMap: Record<string, any> = {};
            if (perms) {
              perms.forEach((p) => {
                permMap[p.ghl_user_id] = p;
              });
            }
            setMemberPermissions(permMap);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingTeam(false);
        }
      };
      fetchTeam();
    }
  }, [activeTab, user?.role]);

  const toggleMemberPermission = async (memberId: string, hub: string, currentValue: boolean) => {
    const newValue = !currentValue;
    const dbCol = hub === 'aiStudio' ? 'ai_studio' : hub === 'requireUpgrade' ? 'require_upgrade' : hub;

    setMemberPermissions(prev => ({
      ...prev,
      [memberId]: {
        ...(prev[memberId] || { operations: false, growth: false, automations: false, ai_studio: false, settings: false, require_upgrade: true }),
        [dbCol]: newValue
      }
    }));

    const member = teamMembers.find(m => m.id === memberId);

    await supabase.from('user_permissions').upsert({
      ghl_user_id: memberId,
      name: member?.name || '',
      email: member?.email || '',
      role: member?.roles?.type || 'location_user',
      [dbCol]: newValue,
      updated_at: new Date().toISOString()
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6 md:mt-8 mb-8 md:mb-12">
        <div>
          <p className="text-[12px] font-bold text-sky-500 uppercase tracking-[0.18em] mb-2">Configuration</p>
          <h1 className="text-3xl md:text-4xl text-slate-900 font-black tracking-tight">Settings Hub</h1>
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-[24px] border-2 border-slate-100 shadow-sm overflow-hidden mb-16 hover:shadow-md transition-all">
        <div className="flex overflow-x-auto border-b border-slate-100 relative">
          <button
            onClick={() => setActiveTab('integrations')}
            className={`flex-1 py-3 px-4 md:py-4 md:px-6 whitespace-nowrap text-center font-bold text-[13px] md:text-[14px] uppercase tracking-widest relative transition-colors ${
              activeTab === 'integrations' ? 'text-sky-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            App Marketplace
            {activeTab === 'integrations' && (
              <motion.div
                layoutId="activeSettingsTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-sky-600"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`flex-1 py-3 px-4 md:py-4 md:px-6 whitespace-nowrap text-center font-bold text-[13px] md:text-[14px] uppercase tracking-widest relative transition-colors ${
              activeTab === 'billing' ? 'text-sky-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Billing & Usage
            {activeTab === 'billing' && (
              <motion.div
                layoutId="activeSettingsTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-sky-600"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`flex-1 py-3 px-4 md:py-4 md:px-6 whitespace-nowrap text-center font-bold text-[13px] md:text-[14px] uppercase tracking-widest relative transition-colors ${
              activeTab === 'team' ? 'text-sky-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Team & Roles
            {activeTab === 'team' && (
              <motion.div
                layoutId="activeSettingsTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-sky-600"
              />
            )}
          </button>
        </div>

        <div className="p-4 md:p-8">
          {activeTab === 'team' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-900 text-lg tracking-tight">Team Management</h3>
                <a href="https://app.gohighlevel.com/settings/staff" target="_blank" rel="noopener noreferrer" className="text-[12px] font-bold uppercase tracking-[0.18em] text-white bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] hover:from-[#0c2a4a] hover:to-[#0369a1] px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] inline-flex items-center gap-2">
                  <span>Invite Member</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-sm text-slate-600 mb-6 max-w-2xl">
                Manage your team members and configure their access permissions across the NWS Business OS.
              </p>

              {loadingTeam ? (
                <div className="text-center py-8 text-slate-500 font-medium bg-slate-50 rounded-xl border border-slate-200">
                  Loading team members from GoHighLevel...
                </div>
              ) : teamMembers.length === 0 ? (
                <div className="text-center py-8 text-slate-500 font-medium bg-slate-50 rounded-xl border border-slate-200">
                  No team members found. Invite them in GoHighLevel first!
                </div>
              ) : (
                teamMembers.map((member) => (
                  <div key={member.id} className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden mb-6">
                    <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-slate-300">
                          {member.name ? member.name.substring(0, 2).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{member.name || 'Unnamed User'}</h4>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                            {member.roles?.type || member.type || 'User'} - {member.email}
                          </p>
                        </div>
                      </div>
                      <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Active</span>
                    </div>
                    
                    {user?.role === 'agency_admin' ? (
                      <div className="p-6">
                        <h5 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Access Permissions</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {['operations', 'growth', 'automations', 'aiStudio', 'settings', 'requireUpgrade'].map((hub) => {
                            const labels: Record<string, string> = {
                              operations: 'Operations Hub',
                              growth: 'Growth Hub',
                              automations: 'Automations Hub',
                              aiStudio: 'AI Studio',
                              settings: 'Settings',
                              requireUpgrade: 'Require Upgrade CTA'
                            };
                            const dbCol = hub === 'aiStudio' ? 'ai_studio' : hub === 'requireUpgrade' ? 'require_upgrade' : hub;
                            
                            let isEnabled = !!memberPermissions[member.id]?.[dbCol];
                            if (hub === 'requireUpgrade' && memberPermissions[member.id]?.[dbCol] === undefined) {
                              isEnabled = true; // default
                            }
                            
                            return (
                              <div key={hub} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                                <span className="font-bold text-slate-700 text-sm">{labels[hub]}</span>
                                <button 
                                  onClick={() => toggleMemberPermission(member.id, hub, isEnabled)}
                                  className={`w-12 h-6 rounded-full p-1 transition-colors ${isEnabled ? 'bg-sky-500' : 'bg-slate-300'}`}
                                >
                                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-center text-slate-500 text-sm font-medium">
                        Only Agency Admins can edit permissions.
                      </div>
                    )}
                  </div>
                ))
              )}

              {/* AI Routing Configuration */}
              <div className="mt-8">
                {/* AIRoutingConfig removed - Vapi deprecated */}
</div>
            </motion.div>
          )}
          {activeTab === 'integrations' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Google Business Profile */}
              <div className="bg-slate-50 rounded-xl border border-slate-300 p-5 md:p-6 flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Google Business Profile</h3>
                    <p className="text-sm text-slate-600 mt-1">Sync reviews and local SEO data.</p>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 p-2 rounded-full">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Connected</span>
                  <button className="text-sm font-medium text-slate-500 hover:text-slate-700 border border-slate-300 px-3 py-1 rounded-md transition-colors bg-white">Configure</button>
                </div>
              </div>

              {/* Stripe */}
              <div className="bg-slate-50 rounded-xl border border-slate-300 p-5 md:p-6 flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Stripe</h3>
                    <p className="text-sm text-slate-600 mt-1">Process payments and invoices.</p>
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 p-2 rounded-full">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Connected</span>
                  <button className="text-sm font-medium text-slate-500 hover:text-slate-700 border border-slate-300 px-3 py-1 rounded-md transition-colors bg-white">Configure</button>
                </div>
              </div>

              {/* Facebook/Instagram */}
              <div className="bg-slate-50 rounded-xl border border-slate-300 p-5 md:p-6 flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Facebook & Instagram</h3>
                    <p className="text-sm text-slate-600 mt-1">Manage ad campaigns and leads.</p>
                  </div>
                  <div className="bg-rose-100 text-rose-700 p-2 rounded-full">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Action Required</span>
                  <button className="text-[10px] uppercase tracking-widest font-bold text-white bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] hover:from-[#0c2a4a] hover:to-[#0369a1] px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md hover:scale-[1.02]">Reconnect</button>
                </div>
              </div>

              {/* Vapi AI section removed */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 md:p-6 flex flex-col justify-between hover:border-sky-200 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Vapi AI</h3>
                    <p className="text-sm text-slate-600 mt-1">Voice AI agent integration.</p>
                  </div>
                  <div className="bg-slate-200 text-slate-500 p-2 rounded-full">
                    <XCircle className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Disconnected</span>
                  <button className="text-[10px] uppercase tracking-widest font-bold text-white bg-slate-800 hover:bg-slate-900 px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md hover:scale-[1.02]">Connect</button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'billing' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Subscription Info */}
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 bg-sky-50 rounded-xl border border-sky-200 p-5 md:p-6">
                  <h3 className="text-[12px] font-bold text-sky-600 uppercase tracking-widest mb-1">Current Plan</h3>
                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-2xl md:text-3xl font-black text-slate-900">Enterprise Suite</span>
                    <span className="text-sm text-slate-600 font-medium mb-1">$499/mo</span>
                  </div>
                  <p className="text-sm text-slate-700 mb-6">Your plan renews on July 15, 2026.</p>
                  <button className="text-sm font-bold text-sky-700 hover:text-sky-800 uppercase tracking-wider flex items-center gap-1">
                    Manage Plan <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 bg-slate-50 rounded-xl border border-slate-300 p-5 md:p-6">
                  <h3 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-4">Usage Limits</h3>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">AI Minutes</span>
                      <span className="font-bold text-slate-900">450 / 1000</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-sky-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">Contacts</span>
                      <span className="font-bold text-slate-900">8,230 / 10,000</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-amber-400 h-2 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing History */}
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-4">Billing History</h3>
                <div className="border border-slate-200 rounded-xl overflow-x-auto">
                  <table className="w-full text-left text-sm min-w-[500px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 font-bold text-slate-700">Date</th>
                        <th className="px-6 py-3 font-bold text-slate-700">Amount</th>
                        <th className="px-6 py-3 font-bold text-slate-700">Status</th>
                        <th className="px-6 py-3 font-bold text-slate-700 text-right">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-6 py-4 text-slate-900 font-medium">Jun 15, 2026</td>
                        <td className="px-6 py-4 text-slate-600">$499.00</td>
                        <td className="px-6 py-4">
                          <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">Paid</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-500 hover:text-sky-600 transition-colors">
                            <Download className="w-5 h-5 inline" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-slate-900 font-medium">May 15, 2026</td>
                        <td className="px-6 py-4 text-slate-600">$499.00</td>
                        <td className="px-6 py-4">
                          <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">Paid</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-500 hover:text-sky-600 transition-colors">
                            <Download className="w-5 h-5 inline" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
