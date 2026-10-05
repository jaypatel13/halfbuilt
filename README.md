# halfbuilt

## Dev Setup
1. Install uv: https://docs.astral.sh/uv/getting-started/installation/
2. `uv sync`
3. `uv run pre-commit install` to enable git hooks (formatting, linting, commit message check)
4. `uv run pytest` to verify

## Commit Messages

Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): subject`, e.g. `feat(backend): add health endpoint`. The pre-commit hook rejects messages with a type outside the list below.

### Types

| Type | Use it for | Example |
|---|---|---|
| `feat` | A new user-facing feature or capability | `feat(frontend): add landing page hero` |
| `fix` | A bug fix | `fix(backend): return 404 for unknown routes` |
| `docs` | Documentation only (README, comments, `_documentation/`) | `docs: explain commit types` |
| `style` | Formatting or whitespace changes that don't alter behaviour (not visual/CSS changes, which are `feat` or `fix`) | `style(backend): run gofumpt` |
| `refactor` | Restructuring code without changing behaviour | `refactor(frontend): split App into layout components` |
| `perf` | A change that improves performance | `perf(frontend): lazy-load route bundles` |
| `test` | Adding or fixing tests | `test(backend): cover health endpoint` |
| `build` | Build system or dependency changes (Dockerfile, `package.json`, `pyproject.toml`, `go.mod`) | `build(docker): dockerize the frontend` |
| `ci` | CI/CD pipeline and GitHub Actions changes | `ci(review): re-run on every push` |
| `chore` | Maintenance that doesn't fit elsewhere (tooling config, editor settings, housekeeping) | `chore(frontend): add tailwindcss and motion` |
| `revert` | Reverting an earlier commit | `revert: feat(frontend): add landing page hero` |

If a commit fits two types, pick the one that describes the main intent. Add `!` after the type or scope for a breaking change, e.g. `feat(backend)!: rename health endpoint`.

### Scopes

The scope says which part of the repo changed. It's optional, and the hook doesn't enforce it, but use one of these so history stays consistent.

The list follows common industry practice: scopes name a *module or area of the codebase*, usually mirroring the top-level directories (as in Angular, which uses package names, and in monorepos, which use workspace names). Dependency bumps use `deps`, the default that Dependabot and Renovate emit. The scope never repeats the type, so there is no `ci(ci)`.

| Scope | Covers | Mirrors in this repo |
|---|---|---|
| `frontend` | The Vite + React app, Tailwind theme, components | `frontend/` |
| `backend` | The Go service | `backend/` |
| `deps` | Dependency updates, always with type `build` | `package.json`, `go.mod`, `pyproject.toml`, lockfiles |
| `docker` | Dockerfiles and compose | `*/Dockerfile`, `compose*.yaml` |
| `infra` | Deployment and infrastructure config | `infra/` |
| `tooling` | Linters, formatters, pre-commit, editor and repo config | `.pre-commit-config.yaml`, `.prettierrc`, `.vscode/`, `eslint.config.js` |
| `review` / `lint` | Name the GitHub Actions workflow, with type `ci` | `.github/workflows/claude-review.yaml`, `lint.yaml` |

Examples: `build(deps): bump vite to 7.1`, `build(docker): add frontend healthcheck`, `ci(review): re-run on every push`, `chore(tooling): recommend tailwind extension`.

Omit the scope when a change spans several areas or none of these fit, e.g. `docs: update setup steps`.

Older history used `project`, `workflow` and `deployment`. Those are retired: drop the scope for repo-wide changes, use `ci(<workflow>)` for workflows and `docker` or `infra` for deployment.

### Rules of thumb

- Subject line: imperative mood ("add", not "added"), lowercase, no trailing period.
- One logical change per commit.
- Put the details in the body, separated from the subject by a blank line.

Adding a dependency: `uv add <package>` (or `uv add --dev <package>` for dev-only tools), then commit the updated `pyproject.toml` and `uv.lock`.

## Frontend Setup

The `frontend/` app is a Vite + React + TypeScript project.

1. Install npm: comes bundled with [Node.js](https://nodejs.org/)
2. `cd frontend && npm install`
3. `npm run dev` to start the dev server
4. Install the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) VS Code extension (`bradlc.vscode-tailwindcss`). It adds autocomplete for Tailwind classes and theme tokens, and stops the editor flagging `@theme` in `index.css` as an unknown at-rule.

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

Both apps run in containers with Docker Compose. Docker is the only requirement; Node.js and Go are not needed on the host.

| File | Purpose |
| --- | --- |
| [compose.yaml](compose.yaml) | Development: builds both services from source, with hot reload. The default file, so a plain `docker compose` command uses it |
| [compose.prod.yaml](compose.prod.yaml) | Production: runs the published images behind [Caddy](https://caddyserver.com/), with automatic HTTPS. Self-contained, passed with `-f` |

### Development

1. Install [Docker](https://docs.docker.com/get-docker/) with Docker Compose
2. `docker compose up --build` to start both services
3. The frontend is on http://localhost:5173 and the backend on http://localhost:8080
4. `docker compose down` to stop and remove the containers

Caddy doesn't run in dev. The Vite dev server proxies `/api/*` to the backend instead (see `server.proxy` in [vite.config.ts](frontend/vite.config.ts)), so the frontend can call relative `/api/...` URLs in both dev and production.

Each service can be run on its own:

- **Backend only:** `docker compose up backend`, then call it directly, e.g. `curl localhost:8080/healthz`.
- **Frontend on the host:** run `docker compose up backend`, then `cd frontend && npm run dev`. The proxy defaults to `localhost:8080`.
- **Both in containers:** `docker compose up`. The frontend mounts `./frontend`, so source changes hot reload without a rebuild.

Dev ports bind to `127.0.0.1` only, so they aren't reachable from your network. Backend changes and dependency changes (`go.mod`, `package.json`) need a rebuild, so add `--build`. Follow logs with `docker compose logs -f <service>`.

### Production

Production is deployed by releasing, not by pushing a branch.

1. Merge PRs to `main` as usual. [release-please](.github/workflows/release-please.yaml) keeps a release PR open that collects every unreleased change, works out the next version from the commit types (`feat` bumps minor, `fix` bumps patch, `!` bumps major), and updates `CHANGELOG.md` (created by the first release).
2. When you want to ship, merge the release PR. That creates the `vX.Y.Z` tag and a GitHub Release with the changelog, then runs [the build and deploy workflow](.github/workflows/build-and-deploy-docker-images.yaml).
3. The workflow builds both images and pushes them to GHCR as `ghcr.io/jaypatel13/halfbuilt-{frontend,backend}`, tagged with the version (`1.2.0`), `sha-<short commit>` and `latest`, then deploys that version to the VPS.

**Deployment history:** each release is a tag and a GitHub Release. Each deploy is recorded under the repo's Deployments → `production`.

**Rollback:** in the Actions tab, run *Build and Deploy Docker Images* with an earlier version, e.g. `v1.1.0`. It redeploys that release's existing images and its compose and Caddy config, without rebuilding.

**Manual deploy on the server:** the server only needs `compose.prod.yaml` and `infra/Caddyfile`, not the whole repo:

```sh
export TAG=1.2.0   # without it, latest is used
docker compose -f compose.prod.yaml pull
docker compose -f compose.prod.yaml up -d
```

The deploy job logs the server in to GHCR with the job's short-lived `GITHUB_TOKEN` and logs out when it finishes, so the server keeps no registry credentials. If the packages are private, a manual `pull` on the server needs `docker login ghcr.io` first, using a token with the `read:packages` scope.

- Caddy is the only service that publishes ports (80/443). It routes `/api/*` to the backend and everything else to the frontend.
- The frontend image is built from the `prod` target in [frontend/Dockerfile](frontend/Dockerfile): the built static files are served by Caddy's `file_server` inside the image, configured by [frontend/Caddyfile](frontend/Caddyfile).
- [infra/Caddyfile](infra/Caddyfile) requests a certificate for `halfbuilt.me`. That only succeeds when the domain's DNS points at the host.
- Backend routes the browser calls must live under `/api` (`router.Group("/api")`). Caddy forwards the path unchanged.
