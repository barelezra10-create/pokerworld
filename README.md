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

## Practice table and training reviews

`/play` supports two to six seats with successive hands using free, non-redeemable chips. The button moves each hand. Legal actions, short all-ins, main/side pots and odd-chip splits are checked. Each rule-based opponent sees only its own hand and the board. Session state is in memory and resets on reload. This is not a GTO opponent or a real dealer connection.

Dealer footage: https://mixkit.co/free-stock-video/people-playing-poker-at-a-casino-40489/ — Mixkit Stock Video Free License. The clip is labelled as recorded, decorative footage and does not determine dealt cards. Motion is disabled by default for reduced-motion and Save-Data preferences.

`/reviews` covers three learning products using primary product documentation. Reviews explicitly state no hands-on testing and no active affiliate partnerships. Do not insert tracking links or claim a partnership without confirming the actual agreement and adding an adjacent disclosure.

Run all model tests with `node --test tests/*.test.ts`. Coverage includes blinds, street order, minimum raises, all-in runouts, split pots, unmatched chip refunds, chip conservation and deck uniqueness.

The table-size picker includes the human player. Busted opponents sit out; reset starts everyone at 1,000 chips. Cards animate from the dealer position and the human hand sits in the foreground. Optional table sounds require a user gesture. Recorded dealer footage remains decorative and cannot show the exact cards drawn by the simulation.

## 3D dealer prototype

The play table now uses a procedural Three.js character instead of stock footage. A timed sequence moves the arm and releases the actual DOM card to its seat or board position; player actions wait until the sequence ends. Two dealing rounds follow button-relative seat order. Reduced-motion skips choreography. WebGL failure leaves the standard table usable. This is a stylized prototype, not a photorealistic rigged/scanned character. Legacy video files remain unused.
