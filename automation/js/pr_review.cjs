const fs = require("fs");
const { execSync } = require("child_process");
const { OpenAI } = require("openai");
const github = require("@actions/github");
require("dotenv").config();

const DIFF_PATH = "diff.patch";
const MAX_BYTES = 30000;

function getFilteredDiff() {
  try {
    const rawDiff = execSync("git diff origin/main...HEAD --name-only").toString();
    const files = rawDiff
      .split("\n")
      .filter((f) =>
        /\.(js|cjs|yml|yaml|tf)$/.test(f.trim())
      );

    if (files.length === 0) return "";

    const filteredDiff = execSync(`git diff origin/main...HEAD -- ${files.join(" ")}`).toString();
    return filteredDiff;
  } catch (err) {
    console.error("❌ Failed to generate filtered diff:", err.message);
    return "";
  }
}

let diff = getFilteredDiff().trim();

if (!diff) {
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
Here is the diff between main and the PR for relevant files (.js, .cjs, .tf, .yml):

${diff}

Provide a short review summary (e.g. potential bugs, style issues, improvement suggestions).
Only output the review comment. Keep it under 300 words.
`;

async function run() {
  const token = process.env.GITHUB_TOKEN;
  const octokit = github.getOctokit(token);
  const { owner, repo } = github.context.repo;
  const pull_number = github.context.payload.pull_request.number;

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

  try {
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
