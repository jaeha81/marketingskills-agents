import { skills, categories } from "@/lib/skills-data";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-500 text-sm mt-1">
          카테고리별 스킬 현황을 한눈에 확인하세요.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "전체 스킬", value: skills.length, color: "text-sky-600" },
          { label: "카테고리", value: categories.length, color: "text-green-600" },
          { label: "Claude 모드", value: "생성·작성", color: "text-blue-600" },
          { label: "Codex 모드", value: "검증·검토", color: "text-purple-600" },
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat.id);
          return (
            <div key={cat.id} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-800">{cat.label}</h2>
                <span className="text-xs text-gray-400">{catSkills.length}개</span>
              </div>
              <div className="space-y-2">
                {catSkills.map((skill) => (
                  <Link
                    key={skill.id}
                    href={`/skills/${skill.id}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-sm text-gray-700 group-hover:text-sky-600">
                      {skill.nameKo}
                    </span>
                    <span className="text-xs text-gray-300 group-hover:text-sky-400">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
