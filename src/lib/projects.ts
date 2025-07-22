import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ProjectMetadata {
  id: number;
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
          id: parseInt(filename.replace(/\.md$/, ''), 10),
        } as ProjectMetadata;
      })
      .sort((a, b) => b.id - a.id); // ID 역순으로 정렬 (최신순)

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
      id: parseInt(id, 10),
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