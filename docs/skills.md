# Shareable UI Skills

I keep the reusable UI guidance in `skills/`. Each skill is a small folder with a `SKILL.md` file and optional UI metadata. I can upload one of these folders to a supported skills surface, share it with a workspace, or copy it into another project and adapt it.

## Included Skills

- `ui-design`: Build a product-specific interface with clear hierarchy, responsive behavior, accessible controls, and complete states.
- `ui-review`: Audit an existing interface and report evidence-backed findings ordered by impact.
- `image-to-threejs`: Convert a reference image into an editable, responsive Three.js scene. This is a specialist workflow, not a default for ordinary UI work.

## Install Or Upload

The repository is the source of truth for these files. To use one as a personal or shared skill, upload the corresponding folder from `skills/` through the skills interface, then review its instructions and permissions before installing it. Availability and sharing controls depend on the product surface and workspace settings.

The repository copy and an installed skill are separate. Updating this repository does not silently update an installed copy.

## Scaffold Into A Project

```sh
pnpm scaffold ui-design-skill ./my-app/skills/ui-design
pnpm scaffold ui-review-skill ./my-app/skills/ui-review
pnpm scaffold image-to-threejs-skill ./my-app/skills/image-to-threejs
pnpm scaffold design-system ./my-app/DESIGN.md
```

The `design-system` generator creates a blank brief. I fill it in with the product context, audience, visual direction, typography, color roles, component rules, responsive behavior, and rejected patterns for that project.

## Example Prompts

```text
Use the UI design skill to build the product detail page. Read DESIGN.md first and preserve the existing query and URL-state patterns.
```

```text
Use the UI review skill to inspect the products route at desktop and mobile sizes. Report only evidence-backed findings, ordered by impact.
```

```text
Use the image-to-threejs skill to turn this reference image into an editable scene. Match the camera and silhouette first, then verify the canvas at desktop and mobile sizes.
```

## Why Separate Files?

A skill describes a reusable workflow. `DESIGN.md` records decisions for one product. Keeping them separate means the workflow can travel between projects while the visual direction stays local to the project that owns it.
