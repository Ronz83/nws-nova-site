import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Globe,
  Upload,
  Check,
  Send,
  Palette,
  Clock,
  Phone,
  Mail,
  MapPin,
  Share2,
  FileText,
  Loader2,
} from 'lucide-react';

interface IntakeForm {
  businessName: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  servicesList: string;
  operatingHours: string;
  phone: string;
  email: string;
  address: string;
  socialLinks: string;
  specialInstructions: string;
  existingWebsiteUrl: string;
  designInspirationUrl: string;
}

interface Submission {
  timestamp: string;
  data: IntakeForm;
}

const initialFormData: IntakeForm = {
  businessName: '',
  tagline: '',
  primaryColor: '#0369a1',
  secondaryColor: '#0ea5e9',
  servicesList: '',
  operatingHours: '',
  phone: '',
  email: '',
  address: '',
  socialLinks: '',
  specialInstructions: '',
  existingWebsiteUrl: '',
  designInspirationUrl: '',
};

const cardClass =
  'bg-white/95 backdrop-blur-sm border-2 border-slate-100 rounded-[24px] shadow-sm hover:shadow-md transition-all p-6 md:p-8';

const inputClass =
  'w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:border-sky-300 focus:ring-4 focus:ring-sky-50 transition-all outline-none';

const labelClass = 'block text-sm font-bold text-slate-700 mb-2';

const primaryBtnClass =
  'bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] hover:from-[#0c2a4a] hover:to-[#0369a1] text-white rounded-xl py-3 px-6 text-[12px] font-bold uppercase tracking-[0.18em] transition-all';

export function DashboardWebsite() {
  const { user } = useAuth();
  const [form, setForm] = useState<IntakeForm>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);

  useEffect(() => {
    if (user?.clientId) {
      fetch(`/api/website/intake?locationId=${user.clientId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setForm((prev) => ({
              ...prev,
              businessName: data.data.business_name || prev.businessName,
              tagline: data.data.tagline || prev.tagline,
              primaryColor: data.data.primary_color || prev.primaryColor,
              secondaryColor: data.data.secondary_color || prev.secondaryColor,
              servicesList: data.data.services_list || prev.servicesList,
              operatingHours: data.data.operating_hours || prev.operatingHours,
              phone: data.data.phone || prev.phone,
              email: data.data.email || prev.email,
              address: data.data.address || prev.address,
              socialLinks: data.data.social_links || prev.socialLinks,
              specialInstructions: data.data.special_instructions || prev.specialInstructions,
              existingWebsiteUrl: data.data.existing_website_url || prev.existingWebsiteUrl,
              designInspirationUrl: data.data.design_inspiration_url || prev.designInspirationUrl,
            }));
            
            // Note: Since we are not persisting existingWebsiteUrl or designInspirationUrl in the supabase table
            // currently (because we bypassed the migration), those won't re-hydrate from DB, but the rest will.
            // When user submits, everything will still be passed to the webhook.
          }
        })
        .catch(console.error);
    }
  }, [user?.clientId]);

  function updateField(field: keyof IntakeForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/website/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationId: user?.clientId || 'demo-location', ...form }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmission({
          timestamp: new Date().toLocaleString(),
          data: { ...form },
        });
      }
    } catch {
      // silently handle — could add toast later
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-3">
          <Globe className="w-8 h-8 text-sky-600" />
          Your Website
        </h1>
        <p className="text-lg text-slate-700 mt-2">
          Review your website template and submit your business details for
          customization.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column — Template Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className={cardClass}>
            <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-4">
              Assigned Template
            </p>

            {/* Preview gradient placeholder */}
            <div className="h-48 bg-gradient-to-br from-sky-100 to-sky-200 rounded-xl flex items-center justify-center mb-6">
              <span className="text-sky-500 font-bold text-lg select-none">
                Template Preview
              </span>
            </div>

            {/* Template info */}
            <h2 className="font-black text-xl text-slate-900">
              Automotive Premium
            </h2>

            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 text-xs font-bold px-3 py-1 rounded-full">
                Automotive
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mt-4">
              A premium, conversion-optimized website template designed for
              automotive businesses. Features dynamic inventory showcase,
              service booking, and customer testimonials.
            </p>

            <button className="mt-6 text-sky-600 underline text-sm font-semibold hover:text-sky-800 transition-colors">
              Request Template Change
            </button>
          </div>
        </div>

        {/* Right Column — Info Gathering Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className={cardClass}>
            <h2 className="text-2xl text-slate-900 font-black">
              Customize Your Site
            </h2>
            <p className="text-slate-600 text-sm mt-1 mb-8">
              Fill in your business details below. Our design team will build
              your site using this information.
            </p>

            <div className="space-y-5">
              {/* Business Name */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    Business Name
                  </span>
                </label>
                <input
                  type="text"
                  className={inputClass}
                  value={form.businessName}
                  onChange={(e) => updateField('businessName', e.target.value)}
                  placeholder="Your business name"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className={labelClass}>Tagline / Slogan</label>
                <input
                  type="text"
                  className={inputClass}
                  value={form.tagline}
                  onChange={(e) => updateField('tagline', e.target.value)}
                  placeholder="A short tagline for your business"
                />
              </div>

              {/* Primary Brand Color */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-slate-400" />
                    Primary Brand Color
                  </span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    className="w-12 h-12 rounded-xl border-2 border-slate-200 cursor-pointer p-1"
                    value={form.primaryColor}
                    onChange={(e) => updateField('primaryColor', e.target.value)}
                  />
                  <input
                    type="text"
                    className={inputClass}
                    value={form.primaryColor}
                    onChange={(e) => updateField('primaryColor', e.target.value)}
                    placeholder="#0369a1"
                  />
                </div>
              </div>

              {/* Secondary Brand Color */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-slate-400" />
                    Secondary Brand Color
                  </span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    className="w-12 h-12 rounded-xl border-2 border-slate-200 cursor-pointer p-1"
                    value={form.secondaryColor}
                    onChange={(e) =>
                      updateField('secondaryColor', e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className={inputClass}
                    value={form.secondaryColor}
                    onChange={(e) =>
                      updateField('secondaryColor', e.target.value)
                    }
                    placeholder="#0ea5e9"
                  />
                </div>
              </div>

              {/* Logo Upload */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-slate-400" />
                    Logo Upload
                  </span>
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-sky-300 hover:bg-sky-50/30 transition-all">
                  <Upload className="w-6 h-6 text-slate-400 mb-2" />
                  <span className="text-sm text-slate-500 font-medium">
                    {logoFile ? logoFile.name : 'Click to upload your logo'}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    PNG, JPG, or SVG
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,.svg"
                    onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>

              {/* Hero Image */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-slate-400" />
                    Hero Image
                  </span>
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-sky-300 hover:bg-sky-50/30 transition-all">
                  <Upload className="w-6 h-6 text-slate-400 mb-2" />
                  <span className="text-sm text-slate-500 font-medium">
                    {heroFile
                      ? heroFile.name
                      : 'Click to upload a hero image'}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    Recommended: 1920×1080 or larger
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setHeroFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>

              {/* Services List */}
              <div>
                <label className={labelClass}>Services List</label>
                <textarea
                  className={`${inputClass} min-h-[100px] resize-y`}
                  value={form.servicesList}
                  onChange={(e) => updateField('servicesList', e.target.value)}
                  placeholder="List your main services, one per line..."
                />
              </div>

              {/* Operating Hours */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    Operating Hours
                  </span>
                </label>
                <textarea
                  className={`${inputClass} min-h-[80px] resize-y`}
                  value={form.operatingHours}
                  onChange={(e) =>
                    updateField('operatingHours', e.target.value)
                  }
                  placeholder="Mon-Fri: 9AM-5PM..."
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    Phone Number
                  </span>
                </label>
                <input
                  type="tel"
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="contact@yourbusiness.com"
                />
              </div>

              {/* Physical Address */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    Physical Address
                  </span>
                </label>
                <input
                  type="text"
                  className={inputClass}
                  value={form.address}
                  onChange={(e) =>
                    updateField('address', e.target.value)
                  }
                  placeholder="123 Main St, City, State, ZIP"
                />
              </div>

              {/* Social Media Links */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-slate-400" />
                    Social Media Links
                  </span>
                </label>
                <input
                  type="text"
                  className={inputClass}
                  value={form.socialLinks}
                  onChange={(e) =>
                    updateField('socialLinks', e.target.value)
                  }
                  placeholder="Instagram, Facebook, LinkedIn URLs..."
                />
              </div>

              {/* Existing Website URL */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-slate-400" />
                    Existing Website URL (Optional)
                  </span>
                </label>
                <input
                  type="url"
                  className={inputClass}
                  value={form.existingWebsiteUrl}
                  onChange={(e) => updateField('existingWebsiteUrl', e.target.value)}
                  placeholder="https://your-current-site.com"
                />
                <p className="text-xs text-slate-500 mt-1">
                  If provided, our AI will overhaul and modernize this site while keeping SEO structures intact.
                </p>
              </div>

              {/* Design Inspiration */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-slate-400" />
                    Design Inspiration (Mobbin / Reference)
                  </span>
                </label>
                <input
                  type="url"
                  className={inputClass}
                  value={form.designInspirationUrl}
                  onChange={(e) => updateField('designInspirationUrl', e.target.value)}
                  placeholder="https://mobbin.com/..."
                />
                <p className="text-xs text-slate-500 mt-1">
                  Paste a link to a Mobbin template or UI board for the builder to use as a structural reference.
                </p>
              </div>

              {/* Special Instructions */}
              <div>
                <label className={labelClass}>Special Instructions</label>
                <textarea
                  className={`${inputClass} min-h-[100px] resize-y`}
                  value={form.specialInstructions}
                  onChange={(e) =>
                    updateField('specialInstructions', e.target.value)
                  }
                  placeholder="Any specific requests for your website..."
                />
              </div>
            </div>

            {/* Submit */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={submitting}
                className={`${primaryBtnClass} w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit for Customization
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-500 mt-3">
                Our team typically delivers your customized site within 48
                hours.
              </p>
            </div>
          </form>

          {/* Submission Confirmation */}
          {submission && (
            <div className={`${cardClass} border-emerald-200 bg-emerald-50/80`}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-emerald-900">
                    Details Submitted Successfully
                  </h3>
                  <p className="text-sm text-emerald-700 mt-1">
                    Your details have been submitted! Our design team is working
                    on your site.
                  </p>
                  <p className="text-xs text-emerald-600 mt-2 font-medium">
                    Submitted on {submission.timestamp}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
