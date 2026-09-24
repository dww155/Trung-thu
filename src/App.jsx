import React, { useState } from 'react';
import SkyCanvas from './components/SkyCanvas';
import Envelope from './components/Envelope';
import GreetingCard from './components/GreetingCard';
import CardCustomizer from './components/CardCustomizer';
import WishLanternModal from './components/WishLanternModal';
import MooncakeTray from './components/MooncakeTray';
import MusicPlayer from './components/MusicPlayer';
import { HangingLantern } from './components/Decorations';
import { PRESET_WISHES } from './data/wishes';

function getInitialCardData() {
  const defaultWish = PRESET_WISHES[1];
  const initial = {
    recipient: defaultWish.recipient,
    sender: 'Gia Đình Yêu Thương',
    content: defaultWish.content,
    poem: defaultWish.poem
  };

  if (typeof window !== 'undefined') {
    try {
      const url = new URL(window.location.href);
      const to = url.searchParams.get('to');
      const from = url.searchParams.get('from');
      const msg = url.searchParams.get('msg');
      const poem = url.searchParams.get('poem');

      if (to) initial.recipient = to;
      if (from) initial.sender = from;
      if (msg) initial.content = msg;
      if (poem) initial.poem = poem;
    } catch {
      // Ignore URL parse errors
    }
  }
  return initial;
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [showLanternModal, setShowLanternModal] = useState(false);
  const [showTeaTray, setShowTeaTray] = useState(false);
  const [toast, setToast] = useState('');
  const [copied, setCopied] = useState(false);

  // User Released Sky Lanterns
  const [customLanterns, setCustomLanterns] = useState([]);

  // Card Content State initialized directly
  const [cardData, setCardData] = useState(getInitialCardData);

  const showToastMsg = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast('');
    }, 3800);
  };

  // Copy shareable link
  const handleCopyShareLink = (overrideData) => {
    const dataToUse = overrideData || cardData;
    const url = new URL(window.location.origin + window.location.pathname);
    if (dataToUse.recipient) url.searchParams.set('to', dataToUse.recipient);
    if (dataToUse.sender) url.searchParams.set('from', dataToUse.sender);
    if (dataToUse.content) url.searchParams.set('msg', dataToUse.content);
    if (dataToUse.poem) url.searchParams.set('poem', dataToUse.poem);

    navigator.clipboard.writeText(url.toString()).then(
      () => {
        setCopied(true);
        showToastMsg('✅ Đã sao chép liên kết thiệp cá nhân hóa!');
        setTimeout(() => setCopied(false), 2500);
      },
      () => {
        showToastMsg('Vui lòng sao chép link trên thanh địa chỉ duyệt web.');
      }
    );
  };

  // Handle user releasing a wish lantern
  const handleReleaseLantern = (wishText) => {
    const newLantern = {
      id: Date.now(),
      x: window.innerWidth * (0.2 + Math.random() * 0.6),
      y: window.innerHeight - 30,
      text: wishText,
      speedY: 1.4 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2
    };
    setCustomLanterns((prev) => [...prev, newLantern]);
    showToastMsg('🏮 Đèn trời ước nguyện của bạn đã bay lên cung trăng rực rỡ!');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden select-none">
      {/* Dynamic 2D Canvas Background with Full Moon, Stars, Floating Lanterns & Fireworks */}
      <SkyCanvas customLanterns={customLanterns} />

      {/* Swaying Silk Hanging Lanterns */}
      <HangingLantern side="left" delay="0s" />
      <HangingLantern side="right" delay="1.8s" />

      {/* Floating Audio Controller */}
      <MusicPlayer />

      {/* Top Header Festive Bar */}
      <header className="relative z-20 pt-3 sm:pt-4 pb-2 px-14 sm:px-4 text-center">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-black/40 border border-[#d4af37]/40 backdrop-blur-md shadow-lg">
          <span className="text-amber-400 text-xs sm:text-sm">✦</span>
          <span className="text-[10px] sm:text-sm font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffeaa7] via-[#ffd700] to-[#fff3b0] tracking-wider sm:tracking-widest uppercase">
            TẾT TRUNG THU 2026 • ĐOÀN VIÊN NHƯ Ý
          </span>
          <span className="text-amber-400 text-xs sm:text-sm">✦</span>
        </div>
      </header>

      {/* Center Main Stage: Either 3D Envelope or Unfolded Luxury Greeting Card */}
      <main className="relative z-20 flex-1 flex items-center justify-center py-4 px-2 sm:px-4">
        {!isOpen ? (
          <Envelope
            recipient={cardData.recipient}
            onOpen={() => setIsOpen(true)}
          />
        ) : (
          <GreetingCard
            recipient={cardData.recipient}
            sender={cardData.sender}
            content={cardData.content}
            poem={cardData.poem}
            onCustomize={() => setShowCustomizer(true)}
            onOpenLanternModal={() => setShowLanternModal(true)}
            onToggleTeaTray={() => setShowTeaTray(true)}
            onCloseCard={() => setIsOpen(false)}
            onCopyLink={() => handleCopyShareLink()}
            copied={copied}
          />
        )}
      </main>

      {/* Festive Bottom Hint Bar */}
      <footer className="relative z-20 py-3 px-4 text-center">
        <p className="text-[11px] sm:text-xs text-amber-200/70 font-serif tracking-wider">
          ✨ Chạm vào màn hình để bắn pháo hoa lấp lánh • Bật nhạc để thưởng thức trọn vẹn không khí đêm rằm ✨
        </p>
      </footer>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-slate-950 font-serif font-bold text-xs sm:text-sm shadow-[0_10px_25px_rgba(0,0,0,0.7)] border border-amber-200 animate-fade-in-up flex items-center gap-2">
          <span>{toast}</span>
        </div>
      )}

      {/* Modals */}
      {showCustomizer && (
        <CardCustomizer
          initialData={cardData}
          onSave={(newData) => {
            setCardData(newData);
            showToastMsg('✨ Lời chúc đã được cập nhật vào thiệp!');
          }}
          onClose={() => setShowCustomizer(false)}
          onCopyLink={(data) => handleCopyShareLink(data)}
          copied={copied}
        />
      )}

      {showLanternModal && (
        <WishLanternModal
          onClose={() => setShowLanternModal(false)}
          onRelease={handleReleaseLantern}
        />
      )}

      {showTeaTray && (
        <MooncakeTray onClose={() => setShowTeaTray(false)} />
      )}
    </div>
  );
}
