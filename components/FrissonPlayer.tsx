"use client";

import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import { ExternalLink, Pause, Play, X } from "lucide-react";

type Song = {
  nickname: string;
  youtubeUrl: string;
  comment: string;
  thumbnailUrl: string;
  title?: string;
  votes?: number;
  voters?: string[];
};

type FrissonPlayerProps = {
  song: Song | null;
  onClose: () => void;
  onNext: () => void;
  hasNextSong: boolean;
};

function getYouTubeVideoId(url: string) {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.slice(1);
    }

    if (parsedUrl.hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v") || "";
    }

    return "";
  } catch {
    return "";
  }
}

export default function FrissonPlayer({
  song,
  onClose,
  onNext,
  hasNextSong,
}: FrissonPlayerProps) {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const prevVideoIdRef = useRef("");

  if (!song) return null;

  const videoId = getYouTubeVideoId(song.youtubeUrl);

  useEffect(() => {
    if (!videoId) return;
    if (!playerRef.current) return;

    const isNewSong = prevVideoIdRef.current !== videoId;
    if (!isNewSong) return;

    prevVideoIdRef.current = videoId;
    playerRef.current.loadVideoById(videoId);
    setIsPlaying(true);
  }, [videoId]);

  useEffect(() => {
    return () => {
      if (playerRef.current?.stopVideo) {
        playerRef.current.stopVideo();
      }
    };
  }, []);

  function handleReady(event: YouTubeEvent) {
    playerRef.current = event.target;
    prevVideoIdRef.current = videoId;
    setIsPlaying(true);
  }

  function handleEnd() {
    setIsPlaying(false);

    if (hasNextSong) {
      onNext();
      return;
    }

    if (playerRef.current?.stopVideo) {
      playerRef.current.stopVideo();
    }
  }

  function handlePlayPause() {
    if (!playerRef.current) return;

    const state = playerRef.current.getPlayerState?.();

    if (state === 1) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  }

  function handleClose() {
    if (playerRef.current?.stopVideo) {
      playerRef.current.stopVideo();
    }
    setIsPlaying(false);
    onClose();
  }

  return (
    <section className="relative overflow-hidden rounded-[24px] border border-white/30 bg-white/45 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl">
      <div className="absolute inset-0 bg-white/20 pointer-events-none" />

      <div className="relative z-10 flex items-center gap-3 p-3">
        {song.thumbnailUrl ? (
          <div className="h-14 w-14 overflow-hidden rounded-2xl">
            <img
              src={song.thumbnailUrl}
              alt="현재 재생 중인 곡 썸네일"
              className="h-full w-full scale-130 object-cover object-center"
            />
          </div>
        ) : (
          <div className="h-14 w-14 rounded-2xl bg-neutral-200/70" />
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-neutral-900">
            {song.title || "YouTube Video"}
          </p>
          <p className="truncate text-xs text-neutral-600">@{song.nickname}</p>
        </div>

        <button
          onClick={handlePlayPause}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-900 text-white transition hover:bg-neutral-800"
          aria-label={isPlaying ? "일시정지" : "재생"}
        >
          {isPlaying ? (
            <Pause size={16} fill="currentColor" />
          ) : (
            <Play size={16} fill="currentColor" />
          )}
        </button>

        <a
          href={song.youtubeUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-white/50 text-neutral-700 transition hover:bg-white/70"
          aria-label="유튜브 열기"
        >
          <ExternalLink size={16} />
        </a>

        <button
          onClick={handleClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-white/50 text-neutral-700 transition hover:bg-white/70"
          aria-label="플레이어 닫기"
        >
          <X size={18} />
        </button>
      </div>

      <div
        className="absolute h-px w-px overflow-hidden"
        style={{ clipPath: "inset(50%)" }}
      >
        <YouTube
          videoId={videoId}
          onReady={handleReady}
          onEnd={handleEnd}
          opts={{
            height: "0",
            width: "0",
            playerVars: {
              autoplay: 1,
              rel: 0,
              playsinline: 1,
            },
          }}
        />
      </div>
    </section>
  );
}