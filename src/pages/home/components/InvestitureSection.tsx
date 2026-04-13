import { useState, useEffect, useCallback } from 'react';
import { investitureImages } from '@/mocks/activities';

export default function InvestitureSection() {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = investitureImages.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused || lightboxOpen) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused, lightboxOpen]);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const lbPrev = () => setLightboxIndex((i) => (i - 1 + total) % total);
  const lbNext = () => setLightboxIndex((i) => (i + 1) % total);

  // Visible thumbnails: 5 around current
  const thumbStart = Math.max(0, Math.min(current - 2, total - 5));
  const thumbs = investitureImages.slice(thumbStart, thumbStart + 5);

  return (
    <section className="py-24 bg-[#0a1628]" id="investiture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#d4af37] text-sm font-bold uppercase tracking-widest">Cérémonie d'Investiture</span>
          <h2 className="text-white font-extrabold mt-3 mb-4" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>
            L'Investiture du Président 2026
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/60 mb-4">
            <div className="flex items-center gap-2">
              <i className="ri-calendar-event-line text-[#d4af37]" />
              <span>28 Février 2026</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
            <div className="flex items-center gap-2">
              <i className="ri-map-pin-line text-[#d4af37]" />
              <span>Bangui, Centrafrique</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/30" />
            <div className="flex items-center gap-2">
              <i className="ri-image-line text-[#d4af37]" />
              <span>{total} photos</span>
            </div>
          </div>
          <p className="text-white/50 max-w-2xl mx-auto text-sm leading-relaxed">
            Une cérémonie historique marquant le début d'une nouvelle ère pour le TALKS et la Centrafrique.
          </p>
        </div>

        {/* Main carousel */}
        <div
          className="relative rounded-2xl overflow-hidden mb-6 cursor-pointer h-[320px] sm:h-[420px] lg:h-[520px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onClick={() => openLightbox(current)}
        >
          {/* Images */}
          {investitureImages.map((img, idx) => (
            <div
              key={img.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={img.image}
                alt={img.caption}
                className="w-full h-full object-cover object-top"
              />
            </div>
          ))}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

          {/* Top badge */}
          <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-2 pointer-events-none">
            <div className="flex items-center gap-2 bg-[#d4af37] text-[#0a1628] text-xs font-bold px-3 py-1.5 rounded-full">
              <i className="ri-live-line" />
              <span>INVESTITURE 2026</span>
            </div>
          </div>

          {/* Counter */}
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full pointer-events-none">
            {current + 1} / {total}
          </div>

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 pointer-events-none">
            <p className="text-white font-bold text-base sm:text-lg leading-snug mb-1">
              {investitureImages[current].caption}
            </p>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <i className="ri-zoom-in-line" />
              <span>Cliquez pour agrandir</span>
            </div>
          </div>

          {/* Nav arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/40 hover:bg-black/70 rounded-full text-white transition-all cursor-pointer"
          >
            <i className="ri-arrow-left-s-line text-2xl" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/40 hover:bg-black/70 rounded-full text-white transition-all cursor-pointer"
          >
            <i className="ri-arrow-right-s-line text-2xl" />
          </button>

          {/* Progress bar */}
          {!paused && !lightboxOpen && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 pointer-events-none">
              <div
                key={current}
                className="h-full bg-[#d4af37]"
                style={{ animation: 'progress-bar 6s linear forwards' }}
              />
            </div>
          )}
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 justify-start sm:justify-center mb-8 overflow-x-auto pb-2">
          {thumbs.map((img, i) => {
            const realIdx = thumbStart + i;
            return (
              <button
                key={img.id}
                onClick={() => setCurrent(realIdx)}
                className={`relative rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 cursor-pointer ${
                  realIdx === current
                    ? 'ring-2 ring-[#d4af37] ring-offset-2 ring-offset-[#0a1628] scale-105'
                    : 'opacity-60 hover:opacity-100'
                }`}
                style={{ width: '88px', height: '56px' }}
              >
                <img src={img.image} alt={img.caption} className="w-full h-full object-cover object-top" />
              </button>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mb-10">
          {investitureImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                idx === current ? 'w-6 h-2 bg-[#d4af37]' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* All photos grid */}
        <div className="mt-12">
          <h3 className="text-white font-bold text-xl mb-6 text-center">Toutes les Photos de l'Événement</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {investitureImages.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => openLightbox(idx)}
            className="group relative rounded-lg overflow-hidden cursor-pointer h-24 sm:h-[110px]"
              >
                <img
                  src={img.image}
                  alt={img.caption}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <i className="ri-zoom-in-line text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs leading-tight line-clamp-2">{img.caption}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-3 right-3 sm:-top-12 sm:right-0 w-10 h-10 flex items-center justify-center text-white hover:text-gray-300 transition-colors cursor-pointer z-10"
            >
              <i className="ri-close-line text-2xl" />
            </button>

            <div className="relative w-full rounded-xl overflow-hidden h-[280px] sm:h-[420px] lg:h-[580px]">
              <img
                src={investitureImages[lightboxIndex].image}
                alt={investitureImages[lightboxIndex].caption}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
                <p className="text-white font-bold text-base sm:text-lg">{investitureImages[lightboxIndex].caption}</p>
                <p className="text-white/50 text-xs sm:text-sm mt-1">Photo {lightboxIndex + 1} sur {total} — Investiture Présidentielle, 30 Mars 2026</p>
              </div>
            </div>

            <button
              onClick={lbPrev}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full text-white transition-all cursor-pointer"
            >
              <i className="ri-arrow-left-s-line text-2xl" />
            </button>
            <button
              onClick={lbNext}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full text-white transition-all cursor-pointer"
            >
              <i className="ri-arrow-right-s-line text-2xl" />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes progress-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
