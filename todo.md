1. 포트폴리오 멘트 개선
2. 블로그 글 작성

## Github Pages 배포 방법


### 3. GitHub 저장소 설정
1. GitHub 저장소 → Settings → Pages
2. Source: "GitHub Actions" 선택
3. 저장소가 public이어야 함 (또는 GitHub Pro 이상)


### 5. 배포 실행
- main 브랜치에 push하면 자동 배포
- 수동 배포: GitHub Actions → "Deploy Next.js to GitHub Pages" → "Run workflow"

### 주의사항
- `getServerSideProps` 사용 불가 (static export)
- API Routes 사용 불가
- 이미지 최적화 비활성화 필요
- 상대 경로 사용 권장
