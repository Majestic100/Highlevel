# Meta Lead event for the thank-you page

Status: waiting on the thank-you page in GHL. Not installed anywhere yet.

## The code

Paste this into the thank-you step's own tracking code in GHL
(the step's Settings, Tracking code, Head). Only on that step, never on
the funnel level and never on the landing pages, or every visitor counts
as a $5,000 lead.

```html
<script>
  fbq('track', 'Lead', {
    value: 5000,
    currency: 'USD',
  });
</script>
```

The Meta Pixel base code (pixel ID 847588475907012) is already set in the
funnel's head tracking code (`globalHeadTrackingCode`), so `fbq` exists on
every step in that funnel, including a new thank-you step.

## Setup steps

1. Add a thank-you step to the funnel, for example `/tak`.
2. Paste the code above into that step's head tracking code.
3. Calendar "Inkflow Studios - Intro Call", Settings, Confirmation:
   Redirect to URL `https://inkflowstudios.com/tak`.
4. Book a test slot and check Events Manager, Test Events, that one
   Lead event arrives.

## Open question

`value: 5000` is reported to Meta as the value of each booking. If 5,000 is
the value of a client rather than a booking, ROAS will read high. A closer
number is client value times close rate (e.g. 5000 x 1/3 = about 1,650).
