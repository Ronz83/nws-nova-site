import { useState, useEffect } from 'react';
import { Network, Save, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock types based on GHL user structure
interface GHLUser {
  id: string;
  name: string;
  email: string;
}

interface RoutingRule {
  event_type: string;
  ghl_user_id: string;
  ghl_user_name: string;
  ghl_user_email: string;
}

export function AIRoutingConfig() {
  const [users, setUsers] = useState<GHLUser[]>([]);
  const [rules, setRules] = useState<Record<string, RoutingRule>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const events = [
    { id: 'emergency_dispatch_trigger', label: 'Emergency Roadside Dispatch', description: 'When a caller reports a flat tyre, dead battery, or accident.' },
    { id: 'book_appointment_slot', label: 'Service Booking', description: 'When an AI agent successfully books an appointment slot.' },
    { id: 'ai_employee_flow', label: 'Human Handoff (AI Employee Flow)', description: 'When a caller specifically requests to speak with a human or requires complex info.' }
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Fetch GHL Users
        const usersRes = await fetch('/api/ghl/users');
        if (usersRes.ok) {
          const usersData = await usersRes.json();
          // Adjust based on actual GHL API response format, usually { users: [...] }
          setUsers(usersData.users || []);
        }

        // Fetch existing rules
        const rulesRes = await fetch('/api/vapi/routing-rules');
        if (rulesRes.ok) {
          const rulesData: RoutingRule[] = await rulesRes.json();
          const rulesMap: Record<string, RoutingRule> = {};
          rulesData.forEach(r => {
            rulesMap[r.event_type] = r;
          });
          setRules(rulesMap);
        }
      } catch (error) {
        console.error('Failed to fetch routing data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleUserChange = (eventType: string, userId: string) => {
    if (!userId) {
      const newRules = { ...rules };
      delete newRules[eventType];
      setRules(newRules);
      return;
    }

    const user = users.find(u => u.id === userId);
    if (user) {
      setRules({
        ...rules,
        [eventType]: {
          event_type: eventType,
          ghl_user_id: user.id,
          ghl_user_name: user.name,
          ghl_user_email: user.email
        }
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('idle');
    try {
      const rulesArray = Object.values(rules);
      const res = await fetch('/api/vapi/routing-rules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rulesArray)
      });
      
      if (!res.ok) throw new Error('Failed to save rules');
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving rules:', error);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-slate-200">
        <RefreshCw className="w-8 h-8 text-sky-500 animate-spin mb-4" />
        <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">Loading GHL Users...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
    >
      <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
            <Network className="w-6 h-6 text-violet-600" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">AI Event Routing</h2>
            <p className="text-sm text-slate-600 mt-1">Assign which GHL users receive notifications and tasks for specific AI events.</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 shadow-sm"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Rules'}
        </button>
      </div>

      <div className="p-6">
        {saveStatus === 'success' && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 text-emerald-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium">Routing rules saved successfully!</span>
          </div>
        )}
        {saveStatus === 'error' && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-3 text-rose-800">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <span className="text-sm font-medium">Failed to save routing rules. Check console.</span>
          </div>
        )}

        <div className="space-y-6">
          {events.map((event) => {
            const currentRule = rules[event.id];
            
            return (
              <div key={event.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{event.label}</h3>
                  <p className="text-sm text-slate-600 mt-1">{event.description}</p>
                </div>
                <div className="w-full md:w-72">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Assign To User</label>
                  <select
                    value={currentRule?.ghl_user_id || ''}
                    onChange={(e) => handleUserChange(event.id, e.target.value)}
                    className="w-full bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5 outline-none font-medium"
                  >
                    <option value="">-- Select GHL User --</option>
                    {users.length > 0 ? (
                      users.map(user => (
                        <option key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </option>
                      ))
                    ) : (
                      <option disabled>No users found from GHL API</option>
                    )}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
