# Next.js Usage Notes

In Next.js App Router, I use server components for server-first reads and dynamic route segments for entity detail pages.

Use `searchParams` for shareable filters. Use client components for interactive widgets such as grids, optimistic mutations, toasts, and realtime subscriptions.

TanStack Query is still useful in client components when I need polling, invalidation, optimistic updates, cancellation, or long-lived cache behavior after the initial server render.
