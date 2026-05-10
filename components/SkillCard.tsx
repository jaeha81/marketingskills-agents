import type { Skill } from "@/lib/skills-data";
import Link from "next/link";

interface Props {
  skill: Skill;
  compact?: boolean;
}

export default function SkillCard({ skill, compact = false }: Props) {
  return (
    <div className="card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-medium">
              {skill.categoryKo}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm">{skill.nameKo}</h3>
          {!compact && (
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              {skill.simpleDescription}
            </p>
          )}
        </div>
        <Link
          href={`/skills/${skill.id}`}
          className="btn-primary text-xs px-3 py-1.5 shrink-0"
        >
          선택
        </Link>
      </div>
      {!compact && skill.relatedSkills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {skill.relatedSkills.slice(0, 3).map((r) => (
            <span
              key={r}
              className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded"
            >
              {r}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
