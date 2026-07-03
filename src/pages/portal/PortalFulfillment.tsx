import { useState } from "react";
import { ClipboardList, Plus, Search, MoreHorizontal, Clock, MessageSquare, Paperclip, CheckCircle2 } from "lucide-react";

type Column = "Backlog" | "In Progress" | "In Review" | "Completed";

interface Task {
  id: string;
  title: string;
  client: string;
  column: Column;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  comments: number;
  attachments: number;
}

const mockTasks: Task[] = [
  { id: "1", title: "Setup GHL Sub-account", client: "Apex Auto Dealership", column: "Backlog", priority: "High", dueDate: "Oct 24", comments: 2, attachments: 0 },
  { id: "2", title: "Deploy MedSpa Snapshot", client: "Glow Aesthetics", column: "In Progress", priority: "Medium", dueDate: "Oct 25", comments: 5, attachments: 1 },
  { id: "3", title: "Configure Vapi Voice Agent", client: "Smith Legal", column: "In Progress", priority: "High", dueDate: "Oct 23", comments: 1, attachments: 0 },
  { id: "4", title: "QA Website Content", client: "Apex Auto Dealership", column: "In Review", priority: "Medium", dueDate: "Oct 22", comments: 8, attachments: 3 },
  { id: "5", title: "DNS Handover", client: "Glow Aesthetics", column: "In Review", priority: "High", dueDate: "Oct 21", comments: 0, attachments: 1 },
  { id: "6", title: "Stripe Integration", client: "Apex Auto Dealership", column: "Completed", priority: "Low", dueDate: "Oct 20", comments: 0, attachments: 0 },
];

export default function PortalFulfillment() {
  const [searchQuery, setSearchQuery] = useState("");
  const columns: Column[] = ["Backlog", "In Progress", "In Review", "Completed"];

  return (
    <div className="h-full flex flex-col space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-emerald-400" />
            Fulfillment Board
          </h2>
          <p className="text-sm text-slate-400 mt-1">Track client deliverables, onboarding tasks, and project milestones.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text"
              placeholder="Search tasks or clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-lg transition-colors text-sm font-bold shadow-md">
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max h-full">
          {columns.map(col => {
            const columnTasks = mockTasks.filter(t => t.column === col && (
              t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
              t.client.toLowerCase().includes(searchQuery.toLowerCase())
            ));

            return (
              <div key={col} className="w-[320px] flex flex-col bg-slate-900/50 rounded-xl border border-slate-800/50">
                <div className="p-4 flex items-center justify-between border-b border-slate-800/50">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-300">{col}</h3>
                    <span className="bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {columnTasks.length}
                    </span>
                  </div>
                  <button className="text-slate-500 hover:text-slate-300 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                  {columnTasks.map(task => (
                    <div key={task.id} className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-4 cursor-pointer group shadow-sm transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                          task.priority === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          task.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                          'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                        }`}>
                          {task.priority}
                        </span>
                        <button className="text-slate-600 hover:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <h4 className="text-sm font-bold text-slate-200 mb-1 leading-snug">{task.title}</h4>
                      <p className="text-xs text-slate-500 mb-4">{task.client}</p>
                      
                      <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                        <div className="flex items-center gap-3">
                          {task.comments > 0 && (
                            <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                              <MessageSquare className="w-3.5 h-3.5" />
                              {task.comments}
                            </div>
                          )}
                          {task.attachments > 0 && (
                            <div className="flex items-center gap-1 text-slate-500 text-xs font-medium">
                              <Paperclip className="w-3.5 h-3.5" />
                              {task.attachments}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-slate-500 text-[11px] font-bold">
                          {task.column === 'Completed' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                          {task.dueDate}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {columnTasks.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-slate-800 rounded-xl flex items-center justify-center">
                      <p className="text-xs text-slate-500 font-medium">Drop tasks here</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
