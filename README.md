# Casino design system prototypes

Static HTML/CSS/JS component previews — no build step, deployed as-is.

- **Root (`/`)** → Jackpot Tracker, OSC (onlinespielcasino.de) — the live demo, rewritten via `vercel.json`.
- **`/all-demos.html`** → landing page linking to every prototype: OSC latest, TPP reference host, the OSC v1 snapshot, and the CTA button demo.

Tokens live in `tokens/` (one file per brand, sourced from real production values, not invented — see the
provenance comments in each). Components live in `components/`, one folder per component.
