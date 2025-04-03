import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const tfDir = path.resolve(process.env.TF_DIR || 'gcp/infra');

async function generateDocs() {
  if (!fs.existsSync(tfDir)) {
    console.error(`❌ Directory does not exist: ${tfDir}`);
    process.exit(1);
  }

  const tfFiles = fs.readdirSync(tfDir).filter(f => f.endsWith('.tf'));
  if (tfFiles.length === 0) {
    console.error('❌ No Terraform (*.tf) files found in directory.');
    process.exit(1);
  }

  let content = '';
  for (const file of tfFiles) {
    const filePath = path.join(tfDir, file);
    const data = fs.readFileSync(filePath, 'utf8');
    content += `### File: ${file}\n\`\`\`hcl\n${data}\n\`\`\`\n\n`;
  }

  const prompt = `
You are a DevOps assistant. Based on the following Terraform configuration files, generate clear and concise Markdown documentation for a README.
Explain the purpose of the infrastructure, key variables, outputs, and any modules used. Use developer-friendly language.
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content },
    ],
  });

  const doc = response.choices[0].message.content.trim();
  const outputPath = path.join(tfDir, 'AI_GENERATED_README.md');
  fs.writeFileSync(outputPath, doc);

  console.log(`✅ Terraform docs generated at ${outputPath}`);
}

generateDocs();
