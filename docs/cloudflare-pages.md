# Cloudflare Pages Deployment

I deploy the Vite demo as a static Cloudflare Pages site.

## Project

- Project name: `react-forge-kit`
- Build command: `pnpm --filter demo-vite build`
- Build output directory: `apps/demo-vite/dist`
- Production branch: `main`

The demo uses TanStack Router, so `apps/demo-vite/public/_redirects` sends all routes back to `index.html`. That keeps direct links like `/products/product-3` working after deployment.

## GitHub Actions

The workflow in `.github/workflows/cloudflare-pages.yml` deploys on every push to `main` and can also be run manually.

Add these GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The API token needs permission to deploy Cloudflare Pages for the account.

## First Deploy

Create the Pages project in Cloudflare with the name `react-forge-kit`, then run the workflow from GitHub Actions.

For a local deploy after logging in with Wrangler:

```sh
corepack pnpm install
corepack pnpm deploy:cloudflare
```

The public URL will normally be:

```text
https://react-forge-kit.pages.dev
```
