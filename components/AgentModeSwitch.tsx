"use client";

import type { AgentMode } from "@/lib/prompt-templates";

interface Props {
  value: AgentMode;
  onChange: (mode: AgentMode) => void;
}

const modes: { id: AgentMode; label: string; desc: string }[] = [
  {
    id: "claude",
    label: "Claude Code",
    desc: "생성 · 작성 · 기획",
  },
  {
    id: "codex",
    label: "Codex",
    desc: "검증 · 검토 · 피드백",
  },
];

export default function AgentModeSwitch({ value, onChange }: Props) {
  return (
    <div className="flex gap-3">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onChange(mode.id)}
          className={`flex-1 rounded-lg border-2 px-4 py-3 text-left transition-colors ${
            value === mode.id
              ? "border-sky-500 bg-sky-50"
              : "border-gray-200 bg-white hover:border-gray-300"
          }`}
        >
          <div
            className={`font-semibold text-sm ${
              value === mode.id ? "text-sky-700" : "text-gray-700"
            }`}
          >
            {mode.label}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">{mode.desc}</div>
        </button>
      ))}
    </div>
  );
}
