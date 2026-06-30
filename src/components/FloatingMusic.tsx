/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface FloatingMusicProps {
  url: string;
  autoPlayTrigger?: boolean;
}

export default function FloatingMusic({ url, autoPlayTrigger }: FloatingMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
  const hasStartedRef = useRef(false);
  
  // Track if music was playing before tab became hidden
  const wasPlayingBeforeHideRef = useRef(false);

  // Synchronize playing state ref for the visibility change listener
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Initialize and load the audio element
  useEffect(() => {
    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = 0.145; // 14.5% volume as requested by the user
    audioRef.current = audio;

    // Synchronize initial mute state
    audio.muted = isMuted;

    // Try to load any previously saved playback position
    const savedTime = localStorage.getItem("wedding_music_current_time");
    let initialTimeSet = false;
    if (savedTime) {
      try {
        const parsedTime = parseFloat(savedTime);
        if (!isNaN(parsedTime) && parsedTime > 0) {
          audio.currentTime = parsedTime;
          initialTimeSet = true;
        }
      } catch (e) {
        console.warn("Could not restore saved current time immediately:", e);
      }
    }

    // Event listeners to handle play state changes (ensures React state is 100% in sync with media player)
    const onPlay = () => {
      setIsPlaying(true);
      localStorage.setItem("wedding_music_playing_state", "playing");
    };

    const onPause = () => {
      setIsPlaying(false);
      // Only set paused state in storage if it wasn't triggered by document hide/visibility change
      if (!document.hidden) {
        localStorage.setItem("wedding_music_playing_state", "paused");
      }
    };

    const onTimeUpdate = () => {
      if (audio) {
        localStorage.setItem("wedding_music_current_time", String(audio.currentTime));
      }
    };

    const onLoadedMetadata = () => {
      if (savedTime && !initialTimeSet) {
        try {
          const parsedTime = parseFloat(savedTime);
          if (!isNaN(parsedTime) && parsedTime > 0) {
            audio.currentTime = parsedTime;
          }
        } catch (e) {
          console.warn("Could not restore saved current time on loadedmetadata:", e);
        }
      }
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audioRef.current = null;
    };
  }, [url]);

  // Synchronize muted attribute whenever state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Handle autoplay when the envelope trigger turns on
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !hasStartedRef.current) {
      const savedPlayState = localStorage.getItem("wedding_music_playing_state");
      // If the music was manually paused in a previous session, do not force-autoplay on return
      if (savedPlayState === "paused") {
        return;
      }

      audioRef.current.play()
        .then(() => {
          hasStartedRef.current = true;
        })
        .catch((err) => {
          // Autoplay was blocked by browser policies, wait for user gesture fallback
          console.warn("Autoplay block, waiting for user gesture fallback:", err);
        });
    }
  }, [autoPlayTrigger]);

  // Robust User Interaction Fallback (Only runs once to bypass browser autoplay blocks)
  useEffect(() => {
    if (!autoPlayTrigger) return;

    const handleGesture = () => {
      if (hasStartedRef.current || !audioRef.current) return;

      const savedPlayState = localStorage.getItem("wedding_music_playing_state");
      // If the music was manually paused in a previous session, do not force-autoplay on return
      if (savedPlayState === "paused") {
        removeListeners();
        return;
      }

      audioRef.current.play()
        .then(() => {
          hasStartedRef.current = true;
          removeListeners();
        })
        .catch((err) => {
          console.warn("Gesture play failed:", err);
        });
    };

    const removeListeners = () => {
      document.removeEventListener("click", handleGesture);
      document.removeEventListener("touchstart", handleGesture);
    };

    if (!hasStartedRef.current) {
      document.addEventListener("click", handleGesture);
      document.addEventListener("touchstart", handleGesture);
    }

    return () => {
      removeListeners();
    };
  }, [autoPlayTrigger]);

  // Pause when tab/window is hidden, resume ONLY if it was playing previously when coming back
  // Uses document 'visibilitychange' to bypass iframe focus/blur issues on clicks
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;

      if (document.hidden) {
        if (isPlayingRef.current) {
          wasPlayingBeforeHideRef.current = true;
          audioRef.current.pause();
        }
      } else {
        if (wasPlayingBeforeHideRef.current) {
          wasPlayingBeforeHideRef.current = false;
          audioRef.current.play()
            .catch((e) => {
              console.warn("Failed to resume audio on tab focus return:", e);
            });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    if (!audioRef.current) return;

    // Reset our tab-switching restore state since this is an explicit user toggle action
    wasPlayingBeforeHideRef.current = false;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Mark as started since user explicitly pressed play
      hasStartedRef.current = true;
      audioRef.current.play()
        .catch((err) => {
          console.error("Manual play failed, trying to reload and play:", err);
          // Try to recover by reloading and seeking
          if (audioRef.current) {
            audioRef.current.load();
            const savedTime = localStorage.getItem("wedding_music_current_time");
            if (savedTime) {
              try {
                audioRef.current.currentTime = parseFloat(savedTime);
              } catch (seekErr) {
                console.warn("Seek during reload failed:", seekErr);
              }
            }
            audioRef.current.play().catch((err2) => {
              console.error("Reload and play failed:", err2);
            });
          }
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    if (!audioRef.current) return;

    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <>
      {/* Elegant Capsule Pill Floating Player (Bottom-Left) */}
      <div 
        className="fixed bottom-6 left-6 z-50 flex items-center bg-[#FCF8F2] border border-[#C7A86D]/30 shadow-lg px-2.5 py-1.5 rounded-full hover:shadow-xl transition-all duration-300 select-none gap-2.5 max-w-[260px] sm:max-w-[300px]"
        id="floating-music-pill"
      >
        {/* Play/Pause Gold Circular Button - Slightly smaller as requested */}
        <button
          onClick={togglePlay}
          className="w-7 h-7 rounded-full bg-[#C7A86D] hover:bg-[#8c6a33] flex items-center justify-center text-white cursor-pointer shadow-sm transition-all duration-300 transform active:scale-95 shrink-0"
          aria-label={isPlaying ? "Pausar música" : "Tocar música"}
        >
          {isPlaying ? (
            <Pause size={10} fill="white" className="text-white" />
          ) : (
            <Play size={10} fill="white" className="text-white ml-0.5" />
          )}
        </button>

        {/* Text Section (MÚSICA AMBIENTE & Sónia & Wilson — Melodia) */}
        <div className="flex flex-col justify-center min-w-0 pr-1">
          <span className="text-[7px] sm:text-[7.5px] font-bold uppercase tracking-[0.15em] text-[#8c6a33] whitespace-nowrap leading-none">
            MÚSICA AMBIENTE
          </span>
          <span className="text-[10px] sm:text-[11px] font-serif italic text-[#2C2621]/90 truncate leading-tight mt-0.5">
            Sónia & Wilson — Melodia
          </span>
        </div>

        {/* Mute/Unmute Side Button */}
        <button
          onClick={toggleMute}
          className="p-1 text-[#2C2621]/60 hover:text-[#8c6a33] transition-colors cursor-pointer shrink-0"
          aria-label={isMuted ? "Ativar som" : "Desativar som"}
        >
          {isMuted ? (
            <VolumeX size={12} className="transition-all text-[#8c6a33]" />
          ) : (
            <Volume2 size={12} className="transition-all text-[#8c6a33]" />
          )}
        </button>
      </div>
    </>
  );
}
