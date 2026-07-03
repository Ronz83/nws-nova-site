import { useState } from "react";
import { Play, Loader2, CheckCircle2, Copy } from "lucide-react";
import type { Skill } from "./SkillCard";

interface SkillExecutorProps {
  skill: Skill;
  onCancel: () => void;
}

export default function SkillExecutor({ skill, onCancel }: SkillExecutorProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [status, setStatus] = useState<"idle" | "executing" | "success" | "error">("idle");
  const [output, setOutput] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const schema = skill.input_schema || {};
  const props = schema.properties || {};
  const required = schema.required || [];

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("executing");
    setErrorMsg("");

    try {
      // Mock execution for now - replace with actual API call to workstation/run endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setOutput({
        meta: { locationId: "LOC_" + Math.random().toString(36).substring(7).toUpperCase() },
        outputText: `==================================================
COPY & PASTE INTO GOHIGHLEVEL VIBE CODER
==================================================
You are Aria, an expert Vibe Coder.
==================================================
END WEBSITE BUILDER PROMPT
==================================================

==================================================
COPY & PASTE INTO GOHIGHLEVEL ASK AI
==================================================
You are Aria AI business OS.
==================================================
END AI BUSINESS OPERATING SYSTEM PROMPT
==================================================

==================================================
COPY & PASTE INTO GOHIGHLEVEL AUTOMATION BUILDER
==================================================
Automation Master Prompt.
==================================================
END MASTER AUTOMATION SYSTEM PROMPT
==================================================`
      });
      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to execute skill.");
      setStatus("error");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const rawText = output?.outputText || "";
  const vibeCoderMatch = rawText.match(/COPY & PASTE INTO GOHIGHLEVEL VIBE CODER\s*=+\s*([\s\S]*?)\s*=+\s*END WEBSITE BUILDER PROMPT/);
  const vibeCoderPrompt = vibeCoderMatch ? vibeCoderMatch[1].trim() : "Failed to extract Vibe Coder prompt. Fallback text:\n" + rawText;

  const askAiMatch = rawText.match(/COPY & PASTE INTO GOHIGHLEVEL ASK AI\s*=+\s*([\s\S]*?)\s*=+\s*END AI BUSINESS OPERATING SYSTEM PROMPT/);
  const askAiPrompt = askAiMatch ? askAiMatch[1].trim() : "Failed to extract Ask AI prompt.";

  const automationMatch = rawText.match(/COPY & PASTE INTO GOHIGHLEVEL AUTOMATION BUILDER\s*=+\s*([\s\S]*?)\s*=+\s*END MASTER AUTOMATION SYSTEM PROMPT/);
  const automationPrompt = automationMatch ? automationMatch[1].trim() : "Failed to extract Automation prompt.";

  if (status === "executing") {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-10 max-w-xl mx-auto text-center">
        <Loader2 className="w-12 h-12 text-sky-500 animate-spin mx-auto mb-6" />
        <h3 className="text-xl font-semibold text-white mb-2">Executing Skill</h3>
        <p className="text-slate-400 text-sm mb-2">Running {skill.name}...</p>
        <p className="text-xs text-slate-500 font-mono">This may take 15-30 seconds depending on API response.</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 max-w-4xl w-full mx-auto">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white tracking-wide">Execution Success</h3>
            <p className="text-xs text-slate-400 mt-1">GHL Location ID: {output?.meta?.locationId || "N/A"}</p>
          </div>
          <button onClick={onCancel} className="text-slate-400 hover:text-white text-sm font-medium">Close Outputs</button>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-emerald-950/30 border border-emerald-900/50 text-emerald-400 text-sm rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            Skill executed successfully. Outputs generated below.
          </div>

          <div className="space-y-4">
            <OutputBox title="Website Builder (Vibe Coder)" content={vibeCoderPrompt} onCopy={() => copyToClipboard(vibeCoderPrompt)} />
            <OutputBox title="AI Business Operating System (Ask AI)" content={askAiPrompt} onCopy={() => copyToClipboard(askAiPrompt)} />
            <OutputBox title="Master Automation System (Automation Builder)" content={automationPrompt} onCopy={() => copyToClipboard(automationPrompt)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 max-w-3xl w-full mx-auto">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <h3 className="text-xl font-bold text-white tracking-wide">Trigger Skill: {skill.name}</h3>
        <button onClick={onCancel} className="text-slate-400 hover:text-white text-sm font-medium">Back to Tools</button>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-rose-950/30 border border-rose-900/50 text-rose-400 text-sm rounded-xl">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(props).map(([key, prop]: [string, any]) => {
            const isRequired = required.includes(key);
            let labelText = key.replace(/([A-Z])/g, ' $1');
            labelText = labelText.charAt(0).toUpperCase() + labelText.slice(1);

            return (
              <div key={key} className={`flex flex-col gap-2 ${key === 'specialBusinessDetails' ? 'md:col-span-2' : ''}`}>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {labelText} {isRequired && <span className="text-rose-500">*</span>}
                </label>
                
                {prop.enum ? (
                  <select 
                    required={isRequired}
                    value={formData[key] || ""}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
                  >
                    <option value="">Select {labelText.toLowerCase()}...</option>
                    {prop.enum.map((opt: string) => (
                      <option key={opt} value={opt}>{opt.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                ) : key === 'specialBusinessDetails' ? (
                  <textarea
                    required={isRequired}
                    rows={3}
                    value={formData[key] || ""}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    placeholder="Enter special instructions..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
                  />
                ) : (
                  <input 
                    type="text"
                    required={isRequired}
                    value={formData[key] || ""}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    placeholder={`Enter ${labelText.toLowerCase()}...`}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all"
                  />
                )}
              </div>
            );
          })}
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white py-3.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all"
        >
          <Play className="w-4 h-4" />
          Run Tool
        </button>
      </form>
    </div>
  );
}

function OutputBox({ title, content, onCopy }: { title: string, content: string, onCopy: () => void }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-sky-400 uppercase tracking-widest">{title}</label>
      <div className="relative">
        <textarea 
          readOnly 
          value={content}
          className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono p-4 rounded-xl h-48 focus:outline-none"
        />
        <button 
          type="button"
          onClick={onCopy}
          className="absolute top-3 right-3 flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-md cursor-pointer transition-colors"
        >
          <Copy className="w-3.5 h-3.5" /> Copy
        </button>
      </div>
    </div>
  );
}
