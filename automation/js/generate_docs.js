import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const ROOT_DIR = path.resolve(process.cwd(), '../../');
const WORKFLOW_DIR = path.join(ROOT_DIR, '.github/workflows');
const INFRA_DIR = path.join(ROOT_DIR, 'gcp/infra');
const SCRIPTS_DIR = path.join(ROOT_DIR, 'automation/js');
const README_PATH = path.join(ROOT_DIR, 'README.md');
const EXAMPLE_README_PATH = path.join(ROOT_DIR, 'automation/README.md');
const TF_README_PATH = path.join(INFRA_DIR, 'AI_GENERATED_README.md');

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

function readFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return '';
  }
  return fs.readFileSync(filePath, 'utf-8');
}

async function generateTerraformDocs() {
  const tfCode = readAllFilesInDir(INFRA_DIR, ['.tf']);
  const exReadme = readFile(EXAMPLE_README_PATH);
  if (!tfCode) {
    console.warn('⚠️ No Terraform code found to document.');
    return '';
  }

  const prompt = `
You are a DevOps documentation assistant. Based on the documentation in the example file ${exReadme} the Terraform Code provided, generate Markdown documentation that:
- Explains the infrastructure purpose
- Highlights variables, outputs, and modules used
- Uses clear, developer-friendly wording
- Intended for internal teams
- Based on the resources created by this module create a short description for the module (maximum 100 words) and a name for the module (maximum 5 words) using the cloud provider as the first word.

Terraform Code:
\`\`\`hcl
${tfCode}
\`\`\`
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
  });

  const output = response.choices[0].message.content.trim();
  fs.writeFileSync(TF_README_PATH, output);
  console.log(`✅ Terraform docs generated at ${TF_README_PATH}`);
  return output;
}

async function generateProjectReadme() {
  const workflowContent = readAllFilesInDir(WORKFLOW_DIR, ['.yml', '.yaml']);
  const tfCode = readAllFilesInDir(INFRA_DIR, ['.tf']);
  const jsCode = readAllFilesInDir(SCRIPTS_DIR, ['.js']);

  const prompt = `
You are an AI documentation assistant. Based on the following files from a GitHub repository, generate a comprehensive README.md that includes:

- A short project summary
- Tools and technologies used
- A list of workflows and what they do
- High-level explanation of how the pipeline works
- Clear usage instructions (how to trigger the pipeline, secrets needed, what happens on PRs, etc)

Do not include install instructions. Assume this README is for internal DevOps users familiar with GitHub Actions and Terraform.

Workflows:
\`\`\`yaml
${workflowContent}
\`\`\`

Terraform Code:
\`\`\`hcl
${tfCode}
\`\`\`

Automation Scripts:
\`\`\`js
${jsCode}
\`\`\`
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a technical writer specializing in GitHub Actions and Terraform.' },
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

async function main() {
  await generateTerraformDocs();
  await generateProjectReadme();
}

main().catch((err) => {
  console.error('❌ Failed to generate documentation:', err.message);
  process.exit(1);
});
