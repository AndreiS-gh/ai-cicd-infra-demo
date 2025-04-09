import fs from "fs";
import { OpenAI } from "openai";
import * as core from "@actions/core";
import * as github from "@actions/github";
import dotenv from "dotenv";

dotenv.config();

const DIFF_PATH = "diff.patch";

if (!fs.existsSync(DIFF_PATH)) {
  console.error("❌ No diff found. Make sure diff.patch exists.");
  process.exit(1);
}

const diff = fs.readFileSync(DIFF_PATH, "utf-8").trim();

if (!diff) {
  console.log("🟢 No changes to review.");
  process.exit(0);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = `
You are a senior developer reviewing a GitHub pull request.
Here is the diff between main and the PR:

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
