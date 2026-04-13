import { useState, useMemo } from 'react';
import Ticker from '@/components/feature/Ticker';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { newsData, newsCategories, NewsArticle } from '@/mocks/news';
import ArticleCard from './components/ArticleCard';
import ArticleModal from './components/ArticleModal';

const ARTICLES_PER_PAGE = 6;

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'views'>('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [likes, setLikes] = useState<Record<number, number>>(
    Object.fromEntries(newsData.map((n) => [n.id, n.likes]))
  );
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const handleLike = (id: number) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    setLikes((prev) => ({ ...prev, [id]: prev[id] + (liked[id] ? -1 : 1) }));
  };

  const filtered = useMemo(() => {
    let result = activeCategory === 'all'
      ? newsData
      : newsData.filter((n) => n.category === activeCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.excerpt.toLowerCase().includes(q) ||
          (n.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'popular') {
      result = [...result].sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'views') {
      result = [...result].sort((a, b) => b.views - a.views);
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const featuredArticle = newsData.find((n) => n.featured);

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Ticker />
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#1a2b4a] to-[#003082] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/20" />
          <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full bg-white/10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <span className="text-[#d4af37] text-sm font-bold uppercase tracking-widest">
            Restez Informés
          </span>
          <h1 className="font-extrabold text-4xl lg:text-5xl mt-3 mb-4">
            Actualités TALKS
          </h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto mb-8">
            Suivez toutes les activités, communiqués officiels et actions de l&apos;association TALKS sur le terrain.
          </p>
          {/* Search bar */}
          <div className="max-w-lg mx-auto relative">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white text-gray-800 text-sm font-medium outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && !searchQuery && activeCategory === 'all' && currentPage === 1 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 -mt-8 mb-10 relative z-10">
          <div
            className="bg-white rounded-2xl overflow-hidden flex flex-col lg:flex-row cursor-pointer group border border-gray-100 hover:-translate-y-1 transition-transform duration-300"
            onClick={() => setSelectedArticle(featuredArticle)}
          >
            <div className="lg:w-1/2 h-64 lg:h-auto overflow-hidden">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="lg:w-1/2 p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#d4af37] text-white">
                  À la une
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#003082] text-white">
                  Événements
                </span>
              </div>
              <h2 className="font-extrabold text-[#1a2b4a] text-2xl leading-tight mb-3">
                {featuredArticle.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
                {featuredArticle.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <i className="ri-calendar-line text-[#003082]" />
                  {featuredArticle.date}
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-user-line text-[#003082]" />
                  {featuredArticle.author}
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-eye-line text-[#003082]" />
                  {featuredArticle.views} vues
                </span>
              </div>
              <button className="mt-5 self-start whitespace-nowrap flex items-center gap-2 bg-[#003082] text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-[#1a2b4a] transition-colors cursor-pointer">
                Lire l&apos;article complet <i className="ri-arrow-right-line" />
              </button>
            </div>
          </div>
        </section>
      )}

      <main className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        {/* Filters & Sort bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {newsCategories.map((cat) => {
              const count = cat.id === 'all'
                ? newsData.length
                : newsData.filter((n) => n.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#003082] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat.label}
                  <span className="ml-1.5 opacity-60">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Trier par :</span>
            {[
              { value: 'recent', label: 'Récents' },
              { value: 'popular', label: 'Populaires' },
              { value: 'views', label: 'Vues' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setSortBy(opt.value as 'recent' | 'popular' | 'views'); setCurrentPage(1); }}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  sortBy === opt.value
                    ? 'bg-[#1a2b4a] text-white'
                    : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {filtered.length} article{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
          {searchQuery && <span> pour &quot;<strong>{searchQuery}</strong>&quot;</span>}
        </p>

        {/* Grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onOpen={setSelectedArticle}
                liked={!!liked[article.id]}
                onLike={handleLike}
                likesCount={likes[article.id]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-400">
            <i className="ri-newspaper-line text-5xl mb-4 block" />
            <p className="text-lg font-medium">Aucun article trouvé.</p>
            <p className="text-sm mt-1">Essayez d&apos;autres mots-clés ou catégories.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-[#003082] hover:text-white hover:border-[#003082] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <i className="ri-arrow-left-s-line" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#003082] text-white border border-[#003082]'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-[#003082]/10'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-[#003082] hover:text-white hover:border-[#003082] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <i className="ri-arrow-right-s-line" />
            </button>
          </div>
        )}
      </main>

      <Footer />

      {/* Article Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}
