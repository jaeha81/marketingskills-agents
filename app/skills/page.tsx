"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { skills, getSkillsByCategory, searchSkills } from "@/lib/skills-data";
import SkillCard from "@/components/SkillCard";
import SkillCategoryTabs from "@/components/SkillCategoryTabs";
import { Suspense } from "react";

function SkillsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") ?? "all";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    if (searchQuery.trim()) return searchSkills(searchQuery);
    return getSkillsByCategory(selectedCategory);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">스킬 목록</h1>
        <p className="text-gray-500 text-sm mt-1">
          총 {skills.length}개의 마케팅 스킬 · 스킬을 선택하면 프롬프트를 생성할 수
          있습니다.
        </p>
      </div>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="스킬 검색... (예: SEO, 이메일, 전환율)"
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
      />

      {!searchQuery && (
        <SkillCategoryTabs
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}

export default function SkillsPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-gray-400">로딩 중...</div>}>
      <SkillsContent />
    </Suspense>
  );
}
