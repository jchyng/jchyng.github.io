'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import portfolioData from "./data.json";

interface SocialLink {
  name: string;
  url: string;
  svg: string;
  viewBox?: string;
}

interface Experience {
  company: string;
  position: string;
  period: string;
  type: string;
}

interface ProfileData {
  name: string;
  birthDate: string;
  major: string;
  image: string;
  experience: Experience[];
  links: SocialLink[];
}

interface Skill {
  name: string;
  badge: string;
  skilled?: boolean;
}

interface TechStack {
  category: string;
  skills: Skill[];
}

interface Project {
  id: number;
  title: string;
  period: string;
  description: string;
  link: string;
  tech: string[];
  team: string;
  image: string;
  type: string;
}

interface Certification {
  name: string;
  date: string;
  issuer: string;
}

interface Education {
  name: string;
  date: string;
  institution: string;
}

interface Award {
  name: string;
  rank: string;
  date: string;
}

interface Achievements {
  certifications: Certification[];
  education: Education[];
  awards: Award[];
}

const { profileData, techStacks, projects, achievements } = portfolioData as unknown as {
  profileData: ProfileData;
  techStacks: TechStack[];
  projects: Project[];
  achievements: Achievements;
};

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('personal');

  const filteredProjects = projects.filter(project => 
    activeTab === 'all' ? true : project.type === activeTab
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* 사이드바 */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* 프로필 카드 */}
              <div className="card p-6">
                <div className="text-center mb-6">
                  <div className="w-44 h-44 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center overflow-hidden">
                    {profileData.image ? (
                      <Image
                        src={profileData.image}
                        alt={profileData.name}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <svg className="w-16 h-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">{profileData.name}</h2>
                  <p className="text-neutral-600">{profileData.major}</p>
                  <p className="text-sm text-neutral-500">{profileData.birthDate}</p>
                </div>

                {/* 경력 */}
                <div className="mb-6">
                  <h3 className="font-semibold text-neutral-900 mb-3">경력 사항</h3>
                  <div className="space-y-3">
                    {profileData.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-4">
                        <div className="font-medium text-neutral-900">{exp.company}</div>
                        <div className="text-sm text-neutral-600">{exp.position}</div>
                        <div className="text-xs text-neutral-500">{exp.period}</div>
                      </div>
                    ))}
                  </div>
                </div>


                {/* 링크 */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">링크</h3>
                  <div className="space-y-2">
                    {profileData.links.map((link: SocialLink, index: number) => (
                      <a 
                        key={index}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-neutral-700 hover:text-blue-600 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox={link.viewBox || "0 0 24 24"}>
                          <path d={link.svg}/>
                        </svg>
                        <span>{link.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* 네비게이션 */}
              <div className="card p-4">
                <nav className="space-y-2">
                  <Link href="#projects" className="block py-2 px-3 text-neutral-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                    프로젝트
                  </Link>
                  <Link href="#achievements" className="block py-2 px-3 text-neutral-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                    자격증 & 교육
                  </Link>
                  <Link href="#skills" className="block py-2 px-3 text-neutral-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                    기술 스택
                  </Link>
                </nav>
              </div>
            </div>
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="flex-1 pt-8">
            {/* 헤더 */}
            <section className="mb-12">
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">소개</h1>
              <p className="text-xl text-neutral-600 leading-relaxed">
                항상 &quot;왜?&quot;라는 질문을 던지며, 의도와 결과를 비교해 문제를 해결하고 있습니다.<br />
                AI 활용에 관심이 많고, AI를 다양한 프로젝트에 활용하며 생산성과 효율성을 높이기 위해 노력 중입니다.<br />
              </p>
            </section>

            {/* 프로젝트 */}
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
                  onClick={() => setActiveTab('personal')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    activeTab === 'personal' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  개인 프로젝트
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
              </div>

              {/* 프로젝트 목록 */}
              <div className="grid gap-8 md:grid-cols-2">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="card overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      {project.image ? (
                        <Image 
                          src={project.image} 
                          alt={project.title}
                          width={400}
                          height={250}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : null}
                      <svg className="w-16 h-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-neutral-900">{project.title}</h3>
                        {project.link !== '#' && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
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
                  </div>
                ))}
              </div>
            </section>

            {/* 자격증 & 교육 */}
            <section id="achievements" className="mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 mb-8">자격증 & 교육</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {/* 자격증 */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    자격증
                  </h3>
                  <div className="space-y-3">
                    {achievements.certifications.map((cert: Certification, index: number) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-3">
                        <div className="font-medium text-neutral-900">{cert.name}</div>
                        <div className="text-sm text-neutral-600">{cert.issuer}</div>
                        <div className="text-xs text-neutral-500">{cert.date}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 교육 */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    교육 이수
                  </h3>
                  <div className="space-y-3">
                    {achievements.education.map((edu: Education, index: number) => (
                      <div key={index} className="border-l-2 border-green-200 pl-3">
                        <div className="font-medium text-neutral-900">{edu.name}</div>
                        <div className="text-sm text-neutral-600">{edu.institution}</div>
                        <div className="text-xs text-neutral-500">{edu.date}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 수상 */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    수상 이력
                  </h3>
                  <div className="space-y-3">
                    {achievements.awards.map((award: Award, index: number) => (
                      <div key={index} className="border-l-2 border-yellow-200 pl-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="font-medium text-neutral-900">{award.name}</div>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {award.rank}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-500">{award.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 기술 스택 */}
            <section id="skills" className="mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 mb-8">기술 스택</h2>
              <div className="space-y-8">
                {techStacks.map((category) => (
                  <div key={category.category} className="card p-6">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-6">{category.category}</h3>
                    <div className="flex flex-wrap gap-3">
                      {category.skills.map((skill: Skill) => (
                        <div key={skill.name} className={`relative transition-transform duration-200 hover:scale-105 ${
                          skill.skilled ? 'skilled-badge' : ''
                        }`}>
                          {skill.skilled && (
                            <div className="absolute -top-2 -right-2 z-10">
                              <span className="inline-flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg border-2 border-white animate-bounce">
                                ⭐
                              </span>
                            </div>
                          )}
                          <Image 
                            src={skill.badge} 
                            alt={skill.name}
                            width={120}
                            height={32}
                            className={`h-8 shadow-sm hover:shadow-md transition-all duration-200 ${
                              skill.skilled 
                                ? 'ring-2 ring-yellow-400 ring-opacity-70 shadow-yellow-200 hover:shadow-yellow-300' 
                                : ''
                            }`}
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}