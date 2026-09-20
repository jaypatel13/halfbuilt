# Half-Built — Learning Companion

**Purpose:** this backlog is a curriculum, not just a task list. Each section below maps to an epic in `half-built-roadmap.md` and answers three questions: *what do I actually need to understand before I start, where do I learn it, and what will I get wrong.*

**How to use it:** read the "before you start" material for an epic the evening before you begin it. Not the whole document up front — you'll retain none of it. Just-in-time learning beats front-loading every time.

**A note on sources:** almost everything below points at official documentation first. <cite>Technical documentation is the most-used learning resource among developers, with nearly 68% relying on it</cite> ([Stack Overflow 2025](https://survey.stackoverflow.co/2025/developers)) — there's a reason. Tutorials go stale; docs get updated.

---

## Epic 1 — Foundation & Repo Hygiene

### Understand first
- **Conventional Commits.** The spec is short — read the whole thing, it takes ten minutes. You need to internalize *why* the format is machine-parseable, because the changelog automation in Epic 6 depends entirely on it. Also take a look at: https://gist.github.com/qoomon/
- **Trunk-based development.** Specifically why short-lived branches beat long-lived ones, and what "main is always deployable" actually demands of you.
- **Go modules and project layout.** Go's conventions are opinionated. Learn them rather than importing habits from another language.

### Resources
- Conventional Commits spec — https://www.conventionalcommits.org/
- Trunk Based Development — https://trunkbaseddevelopment.com/
- Effective Go — https://go.dev/doc/effective_go
- Go by Example (fastest path to syntax fluency) — https://gobyexample.com/
- chi router docs — https://go-chi.io/
- Vite guide — https://vite.dev/guide/
- TypeScript handbook, `tsconfig` reference — https://www.typescriptlang.org/tsconfig/
- gitleaks — https://github.com/gitleaks/gitleaks

### Common pitfalls
- **Skipping `strict: true` in tsconfig.** Retrofitting strict mode onto an existing codebase is genuinely painful. Turn it on while the codebase is empty.
- **Committing before the gitleaks hook exists.** The repo is public. Do the security hook *first*, not "once there's something worth protecting."
- **Over-structuring the Go project.** Resist the urge to create `internal/domain/service/repository/` for a service with three endpoints. Start flat, extract when it hurts.

### Watch for
The instinct to make the foundation perfect. Epic 1 is scaffolding. If you're six hours into linter configuration, you've lost the plot.

---

## Epic 2 — Design System & Visual Identity

This is the epic where the "doesn't look templated" outcome is decided. Give it real attention.

### Understand first
- **Tailwind's mental model.** Utility-first feels wrong for about a day and then clicks. The key concept is the theme config — that's where customization lives, not in overriding classes.
- **Type scales and vertical rhythm.** Why a modular scale looks intentional and arbitrary font sizes don't.
- **Measure (line length).** 45–75 characters. This one variable does more for readability than any other typographic choice.

### Resources
- Tailwind docs, "Theme" and "Adding custom styles" — https://tailwindcss.com/docs/theme
- Refactoring UI (Wathan & Schoger) — the single best resource for engineers who want their work to look designed. Written by Tailwind's creators.
- Practical Typography by Butterick — https://practicaltypography.com/
- Type Scale generator — https://typescale.com/
- Fontsource for self-hosted fonts — https://fontsource.org/
- Josh Comeau on modern CSS layout — https://www.joshwcomeau.com/

### Common pitfalls
- **Shipping Tailwind's default palette.** `bg-slate-900 text-gray-100` is instantly recognizable. Pick your own colours.
- **Using Inter.** It's a fine typeface that has been used so widely it now reads as "default." Something with more character will serve the "personal" goal better.
- **Too many fonts.** Two. One display, one text. Three if you count a mono for code.
- **Designing in the browser from nothing.** Sketch the homepage on paper or in Figma for twenty minutes first. Much faster than iterating in CSS.

### The exercise that helps most
Find three personal sites you genuinely admire. Write down specifically what makes each work — the spacing, the colour restraint, the type contrast. Don't copy them; identify the *principles* they're applying.

---

## Epic 3 — MVP Deployment

### Understand first
- **Multi-stage Docker builds.** Why you build in one image and ship from another, and how that gets a Go service down to a handful of megabytes.
- **Reverse proxying and TLS termination.** What Caddy is actually doing, and why automatic HTTPS works (ACME, HTTP-01 challenge).
- **GitHub Actions core concepts.** Workflows, jobs, steps, runners, secrets, and the events that trigger them.
- **Self-hosted runners.** What the runner is, what it has access to, and why registering one on your production box is a decision worth thinking about.

### Resources
- Docker multi-stage builds — https://docs.docker.com/build/building/multi-stage/
- Docker Compose file reference — https://docs.docker.com/reference/compose-file/
- Caddy docs, especially the Caddyfile tutorial — https://caddyserver.com/docs/
- GitHub Actions — understanding workflows — https://docs.github.com/en/actions
- Self-hosted runners — https://docs.github.com/en/actions/hosting-your-own-runners
- GHCR (publishing container images) — https://docs.github.com/en/packages

### Common pitfalls
- **Let's Encrypt rate limits.** Five failed certificate attempts per hostname per hour will lock you out. Use Caddy's staging CA endpoint while you're iterating on config, then switch to production.
- **Not persisting Caddy's data volume.** Certs live in `/data`. Lose it on every deploy and you'll hit those rate limits fast.
- **Deploying `latest`.** Use immutable tags. `latest` makes rollback impossible and makes "what's actually running?" unanswerable.
- **Putting secrets in the workflow file.** GitHub Actions secrets exist. Use them.

### Watch for
This is the MVP gate. The temptation at this exact point is to add "just one more thing" before going live. Don't. A live site with one post beats a perfect local site with none.

---

## Epic 4 — Content Engine

### Understand first
- **What MDX actually compiles to.** Markdown becomes a React component. Once that clicks, the whole model is obvious.
- **Build-time vs runtime rendering.** Your posts compile at build. That's a deliberate choice, and understanding the alternative (runtime MDX) helps you defend it.
- **Frontmatter as a data layer.** Post metadata drives listings, tags, and RSS without a database.
- **`prefers-reduced-motion`.** Non-negotiable if you're adding animation. Vestibular disorders are real and animation can genuinely make people ill.

### Resources
- MDX docs, "Getting started" and "Using MDX" — https://mdxjs.com/docs/
- MDX Rollup/Vite integration — https://mdxjs.com/packages/rollup/
- Josh Comeau, "How I built my blog" — https://www.joshwcomeau.com/blog/how-i-built-my-blog/ — the best single writeup of this exact architecture
- Motion (formerly Framer Motion) — https://motion.dev/
- Shiki (build-time syntax highlighting) — https://shiki.style/
- MDN on `prefers-reduced-motion` — https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- web.dev on Cumulative Layout Shift — https://web.dev/articles/cls

### Common pitfalls
- **Images without dimensions.** Causes layout shift as the page loads, which looks cheap and tanks your Lighthouse score. Always set aspect ratio.
- **Runtime syntax highlighters.** Shipping Prism or highlight.js to the client adds meaningful JS weight for something that could be done at build.
- **Building components you don't need yet.** Write a post *first*, notice what it's missing, then build that component. Component-library-first leads to a library of things you never use.
- **Animation everywhere.** Restraint reads as confidence. One well-placed reveal beats eight.

---

## Epic 5 — Go Backend & API

### Understand first
- **Go's `net/http` handler model.** Handlers, middleware chains, context propagation. chi is a thin layer over this — understand the layer underneath.
- **`context.Context`.** Cancellation and timeouts. Idiomatic Go passes it as the first argument everywhere; know why.
- **Error handling in Go.** Explicit, verbose, and deliberate. Wrapping with `%w`, and `errors.Is` / `errors.As`.
- **SQL injection and prepared statements.** Even with SQLite. Even on a small form.
- **`log/slog`.** Structured logging in the standard library since Go 1.21.

### Resources
- Go's `net/http` docs — https://pkg.go.dev/net/http
- "How to Write Go Code" — https://go.dev/doc/code
- Go Web Examples — https://gowebexamples.com/
- `log/slog` package docs — https://pkg.go.dev/log/slog
- modernc.org/sqlite (pure-Go driver, no cgo) — https://pkg.go.dev/modernc.org/sqlite
- goose migrations — https://github.com/pressly/goose
- OWASP Top 10 — https://owasp.org/www-project-top-ten/
- OWASP Cheat Sheet on input validation — https://cheatsheetseries.owasp.org/

### Common pitfalls
- **Choosing a cgo-dependent SQLite driver.** `mattn/go-sqlite3` requires cgo, which breaks static builds and makes your Docker image much larger. `modernc.org/sqlite` is pure Go.
- **No timeouts on the HTTP server.** `http.Server` defaults to no timeouts at all. Set `ReadTimeout`, `WriteTimeout`, and `IdleTimeout` explicitly — this is one of the most common Go production mistakes.
- **Trusting client-side validation.** The form validates in React for UX. The server validates for correctness. Both, always.
- **An unprotected public form.** Bots find contact endpoints within days. Rate limit and honeypot before it goes live, not after the spam arrives.

---

## Epic 6 — Release Engineering & CI/CD

This is your professional home ground, so the goal here is less "learn the concepts" and more "learn the specific tooling well enough to make the implementation as opinionated as your experience warrants."

### Understand first
- **Semantic versioning.** You know this. The learning is in *automating* the bump from commit history.
- **GitHub Environments and deployment protection rules.** This is how you get the manual approval gate between staging and production.
- **GitOps as a principle.** Git as the single source of truth for deployed state — achievable without Argo or Kubernetes.
- **Deployment strategies.** Recreate, rolling, blue-green, canary. You're doing recreate-with-health-gate; know where it sits in that spectrum and why the others don't fit a single-host setup.

### Resources
- Semantic Versioning spec — https://semver.org/
- GitHub Environments and protection rules — https://docs.github.com/en/actions/deployment/targeting-different-environments
- release-please — https://github.com/googleapis/release-please
- git-cliff (changelog generation) — https://git-cliff.org/
- Dependabot configuration — https://docs.github.com/en/code-security/dependabot
- *Accelerate* (Forsgren, Humble, Kim) — the DORA metrics book. If you haven't read it, it's the most useful book for framing release engineering work in interview terms.
- DORA / DevOps Research — https://dora.dev/

### Common pitfalls
- **Untested rollback.** A rollback path you've never exercised is a hypothesis, not a capability. Deliberately deploy a broken build and roll it back. Then write about it.
- **Health checks that always pass.** A `/healthz` that returns 200 unconditionally gates nothing. Check the actual dependency.
- **Changelogs nobody reads.** Write commit messages as if the changelog will be read, because it will be — by you, in three months.

### The interview angle
Frame this work in DORA terms when you talk about it: deployment frequency, lead time for changes, change failure rate, time to restore. That vocabulary is what senior engineering leaders use, and having a personal project you can discuss in those terms is unusual.

---

## Epic 7 — Test Automation

### Understand first
- **The test pyramid, and its critics.** Know the classic shape and know the "testing trophy" counter-argument. Being able to discuss the tradeoff is more valuable than dogma about either.
- **Table-driven tests in Go.** The idiomatic pattern. Every Go codebase uses it.
- **Playwright's auto-waiting.** This is the architectural feature that eliminates most flake, and the main reason the market moved. Understand *how* it works, not just that it does.
- **Testing behaviour vs implementation.** React Testing Library's whole philosophy. Query by role and label, not by class name or test ID where you can avoid it.
- **pytest fixtures.** The dependency-injection model that makes pytest worth using over unittest.
- **Gherkin's actual purpose.** A shared language between technical and non-technical stakeholders. Know this so you can be honest about it being partly ceremonial on a solo project.

### Resources
- Go testing package — https://pkg.go.dev/testing
- testify — https://github.com/stretchr/testify
- Go table-driven tests — https://go.dev/wiki/TableDrivenTests
- Vitest — https://vitest.dev/
- React Testing Library, guiding principles — https://testing-library.com/docs/guiding-principles
- Playwright docs (TypeScript) — https://playwright.dev/
- Playwright Python — https://playwright.dev/python/
- Playwright best practices — https://playwright.dev/docs/best-practices
- pytest-bdd — https://pytest-bdd.readthedocs.io/
- Cucumber's Gherkin reference — https://cucumber.io/docs/gherkin/
- axe-core for accessibility testing — https://github.com/dequelabs/axe-core
- Kent C. Dodds, "The Testing Trophy" — https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications

### Common pitfalls
- **CSS selectors in E2E tests.** They break on every styling change. Use Playwright's role-based and text-based locators — they're more stable *and* they assert accessibility as a side effect.
- **Hardcoded waits.** `waitForTimeout` is the flake generator. Playwright's auto-waiting exists precisely so you don't need it.
- **E2E tests on the PR gate.** Slow, flaky, and they train you to ignore red builds. Post-deploy against staging.
- **Gherkin that describes UI mechanics.** "Given I click the button with id submit-btn" is a unit test wearing a costume. Write user intent: "Given I have filled in the contact form."
- **Too many feature files.** Cap at 5–8. The value is in the journeys, not the count.

### The honest framing for your repo README
Say out loud that the BDD layer is partly demonstrative on a solo project, and explain what it would buy you on a team. Engineers reading your repo will respect the self-awareness far more than unexamined process.

---

## Epic 8 — VPS Hardening & Operations

### Understand first
- **SSH key authentication.** How it works, not just how to enable it.
- **iptables, and how Docker interacts with it.** This is the highest-value thing in this epic — see pitfalls.
- **The 3-2-1 backup principle.** And the harder truth: a backup you've never restored isn't a backup.
- **Liveness vs readiness.** Different questions, different endpoints.

### Resources
- Ubuntu Server security guide — https://ubuntu.com/server/docs/security-introduction
- DigitalOcean's initial server setup guides (vendor-agnostic in practice) — https://www.digitalocean.com/community/tutorials
- fail2ban docs — https://github.com/fail2ban/fail2ban
- UFW — https://help.ubuntu.com/community/UFW
- **Docker and iptables** — https://docs.docker.com/engine/network/packet-filtering-firewalls/
- restic — https://restic.readthedocs.io/
- Uptime Kuma — https://github.com/louislam/uptime-kuma
- CIS Benchmarks (Ubuntu, Docker) — https://www.cisecurity.org/cis-benchmarks
- Google SRE Book, free online — https://sre.google/books/

### Common pitfalls
- **Assuming UFW protects your containers. It often doesn't.** Docker writes its own iptables rules and can publish ports that bypass UFW entirely. `ufw status` will look correct while a port is wide open. **Verify with an external port scan from a machine outside your network.** This is the single most common self-hosting security mistake and it's worth an hour of your time to get right.
- **Locking yourself out.** Before disabling password auth, open a *second* SSH session and confirm key auth works in it. Keep the first one open until you're sure.
- **Backups that were never restored.** Do a real restore into a throwaway container. Document it.
- **Unbounded container logs.** They will fill the disk. Set `max-size` and `max-file` on the logging driver.

---

## Epic 9 — Security & Performance Validation *(optional)*

### Before anything else
Read your VPS provider's acceptable use policy. Most have clauses about generating attack or load traffic, and "it's my own server" isn't always a sufficient defence. If it's ambiguous, email support and get written confirmation. Do this before you install anything.

### Understand first
- **The distinction that keeps this legitimate.** You are doing *defensive validation of infrastructure you own*. Scope stays on your own VPS and your own images. That framing matters both legally and in how you describe the work.
- **Latency percentiles, not averages.** p50, p95, p99. An average latency figure hides everything that matters.
- **CVE severity and triage.** Not every HIGH is actionable. Learn to document accepted risk rather than suppress findings.

### Resources
- k6 documentation — https://grafana.com/docs/k6/latest/
- OWASP ZAP — https://www.zaproxy.org/docs/
- ZAP baseline scan in CI — https://www.zaproxy.org/docs/docker/baseline-scan/
- Trivy — https://trivy.dev/
- OWASP Top 10 — https://owasp.org/www-project-top-ten/
- Mozilla Observatory (header grading) — https://developer.mozilla.org/en-US/observatory
- MDN on Content Security Policy — https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP

### Common pitfalls
- **Chasing a perfect ZAP report.** Baseline scans produce noise. Triage honestly, document what you accepted and why. That document is more impressive than a clean report.
- **Load testing production.** Staging only.
- **CSP that breaks the site.** Content Security Policy is genuinely fiddly. Start in report-only mode, watch what it would have blocked, then enforce.

### The payoff
Write this up as a blog post. The testing work becomes content, and a post explaining what you found and fixed demonstrates the skill far better than a résumé bullet.

---

## Epic 10 — Polish & Launch

### Understand first
- **Core Web Vitals.** LCP, INP, CLS. What each measures and what actually moves them.
- **Semantic HTML and ARIA.** The first rule of ARIA is not to use ARIA when semantic HTML will do.
- **Why automated a11y testing isn't enough.** axe catches maybe a third of real accessibility issues. Keyboard and screen reader testing catches the rest.

### Resources
- web.dev Core Web Vitals — https://web.dev/articles/vitals
- Lighthouse — https://developer.chrome.com/docs/lighthouse/
- WCAG 2.2 quick reference — https://www.w3.org/WAI/WCAG22/quickref/
- WebAIM on screen reader testing — https://webaim.org/articles/screenreader_testing/
- Open Graph protocol — https://ogp.me/
- Plausible (self-hosted) — https://plausible.io/docs/self-hosting

### Common pitfalls
- **Gaming Lighthouse.** The score is a proxy. Fix the underlying issues.
- **Forgetting to exclude staging from indexing.** If staging is Tailnet-only this is moot, but verify anyway.
- **Launching with one post.** Three minimum. A blog with one entry reads as abandoned before it started.

---

## Cross-cutting: the habits that matter most

**On using Claude Code as a reviewer.** The rule that actually works: you open the PR, it comments, you write the fix. The moment you find yourself accepting a block of code you couldn't explain to an interviewer, stop and rewrite it yourself. That discomfort is the signal — it's telling you exactly where your understanding is thin, which is useful information rather than something to route around.

Good review prompts: *"Review this diff for bugs and edge cases I've missed."* *"Explain why this test is flaky."* *"What would a staff engineer question in this PR?"* Bad prompts: *"Implement the contact form."*

**On the honest tradeoff.** Claude Code genuinely doesn't do inline tab-completion — it's built for larger instruction-driven tasks with reviewable diffs. That's a constraint that happens to push you toward the discipline you said you wanted. Use it.

**On learning depth.** For each epic, aim to be able to explain the *why* behind your choices to a skeptical senior engineer. If you can't articulate why Playwright over Selenium, or why Compose over Kubernetes, you've configured a tool rather than learned one. The architecture document exists partly so you can practise those explanations.

**On writing as you go.** Keep a scratch file of things that surprised you, broke, or took longer than expected. That file becomes your best blog posts. The debugging story is almost always more interesting than the tutorial.

**On the failure mode.** The risk with this project isn't technical difficulty. It's spending six weeks building an exquisite pipeline for a site with nothing on it. Content first, always. The infrastructure is the frame; the writing is the picture.
