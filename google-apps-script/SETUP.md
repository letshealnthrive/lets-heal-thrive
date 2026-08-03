# Free Booking Backend Setup (Google Sheets + Gmail)

This connects your booking form to a **free** backend using only your
Google account — no hosting cost, no paid plan.

What it does:
- Every booking is added as a new row in a Google Sheet in your Drive.
- The client automatically gets a confirmation email.
- You get an email at **letshealnthrive@gmail.com** with the full booking details.
- If email ever fails (e.g. Gmail's free daily send limit is hit), the
  booking is **still saved** to the Sheet, and the website still shows
  the visitor a normal success message either way.

Takes about 10 minutes, one-time setup.

---

## Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it something like **"Let's Heal & Thrive — Bookings"**.
3. Leave it empty — the script will create the right columns automatically.

## Step 2 — Add the Script

1. In the Sheet, go to **Extensions → Apps Script**.
2. Delete any starter code in the editor.
3. Open `Code.gs` (in this same `google-apps-script` folder) and copy
   **all** of its contents into the Apps Script editor.
4. Click the **Save** icon (or `Ctrl+S` / `Cmd+S`).
5. At the top, name the project (e.g. "Booking Backend").

## Step 3 — Deploy as a Web App

1. In the Apps Script editor, click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description:** Booking backend
   - **Execute as:** Me (your Google account)
   - **Who has access:** Anyone
4. Click **Deploy**.
5. Google will ask you to authorize the script — click through the
   permission screens (you may see an "unverified app" warning since
   this is your own private script; click **Advanced → Go to
   [project name] (unsafe)** to proceed — this is expected and safe
   since you wrote/own the script).
6. Copy the **Web app URL** shown at the end (looks like
   `https://script.google.com/macros/s/XXXXXXXX/exec`).

## Step 4 — Connect It to the Website

1. Open `js/config.js` in the website files.
2. Paste your Web App URL as the value of `BOOKING_ENDPOINT`:

   ```js
   const BOOKING_ENDPOINT = "https://script.google.com/macros/s/XXXXXXXX/exec";
   ```

3. Save the file and re-upload/redeploy the website.

That's it — new bookings will now land in your Google Sheet and trigger
the two emails automatically.

---

## Notes

- **Cost:** $0. This uses your existing free Google account (Sheets +
  Apps Script + Gmail sending are all free within normal personal-use limits).
- **Email limits:** A regular Gmail account can send roughly 100 emails/day
  through Apps Script. For a small practice this is normally more than
  enough. If you ever exceed it on a busy day, bookings are still saved
  to the Sheet — only the email step would be delayed until quota resets
  the next day.
- **Re-deploying after edits:** If you ever edit `Code.gs` later, you'll
  need to go to **Deploy → Manage deployments → Edit → New version** and
  deploy again for changes to take effect.
- **Viewing bookings:** Just open the Google Sheet any time — it's a
  normal spreadsheet you can sort, filter, export, or share with staff.
