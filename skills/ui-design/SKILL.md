---
name: ui-design
description: Design or improve product interfaces with a distinctive visual direction, clear hierarchy, responsive behavior, and complete interaction states.
---

# UI Design

Use this skill when building or substantially redesigning a web UI. It applies to product screens, dashboards, workflows, settings, and reusable UI systems. It does not replace a product brief or a specialist 3D workflow.

## Workflow

1. Inspect the existing app, design tokens, routes, components, and available screenshots before choosing a direction.
2. Read `DESIGN.md` at the project root when it exists. If it does not exist and the request is substantial, create a concise one that records the audience, product context, visual direction, typography, color roles, responsive rules, and rejected patterns.
3. Define the screen's primary user task and make that task the first-viewport signal. Establish hierarchy through layout, type, spacing, contrast, and meaningful imagery rather than decoration.
4. Reuse the project's primitives and interaction conventions. Use familiar icons and controls for actions, with accessible names and tooltips where an icon is not self-explanatory.
5. Design the full state set: loading, empty, error, success, disabled, hover, focus, validation, and long-content behavior. Keep async feedback close to the action that caused it.
6. Make responsive constraints explicit. Check narrow and wide layouts, text wrapping, touch targets, keyboard navigation, and whether controls remain usable without hover.
7. Use real or generated visual assets when the product needs them. Avoid generic gradient decoration, ornamental blobs, oversized marketing composition, nested cards, and visible instructions that merely describe the UI.
8. Validate important screens in a browser or with screenshots when those tools are available. Fix overlap, clipping, unreadable contrast, blank media, and layout shifts before finishing.

## Output

Keep the implementation consistent with the existing stack and scope. Explain meaningful visual decisions in the change summary, and update `DESIGN.md` only when the product direction has genuinely changed.
