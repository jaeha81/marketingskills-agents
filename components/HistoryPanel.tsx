"use client";

import { useState, useEffect } from "react";
import { getHistory, deleteHistory, type HistoryEntry } from "@/lib/storage";
import CopyButton from "./CopyButton";

export default function HistoryPanel() {
  const [history, setHistory] = useState<HistoryEntry[] | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (id: string) => {
    deleteHistory(id);
    setHistory(getHistory());
  };

  if (history === null) {
    return (
      <div className="card p-8 text-center text-gray-400 text-sm">
        로딩 중...
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="card p-8 text-center text-gray-400 text-sm">
        아직 생성된 프롬프트가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {history.map((entry) => (
        <div key={entry.id} className="card p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-gray-900">
                  {entry.skillNameKo}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    entry.agentMode === "claude"
                      ? "bg-sky-100 text-sky-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {entry.agentMode === "claude" ? "Claude Code" : "Codex"}
                </span>
              </div>
              {entry.projectName && (
                <p className="text-xs text-gray-500 mt-0.5">{entry.projectName}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                {new Date(entry.createdAt).toLocaleString("ko-KR")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                className="btn-secondary text-xs px-2 py-1"
              >
                {expanded === entry.id ? "닫기" : "보기"}
              </button>
              <button
                onClick={() => handleDelete(entry.id)}
                className="text-xs text-red-400 hover:text-red-600 transition-colors px-2 py-1"
              >
                삭제
              </button>
            </div>
          </div>
          {expanded === entry.id && (
            <div className="mt-3">
              <pre className="bg-gray-50 rounded-lg p-3 text-xs text-gray-700 whitespace-pre-wrap overflow-auto max-h-64 font-mono">
                {entry.prompt}
              </pre>
              <div className="mt-2 flex justify-end">
                <CopyButton text={entry.prompt} className="text-xs px-3 py-1.5" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
