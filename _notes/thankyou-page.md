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

## Content still needed (edit CONFIG at the bottom of ghl/thankyou.html)

- `video`: the pre-call video. Until it is set, the video step is hidden.
- `faqVideos`: optional short answer videos for the six questions.
- `stories`: real client results only, with permission. Until then only the
  Trustpilot card shows.

## Tracking

No pixel code on this page. Bookings reach Meta as a server-side Lead through
the GHL workflow (see meta-lead-event.md).
