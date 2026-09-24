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
    <div className="envelope-container">
      {/* Outer Envelope Wrapper */}
      <div
        onClick={handleClick}
        className={`envelope-wrapper ${isOpening ? 'envelope-opening' : ''}`}
        title="Nhấn để mở phong bao thiệp Trung Thu"
      >
        {/* Envelope Body */}
        <div className="envelope-card-body">
          {/* Traditional Brocade Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Corner Golden Ornaments */}
          <div className="envelope-corner-tl" />
          <div className="envelope-corner-tr" />
          <div className="envelope-corner-bl" />
          <div className="envelope-corner-br" />

          {/* Envelope Header Info */}
          <div className="text-center z-10 pt-1">
            <span className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#ffd700] font-serif font-semibold border-b border-[#ffd700]/40 pb-0.5">
              ✦ THƯ CHÚC MỪNG TRUNG THU ✦
            </span>
          </div>

          {/* Recipient Display */}
          <div className="text-center z-10 my-auto px-3 sm:px-4">
            <p className="text-amber-200/90 text-xs sm:text-sm italic font-serif">Kính gửi đến:</p>
            <h2 className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffeaa7] via-[#fff3b0] to-[#ffd700] font-serif tracking-wide drop-shadow mt-1 line-clamp-2">
              {recipient || 'Gia Đình & Bạn Bè Thân Yêu'}
            </h2>
            <p className="text-amber-100/80 text-[11px] sm:text-xs mt-1 font-serif">
              Tết Đoàn Viên • Rằm Tháng Tám Bính Ngọ
            </p>
          </div>

          {/* Envelope Bottom Seal Prompt */}
          <div className="text-center z-10 pb-1">
            <p className="text-amber-300 text-[11px] sm:text-xs font-medium tracking-wider animate-pulse flex items-center justify-center gap-1.5">
              <span>🏮</span>
              <span>Chạm để mở phong bao</span>
              <span>🏮</span>
            </p>
          </div>

          {/* Triangular bottom flap fold aesthetic lines */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[80px] sm:h-[100px] border-t border-[#d4af37]/30 pointer-events-none"
            style={{
              clipPath: 'polygon(0% 100%, 50% 30%, 100% 100%)',
              background: 'linear-gradient(to top, rgba(90, 10, 20, 0.4), transparent)'
            }}
          />
        </div>

        {/* 3D Top Flap (Opens Upwards) */}
        <div
          className={`envelope-top-flap ${isOpening ? 'flap-opened' : ''}`}
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
          className={`envelope-wax-seal ${isOpening ? 'seal-opened' : ''}`}
        >
          <div className="wax-seal-circle">
            <div className="wax-seal-inner">
              <span className="text-lg sm:text-2xl filter drop-shadow">🥮</span>
              <span className="text-[8px] sm:text-[10px] font-serif font-bold text-[#fff2cc] tracking-widest uppercase mt-0.5">
                ĐOÀN VIÊN
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric Hint */}
      <div className="mt-6 sm:mt-8 text-center text-amber-200/90 text-xs sm:text-sm font-serif max-w-sm px-4 flex items-center gap-2">
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-300/40"></span>
        <span className="italic">Gửi trao yêu thương dưới ánh trăng rằm</span>
        <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-300/40"></span>
      </div>
    </div>
  );
}
