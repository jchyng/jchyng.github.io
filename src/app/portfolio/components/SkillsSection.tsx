import Image from "next/image";

interface Skill {
  name: string;
  badge: string;
  skilled?: boolean;
}

interface TechStack {
  category: string;
  skills: Skill[];
}

interface SkillsSectionProps {
  techStacks: TechStack[];
}

export default function SkillsSection({ techStacks }: SkillsSectionProps) {
  return (
    <section id="skills" className="mb-16">
      <h2 className="text-3xl font-bold text-neutral-900 mb-8">기술 스택</h2>
      <div className="space-y-8">
        {techStacks.map((category) => (
          <div key={category.category} className="card p-6">
            <h3 className="text-xl font-semibold text-neutral-900 mb-6">{category.category}</h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill: Skill) => (
                <div key={skill.name} className={`relative transition-all duration-200 hover:scale-105 rounded-md overflow-hidden ${
                  skill.skilled ? 'ring-2 ring-blue-500 bg-blue-50 p-1' : ''
                }`}>
                  <Image 
                    src={skill.badge} 
                    alt={skill.name}
                    width={120}
                    height={32}
                    className="h-8 shadow-sm hover:shadow-md transition-all duration-200"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}