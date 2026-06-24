import React, { useState } from "react";
import { X, UserPlus, Loader2, CheckCircle2 } from "lucide-react";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/connect/provision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.details || "Failed to provision workspace");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError(null);
    setFormData({ firstName: "", lastName: "", email: "", phone: "", businessName: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300"
        onClick={!loading ? handleClose : undefined}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white border-2 border-border-base rounded-[32px] shadow-2xl flex flex-col overflow-hidden z-10 text-left font-sans">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-border-base flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 border border-sky-200 bg-sky-50 rounded-xl text-sky-600 shadow-sm">
              <UserPlus size={18} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-text-base leading-tight">Create Free Account</h3>
              <p className="text-sm text-text-muted font-mono tracking-wider uppercase mt-0.5">Instant Workspace Provisioning</p>
            </div>
          </div>
          {!loading && (
            <button
              onClick={handleClose}
              className="p-2 hover:bg-slate-100 rounded-full border border-border-base text-text-muted cursor-pointer transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 bg-white">
          {success ? (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-xl font-black text-text-base mb-2">Workspace Created!</h4>
              <p className="text-sm text-text-muted mb-6 px-4">
                Your new GoHighLevel sub-account has been successfully provisioned. Check your email for login instructions.
              </p>
              <button
                onClick={handleClose}
                className="w-full h-12 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-text-muted uppercase tracking-wider pl-1">First Name</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleChange} disabled={loading} className="h-11 px-4 border border-border-base rounded-xl text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 disabled:opacity-50" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-text-muted uppercase tracking-wider pl-1">Last Name</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleChange} disabled={loading} className="h-11 px-4 border border-border-base rounded-xl text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 disabled:opacity-50" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-muted uppercase tracking-wider pl-1">Work Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} disabled={loading} className="h-11 px-4 border border-border-base rounded-xl text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 disabled:opacity-50" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-muted uppercase tracking-wider pl-1">Phone Number</label>
                <input name="phone" value={formData.phone} onChange={handleChange} disabled={loading} placeholder="Optional" className="h-11 px-4 border border-border-base rounded-xl text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 disabled:opacity-50" />
              </div>

              <div className="flex flex-col gap-1.5 mb-2">
                <label className="text-sm font-bold text-text-muted uppercase tracking-wider pl-1">Business Name</label>
                <input required name="businessName" value={formData.businessName} onChange={handleChange} disabled={loading} className="h-11 px-4 border border-border-base rounded-xl text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 disabled:opacity-50" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-12 bg-sunrise-gradient text-white font-bold tracking-wide uppercase text-sm rounded-xl shadow-md hover:shadow-lg hover:opacity-95 transition-all flex items-center justify-center disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Provision Workspace"}
              </button>
              <p className="text-sm text-center text-text-muted mt-2">
                By creating an account, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
