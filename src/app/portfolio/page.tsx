'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// 프로필 데이터
const profileData = {
  name: "정찬영",
  birthDate: "1999.11.23",
  major: "컴퓨터공학 전공",
  image: "/profile.jpg",
  experience: [
    {
      company: "SPPARTNERS",
      position: "인턴",
      period: "2023.09 ~ 2024.12",
      type: "인턴십"
    },
    {
      company: "위니텍",
      position: "WEB 개발",
      period: "2024.04 ~ 2025.03",
      type: "개발자"
    }
  ],
  links: {
    github: "https://github.com/username",
    tistory: "https://username.tistory.com"
  }
};

// 기술 스택 데이터 (shields.io 뱃지)
const techStacks = [
  {
    category: "Frontend",
    skills: [
      { name: "React", badge: "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" },
      { name: "Next.js", badge: "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" },
      { name: "TypeScript", badge: "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" },
      { name: "JavaScript", badge: "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" },
      { name: "HTML5", badge: "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" },
      { name: "CSS3", badge: "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" },
      { name: "Tailwind CSS", badge: "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" },
      { name: "Sass", badge: "https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", badge: "https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" },
      { name: "Express.js", badge: "https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" },
      { name: "Python", badge: "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" },
      { name: "Java", badge: "https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" },
      { name: "Spring Boot", badge: "https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" }
    ]
  },
  {
    category: "Database",
    skills: [
      { name: "MySQL", badge: "https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" },
      { name: "PostgreSQL", badge: "https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" },
      { name: "MongoDB", badge: "https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" },
      { name: "Redis", badge: "https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" }
    ]
  },
  {
    category: "DevOps & Tools",
    skills: [
      { name: "Git", badge: "https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" },
      { name: "GitHub", badge: "https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" },
      { name: "Docker", badge: "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" },
      { name: "AWS", badge: "https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" },
      { name: "Vercel", badge: "https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" },
      { name: "VS Code", badge: "https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" },
      { name: "Figma", badge: "https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" },
      { name: "Postman", badge: "https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" }
    ]
  }
];

// 프로젝트 데이터
const projects = [
  {
    id: 1,
    title: "E-커머스 웹사이트",
    period: "2024.01 ~ 2024.03",
    description: "React와 Node.js를 활용한 풀스택 쇼핑몰 웹사이트. 상품 관리, 장바구니, 결제 시스템을 구현했습니다.",
    link: "https://github.com/username/ecommerce",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    team: "개인 프로젝트",
    image: "/images/portfolio/ecommerce-website.jpg",
    type: "personal"
  },
  {
    id: 2,
    title: "할일 관리 앱",
    period: "2023.11 ~ 2023.12",
    description: "Next.js와 TypeScript를 사용한 현대적인 할일 관리 애플리케이션. 드래그 앤 드롭, 카테고리 분류 기능 포함.",
    link: "https://github.com/username/todo-app",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    team: "개인 프로젝트",
    image: "/images/portfolio/todo-app.jpg",
    type: "personal"
  },
  {
    id: 3,
    title: "회사 내부 관리 시스템",
    period: "2024.05 ~ 2024.08",
    description: "위니텍 재직 중 개발한 내부 직원 관리 및 프로젝트 추적 시스템. React와 Spring Boot를 활용.",
    link: "#",
    tech: ["React", "Spring Boot", "MySQL", "Docker"],
    team: "팀 프로젝트 (3명)",
    image: "/images/portfolio/management-system.jpg",
    type: "work"
  },
  {
    id: 4,
    title: "날씨 대시보드",
    period: "2023.09 ~ 2023.10",
    description: "공공 API를 활용한 실시간 날씨 정보 대시보드. 지역별 날씨 조회 및 예보 기능을 제공합니다.",
    link: "https://github.com/username/weather-dashboard",
    tech: ["Vue.js", "Chart.js", "OpenWeather API"],
    team: "개인 프로젝트",
    image: "/images/portfolio/weather-dashboard.jpg",
    type: "personal"
  }
];

// 자격증 및 교육 데이터
const achievements = {
  certifications: [
    { name: "정보처리기사", date: "2023.05", issuer: "한국산업인력공단" },
    { name: "SQLD", date: "2023.03", issuer: "한국데이터산업진흥원" },
    { name: "컴활 1급", date: "2022.11", issuer: "대한상공회의소" }
  ],
  education: [
    { name: "React 마스터클래스", date: "2024.01", institution: "온라인 강의" },
    { name: "AWS 클라우드 기초", date: "2023.12", institution: "AWS 교육센터" },
    { name: "알고리즘 문제해결", date: "2023.08", institution: "프로그래머스" }
  ],
  awards: [
    { name: "대학교 프로그래밍 경진대회", rank: "우수상", date: "2023.06" },
    { name: "해커톤 대회", rank: "장려상", date: "2023.04" }
  ]
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
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
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

                {/* 주요 기술 스택 */}
                <div className="mb-6">
                  <h3 className="font-semibold text-neutral-900 mb-3">주요 기술</h3>
                  <div className="flex flex-wrap gap-2">
                    <Image src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" width={100} height={20} className="h-5" unoptimized />
                    <Image src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" width={100} height={20} className="h-5" unoptimized />
                    <Image src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" width={100} height={20} className="h-5" unoptimized />
                    <Image src="https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" width={100} height={20} className="h-5" unoptimized />
                    <Image src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" width={100} height={20} className="h-5" unoptimized />
                  </div>
                </div>

                {/* 링크 */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">링크</h3>
                  <div className="space-y-2">
                    <a 
                      href={profileData.links.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-neutral-700 hover:text-blue-600 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>GitHub</span>
                    </a>
                    <a 
                      href={profileData.links.tistory} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-neutral-700 hover:text-blue-600 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 17.5h-3v-11h3v11zm0-12.5h-3v-2h3v2zm6.5 12.5h-3v-6.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5v6.5h-3v-11h3v1.816c.662-1.184 1.838-1.816 3-1.816 2.485 0 4.5 2.015 4.5 4.5v6.5z"/>
                      </svg>
                      <span>Tistory</span>
                    </a>
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
                웹 개발에 대한 열정과 지속적인 학습을 통해 성장하는 개발자입니다.<br/>
                사용자 경험을 중시하며, 깔끔하고 효율적인 코드를 작성하기 위해 노력합니다.
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
                        {project.tech.map((tech) => (
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
                    {achievements.certifications.map((cert, index) => (
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
                    {achievements.education.map((edu, index) => (
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
                    {achievements.awards.map((award, index) => (
                      <div key={index} className="border-l-2 border-yellow-200 pl-3">
                        <div className="font-medium text-neutral-900">{award.name}</div>
                        <div className="text-sm text-neutral-600">{award.rank}</div>
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
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="transition-transform duration-200 hover:scale-105">
                          <Image 
                            src={skill.badge} 
                            alt={skill.name}
                            width={120}
                            height={32}
                            className="h-8 shadow-sm hover:shadow-md transition-shadow duration-200"
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