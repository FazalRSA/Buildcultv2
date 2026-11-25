# What to do next to iterate

This document is a practical, step-by-step checklist to help you pick up development on the Build Cult website and start iterating again. It assumes the repo's default branch is `main` and that you have Node.js (v18+) and npm installed.

## Quick summary
Get the code running, make one small visible change, open a focused PR, and iterate in small steps. Use branches for every task and add CI/preview deploys as you go to reduce friction.

## Prerequisites
- Node.js v18 or higher
- npm (or pnpm)
- Git access to this repository

## Short commands (from a fresh clone)
```bash
git fetch origin
git checkout main
git pull
git switch -c feat/resume-work
npm install
npm run lint    # quick typecheck
npm run dev
# open http://localhost:3000
```

## Step-by-step plan
1) Sync the repo and create a working branch (5–10 minutes)
- Fetch and update main, create a feature branch:
  ```bash
  git fetch origin
  git checkout main
  git pull
  git switch -c feat/resume-work
  ```
- Reason: keeps work isolated and ready for PRs.

2) Install deps and run a local smoke test (5–15 minutes)
- Install and start dev server:
  ```bash
  npm install
  npm run lint      # tsc --noEmit (quick health check)
  npm run dev
  ```
- Open http://localhost:3000 and confirm Home, Services, Podcast, and a project detail (e.g. /project/cyber-shell) load.

3) Explore the running app and code (15–30 minutes)
- Files to read: `src/App.tsx`, `src/constants.ts`, `src/components/*`, `src/index.css`, `package.json`.
- Confirm where content lives (`src/constants.ts`) and where routing is (`src/App.tsx`).

4) Make a small, quick first change (20–60 minutes)
- Pick one small, visible change (add/update a project in `src/constants.ts`, tweak Hero copy or marquee text in `src/components/Home.tsx`).
- Implement on your branch, run the dev server to confirm.
- Commit using a descriptive message:
  ```bash
  git add .
  git commit -m "feat: update/add project content"
  ```

5) Open a Pull Request and use a lightweight PR template (10–20 minutes)
- Push branch and open a PR. Include:
  - What changed and why
  - How to test locally (commands + pages to click through)
  - Short checklist: dev server runs, lint passes, visual checks
- Example PR description checklist:
  - [ ] npm run dev starts
  - [ ] visual check on Home and Project pages
  - [ ] npm run lint passes

6) Deploy a preview (optional, recommended)
- Enable preview builds in Vercel or Cloudflare Pages so each branch/PR gets a public preview URL.
- Example minimal `vercel.json` for SPA rewrites (put at repo root):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
- This prevents 404s for client-side routes when deployed.

7) Pick the next scoped item and iterate (repeatable)
- Prioritize: content → small UI polish → accessibility fixes → new feature (contact form/analytics) → infra (CI, preview deploys).
- Always create a branch per task and open a PR.

8) Add guardrails and automation (medium term, 1–3 days)
- Add a GitHub Actions CI workflow to run typecheck and build on PRs.
- Consider adding ESLint/Prettier and pre-commit hooks (husky) for consistent code style.

9) Maintenance and improvements (ongoing)
- Regularly update dependencies, run `npm audit`, and add tests for critical components if desired.

## Concrete initial tasks you can do right now
1. Content tweak — Add/update a project in `src/constants.ts` (5–20 minutes)
   - Add a new object to `PROJECTS` or edit an existing one; the change shows up on Home and ProjectDetail.

2. Add SPA rewrite config for Vercel (5–10 minutes)
   - Add `vercel.json` shown above to repo root so client-side routes work on deploy.

3. Quick CI — Validate typecheck & build in GitHub Actions (30–90 minutes)
   - Create `.github/workflows/ci.yml` to run `npm install`, `npm run lint`, and `npm run build` on PRs.

## Branching & PR conventions (suggested)
- Branch names: `feat/<short-desc>`, `fix/<short-desc>`, `chore/<short-desc>`
- Commit messages: use a short conventional prefix (`feat:`, `fix:`, `chore:`)
- PR description: what changed, why, how to test, checklist, screenshots if helpful

## Local checklist before opening PR
- `npm run dev` works and pages load
- `npm run lint` returns no new errors
- Visual check across desktop/mobile widths
- Add brief testing steps in the PR description

## Estimates & cadence
- Restore dev environment: 30–60 minutes
- First content change + PR: 20–60 minutes
- Small infra/config change (vercel.json, CI): 30–90 minutes
- Suggested cadence: small, frequent PRs (1–3 small PRs/day or 3–5/week)

## What I can do next for you
Tell me which initial task you'd like me to implement (for example: "Add vercel.json", "Add a new project entry to src/constants.ts", or "Add a CI workflow") and I'll create the branch and open the change with a suggested PR description.
