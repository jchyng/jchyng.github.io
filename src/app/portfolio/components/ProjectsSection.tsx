'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProjectMetadata } from "../../../lib/projects";

interface ProjectsSectionProps {
  projects: ProjectMetadata[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState('work');

  const filteredProjects = projects.filter(project => 
    activeTab === 'all' ? true : project.type === activeTab
  );

  return (
    <section id="projects" className="mb-16">
      <h2 className="text-3xl font-bold text-neutral-900 mb-8">프로젝트</h2>
      
      {/* 프로젝트 필터 */}
      <div className="flex space-x-2 mb-8">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            activeTab === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          전체
        </button>
        <button
          onClick={() => setActiveTab('work')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            activeTab === 'work' 
              ? 'bg-blue-600 text-white' 
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          회사 프로젝트
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            activeTab === 'team' 
              ? 'bg-blue-600 text-white' 
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          팀 프로젝트
        </button>
        <button
          onClick={() => setActiveTab('personal')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            activeTab === 'personal' 
              ? 'bg-blue-600 text-white' 
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          개인 프로젝트
        </button>
      </div>

      {/* 프로젝트 목록 */}
      <div className="grid gap-8 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <div key={project.id} className="card overflow-hidden hover:shadow-lg transition-all duration-300 relative">
            {/* 외부 링크 아이콘 - 우측 상단 */}
            {project.link && project.link !== '#' && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 text-blue-600 hover:text-blue-700 hover:bg-white shadow-sm transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            
            <Link href={`/portfolio/project/${project.id}`} className="block">
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                {project.image ? (
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-fill"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : 
                <svg className="w-16 h-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-neutral-900">{project.title}</h3>
                </div>
                <div className="text-sm text-neutral-500 mb-3">{project.period} | {project.team}</div>
                <p className="text-neutral-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech: string) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}