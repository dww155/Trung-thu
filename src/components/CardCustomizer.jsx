import React, { useState } from 'react';
import { WISH_CATEGORIES, PRESET_WISHES } from '../data/wishes';

export default function CardCustomizer({
  initialData,
  onSave,
  onClose,
  onCopyLink,
  copied
}) {
  const [activeCategory, setActiveCategory] = useState('family');
  const [recipient, setRecipient] = useState(initialData.recipient || '');
  const [sender, setSender] = useState(initialData.sender || '');
  const [content, setContent] = useState(initialData.content || '');
  const [poem, setPoem] = useState(initialData.poem || '');

  const filteredPresets = PRESET_WISHES.filter((w) => w.category === activeCategory);

  const applyPreset = (preset) => {
    setRecipient(preset.recipient);
    setContent(preset.content);
    setPoem(preset.poem);
  };

  const handleApply = (e) => {
    e.preventDefault();
    onSave({ recipient, sender, content, poem });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#fffdf5] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] border-2 border-[#d4af37] overflow-hidden text-slate-800">

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#800e13] via-[#a71d2a] to-[#800e13] text-amber-100 p-4 sm:p-5 flex items-center justify-between border-b-2 border-[#d4af37]">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✍️</span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-[#ffd700]">
                Tùy Biến Lời Chúc Trung Thu
              </h2>
              <p className="text-xs text-amber-200/80 font-serif">
                Chọn mẫu có sẵn hoặc tự viết lời chúc từ tận đáy lòng
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-amber-200 flex items-center justify-center font-bold transition"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">

          {/* Category Tabs */}
          <div>
            <label className="block text-xs uppercase font-serif tracking-wider font-bold text-amber-900 mb-2">
              Kho Lời Chúc Theo Chủ Đề:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {WISH_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-serif font-medium transition ${activeCategory === cat.id
                      ? 'bg-[#800e13] text-[#ffd700] shadow-md border border-[#d4af37]'
                      : 'bg-amber-100/70 hover:bg-amber-200/70 text-amber-900 border border-amber-300'
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Preset Selector Cards */}
          <div className="space-y-2">
            <label className="block text-xs font-serif italic text-slate-600">
              Nhấp vào một mẫu để áp dụng nhanh:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredPresets.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => applyPreset(p)}
                  className="cursor-pointer p-3 rounded-xl bg-amber-50 hover:bg-amber-100/90 border border-amber-200 transition text-left group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif font-bold text-xs text-[#800e13] group-hover:underline">
                      {p.title}
                    </span>
                    <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
                      Chọn
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-serif line-clamp-2">
                    {p.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-amber-200" />

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase font-serif font-bold text-amber-900 mb-1">
                  Kính gửi đến (Người nhận):
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="VD: Bố Mẹ, Bạn Thân, Em Yêu..."
                  className="w-full px-3 py-2 bg-amber-50/50 border border-amber-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800e13] font-serif"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-serif font-bold text-amber-900 mb-1">
                  Người gửi trao (Tên bạn):
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="VD: Con trai Tuấn, Thảo Vy..."
                  className="w-full px-3 py-2 bg-amber-50/50 border border-amber-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800e13] font-serif"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-serif font-bold text-amber-900 mb-1">
                Nội dung lời chúc Trung Thu:
              </label>
              <textarea
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nhập lời chúc chân thành của bạn tại đây..."
                className="w-full px-3 py-2 bg-amber-50/50 border border-amber-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800e13] font-serif leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-serif font-bold text-amber-900 mb-1 flex items-center justify-between">
                <span>Áng thơ Trung Thu (Tùy chọn):</span>
                <span className="text-[11px] font-normal text-slate-500 italic">Hiện trong khung thơ</span>
              </label>
              <textarea
                rows="3"
                value={poem}
                onChange={(e) => setPoem(e.target.value)}
                placeholder="Nhập 2-4 câu thơ mùa trăng..."
                className="w-full px-3 py-2 bg-amber-50/50 border border-amber-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#800e13] font-serif italic"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-amber-100/60 p-4 border-t border-amber-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onCopyLink({ recipient, sender, content, poem })}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-900 hover:bg-indigo-800 text-amber-100 text-xs font-serif font-medium transition shadow"
          >
            <span>{copied ? '✅' : '🔗'}</span>
            <span>{copied ? 'Đã sao chép link!' : 'Tạo link gửi trực tiếp'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs sm:text-sm font-medium transition"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#800e13] to-[#a71d2a] hover:from-[#961520] hover:to-[#ba2433] text-[#ffd700] text-xs sm:text-sm font-bold font-serif shadow-md transition border border-[#d4af37]"
            >
              ✓ Áp Dụng Ngay
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
