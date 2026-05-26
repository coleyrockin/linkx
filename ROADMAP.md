# LinkX Roadmap

## 1) Project Summary

LinkX is a single-screen, recruiter-focused personal hub built with React + Vite and hosted on GitHub Pages at `/linkx/`. It exposes:
- Curated outbound links
- Live activity feed with fallback to static content
- Visual layers (WebGL shader + particle field + CSS art)
- A hidden terminal with command access and test coverage
- PWA/service worker installability

The current repository is stable, deployable, and has no app logic changes requested in this pass. This roadmap is explicitly execution-focused for the next agent.

## 2) Current Product Vision

- Be a compact, low-noise professional entry point that keeps outbound profile signals discoverable.
- Preserve an intentional visual identity while staying technically correct and lightweight.
- Keep external dependencies, runtime behavior, and data surfaces honest and easy to operate.
- Avoid turning into a full portfolio CMS or blog platform.

## 3) Target Users

- Recruiters checking candidate signal quality quickly.
- Employers evaluating front-end craft and execution discipline.
- Team members reviewing a live portfolio micro-app.
- Contributors who need a predictable, low-maintenance static React + GitHub Pages stack.

## 4) What Is Finished

- Static SPA scaffold, deploy flow, and base-path handling for local/prod are in place.
- Outbound links are data-driven (`src/data/links.json` + `src/data/links.js`).
- The Now section fetches from GitHub public activity with local cache + fallback.
- PWA install path is configured (`public/sw.js`, manifest, icons).
- Unit + e2e + axe checks are integrated in CI.
- Visual polish and terminal commands are tested (`src/components/Terminal/commands.test.js`, `tests/e2e/terminal.spec.js`).

## 5) What Appears Unfinished

- Operational hardening is not documented as a release contract (runbook, expected command outputs, failure behavior).
- No explicit schema/contract tests for `links.json`, `now.json`, or terminal command outputs beyond direct assertions.
- No documented incident/security triage path for runtime issues.
- README roadmap/plan is partial; execution sequencing is not explicit for future contributors.

## 6) What Appears Broken or Risky

- External script dependency in `index.html` and analytics (`plausible`) are live; this is intentional but deserves documented CSP and fallback policy.
- The `links` rendering contract relies on `links.js` icon mapping matching every `link.id`; unknown IDs can cause runtime breakage if new entries are added without an icon.
- GitHub activity fetching has no request timeout/abort policy; UI recovery is fallback-based but timing behavior is implicit.
- Font loading and external asset requests rely on third-party CDNs and should be documented for privacy/perf assumptions.
- Production hardening is good but operational checks are not captured as a checklist beside code.

## 7) What Hurts Maintainability

- Data contracts are clear but not validated; shape drift is only implicitly tested.
- Command surface and link data can diverge from tests without shared fixtures or explicit snapshots.
- `README.md` mixes current implementation with “planned” language in the same section.
- No architecture decision record (ADR) for terminal scope, visual layers, and cache strategy.

## 8) What Hurts User Experience

- Terminal/interaction is intentionally creative but may need explicit UX guardrails (for first-time users).
- No explicit “what changed last” section makes updates less transparent to return visitors.
- Some copy and copywriting are technical/experimental and can read as opaque to non-technical reviewers.

## 9) What Hurts Recruiter or GitHub Presentation

- The repository does not expose a concise “what to validate first” section linking features to tests.
- Missing release/version notes for the last audit/release cycle in README.
- Lack of one-page execution map from install → test → deploy hinders rapid human review.

## 10) What Must Be Protected

1. Base path behavior (`vite.config.js`: local `/` vs prod `/linkx/`) must not be changed without matching manifest, sw cache paths, and links.
2. Outbound link open-mode behavior (`target/_blank + rel`) should remain safe for public links.
3. Now feed fallback behavior should preserve functionality if GitHub API is rate-limited.
4. Terminal command parsing and close behavior should remain deterministic and keyboard-accessible.
5. Service worker cache/version strategy should remain coherent with deploy process.

## 11) Highest Priority Fixes

### H1. Add explicit data contracts for `links.json`, `now.json`, and terminal outputs
- What: Define and enforce shape checks with lightweight validation before render/command execution.
- Why: Prevent production breakage from malformed fixture updates.
- Expected impact: Fewer silent failures when adding/removing links or now items.
- Difficulty: Low
- Risk: Low
- Dependencies: `src/data/links.json`, `src/data/links.js`, `src/data/now.json`, `src/components/Terminal/commands.js`, `src/components/Terminal/commands.test.js`
- Suggested order: 1
- Acceptance criteria: CI fails if required fields are missing or types are wrong.
- Tests/checks: `npm run lint`, `npm test`, add/extend tests around fixture shape assumptions.

### H2. Add explicit external dependency policy in docs
- What: Document all third-party endpoints/fonts/scripts and acceptable failure modes.
- Why: Clarifies privacy and availability expectations for reviewers and recruiters.
- Expected impact: Reduced confusion if external service is blocked or slow.
- Difficulty: Low
- Risk: Low
- Dependencies: `README.md`, `index.html`, `public/robots.txt`
- Suggested order: 2
- Acceptance criteria: README includes outbound services list and graceful behavior notes.
- Tests/checks: Manual doc review + network-off smoke in browser.

### H3. Formalize release verification status in docs
- What: Add a “Current Verification Status” section with command outcomes and failure history.
- Why: Makes repo hygiene auditable without digging into workflow internals.
- Expected impact: Better handoff quality and trust.
- Difficulty: Low
- Risk: Low
- Dependencies: `ROADMAP.md`, `README.md`
- Suggested order: 1 (or 2, depending on doc ordering)
- Acceptance criteria: Both docs show last local/CI verification commands and outcomes.
- Tests/checks: None beyond review.

### H4. Harden terminal command list and help text alignment
- What: Keep command outputs, help text, and tests strictly aligned from one source.
- Why: Terminal is visible in docs/tests; drift creates reputational inconsistency.
- Expected impact: Reduced false expectations in tests and demos.
- Difficulty: Medium
- Risk: Medium (if command behavior changes without docs sync).
- Dependencies: `src/components/Terminal/commands.js`, `src/components/Terminal/commands.test.js`, `tests/e2e/terminal.spec.js`, `README.md`
- Suggested order: 3
- Acceptance criteria: Terminal command tests and docs always reference the same command set and description.
- Tests/checks: `npm test`, `npm run test:e2e`.

## 12) Architecture Recommendations

1. Keep the current architecture boundaries:
   - UI layer: `src/components`
   - Feature hooks: `src/hooks`
   - App settings/data: `src/data`
   - Tooling/tests: `src/components/Terminal`, `tests`
2. Add small module-level documentation comments for external interaction points (`analytics`, `github`, `service worker`).
3. Keep terminal and Now feed as read-only runtime surfaces unless a deliberate expansion is planned.
4. Keep `LinkXPage.jsx` as composition root; avoid moving presentation logic into hooks.

### For each recommendation
- What: Add module notes and ownership so future maintainers know why each module exists.
- Why: Reduces accidental refactor risk.
- Expected impact: Faster onboarding and safer edits.
- Difficulty: Low to Medium
- Risk: Low
- Dependencies: `src/components`, `src/hooks`, `src/lib`, `src/data`
- Suggested order: 1
- Acceptance criteria: New contributor can locate and explain each module in under 10 minutes.
- Tests/checks: Review check + `npm run lint`.

## 13) Refactor Recommendations

- Extract reusable command/data fixtures into a test helper module (only if needed for maintenance burden).
- Introduce explicit default icon for unknown link IDs to avoid runtime render errors.
- Add deterministic mock strategy for `matchMedia`/canvas APIs in tests to simplify terminal and rendering assertions.

### Refactor item format
- What: Convert repeated test/data setup into shared utilities.
- Why: Reduce drift between terminal, links, and now assertions.
- Expected impact: Fewer brittle tests and easier additions.
- Difficulty: Medium
- Risk: Medium
- Dependencies: `src/components/Terminal/commands.test.js`, `src/LinkX.test.jsx`, `tests/e2e/smoke.spec.js`, `src/components/LinkXPage.jsx`, `src/data/links.js`
- Suggested order: After H1/H4.
- Acceptance criteria: Command/list behavior remains unchanged; tests still cover all existing cases.
- Tests/checks: `npm test`, `npm run test:e2e`.

## 14) UI and UX Recommendations

### U1. Clarify first-time visitor cues
- What: Add concise “What this page is” microcopy near terminal and contact areas.
- Why: Terminal-first interaction can confuse first-time users.
- Expected impact: Better scanability and lower cognitive load.
- Difficulty: Low
- Risk: Low
- Dependencies: `src/components/LinkXPage.jsx`, `src/styles/index.css`
- Suggested order: 4
- Acceptance criteria: New visitors can complete one outbound click and close terminal without guesswork.
- Tests/checks: Lightweight manual UX pass in desktop + mobile.

### U2. Improve recruiter discoverability
- What: Include a consistent, minimal “Status / What’s new / What to run” section in README and one visible area in app footer.
- Why: Recruiters need context quickly.
- Expected impact: Better portfolio conversion.
- Difficulty: Low
- Risk: Low
- Dependencies: `README.md`
- Suggested order: 5
- Acceptance criteria: A human can read what is live in under 30 seconds.
- Tests/checks: Manual review.

## 15) Performance Recommendations

1. Measure and document first paint and interaction readiness against local preview.
2. Keep particle/shader work reduced for low-end/coarse pointer contexts (already partially handled) and capture rationale.
3. Reduce non-critical runtime console noise in production by making dev-only diagnostics explicit.
4. Consider documenting a minimal performance budget (first meaningful frame expectation, shader fallback criteria).

### What/Why/How template
- What: Add performance checkpoints and expected baselines to docs.
- Why: Prevents accidental regressions in visual layers.
- Expected impact: Faster regression spotting.
- Difficulty: Low
- Risk: Low
- Dependencies: `ROADMAP.md`, `README.md`, `playwright.config.js`
- Suggested order: 6
- Acceptance criteria: Baseline numbers captured for at least one desktop and one mobile environment.
- Tests/checks: Manual local smoke + optional profiler logs.

## 16) Security Recommendations

- Keep analytics script domain-limited to the intended host (already in place).
- Add optional production CSP document and threat model notes (minimal, non-blocking).
- Verify no secrets or credentials appear in code, README, or screenshots.
- Clarify cache/cache-key rotation rationale and stale-asset risk in `sw.js`.

### Itemized security backlog
- What: Document security controls and residual risks in one section of README/ROADMAP.
- Why: Makes the trust boundary explicit for public consumption.
- Expected impact: Better auditability and lower reviewer friction.
- Difficulty: Low
- Risk: Low
- Dependencies: `README.md`, `ROADMAP.md`, `public/sw.js`, `src/lib/analytics.js`
- Suggested order: 2
- Acceptance criteria: Security section covers outbound requests, local storage usage, and failure fallbacks.
- Tests/checks: Manual security review pass + `npm audit --omit=dev`.

## 17) Accessibility Recommendations

- Keep current axe coverage and expand to check terminal labels after any command surface changes.
- Validate focus visibility in both overlay and base page states.
- Keep alt text and landmark labeling consistent as copy or structure evolves.

### Action format
- What: Add accessibility regression checklist and include it in docs.
- Why: Helps prevent silent a11y drift in creative visuals.
- Expected impact: Stronger WCAG conformance confidence.
- Difficulty: Low
- Risk: Low
- Dependencies: `tests/e2e`, `src/components/Terminal/Terminal.jsx`, `src/components/LinkXPage.jsx`
- Suggested order: 4
- Acceptance criteria: Existing axe serious/critical checks remain clean; manual tab-flow remains stable.
- Tests/checks: `npm run test:e2e`, terminal UX manual pass.

## 18) SEO Recommendations

- Keep title, description, OG/Twitter, and canonical link set coherent after any route/base-path changes.
- Maintain screenshot/OG generation workflow so social images align with latest UI.
- Ensure static text is crawlable even if JavaScript rendering is delayed.

### Implementation note
- What: Add a short SEO section in README and a checklist for metadata checks.
- Why: Improves discoverability and prevents silent preview mismatch.
- Expected impact: Better link preview consistency.
- Difficulty: Low
- Risk: Low
- Dependencies: `index.html`, `public/og-image.jpg`, `scripts/screenshot.mjs`
- Suggested order: 5
- Acceptance criteria: Shared tags and paths remain valid across base path.
- Tests/checks: `npm run build` + manual social preview check.

## 19) Testing Strategy

- Unit:
  - `npm test` for command behavior, link rendering, and smoke of page entry.
- E2E:
  - `npm run test:e2e` for terminal + smoke + axe checks.
- Manual:
  - Desktop + mobile visual/manual interaction checks for terminal, links, Now fallback.
- CI:
  - Keep both workflows (`deploy-pages.yml`, `audit.yml`) aligned to avoid silent test drift.
- Contract drift:
  - Add checks for JSON/data fixture shapes in dedicated tests.

## 20) CI/CD and Deployment Recommendations

- Keep `main` as the deployment branch and require clean docs + verification before push.
- Keep build/test workflow step ordering (install → test → build → deploy) and avoid adding non-idempotent side effects.
- Add explicit artifact notes for visual proof in PRs for future roadmap work.
- Add rollback note in `ROADMAP.md` for workflow failures.

### Current Verification Status

The following commands should be executed before merging roadmap-driven follow-up PRs:

1. `npm run lint`
2. `npm test`
3. `npm run build`
4. `npm run test:e2e`
5. `npm audit --omit=dev`

Acceptance gates:
- Lint and tests must pass before changes to production logic.
- If `npm run test:e2e` fails due browser toolchain, note environment/setup in roadmap and PR.

## 21) Documentation Improvements

- Keep README concise with:
  - What the project is
  - What it currently does
  - How to run locally
  - How to verify
  - Link to this roadmap
- Add a short "Known limitations" section in README.
- Add a release note line for each update or notable doc change.

## 22) GitHub Presentation Improvements

- Add roadmap link in top section of README.
- Replace aspirational phrasing with factual state labels: done / planned / blocked.
- Keep screenshot path and badge list synchronized.
- Keep branch health section minimal and stable.

## 23) Recruiter and Portfolio Polish

- Emphasize practical signals over hype:
  - terminal, live links, now feed fallback, and tests.
- Include evidence bundle:
  - screenshot from latest state
  - verification command output summary
  - commit history snippet.
- Ensure contact surface (`mailto`, LinkedIn, GitHub, portfolio) is explicit and consistent.

## 24) Future Feature Ideas (Deferred)

- None should be started without explicit roadmap phase approval.
- Candidates, if required later:
  - minimal theme toggle for accessibility studies
  - richer activity badges
  - offline "last sync" UX indicator for PWA mode

## 25) Production Readiness Checklist

- [ ] README describes project scope and current status clearly.
- [ ] ROADMAP exists and is current with priority order.
- [ ] Lint, unit, build, and e2e are all green.
- [ ] `npm audit --omit=dev` is documented and reviewed on each milestone.
- [ ] Link and now data contracts are stable and reviewed before edits.
- [ ] Service worker cache key changes are explained and test-verified.
- [ ] No unknown external changes to base path or deployment path.
- [ ] Security/privacy assumptions are documented.

## 26) Suggested Milestone Order

1. **Milestone A — Documentation hardening (1–2 days)**
   - Deliver roadmap update, README cleanup, verification status, contract notes.
2. **Milestone B — Contract hardening (2–3 days)**
   - Add fixture/command contract checks and test fixtures strategy.
3. **Milestone C — Ops and visibility (1–2 days)**
   - Add release/check runbook, security policy notes, verification evidence workflow.
4. **Milestone D — UX refinement (2–3 days)**
   - Copy clarity, first-run guidance, recruiter-facing polish.
5. **Milestone E — Performance and risk closure (optional)**
   - Measure and document baseline, finalize acceptance criteria.

## 27) Next Agent Instructions

1) **First 5 tasks**
   - Update `ROADMAP.md` with the current verification outcomes from local run and push history.
   - Add/verify "Current Verification Status" section in both README and roadmap.
   - Confirm `README.md` links to roadmap and reflects scope accurately.
   - Run the required verification command set and capture results.
   - Stage and commit only docs (`README.md`, `ROADMAP.md`), unless explicitly instructed to modify app logic.

2) **Files likely involved**
   - `ROADMAP.md`
   - `README.md`

3. **Commands to run before making changes**
   - `git status --short --branch`
   - `git log --oneline -n 8`
   - `npm run lint`
   - `npm test`
   - `npm run build`

4. **Commands to run after making changes**
   - `npm run test:e2e`
   - `npm audit --omit=dev`
   - `git status --short`
   - `git diff --check`

5. **Tests to verify**
   - `npm run lint`
   - `npm test`
   - `npm run build`
   - `npm run test:e2e`

6. **What not to break**
   - Vite base-path switching (`/` local, `/linkx/` production).
   - Outbound link target/rel semantics for external vs internal links.
   - Current terminal command surface.
   - Service worker cache/versioning assumptions.

7. **When to stop and ask for review**
   - If any verification command fails in a way that may require code changes.
   - If roadmap priorities conflict with existing base-path/deploy behavior.
   - If there is ambiguity about security/privacy scope.

8. **Recommended first commit message**
   - `docs: add roadmap for next agent`

## 28) Current Verification Status

Run these commands in the current docs-only branch before handoff. Record pass/fail and timestamps.

### Commands
- `npm run lint`
- `npm test`
- `npm run build`
- `npm run test:e2e`
- `npm audit --omit=dev`

### Baseline expectations
- No app logic changes in this pass.
- Any failures are likely environment/tooling related unless clearly tied to docs changes (which should not affect runtime).
- Failures must be documented and handed to the next agent in this section with impact and recommendation.
