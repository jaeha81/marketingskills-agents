import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "마케팅스킬 에이전트",
  description:
    "마케팅 스킬을 선택하고 Claude/Codex용 실행 프롬프트를 생성하는 로컬 대시보드",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <NavBar />
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
        <footer className="mt-16 border-t border-gray-200 py-6 text-center text-sm text-gray-400">
          This dashboard uses and localizes concepts from{" "}
          <a
            href="https://github.com/coreyhaines31/marketingskills"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            coreyhaines31/marketingskills
          </a>{" "}
          under the MIT License.
        </footer>
      </body>
    </html>
  );
}
