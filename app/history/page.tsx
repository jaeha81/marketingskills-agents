"use client";

import { useState } from "react";
import HistoryPanel from "@/components/HistoryPanel";
import { clearHistory } from "@/lib/storage";

export default function HistoryPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleClear = () => {
    if (confirm("모든 사용 기록을 삭제하시겠습니까?")) {
      clearHistory();
      setRefreshKey((k) => k + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">사용 기록</h1>
          <p className="text-gray-500 text-sm mt-1">
            생성한 프롬프트 기록이 로컬에 저장됩니다. (최대 50개)
          </p>
        </div>
        <button
          onClick={handleClear}
          className="text-sm text-red-400 hover:text-red-600 transition-colors"
        >
          전체 삭제
        </button>
      </div>

      <HistoryPanel key={refreshKey} />
    </div>
  );
}
