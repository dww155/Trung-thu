import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    const active = sound.toggleBgm();
    setIsPlaying(active);
  };

  useEffect(() => {
    // Keep local state in sync if sound is started elsewhere (e.g. envelope opening)
    const interval = setInterval(() => {
      if (sound.isPlaying !== isPlaying) {
        setIsPlaying(sound.isPlaying);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      <button
        onClick={toggle}
        title={isPlaying ? 'Tắt nhạc nền Trung Thu' : 'Bật nhạc nền Trung Thu du dương'}
        className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 ${isPlaying
            ? 'bg-amber-950/80 border-[#ffd700] text-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.5)]'
            : 'bg-slate-900/70 border-slate-700 text-slate-300 hover:text-white hover:border-amber-400'
          }`}
      >
        <span className="text-base sm:text-lg">
          {isPlaying ? '🎵' : '🔇'}
        </span>

        {/* Animated Sound Wave Bars */}
        {isPlaying ? (
          <div className="flex items-end gap-1 h-3.5">
            <span className="w-1 bg-[#ffd700] rounded-full animate-wave-1"></span>
            <span className="w-1 bg-[#ffd700] rounded-full animate-wave-2"></span>
            <span className="w-1 bg-[#ffd700] rounded-full animate-wave-3"></span>
            <span className="w-1 bg-[#ffd700] rounded-full animate-wave-2"></span>
          </div>
        ) : (
          <span className="text-xs font-serif hidden sm:inline">Nhạc Thu</span>
        )}
      </button>
    </div>
  );
}
