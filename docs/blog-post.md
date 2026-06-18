# Why I Built react-forge-kit

Every React project I start eventually needs the same set of patterns.

Not the same screens. Not the same product. Not the same domain model. But the same decisions keep coming back:

- How should API calls be structured?
- Where should server state live?
- What belongs in local UI state?
- How should filters and detail pages use the URL?
- How do I show background job progress without blocking the user?
- How do I handle toasts, loading states, empty states, and errors consistently?
- How do I use AG Grid without letting grid state take over the application?
- How do I add realtime events without coupling everything to one backend implementation?

`react-forge-kit` is my answer to that repetition.

It is not another starter template. I did not want a polished blank app that looks good for five minutes and then gets deleted once real work begins. I wanted a practical, example-driven repository that captures the frontend patterns I reach for when building serious React applications.

The intention is simple: keep a public, product-agnostic React toolkit that I can copy from, learn from, and evolve over time.

## Example-Driven, Not Framework-Driven

The value of this repo is not that it uses React, Vite, TypeScript, TanStack Query, Zustand, AG Grid, SignalR, Tailwind, or any other individual library.

The value is in the patterns those tools demonstrate together.

The demo app is deliberately generic. It uses fictional products and background jobs because the domain is not the point. The point is to show real application behavior in a safe, reusable way:

- A product list with search, filters, pagination, selection, and URL state.
- A product detail page that can be opened directly from a deep link.
- A mutation that updates the UI optimistically and then invalidates the right queries.
- A background job that starts quickly, reports progress, and does not block the rest of the app.
- Toast notifications for success, failure, and long-running work.
- AG Grid examples for sorting, filtering, row actions, density preferences, and loading states.
- A SignalR abstraction that works with a mock event bus locally and can be replaced by a real hub later.

Those are the things I want to reuse.

## The State Model

One of the most important decisions in the repo is the state ownership model.

I keep it intentionally boring:

| State type | Owner | Examples |
| --- | --- | --- |
| Server state | TanStack Query | Products, jobs, mutation results, invalidation |
| Local UI state | Zustand | Selected rows, density, shell preferences, recently viewed ids |
| URL state | Router/search params | Search, filters, page number, product id |
| Ephemeral state | Component state | Open menus, draft input, temporary toggles |

This split avoids a lot of accidental complexity.

TanStack Query owns data that comes from an API. Zustand owns local interface preferences. The URL owns anything that should be shareable or restorable through browser navigation. Component state owns short-lived interactions.

I am intentionally not using Redux here. Redux is useful when the client workflow itself is the domain, especially when events, replay, undo, and reducer discipline are central to the application. That is not the default case for this repo. For most product interfaces, TanStack Query plus Zustand plus URL state is the cleaner baseline.

## Background Jobs Matter

The background job example is one of the main reasons this repo exists.

Many applications eventually need a user to start something that takes longer than a normal request: generating a report, importing data, exporting records, syncing inventory, processing a batch, or recalculating something expensive.

The pattern I want is:

1. The user clicks a button.
2. The button shows a pending state.
3. A mutation starts the job.
4. A toast confirms the job started.
5. The user can keep using the app.
6. A jobs page shows progress.
7. Polling or realtime events update the job.
8. Completion is visible and non-disruptive.
9. Relevant queries are invalidated.
10. Errors are normalized before reaching the UI.

That flow is much more useful than another example of fetching a list and rendering a table.

## AG Grid Without Letting It Own The App

AG Grid is powerful, but it can also become a gravity well. If every table concern becomes a grid concern, the rest of the application gets harder to reason about.

In this repo I keep AG Grid behind a small wrapper and treat it as a view layer for rich tabular interaction.

The rule is:

- Server-backed data stays in TanStack Query.
- Shareable filters stay in the URL.
- Persistent UI preferences stay in Zustand.
- Grid helpers stay generic.
- AG Grid Community is the default.

Enterprise features can be added later at the app boundary, but the baseline stays usable without a commercial license.

## Realtime As An Abstraction

Realtime behavior is useful, but I do not want the app tightly coupled to one transport in every component.

The SignalR package exposes a provider, a connection hook, an event hook, typed events, reconnect-aware status, and a mock fallback. The demo can show progress events without a real backend, while still leaving a clear path to a real ASP.NET Core SignalR hub.

That gives me a local development story and a production integration story without mixing the two.

## A Small Scaffolder, Not A Giant Generator

The repo includes a small scaffolder CLI because sometimes I do not want the whole demo. I want one slice:

- A Vite app shape.
- A Next.js app note.
- A UI package.
- An AG Grid page.
- A SignalR client.
- A TanStack Query API layer.

The scaffolder is intentionally small. It copies focused recipes rather than pretending to generate a complete product.

That is the philosophy of the repo overall: copy the useful pattern, then adapt it to the project in front of me.

## Public-Safe By Design

Everything in `react-forge-kit` is fictional and mock-backed.

There are no private endpoints, real customer records, company-specific examples, proprietary domain models, or copied application code. The examples are generic on purpose because I want the repo to be useful in public and safe to share.

That constraint is also helpful architecturally. It forces the examples to prove the frontend patterns without relying on a private backend or a familiar business domain.

## What I Want This Repo To Become

I want `react-forge-kit` to become a living reference for how I build modern React applications.

Not a framework. Not a boilerplate. Not a one-size-fits-all starter.

A collection of working examples and decisions:

- How I structure API clients.
- How I write query keys and mutations.
- How I separate server state, UI state, URL state, and component state.
- How I model background work.
- How I surface progress and notifications.
- How I use AG Grid responsibly.
- How I keep realtime integration replaceable.
- How I document architectural decisions so future work follows the same direction.

The repo will evolve as the patterns evolve. Some examples will get replaced. Some packages will get simpler. Some recipes will become more complete. That is the point.

The best toolkit is not the one with the most abstractions. It is the one that helps me start from a known-good pattern and still make the right decision for the project in front of me.

That is what `react-forge-kit` is for.
