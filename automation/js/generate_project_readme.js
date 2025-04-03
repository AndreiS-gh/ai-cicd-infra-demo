import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const ROOT_DIR = path.resolve(process.cwd(), '../../'); // two levels up from automation/js
const WORKFLOW_PATH = path.join(ROOT_DIR, '.github/workflows/gcp-ci-cd.yml');
const INFRA_PATH = path.join(ROOT_DIR, 'gcp/infra');
const SCRIPTS_PATH = path.join(ROOT_DIR, 'automation/js');
const README_PATH = path.join(ROOT_DIR, 'README.md');

function hash(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

function readAllFilesInDir(dir, exts = []) {
  if (!fs.existsSync(dir)) return '';
  const files = fs.readdirSync(dir);
  return files
    .filter((f) => exts.length === 0 || exts.includes(path.extname(f)))
    .map((f) => fs.readFileSync(path.join(dir, f), 'utf-8'))
    .join('\n\n');
}

async function generateReadme() {
  const workflowContent = fs.existsSync(WORKFLOW_PATH) ? fs.readFileSync(WORKFLOW_PATH, 'utf-8') : '';
  const tfCode = readAllFilesInDir(INFRA_PATH, ['.tf']);
  const jsCode = readAllFilesInDir(SCRIPTS_PATH, ['.js']);

  const prompt = `
You are an AI documentation assistant. Based on the following files from a GitHub repository, generate a short and concise README.md that explains what this project is, what it automates, what technologies it uses, and how it works at a high level.

Do not include install instructions or setup. Just describe purpose, tools used, and high-level logic.

Files:
- GitHub Actions Workflow:
\`\`\`yaml
${workflowContent}
\`\`\`

- Terraform Infrastructure:
\`\`\`hcl
${tfCode}
\`\`\`

- Automation Scripts (JavaScript):
\`\`\`js
${jsCode}
\`\`\`
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a technical writer specializing in devops tooling.' },
      { role: 'user', content: prompt },
    ],
  });

  const generated = completion.choices[0].message.content.trim();

  const existing = fs.existsSync(README_PATH) ? fs.readFileSync(README_PATH, 'utf-8') : '';
  const existingHash = hash(existing);
  const generatedHash = hash(generated);

  if (existingHash !== generatedHash) {
    fs.writeFileSync(README_PATH, generated);
    console.log(`✅ Updated ${README_PATH}`);
  } else {
    console.log(`🟢 No changes detected in README.md`);
  }
}

generateReadme().catch((err) => {
  console.error('❌ Failed to generate README.md', err.message);
  process.exit(1);
});
