import { useState } from 'react';
import { Link } from 'react-router-dom';
import { newsData, newsCategories } from '@/mocks/news';

const categoryColors: Record<string, string> = {
  evenements: 'bg-[#003082] text-white',
  communiques: 'bg-[#c0392b] text-white',
  actions: 'bg-[#5cb85c] text-white',
  formations: 'bg-[#d4af37] text-white',
};

type CommentItem = { id: number; author: string; text: string; time: string };

const defaultComments: Record<number, CommentItem[]> = {
  1: [
    { id: 1, author: 'Marie-Claire', text: 'Très belle initiative de TALKS, bravo à toute l\'équipe !', time: 'Il y a 2h' },
    { id: 2, author: 'Jean-Baptiste', text: 'Nous sommes fiers de notre association.', time: 'Il y a 5h' },
  ],
  2: [
    { id: 1, author: 'Marie-Sylvie', text: 'Excellent travail sur le terrain, continuez ainsi !', time: 'Il y a 1h' },
  ],
};

export default function NewsPreview() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [likes, setLikes] = useState<Record<number, number>>(
    Object.fromEntries(newsData.map((n) => [n.id, n.likes]))
  );
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [shareOpen, setShareOpen] = useState<number | null>(null);
  const [commentOpen, setCommentOpen] = useState<number | null>(null);
  const [comments, setComments] = useState<Record<number, CommentItem[]>>(defaultComments);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const filtered = activeCategory === 'all'
    ? newsData.slice(0, 3)
    : newsData.filter((n) => n.category === activeCategory).slice(0, 3);

  const handleLike = (id: number) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    setLikes((prev) => ({ ...prev, [id]: prev[id] + (liked[id] ? -1 : 1) }));
  };

  const handleShare = (id: number, platform: 'facebook' | 'whatsapp') => {
    const article = newsData.find((n) => n.id === id);
    if (!article) return;
    const text = encodeURIComponent(`${article.title} — Association TALKS`);
    const url = encodeURIComponent(window.location.href);
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'noopener,noreferrer');
    } else {
      window.open(`https://wa.me/?text=${text}%20${url}`, '_blank', 'noopener,noreferrer');
    }
    setShareOpen(null);
  };

  const handleAddComment = (articleId: number) => {
    if (!newComment.trim()) return;
    const author = commentAuthor.trim() || 'Anonyme';
    const newItem: CommentItem = {
      id: Date.now(),
      author,
      text: newComment.trim(),
      time: 'À l\'instant',
    };
    setComments((prev) => ({
      ...prev,
      [articleId]: [...(prev[articleId] || []), newItem],
    }));
    setNewComment('');
    setCommentAuthor('');
  };

  const articleComments = (id: number) => comments[id] || [];

  return (
    <section className="py-24 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">Restez informé</span>
            <h2 className="text-[#1a2b4a] font-extrabold mt-2" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}>
              Actualités & Communiqués
            </h2>
          </div>
          <Link
            to="/news"
            className="whitespace-nowrap inline-flex items-center gap-2 text-[#1a2b4a] font-semibold text-sm border-2 border-[#1a2b4a] px-5 py-2.5 rounded-lg hover:bg-[#1a2b4a] hover:text-white transition-all duration-300"
          >
            Toutes les actualités
            <i className="ri-arrow-right-line" />
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {newsCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1a2b4a] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${
                    categoryColors[article.category] || 'bg-gray-700 text-white'
                  }`}
                >
                  {newsCategories.find((c) => c.id === article.category)?.label}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                  <i className="ri-calendar-line" />
                  <span>{article.date}</span>
                </div>
                <h3 className="font-bold text-[#1a2b4a] text-lg leading-snug mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                  {article.excerpt}
                </p>

                {/* Actions */}
                <div className="border-t border-gray-100 pt-4 flex items-center gap-4">
                  {/* Like */}
                  <button
                    onClick={() => handleLike(article.id)}
                    className={`flex items-center gap-1.5 text-sm transition-colors cursor-pointer ${
                      liked[article.id] ? 'text-[#c0392b]' : 'text-gray-400 hover:text-[#c0392b]'
                    }`}
                  >
                    <i className={liked[article.id] ? 'ri-heart-fill' : 'ri-heart-line'} />
                    <span>{likes[article.id]}</span>
                  </button>

                  {/* Share dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShareOpen(shareOpen === article.id ? null : article.id)}
                      className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#003082] transition-colors cursor-pointer"
                    >
                      <i className="ri-share-forward-line" />
                      <span>{article.shares}</span>
                    </button>
                    {shareOpen === article.id && (
                      <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl overflow-hidden z-20 min-w-[180px]" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>
                        <button
                          onClick={() => handleShare(article.id, 'facebook')}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[#1877F2] hover:bg-[#1877F2]/10 transition-colors cursor-pointer"
                        >
                          <i className="ri-facebook-fill text-base" />
                          Partager sur Facebook
                        </button>
                        <div className="h-px bg-gray-100" />
                        <button
                          onClick={() => handleShare(article.id, 'whatsapp')}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[#25D366] hover:bg-[#25D366]/10 transition-colors cursor-pointer"
                        >
                          <i className="ri-whatsapp-line text-base" />
                          Partager sur WhatsApp
                        </button>
                        <div className="h-px bg-gray-100" />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setShareOpen(null);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <i className="ri-links-line text-base" />
                          Copier le lien
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Comments */}
                  <button
                    onClick={() => setCommentOpen(commentOpen === article.id ? null : article.id)}
                    className={`flex items-center gap-1.5 text-sm transition-colors cursor-pointer ${
                      commentOpen === article.id ? 'text-[#003082]' : 'text-gray-400 hover:text-[#003082]'
                    }`}
                  >
                    <i className="ri-chat-1-line" />
                    <span>{articleComments(article.id).length || article.comments}</span>
                  </button>
                </div>

                {/* Comments panel */}
                {commentOpen === article.id && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="text-xs font-bold text-[#1a2b4a] mb-3 uppercase tracking-wide">
                      Commentaires ({articleComments(article.id).length})
                    </p>

                    {/* Existing comments */}
                    <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                      {articleComments(article.id).length === 0 && (
                        <p className="text-gray-400 text-xs italic">Soyez le premier à commenter.</p>
                      )}
                      {articleComments(article.id).map((c) => (
                        <div key={c.id} className="flex gap-2">
                          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#003082]/10 flex-shrink-0">
                            <i className="ri-user-line text-[#003082] text-xs" />
                          </div>
                          <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-xs font-bold text-[#1a2b4a]">{c.author}</span>
                              <span className="text-xs text-gray-400">{c.time}</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">{c.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* New comment form */}
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Votre nom (optionnel)"
                        value={commentAuthor}
                        onChange={(e) => setCommentAuthor(e.target.value)}
                        className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#003082] transition-colors"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Écrire un commentaire..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddComment(article.id)}
                          className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#003082] transition-colors"
                        />
                        <button
                          onClick={() => handleAddComment(article.id)}
                          className="whitespace-nowrap bg-[#003082] text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-[#1a2b4a] transition-colors cursor-pointer"
                        >
                          <i className="ri-send-plane-fill" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Close share dropdown on outside click */}
      {shareOpen !== null && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShareOpen(null)}
        />
      )}
    </section>
  );
}
