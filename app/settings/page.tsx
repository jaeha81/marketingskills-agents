"use client";

import { useState, useEffect, useRef } from "react";
import { getSettings, saveSettings, type Settings } from "@/lib/storage";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    defaultAgentMode: "claude",
    defaultProjectName: "",
    defaultTargetAudience: "",
  });
  const [saved, setSaved] = useState(false);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSettings(getSettings());
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

  const handleSave = () => {
    saveSettings(settings);
    setSaved(true);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">설정</h1>
        <p className="text-gray-500 text-sm mt-1">
          기본값을 설정하면 프롬프트 생성 시 자동으로 채워집니다.
        </p>
      </div>

      <div className="card p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            기본 에이전트 모드
          </label>
          <div className="flex gap-3">
            {(["claude", "codex"] as const).map((mode) => (
              <label key={mode} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value={mode}
                  checked={settings.defaultAgentMode === mode}
                  onChange={() =>
                    setSettings((prev) => ({ ...prev, defaultAgentMode: mode }))
                  }
                  className="accent-sky-600"
                />
                <span className="text-sm text-gray-700">
                  {mode === "claude" ? "Claude Code" : "Codex"}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            기본 프로젝트명
          </label>
          <input
            type="text"
            value={settings.defaultProjectName}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, defaultProjectName: e.target.value }))
            }
            placeholder="예: 내 쇼핑몰"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            기본 타겟 고객
          </label>
          <input
            type="text"
            value={settings.defaultTargetAudience}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                defaultTargetAudience: e.target.value,
              }))
            }
            placeholder="예: 20-30대 직장인"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        <button onClick={handleSave} className="btn-primary w-full">
          {saved ? "저장됨 ✓" : "저장"}
        </button>
      </div>

      <div className="card p-6">
        <h2 className="font-semibold text-gray-800 mb-3">정보</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">버전</dt>
            <dd className="text-gray-700">0.1.0</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">스킬 수</dt>
            <dd className="text-gray-700">38개</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">데이터 저장</dt>
            <dd className="text-gray-700">로컬 (localStorage)</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">출처</dt>
            <dd>
              <a
                href="https://github.com/coreyhaines31/marketingskills"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 underline"
              >
                coreyhaines31/marketingskills
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
