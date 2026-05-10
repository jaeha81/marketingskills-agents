"use client";

export interface HistoryEntry {
  id: string;
  skillId: string;
  skillNameKo: string;
  agentMode: "claude" | "codex";
  projectName: string;
  prompt: string;
  createdAt: string;
}

const HISTORY_KEY = "ms-agent-history";
const MAX_HISTORY = 50;

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as HistoryEntry[];
  } catch {
    return [];
  }
}

export function addHistory(entry: Omit<HistoryEntry, "id" | "createdAt">): HistoryEntry | null {
  if (typeof window === "undefined") return null;
  const newEntry: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const history = [newEntry, ...getHistory()].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return newEntry;
}

export function deleteHistory(id: string): void {
  if (typeof window === "undefined") return;
  const history = getHistory().filter((h) => h.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

export interface Settings {
  defaultAgentMode: "claude" | "codex";
  defaultProjectName: string;
  defaultTargetAudience: string;
}

const SETTINGS_KEY = "ms-agent-settings";
const defaultSettings: Settings = {
  defaultAgentMode: "claude",
  defaultProjectName: "",
  defaultTargetAudience: "",
};

export function getSettings(): Settings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaultSettings;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return defaultSettings;
    return { ...defaultSettings, ...(parsed as Partial<Settings>) };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: Partial<Settings>): void {
  if (typeof window === "undefined") return;
  const current = getSettings();
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...current, ...settings }));
}
