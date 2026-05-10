export default function SourceAttribution() {
  return (
    <div className="text-xs text-gray-400 border-t border-gray-100 pt-3 mt-3">
      스킬 데이터 출처:{" "}
      <a
        href="https://github.com/coreyhaines31/marketingskills"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-gray-600"
      >
        coreyhaines31/marketingskills
      </a>{" "}
      (MIT License) · 한국어 설명 및 에이전트 프롬프트는 로컬 생성
    </div>
  );
}
