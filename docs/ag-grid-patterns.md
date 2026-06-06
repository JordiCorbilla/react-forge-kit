# AG Grid Patterns

I use AG Grid when the page needs rich sorting, filtering, selection, custom cells, and larger row sets. I use a simple table when the data is small or the interaction model is straightforward.

The grid package registers AG Grid Community only. Enterprise can be added later by registering Enterprise modules at an application boundary.

Grid state can become messy quickly. I keep shareable filters in the URL, persistent preferences in Zustand, and server-backed data in TanStack Query.

## Add an Action Column

Add a column with `sortable: false`, `filter: false`, and a small renderer that receives the row and calls a typed action handler.
