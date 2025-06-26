/// <reference types="react" />
import React, { useState, useEffect, useRef } from 'react';

const slides = [
  '/slide/1.JPG',
  '/slide/2.JPG',
  '/slide/3.JPG',
  '/slide/4.JPG',
];

const FADE_DURATION = 1200; // ms

const TopSlider: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [fade, setFade] = useState<'in' | 'out'>('in');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoRef = useRef<NodeJS.Timeout | null>(null);

  // 自動スライド
  useEffect(() => {
    if (autoRef.current) clearTimeout(autoRef.current);
    autoRef.current = setTimeout(() => {
      handleChange((current + 1) % slides.length);
    }, 4000);
    return () => {
      if (autoRef.current) clearTimeout(autoRef.current);
    };
    // eslint-disable-next-line
  }, [current]);

  // フェード切り替え
  const handleChange = (nextIdx: number) => {
    setFade('out');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent(nextIdx);
      setFade('in');
    }, FADE_DURATION);
  };

  const goTo = (idx: number) => handleChange(idx);
  const prev = () => handleChange((current - 1 + slides.length) % slides.length);
  const next = () => handleChange((current + 1) % slides.length);

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-blue-100 bg-white">
      <img
        src={slides[current]}
        alt={`スライド${current + 1}`}
        className={`w-full h-64 object-cover transition-opacity duration-[1200ms] ${fade === 'in' ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionProperty: 'opacity' }}
      />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`w-3 h-3 rounded-full border-2 border-[#2093f5] ${current === i ? 'bg-[#2093f5]' : 'bg-white'}`}
            aria-label={`スライド${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
      <button
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-[#2093f5] hover:text-white text-[#2093f5] rounded-full p-2 shadow transition"
        aria-label="前へ"
        onClick={prev}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-[#2093f5] hover:text-white text-[#2093f5] rounded-full p-2 shadow transition"
        aria-label="次へ"
        onClick={next}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
      </button>
    </div>
  );
};

export default TopSlider;
