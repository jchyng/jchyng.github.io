export interface SocialLink {
  name: string;
  url: string;
  svg: string;
  viewBox?: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  type: string;
}

export interface ProfileData {
  name: string;
  birthDate: string;
  major: string;
  image: string;
  experience: Experience[];
  links: SocialLink[];
}

export interface Certification {
  name: string;
  date: string;
  issuer: string;
  attachment?: string;
}

export interface Education {
  name: string;
  date: string;
  institution: string;
  attachment?: string;
}

export interface Award {
  name: string;
  rank: string;
  date: string;
  attachment?: string;
}

export interface Achievements {
  certifications: Certification[];
  education: Education[];
  awards: Award[];
}

export interface Skill {
  name: string;
  badge: string;
  skilled?: boolean;
}

export interface TechStack {
  category: string;
  skills: Skill[];
}

// 프로필 데이터
export const profileData: ProfileData = {
  name: "정찬영",
  birthDate: "1999.11.23",
  major: "컴퓨터공학 전공",
  image: "/images/portfolio/profile.jpg",
  experience: [
    {
      company: "SPPARTNERS",
      position: "인턴",
      period: "2023.09 ~ 2024.12 (3개월)",
      type: "인턴십"
    },
    {
      company: "위니텍",
      position: "WEB 개발",
      period: "2024.04 ~ 2025.03 (11개월)",
      type: "정규직"
    }
  ],
  links: [
    {
      name: "GitHub",
      url: "https://github.com/jchyng",
      svg: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
    },
    {
      name: "Tistory",
      url: "https://bbogle2.tistory.com",
      svg: "M229.5,0C102.75,0,0,102.75,0,229.5S102.75,459,229.5,459,459,356.25,459,229.5,356.25,0,229.5,0ZM130.21,191.45a39.57,39.57,0,1,1,39.56-39.57A39.58,39.58,0,0,1,130.21,191.45ZM229.5,390a39.56,39.56,0,1,1,39.56-39.56A39.56,39.56,0,0,1,229.5,390Zm0-99.29a39.56,39.56,0,1,1,39.56-39.56A39.56,39.56,0,0,1,229.5,290.74Zm0-99.29a39.57,39.57,0,1,1,39.56-39.57A39.57,39.57,0,0,1,229.5,191.45Zm99.29,0a39.57,39.57,0,1,1,39.57-39.57A39.57,39.57,0,0,1,328.79,191.45Z",
      viewBox: "0 0 459 459"
    }
  ]
};

// 성과 데이터
export const achievements: Achievements = {
  certifications: [
    { name: "정보처리기사", date: "2025.09", issuer: "한국산업인력공단" },
    { name: "SQLD", date: "2024.04.05", issuer: "한국데이터산업진흥원", attachment: "/images/portfolio/references/SQLD.pdf" }
  ],
  education: [
    { name: "멀티캠퍼스 Java 백엔드", date: "2023.03 ~ 2023.07.25", institution: "실시간 온라인 수업", attachment: "/images/portfolio/references/멀티캠퍼스 수료증.pdf" }
  ],
  awards: [
    { name: "멀티캠퍼스 자바 백엔드 12회차 파이널 프로젝트 경진대회", rank: "최우수상", date: "2023.07.25", attachment: "/images/portfolio/references/멀티캠퍼스 최우수상.pdf" },
    { name: "Microsoft 해커그라운드", rank: "본선 진출", date: "2023.06.23" },
    { name: "한국정보기술학회 논문경진대회", rank: "은상", date: "2023.06.02", attachment: "/images/portfolio/references/논문 은상.pdf" }
  ]
};

// 기술 스택 데이터
export const techStacks: TechStack[] = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Java", badge: "https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white", skilled: true },
      { name: "JavaScript", badge: "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black", skilled: true },
      { name: "C#", badge: "https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white" },
      { name: "Python", badge: "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" }
    ]
  },
  {
    category: "Frontend Development",
    skills: [
      { name: "React", badge: "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB", skilled: true },
      { name: "Next.js", badge: "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" },
      { name: "Vue.js", badge: "https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" },
      { name: "React Native", badge: "https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"},
      { name: "Tailwind CSS", badge: "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" }
    ]
  },
  {
    category: "Backend Frameworks & Technologies",
    skills: [
      { name: "Spring Boot", badge: "https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white", skilled: true },
      { name: "Spring Security", badge: "https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white", skilled: true },
      { name: "Spring Data JPA", badge: "https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=for-the-badge&logo=spring-data-jpa&logoColor=white", skilled: true },
      { name: "Spring Cloud", badge: "https://img.shields.io/badge/Spring_Cloud-6DB33F?style=for-the-badge&logo=spring-cloud&logoColor=white" },
      { name: ".NET", badge: "https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white" },
      { name: "JSP", badge: "https://img.shields.io/badge/JSP-007396?style=for-the-badge&logo=java&logoColor=white" }
    ]
  },
  {
    category: "Database & Data Persistence",
    skills: [
      { name: "MySQL", badge: "https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white", skilled: true },
      { name: "PostgreSQL", badge: "https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" },
      { name: "MongoDB", badge: "https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" },
      { name: "Redis", badge: "https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" },
      { name: "JPA", badge: "https://img.shields.io/badge/JPA-0078D4?style=for-the-badge&logo=JPA&logoColor=white", skilled: true },
      { name: "MyBatis", badge: "https://img.shields.io/badge/MyBatis-1B1F23?style=for-the-badge&logo=mybatis&logoColor=white", skilled: true },
      { name: "SQLite", badge: "https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" }
    ]
  },
  {
    category: "Message Queue & Search Engines",
    skills: [
      { name: "Apache Kafka", badge: "https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apache-kafka&logoColor=white" },
      { name: "MQTT", badge: "https://img.shields.io/badge/MQTT-3C5280?style=for-the-badge&logo=mqtt&logoColor=white" },
      { name: "Meilisearch", badge: "https://img.shields.io/badge/Meilisearch-FF5CAA?style=for-the-badge&logo=meilisearch&logoColor=white", skilled: true }
    ]
  },
  {
    category: "Web Scraping & Automation",
    skills: [
      { name: "Selenium", badge: "https://img.shields.io/badge/Selenium-43B02A?style=for-the-badge&logo=selenium&logoColor=white" },
      { name: "Beautiful Soup", badge: "https://img.shields.io/badge/Beautiful_Soup-FFD43B?style=for-the-badge&logo=python&logoColor=black" }
    ]
  },
  {
    category: "Web Servers & Infrastructure",
    skills: [
      { name: "Nginx", badge: "https://img.shields.io/badge/Nginx-269539?style=for-the-badge&logo=nginx&logoColor=white" },
      { name: "Apache Tomcat", badge: "https://img.shields.io/badge/Apache_Tomcat-F8DC75?style=for-the-badge&logo=apache-tomcat&logoColor=black", skilled: true },
      { name: "Apache HTTP Server", badge: "https://img.shields.io/badge/Apache-D22128?style=for-the-badge&logo=apache&logoColor=white", skilled: true },
      { name: "Docker", badge: "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white", skilled: true }
    ]
  },
  {
    category: "Development Tools & Build Systems",
    skills: [
      { name: "Git", badge: "https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white", skilled: true },
      { name: "Maven", badge: "https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white" },
      { name: "Gradle", badge: "https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white" },
      { name: "GitHub Actions", badge: "https://img.shields.io/badge/GitHub_Actions-100000?style=for-the-badge&logo=github&logoColor=white" },
      { name: "Jenkins", badge: "https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white" }
    ]
  },
  {
    category: "Testing & Documentation",
    skills: [
      { name: "JUnit", badge: "https://img.shields.io/badge/JUnit-25A162?style=for-the-badge&logo=junit5&logoColor=white" },
      { name: "Mockito", badge: "https://img.shields.io/badge/Mockito-8B0000?style=for-the-badge&logo=mockito&logoColor=white" },
      { name: "Apache JMeter", badge: "https://img.shields.io/badge/Apache_JMeter-D22128?style=for-the-badge&logo=apache-jmeter&logoColor=white" },
      { name: "Swagger", badge: "https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white" },
      { name: "REST Docs", badge: "https://img.shields.io/badge/RestDoc-0078D4?style=for-the-badge&logo=restdoc&logoColor=white" }
    ]
  },
  {
    category: "Cloud & Hosting Platforms",
    skills: [
      { name: "AWS", badge: "https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" },
      { name: "Oracle Cloud", badge: "https://img.shields.io/badge/Oracle_Cloud-F80000?style=for-the-badge&logo=oracle&logoColor=white" },
      { name: "Vercel", badge: "https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" },
      { name: "Firebase", badge: "https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" },
      { name: "Supabase", badge: "https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" },
      { name: "Cloudflare", badge: "https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" }
    ]
  },
  {
    category: "AI-Powered Development Tools",
    skills: [
      { name: "ChatGPT", badge: "https://img.shields.io/badge/ChatGPT-412991?style=for-the-badge&logo=openai&logoColor=white" },
      { name: "Claude Code", badge: "https://img.shields.io/badge/Claude_Code-FF6B35?style=for-the-badge&logo=anthropic&logoColor=white", skilled: true },
      { name: "Copilot", badge: "https://img.shields.io/badge/GitHub_Copilot-2B7489?style=for-the-badge&logo=github-copilot&logoColor=white" },
      { name: "Gemini CLI", badge: "https://img.shields.io/badge/Gemini_CLI-4285F4?style=for-the-badge&logo=google&logoColor=white" },
      { name: "Perplexity", badge: "https://img.shields.io/badge/Perplexity-20B2AA?style=for-the-badge&logo=perplexity&logoColor=white" },
      { name: "Cursor", badge: "https://img.shields.io/badge/Cursor-000000?style=for-the-badge&logo=cursor&logoColor=white" },
      { name: "Replit", badge: "https://img.shields.io/badge/Replit-667881?style=for-the-badge&logo=replit&logoColor=white" },
      { name: "Stitch AI", badge: "https://img.shields.io/badge/Stitch_AI-6366F1?style=for-the-badge&logo=ai&logoColor=white" }
    ]
  }
];