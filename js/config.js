// =========================================================
// LET'S HEAL & THRIVE — BACKEND CONFIG
// =========================================================
//
// This site is fully static, so booking data has nowhere to go by
// default except the visitor's own browser. To have bookings land in
// a Google Sheet (in your Google Drive) AND trigger confirmation
// emails — all on Google's free tier — follow the steps in
// "google-apps-script/SETUP.md", then paste the Web App URL you get
// at the end into BOOKING_ENDPOINT below.
//
// Until you do that, BOOKING_ENDPOINT stays empty and the site works
// perfectly fine — bookings are simply saved locally in the visitor's
// browser only (see js/script.js -> saveBookingRecord).

const BOOKING_ENDPOINT = "https://script.google.com/macros/s/AKfycbx51vyT1m2hKa_eVZdlH2TYeTScO7vy24oImvQ1VGf5mdbZvJDZ1Qizijw9el7BXIg/exec";
