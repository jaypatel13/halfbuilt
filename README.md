# halfbuilt

## Dev Setup
1. Install uv: https://docs.astral.sh/uv/getting-started/installation/
2. `uv sync`
3. `uv run pre-commit install` to enable git hooks (formatting, linting, commit message check)
4. `uv run pytest` to verify

Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): subject`, e.g. `feat(backend): add health endpoint`. Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

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
   - golangci-lint: linter runner (includes staticcheck, errcheck, etc.), the same one CI runs. Pinned to v2.13 to match CI. It isn't installed with `go install` (upstream doesn't support that), use the install script:
     ```sh
     curl -sSfL https://golangci-lint.run/install.sh | sh -s -- -b "$(go env GOPATH)/bin" v2.13.2
     ```
   - `go install mvdan.cc/gofumpt@latest`: code formatter, a stricter `gofmt`, runs on save
   - `go install github.com/go-delve/delve/cmd/dlv@latest`: debugger (breakpoints, stepping) used by VS Code's Run and Debug
3. Add Go's bin directory to your `PATH` so the tools are found (VS Code and your shell both need this):
   ```sh
   echo 'export PATH="$PATH:$(go env GOPATH)/bin"' >> ~/.zshrc && source ~/.zshrc
   ```
4. `cd backend && go run .` to start the app
5. `cd backend && golangci-lint run` to lint (same check as CI)

## Docker

Both apps can be run in containers with Docker Compose. Each app has its own `Dockerfile`, and [compose.yaml](compose.yaml) ties them together. Docker is the only requirement; Node.js and Go are not needed on the host.

1. Install [Docker](https://docs.docker.com/get-docker/) with Docker Compose
2. `docker compose up --build` to build the images and start both services
3. The frontend is on http://localhost:5173 and the backend on http://localhost:8080
4. `docker compose down` to stop and remove the containers

| Service    | Build                                                  | Port |
| ---------- | ------------------------------------------------------ | ---- |
| `backend`  | `backend/Dockerfile`: multi-stage Go build, distroless | 8080 |
| `frontend` | `frontend/Dockerfile`: Node 22 running the Vite dev server | 5173 |

- The frontend mounts `./frontend` into the container, so source changes hot reload without a rebuild.
- Backend changes and dependency changes (`go.mod`, `package.json`) need a rebuild: `docker compose up --build`.
- Run a single service with `docker compose up <service>`; follow logs with `docker compose logs -f <service>`.
