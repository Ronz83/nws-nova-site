import { Columns } from 'lucide-react';
import { PipelineBoard } from '../../components/portal/pipeline/PipelineBoard';

export default function PortalPipeline() {
  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3 tracking-tight">
          <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center shadow-lg">
            <Columns className="text-[#c392ff] w-5 h-5" />
          </div>
          Client Intake Checklist
        </h1>
        <p className="text-slate-400 font-medium">
          Path A/B Client Onboarding checklist. AMs must complete all sections to gather necessary assets for the design and production team.
        </p>
      </div>
      
      <PipelineBoard />
    </div>
  );
}
