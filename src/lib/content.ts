import { client } from './sanity.client';
import fs from 'fs/promises';
import path from 'path';

export async function getContent() {
  try {
    // Fetch from Sanity
    const query = `*[_type == "siteContent"][0]`;
    const data = await client.fetch(query);
    
    if (data) {
      return data;
    }

    // Fallback to JSON if Sanity has no data yet
    const filePath = path.join(process.cwd(), 'src/data/content.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Sanity fetch failed, falling back to JSON", error);
    const filePath = path.join(process.cwd(), 'src/data/content.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(jsonData);
  }
}

export async function updateContent(data: any) {
  // We don't update from the frontend anymore, we use Sanity Studio
  console.log("updateContent is deprecated. Use Sanity Studio instead.");
}
