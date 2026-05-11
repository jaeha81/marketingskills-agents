"use client";

import { categories } from "@/lib/skills-data";

interface Props {
  selected: string;
  onChange: (category: string) => void;
}

const allCategories = [{ id: "all", label: "전체" }, ...categories];

export default function SkillCategoryTabs({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
      {allCategories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected === cat.id
              ? "bg-sky-600 text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:border-sky-300 hover:text-sky-600"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
