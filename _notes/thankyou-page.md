# Thank-you page (inkflowstudios.com/thankyou)

The page lives in `ghl/thankyou.html` and is served from GitHub Pages. The GHL
step `/thankyou` only holds a small iframe, like the other funnel steps, so
every change here goes live without touching GHL.

## GHL snippet (paste into the /thankyou step's Custom Code element, replacing the old code)

```html
<style>
  body { margin: 0; }
  .inkflow-frame { width: 100vw; height: 100vh; border: 0; display: block; margin: 0; padding: 0;
    position: relative; left: 50%; transform: translateX(-50%); }
</style>
<iframe class="inkflow-frame"
  src="https://majestic100.github.io/Highlevel/ghl/thankyou.html?start={{appointment.start_time}}&end={{appointment.end_time}}"
  title="You're booked in" loading="eager" allow="fullscreen; autoplay"></iframe>
```

If GHL fills in the merge fields, the page shows the booked time and an
"Add to your calendar" button. If it does not (for example after a plain
"Redirect to URL"), the page tells the visitor to use the invite in their email.

## Preview

Open https://majestic100.github.io/Highlevel/ghl/thankyou.html?preview=1 to see
placeholders where every video, case study and review screenshot goes. Without
`?preview=1` (what visitors get) empty slots stay hidden.

## Content still needed (edit CONFIG at the bottom of ghl/thankyou.html)

- `video`: the pre-call video. Until it is set, the video step is hidden.
- `faqVideos`: one short video per question (see the list below). A card
  with a video opens automatically and shows the video above the text answer.
- `stories`: video case studies. Real client results only, with permission.
- `proofImages`: screenshots of real reviews or client messages, uploaded to
  `assets/proof/`. Until stories or images are added, only the Trustpilot card shows.

## Questions and what to cover in each video

| Key | Question on the page | Cover in the video |
|---|---|---|
| clients | How many new clients will I get? | Run the numbers live on a real client: average session price, ad spend, bookings per month |
| qualify | How do you make sure the leads are serious? | The exact filter: ad targeting, page, questions, how every lead is answered and called, the deposit, how the booking lands in their calendar |
| noshow | What if people don't show up? | Deposit rule plus reminders and anything else that prevents no-shows |
| closing | Do I have to sell anything? | That the conversation and deposit are handled before the client arrives |
| promo | Is this just a cheap promotion? | Why no discount deals, and the math on client value vs cost per client |
| contract | Can I cancel anytime? | Agreement terms: month-to-month, how to cancel |
| guarantee | What if it doesn't work? | Worst case, the guarantee and the $1,000 minimum; own any past miss (acknowledge, context, resolve, reassure) |
| timeline | How fast will I see results? | Realistic timeline: first booking in about 7 days, 20 clients in 30 days |
| different | What makes you different from other agencies? | Tattoo only, deposit-paid bookings as the metric, one per area |
| budget | What's the minimum ad spend? | $1,000 minimum for the guarantee, typical $1,500 to $5,000, what each level tends to give |

## Answers to confirm

The written answers reuse the site's FAQ wherever it covers the topic. These four
are new claims and must match how Inkflow actually works before the page goes
live: `qualify`, `noshow` (deposit covers the artist's time on a no-show),
`closing` and `promo` (no discount deals).

## Tracking

No pixel code on this page. Bookings reach Meta as a server-side Lead through
the GHL workflow (see meta-lead-event.md).
