import { Package } from "lucide-react";

export default function PortalSnapshots() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Package className="w-6 h-6 text-sky-400" />
            Snapshots
          </h2>
          <p className="text-sm text-slate-400 mt-1">Manage and deploy GHL agency snapshots.</p>
        </div>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Snapshots Module Under Construction</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          The snapshot management interface is currently being built. Soon you will be able to push and pull snapshots directly to client sub-accounts.
        </p>
      </div>
    </div>
  );
}
