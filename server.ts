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
app.get('/api/connect/install', adaptVercel(installHandler));
app.get('/api/connect/callback', adaptVercel(callbackHandler));
app.post('/api/connect/provision', adaptVercel(provisionHandler));
app.post('/api/demo-agent/start-call', adaptVercel(startCallHandler));

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
