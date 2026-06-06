# Cloudflare Tunnel Preview

I use this when I want to check the demo from a phone without waiting for a hosted Pages deployment.

## Start Vite

```sh
corepack pnpm dev:lan
```

That serves the Vite demo on:

```text
http://127.0.0.1:5174
```

The `dev:lan` script binds Vite to `0.0.0.0` so local network and tunnel traffic can reach it.

## Start The Tunnel

In a second terminal:

```sh
cloudflared tunnel --url http://127.0.0.1:5174
```

Cloudflare prints a temporary `https://*.trycloudflare.com` URL. Open that URL from a phone to reach the local Vite app.

## Notes

- The URL changes each time the tunnel starts.
- The demo currently uses mocked API and mocked realtime data, so no backend tunnel is needed.
- If a future example adds a local backend, keep the browser pointed at the Vite tunnel URL and let Vite proxy `/api` and `/hubs` to the local backend.
- Vite must allow the tunnel host header. The demo config allows `*.trycloudflare.com` through `server.allowedHosts`.
