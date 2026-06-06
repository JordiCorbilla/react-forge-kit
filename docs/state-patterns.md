# State Patterns

TanStack Query owns server state. Zustand owns local client-only UI state. URL search params own shareable navigation and filter state. Component state owns temporary interaction state.

I do not put products, jobs, or API responses in Zustand. I use Zustand for sidebar state, selected row ids, density, theme preference, and recently viewed product ids.

Redux is intentionally absent. I will add it only if a future example needs event-sourced client workflows where actions, reducers, replay, and middleware are the point of the example.
