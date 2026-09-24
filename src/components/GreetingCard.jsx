import React from 'react';
import { StarLantern } from './Decorations';

export default function GreetingCard({
  recipient,
  sender,
  content,
  poem,
  onCustomize,
  onOpenLanternModal,
  onToggleTeaTray,
  onCloseCard,
  onCopyLink,
  copied
}) {
  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto px-2 sm:px-4 py-4 sm:py-6 animate-fade-in-up">
      {/* Outer Glow Card Container */}
      <div className="relative rounded-2xl p-1 bg-gradient-to-b from-[#d4af37] via-[#f1c40f] to-[#aa7c11] shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_40px_rgba(255,215,0,0.35)]">

        {/* Main Parchment Surface */}
        <div className="relative rounded-[14px] bg-[#fffdf5] text-slate-800 p-4 sm:p-8 shadow-inner overflow-hidden border border-[#e6c989]">

          {/* Subtle oriental watermark background */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#800e13_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Golden Corner Ornaments */}
          <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-[#b8860b] rounded-tl-md pointer-events-none" />
          <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-[#b8860b] rounded-tr-md pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-[#b8860b] rounded-bl-md pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-[#b8860b] rounded-br-md pointer-events-none" />

          {/* Header with Star Lantern & Typography */}
          <div className="text-center relative pb-4 border-b border-[#e2c785]">
            <div className="flex justify-center items-center gap-3 mb-2">
              <StarLantern size={36} className="hidden sm:inline-block" />
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] font-serif font-bold text-[#a02020]">
                ✦ TẾT ĐOÀN VIÊN • RẰM THÁNG TÁM ✦
              </p>
              <StarLantern size={36} className="hidden sm:inline-block" />
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#800e13] via-[#b71523] to-[#800e13] font-serif tracking-tight drop-shadow-sm my-1 py-1">
              Vui Tết Trung Thu
            </h1>
            <p className="text-sm sm:text-base text-amber-800/90 font-serif italic mt-0.5">
              Trăng rằm tỏa sáng — Vạn phúc bình an — Gia đình sum họp
            </p>
          </div>

          {/* Central Artwork & Recipient Banner */}
          <div className="my-6">
            <div className="bg-gradient-to-r from-amber-50 via-amber-100/70 to-amber-50 border border-amber-200/80 rounded-lg p-3 text-center shadow-sm">
              <span className="text-xs uppercase tracking-widest text-amber-900/70 font-semibold block">
                Kính chúc thân gửi đến
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#800e13] font-serif mt-1 inline-block">
                {recipient || 'Quý Người Thân & Bạn Bè'}
              </span>
            </div>
          </div>

          {/* Wishing Message Body */}
          <div className="my-5 text-slate-800 font-serif leading-relaxed text-base sm:text-lg text-justify sm:text-center px-1 sm:px-4">
            <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-[#800e13] first-letter:float-left first-letter:mr-2 first-letter:font-serif">
              {content}
            </p>
          </div>

          {/* Mid-Autumn Traditional Poem Box */}
          {poem && (
            <div className="my-6 relative bg-gradient-to-br from-[#fff7e6] to-[#ffeedb] border-2 border-[#d4af37]/60 rounded-xl p-5 sm:p-6 text-center shadow-sm">
              <p className="text-base sm:text-lg font-serif italic text-[#631818] whitespace-pre-line leading-loose tracking-wide pt-1">
                {poem}
              </p>
              <div className="flex justify-center items-center gap-2 mt-2 text-amber-600/70 text-xs">
                <span>✦</span>
                <span className="w-12 h-[1px] bg-amber-400"></span>
                <span>🥮</span>
                <span className="w-12 h-[1px] bg-amber-400"></span>
                <span>✦</span>
              </div>
            </div>
          )}

          {/* Blessing Badges: Phúc - Lộc - Thọ - Khang - Ninh */}
          <div className="grid grid-cols-5 gap-1 sm:gap-2 my-4 sm:my-5 text-center">
            {[
              { char: 'Phúc', sub: 'Hạnh Phúc' },
              { char: 'Lộc', sub: 'Tài Lộc' },
              { char: 'Thọ', sub: 'Trường Thọ' },
              { char: 'Khang', sub: 'Khang Kiện' },
              { char: 'Ninh', sub: 'Bình An' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-amber-50 hover:bg-amber-100 border border-amber-300/80 rounded-lg p-1.5 transition shadow-sm"
              >
                <div className="w-8 h-8 mx-auto rounded-full bg-[#800e13] text-[#ffeaa7] font-serif font-bold text-sm sm:text-base flex items-center justify-center shadow">
                  {item.char}
                </div>
                <div className="text-[10px] sm:text-xs font-serif text-amber-900 mt-1 font-medium">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Signature & Traditional Red Stamp */}
          <div className="mt-8 pt-5 border-t border-[#e2c785] flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Red Traditional Vermilion Stamp */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 border-2 border-[#b71523] rounded-lg p-1 bg-[#fff0f0] flex flex-col items-center justify-center shadow-sm -rotate-6">
                <span className="text-[9px] font-bold text-[#b71523] uppercase tracking-wider font-serif">
                  VẠN SỰ
                </span>
                <span className="text-xs font-bold text-[#b71523] font-serif">
                  NHƯ Ý
                </span>
                <span className="text-[8px] text-[#b71523]">✦ 2026 ✦</span>
              </div>
              <div className="text-left text-xs font-serif text-slate-600">
                <p className="font-semibold text-amber-900">Rằm Tháng Tám Bính Ngọ</p>
                <p className="italic text-slate-500">Mùa Trăng Đoàn Viên</p>
              </div>
            </div>

            {/* Sender Signature */}
            <div className="text-center sm:text-right">
              <span className="text-xs font-serif text-slate-500 italic block">
                Người gửi trao yêu thương:
              </span>
              <span className="text-xl sm:text-2xl font-bold font-serif text-[#800e13] tracking-wide inline-block mt-0.5">
                {sender || 'Một Người Thân Quý'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="mt-6 flex flex-wrap justify-center items-center gap-3 interactive-ui">

        {/* Customize button */}
        <button
          onClick={onCustomize}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold rounded-full shadow-lg hover:shadow-amber-500/30 transition transform hover:-translate-y-0.5 text-sm sm:text-base border border-amber-300"
        >
          <span>✍️</span>
          <span>Tự Soạn Thiệp Này</span>
        </button>

        {/* Release Sky Lantern */}
        <button
          onClick={onOpenLanternModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-bold rounded-full shadow-lg hover:shadow-red-600/30 transition transform hover:-translate-y-0.5 text-sm sm:text-base border border-amber-400"
        >
          <span>🏮</span>
          <span>Thả Đèn Trời Cầu May</span>
        </button>

        {/* Shareable Link */}
        <button
          onClick={onCopyLink}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-900/80 hover:bg-indigo-800 text-amber-200 font-medium rounded-full shadow-lg transition transform hover:-translate-y-0.5 text-sm sm:text-base border border-amber-400/40 backdrop-blur"
        >
          <span>{copied ? '✅' : '🔗'}</span>
          <span>{copied ? 'Đã Sao Chép Link!' : 'Sao Chép Link Tặng Bạn'}</span>
        </button>

        {/* Mooncake & Tea Tray toggle */}
        <button
          onClick={onToggleTeaTray}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-900/80 hover:bg-emerald-800 text-amber-200 font-medium rounded-full shadow-lg transition transform hover:-translate-y-0.5 text-sm sm:text-base border border-emerald-400/40 backdrop-blur"
        >
          <span>🥮</span>
          <span>Bàn Trà Phá Cỗ</span>
        </button>

        {/* Close Card */}
        <button
          onClick={onCloseCard}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-900/70 hover:bg-slate-800 text-slate-300 font-medium rounded-full shadow transition text-xs border border-slate-700"
        >
          <span>✉️</span>
          <span>Gấp thiệp lại</span>
        </button>
      </div>
    </div>
  );
}
