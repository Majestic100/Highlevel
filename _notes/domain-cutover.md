# Domain cutover: inkflowstudios.com off GHL, straight onto GitHub Pages

## Inventory of GHL pages on inkflowstudios.com (checked 2026-10-01)

Every GHL step was only a full-screen iframe around a page in this repo, so
each path is recreated here at the exact same URL.

| Live path | GHL step | Framed page | New home after cutover |
|---|---|---|---|
| `/` | landing1 | `index.html` | `index.html` |
| `/landingpage` | landing1 | `index.html` | `landingpage.html` redirects to `/` |
| `/landing` | landing2 | `ghl/landing-cro.html` | `landing.html` |
| `/landing2` | landing2 | `ghl/landing-cro.html` | `landing2.html` redirects to `/landing` |
| `/thankyou` | thankyou | `ghl/thankyou.html` | `thankyou.html` redirects to `/booked` |
| `/thankyou-page` | thankyou (calendar redirect target today) | `ghl/thankyou.html` | `thankyou-page.html` redirects to `/booked` |
| `/tos` | TOS (A2P terms URL) | `terms.html` | `tos.html` (full page, same content) |
| `/privacy-terms` | Privacy Terms (A2P privacy URL) | `privacy.html` | `privacy-terms.html` (full page, same content, SMS non-sharing clause intact) |
| `/contact` | Contact | `contact.html` | `contact.html` |
| unknown paths | GHL 301 to `/landingpage` | | `404.html` redirects to `/`, query string kept |

New: `/booked` is the thank-you page and fires `Schedule` once per booking.

Redirects keep the query string, so UTMs and booking parameters survive.
GitHub Pages cannot send server-side 301s; these are instant client-side
redirects (JS `location.replace` plus meta refresh).

Confirm in the A2P 10DLC registration which privacy and terms URLs were
submitted. If they are `/privacy-terms` and `/tos`, nothing changes. If they are
anything else, tell Claude so that path gets a page too.

## What is already live (safe before the cutover)

- Meta Pixel `1334202538610101`, installed once in the `<head>` of every real
  page. It only runs as the top page on inkflowstudios.com. Inside the GHL
  iframe or on majestic100.github.io it stays off, so nothing double-fires today.
- `/booked` fires `fbq('track', 'Schedule', {}, { eventID })` once. eventID is
  `schedule_<appointment_id>` when GHL passes an `appointment_id`/`contact_id`
  in the redirect URL, otherwise a random id kept in sessionStorage so a reload
  does not fire again.
- UTM + fbclid capture into sessionStorage, appended to the booking calendar
  `src` (and form_embed.js forwards the page query too).
- Only the hero calendar loads on page load. The lower calendars load when
  they come within 600px of the screen. Containers keep their min-height.
- `<link rel="canonical">` on every page.

## Cutover runbook (do it in one sitting, outside ad peak hours)

1. **Lower the DNS TTL** for `inkflowstudios.com` and `www` to 300 seconds a few
   hours before. During the switch, visitors whose DNS still points at GHL can
   see a broken nested frame until their cache expires.
2. **DNS** at the DNS provider:
   - Delete apex `A 162.159.140.166` and `www CNAME sites.ludicrous.cloud`.
   - Apex `A`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Apex `AAAA` (optional): `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `www CNAME majestic100.github.io`
   - If the DNS is on Cloudflare: proxy OFF (grey cloud) for these records, or
     GitHub cannot issue the HTTPS certificate.
3. **Immediately after**, GitHub repo, Settings, Pages, Custom domain:
   `inkflowstudios.com`, Save (or ask Claude to commit the `CNAME` file).
   From then on `majestic100.github.io/Highlevel/*` 301-redirects to
   `inkflowstudios.com/*` and `www` redirects to the apex automatically.
4. Wait for the certificate (minutes, up to a few hours), then tick
   **Enforce HTTPS** in the same Pages settings.
5. **GHL**:
   - Settings, Domains: remove `inkflowstudios.com` from GHL (or move the funnel
     to a subdomain such as `app.inkflowstudios.com` if anything else in GHL
     needs a domain).
   - Funnel settings: delete the Meta pixel / head tracking code.
   - Calendar `76PH7OblZ2v5KWBuYtnR`: remove the Facebook Pixel ID, and set
     the redirect URL to `https://inkflowstudios.com/booked`. If GHL accepts
     merge fields there, use
     `https://inkflowstudios.com/booked?appointment_id={{appointment.id}}`.
6. **Conversions API**: the GHL workflow sends a server `Lead`. The page sends a
   browser `Schedule`. Different event names are not deduplicated, so Meta
   counts both. Choose one optimisation event. For browser + server dedup on
   `Schedule`, the workflow must send `Schedule` with the same event ID
   (`schedule_<appointment id>`), which only works if the appointment id reaches
   the redirect URL.
7. After the cutover, Claude switches `og:image` and `og:url` to
   inkflowstudios.com and deletes the `ghl/` folder.

## Tests after cutover (need a phone and GHL access)

- Meta Pixel Helper on `/`: exactly 1 PageView, pixel 1334202538610101 only.
- `https://inkflowstudios.com/?utm_source=test&utm_campaign=test&fbclid=test123`,
  make a test booking, confirm the redirect lands on `/booked`, Events Manager
  Test Events shows exactly 1 Schedule, and the GHL contact shows the UTM values.
- Same flow on an iPhone from an Instagram DM (in-app browser).
- `/tos`, `/privacy-terms`, `/contact`, `/landing`, `/landing2`, `/landingpage`,
  `/thankyou`, `/thankyou-page` all resolve.
