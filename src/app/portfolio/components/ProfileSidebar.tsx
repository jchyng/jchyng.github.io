'use client';

import Image from "next/image";
import Link from "next/link";

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

interface ProfileSidebarProps {
  profileData: ProfileData;
}

export default function ProfileSidebar({ profileData }: ProfileSidebarProps) {
  return (
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
  );
}