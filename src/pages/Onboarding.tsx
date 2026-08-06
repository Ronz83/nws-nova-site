import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import {
  Upload,
  Send,
  Palette,
  Clock,
  Phone,
  Mail,
  MapPin,
  FileText,
  Loader2,
  ChevronRight,
  Briefcase,
  Sparkles,
  Building2,
} from 'lucide-react';
import { toast } from 'sonner';

interface OnboardingForm {
  businessName: string;
  industry: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  primaryColor: string;
  secondaryColor: string;
  operatingHours: string;
  servicesList: string;
  businessDescription: string;
}

const initialFormData: OnboardingForm = {
  businessName: '',
  industry: 'general',
  ownerName: '',
  phone: '',
  email: '',
  address: '',
  primaryColor: '#0369a1',
  secondaryColor: '#0ea5e9',
  operatingHours: '',
  servicesList: '',
  businessDescription: '',
};

const inputClass =
  'w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:border-sky-300 focus:ring-4 focus:ring-sky-50 transition-all outline-none';
const labelClass = 'block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2';
const btnClass = 'bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] hover:from-[#0c2a4a] hover:to-[#0369a1] text-white rounded-xl py-3 px-6 text-sm font-bold transition-all flex items-center gap-2';

export default function Onboarding() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<OnboardingForm>(initialFormData);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function updateField(field: keyof OnboardingForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setSubmitting(true);
    toast.loading("Setting up your workspace...", { id: "onboarding" });

    try {
      let logoUrl = null;

      // 1. Upload Logo to GHL Media Library via our proxy
      if (logoFile && user?.clientId) {
        toast.loading("Uploading branding assets...", { id: "onboarding" });
        const formData = new FormData();
        formData.append('file', logoFile);
        formData.append('locationId', user.clientId);

        const mediaRes = await fetch('/api/crm/media', {
          method: 'POST',
          body: formData,
        });

        if (mediaRes.ok) {
          const mediaData = await mediaRes.json();
          logoUrl = mediaData.url;
        } else {
          console.error("Logo upload failed");
        }
      }

      // 2. Save everything to Supabase User Profile
      toast.loading("Configuring your Business Profile...", { id: "onboarding" });
      const updates = {
        business_name: form.businessName,
        business_logo: logoUrl,
        primary_color: form.primaryColor,
        secondary_color: form.secondaryColor,
        // We can add more fields to user_permissions if needed, or rely on GHL as source of truth
        onboarded: true, 
      };

      await supabase
        .from('user_permissions')
        .update(updates)
        .eq('ghl_user_id', user?.id);

      // 3. Optional: Push to GHL Custom Values via API so AI Agents can read it immediately
      if (user?.clientId) {
        toast.loading("Training your AI Assistants...", { id: "onboarding" });
        await fetch('/api/ghl/custom-values', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            locationId: user.clientId,
            values: {
              "business_description": form.businessDescription,
              "services_list": form.servicesList,
              "operating_hours": form.operatingHours,
            }
          }),
        });
      }

      toast.success("Workspace ready!", { id: "onboarding" });
      // Reload page to trigger re-auth check and drop into dashboard
      window.location.href = '/dashboard';

    } catch (error) {
      console.error(error);
      toast.error("An error occurred during setup", { id: "onboarding" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-slate-900 p-8 text-white">
          <h1 className="text-2xl md:text-3xl font-black flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-sky-400" />
            Welcome to Businesses OS
          </h1>
          <p className="text-slate-300 mt-2 text-sm">
            Let's get your workspace configured. This takes about 2 minutes and trains your AI assistants automatically.
          </p>
          
          {/* Progress Bar */}
          <div className="mt-8 flex gap-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-2 flex-1 rounded-full ${s <= step ? 'bg-sky-500' : 'bg-slate-700'}`} 
              />
            ))}
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">
            <span>Profile</span>
            <span>Branding</span>
            <span>Operations & AI</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* STEP 1: BUSINESS PROFILE */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">Business Profile</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}><Building2 className="w-4 h-4 text-slate-400" /> Company Name</label>
                  <input required type="text" className={inputClass} value={form.businessName} onChange={(e) => updateField('businessName', e.target.value)} placeholder="Acme Corp" />
                </div>
                <div>
                  <label className={labelClass}><Briefcase className="w-4 h-4 text-slate-400" /> Industry / Niche</label>
                  <select required className={inputClass} value={form.industry} onChange={(e) => updateField('industry', e.target.value)}>
                    <option value="general">General / Small Business</option>
                    <option value="dental">Dental</option>
                    <option value="real_estate">Real Estate</option>
                    <option value="home_services">Home Services</option>
                    <option value="hospitality">Hospitality</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}><FileText className="w-4 h-4 text-slate-400" /> Owner Name</label>
                  <input required type="text" className={inputClass} value={form.ownerName} onChange={(e) => updateField('ownerName', e.target.value)} placeholder="Jane Doe" />
                </div>
                <div>
                  <label className={labelClass}><Phone className="w-4 h-4 text-slate-400" /> Business Phone</label>
                  <input required type="tel" className={inputClass} value={form.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}><Mail className="w-4 h-4 text-slate-400" /> Business Email</label>
                  <input required type="email" className={inputClass} value={form.email} onChange={(e) => updateField('email', e.target.value)} placeholder="hello@acmecorp.com" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}><MapPin className="w-4 h-4 text-slate-400" /> Physical Address</label>
                  <input required type="text" className={inputClass} value={form.address} onChange={(e) => updateField('address', e.target.value)} placeholder="123 Main St, City, State, ZIP" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: BRANDING */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">Branding & White-labeling</h2>
              <p className="text-sm text-slate-500 mb-4">Upload your logo and colors. This instantly brands your workspace, funnels, and apps.</p>

              <div>
                <label className={labelClass}><Upload className="w-4 h-4 text-slate-400" /> Logo Upload (High-Res)</label>
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition-all">
                  <Upload className="w-8 h-8 text-slate-300 mb-2" />
                  <span className="text-sm text-slate-600 font-medium">
                    {logoFile ? logoFile.name : 'Click to upload your primary logo'}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">PNG, JPG, or SVG</span>
                  <input type="file" className="hidden" accept="image/*,.svg" onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)} />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                <div>
                  <label className={labelClass}><Palette className="w-4 h-4 text-slate-400" /> Primary Color</label>
                  <div className="flex items-center gap-3">
                    <input type="color" className="w-12 h-12 rounded-xl cursor-pointer" value={form.primaryColor} onChange={(e) => updateField('primaryColor', e.target.value)} />
                    <input type="text" className={inputClass} value={form.primaryColor} onChange={(e) => updateField('primaryColor', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}><Palette className="w-4 h-4 text-slate-400" /> Secondary Color</label>
                  <div className="flex items-center gap-3">
                    <input type="color" className="w-12 h-12 rounded-xl cursor-pointer" value={form.secondaryColor} onChange={(e) => updateField('secondaryColor', e.target.value)} />
                    <input type="text" className={inputClass} value={form.secondaryColor} onChange={(e) => updateField('secondaryColor', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: OPERATIONS & AI */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">Operations & AI Training</h2>
              <p className="text-sm text-slate-500 mb-4">This information trains your Voice and Chat AI Agents automatically so they know how to answer customer questions.</p>

              <div>
                <label className={labelClass}><FileText className="w-4 h-4 text-slate-400" /> What does your business do?</label>
                <textarea required className={`${inputClass} min-h-[100px] resize-y`} value={form.businessDescription} onChange={(e) => updateField('businessDescription', e.target.value)} placeholder="We are a family-owned dental clinic specializing in cosmetic dentistry and orthodontics..." />
              </div>
              
              <div>
                <label className={labelClass}>Core Services & Pricing (If applicable)</label>
                <textarea required className={`${inputClass} min-h-[100px] resize-y`} value={form.servicesList} onChange={(e) => updateField('servicesList', e.target.value)} placeholder="- Routine Checkups ($150)&#10;- Teeth Whitening ($300)&#10;- Invisalign (Custom Quote)" />
              </div>

              <div>
                <label className={labelClass}><Clock className="w-4 h-4 text-slate-400" /> Operating Hours</label>
                <textarea required className={`${inputClass} min-h-[80px] resize-y`} value={form.operatingHours} onChange={(e) => updateField('operatingHours', e.target.value)} placeholder="Monday - Friday: 8:00 AM - 6:00 PM&#10;Saturday: 9:00 AM - 2:00 PM&#10;Sunday: Closed" />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 text-slate-500 hover:bg-slate-100 rounded-xl font-bold text-sm transition-colors">
                Back
              </button>
            ) : <div />}
            
            <button type="submit" disabled={submitting} className={btnClass}>
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Provisioning Workspace...</>
              ) : step === 3 ? (
                <><Send className="w-4 h-4" /> Complete Setup</>
              ) : (
                <>Next Step <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
