import { Play } from "lucide-react";

export interface Skill {
  id: string;
  name: string;
  description: string;
  trigger_phrase: string;
  input_schema?: any;
}

interface SkillCardProps {
  skill: Skill;
  onRun: (skill: Skill) => void;
}

export default function SkillCard({ skill, onRun }: SkillCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:bg-slate-800/50 hover:border-slate-700 transition-all flex flex-col justify-between">
      <div>
        <span className="inline-block px-3 py-1 bg-sky-500/10 text-sky-400 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
          {skill.trigger_phrase || "Skill"}
        </span>
        <h4 className="text-xl font-bold text-white mb-2">{skill.name}</h4>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">{skill.description}</p>
      </div>
      <button 
        onClick={() => onRun(skill)}
        className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all"
      >
        <Play className="w-4 h-4" />
        Run Skill
      </button>
    </div>
  );
}
