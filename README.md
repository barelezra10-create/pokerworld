# Pokerhub

A poker study hub with a two-player Texas hold’em equity simulator, pot-odds calculator, expandable strategy lessons, and country-specific regulatory resources and live-room links.

## Development

Requires Node 24 (the scaffold requires at least 22.13).

```
npm ci
npm run dev
npm run build
node --test tests/poker.test.ts
```

The build exports static files to `dist/client`. Serve that directory with clean-URL support (`/path` → `/path.html`) and a real 404 fallback. The existing `start` script belongs to the scaffold's Cloudflare development workflow, not a generic static production host.

## Model and content limits

The simulator draws 10,000 random boards without replacement per runout. A complete board uses an exact comparison. Equity includes half of tied pots. This is a fixed-hand showdown model, not a range solver, ICM calculator or betting recommendation.

Country coverage starts with the UK, France, Romania and the US (New Jersey online resources). Primary regulatory and venue sources are linked in the interface and were checked on 7 September 2026. Romania does not yet have a verified named venue. Confirm local eligibility, age and current licensing directly.

The optional `simulate_poker_hand` WebMCP tool uses the visible simulator state. Its browser contract has not been independently verified because no supported WebMCP validation context was available. Core simulation checks and the production build were run.
