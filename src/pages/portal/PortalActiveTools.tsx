import { useState, useEffect } from "react";
import { Wrench } from "lucide-react";
import SkillCard from "../../components/portal/tools/SkillCard";
import type { Skill } from "../../components/portal/tools/SkillCard";
import SkillExecutor from "../../components/portal/tools/SkillExecutor";

export default function PortalActiveTools() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  useEffect(() => {
    // In production, fetch this from Supabase: supabase.from('workstation_skills').select('*').eq('is_active', true)
    const fetchSkills = async () => {
      setLoading(true);
      // Simulating API load with mock data matching the old workstation setup
      setTimeout(() => {
        const mockSkills: Skill[] = [
          {
            id: "1",
            name: "Provision GHL Sub-Account",
            description: "Creates a new GoHighLevel sub-account and generates base prompts for Aria AI.",
            trigger_phrase: "GHL PROVISION",
            input_schema: {
              properties: {
                clientName: { type: "string" },
                businessName: { type: "string" },
                industryTemplate: { type: "string", enum: ["real_estate", "dental", "home_services", "veterinary", "hospitality", "death_care", "automotive"] },
                specialBusinessDetails: { type: "string" }
              },
              required: ["clientName", "businessName", "industryTemplate"]
            }
          },
          {
            id: "2",
            name: "Generate Sales Blueprint",
            description: "Builds a customized objection handling matrix and sales blueprint for new offers.",
            trigger_phrase: "SALES OPS",
            input_schema: {
              properties: {
                offerName: { type: "string" },
                targetAudience: { type: "string" },
                primaryObjection: { type: "string" }
              },
              required: ["offerName", "targetAudience"]
            }
          }
        ];
        setSkills(mockSkills);
        setLoading(false);
      }, 800);
    };

    fetchSkills();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Wrench className="text-sky-500 w-8 h-8" />
          Active Operations Tools
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Run automated CRM provisioning skills. These tools deploy environments and generate specialized prompt packages for GHL Vibe Coder, Ask AI, and Automation Builder.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-slate-400">Loading active tools...</div>
      ) : selectedSkill ? (
        <SkillExecutor 
          skill={selectedSkill} 
          onCancel={() => setSelectedSkill(null)} 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map(skill => (
            <SkillCard key={skill.id} skill={skill} onRun={setSelectedSkill} />
          ))}
        </div>
      )}
    </div>
  );
}
