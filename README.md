# AI Inference Orchestrator

Implementation skeleton and architecture for a static Next.js client-side orchestration app.

## Blocker
This environment cannot install npm packages from npm registry (HTTP 403), so Next.js dependencies cannot be fetched. The repository therefore includes full source code structure and modules, but build/test commands requiring package install cannot run here.


## GitHub Pages CI/CD
Use `.github/workflows/deploy-pages.yml` to build and deploy static export output (`out/`) to GitHub Pages on pushes to `main`. It sets `NEXT_PUBLIC_BASE_PATH` to `/<repo-name>` for project pages compatibility.


### Why builds might not appear
- If your repo has never had Pages configured, workflow uses `actions/configure-pages` with `enablement: true` to auto-enable it.
- GitHub Actions only runs after **pushes to GitHub** (local commits alone do not trigger workflows).
- Pages deployment only runs from the repository default branch in this workflow.
- Repository Settings must have **Actions enabled** and **Pages source set to GitHub Actions**.

This workflow now builds on every pushed commit (all branches) and automatically deploys the latest default-branch commit to GitHub Pages.


CI note: `package-lock.json` is committed so `npm ci` works in GitHub Actions.
