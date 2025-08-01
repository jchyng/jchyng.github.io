"use client";

import { useState } from "react";
import { CategoryHierarchy } from "@/types/post";

interface CategoryTreeDesignProps {
  categories: CategoryHierarchy[];
  selectedCategory: string;
  onCategorySelect: (categoryPath: string) => void;
  allPostsCount: number;
}

interface CategoryNodeProps {
  category: CategoryHierarchy;
  selectedCategory: string;
  onCategorySelect: (categoryPath: string) => void;
  level: number;
  allCategories: CategoryHierarchy[];
  isLast?: boolean;
  parentLines?: boolean[];
}

function CategoryNode({ 
  category, 
  selectedCategory, 
  onCategorySelect, 
  level, 
  allCategories,
  isLast = false,
  parentLines = []
}: CategoryNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true); // 기본적으로 펼쳐진 상태
  const hasChildren = category.children.length > 0;
  const isSelected = selectedCategory === category.name;
  
  const childCategories = category.children
    .map(childPath => allCategories.find(cat => cat.name === childPath))
    .filter(Boolean) as CategoryHierarchy[];

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleSelect = () => {
    onCategorySelect(category.name);
  };

  const currentLines = [...parentLines, !isLast];

  return (
    <div className="select-none">
      {/* 현재 노드 */}
      <div
        className={`flex items-center group cursor-pointer rounded-md transition-colors duration-200 ${
          isSelected
            ? "bg-blue-50 text-blue-700"
            : "hover:bg-neutral-50 text-neutral-700"
        }`}
        onClick={handleSelect}
      >
        {/* 들여쓰기 라인 */}
        <div className="flex items-center">
          {parentLines.map((showLine, index) => (
            <div key={index} className="w-6 h-6 flex justify-center">
              {showLine && (
                <div className="w-px bg-neutral-200 h-full"></div>
              )}
            </div>
          ))}
          
          {/* 현재 레벨 연결선 */}
          {level > 0 && (
            <div className="w-6 h-6 flex items-center justify-center relative">
              {/* 세로선 */}
              {!isLast && (
                <div className="absolute w-px bg-neutral-200 h-full top-0"></div>
              )}
              {/* 상단에서 중간까지 세로선 */}
              <div className="absolute w-px bg-neutral-200 h-3 top-0"></div>
              {/* 가로선 */}
              <div className="absolute w-3 h-px bg-neutral-200 left-3"></div>
            </div>
          )}
          
          {/* 확장/축소 버튼 또는 아이콘 */}
          <div className="w-6 h-6 flex items-center justify-center">
            {hasChildren ? (
              <button
                onClick={handleToggle}
                className="w-4 h-4 flex items-center justify-center rounded hover:bg-neutral-200 transition-colors"
              >
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            ) : (
              <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
            )}
          </div>
        </div>
        
        {/* 폴더/파일 아이콘 */}
        <div className="w-5 h-5 flex items-center justify-center ml-1 mr-2">
          {hasChildren ? (
            <svg
              className={`w-4 h-4 ${
                isExpanded ? "text-blue-500" : "text-neutral-500"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          )}
        </div>
        
        {/* 카테고리 이름과 카운트 */}
        <div className="flex items-center justify-between flex-1 py-1.5 pr-2">
          <span 
            className={`text-sm ${
              isSelected ? "font-medium" : ""
            }`}
          >
            {category.displayName}
          </span>
          <span className="text-xs text-neutral-400 ml-2">
            {category.count}
          </span>
        </div>
      </div>
      
      {/* 자식 노드들 */}
      {hasChildren && isExpanded && (
        <div>
          {childCategories.map((childCategory, index) => (
            <CategoryNode
              key={childCategory.name}
              category={childCategory}
              selectedCategory={selectedCategory}
              onCategorySelect={onCategorySelect}
              level={level + 1}
              allCategories={allCategories}
              isLast={index === childCategories.length - 1}
              parentLines={currentLines}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryTreeDesign({
  categories,
  selectedCategory,
  onCategorySelect,
  allPostsCount,
}: CategoryTreeDesignProps) {
  const rootCategories = categories.filter(cat => cat.level === 0)
    .sort((a, b) => a.name.localeCompare(b.name));
  
  return (
    <div className="space-y-1">
      {/* 전체 카테고리 */}
      <div
        className={`flex items-center cursor-pointer rounded-md transition-colors duration-200 py-1.5 px-2 ${
          selectedCategory === "전체"
            ? "bg-blue-50 text-blue-700 font-medium"
            : "hover:bg-neutral-50 text-neutral-700"
        }`}
        onClick={() => onCategorySelect("전체")}
      >
        <div className="w-5 h-5 flex items-center justify-center mr-2">
          <svg
            className="w-4 h-4 text-neutral-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <div className="flex items-center justify-between flex-1">
          <span className="text-sm">전체</span>
          <span className="text-xs text-neutral-400 ml-2">
            {allPostsCount}
          </span>
        </div>
      </div>
      
      {/* 구분선 */}
      <div className="border-t border-neutral-100 my-2"></div>
      
      {/* 계층 구조 카테고리들 */}
      <div>
        {rootCategories.length > 0 ? (
          rootCategories.map((category, index) => (
            <CategoryNode
              key={category.name}
              category={category}
              selectedCategory={selectedCategory}
              onCategorySelect={onCategorySelect}
              level={0}
              allCategories={categories}
              isLast={index === rootCategories.length - 1}
            />
          ))
        ) : (
          <div className="text-neutral-500 text-sm px-2 py-1">
            카테고리가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}