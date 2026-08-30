# Demo Design Brief

## Product

- Name: Product Operations Demo
- Primary user: An operator scanning product health and taking routine actions
- Core task: Find a product, understand its current state, and start or monitor an operation
- Product context: A compact example application for demonstrating recurring React UI patterns

## Visual Direction

- Design qualities: Calm, information-dense, precise, and easy to scan
- Avoid: Marketing-style hero layouts, ornamental decoration, ambiguous icon-only actions, and excessive card nesting
- Reference products or materials: None; the interface should remain product-agnostic

## Type and Color

- Display type: Strong page titles with restrained scale
- Body type: System sans-serif with readable line height
- Color roles: Neutral canvas, high-contrast text, restrained accent color, semantic success/warning/error states
- Contrast requirements: Text, controls, focus indicators, and status signals must remain legible in all states

## Layout and Components

- First-viewport priority: Page title, key context, primary action, and the most useful current data
- Content density: Dense enough for scanning without compressing labels or touch targets
- Spacing rhythm: Consistent spacing from the existing UI primitives and Tailwind tokens
- Component and control rules: Reuse shared buttons, panels, tables, toasts, and navigation patterns
- Loading, empty, error, and success states: Every server-backed surface should make its current state obvious and recoverable

## Responsive Behavior

- Narrow layout: Keep primary actions reachable, allow tables to scroll or reflow, and preserve readable labels
- Wide layout: Use available width for comparison and scanning without stretching content into long unreadable lines
- Touch and keyboard behavior: Use stable hit areas, visible focus, and controls that do not depend on hover

## Decisions To Revisit

- Add a real backend only when it clarifies a pattern that mock data cannot demonstrate
