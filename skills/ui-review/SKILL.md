---
name: ui-review
description: Review an existing web UI for hierarchy, consistency, accessibility, responsive behavior, and interaction quality, with actionable findings.
---

# UI Review

Use this skill when asked to audit, polish, critique, or improve an existing UI. It is a review workflow, not a request to redesign every screen.

## Workflow

1. Inspect the relevant route, components, styles, design tokens, and existing tests. Read `DESIGN.md` when present so the review measures the UI against its stated intent.
2. Exercise the main workflow at desktop and narrow widths. Use browser inspection or screenshots where available; otherwise state which visual checks could not be performed.
3. Check, in order: primary task clarity, information hierarchy, interaction feedback, layout integrity, responsive behavior, accessibility, consistency with existing primitives, and visual polish.
4. Test meaningful states including loading, empty, error, success, disabled, focus, long labels, long lists, and failed network actions where the app supports them.
5. Report only evidence-backed findings. Order them by impact, include the file and line or component when possible, explain the user consequence, and give a concrete fix.

## Review format

Lead with findings using severity labels such as `[P1]`, `[P2]`, or `[P3]`. Separate confirmed issues from questions and unverified visual risks. End with a short summary and remaining test gaps. Do not recommend adding decoration when a hierarchy, content, or interaction problem is the real issue.
