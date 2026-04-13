import { useState } from 'react';
import { activitiesData, activityCategories, categoryImages } from '@/mocks/activities';

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
  Patriotisme: 'bg-[#003082]/10 text-[#003082]',
  Entrepreneuriat: 'bg-yellow-100 text-yellow-700',
  Culture: 'bg-pink-100 text-pink-700',
};

const categorySubtitles: Record<string, string> = {
  Humanitaire: 'Aide alimentaire, médicale et d\'urgence pour les populations vulnérables',
  Formation: 'Renforcement des capacités et développement professionnel',
  Cérémonie: 'Événements officiels, remises de prix et inaugurations',
  Dialogue: 'Concertations, réconciliation et cohésion sociale',
  Jeunesse: 'Engagement, entrepreneuriat et sport pour les jeunes',
  Développement: 'Infrastructure, agriculture et projets communautaires',
  Santé: 'Vaccination, soins et sensibilisation sanitaire',
  Éducation: 'Soutien scolaire, alphabétisation et construction d\'écoles',
  Culture: 'Festivals, arts, musique et patrimoine centrafricain',
};

type LightboxState = { open: boolean; images: { id: string; image: string; caption: string }[]; index: number };

export default function ActivitiesSection() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [visibleCount, setVisibleCount] = useState(8);
  const [lightbox, setLightbox] = useState<LightboxState>({ open: false, images: [], index: 0 });

  const filtered = activeCategory === 'Tous'
    ? activitiesData
    : activitiesData.filter((a) => a.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);

  const categoriesWithImages = activityCategories.filter((c) => c !== 'Tous' && categoryImages[c]);

  const openLightbox = (cat: string, idx: number) => {
    setLightbox({ open: true, images: categoryImages[cat] || [], index: idx });
  };

  const closeLightbox = () => setLightbox({ open: false, images: [], index: 0 });

  const prevImg = () => setLightbox((prev) => ({ ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }));
  const nextImg = () => setLightbox((prev) => ({ ...prev, index: (prev.index + 1) % prev.images.length }));

  return (
    <section className="py-24 bg-white" id="activites">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#003082] text-sm font-bold uppercase tracking-widest">Activités</span>
          <h2 className="text-[#1a2b4a] font-extrabold mt-2 mb-4" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}>
            Actions sur le Terrain
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            Découvrez les événements, formations et actions humanitaires menés par TALKS à travers toute la République Centrafricaine.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {activityCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setVisibleCount(8); }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#003082] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((activity) => (
            <div
              key={activity.id}
              className="group rounded-xl overflow-hidden border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[activity.category] || 'bg-gray-100 text-gray-600'}`}>
                    {activity.category}
                  </span>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-bold text-[#1a2b4a] text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[#003082] transition-colors">
                  {activity.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <i className="ri-calendar-line text-[#003082]" />
                    <span>{activity.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="ri-map-pin-line text-[#c0392b]" />
                    <span className="truncate max-w-[100px]">{activity.location.split(',')[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        {visibleCount < filtered.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((v) => v + 8)}
              className="whitespace-nowrap bg-[#003082] text-white font-bold px-8 py-3.5 rounded-lg hover:-translate-y-0.5 hover:bg-[#1a2b4a] transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
            >
              <i className="ri-add-line" />
              Voir plus d'activités ({filtered.length - visibleCount} restantes)
            </button>
          </div>
        )}

        <p className="text-center text-gray-400 text-sm mt-6">
          Affichage de {visible.length} sur {filtered.length} activités
        </p>

        {/* ─── Galeries par catégorie (4 images chacune) ─── */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <span className="text-[#d4af37] text-sm font-bold uppercase tracking-widest">Galerie par domaine</span>
            <h3 className="text-[#1a2b4a] font-extrabold mt-2 mb-3" style={{ fontSize: 'clamp(22px, 3vw, 36px)' }}>
              Nos Actions en Images
            </h3>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Chaque domaine d'action de TALKS illustré par 4 photos représentatives du terrain.
            </p>
          </div>

          <div className="space-y-16">
            {categoriesWithImages.map((cat) => {
              const imgs = categoryImages[cat] || [];
              return (
                <div key={cat}>
                  {/* Category header */}
                  <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${categoryColors[cat] || 'bg-gray-100 text-gray-600'}`}>
                        {cat}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">{categorySubtitles[cat] || ''}</p>
                    </div>
                    <div className="hidden md:block flex-1 h-px bg-gray-100" />
                    <span className="text-xs text-gray-400 whitespace-nowrap">{imgs.length} photos</span>
                  </div>

                  {/* 4-image grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {imgs.map((img, idx) => (
                      <div
                        key={img.id}
                        className="group relative rounded-xl overflow-hidden cursor-pointer h-40 sm:h-[200px]"
                        onClick={() => openLightbox(cat, idx)}
                      >
                        <img
                          src={img.image}
                          alt={img.caption}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-white text-xs font-semibold leading-snug">{img.caption}</p>
                        </div>
                        <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <i className="ri-zoom-in-line text-white text-sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && lightbox.images.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center text-white hover:text-gray-300 transition-colors cursor-pointer z-10"
            >
              <i className="ri-close-line text-2xl" />
            </button>

            <div className="relative w-full rounded-xl overflow-hidden h-[280px] sm:h-[420px] lg:h-[520px]">
              <img
                src={lightbox.images[lightbox.index].image}
                alt={lightbox.images[lightbox.index].caption}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white font-semibold text-base">{lightbox.images[lightbox.index].caption}</p>
                <p className="text-white/60 text-sm mt-1">{lightbox.index + 1} / {lightbox.images.length}</p>
              </div>
            </div>

            <button
              onClick={prevImg}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full text-white transition-all cursor-pointer"
            >
              <i className="ri-arrow-left-s-line text-xl" />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full text-white transition-all cursor-pointer"
            >
              <i className="ri-arrow-right-s-line text-xl" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
