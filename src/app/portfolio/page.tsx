import ProfileSidebar from "./components/ProfileSidebar";
import IntroSection from "./components/IntroSection";
import ProjectsSection from "./components/ProjectsSection";
import AchievementsSection from "./components/AchievementsSection";
import SkillsSection from "./components/SkillsSection";
import { getAllProjects } from "../../lib/projects";
import { profileData, achievements, techStacks } from "../../lib/profile";

export default function PortfolioPage() {
  const projects = getAllProjects();

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* 사이드바 */}
          <ProfileSidebar profileData={profileData} />

          {/* 메인 콘텐츠 */}
          <main className="flex-1 pt-8">
            <IntroSection />
            <ProjectsSection projects={projects} />
            <AchievementsSection achievements={achievements} />
            <SkillsSection techStacks={techStacks} />
          </main>
        </div>
      </div>
    </div>
  );
}