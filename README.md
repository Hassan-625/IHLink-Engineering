# IHLink Engineering

Standalone engineering-services platform covering control, robotics, networking, instrumentation and related technical delivery.

## Platform role

- **Platform key:** `engineering`
- **Frontend:** standalone repository
- **Backend:** shared IHLink Supabase project
- **Administration:** IHLink Command Center
- **Deployment:** Vercel

## Core capabilities

- Engineering project requests and portfolio tracking
- Site assessments and proposals
- Milestones and project execution
- Equipment and BOQ records
- Drawings and engineering documents
- Testing and commissioning
- Field reports, maintenance, risks and change requests
- Invoices, payments and support

## Architecture

The customer Dashboard summarizes project status while Operations contains detailed execution records. Engineering documents and drawings are private and accessed through controlled signed URLs.

The platform uses shared IHLink authentication and backend services while retaining platform-specific customer routes, data authorization and operational workflows.

## Technology

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Supabase
- Vercel

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

When configured in the repository, also run `npm run typecheck` and `npm run lint` before release.

## Environment and secrets

Public client configuration is supplied through environment variables, including the Supabase project URL and anonymous client key. Platform-origin variables may also be used for IHLink cross-platform handoff.

Never commit payment-provider credentials, service-role keys, webhook secrets, private API keys or production credentials.

## Payments and protected operations

Payment initiation may occur from the client experience, but settlement/finalization and other privileged state transitions must be verified server-side. The shared IHLink payment ledger and platform-specific records are authoritative only after verified settlement.

## IHLink ecosystem integration

This repository is a standalone customer-facing platform connected to the shared IHLink backend and Command Center. Platform access is authorization-specific and is not automatically inherited from another IHLink service.

## Deployment

Production is deployed through the IHLink Vercel team. Verify the production deployment, routing and required environment variables after each release.

## Ownership

**IHLink Co. Ltd.**  
Copyright © 2026 IHLink Co. Ltd. All rights reserved.
