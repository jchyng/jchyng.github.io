"use client";

import { CategoryHierarchy } from "@/types/post";

interface MobileCategoryDropdownDesignProps {
  categories: CategoryHierarchy[];
  selectedCategory: string;
  onCategorySelect: (categoryPath: string) => void;
  allPostsCount: number;
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileCategoryDropdownDesign({
  categories,
  selectedCategory,
  onCategorySelect,
  allPostsCount,
  isOpen,
  onToggle,
}: MobileCategoryDropdownDesignProps) {
  // 모든 카테고리를 평면적 배열로 변환 (계층 구조 표시용)
  const flattenCategories = (cats: CategoryHierarchy[], level = 0): Array<CategoryHierarchy & { level: number }> => {
    const result: Array<CategoryHierarchy & { level: number }> = [];
    
    // 현재 레벨의 카테고리들을 먼저 추가
    const currentLevelCats = cats
      .filter(cat => cat.level === level)
      .sort((a, b) => a.name.localeCompare(b.name));
    
    currentLevelCats.forEach(cat => {
      result.push({ ...cat, level });
      
      // 자식 카테고리들을 재귀적으로 추가
      const childCats = cats.filter(c => c.parent === cat.name);
      if (childCats.length > 0) {
        result.push(...flattenCategories(childCats, level + 1));
      }
    });
    
    return result;
  };

  const flatCategories = flattenCategories(categories);
  
  // 선택된 카테고리의 표시 이름 구하기
  const getSelectedDisplayName = () => {
    if (selectedCategory === "전체") return "전체";
    
    const selected = categories.find(cat => cat.name === selectedCategory);
    if (selected) {
      // 계층 구조 경로를 표시 (예: AI > claude)
      const parts = selected.name.split('/');
      return parts.join(' > ');
    }
    return selectedCategory;
  };

  const handleCategoryClick = (categoryPath: string) => {
    onCategorySelect(categoryPath);
    onToggle(); // 드롭다운 닫기
  };

  return (
    <div className="lg:hidden mb-6 relative">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-all duration-200 shadow-sm"
      >
        <div className="flex items-center space-x-3">
          <svg
            className="w-5 h-5 text-neutral-500"
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
          <span className="text-neutral-700 font-medium">{getSelectedDisplayName()}</span>
        </div>
        <svg
          className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg z-20 max-h-72 overflow-y-auto">
          {/* 전체 카테고리 */}
          <button
            onClick={() => handleCategoryClick("전체")}
            className={`flex items-center justify-between w-full px-4 py-3 text-left hover:bg-neutral-50 transition-colors duration-200 border-b border-neutral-100 ${
              selectedCategory === "전체"
                ? "text-blue-600 bg-blue-50 font-medium"
                : "text-neutral-700"
            }`}
          >
            <div className="flex items-center space-x-3">
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
              <span>전체</span>
            </div>
            <span className="text-sm text-neutral-400">
              {allPostsCount}
            </span>
          </button>
          
          {/* 계층 구조 카테고리들 */}
          {flatCategories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`flex items-center justify-between w-full py-3 text-left hover:bg-neutral-50 transition-colors duration-200 ${
                selectedCategory === category.name
                  ? "text-blue-600 bg-blue-50 font-medium"
                  : "text-neutral-700"
              } ${index === flatCategories.length - 1 ? "rounded-b-lg" : ""}`}
              style={{ paddingLeft: `${16 + category.level * 20}px`, paddingRight: '16px' }}
            >
              <div className="flex items-center space-x-2">
                {/* 들여쓰기 표시 */}
                {category.level > 0 && (
                  <div className="flex items-center">
                    {Array.from({ length: category.level }, (_, i) => (
                      <div key={i} className="w-4 h-4 flex justify-center">
                        <div className="w-px bg-neutral-200 h-full"></div>
                      </div>
                    ))}
                    <div className="w-3 h-px bg-neutral-200 mr-1"></div>
                  </div>
                )}
                
                {/* 폴더/파일 아이콘 */}
                <div className="flex-shrink-0">
                  {category.children.length > 0 ? (
                    <svg
                      className="w-4 h-4 text-blue-500"
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
                  )}\n                </div>
                
                <span className="text-sm">{category.displayName}</span>
              </div>
              
              <span className="text-sm text-neutral-400 flex-shrink-0">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}