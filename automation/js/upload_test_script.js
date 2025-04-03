import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const BUCKET_NAME = process.env.GCS_BUCKET_NAME;
const filePath = './ai_generated_test.spec.js';

if (!fs.existsSync(filePath)) {
  console.error('❌ Test script not found.');
  process.exit(1);
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const destination = `ai-tests/ai_generated_test-${timestamp}.spec.js`;

const storage = new Storage();

async function uploadTestScript() {
  try {
    await storage.bucket(BUCKET_NAME).upload(filePath, {
      destination,
      gzip: true,
      metadata: {
        cacheControl: 'no-cache',
      },
    });

    const publicUrl = `https://storage.cloud.google.com/${BUCKET_NAME}/${destination}`;
    console.log(`✅ Uploaded test script to ${publicUrl}`);

    // ✅ Output public URL in GitHub Actions format
    console.log(`TEST_SCRIPT_GCS_URL=${publicUrl}`);
  } catch (err) {
    console.error('❌ Upload failed:', err.message);
    process.exit(1);
  }
}

uploadTestScript();
