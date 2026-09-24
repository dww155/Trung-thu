import React, { useState } from 'react';
import { sound } from '../utils/audio';

export default function Envelope({ recipient, onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    sound.playOpenChime();
    sound.startBgm(); // Auto start background traditional lullaby

    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[70vh] z-10">
      {/* Outer Envelope Wrapper */}
      <div
        onClick={handleClick}
        className={`relative w-[340px] sm:w-[460px] h-[240px] sm:h-[300px] cursor-pointer transition-all duration-700 select-none group ${isOpening ? 'scale-105 opacity-90' : 'hover:scale-[1.02]'
          }`}
        style={{ perspective: '1200px' }}
      >
        {/* Envelope Body */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#800e13] via-[#a71d2a] to-[#590d15] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_35px_rgba(230,126,34,0.4)] border-2 border-[#d4af37] overflow-hidden flex flex-col justify-between p-6">

          {/* Traditional Brocade Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Corner Golden Ornaments */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#d4af37] rounded-tl-sm pointer-events-none" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#d4af37] rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#d4af37] rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#d4af37] rounded-br-sm pointer-events-none" />

          {/* Envelope Header Header Info */}
          <div className="text-center z-10 pt-2">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#ffd700] font-serif font-semibold border-b border-[#ffd700]/40 pb-1">
              ✦ THƯ CHÚC MỪNG TRUNG THU ✦
            </span>
          </div>

          {/* Recipient Display */}
          <div className="text-center z-10 my-auto px-4">
            <p className="text-amber-200/80 text-xs sm:text-sm italic font-serif">Kính gửi đến:</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffeaa7] via-[#fff3b0] to-[#ffd700] font-serif tracking-wide drop-shadow mt-1">
              {recipient || 'Gia Đình & Bạn Bè Thân Yêu'}
            </h2>
            <p className="text-amber-100/70 text-xs mt-1 font-serif">
              Tết Đoàn Viên • Rằm Tháng Tám Bính Ngọ
            </p>
          </div>

          {/* Envelope Bottom Seal Prompt */}
          <div className="text-center z-10 pb-1">
            <p className="text-amber-300 text-xs font-medium tracking-wider animate-pulse flex items-center justify-center gap-1.5">
              <span>🏮</span>
              <span>Chạm để mở phong bao</span>
              <span>🏮</span>
            </p>
          </div>

          {/* Triangular bottom flap fold aesthetic lines */}
          <div className="absolute bottom-0 left-0 right-0 h-[100px] border-t border-[#d4af37]/30 pointer-events-none"
            style={{ clipPath: 'polygon(0% 100%, 50% 30%, 100% 100%)', background: 'linear-gradient(to top, rgba(90, 10, 20, 0.4), transparent)' }} />
        </div>

        {/* 3D Top Flap (Opens Upwards) */}
        <div
          className={`absolute top-0 left-0 right-0 h-[130px] sm:h-[155px] origin-top transition-transform duration-1000 ease-out z-20 pointer-events-none ${isOpening ? '-rotate-x-180 opacity-0' : 'rotate-x-0'
            }`}
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'top center',
            transform: isOpening ? 'rotateX(180deg)' : 'rotateX(0deg)'
          }}
        >
          <svg className="w-full h-full filter drop-shadow-md" viewBox="0 0 460 155" preserveAspectRatio="none">
            <polygon
              points="0,0 230,150 460,0"
              fill="#961520"
              stroke="#d4af37"
              strokeWidth="2"
            />
            {/* Inner accent line */}
            <polygon
              points="15,0 230,140 445,0"
              fill="none"
              stroke="#ffd700"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Golden Wax Seal */}
        <div
          className={`absolute top-[40%] sm:top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 ${isOpening ? 'scale-150 opacity-0 rotate-45' : 'scale-100 group-hover:scale-110'
            }`}
        >
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#996515] via-[#d4af37] to-[#fff3b0] p-1 shadow-[0_6px_20px_rgba(0,0,0,0.5),0_0_20px_rgba(255,215,0,0.6)] flex items-center justify-center">
            {/* Wax border uneven ring */}
            <div className="w-full h-full rounded-full border-2 border-dashed border-[#784d0d] bg-gradient-to-b from-[#b37d14] to-[#7c4f0b] flex flex-col items-center justify-center text-center shadow-inner">
              <span className="text-xl sm:text-2xl filter drop-shadow">🥮</span>
              <span className="text-[9px] sm:text-[10px] font-serif font-bold text-[#fff2cc] tracking-widest uppercase mt-0.5">
                ĐOÀN VIÊN
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric Hint */}
      <div className="mt-8 text-center text-amber-200/90 text-sm font-serif max-w-sm px-4 flex items-center gap-2">
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-300/40"></span>
        <span className="italic">Gửi trao yêu thương dưới ánh trăng rằm</span>
        <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-300/40"></span>
      </div>
    </div>
  );
}
