# NWS Business OS

The **NWS Business OS** is the custom, headless React frontend interface built for Novelty Web Solutions (NWS). It allows agency clients to interact with the underlying GoHighLevel (GHL) infrastructure without needing to log directly into the native, complex GHL dashboard.

## Platform Architecture

To prevent confusion, the following definitions strictly apply:
- **NWS (Novelty Web Solutions)**: The agency built directly on GoHighLevel (GHL).
- **Businesses OS (This codebase)**: A custom frontend interface that allows users to interact with the NWS/GHL platform. Deployed at `businessesos.com`.
- **TicketFlows**: A **standalone app**, separate from the core NWS agency infrastructure. (Do not confuse TicketFlows with the GHL white-label dashboard).

## Architectural Philosophy: Frontend Simplicity
This application follows a strict **frontend simplicity** rule: 
- Do not overcomplicate the frontend. 
- All complex logic (data processing, ad management, deep AI analysis, reputation management engines) must be handled by backend systems.
- The frontend (this React application) remains a clean, efficient presentation layer designed to fetch data via APIs and display it beautifully.

## Major Integrations (Completed)
- **Training Hub (Launchpad)**: Fully interactive client onboarding checklist mapped to `localStorage` client IDs, featuring embedded masterclass videos.
- **Growth Hub**: Fetches live marketing campaign data and social media post analytics using the GoHighLevel V2 API.
- **Overview Hub**: Maps live GHL metrics (`leads`, `appointments`, `revenue`) and pulls the 5 most recent conversations (SMS/Email/WhatsApp) directly into the dashboard. Features simulated AI insights (teaser) to maintain frontend simplicity.
- **SSO Integration**: An endpoint `/api/auth/sso` exists to securely authenticate users arriving from Custom Menu Links inside GoHighLevel or other standalone apps (like TicketFlows), instantly loading their custom dashboard.

## Deployment
This application is deployed via **Dokploy**. 
- Always ensure the `dist` folder is removed from git tracking (`git rm -r --cached dist`) before deploying, or Nixpacks will serve stale cached assets instead of building the new code.
