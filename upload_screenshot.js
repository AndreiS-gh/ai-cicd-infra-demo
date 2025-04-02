import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const bucketName = process.env.GCS_BUCKET_NAME;

// Auto-detect latest screenshot
const screenshotDir = '.';
const filePrefix = 'homepage-';
const files = fs.readdirSync(screenshotDir);
const screenshotFile = files
  .filter(name => name.startsWith(filePrefix) && name.endsWith('.png'))
  .sort()
  .reverse()[0]; // latest

if (!screenshotFile) {
  console.error("❌ No screenshot found.");
  process.exit(1);
}

const destination = screenshotFile;

async function uploadScreenshot() {
  const storage = new Storage();

  try {
    await storage.bucket(bucketName).upload(screenshotFile, {
      destination,
      gzip: true,
      metadata: {
        cacheControl: 'no-cache',
      },
    });

    console.log(`✅ Uploaded to gs://${bucketName}/${destination}`);
  } catch (err) {
    console.error("❌ Upload failed:", err.message);
    process.exit(1);
  }
}

uploadScreenshot();
