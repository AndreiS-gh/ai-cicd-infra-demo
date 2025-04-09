const fs = require("fs");
const { OpenAI } = require("openai");
require("dotenv").config();

const MAX_BYTES = 30000;
const DIFF_PATH = "diff.patch";

let diff = "";
if (fs.existsSync(DIFF_PATH)) {
  diff = fs.readFileSync(DIFF_PATH, "utf-8").trim();
}

if (!diff || diff.startsWith("🟢")) {
  console.log("🟢 No relevant file changes to review.");
  process.exit(0);
}

if (Buffer.byteLength(diff, "utf-8") > MAX_BYTES) {
  console.warn(`⚠️ Diff too large (${Buffer.byteLength(diff)} bytes). Truncating to ${MAX_BYTES} bytes.`);
  diff = diff.slice(0, MAX_BYTES);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = `
You are a senior developer reviewing a GitHub pull request.
Here is the diff between main and the PR for relevant files (.js, .cjs, .tf, .yml, .tfvars.json):

${diff}

Provide a short review summary (e.g. potential bugs, style issues, improvement suggestions).
Only output the review comment. Keep it under 300 words.
`;

async function run() {
  let review = "";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });
    review = response.choices[0].message.content.trim();
  } catch (err) {
    console.warn("⚠️ OpenAI failed, falling back to generic message:", err.message);
    review = "_AI review temporarily unavailable. Please proceed with manual checks._";
  }

  const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
  const token = process.env.GITHUB_TOKEN;

  if (!isGitHubActions || !token) {
    console.log("💬 AI Review Output:\n\n" + review);
    return;
  }

  const github = require("@actions/github");
  try {
    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;
    const pull_number = github.context.payload.pull_request.number;

    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: pull_number,
      body: `🤖 **AI-Powered Review Summary:**\n\n${review}`,
    });

    console.log("✅ Comment posted to PR.");
  } catch (err) {
    console.error("❌ Failed to post comment to PR:", err.message);
    process.exit(1);
  }
}

run();
