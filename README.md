# Let's Heal & Thrive — Website

## Booking data: where it goes

The booking form works out of the box (saves locally in the visitor's
browser), but to get bookings into a real, central place — a Google
Sheet in your Drive, plus automatic emails — follow the one-time setup
in **`google-apps-script/SETUP.md`** (10 minutes, completely free).

Until that's set up, or if it's ever temporarily unavailable (e.g. an
email quota is hit), the site keeps working normally — bookings are
never lost, they're just saved locally instead of centrally until sync
succeeds.

Once set up:

- Every booking is added as a row in a Google Sheet in your Drive.
- The client gets an automatic confirmation email.
- You get an email at **letshealnthrive@gmail.com** with the full booking details.

## Files

- `index.html` — the full site
- `css/style.css` — all styling (responsive: mobile / tablet / desktop)
- `js/config.js` — where you paste your booking backend URL (see setup guide)
- `js/data.js` — service write-ups, the self-assessment check-in, legal page text
- `js/script.js` — navigation, modals, booking form, quiz engine
- `assets/` — images and the downloadable Parental/Guardian Consent Form (PDF)
- `google-apps-script/` — the free backend (Google Sheets + email) and its setup guide

## Self-Assessment

The site now has a single, plain-language **"Mental Wellbeing Check-In"**
(10 questions, no clinical jargon) instead of the earlier set of five
clinical-style screeners. It's defined in `js/data.js` under
`ASSESSMENTS.wellbeing` if you ever want to adjust the wording or
scoring bands.

## Booking form validation

- Name: at least 2 letters
- Phone: valid 10-digit Indian mobile number (starts with 6–9)
- Email: optional, but must be a valid format if filled in
- Age: 3–100, with parental consent required and enforced under 18
- Date: any day (no day-of-week restriction), can't pick a past date
- Time: 30-minute slots, 10:00 AM – 8:00 PM, every day

## Booking → payment flow

The site does **not** take payment directly. After someone submits the
form, they're told our team will call to arrange **online payment**, and
the slot is only confirmed once payment is received. This messaging
appears in the form subtitle, the success screen, and the automatic
client email (once the Apps Script backend below is connected).

## Things to double check before going live

- Complete the Google Sheets/email setup in `google-apps-script/SETUP.md`
  so bookings land somewhere your team can actually see.
- Social links (Instagram, Facebook, LinkedIn) are set to the URLs you shared.
- WhatsApp number and floating WhatsApp button use +91 73032 07475.
- Terms of Service / Privacy Policy / Cancellation Policy open **in-page**
  as modals with drafted starter text — have these reviewed/finalised by
  whoever handles your legal/compliance.
- Pricing banner shows ₹1,500 → ₹750 (50% off). Update in `index.html`
  (search for "1,500") once the offer ends.
