import { ClipboardList } from "lucide-react";

export default function PortalFulfillment() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-sky-400" />
            Fulfillment
          </h2>
          <p className="text-sm text-slate-400 mt-1">Manage project fulfillment and deliverables.</p>
        </div>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <ClipboardList className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Fulfillment Under Construction</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          The fulfillment management dashboard is currently being built. You will be able to track client deliverables and project milestones here.
        </p>
      </div>
    </div>
  );
}
