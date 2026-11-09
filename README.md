# St. Michael Catholic Church — Reno, NV

Bilingual (English / Español) website for St. Michael Catholic Church, 14075 Mt. Vida St, Reno, NV 89506.
Built by Nexora Digital. Static site — no build step. Deploys on Vercel.

## Features
- **EN / ES switch** in the header (remembered per visitor; Spanish-language browsers open in Spanish)
- **Next Mass** live countdown in the hero
- **Weekly schedule** with today highlighted and an English / Spanish filter
- **Parish calendar** — special events, food pantry Thursdays, First Fridays; every event has *Add to Google Calendar* and *.ics* download
- **Contact / prayer request form** (opens the visitor's email to the office), call, email, Facebook Messenger
- Office open/closed indicator, map, staff, sacraments, ministries, food pantry, CSA giving link

## Editing content
All schedule and event data lives at the top of `script.js`:
- `SCHEDULE` — weekly Masses, confession, office hours, pantry
- `FIRST_FRIDAY` — monthly First Friday additions
- `EVENTS` — special parish events (add English + Spanish title/description)

Page text is in `index.html` (English) and the `ES` object in `script.js` (Spanish). Each `data-i18n="key"` in the HTML has a matching Spanish entry.

## Images
- `assets/logo.png` — **parish logo (drop the logo file here)**. Until it exists, the site uses `assets/crest.svg`.
- `assets/church.jpg` — church exterior (hero + visit section)
- `assets/st-michael-icon.jpg` — icon of St. Michael the Archangel

## Deploy
Push to GitHub, then import the repo in Vercel (Framework preset: *Other*, no build command, output directory: root).
