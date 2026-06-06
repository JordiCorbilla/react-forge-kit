# Architecture

I keep the repo example-driven. Packages provide small reusable boundaries, and the demo app proves the boundaries with runnable product-agnostic examples.

The API package owns request contracts, mock data, artificial latency, and normalized errors. The query package owns server-state reads, mutations, optimistic updates, polling, and invalidation. The state package owns UI-only preferences and selections. URL helpers keep shareable navigation state out of component state.

AG Grid is isolated behind a Community-first wrapper. If I need Enterprise features later, I can add registration and licensed modules at the app boundary without changing the default package.
