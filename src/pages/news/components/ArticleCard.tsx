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

interface ArticleCardProps {
  article: NewsArticle;
  onOpen: (article: NewsArticle) => void;
  liked: boolean;
  onLike: (id: number) => void;
  likesCount: number;
}

export default function ArticleCard({ article, onOpen, liked, onLike, likesCount }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 group border border-gray-100">
      <div
        className="relative overflow-hidden h-52 cursor-pointer"
        onClick={() => onOpen(article)}
      >
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
          {categoryLabels[article.category] || article.category}
        </span>
        {article.featured && (
          <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-[#d4af37] text-white">
            À la une
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
          <span className="flex items-center gap-1">
            <i className="ri-calendar-line" />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <i className="ri-user-line" />
            {article.author}
          </span>
          <span className="flex items-center gap-1">
            <i className="ri-time-line" />
            {article.readTime}
          </span>
        </div>
        <h2
          className="font-bold text-[#1a2b4a] text-base leading-snug mb-2 line-clamp-2 cursor-pointer hover:text-[#003082] transition-colors"
          onClick={() => onOpen(article)}
        >
          {article.title}
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {article.excerpt}
        </p>
        <div className="border-t border-gray-100 pt-3 flex items-center gap-4">
          <button
            onClick={() => onLike(article.id)}
            className={`flex items-center gap-1.5 text-sm transition-colors cursor-pointer ${
              liked ? 'text-[#c0392b]' : 'text-gray-400 hover:text-[#c0392b]'
            }`}
          >
            <i className={liked ? 'ri-heart-fill' : 'ri-heart-line'} />
            <span>{likesCount}</span>
          </button>
          <span className="flex items-center gap-1.5 text-sm text-gray-400">
            <i className="ri-chat-1-line" />
            <span>{article.comments}</span>
          </span>
          <span className="flex items-center gap-1.5 text-sm text-gray-400">
            <i className="ri-eye-line" />
            <span>{article.views}</span>
          </span>
          <button
            onClick={() => onOpen(article)}
            className="ml-auto whitespace-nowrap text-xs font-bold text-[#003082] hover:underline cursor-pointer flex items-center gap-1"
          >
            Lire l&apos;article <i className="ri-arrow-right-line" />
          </button>
        </div>
      </div>
    </article>
  );
}
