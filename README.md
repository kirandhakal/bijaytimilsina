# Bijay Timilsina — portfolio

An original Next.js App Router portfolio with TypeScript, Three.js, and responsive CSS. The existing biographical details, social links, and contact API are retained. The parent project's folder guide and redesign branches informed the component boundaries; the design and implementation are new.

## Develop

Requires Node.js 20.9+.

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npm run typecheck
npm run build
npm test
```

The production build produces a static `out/` directory. Browser tests serve that export on port 3117 and currently use `/usr/bin/google-chrome`; change `executablePath` in `playwright.config.ts` for another environment. Contact requests are intercepted in tests so they do not send real messages.

## Deploy

Publish the **contents of `out/`**, not the repository root. This preserves direct route access on static hosts. `public/CNAME` and `.nojekyll` are copied into the export for the existing custom-domain GitHub Pages setup. If using GitHub Pages, configure a build workflow to run `npm ci` and `npm run build`, then upload `out/` as the Pages artifact. The old root HTML deployment is replaced by this build step. Nothing has been deployed automatically.

## Content and behavior

- Edit `src/data/portfolio.ts` for profile details, social links, skills, services, and exploration cards.
- Explore presents interests, not unverified project case studies. Add real project details when available.
- The form uses the existing JSON endpoint with `name`, `email`, and `message`. It handles validation, pending state, success, rate limits, network failure, and timeout. Live delivery depends on that service and its CORS/domain configuration.
- Three.js is dynamically imported in the browser. Rendering stops offscreen, in hidden tabs, on pause, and under reduced-motion preferences. GPU resources and listeners are cleaned up on unmount. A CSS illustration remains if WebGL cannot initialize.
- The original Bootstrap site and its license notices are retained in `legacy/` for reference and rollback. They are not included in the static export.

See [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) for the route and component map.
