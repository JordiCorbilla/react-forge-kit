# Query Patterns

## Add a Query Hook

1. Add the API method to `packages/api`.
2. Add a stable key to `queryKeys`.
3. Read through `useQuery`, passing `signal` into the API call.
4. Keep filters in the key so cache entries stay separate.

## Add a Mutation With Optimistic Update

Use `onMutate` to snapshot old cache data, write the optimistic value, restore on error, and invalidate on settle. I use this for product status changes because the UI can update immediately while the mock API resolves.

## Invalidation

Invalidate the smallest useful scope. Product status changes invalidate product lists and the affected detail key. Background job creation invalidates job lists.

## Polling

Polling belongs in the query hook when it is part of the data contract. Job hooks poll only while a job is `queued` or `running`.
