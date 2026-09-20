# Half-Built — Architecture & Decision Record

**Project:** halfbuilt.me
**Owner:** Jay
**Status:** Planning → Phase 0
**Last updated:** 2026-09-13

---

## 1. What this is

A personal site that does two jobs at once:

1. **Portfolio.** Professional enough that a hiring manager takes it seriously.
2. **Personal space.** Visually rich, scrapbook-style posts about projects, thoughts, and things in progress — the kind of site where someone concludes "this person actually thinks, they didn't just fill in a template."

There is a third, less obvious job, and it is the one that makes this project unusual:

3. **The delivery pipeline is itself the portfolio piece.** Most engineers write "experienced with CI/CD, release management, test automation" on a résumé. This site *demonstrates* it — versioned releases, a staging gate, a real test pyramid, changelogs, rollback. The infrastructure is not overhead on the way to the website. It is the exhibit.

That third goal is what justifies decisions that would otherwise be over-engineering for a personal blog. It's worth being explicit about, because it's also the thing most likely to lead you astray if it goes unchecked — see §9.

---

## 2. Constraints

| Constraint | Value |
|---|---|
| Time budget | ~2–3 hrs/day, 6 weeks (extended from 4 to absorb learning) |
| Hosting | Existing VPS, self-managed |
| Source control | GitHub |
| AI assistance | Claude Code as **PR reviewer**, not code generator |
| Known ground | React, general engineering, release management, QA/testing |
| New ground | Tailwind, Go (web-specific), Playwright, pytest-bdd, GitHub Actions authoring |

The AI constraint deserves a note. Using Claude Code as a reviewer rather than an author is the right call for a learning project, and it happens to align with how Claude Code is actually designed — it does not do inline tab-completion, it does larger instruction-driven tasks with reviewable diffs ([Claude Code VS Code docs](https://code.claude.com/docs/en/vs-code)). The discipline to enforce: *you* open the PR, *it* reviews. Not the reverse.

---

## 3. Decisions

Each decision below states the choice, the alternatives considered, the reasoning, and the evidence.

### D1 — Frontend: React + TypeScript + Vite

**Chosen.** React with TypeScript, built by Vite.

**Alternatives:** Next.js, Astro, SvelteKit, plain Vite + vanilla.

**Why:** React remains the dominant frontend library in the market you're hiring into — <cite>the 2025 Stack Overflow Developer Survey put React at roughly 45% usage among respondents, second only to Node.js</cite> ([Statista/Stack Overflow 2025](https://www.statista.com/statistics/1124699/worldwide-developer-survey-most-used-frameworks-web/)). You already know it, so the learning budget goes to Tailwind, Go, and the pipeline instead.

**Honest counterpoint:** Astro is arguably the *better* technical fit for a content-heavy personal site — it ships zero JS by default and has first-class MDX support. Next.js is arguably the better *résumé* fit for frontend roles. React + Vite was chosen because it keeps the frontend boring and familiar so the interesting learning happens elsewhere. If you find yourself fighting Vite for content routing in Week 2, Astro is a legitimate pivot and not a failure.

### D2 — Styling: Tailwind CSS

**Chosen.** Tailwind, with a deliberately custom design token layer.

**Alternatives:** CSS Modules, vanilla CSS, styled-components, a component kit like shadcn/ui.

**Why:** Tailwind removes the naming and file-organization tax of CSS without locking you into someone else's visual language. That last part matters given the "must not look templated" requirement.

**The trap to avoid:** Tailwind's defaults are *recognizable*. A site using stock `slate` greys, default `rounded-lg`, and the default font stack reads as "Tailwind site" instantly. Spend an hour in Week 1 defining your own theme — a real typeface pairing, a colour scale you picked, your own spacing rhythm. This is the single highest-leverage aesthetic decision in the project.

### D3 — Backend: Go

**Chosen.** Go, standard library `net/http` plus a light router (chi).

**Alternatives:** Node/Express, Python FastAPI, no backend at all.

**Why:** Go is the strongest signal for the infrastructure/platform/robotics-adjacent roles you're targeting, and it lines up with your existing background. It produces a single static binary, which makes containerization trivial and the Docker image tiny — a real advantage for the deployment story.

**Honest counterpoint you should sit with:** *This site does not strictly need a backend.* An MDX blog can be fully static. The Go service earns its place by handling the contact form, health/readiness endpoints, and view counts — and by being a second deployable unit, which is what makes the release pipeline interesting rather than trivial. That's a legitimate reason. But be clear-eyed that you are choosing it for the demonstration value, not because the problem demanded it. If FastAPI would be more useful to your actual career path, <cite>Python's adoption accelerated sharply in 2025 and FastAPI was the standout riser in the web framework category</cite> ([Stack Overflow 2025 Technology](https://survey.stackoverflow.co/2025/technology)) — that's a defensible swap.

### D4 — Content: MDX, compiled at build time

**Chosen.** Posts authored as `.mdx` files in the repo, compiled at build.

**Alternatives:** Database + admin CMS, headless CMS (Contentful/Sanity), plain markdown, runtime MDX compilation.

**Why:** MDX is markdown that accepts JSX, so <cite>you can import components such as interactive charts or alerts and embed them within your content</cite> ([mdxjs.com](https://mdxjs.com/)). That is exactly the scrapbook requirement: prose, then a photo gallery component, then more prose, then an animated diagram. You build a small component library once and compose freely thereafter.

The earlier "no redeploy per post" requirement was **dropped deliberately**, and this is the best decision in the document. Treating each post as a release means every post goes through CI, tests, staging, and a tagged version. The publishing workflow *becomes* the release-management demo. A database-backed CMS would have removed that entirely and added an admin UI, auth, and a whole attack surface for no benefit.

Secondary benefit: <cite>markdown is data, so metadata can be extracted from each post to power filtered and sorted post listings</cite> ([Josh W. Comeau on building an MDX blog](https://www.joshwcomeau.com/blog/how-i-built-my-blog/)) — tags, categories, and a homepage feed come nearly free.

### D5 — CI/CD: GitHub Actions

**Chosen.** GitHub Actions, with a self-hosted runner on the VPS for the deploy step only.

**Alternatives:** Self-hosted GitLab CE, Jenkins, CircleCI, Argo CD.

**Why:** <cite>GitHub Actions leads organizational CI adoption at 33%, ahead of Jenkins at 28% and GitLab CI at 19%</cite>, and <cite>62% of surveyed developers use it for personal projects</cite> ([JetBrains, Best CI/CD Tools 2026](https://blog.jetbrains.com/teamcity/2026/03/best-ci-tools/); [DevToolsWatch summary of State of CI/CD 2025](https://devtoolswatch.com/en/github-actions-vs-gitlab-ci-vs-jenkins-2026)). The governing principle is platform gravity: <cite>the best CI/CD tool is usually the one closest to your source code</cite> ([TechnologyMatch](https://technologymatch.com/blog/jenkins-vs-gitlab-ci-vs-circleci-vs-github-actions-the-ci-cd-decision-guide-in-2026)). You're on GitHub.

**Rejected — self-hosted GitLab:** you would be running GitLab upgrades, backups, and its database on the same VPS that serves the site, competing for the exact hours budgeted for building. GitHub Actions supports self-hosted runners, which gives you the "I own the execution environment" benefit without maintaining a forge.

**Rejected — Argo CD:** Argo is Kubernetes-native; it reconciles Git state into a cluster. Without Kubernetes there is nothing for it to reconcile. The GitOps *principle* (Git as the single source of truth for deployed state) is still adopted here — it just doesn't need Argo to be real.

**Worth knowing for interviews:** <cite>Jenkins is losing share year over year but still underpins CI/CD at roughly 80% of the Fortune 500</cite> ([EITT](https://eitt.academy/knowledge-base/jenkins-vs-github-actions-vs-gitlab-ci-cicd-2026/)), and Azure DevOps dominates Microsoft shops. Actions concepts transfer; if you can author a workflow you can read a Jenkinsfile.

### D6 — Orchestration: Docker Compose, not Kubernetes

**Chosen.** Docker Compose, two stacks on one VPS, Caddy in front.

**Alternatives:** k3s, full Kubernetes, bare systemd units.

**Why:** For a single host running two services, Kubernetes is not just overkill — it actively signals poor judgment about right-sizing tooling. A staff engineer reading your repo and finding a k8s manifest for a personal blog draws a conclusion, and it isn't a flattering one. Compose is the correct scale.

**If you want the Kubernetes keyword later,** that's a separate, honest project: a k3s cluster on a second box, with Argo CD doing real GitOps. Don't bolt it onto this.

### D7 — Environments: staging on Tailscale, production public

**Chosen.** Two Compose stacks. Production on `halfbuilt.me`. Staging bound to the Tailnet only.

**Alternatives:** HTTP basic auth on a staging subdomain, `robots.txt` + obscurity, no staging.

**Why:** Staging must not be publicly reachable — an indexed, half-finished copy of your portfolio is worse than having no staging at all. You already run Tailscale, so binding staging to the Tailnet means it isn't on the public internet at all: no password to leak, nothing for a scanner to find. Basic auth is the fallback if you ever need to show staging to someone outside your network.

### D8 — Testing: full pyramid, Playwright at the top

**Chosen.**

| Layer | Tool | Runs |
|---|---|---|
| Go unit/integration | `testing` + testify | Every PR |
| React component | Vitest + React Testing Library | Every PR |
| Lint/typecheck | golangci-lint, ESLint, `tsc` | Every PR |
| E2E | Playwright (TypeScript) | Post-deploy to staging |
| Acceptance (BDD) | pytest-bdd + Playwright Python | Post-deploy to staging |

**Why Playwright over Selenium:** the market has moved decisively. <cite>The State of JavaScript 2025 testing survey places Playwright at 50% usage against Selenium's 10% — a near-inversion of their positions three years earlier</cite>, and <cite>Playwright crossed 33 million weekly npm downloads in early 2026, up from under 1 million in 2021</cite> ([TestQuality](https://testquality.com/selenium-vs-playwright-comparison/); [TestDino](https://testdino.com/blog/testing-framework-trends)). Across QA professionals specifically, <cite>Playwright sits near 45% adoption while Selenium has fallen from roughly 39% in 2022 to 22%</cite> ([Crosscheck](https://crosscheck.cloud/blogs/selenium-vs-playwright-vs-cypress-2026-comparison/)). The practical reason underneath the numbers is auto-waiting, which is the single largest source of flake elimination.

Selenium is not dead — <cite>its WebDriver bindings remain dominant in Java, Python, C#, and Ruby, and large enterprises with existing Selenium Grid investments rarely migrate</cite> ([TestQuality](https://testquality.com/selenium-vs-playwright-comparison/)). But for greenfield work, Playwright is the answer.

**Why two E2E languages:** Playwright ships a Python binding, so the BDD/acceptance layer can be pytest-bdd driving Playwright while the developer-facing E2E layer stays in TypeScript. This is a common SDET arrangement in real organizations and demonstrates you aren't locked to one ecosystem. It also lets you reuse the Gherkin feature-file skill you already have.

**The honest caveat on Gherkin:** its actual value is letting non-technical stakeholders read and contribute to specs. On a solo project there are no such stakeholders, so on pure engineering merit the abstraction layer is overhead. It earns its place here *as a demonstrable skill*, which is a legitimate reason on this particular project. Name that tradeoff out loud in your repo README rather than pretending otherwise — engineers respect that far more than unexamined ceremony.

**Pipeline placement matters:** fast checks (unit, component, lint, typecheck) gate every PR. Playwright and pytest-bdd run against deployed staging, *after* the deploy. E2E tests are slow and inherently flakier; putting them in the PR gate trains you to ignore red builds, which is the worst habit in all of CI.

### D9 — Security validation: Phase 4, explicitly out of MVP

**Chosen.** k6 for load testing, OWASP ZAP baseline scan, Trivy for image CVE scanning. All deferred to a post-MVP phase.

**Why deferred:** it's genuine differentiation, but it's also the easiest place to spend three weeks and ship nothing. MVP first.

**Framing when you do it:** this is *defensive security validation of your own infrastructure*, not penetration testing. Scope it to your own VPS and your own containers. Check your VPS provider's acceptable-use policy before generating attack or load traffic, even against yourself — most providers have clauses about this and "it's my own box" is not always sufficient.

---

## 4. Target architecture

```
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │  Caddy (TLS)    │  auto HTTPS via Let's Encrypt
              └────────┬────────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
  ┌─────────────┐            ┌──────────────┐
  │  web        │            │  api         │
  │  static     │  /api/* ─► │  Go binary   │
  │  React+MDX  │            │  chi router  │
  └─────────────┘            └──────┬───────┘
                                    ▼
                             ┌──────────────┐
                             │ SQLite       │
                             │ (volume)     │
                             └──────────────┘

  Staging: identical stack, bound to Tailnet interface only
```

**Deployment unit:** two container images (`web`, `api`), versioned together under a single semver tag. One repo, one release, one changelog.

**Why SQLite:** single file, no separate service, trivially backed up by copying the file. For a personal site's contact submissions and view counts, Postgres would be a second thing to operate for zero benefit. Mount it on a named volume so it survives container replacement — this is the one place where a careless `docker compose down -v` costs you real data.

---

## 5. Release model

This is the part of the project that is genuinely *yours* professionally, so it should be the most opinionated.

- **Trunk-based** with short-lived branches. `main` is always deployable.
- **Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:`) — machine-readable, and the input to automated changelogs.
- **Semantic versioning** on tags. `feat` bumps minor, `fix` bumps patch.
- **Release trigger:** pushing a tag `v*` builds images, pushes to GHCR, deploys to staging, runs the full E2E and acceptance suites, then gates production on those passing.
- **Changelog** generated from commit history at tag time, published as a GitHub Release.
- **Rollback:** deploy is `docker compose pull && up -d` against a pinned image tag. Rolling back is redeploying the previous tag. Keep the last 5 image tags in the registry.
- **Health gate:** `/healthz` on the API, checked after deploy. Failure aborts and rolls back.

Every blog post is a release. That framing is genuinely fun and also genuinely correct.

---

## 6. Phasing (MVP-driven)

| Phase | Weeks | Outcome | Ships? |
|---|---|---|---|
| 0 — Foundation | 1 | Repo, tooling, conventions, CI skeleton | No |
| 1 — **MVP** | 1–2 | Static site + 1 real post, live on halfbuilt.me, deployed by pipeline | **Yes** |
| 2 — Content engine | 3 | MDX component library, scrapbook posts, blog index | Yes |
| 3 — Backend + release rigor | 4 | Go API, contact form, staging gate, tagged releases, changelog | Yes |
| 4 — Test automation | 5 | Full pyramid: Go tests, Vitest, Playwright, pytest-bdd | Yes |
| 5 — Hardening & ops | 5–6 | SSH/UFW/fail2ban, backups, uptime monitoring | Yes |
| 6 — Security & perf *(optional)* | 6+ | k6, ZAP baseline, Trivy in CI | Yes |
| 7 — Polish & launch | 6 | SEO, a11y, analytics, real content | Yes |

**The MVP bar is deliberately low.** End of Week 2: a real domain, real HTTPS, a homepage that looks good, one real post, deployed by pushing a tag. No backend, no tests beyond a smoke check, no staging. Everything after that is iteration on something that already exists — which is far more motivating than iteration on something that doesn't.

---

## 7. Definition of done (MVP)

- [ ] `halfbuilt.me` resolves over HTTPS with a valid cert
- [ ] Homepage renders with custom typography and colour — not Tailwind defaults
- [ ] One real post published, written by you, that you'd be happy for a hiring manager to read
- [ ] `git tag v0.1.0 && git push --tags` deploys it without manual SSH
- [ ] README explains the architecture and the decisions
- [ ] Repo is public and clean

---

## 8. Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Infrastructure rabbit-hole eats the build time | **High** | High | MVP gate at Week 2 is non-negotiable. Ship ugly before you ship clever. |
| Site looks like a Tailwind template | Medium | High | Dedicated design-token task in Phase 0, before any component work |
| Blank-page problem — no content to publish | **High** | High | Write post #1 in Week 1, before the blog engine exists. Content first. |
| Gherkin layer becomes ceremony with no value | Medium | Low | Cap at 5–8 feature files covering real user journeys only |
| Claude Code drifts from reviewer to author | Medium | Medium | Rule: you open the PR. It comments. You write the fix. |
| Secrets leaked into the public repo | Low | **Severe** | `gitleaks` in pre-commit from day one, GitHub secret scanning on |
| Scope creep from "wouldn't it be cool if" | **High** | Medium | Backlog it. Ship the phase. Revisit at phase boundaries. |

---

## 9. The thing to watch

The strength of this project — that the pipeline is the portfolio — is also its failure mode. There is a version of this where you spend six weeks building an exquisite deployment system for a website with no content on it, and that version is worth less than a plain static site with five good posts.

The infrastructure is the frame. The writing is the picture. Ship the picture first.

---

## 10. Sources

- Stack Overflow Developer Survey 2025 — https://survey.stackoverflow.co/2025/
- Stack Overflow 2025, Technology section — https://survey.stackoverflow.co/2025/technology
- Most used web frameworks 2025 (Statista/SO) — https://www.statista.com/statistics/1124699/worldwide-developer-survey-most-used-frameworks-web/
- JetBrains, Best CI/CD Tools 2026 — https://blog.jetbrains.com/teamcity/2026/03/best-ci-tools/
- DevToolsWatch, Actions vs GitLab CI vs Jenkins 2026 — https://devtoolswatch.com/en/github-actions-vs-gitlab-ci-vs-jenkins-2026
- EITT, Jenkins vs Actions vs GitLab CI 2026 — https://eitt.academy/knowledge-base/jenkins-vs-github-actions-vs-gitlab-ci-cicd-2026/
- TechnologyMatch CI/CD decision guide 2026 — https://technologymatch.com/blog/jenkins-vs-gitlab-ci-vs-circleci-vs-github-actions-the-ci-cd-decision-guide-in-2026
- TestQuality, Selenium vs Playwright 2026 — https://testquality.com/selenium-vs-playwright-comparison/
- TestDino, testing framework adoption trends — https://testdino.com/blog/testing-framework-trends
- Crosscheck, Selenium vs Playwright vs Cypress 2026 — https://crosscheck.cloud/blogs/selenium-vs-playwright-vs-cypress-2026-comparison/
- MDX project site — https://mdxjs.com/
- Josh W. Comeau, How I built my blog — https://www.joshwcomeau.com/blog/how-i-built-my-blog/
- Claude Code VS Code documentation — https://code.claude.com/docs/en/vs-code
