# UET GPA Calculator

A simple, responsive GPA/CGPA calculator built with Next.js (App Router) and TypeScript. Enter subjects per semester, compute semester GPAs and overall CGPA, and save calculations to your account (Clerk auth + MongoDB persistence).

## Features
- Add/remove semesters and subjects
- Calculate semester GPA and overall CGPA (client-side)
- Save calculation history to MongoDB (per-user, via Clerk authentication)
- Local fallback/history in localStorage
- Built with Tailwind CSS, Radix UI primitives, and SweetAlert2 for interactive prompts

## Quickstart (development)
1. Clone and install:
```bash
git clone https://github.com/<your-org>/ScoreStream.git
cd ScoreStream
npm install
```

2. Environment variables
Create a `.env.local` file in the project root and provide the following (replace placeholders with real values):
```
MONGODB_URI="your-mongodb-connection-string"
# Clerk / Auth (examples — replace with your actual Clerk config keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
# Any other Clerk env vars required by your Clerk setup
```

3. Run the app:
```bash
npm run dev
# then open http://localhost:3000
```

## Production
Build and start:
```bash
npm run build
npm run start
```
Deploy on Vercel or any platform that supports Next.js; be sure to set the same environment variables in your deployment settings.

## Project structure
- `app/` — Next.js App Router pages & API folders (layout.tsx, page.tsx, globals.css)
- `components/` — UI components (Calculator, Semester, Subject, NavBar, Footer)
- `models/` — Mongoose model(s) for persistence (models/Calculation.ts)
- `public/` — static assets (favicon)
- `lib/` — utilities/helpers
- `package.json` — scripts and dependencies

## Persistence & Authentication
- Mongoose model: `models/Calculation.ts` (stores userId, semesters, result, timestamps)
- Authentication: uses Clerk (`@clerk/nextjs`) to identify the logged-in user when saving calculations
- API: the client POSTs to `/api/saveCalculation` to persist results — ensure your server connects to MongoDB using `MONGODB_URI`.

## Usage
- Open the app and add semesters/subjects.
- Fill subject name, credit hours, and choose letter grade.
- Click "Calculate GPA/CGPA" to compute results.
- Sign in (Clerk) and "Save Calculation" to persist to your account.
- Use "Saved Calculations History" to view local saved entries or clear history.

## Contributing
Contributions welcome. Please open an issue or PR with a clear description and tests if applicable.

## License
Specify a license (add LICENSE file) — e.g., MIT
