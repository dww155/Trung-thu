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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#1b102b] via-[#28163f] to-[#120b1f] text-amber-100 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(245,158,11,0.3)] border-2 border-[#d4af37] p-5 sm:p-6 overflow-hidden">
        {/* Glow ambient background circle */}
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="text-center relative pb-3 border-b border-[#d4af37]/40">
          <div className="text-4xl mb-1 filter drop-shadow-[0_0_15px_#ff9f43]">
            🏮
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#ffd700]">
            Thả Đèn Trời Ước Nguyện
          </h3>
          <p className="text-xs text-amber-200/80 font-serif mt-1">
            Gửi gắm ước mơ lên cung trăng sáng tỏ đêm rằm
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="absolute top-0 right-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#ffd700] hover:text-white flex items-center justify-center text-sm font-bold border border-[#d4af37]/40 transition cursor-pointer"
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
              className="w-full px-3.5 py-2.5 rounded-xl border font-serif placeholder:text-amber-200/40 shadow-inner"
              style={{
                backgroundColor: '#0f071a',
                color: '#fef3c7',
                borderColor: '#d4af37',
                borderWidth: '1.5px',
                outline: 'none'
              }}
              maxLength={120}
              required
            />
            <div className="text-right text-[11px] text-amber-300/70 mt-1 font-serif">
              {wish.length}/120 ký tự
            </div>
          </div>

          {/* Preset Suggestions */}
          <div>
            <span className="block text-xs font-serif italic text-amber-200/90 mb-2">
              Gợi ý điều ước tốt lành (chạm để chọn):
            </span>
            <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1">
              {LANTERN_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => choosePreset(p)}
                  className="wish-preset-item"
                >
                  <span className="text-amber-400">✨</span>
                  <span>{p}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!wish.trim()}
              className="w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 disabled:opacity-50 text-[#1f1300] font-bold font-serif text-sm sm:text-base rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.5)] transition transform hover:-translate-y-0.5 border border-[#fef08a] cursor-pointer"
            >
              🏮 Thả Đèn Bay Lên Trời Ngay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
