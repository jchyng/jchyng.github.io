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
  email: string;
  experience: Experience[];
  links: SocialLink[];
}

interface ProfileSidebarProps {
  profileData: ProfileData;
}

export default function ProfileSidebar({ profileData }: ProfileSidebarProps) {
  return (
    <aside className="hidden lg:block w-72 flex-shrink-0">
      <div className="sticky top-24 space-y-8">
        {/* 프로필 정보 */}
        <div>
          <div className="mb-6">
            <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full flex items-center justify-center overflow-hidden ring-1 ring-neutral-200 shadow-sm">
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
            <div className="text-center">
              <h2 className="text-3xl font-bold text-neutral-900 mb-2">{profileData.name}</h2>
              <p className="text-lg text-neutral-500 font-medium">{profileData.major}</p>
            </div>
          </div>

          {/* 이메일 & 링크 */}
          <div className="flex flex-col items-center gap-3">
            <a 
              href={`mailto:${profileData.email}`}
              className="flex items-center space-x-2 text-neutral-500 hover:text-blue-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>{profileData.email}</span>
            </a>

            <div className="flex gap-4">
              {profileData.links.map((link: SocialLink, index: number) => (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-blue-600 transition-colors duration-200"
                  title={link.name}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox={link.viewBox || "0 0 24 24"}>
                    <path d={link.svg}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-neutral-200" />

        {/* 경력 */}
        <div>
          <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4">Experience</h3>
          <div className="space-y-6">
            {profileData.experience.map((exp, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold text-neutral-900">{exp.company}</div>
                  <div className="text-xs text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-full">{exp.type}</div>
                </div>
                <div className="text-sm text-neutral-600 mb-0.5">{exp.position}</div>
                <div className="text-xs text-neutral-400 font-mono">{exp.period}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </aside>
  );
}