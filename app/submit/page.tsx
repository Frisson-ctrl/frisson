"use client";

import Link from "next/link";
import { ArrowLeft, Music4 } from "lucide-react";

export default function SubmitPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#ede9fe,_#f8fafc_35%,_#e2e8f0)] px-5 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-2xl items-center justify-center">
        <div className="w-full rounded-[32px] border border-white/50 bg-white/65 p-8 text-center shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl md:p-10">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900 text-white">
            <Music4 size={24} />
          </div>

          <h1 className="m-0 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            시즌1 제출이 마감되었습니다
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-neutral-600 md:text-base">
            시즌1은 종료되어 새로운 곡을 등록하거나 수정할 수 없습니다.
            <br />
            곡 목록에서 아카이브된 frisson 곡들을 감상해보세요.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-5 py-3 text-sm text-neutral-700 transition hover:bg-white"
            >
              <ArrowLeft size={16} />
              홈으로
            </Link>

            <Link
              href="/songs"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-3 text-sm text-white transition hover:bg-neutral-800"
            >
              <Music4 size={16} />
              곡 목록 보기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
