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
- Uses \`page.locator('text=${process.env.TEXT_TO_TEST}')\`
- Wraps the \`expect(locator).toBeVisible()\` in a try/catch block
- Takes a screenshot regardless of success/failure
- Logs \`TEST_RESULT=failed\` or \`TEST_RESULT=success\` depending on result
- Saves screenshot as 'homepage-YYYY-MM-DDTHH-MM-SS.png'
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

  // Forcefully override the entire test content to avoid syntax corruption
  const finalCode = `
import { test, expect } from '@playwright/test';

test('verify homepage text', async ({ page }) => {
  await page.goto('${process.env.TEST_URL}', { waitUntil: 'load' });

  let status = 'success';
  try {
    const locator = page.locator('text=${process.env.TEXT_TO_TEST}');
    await expect(locator).toBeVisible({ timeout: 5000 });
  } catch (error) {
    console.log('❌ Text not found:', error.message);
    status = 'failed';
  }

  const timestamp = new Date().toISOString().split('.')[0].replace(/:/g, '-');
  await page.screenshot({ path: \`homepage-\${timestamp}.png\` });

  console.log(\`TEST_RESULT=\${status}\`);
});
`;

  fs.writeFileSync(TEST_FILE, finalCode);
  console.log("✅ Test generated and saved to", TEST_FILE);
}

generateTest();
