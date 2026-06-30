import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import our Vercel handlers
import analyzeHandler from './api/workbench/analyze.ts';
import chatHandler from './api/workbench/chat.ts';
import contactHandler from './api/crm/contact.ts';
import installHandler from './api/connect/install.ts';
import callbackHandler from './api/connect/callback.ts';
import provisionHandler from './api/connect/provision.ts';
import startCallHandler from './api/demo-agent/start-call.ts';
import resultsHandler from './api/results/[id].ts';
import opportunitiesHandler from './api/crm/opportunities.ts';
import conversationsHandler from './api/crm/conversations.ts';
import customValuesHandler from './api/ghl/custom-values.ts';
import vapiInboundHandler from './api/vapi/inbound.ts';
import vapiFunctionsHandler from './api/vapi/functions.ts';
import knowledgeHandler from './api/knowledge/index.ts';
import snapshotsHandler, { pushToGHL as pushSnapshotToGHL } from './api/ghl/snapshots.ts';
import websiteIntakeHandler from './api/website/intake.ts';
import websiteRequestsHandler from './api/website/requests.ts';
import featureFlagsHandler from './api/ghl/feature-flags.ts';
import nicheBlueprintHandler from './api/ai/niche-blueprint.ts';
import chatWidgetHandler from './api/ghl/chat-widget.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Express adapter for Vercel handlers
const adaptVercel = (handler: any) => async (req: express.Request, res: express.Response) => {
  try {
    // Express req/res are highly compatible with VercelRequest/VercelResponse
    // including req.body, req.query, res.status(), res.json()
    await handler(req, res);
  } catch (err) {
    console.error('API Route Error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

// Map the API routes
app.post('/api/workbench/analyze', adaptVercel(analyzeHandler));
app.post('/api/workbench/chat', adaptVercel(chatHandler));
app.post('/api/crm/contact', adaptVercel(contactHandler));
app.get('/api/crm/opportunities', adaptVercel(opportunitiesHandler));
app.get('/api/crm/conversations', adaptVercel(conversationsHandler));
app.get('/api/connect/install', adaptVercel(installHandler));
app.get('/api/connect/callback', adaptVercel(callbackHandler));
app.post('/api/connect/provision', adaptVercel(provisionHandler));
app.post('/api/demo-agent/start-call', adaptVercel(startCallHandler));
app.post('/api/ghl/custom-values', adaptVercel(customValuesHandler));
app.post('/api/vapi/inbound', adaptVercel(vapiInboundHandler));
app.post('/api/vapi/functions', adaptVercel(vapiFunctionsHandler));
app.get('/api/knowledge', adaptVercel(knowledgeHandler));
app.post('/api/knowledge', adaptVercel(knowledgeHandler));
app.get('/api/ghl/snapshots', adaptVercel(snapshotsHandler));
app.post('/api/ghl/snapshots', adaptVercel(snapshotsHandler));
app.put('/api/ghl/snapshots', adaptVercel(snapshotsHandler));
app.delete('/api/ghl/snapshots', adaptVercel(snapshotsHandler));
app.post('/api/ghl/snapshots/push', adaptVercel(pushSnapshotToGHL));
app.get('/api/website/intake', adaptVercel(websiteIntakeHandler));
app.post('/api/website/intake', adaptVercel(websiteIntakeHandler));
app.get('/api/website/requests', adaptVercel(websiteRequestsHandler));
app.get('/api/ghl/feature-flags', adaptVercel(featureFlagsHandler));
app.post('/api/ai/niche-blueprint', adaptVercel(nicheBlueprintHandler));
app.get('/api/ghl/chat-widget', adaptVercel(chatWidgetHandler));

// Map the dynamic results route
app.get('/api/results/:id', (req, res) => {
  // Inject the Express param into req.query so the Vercel handler finds it
  req.query = { ...req.query, id: req.params.id };
  return adaptVercel(resultsHandler)(req, res);
});

// Serve static frontend files from Vite's build output
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback - anything else serves index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Node/Express Server listening on port ${PORT}`);
});
