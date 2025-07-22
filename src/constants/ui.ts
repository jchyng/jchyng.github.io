// UI Constants and reusable values
export const UI_CONSTANTS = {
  HEADER_HEIGHT: '4rem',
  CONTAINER_MAX_WIDTH: '80rem',
  ANIMATION_DURATION: {
    FAST: '150ms',
    NORMAL: '250ms',
    SLOW: '400ms',
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
  },
} as const;

// Navigation configuration
export const NAVIGATION_ITEMS = [
  { 
    name: '포트폴리오', 
    href: '/portfolio', 
    description: '경력 및 프로젝트',
    icon: 'portfolio'
  },
  { 
    name: '개발 블로그', 
    href: '/blog', 
    description: '기술 블로그 및 인사이트',
    icon: 'blog'
  },
] as const;

// SVG Icon paths
export const ICON_PATHS = {
  portfolio: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  blog: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  arrow: "M17 8l4 4m0 0l-4 4m4-4H3",
  close: "M6 18L18 6M6 6l12 12",
  menu: "M4 6h16M4 12h16M4 18h16",
} as const;