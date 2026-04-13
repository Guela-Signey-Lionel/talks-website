import { useEffect, useCallback } from 'react';
import { activitiesData } from '@/mocks/activities';

interface LightboxProps {
  currentId: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function GalleryLightbox({ currentId, onClose, onPrev, onNext }: LightboxProps) {
  const activity = activitiesData.find((a) => a.id === currentId);
  const currentIndex = activitiesData.findIndex((a) => a.id === currentId);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!activity) return null;

  const pageUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(`${activity.title} - TALKS | Association Touadéra A Lingbi Na Kwa So`);
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&quote=${shareText}`;
  const whatsappShareUrl = `https://wa.me/?text=${shareText}%20${pageUrl}`;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
        onClick={onClose}
      >
        <i className="ri-close-line text-xl" />
      </button>

      {/* Prev button */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        <i className="ri-arrow-left-line text-xl" />
      </button>

      {/* Next button */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        <i className="ri-arrow-right-line text-xl" />
      </button>

      {/* Content */}
      <div
        className="relative max-w-4xl w-full mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="w-full h-[50vh] rounded-xl overflow-hidden">
          <img
            src={activity.image}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info panel */}
        <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-5 text-white">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
            <div className="flex-1">
              <span className="text-[#d4af37] text-xs font-bold uppercase tracking-widest">
                {activity.category}
              </span>
              <h3 className="text-white font-bold text-lg mt-1">{activity.title}</h3>
              <p className="text-white/70 text-sm mt-1 leading-relaxed">{activity.description}</p>
            </div>
            <div className="shrink-0 text-right">
              <div className="flex items-center gap-1.5 text-white/60 text-sm justify-end mb-1">
                <i className="ri-calendar-line text-[#d4af37]" />
                <span>{activity.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/60 text-sm justify-end">
                <i className="ri-map-pin-line text-[#c0392b]" />
                <span>{activity.location}</span>
              </div>
            </div>
          </div>

          {/* Share buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-white/20">
            <span className="text-white/60 text-xs font-semibold uppercase tracking-wide">
              Partager :
            </span>
            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1877F2] text-white text-xs font-bold hover:bg-[#1565d8] transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-facebook-fill" />
              Partager sur Facebook
            </a>
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#1da851] transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-whatsapp-line" />
              Partager sur WhatsApp
            </a>
          </div>
        </div>

        {/* Counter */}
        <p className="text-center text-white/40 text-xs mt-3">
          {currentIndex + 1} / {activitiesData.length} — Utilisez les flèches ou les touches ← → pour naviguer
        </p>
      </div>
    </div>
  );
}
