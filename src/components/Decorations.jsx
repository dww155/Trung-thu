import React from 'react';

// Hanging Red Silk Lantern with Sway Animation
export function HangingLantern({ side = 'left', delay = '0s' }) {
  const isLeft = side === 'left';
  return (
    <div
      className={`fixed top-0 ${isLeft ? 'left-2 sm:left-10' : 'right-2 sm:right-10'} pointer-events-none z-10`}
      style={{
        transformOrigin: 'top center',
        animation: `swayLantern 4.5s ease-in-out infinite alternate ${delay}`
      }}
    >
      <svg
        style={{ width: 'clamp(42px, 9vw, 68px)', height: 'auto' }}
        viewBox="0 0 70 150"
        className="drop-shadow-lg"
      >
        {/* Rope */}
        <line x1="35" y1="0" x2="35" y2="35" stroke="#d4af37" strokeWidth="2.5" />
        {/* Golden top cap */}
        <rect x="25" y="33" width="20" height="6" rx="2" fill="#d4af37" />
        {/* Lantern Body */}
        <ellipse cx="35" cy="72" rx="25" ry="32" fill="url(#lanternGrad)" />
        {/* Lantern Ribs */}
        <ellipse cx="35" cy="72" rx="14" ry="32" fill="none" stroke="#b21818" strokeWidth="1.5" />
        <line x1="35" y1="40" x2="35" y2="104" stroke="#d4af37" strokeWidth="1.2" />
        {/* Gold middle band */}
        <ellipse cx="35" cy="72" rx="25" ry="7" fill="none" stroke="#ffd700" strokeWidth="1.2" strokeDasharray="3,3" />
        {/* Golden bottom cap */}
        <rect x="26" y="103" width="18" height="5" rx="2" fill="#d4af37" />
        {/* Silk Tassels */}
        <line x1="35" y1="108" x2="35" y2="145" stroke="#e74c3c" strokeWidth="3" />
        <circle cx="35" cy="115" r="3.5" fill="#ffd700" />
        <line x1="30" y1="110" x2="28" y2="140" stroke="#e74c3c" strokeWidth="1.8" />
        <line x1="40" y1="110" x2="42" y2="140" stroke="#e74c3c" strokeWidth="1.8" />

        <defs>
          <radialGradient id="lanternGrad" cx="40%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#ff7675" />
            <stop offset="45%" stopColor="#d63031" />
            <stop offset="85%" stopColor="#9b111e" />
            <stop offset="100%" stopColor="#5f0909" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

// Traditional 5-pointed Vietnamese Star Lantern (Đèn ông sao)
export function StarLantern({ className = '', size = 110 }) {
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(255,200,50,0.7)] animate-pulse-gentle"
      >
        <defs>
          <linearGradient id="starRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="100%" stopColor="#c0392b" />
          </linearGradient>
          <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffeaa7" />
            <stop offset="100%" stopColor="#fdcb6e" />
          </linearGradient>
          <linearGradient id="starBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#74b9ff" />
            <stop offset="100%" stopColor="#0984e3" />
          </linearGradient>
          <linearGradient id="starGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#55efc4" />
            <stop offset="100%" stopColor="#00b894" />
          </linearGradient>
          <linearGradient id="starOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fab1a0" />
            <stop offset="100%" stopColor="#e17055" />
          </linearGradient>
        </defs>

        {/* Outer Bamboo Circle */}
        <circle cx="100" cy="100" r="76" fill="none" stroke="#d4af37" strokeWidth="4" />
        <circle cx="100" cy="100" r="72" fill="none" stroke="#e67e22" strokeWidth="1.5" strokeDasharray="4,4" />

        {/* 5-pointed star segments */}
        {/* Top wing */}
        <polygon points="100,10 115,75 100,100" fill="url(#starRed)" opacity="0.9" />
        <polygon points="100,10 85,75 100,100" fill="url(#starOrange)" opacity="0.95" />
        {/* Top Right wing */}
        <polygon points="190,75 125,108 100,100" fill="url(#starGold)" opacity="0.9" />
        <polygon points="190,75 135,75 100,100" fill="url(#starRed)" opacity="0.95" />
        {/* Bottom Right wing */}
        <polygon points="155,185 100,140 100,100" fill="url(#starGreen)" opacity="0.9" />
        <polygon points="155,185 135,120 100,100" fill="url(#starGold)" opacity="0.95" />
        {/* Bottom Left wing */}
        <polygon points="45,185 100,140 100,100" fill="url(#starBlue)" opacity="0.9" />
        <polygon points="45,185 65,120 100,100" fill="url(#starGreen)" opacity="0.95" />
        {/* Top Left wing */}
        <polygon points="10,75 75,108 100,100" fill="url(#starRed)" opacity="0.9" />
        <polygon points="10,75 65,75 100,100" fill="url(#starBlue)" opacity="0.95" />

        {/* Bamboo structural struts */}
        <line x1="100" y1="10" x2="100" y2="100" stroke="#f1c40f" strokeWidth="2.5" />
        <line x1="190" y1="75" x2="100" y2="100" stroke="#f1c40f" strokeWidth="2.5" />
        <line x1="155" y1="185" x2="100" y2="100" stroke="#f1c40f" strokeWidth="2.5" />
        <line x1="45" y1="185" x2="100" y2="100" stroke="#f1c40f" strokeWidth="2.5" />
        <line x1="10" y1="75" x2="100" y2="100" stroke="#f1c40f" strokeWidth="2.5" />

        {/* Center glowing candle circle */}
        <circle cx="100" cy="100" r="22" fill="#fff7b2" />
        <circle cx="100" cy="100" r="26" fill="none" stroke="#e74c3c" strokeWidth="2.5" />
        {/* Center character: Trung Thu / Phúc */}
        <text
          x="100"
          y="105"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#c0392b"
          fontFamily="serif"
        >
          福
        </text>
      </svg>
    </div>
  );
}

// Vietnamese Traditional Royal Cloud Border (Họa tiết vân mây cung đình)
export function CloudBorderPattern() {
  return (
    <svg className="w-full h-8 opacity-40 text-amber-400" viewBox="0 0 500 24" fill="currentColor">
      <path d="M0,12 Q30,0 60,12 T120,12 T180,12 T240,12 T300,12 T360,12 T420,12 T480,12 T540,12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="60" cy="12" r="3" />
      <circle cx="180" cy="12" r="3" />
      <circle cx="300" cy="12" r="3" />
      <circle cx="420" cy="12" r="3" />
    </svg>
  );
}
