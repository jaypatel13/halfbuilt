# Half-Built — Roadmap & Backlog

**Project:** halfbuilt.me
**Approach:** MVP-driven. Ship at the end of Week 2, iterate thereafter.
**Companion docs:** `half-built-architecture.md` (decisions), `half-built-learning-path.md` (what to learn, per ticket), `half-built-backlog.csv` (Jira import)

---

## Timeline at a glance

| Week | Phase | Outcome | Ships |
|---|---|---|---|
| 1 | Foundation + design identity | Repo, tooling, visual language, post #1 written | No |
| 2 | **MVP** | Live on halfbuilt.me with one real post, deployed by tag | **Yes** |
| 3 | Content engine | MDX, scrapbook components, blog index, projects page | Yes |
| 4 | Backend + release rigor | Go API, staging gate, semver, changelog, rollback | Yes |
| 5 | Test automation | Go tests, Vitest, Playwright, pytest-bdd acceptance | Yes |
| 5–6 | Hardening & ops | SSH, UFW, fail2ban, backups, monitoring | Yes |
| 6+ | Security & perf *(optional)* | k6, ZAP, Trivy, writeup post | Yes |
| 6 | Polish & launch | SEO, a11y, analytics, posts 2–3, v1.0.0 | Yes |

**Backlog size:** 10 epics, 81 stories and tasks.

---

## The MVP gate (end of Week 2)

Non-negotiable. If Week 2 ends without these, stop adding scope and finish them:

- [ ] `halfbuilt.me` live over HTTPS with a valid certificate
- [ ] Homepage with *your* typography and colour, not Tailwind defaults
- [ ] One real post you'd be happy for a hiring manager to read
- [ ] `git tag v0.1.0 && git push --tags` deploys it with no manual SSH
- [ ] README explaining the architecture

> Everything after Week 2 is iteration on a live thing. That is a dramatically better psychological position than iterating on localhost.

---

## Epic 1 — Foundation & Repo Hygiene  *(Issue Id 1)*

*Phase 0 — Week 1. Establish the repository, tooling, conventions, and guardrails that every later phase depends on. Nothing ships in this epic; it exists so that everything after it is cheap.*

| ID | Type | Summary | Priority | Est |
|---|---|---|---|---|
| 2 | Task | Create GitHub repo and baseline structure | Highest | 1h |
| 3 | Task | Adopt Conventional Commits and enforce it | High | 1h |
| 4 | Task | Set up branch protection on main | High | 30m |
| 5 | Task | Add gitleaks pre-commit hook and enable GitHub secret scanning | Highest | 45m |
| 6 | Task | Scaffold Vite + React + TypeScript in /web | Highest | 1h |
| 7 | Task | Scaffold Go module in /api with chi router and /healthz | High | 1.5h |
| 8 | Task | Configure ESLint, Prettier, and golangci-lint | Medium | 1.5h |
| 9 | Story | As a developer I want one command to run the whole stack locally | Medium | 1h |
| 10 | Task | Write CI skeleton workflow (lint + typecheck only) | High | 1.5h |
| 11 | Task | Write CLAUDE.md defining Claude Code's reviewer role | Medium | 30m |

## Epic 2 — Design System & Visual Identity  *(Issue Id 12)*

*Phase 0/1 — Week 1. Define the visual language before building components. This is the epic that determines whether the site reads as 'yours' or as 'a Tailwind site'.*

| ID | Type | Summary | Priority | Est |
|---|---|---|---|---|
| 13 | Task | Install and configure Tailwind | Highest | 1h |
| 14 | Story | As a visitor I want the site to have a distinct visual identity | Highest | 3h |
| 15 | Task | Self-host webfonts and set up the type scale | High | 1.5h |
| 16 | Task | Build layout primitives: Container, Stack, Prose | High | 2h |
| 17 | Task | Build site shell: header, nav, footer | High | 2.5h |
| 18 | Task | Implement dark mode via CSS variables | Low | 1.5h |

## Epic 3 — MVP Deployment  *(Issue Id 19)*

*Phase 1 — Week 2 — SHIPS. Get something real, public, and good-looking onto halfbuilt.me deployed by a pipeline. The bar is deliberately low. This is the most important epic in the project because everything after it is iteration on a live thing.*

| ID | Type | Summary | Priority | Est |
|---|---|---|---|---|
| 20 | Task | Point halfbuilt.me DNS at the VPS | Highest | 30m |
| 21 | Task | Install Docker and Docker Compose on the VPS | Highest | 1h |
| 22 | Task | Write multi-stage Dockerfile for the web build | Highest | 1.5h |
| 23 | Task | Write docker-compose.yml and Caddyfile for production | Highest | 2h |
| 24 | Story | As the site owner I want to deploy by pushing a git tag | Highest | 3h |
| 25 | Task | Register a self-hosted GitHub Actions runner on the VPS | High | 1h |
| 26 | Story | As a visitor I want to read a real post on the homepage | Highest | 3h |
| 27 | Task | Tag and ship v0.1.0 | Highest | 1h |

## Epic 4 — Content Engine  *(Issue Id 28)*

*Phase 2 — Week 3 — SHIPS. Turn the hardcoded page into a real content system that supports rich, interactive, scrapbook-style posts.*

| ID | Type | Summary | Priority | Est |
|---|---|---|---|---|
| 29 | Task | Integrate MDX into the Vite build | Highest | 2h |
| 30 | Task | Set up frontmatter parsing and a post index | High | 2h |
| 31 | Story | As a visitor I want a blog index with filtering by tag | High | 2.5h |
| 32 | Story | As a writer I want an image gallery component I can drop into any post | High | 3h |
| 33 | Story | As a writer I want to embed video in a post | Medium | 2h |
| 34 | Story | As a writer I want scroll-triggered animation in posts | Medium | 2.5h |
| 35 | Task | Build Callout, Figure, and CodeBlock components | Medium | 2.5h |
| 36 | Task | Add RSS feed generation | Low | 1h |
| 37 | Story | As a visitor I want a projects page showcasing my work | High | 3h |

## Epic 5 — Go Backend & API  *(Issue Id 38)*

*Phase 3 — Week 4 — SHIPS. Add the second deployable unit. Small in scope, deliberately — the API earns its place through the contact form and health endpoints, not through inventing work for itself.*

| ID | Type | Summary | Priority | Est |
|---|---|---|---|---|
| 39 | Task | Set up SQLite with migrations | High | 2h |
| 40 | Story | As a visitor I want to send a message through a contact form | High | 3h |
| 41 | Task | Add rate limiting and spam protection to the contact endpoint | High | 2h |
| 42 | Task | Add structured logging with log/slog | Medium | 1.5h |
| 43 | Task | Add /readyz and expand /healthz to check the database | High | 1h |
| 44 | Task | Containerize the API and add it to Compose | High | 2h |
| 45 | Task | Document the API with an OpenAPI spec | Low | 1.5h |

## Epic 6 — Release Engineering & CI/CD  *(Issue Id 46)*

*Phase 3 — Week 4 — SHIPS. The epic that makes the pipeline itself a portfolio artifact. This is your professional home ground, so make it the most opinionated part of the repo.*

| ID | Type | Summary | Priority | Est |
|---|---|---|---|---|
| 47 | Task | Stand up the staging Compose stack bound to Tailscale | Highest | 2.5h |
| 48 | Story | As a release manager I want every tag to deploy to staging before production | Highest | 3h |
| 49 | Task | Implement semantic versioning driven by commit history | High | 2h |
| 50 | Task | Automate changelog generation and GitHub Releases | High | 2h |
| 51 | Task | Add post-deploy health gate with automatic rollback | High | 2.5h |
| 52 | Task | Pin and retain the last 5 image tags in GHCR | Medium | 1h |
| 53 | Task | Add Dependabot for Go modules, npm, Actions, and Docker | Medium | 45m |
| 54 | Task | Write a release runbook in /docs | Medium | 1.5h |

## Epic 7 — Test Automation  *(Issue Id 55)*

*Phase 4 — Week 5 — SHIPS. The full pyramid. Fast checks gate PRs; slow checks run against deployed staging. This epic is where the SDET story gets made concrete.*

| ID | Type | Summary | Priority | Est |
|---|---|---|---|---|
| 56 | Task | Write Go unit tests with testify and enforce coverage | High | 3h |
| 57 | Task | Set up Vitest and React Testing Library | High | 3h |
| 58 | Task | Add unit and component tests to the PR gate | High | 1h |
| 59 | Task | Set up Playwright with TypeScript | High | 2h |
| 60 | Story | As a QA engineer I want E2E coverage of core navigation | High | 2.5h |
| 61 | Story | As a QA engineer I want E2E coverage of the contact form | High | 2h |
| 62 | Task | Set up pytest-bdd with the Playwright Python binding | Medium | 2.5h |
| 63 | Story | As a stakeholder I want acceptance criteria written as readable feature files | Medium | 3h |
| 64 | Task | Wire E2E and acceptance suites into the post-deploy stage | High | 2h |
| 65 | Task | Publish test reports as CI artifacts | Medium | 1.5h |
| 66 | Task | Add axe-core accessibility assertions to Playwright | Medium | 1.5h |

## Epic 8 — VPS Hardening & Operations  *(Issue Id 67)*

*Phase 5 — Weeks 5-6 — SHIPS. Make the box defensible and the service observable. Deferred until after MVP deliberately, but not optional.*

| ID | Type | Summary | Priority | Est |
|---|---|---|---|---|
| 68 | Task | Disable SSH password auth and root login | Highest | 1h |
| 69 | Task | Configure UFW to allow only 80, 443, and SSH | Highest | 1.5h |
| 70 | Task | Install and configure fail2ban for SSH | High | 1h |
| 71 | Task | Enable unattended-upgrades for security patches | High | 1h |
| 72 | Task | Automate SQLite and Caddy volume backups offsite | High | 2.5h |
| 73 | Story | As the site owner I want to restore from backup successfully | High | 2h |
| 74 | Task | Set up uptime monitoring with alerting | Medium | 1.5h |
| 75 | Task | Configure log rotation and retention | Medium | 45m |
| 76 | Task | Write an incident runbook | Low | 1.5h |

## Epic 9 — Security & Performance Validation  *(Issue Id 77)*

*Phase 6 — OPTIONAL, post-MVP. Genuine differentiation, explicitly out of MVP scope. Defensive validation of your own infrastructure only. Check your VPS provider's acceptable-use policy before generating load or attack traffic, even against your own host.*

| ID | Type | Summary | Priority | Est |
|---|---|---|---|---|
| 78 | Task | Confirm VPS provider AUP permits load and security testing | Highest | 45m |
| 79 | Task | Add Trivy image scanning to CI | Medium | 1.5h |
| 80 | Story | As an engineer I want to know how the site behaves under load | Low | 3h |
| 81 | Task | Run OWASP ZAP baseline scan against staging | Low | 2.5h |
| 82 | Task | Harden HTTP security headers in Caddy | Medium | 2h |
| 83 | Story | As a reader I want a writeup of what the security testing found | Low | 3h |

## Epic 10 — Polish & Launch  *(Issue Id 84)*

*Phase 7 — Week 6 — SHIPS. The last mile between 'working' and 'good'.*

| ID | Type | Summary | Priority | Est |
|---|---|---|---|---|
| 85 | Task | Add SEO metadata and Open Graph tags | High | 2.5h |
| 86 | Task | Run Lighthouse and fix what it flags | High | 2.5h |
| 87 | Task | Add privacy-respecting analytics | Low | 2h |
| 88 | Task | Manual accessibility pass with keyboard and screen reader | Medium | 2h |
| 89 | Story | As a visitor I want to understand how this site was built | Medium | 2.5h |
| 90 | Task | Write and publish posts 2 and 3 | High | 5h |
| 91 | Task | Cut v1.0.0 | High | 1h |

---

## Ticket detail

Full descriptions, for when the summary isn't enough.


### Epic 1 — Foundation & Repo Hygiene

**2 · Task · Create GitHub repo and baseline structure**
Public repo 'half-built'. Monorepo layout: /web (React), /api (Go), /infra (compose + Caddy), /tests (pytest-bdd), /docs. Add LICENSE (MIT) and a README stub.

**3 · Task · Adopt Conventional Commits and enforce it**
Document the commit convention in CONTRIBUTING.md. Add commitlint + husky (or a Go-based hook) so malformed commit messages are rejected locally. This is the input to automated changelogs later, so it has to be right from commit one.

**4 · Task · Set up branch protection on main**
Require PR before merge, require status checks to pass, no direct pushes to main. Even solo, this enforces the workflow you want to demonstrate.

**5 · Task · Add gitleaks pre-commit hook and enable GitHub secret scanning**
Repo is public. A leaked VPS credential or API key is the one mistake in this project with genuinely severe consequences. Do this before any config file exists.

**6 · Task · Scaffold Vite + React + TypeScript in /web**
npm create vite@latest with the react-ts template. Confirm dev server runs and tsc is strict. Enable strict mode in tsconfig from the start; retrofitting it is miserable.

**7 · Task · Scaffold Go module in /api with chi router and /healthz**
go mod init, chi router, a single /healthz endpoint returning 200 with a JSON body. This endpoint becomes the deploy health gate later, so build it now.

**8 · Task · Configure ESLint, Prettier, and golangci-lint**
Lint config for both stacks, wired to npm scripts and a Makefile. These become the first CI checks.

**9 · Story · As a developer I want one command to run the whole stack locally**
A Makefile or task runner with 'make dev' starting the Vite dev server and the Go API together. Local friction compounds over six weeks; kill it early.

**10 · Task · Write CI skeleton workflow (lint + typecheck only)**
GitHub Actions workflow triggered on PR. Just lint and typecheck for now. Get a green check on a PR before adding anything heavier.

**11 · Task · Write CLAUDE.md defining Claude Code's reviewer role**
Explicit instructions in the repo that scope Claude Code to reviewing diffs, flagging issues, and explaining code. Not authoring features. This is the guardrail for your own discipline.


### Epic 12 — Design System & Visual Identity

**13 · Task · Install and configure Tailwind**
Tailwind + PostCSS in the Vite project. Confirm the build purges unused classes.

**14 · Story · As a visitor I want the site to have a distinct visual identity**
Define custom theme tokens in tailwind.config: a typeface pairing (one display, one text), a colour scale you chose deliberately, a spacing rhythm, and a border-radius scale. Do NOT ship Tailwind's default slate/gray palette or default font stack. This single task does more for the 'not a template' goal than anything else in the backlog.

**15 · Task · Self-host webfonts and set up the type scale**
Fonts via fontsource or self-hosted woff2, with font-display swap. Define a modular type scale. Avoid Google Fonts CDN for privacy and for the third-party-request reduction.

**16 · Task · Build layout primitives: Container, Stack, Prose**
A small set of layout components so spacing stays consistent. Prose handles long-form post typography — line length, measure, vertical rhythm.

**17 · Task · Build site shell: header, nav, footer**
Responsive nav with the tab structure the acceptance tests will later exercise. Mobile menu included.

**18 · Task · Implement dark mode via CSS variables**
Tailwind dark: variant backed by CSS custom properties, respecting prefers-color-scheme with a manual toggle override. Persist choice.


### Epic 19 — MVP Deployment

**20 · Task · Point halfbuilt.me DNS at the VPS**
A/AAAA records. Confirm propagation.

**21 · Task · Install Docker and Docker Compose on the VPS**
Docker Engine from the official repo, not the distro package. Add your user to the docker group.

**22 · Task · Write multi-stage Dockerfile for the web build**
Node build stage, then a minimal static-serving stage. Target a small final image; multi-stage is the point.

**23 · Task · Write docker-compose.yml and Caddyfile for production**
Caddy terminating TLS with automatic Let's Encrypt certs, reverse proxying to the web container. Named volume for Caddy's cert storage so you don't hit rate limits on redeploy.

**24 · Story · As the site owner I want to deploy by pushing a git tag**
GitHub Actions workflow on tag push: build image, push to GHCR, then a self-hosted runner on the VPS pulls and restarts the stack. No manual SSH in the deploy path.

**25 · Task · Register a self-hosted GitHub Actions runner on the VPS**
Runner registered as a service, scoped to the repo. This is what gives you 'I own the execution environment' without running your own forge.

**26 · Story · As a visitor I want to read a real post on the homepage**
Write and publish post #1. Hardcoded is fine at this stage; the MDX engine comes later. The point is that the site is not empty when it goes live.

**27 · Task · Tag and ship v0.1.0**
First real release. Verify HTTPS, verify the cert, verify the site loads on mobile. MVP gate met.


### Epic 28 — Content Engine

**29 · Task · Integrate MDX into the Vite build**
@mdx-js/rollup plugin. Confirm a .mdx file renders with an imported React component inside it.

**30 · Task · Set up frontmatter parsing and a post index**
gray-matter for frontmatter (title, date, tags, summary, cover). Build a post manifest at build time to power listings.

**31 · Story · As a visitor I want a blog index with filtering by tag**
Listing page sorted by date, filterable by tag. Driven by the post manifest.

**32 · Story · As a writer I want an image gallery component I can drop into any post**
Responsive gallery with lightbox. Lazy loading, correct aspect-ratio boxes to avoid layout shift.

**33 · Story · As a writer I want to embed video in a post**
A Video component handling both self-hosted files and privacy-respecting YouTube embeds (youtube-nocookie, click-to-load).

**34 · Story · As a writer I want scroll-triggered animation in posts**
Motion/Framer Motion with an IntersectionObserver-based reveal component. Respect prefers-reduced-motion — non-negotiable for accessibility.

**35 · Task · Build Callout, Figure, and CodeBlock components**
The remaining scrapbook primitives. Syntax highlighting via Shiki at build time rather than a runtime highlighter.

**36 · Task · Add RSS feed generation**
Generated at build from the post manifest. Cheap, and signals that you take the writing seriously.

**37 · Story · As a visitor I want a projects page showcasing my work**
Portfolio section covering the home lab, trading research, and this site itself. Links to repos.


### Epic 38 — Go Backend & API

**39 · Task · Set up SQLite with migrations**
SQLite via modernc.org/sqlite (pure Go, no cgo, keeps the image small and static). Migrations with goose or golang-migrate.

**40 · Story · As a visitor I want to send a message through a contact form**
POST /api/contact. Server-side validation, persisted to SQLite, plus email notification. Return sensible error states to the UI.

**41 · Task · Add rate limiting and spam protection to the contact endpoint**
IP-based rate limit plus a honeypot field. A public unprotected form will be found by bots within days.

**42 · Task · Add structured logging with log/slog**
JSON structured logs with request IDs. This is what makes the ops story credible later.

**43 · Task · Add /readyz and expand /healthz to check the database**
Liveness vs readiness distinction. /readyz verifies the DB is reachable. The deploy gate uses this.

**44 · Task · Containerize the API and add it to Compose**
Multi-stage build to a scratch or distroless final image. Caddy routes /api/* to it. Named volume for the SQLite file.

**45 · Task · Document the API with an OpenAPI spec**
Small surface, but a written spec is a QA-credibility signal and gives contract tests something to assert against.


### Epic 46 — Release Engineering & CI/CD

**47 · Task · Stand up the staging Compose stack bound to Tailscale**
Second stack, separate volumes and database file, listening only on the Tailnet interface. Verify from outside your Tailnet that it is genuinely unreachable.

**48 · Story · As a release manager I want every tag to deploy to staging before production**
Pipeline: build -> push to GHCR -> deploy staging -> run E2E against staging -> manual approval via GitHub environment -> deploy production.

**49 · Task · Implement semantic versioning driven by commit history**
feat: bumps minor, fix: bumps patch, BREAKING CHANGE bumps major. Tags drive the release, not the other way round.

**50 · Task · Automate changelog generation and GitHub Releases**
git-cliff or release-please generating CHANGELOG.md from Conventional Commits, published as a GitHub Release at tag time.

**51 · Task · Add post-deploy health gate with automatic rollback**
After deploy, poll /readyz. On failure, redeploy the previous image tag automatically. Test this by deliberately shipping a broken build.

**52 · Task · Pin and retain the last 5 image tags in GHCR**
Retention policy so rollback targets always exist. Deploys reference immutable tags, never 'latest'.

**53 · Task · Add Dependabot for Go modules, npm, Actions, and Docker**
Grouped weekly PRs. Demonstrates ongoing maintenance rather than a one-time build.

**54 · Task · Write a release runbook in /docs**
How to cut a release, how to roll back, what to check, who to blame (you). A real runbook is a strong release-engineering signal.


### Epic 55 — Test Automation

**56 · Task · Write Go unit tests with testify and enforce coverage**
Table-driven tests for handlers and validation logic. httptest for handler-level integration. Coverage reported in CI; pick a threshold you'll actually hold.

**57 · Task · Set up Vitest and React Testing Library**
Component tests for the nav, contact form, and content components. Test behaviour and accessibility roles, not implementation details.

**58 · Task · Add unit and component tests to the PR gate**
Extend the PR workflow. These must stay fast — if the PR gate exceeds about 5 minutes you will start ignoring it.

**59 · Task · Set up Playwright with TypeScript**
Config with chromium/firefox/webkit projects, trace-on-retry, and a base URL pointing at staging.

**60 · Story · As a QA engineer I want E2E coverage of core navigation**
Playwright specs: navigate between all tabs, verify content loads, verify the mobile menu, verify no console errors.

**61 · Story · As a QA engineer I want E2E coverage of the contact form**
Happy path submission, validation errors, rate-limit behaviour, and confirmation state.

**62 · Task · Set up pytest-bdd with the Playwright Python binding**
Separate /tests project. pytest-bdd over Behave for the Pytest fixture and reporting ecosystem. This is the polyglot signal.

**63 · Story · As a stakeholder I want acceptance criteria written as readable feature files**
5-8 Gherkin feature files covering real journeys: navigating tabs, reading a post, submitting the contact form, following external links to socials. Cap the count deliberately — more feature files is not more value.

**64 · Task · Wire E2E and acceptance suites into the post-deploy stage**
Both suites run against deployed staging, gating the production promotion. Not on the PR gate.

**65 · Task · Publish test reports as CI artifacts**
Playwright HTML report and pytest-bdd report uploaded per run, with traces and screenshots on failure. Makes debugging real and demonstrates reporting maturity.

**66 · Task · Add axe-core accessibility assertions to Playwright**
Automated a11y checks on each page. Catches the obvious violations; does not replace manual checking.


### Epic 67 — VPS Hardening & Operations

**68 · Task · Disable SSH password auth and root login**
Key-only authentication, PermitRootLogin no. Verify you can still get in via a second session BEFORE closing the first one.

**69 · Task · Configure UFW to allow only 80, 443, and SSH**
Default deny inbound. Note that Docker can bypass UFW by writing directly to iptables — verify with an external port scan rather than trusting the UFW status output.

**70 · Task · Install and configure fail2ban for SSH**
Default sshd jail with a sensible ban time. Cheap protection against brute-force noise.

**71 · Task · Enable unattended-upgrades for security patches**
Automatic security updates on the host. Set up reboot notification rather than automatic reboots.

**72 · Task · Automate SQLite and Caddy volume backups offsite**
Nightly backup via restic or rclone to offsite storage. A backup you have never restored is not a backup.

**73 · Story · As the site owner I want to restore from backup successfully**
Actually perform a restore into a throwaway environment and verify the data. Document the procedure in the runbook.

**74 · Task · Set up uptime monitoring with alerting**
External monitor (Uptime Kuma self-hosted, or a free hosted tier) hitting /healthz, alerting to email or push.

**75 · Task · Configure log rotation and retention**
Docker json-file driver with max-size and max-file limits. Unbounded container logs will eventually fill the disk.

**76 · Task · Write an incident runbook**
What to check when the site is down, in order. Short, practical, actually usable at 2am.


### Epic 77 — Security & Performance Validation

**78 · Task · Confirm VPS provider AUP permits load and security testing**
Read the terms and, if ambiguous, email support for written confirmation. Do this first, before any of the tasks below.

**79 · Task · Add Trivy image scanning to CI**
Scan both images for known CVEs on every build. Fail on HIGH/CRITICAL with an allowlist for accepted risks. The easiest win in this epic and the most standard practice.

**80 · Story · As an engineer I want to know how the site behaves under load**
k6 load test scripts covering baseline, ramp, and spike profiles against staging. Capture latency percentiles, not averages.

**81 · Task · Run OWASP ZAP baseline scan against staging**
Headless ZAP baseline in CI against staging. Triage findings honestly — document accepted risks rather than suppressing them silently.

**82 · Task · Harden HTTP security headers in Caddy**
CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. Verify with an external header-grading tool.

**83 · Story · As a reader I want a writeup of what the security testing found**
Turn the results into a blog post. This is the payoff: the testing work becomes content, and the content demonstrates the skill better than a bullet point ever would.


### Epic 84 — Polish & Launch

**85 · Task · Add SEO metadata and Open Graph tags**
Per-page title/description, OG and Twitter card tags, generated OG images for posts. Sitemap.xml and robots.txt — with staging excluded.

**86 · Task · Run Lighthouse and fix what it flags**
Target 90+ across performance, accessibility, best practices, SEO. Fix the real issues; do not game the score.

**87 · Task · Add privacy-respecting analytics**
Self-hosted Plausible or Umami on the VPS. No third-party tracking, consistent with the site's character.

**88 · Task · Manual accessibility pass with keyboard and screen reader**
Tab through every page. Test with VoiceOver or NVDA. Automated axe checks miss most real a11y problems.

**89 · Story · As a visitor I want to understand how this site was built**
A /colophon page documenting the stack, the pipeline, and the decisions. On this project specifically, the build process is part of the portfolio — say so explicitly.

**90 · Task · Write and publish posts 2 and 3**
Content is the point. Two more real posts before you call it launched.

**91 · Task · Cut v1.0.0**
Full release with changelog. Share it.


---

## Importing into Jira

`half-built-backlog.csv` is formatted for Jira Cloud's CSV importer.

**Steps:**

1. Jira → **Settings → System → External System Import → CSV**
2. Upload `half-built-backlog.csv`, select your target project
3. Map columns: `Issue Id → Issue Id`, `Issue Type → Issue Type`, `Summary → Summary`, `Description → Description`, `Priority → Priority`, `Labels → Labels`, `Parent → Parent`
4. Validate, then import

**Notes that will save you an hour:**

- Atlassian deprecated `Epic Link` and `Epic Name` in April 2024; `Parent` is the correct field for Jira Cloud now. This CSV uses `Parent`.
- Epic rows appear *above* their children. The importer processes top-to-bottom, so the parent must exist before the child is created.
- The `Parent` column references the numeric `Issue Id`, not a Jira key.
- You must map `Issue Id` for parent linking to work at all — the importer errors out without it.
- There are two `Labels` columns; repeated headers are how Jira imports multi-value fields.
- Known Atlassian bug JRACLOUD-92272 can break parent linking on import. If parents come back empty, the fallback is importing epics first, then children in a second pass.

Reference: https://support.atlassian.com/jira/kb/keep-issue-parent-child-mapping-during-csv-import-to-jira-cloud/

---

## Working agreement

- One branch per ticket, named `<type>/<issue-id>-<slug>`
- PR per ticket, even solo. The PR body states what changed and why.
- **You write the code. Claude Code reviews the diff.** If you find yourself accepting a block you couldn't explain to an interviewer, stop and rewrite it yourself.
- Conventional Commits on every commit — the changelog depends on it
- At each phase boundary: re-read the risk register, cut scope if behind
- Ideas that aren't in the current phase go to the backlog, not into the branch
