/**
 * LET'S HEAL & THRIVE — Booking Backend (Google Apps Script)
 * ------------------------------------------------------------
 * Free-tier backend for the website's booking form:
 *   1. Saves every booking as a new row in a Google Sheet
 *      (lives in your Google Drive — this IS your database).
 *   2. Emails a confirmation to the client.
 *   3. Emails the full booking details to the clinic inbox.
 *
 * IMPORTANT: Steps 2 and 3 are wrapped in try/catch so that if
 * Gmail's free daily sending quota is ever hit, or anything else
 * goes wrong with email, the booking is still saved to the Sheet
 * (step 1 always runs first and independently). The website never
 * shows an error to the visitor either way.
 *
 * See SETUP.md in this folder for step-by-step deployment.
 */

const CLINIC_EMAIL = "letshealnthrive@gmail.com";
const CLINIC_NAME = "Let's Heal & Thrive";
const SHEET_NAME = "Bookings";

function doPost(e) {

  try {
    var data = JSON.parse(e.postData.contents);

    // ---- 1. Save to Google Sheet (always runs first) ----
    var sheet = getOrCreateSheet_();
    sheet.appendRow([
      new Date(),
      data.name || "",
      data.phone || "",
      data.email || "",
      data.age || "",
      data.consultationType || "",
      data.preferredDate || "",
      data.preferredTime || "",
      data.message || "",
      data.requiresConsent ? "Yes" : "No",
      data.submittedAt || ""
    ]);

    // ---- 2. Email the client (best-effort) ----
    if (data.email) {
      try {
        sendClientEmail_(data);
      } catch (emailErr) {
        Logger.log("Client email failed: " + emailErr);
      }
    }

    // ---- 3. Email the clinic (best-effort) ----
    try {
      sendClinicEmail_(data);
    } catch (emailErr) {
      Logger.log("Clinic email failed: " + emailErr);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log("doPost error: " + err);
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Submitted At (Server)", "Name", "Phone", "Email", "Age",
      "Consultation Type", "Preferred Date", "Preferred Time", "Message",
      "Requires Parental Consent", "Submitted At (Client)"
    ]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function sendClientEmail_(data) {
  var subject = "We've received your consultation request — " + CLINIC_NAME;

  var body =
    "Hi " + data.name + ",\n\n" +
    "Thank you for reaching out to " + CLINIC_NAME + ". We've received your " +
    "request for a " + data.consultationType + " consultation on " +
    data.preferredDate + " at " + data.preferredTime + ".\n\n" +
    "Our team will call you at " + data.phone + " shortly to arrange " +
    "online payment (Session Fee: Rs. 750, 50% off Rs. 1,500). Your slot " +
    "will be confirmed once payment is received.\n\n" +
    (data.requiresConsent
      ? "Reminder: since this booking is for someone under 18, please bring " +
        "the signed Parental/Guardian Consent Form to the first session.\n\n"
      : "") +
    "If you need to reach us sooner, you can call/WhatsApp us directly at " +
    "+91 73032 07475 or reply to this email.\n\n" +
    "Warm regards,\n" +
    CLINIC_NAME;

  GmailApp.sendEmail(data.email, subject, body, { name: CLINIC_NAME });
}

function sendClinicEmail_(data) {
  var subject = "New Booking Request — " + data.name + " (" + data.consultationType + ")";

  var body =
    "A new consultation request was submitted on the website:\n\n" +
    "Name: " + data.name + "\n" +
    "Phone: " + data.phone + "\n" +
    "Email: " + (data.email || "-") + "\n" +
    "Age: " + data.age + "\n" +
    "Consultation Type: " + data.consultationType + "\n" +
    "Preferred Date: " + data.preferredDate + "\n" +
    "Preferred Time: " + data.preferredTime + "\n" +
    "Requires Parental Consent: " + (data.requiresConsent ? "Yes" : "No") + "\n" +
    "Message: " + (data.message || "-") + "\n" +
    "Submitted At: " + data.submittedAt + "\n\n" +
    "Next step: call the client to arrange online payment and confirm the slot.";

  GmailApp.sendEmail(CLINIC_EMAIL, subject, body);
}
