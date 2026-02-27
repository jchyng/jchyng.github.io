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
    <section id="skills" className="mb-24">
      <h2 className="text-3xl font-bold text-neutral-900 mb-10">기술 스택</h2>
      <div className="space-y-12">
        {techStacks.map((category) => (
          <div key={category.category}>
            <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-5 border-b border-neutral-100 pb-2">
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill: Skill) => (
                <div
                  key={skill.name}
                  className={`
                    px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200
                    ${skill.skilled
                      ? 'bg-blue-50/50 border-blue-200 text-blue-700 shadow-sm'
                      : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300'
                    }
                  `}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}