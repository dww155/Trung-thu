import React, { useState } from 'react';
import { LANTERN_PRESETS } from '../data/wishes';
import { sound } from '../utils/audio';

export default function WishLanternModal({ onClose, onRelease }) {
  const [wish, setWish] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!wish.trim()) return;
    sound.playLanternSwoosh();
    onRelease(wish.trim());
    onClose();
  };

  const choosePreset = (p) => {
    setWish(p);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#1a1233] via-[#2d1b4e] to-[#0f0c29] text-amber-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(255,165,0,0.3)] border-2 border-amber-500/50 p-6 overflow-hidden">

        {/* Glow ambient background circle */}
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="text-center relative pb-3 border-b border-amber-500/30">
          <div className="text-4xl mb-2 filter drop-shadow-[0_0_15px_#ff9f43]">
            🏮
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#ffd700]">
            Thả Đèn Trời Ước Nguyện
          </h3>
          <p className="text-xs text-amber-200/80 font-serif mt-1">
            Gửi gắm ước mơ lên cung trăng sáng tỏ đêm rằm
          </p>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-amber-300 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-serif uppercase tracking-wider text-amber-300 font-bold mb-1.5">
              Viết điều ước tâm nguyện của bạn:
            </label>
            <textarea
              rows="3"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="VD: Cầu cho gia đình luôn bình an, mạnh khỏe, vạn sự hanh thông..."
              className="w-full px-3 py-2.5 rounded-xl bg-purple-950/60 border border-amber-400/40 text-amber-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 font-serif placeholder:text-amber-200/40"
              maxLength={120}
              required
            />
            <div className="text-right text-[11px] text-amber-300/60 mt-1">
              {wish.length}/120 ký tự
            </div>
          </div>

          {/* Preset Suggestions */}
          <div>
            <span className="block text-[11px] font-serif italic text-amber-300/80 mb-1.5">
              Gợi ý điều ước tốt lành:
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
              {LANTERN_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => choosePreset(p)}
                  className="text-left text-xs bg-purple-900/50 hover:bg-amber-600/40 border border-amber-400/30 text-amber-200 px-2.5 py-1 rounded-full transition font-serif"
                >
                  ✨ {p}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!wish.trim()}
              className="w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-slate-950 font-bold font-serif text-sm sm:text-base rounded-xl shadow-[0_0_20px_rgba(255,165,0,0.5)] transition transform hover:-translate-y-0.5 border border-amber-200"
            >
              🏮 Thả Đèn Bay Lên Trời Ngay
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
