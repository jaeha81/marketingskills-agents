"use client";

import { useState, useEffect, useRef } from "react";
import type { Skill } from "@/lib/skills-data";
import { generatePrompt, type AgentMode } from "@/lib/prompt-templates";
import { addHistory, getSettings } from "@/lib/storage";
import AgentModeSwitch from "./AgentModeSwitch";
import CopyButton from "./CopyButton";

interface Props {
  skill: Skill;
}

export default function PromptBuilder({ skill }: Props) {
  const [agentMode, setAgentMode] = useState<AgentMode>("claude");
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const s = getSettings();
    setAgentMode(s.defaultAgentMode);
    if (s.defaultProjectName) setProjectName(s.defaultProjectName);
    if (s.defaultTargetAudience) setTargetAudience(s.defaultTargetAudience);
  }, []);

  const generate = () => {
    const prompt = generatePrompt({
      skill,
      agentMode,
      projectName,
      projectDesc,
      targetAudience,
      additionalContext,
    });
    setGeneratedPrompt(prompt);
    addHistory({
      skillId: skill.id,
      skillNameKo: skill.nameKo,
      agentMode,
      projectName,
      prompt,
    });
    setSaved(true);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setSaved(false), 3000);
  };

  const runWithAI = async () => {
    if (!generatedPrompt) return;
    setAiLoading(true);
    setAiResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: generatedPrompt }),
      });
      if (!res.ok) throw new Error("API 오류");
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setAiResult((prev) => prev + decoder.decode(value));
      }
    } catch {
      setAiResult("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          에이전트 모드
        </label>
        <AgentModeSwitch value={agentMode} onChange={setAgentMode} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            프로젝트명
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="예: 온라인 쇼핑몰 A"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            타겟 고객
          </label>
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="예: 20-30대 여성, 패션 관심자"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          프로젝트 설명
        </label>
        <textarea
          value={projectDesc}
          onChange={(e) => setProjectDesc(e.target.value)}
          placeholder="제품/서비스/프로젝트에 대한 간략한 설명"
          rows={2}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          추가 컨텍스트 (선택)
        </label>
        <textarea
          value={additionalContext}
          onChange={(e) => setAdditionalContext(e.target.value)}
          placeholder="경쟁사, 현재 문제점, 예산 등 추가 정보"
          rows={2}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button onClick={generate} className="btn-primary flex-1 py-3">
          프롬프트 생성하기
        </button>
        <button
          onClick={runWithAI}
          disabled={!generatedPrompt || aiLoading}
          className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          {aiLoading ? "AI 분석 중…" : "✨ AI로 바로 실행"}
        </button>
      </div>

      {generatedPrompt && (
        <div className="mt-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800 text-sm">생성된 프롬프트</h3>
              <div className="flex items-center gap-2">
                {saved && (
                  <span className="text-xs text-green-600 font-medium">✓ 기록 저장됨</span>
                )}
                <CopyButton text={generatedPrompt} />
              </div>
            </div>
            <pre className="bg-gray-50 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-700 whitespace-pre-wrap overflow-auto max-h-[300px] sm:max-h-[500px] font-mono border border-gray-200">
              {generatedPrompt}
            </pre>
          </div>

          {(aiResult || aiLoading) && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-violet-700">✨ AI 분석 결과</span>
                {aiLoading && (
                  <span className="text-xs text-gray-400 animate-pulse">생성 중…</span>
                )}
                {aiResult && !aiLoading && <CopyButton text={aiResult} />}
              </div>
              <div className="bg-violet-50 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-800 whitespace-pre-wrap overflow-auto max-h-[400px] sm:max-h-[600px] border border-violet-200">
                {aiResult || ""}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
