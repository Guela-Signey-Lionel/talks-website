import { useState } from 'react';
import Ticker from '@/components/feature/Ticker';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { activitiesData, activityCategories } from '@/mocks/activities';
import ActivityCard from './components/ActivityCard';
import GalleryLightbox from './components/GalleryLightbox';

const categoryColors: Record<string, string> = {
  Assemblée: 'bg-[#003082]/10 text-[#003082]',
  Humanitaire: 'bg-red-100 text-red-700',
  Formation: 'bg-amber-100 text-amber-700',
  Cérémonie: 'bg-purple-100 text-purple-700',
  Dialogue: 'bg-teal-100 text-teal-700',
  Sensibilisation: 'bg-orange-100 text-orange-700',
  Environnement: 'bg-green-100 text-green-700',
  Jeunesse: 'bg-sky-100 text-sky-700',
  Développement: 'bg-indigo-100 text-indigo-700',
  Gala: 'bg-pink-100 text-pink-700',
  Femmes: 'bg-rose-100 text-rose-700',
  Sport: 'bg-lime-100 text-lime-700',
  Inauguration: 'bg-cyan-100 text-cyan-700',
  Santé: 'bg-emerald-100 text-emerald-700',
  Éducation: 'bg-violet-100 text-violet-700',
  Culture: 'bg-pink-100 text-pink-700',
  Patriotisme: 'bg-[#003082]/10 text-[#003082]',
  Entrepreneuriat: 'bg-yellow-100 text-yellow-700',
};

export default function ActivitiesPage() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [lightboxId, setLightboxId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = activitiesData.filter((a) => {
    const matchCat = activeCategory === 'Tous' || a.category === activeCategory;
    const matchSearch =
      searchQuery === '' ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const currentIndex = lightboxId !== null ? filtered.findIndex((a) => a.id === lightboxId) : -1;

  const handlePrev = () => {
    if (currentIndex > 0) setLightboxId(filtered[currentIndex - 1].id);
    else setLightboxId(filtered[filtered.length - 1].id);
  };

  const handleNext = () => {
    if (currentIndex < filtered.length - 1) setLightboxId(filtered[currentIndex + 1].id);
    else setLightboxId(filtered[0].id);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      <Ticker />
      <Navbar />

      {/* Page Hero */}
      <section className="bg-[#003082] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
            <a href="/" className="hover:text-white transition-colors cursor-pointer">Accueil</a>
            <i className="ri-arrow-right-s-line" />
            <span className="text-white">Activités</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-[#d4af37] text-sm font-bold uppercase tracking-widest">Nos Activités</span>
              <h1 className="text-white font-extrabold mt-2 leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                Actions & Événements
              </h1>
              <p className="text-white/70 mt-3 max-w-2xl text-base leading-relaxed">
                Découvrez l'ensemble des événements, formations et actions humanitaires menés par TALKS à travers toute la République Centrafricaine. Cliquez sur une image pour l'agrandir.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3">
              <i className="ri-calendar-check-line text-[#d4af37] text-2xl" />
              <div>
                <p className="text-white font-bold text-2xl">{activitiesData.length}</p>
                <p className="text-white/60 text-xs">Activités réalisées</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="bg-white border-b border-gray-100 sticky top-[104px] z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {activityCategories.map((cat) => {
                const count = cat === 'Tous'
                  ? activitiesData.length
                  : activitiesData.filter((a) => a.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      activeCategory === cat
                        ? 'bg-[#003082] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCategory === cat ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative shrink-0 w-full md:w-64">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Rechercher une activité..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#003082] bg-gray-50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-gray-100">
                <i className="ri-search-line text-gray-400 text-2xl" />
              </div>
              <p className="text-gray-500 font-medium">Aucune activité trouvée</p>
              <p className="text-gray-400 text-sm mt-1">Essayez un autre filtre ou terme de recherche</p>
            </div>
          ) : (
            <>
              <p className="text-gray-400 text-sm mb-6">
                {filtered.length} activité{filtered.length > 1 ? 's' : ''} trouvée{filtered.length > 1 ? 's' : ''}
                {activeCategory !== 'Tous' && ` dans "${activeCategory}"`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filtered.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    {...activity}
                    categoryColor={categoryColors[activity.category] || 'bg-gray-100 text-gray-600'}
                    onOpenLightbox={setLightboxId}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Gallery CTA */}
      <section className="py-16 bg-[#003082]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-white font-extrabold text-2xl md:text-3xl mb-4">
            Rejoignez le Mouvement TALKS
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 text-base">
            Participez activement aux actions de l'association et contribuez au développement de la République Centrafricaine.
          </p>
          <a
            href="/about#adhesion"
            className="whitespace-nowrap inline-flex items-center gap-2 bg-[#d4af37] text-white font-bold px-8 py-3.5 rounded-lg hover:-translate-y-0.5 hover:bg-[#b8962e] transition-all duration-300 text-base cursor-pointer"
          >
            <i className="ri-user-add-line" />
            Adhérer à TALKS
          </a>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      {lightboxId !== null && (
        <GalleryLightbox
          currentId={lightboxId}
          onClose={() => setLightboxId(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
