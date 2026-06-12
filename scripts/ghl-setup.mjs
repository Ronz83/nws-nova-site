/**
 * NWS GHL One-Time Setup Script
 * ─────────────────────────────
 * Run this ONCE to create the 5 custom fields in GHL and retrieve
 * your pipeline, stage, and workflow IDs.
 *
 * Usage (PowerShell):
 *   $env:GHL_PRIVATE_KEY="your_token_here"
 *   $env:GHL_LOCATION_ID="your_location_id_here"
 *   node scripts/ghl-setup.mjs
 *
 * OR create a file called .env.setup in the project root:
 *   GHL_PRIVATE_KEY=your_token_here
 *   GHL_LOCATION_ID=your_location_id_here
 * Then run: node scripts/ghl-setup.mjs
 */

import { readFileSync, existsSync } from 'fs';

// ── Load from .env.setup if it exists ─────────────────────────
if (existsSync('.env.setup')) {
  const lines = readFileSync('.env.setup', 'utf8').split('\n');
  for (const line of lines) {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  }
}

const TOKEN       = process.env.GHL_PRIVATE_KEY;
const LOCATION_ID = process.env.GHL_LOCATION_ID;
const BASE        = 'https://services.leadconnectorhq.com';

const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
  Version: '2021-07-28',
};

// ── Helpers ────────────────────────────────────────────────────
function log(msg) { console.log(msg); }
function section(title) { log(`\n${'═'.repeat(55)}\n  ${title}\n${'═'.repeat(55)}`); }
function ok(label, value) { log(`  ✅  ${label.padEnd(30)} ${value}`); }
function info(label, value) { log(`  ℹ️   ${label.padEnd(30)} ${value}`); }
function warn(msg) { log(`  ⚠️   ${msg}`); }

async function ghl(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: HEADERS,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  try {
    return { ok: res.ok, status: res.status, data: JSON.parse(text) };
  } catch {
    return { ok: res.ok, status: res.status, data: text };
  }
}

// ── Validate ───────────────────────────────────────────────────
if (!TOKEN || !LOCATION_ID) {
  console.error('\n❌  GHL_PRIVATE_KEY and GHL_LOCATION_ID must be set.\n');
  console.error('    $env:GHL_PRIVATE_KEY="your_token"');
  console.error('    $env:GHL_LOCATION_ID="your_location_id"');
  console.error('    node scripts/ghl-setup.mjs\n');
  process.exit(1);
}

// ── Custom Field Definitions ───────────────────────────────────
const CUSTOM_FIELDS = [
  {
    key: 'GHL_CF_CHALLENGE',
    name: 'Business Challenge',
    dataType: 'SINGLE_OPTION',
    options: [
      'losing-leads',
      'slow-followup',
      'manual-processes',
      'no-booking',
      'bad-reputation',
      'cant-scale',
    ],
  },
  {
    key: 'GHL_CF_TITLE',
    name: 'Job Title',
    dataType: 'TEXT',
  },
  {
    key: 'GHL_CF_TEAM_SIZE',
    name: 'Team Size',
    dataType: 'SINGLE_OPTION',
    options: ['solo', '2-10', '11-50', '50-plus'],
  },
  {
    key: 'GHL_CF_INDUSTRY',
    name: 'Industry',
    dataType: 'TEXT',
  },
  {
    key: 'GHL_CF_SCORE',
    name: 'Business Score',
    dataType: 'TEXT',
  },
];

// ── Main ───────────────────────────────────────────────────────
async function main() {
  section('NWS GHL Setup — Starting');
  log(`  Location ID : ${LOCATION_ID}`);
  log(`  Token       : ${TOKEN.substring(0, 12)}••••••••••••`);

  // 1. Check existing custom fields to avoid duplicates
  section('Step 1 — Checking Existing Custom Fields');
  const existingRes = await ghl('GET', `/locations/${LOCATION_ID}/customFields`);
  if (!existingRes.ok) {
    console.error('❌  Failed to fetch existing custom fields:', existingRes.data);
    process.exit(1);
  }
  const existingFields = existingRes.data.customFields ?? [];
  const existingByName = Object.fromEntries(existingFields.map(f => [f.name, f]));
  log(`  Found ${existingFields.length} existing custom field(s).`);

  // 2. Create missing custom fields
  section('Step 2 — Creating Custom Fields');
  const createdFieldIds = {};

  for (const field of CUSTOM_FIELDS) {
    if (existingByName[field.name]) {
      ok(`${field.name} (already exists)`, existingByName[field.name].id);
      createdFieldIds[field.key] = existingByName[field.name].id;
      continue;
    }

    const body = {
      name: field.name,
      dataType: field.dataType,
      model: 'contact',
      ...(field.options ? { options: field.options.map(o => ({ label: o, value: o })) } : {}),
    };

    const res = await ghl('POST', `/locations/${LOCATION_ID}/customFields`, body);
    if (res.ok && res.data.customField?.id) {
      ok(`${field.name} (created)`, res.data.customField.id);
      createdFieldIds[field.key] = res.data.customField.id;
    } else {
      warn(`Failed to create "${field.name}": ${JSON.stringify(res.data)}`);
    }
  }

  // 3. List Pipelines
  section('Step 3 — Your GHL Pipelines');
  const pipelinesRes = await ghl('GET', `/opportunities/pipelines?locationId=${LOCATION_ID}`);
  if (!pipelinesRes.ok) {
    warn('Could not fetch pipelines: ' + JSON.stringify(pipelinesRes.data));
  } else {
    const pipelines = pipelinesRes.data.pipelines ?? [];
    if (pipelines.length === 0) {
      warn('No pipelines found. Create a "Hot Leads" pipeline in GHL → Opportunities → Pipelines.');
    } else {
      for (const pipeline of pipelines) {
        log(`\n  📊  Pipeline: "${pipeline.name}"`);
        info('Pipeline ID', pipeline.id);
        const stages = pipeline.stages ?? [];
        for (const stage of stages) {
          info(`  Stage: "${stage.name}"`, stage.id);
        }
      }
    }
  }

  // 4. List Workflows
  section('Step 4 — Your GHL Workflows');
  const workflowsRes = await ghl('GET', `/workflows/?locationId=${LOCATION_ID}`);
  if (!workflowsRes.ok) {
    warn('Could not fetch workflows: ' + JSON.stringify(workflowsRes.data));
  } else {
    const workflows = workflowsRes.data.workflows ?? [];
    if (workflows.length === 0) {
      warn('No workflows found. Create a "Survey Lead Nurture" workflow in GHL → Automation.');
    } else {
      for (const wf of workflows) {
        const status = wf.status === 'published' ? '🟢 published' : '⚪ draft';
        info(`"${wf.name}" [${status}]`, wf.id);
      }
    }
  }

  // 5. Print final env var block
  section('Step 5 — Add These to Vercel Environment Variables');
  log('');
  log('  Copy the block below into Vercel → Project Settings → Environment Variables');
  log('  (Paste GHL_CF_* values from Step 2 above, and Pipeline/Workflow IDs from Steps 3–4)\n');

  log('  ┌─────────────────────────────────────────────────────┐');
  log('  │  Variable               │  Value                    │');
  log('  ├─────────────────────────────────────────────────────┤');

  for (const [key, id] of Object.entries(createdFieldIds)) {
    log(`  │  ${key.padEnd(25)}│  ${id}  │`);
  }

  log('  │  GHL_PIPELINE_ID        │  ← from Step 3 above     │');
  log('  │  GHL_STAGE_HOT_LEAD_ID  │  ← stage ID from Step 3  │');
  log('  │  GHL_WORKFLOW_ID        │  ← from Step 4 above     │');
  log('  └─────────────────────────────────────────────────────┘');

  log('\n  ✅  Setup complete. Once Vercel vars are set, approve the plan to begin coding.\n');
}

main().catch(err => {
  console.error('\n❌  Unexpected error:', err.message);
  process.exit(1);
});
