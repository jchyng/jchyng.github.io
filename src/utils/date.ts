// Date formatting utilities
export function formatKoreanDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\. /g, '.').replace(/\.$/, '');
}

export function formatDateForDisplay(dateString: string, locale: string = 'ko-KR'): string {
  const date = new Date(dateString);
  
  if (locale === 'ko-KR') {
    return formatKoreanDate(dateString);
  }
  
  return date.toLocaleDateString(locale);
}

export function sortByDate<T extends { frontmatter: { date: string } }>(posts: T[]): T[] {
  return posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}