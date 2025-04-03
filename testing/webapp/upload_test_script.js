import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import path from 'path';
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

    const gcsUrl = `gs://${BUCKET_NAME}/${destination}`;
    console.log(`✅ Uploaded test script to ${gcsUrl}`);
    
    // Export GCS URL for GitHub Actions
    console.log(`TEST_SCRIPT_GCS_URL=${gcsUrl}`);
  } catch (err) {
    console.error('❌ Upload failed:', err.message);
    process.exit(1);
  }
}

uploadTestScript();
