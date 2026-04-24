import fs from 'fs/promises';
import path from 'path';

export async function getContent() {
  const filePath = path.join(process.cwd(), 'src/data/content.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export async function updateContent(data: any) {
  const filePath = path.join(process.cwd(), 'src/data/content.json');
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
