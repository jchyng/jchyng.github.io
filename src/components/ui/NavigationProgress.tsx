'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function NavigationProgress() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Next.js 앱 라우터용 이벤트 리스너 추가
    const originalPush = router.push;
    router.push = (...args: Parameters<typeof router.push>) => {
      handleStart();
      try {
        const result = originalPush.apply(router, args);
        // 비동기 작업 완료 후 로딩 상태 해제
        setTimeout(handleComplete, 100);
        return result;
      } catch (error) {
        handleComplete();
        throw error;
      }
    };

    return () => {
      router.push = originalPush;
    };
  }, [router]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-neutral-600 font-medium">페이지를 불러오는 중...</p>
      </div>
    </div>
  );
}