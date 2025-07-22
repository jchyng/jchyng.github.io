import { Certification, Education, Award, Achievements } from "../../../lib/profile";

interface AchievementsSectionProps {
  achievements: Achievements;
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
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
                <div className="flex items-center justify-between">
                  <div className="font-medium text-neutral-900">{cert.name}</div>
                  {cert.attachment && (
                    <a 
                      href={cert.attachment} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      title="첨부 자료 보기"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </a>
                  )}
                </div>
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
                <div className="flex items-center justify-between">
                  <div className="font-medium text-neutral-900">{edu.name}</div>
                  {edu.attachment && (
                    <a 
                      href={edu.attachment} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      title="첨부 자료 보기"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </a>
                  )}
                </div>
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
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium text-neutral-900">{award.name}</div>
                  {award.attachment && (
                    <a 
                      href={award.attachment} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      title="첨부 자료 보기"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </a>
                  )}
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
  );
}