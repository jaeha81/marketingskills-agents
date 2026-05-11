import { skills } from "@/lib/skills-data";
import Link from "next/link";

export default function TestPage() {
  const withInstructions = skills.filter(
    (s) => s.claudeInstructions && s.codexInstructions
  );
  const missing = skills.filter(
    (s) => !s.claudeInstructions || !s.codexInstructions
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-6">
      <div className="card p-5">
        <h1 className="text-xl font-bold text-gray-900">Instructions 필드 검증</h1>
        <p className="text-sm text-gray-500 mt-1">
          38개 스킬의 claudeInstructions / codexInstructions 적용 현황
        </p>
        <div className="flex gap-4 mt-3 text-sm">
          <span className="text-green-700 font-semibold">
            ✅ 완료: {withInstructions.length}개
          </span>
          {missing.length > 0 ? (
            <span className="text-red-600 font-semibold">
              ❌ 누락: {missing.length}개
            </span>
          ) : (
            <span className="text-green-700 font-semibold">누락 없음</span>
          )}
        </div>
      </div>

      {missing.length > 0 && (
        <div className="card p-5 border-red-200 bg-red-50">
          <h2 className="text-sm font-semibold text-red-700 mb-2">누락 스킬</h2>
          <ul className="text-sm text-red-600 space-y-1">
            {missing.map((s) => (
              <li key={s.id}>
                {s.id} —{" "}
                {!s.claudeInstructions && "claudeInstructions 없음"}
                {!s.codexInstructions && " codexInstructions 없음"}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        {skills.map((skill) => {
          const ok = !!skill.claudeInstructions && !!skill.codexInstructions;
          const claudeSteps = skill.claudeInstructions?.split("\n") ?? [];
          const codexItems = skill.codexInstructions?.split("\n") ?? [];

          return (
            <details key={skill.id} className="card">
              <summary className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className={`text-lg ${ok ? "text-green-500" : "text-red-500"}`}>
                    {ok ? "✅" : "❌"}
                  </span>
                  <div>
                    <span className="font-medium text-gray-900">{skill.nameKo}</span>
                    <span className="ml-2 text-xs text-gray-400">{skill.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                    Claude {claudeSteps.length}단계
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                    Codex {codexItems.length}항목
                  </span>
                  <Link
                    href={`/skills/${skill.id}`}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full transition-colors"
                  >
                    스킬 페이지 →
                  </Link>
                </div>
              </summary>

              <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                <div>
                  <div className="text-xs font-semibold text-sky-700 mb-2">
                    claudeInstructions ({claudeSteps.length}단계)
                  </div>
                  {claudeSteps.length > 0 ? (
                    <ol className="space-y-1">
                      {claudeSteps.map((step, i) => (
                        <li key={i} className="text-xs text-gray-700 leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-xs text-red-500">없음 (claudeUsage 폴백 사용)</p>
                  )}
                </div>
                <div>
                  <div className="text-xs font-semibold text-purple-700 mb-2">
                    codexInstructions ({codexItems.length}항목)
                  </div>
                  {codexItems.length > 0 ? (
                    <ul className="space-y-1">
                      {codexItems.map((item, i) => (
                        <li key={i} className="text-xs text-gray-700 leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-red-500">없음 (codexUsage 폴백 사용)</p>
                  )}
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
