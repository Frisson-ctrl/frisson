"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Music4, AtSign, Plus, ListMusic } from "lucide-react";
import { isSubmissionOpen } from "@/config";

export default function Home() {
  const [nickname, setNickname] = useState("");
  const [savedNickname, setSavedNickname] = useState("");

  useEffect(() => {
    const storedNickname = sessionStorage.getItem("nickname");
    if (storedNickname) {
      setSavedNickname(storedNickname);
    }
  }, []);

  function saveNickname() {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    sessionStorage.setItem("nickname", nickname);
    setSavedNickname(nickname);
  }

  function logout() {
    sessionStorage.removeItem("nickname");
    setSavedNickname("");
    setNickname("");
  }

  if (!savedNickname) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#f5f3ff,_#f8fafc_45%,_#e2e8f0)] flex items-center justify-center px-5">
        <div className="w-full max-w-md rounded-[28px] border border-white/50 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] p-8 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            
            <div>
              <h1 className="m-0 text-4xl font-semibold tracking-tight text-neutral-900">
                Frisson
              </h1>
              <p className="m-0 text-sm text-neutral-500">
                당신의 전율을 공유하는 플레이리스트
              </p>
            </div>
          </div>

          <p className="m-0 text-sm leading-6 text-neutral-600">
            한 사람당 한 곡. 지금 떠오르는 가장 강한 한 곡을 남겨주세요.
          </p>

          <input
            placeholder="닉네임 입력(한글)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="h-13 rounded-2xl border border-neutral-200 bg-white/80 px-4 text-[15px] outline-none transition focus:border-neutral-400"
          />

          <button
            onClick={saveNickname}
            className="h-13 rounded-2xl bg-neutral-900 text-white text-[15px] font-medium transition hover:scale-[1.01] hover:bg-neutral-800 active:scale-[0.99]"
          >
            시작하기
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#ede9fe,_#f8fafc_35%,_#e2e8f0)] px-5 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-4xl items-center justify-center">
        <div className="w-full rounded-[32px] border border-white/50 bg-white/65 backdrop-blur-xl shadow-[0_20px_80px_rgba(15,23,42,0.14)] p-8 md:p-12">
          <div className="flex flex-col gap-8">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-neutral-400">
                  <Music4 size={16} />
                  Frisson Season 1
                </div>

                <h1 className="m-0 mb-6 text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900">
                  Frisson
                </h1>

                <p className="m-0 text-base text-neutral-500">
                  안녕하세요, <span className="font-bold text-neutral-800">@{savedNickname}</span>
                </p>

                <p className="max-w-xl text-sm md:text-base leading-7 text-neutral-600">
                  한 사람당 한 곡. 전율이 오는 노래를 남기고, 다른 사람들의 곡도 둘러보세요.
                </p>
              </div>

              <button
                onClick={logout}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white/80 text-neutral-700 transition hover:bg-white"
                aria-label="닉네임 변경"
                title="닉네임 변경"
              >
                <AtSign size={18} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {isSubmissionOpen && (
                <Link
                  href="/submit"
                  className="group rounded-[28px] border border-neutral-200 bg-white/80 p-5 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white">
                    <Plus size={20} />
                  </div>
                  <h2 className="m-0 text-lg font-semibold text-neutral-900">곡 제출하기</h2>
                  <p className="mt-2 mb-0 text-sm leading-6 text-neutral-500">
                    이번 시즌에 당신의 곡을 남겨보세요.
                  </p>
                </Link>
              )}

              <Link
                href="/songs"
                className="group rounded-[28px] border border-neutral-200 bg-white/80 p-5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white">
                  <ListMusic size={20} />
                </div>
                <h2 className="m-0 text-lg font-semibold text-neutral-900">
                  {isSubmissionOpen ? "곡 목록 보기" : "시즌1 랭킹 보기"}
                </h2>
                <p className="mt-2 mb-0 text-sm leading-6 text-neutral-500">
                  다른 사람들이 남긴 곡과 현재 시즌의 분위기를 확인하세요.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
