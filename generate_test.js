import fs from "fs";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const TEST_FILE = "ai_generated_test.spec.js";

async function generateTest() {
  if (fs.existsSync(TEST_FILE)) {
    console.log("✅ Test file already exists. Skipping OpenAI call.");
    return;
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: `Only output valid raw JavaScript code (no Markdown, no comments, no explanation).

Generate a Playwright test using ESM syntax that:
- Uses \`import { test, expect } from '@playwright/test'\`
- Visits the homepage at ${process.env.TEST_URL}
- Waits for the page to load
- Uses \`page.locator('text=Hello from Cloud Run!')\`
- Verifies that text is visible with \`expect(locator).toBeVisible()\`
- Generates a timestamped filename like 'homepage-YYYY-MM-DDTHH-MM-SS.png'
- Takes a screenshot after the test
- Names the test 'verify homepage text'
`,
      },
    ],
  });

  let code = response.choices[0].message.content.trim();

  // Remove markdown-style code blocks if accidentally included
  if (code.startsWith("```")) {
    code = code.replace(/```[\w]*\n?/, "").replace(/```$/, "").trim();
  }

  fs.writeFileSync(TEST_FILE, code);
  console.log("✅ Test generated and saved to", TEST_FILE);
}

generateTest();
