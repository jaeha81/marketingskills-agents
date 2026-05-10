import Link from "next/link";
import { skills, categories } from "@/lib/skills-data";
import SkillCard from "@/components/SkillCard";
import SourceAttribution from "@/components/SourceAttribution";

export default function HomePage() {
  const featuredSkills = skills.slice(0, 6);

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="text-center py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          마케팅스킬 에이전트
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          38가지 마케팅 스킬을 선택하고, Claude Code 또는 Codex에 바로 붙여넣을 수
          있는 실행 프롬프트를 생성하세요.
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link href="/skills" className="btn-primary">
            스킬 탐색하기
          </Link>
          <Link href="/dashboard" className="btn-secondary">
            대시보드 보기
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "전체 스킬", value: skills.length },
          { label: "카테고리", value: categories.length },
          { label: "에이전트 모드", value: 2 },
          { label: "무료 · 로컬", value: "✓" },
        ].map((stat) => (
          <div key={stat.label} className="card p-4 text-center">
            <div className="text-2xl font-bold text-sky-600">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">카테고리별 스킬</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {categories.map((cat) => {
            const count = skills.filter((s) => s.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/skills?category=${cat.id}`}
                className="card p-3 text-center hover:shadow-md transition-shadow"
              >
                <div className="font-semibold text-sm text-gray-800">{cat.label}</div>
                <div className="text-xs text-gray-400 mt-1">{count}개 스킬</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Skills */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">추천 스킬</h2>
          <Link href="/skills" className="text-sm text-sky-600 hover:underline">
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      <SourceAttribution />
    </div>
  );
}
