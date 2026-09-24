import React, { useState } from 'react';
import { sound } from '../utils/audio';

export default function MooncakeTray({ onClose }) {
  const [cutCake, setCutCake] = useState(false);
  const [pouredTea, setPouredTea] = useState(false);
  const [selectedCake, setSelectedCake] = useState(0);

  const cakes = [
    {
      name: 'Bánh Nướng Thập Cẩm',
      desc: 'Nhân lạp xưởng, lá chanh, mứt bí, hạt dưa & 2 lòng đỏ trứng muối bùi béo.',
      yolk: '🌕🌕 Hai Trứng Muối Vàng Óng',
      color: '#c27803'
    },
    {
      name: 'Bánh Dẻo Hạt Sen',
      desc: 'Vỏ bánh trắng ngần thơm hương hoa bưởi, nhân hạt sen nhuyễn ngọt dịu thanh tao.',
      yolk: '🌸 Hương Hoa Bưởi Thanh Khiết',
      color: '#f5f6fa'
    },
    {
      name: 'Bánh Trà Xanh Trứng Muối',
      desc: 'Vị matcha thanh mát kết hợp cùng vị bùi ngậy của trứng muối tròn đầy.',
      yolk: '🍵 Trà Xanh & Trứng Muối',
      color: '#44bd32'
    }
  ];

  const handleCutCake = (idx) => {
    setSelectedCake(idx);
    setCutCake(true);
    sound.playPluck(880, 0.4, 0.3, 'triangle');
  };

  const handlePourTea = () => {
    setPouredTea(true);
    sound.playPluck(1046.5, 0.6, 0.25, 'sine');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#2c1d11] text-amber-100 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border-2 border-[#d4af37] p-5 sm:p-6 overflow-hidden">

        {/* Background wood texture overlay */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

        {/* Header */}
        <div className="text-center relative pb-3 border-b border-[#d4af37]/40">
          <div className="flex justify-center items-center gap-2">
            <span className="text-2xl">🥮</span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#ffd700]">
              Bàn Trà Phá Cỗ Trông Trăng
            </h3>
            <span className="text-2xl">🍵</span>
          </div>
          <p className="text-xs text-amber-200/80 font-serif mt-1">
            "Ăn miếng bánh nướng thơm lừng — Nhấp ngụm trà sen ấm lòng đêm thu"
          </p>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-amber-300 hover:text-white text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Interactive Feast Table */}
        <div className="my-5 flex flex-col items-center">

          {/* Cake Selection Row */}
          <div className="flex justify-center gap-3 sm:gap-4 mb-4">
            {cakes.map((cake, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleCutCake(idx)}
                className={`relative p-2.5 rounded-xl border transition-all text-center flex flex-col items-center ${selectedCake === idx
                  ? 'bg-amber-800/80 border-[#ffd700] scale-105 shadow-[0_0_15px_rgba(255,215,0,0.4)]'
                  : 'bg-black/30 border-amber-500/30 hover:bg-black/50'
                  }`}
              >
                {/* Mooncake Graphic SVG */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill={cake.color}
                      stroke="#804e0a"
                      strokeWidth="3"
                    />
                    {/* Pattern petals */}
                    <circle cx="50" cy="50" r="32" fill="none" stroke="#683d06" strokeWidth="2" strokeDasharray="6,4" />
                    <circle cx="50" cy="50" r="18" fill="none" stroke="#683d06" strokeWidth="2" />
                    <text x="50" y="55" textAnchor="middle" fontSize="14" fill="#683d06" fontWeight="bold" fontFamily="serif">
                      {idx === 0 ? '福' : idx === 1 ? '壽' : '祿'}
                    </text>
                  </svg>
                </div>
                <span className="text-[11px] sm:text-xs font-serif font-semibold mt-1.5 text-amber-200">
                  {cake.name}
                </span>
              </button>
            ))}
          </div>

          {/* Cake Details & Slicing Action */}
          <div className="w-full bg-black/40 border border-amber-500/30 rounded-xl p-4 text-center">
            <h4 className="text-base font-serif font-bold text-amber-300">
              {cakes[selectedCake].name}
            </h4>
            <p className="text-xs text-amber-100/90 font-serif mt-1 leading-relaxed">
              {cakes[selectedCake].desc}
            </p>

            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="text-xs bg-amber-900/90 border border-amber-400/50 text-amber-200 px-3 py-1 rounded-full font-serif">
                {cakes[selectedCake].yolk}
              </span>

              <button
                type="button"
                onClick={() => handleCutCake(selectedCake)}
                className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-serif font-bold text-xs rounded-full shadow"
              >
                🔪 Cắt Thưởng Thức
              </button>
            </div>

            {cutCake && (
              <div className="mt-3 p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-200 font-serif italic animate-fade-in">
                ✨ Bạn vừa cắt một miếng bánh thơm dẻo, chúc bạn và gia đình một mùa trăng ngọt ngào, trọn vẹn yêu thương!
              </div>
            )}
          </div>

          {/* Lotus Teapot Interaction */}
          <div className="w-full mt-4 flex items-center justify-between bg-amber-950/40 border border-amber-500/30 rounded-xl p-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🫖</span>
              <div className="text-left">
                <span className="text-sm font-serif font-bold text-amber-300 block">
                  Trà Sen Tây Hồ Thượng Hạng
                </span>
                <span className="text-xs text-amber-200/70 font-serif">
                  {pouredTea ? 'Tách trà ấm ngát hương sen đang bốc khói nghi ngút...' : 'Chạm để rót chén trà nóng thưởng trăng'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePourTea}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-serif font-bold transition shadow ${pouredTea
                  ? 'bg-[#065f46] text-[#d1fae5] border border-[#34d399]'
                  : 'bg-[#d97706] hover:bg-[#b45309] text-[#1e1102] border border-[#fde68a]'
                }`}
            >
              {pouredTea ? '🍵 Đã Rót Trà' : 'Rót Trà 🍵'}
            </button>
          </div>

        </div>

        {/* Close Button */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 font-serif text-xs rounded-full transition"
          >
            Đóng Bàn Trà
          </button>
        </div>

      </div>
    </div>
  );
}
