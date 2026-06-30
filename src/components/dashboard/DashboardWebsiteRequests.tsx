import { useState, useEffect } from "react";
import {
  Globe,
  Loader2,
  Calendar,
  Mail,
  Phone,
  Palette,
  CheckCircle,
  ExternalLink,
  Search,
  X,
  LayoutGrid
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface WebsiteRequest {
  id: string;
  location_id: string;
  business_name: string;
  tagline: string;
  primary_color: string;
  secondary_color: string;
  services_list: string;
  operating_hours: string;
  phone: string;
  email: string;
  address: string;
  social_links: string;
  special_instructions: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export function DashboardWebsiteRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReq, setSelectedReq] = useState<WebsiteRequest | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await fetch("/api/website/requests");
        const data = await res.json();
        if (data.success) {
          setRequests(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch website requests:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, []);

  // Only agency admins can access this route — guard AFTER all hooks
  if (user?.role !== "agency_admin") {
    return <Navigate to="/dashboard" replace />;
  }

  const filteredRequests = requests.filter(
    (req) =>
      req.business_name?.toLowerCase().includes(search.toLowerCase()) ||
      req.location_id?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"><CheckCircle className="w-3 h-3" /> Completed</span>;
      case "in_progress":
        return <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"><Loader2 className="w-3 h-3 animate-spin" /> In Progress</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Pending</span>;
    }
  };

  if (selectedReq) {
    return <RequestDetailView req={selectedReq} onBack={() => setSelectedReq(null)} />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-3">
            <LayoutGrid className="w-8 h-8 text-sky-600" />
            Website Fulfillment
          </h1>
          <p className="text-lg text-slate-700 mt-2">
            Manage incoming client website customization requests.
          </p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search businesses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm font-medium focus:border-sky-400 focus:ring-4 focus:ring-sky-50 transition-all outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white border-2 border-slate-100 rounded-[24px] p-12 text-center shadow-sm">
          <Globe className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Requests Found</h3>
          <p className="text-slate-500">There are no website customization requests matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRequests.map((req) => (
            <button
              key={req.id}
              onClick={() => setSelectedReq(req)}
              className="bg-white/95 backdrop-blur-sm border-2 border-slate-100 rounded-[24px] p-6 shadow-sm hover:shadow-md hover:border-sky-200 transition-all text-left flex flex-col h-full group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 group-hover:scale-110 group-hover:bg-sky-100 transition-all">
                  <Globe className="w-6 h-6" />
                </div>
                {getStatusBadge(req.status)}
              </div>
              
              <h3 className="text-xl font-black text-slate-900 mb-1 truncate">
                {req.business_name || "Unknown Business"}
              </h3>
              <p className="text-sm font-medium text-slate-500 mb-6 truncate">
                {req.location_id}
              </p>

              <div className="mt-auto space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {new Date(req.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 truncate">
                  <Mail className="w-4 h-4 text-slate-400" />
                  {req.email || "No email"}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// Detail View Component
// ----------------------------------------------------------------------
function RequestDetailView({ req, onBack }: { req: WebsiteRequest; onBack: () => void }) {
  const cardClass = "bg-white border-2 border-slate-100 rounded-[24px] p-6 md:p-8 shadow-sm";
  const labelClass = "text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block";
  
  return (
    <div className="space-y-6">
      {/* Detail Header */}
      <div className="flex items-center justify-between bg-white border-2 border-slate-100 rounded-[24px] p-4 md:p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center h-10 w-10 rounded-xl border-2 border-slate-200 text-slate-500 hover:border-sky-400 hover:text-sky-600 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-900 leading-none">
              {req.business_name}
            </h2>
            <span className="text-sm font-medium text-slate-500">
              Location: {req.location_id}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            // Launch Vibe Coder externally - passing location_id
            window.open(`https://vibecoder.com/build?location=${req.location_id}`, '_blank');
          }}
          className="inline-flex items-center gap-2 bg-gradient-to-br from-[#0369a1] to-[#0ea5e9] hover:from-[#0c2a4a] hover:to-[#0369a1] text-white rounded-xl py-3 px-6 text-[12px] font-bold uppercase tracking-[0.18em] transition-all shadow-sm"
        >
          <ExternalLink className="w-4 h-4" />
          Launch Vibe Coder
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col - Brand & Basics */}
        <div className="lg:col-span-1 space-y-6">
          <div className={cardClass}>
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
              <Palette className="w-5 h-5 text-sky-600" />
              Brand Identity
            </h3>
            
            <div className="space-y-4">
              <div>
                <span className={labelClass}>Tagline / Slogan</span>
                <p className="font-medium text-slate-700">{req.tagline || "None provided"}</p>
              </div>
              
              <div className="flex gap-4 pt-2">
                <div className="flex-1">
                  <span className={labelClass}>Primary Color</span>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg shadow-inner border border-slate-200"
                      style={{ backgroundColor: req.primary_color }}
                    />
                    <span className="font-mono text-sm font-bold text-slate-700">{req.primary_color}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <span className={labelClass}>Secondary Color</span>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg shadow-inner border border-slate-200"
                      style={{ backgroundColor: req.secondary_color }}
                    />
                    <span className="font-mono text-sm font-bold text-slate-700">{req.secondary_color}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
              <Phone className="w-5 h-5 text-sky-600" />
              Contact Details
            </h3>
            <div className="space-y-4">
              <div>
                <span className={labelClass}>Email Address</span>
                <p className="font-medium text-slate-700">{req.email || "—"}</p>
              </div>
              <div>
                <span className={labelClass}>Phone Number</span>
                <p className="font-medium text-slate-700">{req.phone || "—"}</p>
              </div>
              <div>
                <span className={labelClass}>Physical Address</span>
                <p className="font-medium text-slate-700">{req.address || "—"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col - Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className={cardClass}>
            <h3 className="text-lg font-black text-slate-900 mb-6">Website Content</h3>
            
            <div className="space-y-6">
              <div>
                <span className={labelClass}>Main Services</span>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 whitespace-pre-wrap font-medium text-slate-700 min-h-[100px]">
                  {req.services_list || "No services listed."}
                </div>
              </div>

              <div>
                <span className={labelClass}>Operating Hours</span>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 whitespace-pre-wrap font-medium text-slate-700">
                  {req.operating_hours || "No hours provided."}
                </div>
              </div>

              <div>
                <span className={labelClass}>Social Media Links</span>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 whitespace-pre-wrap font-medium text-slate-700">
                  {req.social_links || "No links provided."}
                </div>
              </div>

              <div>
                <span className={labelClass}>Special Instructions</span>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 whitespace-pre-wrap font-medium text-amber-900 min-h-[100px]">
                  {req.special_instructions || "None."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
