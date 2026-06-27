import { KnowledgeBaseManager } from '../components/knowledge-base/KnowledgeBaseManager';

export default function KBTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Knowledge Base Interface Preview</h1>
          <p className="text-gray-500 mt-2">
            This is a standalone test page to preview the custom React Knowledge Base UI before integrating it into the main dashboard.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl overflow-hidden ring-1 ring-gray-900/5">
          <KnowledgeBaseManager />
        </div>
      </div>
    </div>
  );
}
