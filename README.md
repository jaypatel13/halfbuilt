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

## Backend Setup

The `backend/` app is written in Go.

1. Install Go: https://go.dev/doc/install
2. Install dev tools (used by the VS Code Go extension):
   - `go install golang.org/x/tools/gopls@latest`: language server (autocomplete, go-to-definition, rename, inline errors)
   - `go install honnef.co/go/tools/cmd/staticcheck@latest`: linter that catches bugs and unused/deprecated code on save
   - `go install mvdan.cc/gofumpt@latest`: code formatter, a stricter `gofmt`, runs on save
   - `go install github.com/go-delve/delve/cmd/dlv@latest`: debugger (breakpoints, stepping) used by VS Code's Run and Debug
3. Add Go's bin directory to your `PATH` so the tools are found (VS Code and your shell both need this):
   ```sh
   echo 'export PATH="$PATH:$(go env GOPATH)/bin"' >> ~/.zshrc && source ~/.zshrc
   ```
4. `cd backend && go run .` to start the app
