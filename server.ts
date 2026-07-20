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
import stripeCheckoutHandler from './api/stripe/checkout.ts';
import stripeWebhookHandler from './api/stripe/webhook.ts';
import brainChatHandler from './api/brain/chat.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// Stripe Webhook needs the raw body to verify signatures
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhookHandler);

app.use(express.json());

// Map the API routes
app.post('/api/stripe/checkout', stripeCheckoutHandler);
app.post('/api/workbench/analyze', analyzeHandler);
app.post('/api/workbench/chat', chatHandler);
app.post('/api/crm/contact', contactHandler);
app.get('/api/crm/opportunities', opportunitiesHandler);
app.get('/api/crm/conversations', conversationsHandler);
app.get('/api/connect/install', installHandler);
app.get('/api/connect/callback', callbackHandler);
app.post('/api/connect/provision', provisionHandler);
app.post('/api/demo-agent/start-call', startCallHandler);
app.post('/api/ghl/custom-values', customValuesHandler);
app.post('/api/vapi/inbound', vapiInboundHandler);
app.post('/api/vapi/functions', vapiFunctionsHandler);
app.get('/api/knowledge', knowledgeHandler);
app.post('/api/knowledge', knowledgeHandler);
app.get('/api/ghl/snapshots', snapshotsHandler);
app.post('/api/ghl/snapshots', snapshotsHandler);
app.put('/api/ghl/snapshots', snapshotsHandler);
app.delete('/api/ghl/snapshots', snapshotsHandler);
app.post('/api/ghl/snapshots/push', pushSnapshotToGHL);
app.get('/api/website/intake', websiteIntakeHandler);
app.post('/api/website/intake', websiteIntakeHandler);
app.get('/api/website/requests', websiteRequestsHandler);
app.get('/api/ghl/feature-flags', featureFlagsHandler);
app.post('/api/ai/niche-blueprint', nicheBlueprintHandler);
app.get('/api/ghl/chat-widget', chatWidgetHandler);
app.post('/api/brain/chat', brainChatHandler);

// Map the dynamic results route
app.get('/api/results/:id', (req, res) => {
  // Inject the Express param into req.query so the handler finds it
  req.query = { ...req.query, id: req.params.id };
  return resultsHandler(req, res);
});

// Serve static standalone sales pages without .html extension
app.get('/smart-start', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'smart-start', 'index.html')));
app.get('/business-audit', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'business-audit', 'index.html')));
app.get('/ai-receptionist', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'ai-receptionist', 'index.html')));
app.get('/promo1', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'promo1.html')));

// Serve static frontend files from Vite's build output
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback - anything else serves index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node/Express Server listening on port ${PORT}`);
});
