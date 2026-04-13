import { useEffect, useRef } from 'react';

export default function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    const speed = 0.5;
    let raf: number;
    const totalWidth = track.scrollWidth / 2;
    const animate = () => {
      pos -= speed;
      if (Math.abs(pos) >= totalWidth) pos = 0;
      track.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const messages = [
    ' Bienvenue au TALKS - Mouvement pour une Centrafrique unie',
    ' Assemblée nationale : prochaine réunion le 15 mai 2026',
    ' Mission: Promouvoir la démocratie participative et l\'unité',
    ' Ensemble pour l\'avenir : Touadéra A Lingbi Na Koua So',
    ' Rejoignez-nous et participez au changement',
  ];

  const doubled = [...messages, ...messages];

  return (
    <div className="sticky top-0 bg-gradient-to-r from-[#1a2b4a] to-[#0f1a2e] h-10 flex items-center overflow-hidden relative z-50">
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#1a2b4a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#0f1a2e] to-transparent z-10 pointer-events-none" />
      <div ref={trackRef} className="flex items-center whitespace-nowrap will-change-transform">
        {doubled.map((msg, i) => (
          <span key={i} className="text-white text-sm font-medium px-10 flex items-center gap-2">
            <span className="text-[#d4af37]">✦</span>
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
