# Meta tracking for inkflowstudios.com

## Decision

Bookings are sent to Meta as a `Lead` from the server, through a GHL
workflow with the "Meta conversion API" action. Value per booked call:
5000 USD (decided by Sinan: the value of a potential meeting).

Do NOT also paste a browser `fbq('track', 'Lead')` snippet on a thank-you
page. Without a shared `event_id` every booking would be counted twice.

## Pixels found on the live site (checked 2026-09-24)

| Pixel / dataset ID | Where it is set | Notes |
|---|---|---|
| 1334202538610101 | GHL funnel "Inkflow Studios - Pages", native Meta pixel setting; booking calendar 76PH7OblZ2v5KWBuYtnR, pixel setting; CAPI workflow dataset | Keep this one |
| 847588475907012 | Pasted by hand into the funnel's head tracking code (`globalHeadTrackingCode`) | Only fires PageView. Remove unless ad campaigns optimise on it |

Check in Ads Manager which pixel the campaigns use before removing anything.

## GHL workflow checklist

- Trigger: Customer Booked Appointment (or Appointment Status = booked),
  filtered to the calendar "Inkflow Studios - Intro Call". Not
  "Form Submitted" without filters, which misses bookings and fires on
  every form in the account.
- Action: Meta conversion API, Event type: Funnel Event
- Dataset ID: 1334202538610101
- Facebook event name: Lead
- Value: 5000, Currency: USD
- Access token: generated in Events Manager. Never paste it into chats,
  screenshots or this repo. Regenerate it if it has been shared.

## How to test

1. Events Manager, dataset 1334202538610101, Test events: copy the test code.
2. Paste it into the workflow's Test code field, save.
3. Book a test slot on inkflowstudios.com.
4. Confirm exactly one Lead arrives from Server (and, if the calendar pixel
   also fires a browser Lead, that Meta shows them as deduplicated).
   Check that email and phone are included and the match quality score.
5. Check the workflow's Execution logs.
6. Remove the test code and save again. Publish the workflow.

## Legacy snippet (do not install while the CAPI workflow runs)

```html
<script>
  fbq('track', 'Lead', { value: 5000, currency: 'USD' });
</script>
```
