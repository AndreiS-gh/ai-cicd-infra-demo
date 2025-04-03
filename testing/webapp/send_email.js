import fs from "fs";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const TO_EMAIL = process.env.EMAIL_TO;
const FROM_EMAIL = process.env.EMAIL_FROM || "no-reply@example.com";
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const TEST_SCRIPT_GCS_URL = process.env.TEST_SCRIPT_GCS_URL; // Authenticated link

if (!SENDGRID_API_KEY || !TO_EMAIL) {
  console.error("❌ Missing SENDGRID_API_KEY or EMAIL_TO env variables");
  process.exit(1);
}

sgMail.setApiKey(SENDGRID_API_KEY);

// Get latest screenshot
const screenshotDir = ".";
const filePrefix = "homepage-";
const files = fs.readdirSync(screenshotDir);
const screenshotFile = files
  .filter((name) => name.startsWith(filePrefix) && name.endsWith(".png"))
  .sort()
  .reverse()[0];

if (!screenshotFile) {
  console.error("❌ No screenshot found to email.");
  process.exit(1);
}

const attachment = fs.readFileSync(screenshotFile).toString("base64");

let textBody = "✅ The latest AI-generated web test ran successfully.\n\n📸 Screenshot is attached.";

if (TEST_SCRIPT_GCS_URL) {
  textBody += `\n\n📄 AI-Generated Test Script:\n${TEST_SCRIPT_GCS_URL}\n(Note: Requires Google authentication to view.)`;
}

const msg = {
  to: TO_EMAIL,
  from: FROM_EMAIL,
  subject: "✅ AI Web Test Results + Screenshot",
  text: textBody,
  attachments: [
    {
      content: attachment,
      filename: screenshotFile,
      type: "image/png",
      disposition: "attachment",
    },
  ],
};

sgMail
  .send(msg)
  .then(() => console.log("✅ Email sent to", TO_EMAIL))
  .catch((error) => {
    console.error("❌ Failed to send email:", error.message);
    process.exit(1);
  });
