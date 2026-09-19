# halfbuilt

## Dev Setup
1. Install uv: https://docs.astral.sh/uv/getting-started/installation/
2. `uv sync`
3. `uv run pre-commit install` to enable git hooks (formatting, linting)
4. `uv run pytest` to verify

Adding a dependency: `uv add <package>` (or `uv add --dev <package>` for dev-only tools), then commit the updated `pyproject.toml` and `uv.lock`.

## Frontend Setup

The `frontend/` app is a Vite + React + TypeScript project.

1. Install npm: comes bundled with [Node.js](https://nodejs.org/)
2. `cd frontend && npm install`
3. `npm run dev` to start the dev server

Adding a dependency: `npm install <package>` (or `npm install -D <package>` for dev-only tools), then commit the updated `package.json` and `package-lock.json`.
