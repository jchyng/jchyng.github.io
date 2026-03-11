"use client";

import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Prism from "prismjs";

// Prism 테마 및 언어 임포트
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-java";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-sql";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  useEffect(() => {
    // 콘텐츠가 로드되거나 변경될 때마다 하이라이팅 적용
    Prism.highlightAll();
  }, [content]);

  return (
    <div className="markdown-content">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // 코드 블록 스타일링 최적화
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <pre className={className} style={{ borderRadius: '0.75rem', padding: '1.25rem' }}>
                <code {...props} className={className}>
                  {children}
                </code>
              </pre>
            ) : (
              <code {...props} className={className} style={{ backgroundColor: '#2d2d2d', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' }}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
