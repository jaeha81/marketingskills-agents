import { skills, getSkillById } from "@/lib/skills-data";
import PromptBuilder from "@/components/PromptBuilder";
import SourceAttribution from "@/components/SourceAttribution";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return skills.map((s) => ({ id: s.id }));
}

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = getSkillById(id);
  if (!skill) notFound();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Link href="/skills" className="text-sm text-sky-600 hover:underline">
          ← 스킬 목록
        </Link>
      </div>

      <div className="card p-6">
        <div className="mb-1">
          <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-medium">
            {skill.categoryKo}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">{skill.nameKo}</h1>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
          {skill.simpleDescription}
        </p>
        <p className="text-gray-700 mt-3 text-sm leading-relaxed">
          {skill.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div className="bg-sky-50 rounded-lg p-3">
            <div className="text-xs font-semibold text-sky-700 mb-1">
              Claude Code 활용
            </div>
            <p className="text-sm text-sky-900">{skill.claudeUsage}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="text-xs font-semibold text-purple-700 mb-1">
              Codex 활용
            </div>
            <p className="text-sm text-purple-900">{skill.codexUsage}</p>
          </div>
        </div>

        {skill.relatedSkills.length > 0 && (
          <div className="mt-4">
            <div className="text-xs font-medium text-gray-500 mb-1.5">연관 스킬</div>
            <div className="flex flex-wrap gap-2">
              {skill.relatedSkills.map((r) => {
                const related = getSkillById(r);
                return (
                  <Link
                    key={r}
                    href={`/skills/${encodeURIComponent(r)}`}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded transition-colors"
                  >
                    {related?.nameKo ?? r}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <SourceAttribution />
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">프롬프트 생성</h2>
        <PromptBuilder skill={skill} />
      </div>
    </div>
  );
}
