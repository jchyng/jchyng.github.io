import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export type ProjectData = {
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  summary: string;
  date: string;
  period?: string;
  affiliation?: string;
  content: string;
};

export function getAllProjects(): ProjectData[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(contentDirectory);
  
  const allProjects = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        title: data.title || slug,
        category: data.category || 'Uncategorized',
        thumbnail: data.thumbnail || '',
        summary: data.summary || '',
        date: data.date || '',
        period: data.period || '',
        affiliation: data.affiliation || '',
        content,
      } as ProjectData;
    });

  // Sort by date descending
  return allProjects.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getProjectBySlug(slug: string): ProjectData | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      category: data.category || 'Uncategorized',
      thumbnail: data.thumbnail || '',
      summary: data.summary || '',
      date: data.date || '',
      period: data.period || '',
      affiliation: data.affiliation || '',
      content,
    } as ProjectData;
  } catch {
    return null;
  }
}
