import type { Skill } from "./skills-data";

export type AgentMode = "claude" | "codex";

export interface PromptContext {
  skill: Skill;
  projectName: string;
  projectDesc: string;
  targetAudience: string;
  additionalContext: string;
  agentMode: AgentMode;
}

export function generatePrompt(ctx: PromptContext): string {
  if (ctx.agentMode === "claude") {
    return generateClaudePrompt(ctx);
  }
  return generateCodexPrompt(ctx);
}

function generateClaudePrompt(ctx: PromptContext): string {
  const { skill, projectName, projectDesc, targetAudience, additionalContext } = ctx;

  return `# ${skill.nameKo} 실행 프롬프트 (Claude Code)

## 역할
당신은 ${skill.nameKo} 전문 마케터입니다.
${skill.description}

## 프로젝트 정보
- 프로젝트명: ${projectName || "(미입력)"}
- 프로젝트 설명: ${projectDesc || "(미입력)"}
- 타겟 고객: ${targetAudience || "(미입력)"}
${additionalContext ? `- 추가 컨텍스트: ${additionalContext}` : ""}

## 실행 지시
${skill.claudeUsage}

위 정보를 바탕으로 ${skill.nameKo} 관점에서 구체적이고 실행 가능한 결과물을 작성하라.
결과물은 한국어로 작성하며, 바로 사용할 수 있는 형태로 제공하라.

## 출력 형식
- 제목과 섹션으로 구조화
- 각 항목은 구체적이고 실행 가능하게
- 필요시 예시 문구 포함
`.trim();
}

function generateCodexPrompt(ctx: PromptContext): string {
  const { skill, projectName, projectDesc, targetAudience, additionalContext } = ctx;

  return `# ${skill.nameKo} 검증 프롬프트 (Codex)

## 검증 역할
당신은 ${skill.nameKo} 전문 검토자입니다.
${skill.description}

## 프로젝트 정보
- 프로젝트명: ${projectName || "(미입력)"}
- 프로젝트 설명: ${projectDesc || "(미입력)"}
- 타겟 고객: ${targetAudience || "(미입력)"}
${additionalContext ? `- 추가 컨텍스트: ${additionalContext}` : ""}

## 검증 지시
${skill.codexUsage}

## 검증 체크리스트
아래 항목을 기준으로 제공된 마케팅 결과물을 검토하고 피드백을 제공하라:

1. **완전성**: 누락된 핵심 요소가 있는가?
2. **정확성**: 잘못된 정보나 오류가 있는가?
3. **실행 가능성**: 실제로 적용 가능한 수준인가?
4. **타겟 적합성**: 타겟 고객에게 맞는 내용인가?
5. **개선 제안**: 더 나은 방향은 무엇인가?

## 출력 형식
- 각 체크리스트 항목별 평가 (✅ 통과 / ⚠️ 개선 필요 / ❌ 문제)
- 구체적인 수정 제안
- 종합 점수 (10점 만점)
`.trim();
}
