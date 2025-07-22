import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ProjectMetadata {
  id: string;
  title: string;
  period: string;
  description: string;
  team: string;
  tech: string[];
  link?: string;
  image: string;
  type: string;
  award?: string;
}

export interface Project extends ProjectMetadata {
  content: string;
}

const projectsDirectory = path.join(process.cwd(), 'projects');

export function getAllProjects(): ProjectMetadata[] {
  try {
    if (!fs.existsSync(projectsDirectory)) {
      return [];
    }

    const filenames = fs.readdirSync(projectsDirectory);
    const projects = filenames
      .filter(name => name.endsWith('.md'))
      .map((filename) => {
        const filePath = path.join(projectsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          ...data,
          id: filename.replace(/\.md$/, ''),
        } as ProjectMetadata;
      })
      .sort((a, b) => {
        // 날짜순으로 정렬 (최신순)
        const dateA = new Date(a.period.split(' ~ ')[0]);
        const dateB = new Date(b.period.split(' ~ ')[0]);
        return dateB.getTime() - dateA.getTime();
      });

    return projects;
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

export function getProjectById(id: string): Project | null {
  try {
    const filePath = path.join(projectsDirectory, `${id}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      ...data,
      id,
      content,
    } as Project;
  } catch (error) {
    console.error('Error reading project:', error);
    return null;
  }
}

export function getProjectsByType(type: string): ProjectMetadata[] {
  const allProjects = getAllProjects();
  if (type === 'all') {
    return allProjects;
  }
  return allProjects.filter(project => project.type === type);
}