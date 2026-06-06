# Next App Recipe

I use this when routing and server-first loading should live in Next.js App Router.

```sh
pnpm create next-app my-app --ts --app
```

Use server components for initial reads, client components for interactive widgets, and TanStack Query where client-side refetching, polling, optimistic updates, or cache invalidation are needed.
