import { useEffect, useCallback } from 'react';
import { NewsArticle } from '@/mocks/news';

const categoryColors: Record<string, string> = {
  evenements: 'bg-[#003082] text-white',
  communiques: 'bg-[#c0392b] text-white',
  actions: 'bg-[#5cb85c] text-white',
  formations: 'bg-[#d4af37] text-white',
  interviews: 'bg-[#8e44ad] text-white',
  rapports: 'bg-[#e67e22] text-white',
};

const categoryLabels: Record<string, string> = {
  evenements: 'Événements',
  communiques: 'Communiqués',
  actions: 'Actions',
  formations: 'Formations',
  interviews: 'Interviews',
  rapports: 'Rapports',
};

interface ArticleModalProps {
  article: NewsArticle;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(`${article.title} - TALKS`);
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`;
  const whatsappShareUrl = `https://wa.me/?text=${shareText}%20${shareUrl}`;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-lg" />
          </button>
          <span
            className={`absolute bottom-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${
              categoryColors[article.category] || 'bg-gray-700 text-white'
            }`}
          >
            {categoryLabels[article.category] || article.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-3 text-gray-400 text-xs mb-4">
            <span className="flex items-center gap-1">
              <i className="ri-calendar-line text-[#003082]" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-user-line text-[#003082]" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-time-line text-[#003082]" />
              {article.readTime}
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-eye-line text-[#003082]" />
              {article.views} vues
            </span>
          </div>

          <h1 className="font-extrabold text-[#1a2b4a] text-2xl leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-gray-600 text-base leading-relaxed mb-6 font-medium border-l-4 border-[#003082] pl-4 italic">
            {article.excerpt}
          </p>

          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-4">
            {article.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-100">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-3 py-1 rounded-full bg-[#003082]/10 text-[#003082]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-gray-100">
            <span className="text-sm font-bold text-gray-600">Partager :</span>
            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1877F2] text-white text-sm font-semibold hover:bg-[#1565d8] transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-facebook-fill" />
              Facebook
            </a>
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1da851] transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-whatsapp-line" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
