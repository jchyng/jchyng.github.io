import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

interface ProjectMetadata {
  title: string;
  period: string;
  team: string;
  tech: string[];
  link?: string;
  image: string;
  type: string;
  award?: string;
}

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProjectContent(id: string) {
  try {
    const projectsDirectory = path.join(process.cwd(), 'projects');
    const filePath = path.join(projectsDirectory, `${id}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const processedContent = await remark()
      .use(remarkHtml)
      .process(content);
    
    const contentHtml = processedContent.toString();

    return {
      metadata: data as ProjectMetadata,
      contentHtml,
    };
  } catch (error) {
    console.error('Error reading project content:', error);
    return null;
  }
}

export async function generateStaticParams() {
  const projectsDirectory = path.join(process.cwd(), 'projects');
  
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(projectsDirectory);
  return filenames
    .filter(name => name.endsWith('.md'))
    .map((filename) => ({
      id: filename.replace(/\.md$/, ''),
    }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProjectContent(id);

  if (!project) {
    notFound();
  }

  const { metadata, contentHtml } = project;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-custom py-8">
        {/* 뒤로 가기 버튼 */}
        <div className="mb-8">
          <Link 
            href="/portfolio" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            포트폴리오로 돌아가기
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* 프로젝트 헤더 */}
          <div className="card p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/3">
                <div className="aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  {metadata.image ? (
                    <Image 
                      src={metadata.image} 
                      alt={metadata.title}
                      width={400}
                      height={250}
                      className="w-full h-full object-fill"
                    />
                  ) : (
                    <svg className="w-16 h-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                </div>
              </div>

              <div className="lg:w-2/3">
                <h1 className="text-3xl font-bold text-neutral-900 mb-4">{metadata.title}</h1>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-neutral-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{metadata.period}</span>
                  </div>
                  
                  <div className="flex items-center text-neutral-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>{metadata.team}</span>
                  </div>

                  {metadata.award && (
                    <div className="flex items-center text-yellow-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span className="font-semibold">{metadata.award}</span>
                    </div>
                  )}

                  {metadata.link && (
                    <div className="flex items-center">
                      <a 
                        href={metadata.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        프로젝트 보기
                      </a>
                    </div>
                  )}
                </div>

                {/* 기술 스택 */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">기술 스택</h3>
                  <div className="flex flex-wrap gap-2">
                    {metadata.tech.map((tech: string) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 프로젝트 내용 */}
          <div className="card p-8">
            <div 
              className="markdown-content prose prose-neutral max-w-none prose-headings:text-neutral-900 prose-h1:text-2xl prose-h1:border-b prose-h1:border-neutral-200 prose-h1:pb-3 prose-h2:text-xl prose-h2:text-neutral-800 prose-h3:text-lg prose-h3:text-neutral-700 prose-p:text-neutral-600 prose-li:text-neutral-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-neutral-900 prose-strong:font-semibold prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-medium prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:pl-4 prose-blockquote:py-3 prose-blockquote:rounded-r-lg prose-ul:space-y-2 prose-ol:space-y-2 prose-li:marker:text-blue-500"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}