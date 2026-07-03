import fs from 'fs';
import path from 'path';

// Note: Ensure you have `csv-parse` and `csv-stringify` installed or run this script after `npm install csv-parse csv-stringify`
// This script simulates enriching raw lead data (e.g., from scraping) and categorizing them for GHL Outreach

interface RawLead {
  company_name: string;
  website: string;
  phone: string;
  email: string;
}

interface EnrichedLead extends RawLead {
  industry: string;
  tier_recommendation: 'Starter' | 'Growth' | 'Pro';
  has_website: boolean;
  needs_ai_receptionist: boolean;
}

// Simple heuristic for enrichment without hitting LLM APIs for cost efficiency
function enrichLead(lead: RawLead): EnrichedLead {
  const name = lead.company_name.toLowerCase();
  let industry = 'Other';
  let tier_recommendation: 'Starter' | 'Growth' | 'Pro' = 'Starter';
  let needs_ai_receptionist = true;

  // 1. Categorize Industry
  if (name.includes('plumbing') || name.includes('hvac') || name.includes('electric')) {
    industry = 'Home Services';
  } else if (name.includes('auto') || name.includes('motors') || name.includes('repair')) {
    industry = 'Automotive';
  } else if (name.includes('real estate') || name.includes('realty') || name.includes('homes')) {
    industry = 'Real Estate';
    tier_recommendation = 'Growth';
  } else if (name.includes('dental') || name.includes('medical') || name.includes('clinic')) {
    industry = 'Dental & Medical';
    tier_recommendation = 'Pro';
  } else if (name.includes('hotel') || name.includes('resort') || name.includes('inn')) {
    industry = 'Hospitality';
    tier_recommendation = 'Pro';
  }

  const has_website = lead.website !== '' && lead.website !== 'N/A';

  return {
    ...lead,
    industry,
    tier_recommendation,
    has_website,
    needs_ai_receptionist,
  };
}

async function runEnrichment() {
  const inputPath = path.resolve(process.cwd(), 'data/raw_leads.csv');
  const outputPath = path.resolve(process.cwd(), 'data/enriched_leads.json');

  console.log('--- NWS Lead Enrichment Engine ---');
  
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found at ${inputPath}`);
    console.log('Generating dummy data instead...');
    
    // Generate dummy data if no CSV exists
    const dummyData: RawLead[] = [
      { company_name: "Smith's Plumbing & Heating", website: "", phone: "555-0101", email: "info@smithsplumbing.xyz" },
      { company_name: "Oceanview Dental Clinic", website: "https://oceanviewdental.mock", phone: "555-0102", email: "contact@oceanviewdental.mock" },
      { company_name: "Caribbean Realty Pros", website: "https://caribrealty.mock", phone: "555-0103", email: "sales@caribrealty.mock" }
    ];

    const enriched = dummyData.map(enrichLead);
    
    const outDir = path.dirname(outputPath);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(enriched, null, 2));
    console.log(`Generated and enriched ${enriched.length} dummy leads.`);
    console.log(`Output saved to ${outputPath}`);
    console.log('To import into GoHighLevel, use the GHL API /contacts endpoint or GHL Bulk Import.');
    return;
  }

  // If you had a real CSV parsing logic, it would go here.
}

runEnrichment().catch(console.error);
