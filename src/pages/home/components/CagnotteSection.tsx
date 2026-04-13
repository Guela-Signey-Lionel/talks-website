import { useState, useEffect, useCallback } from 'react';

const cagnotteImages = [
  {
    id: 1,
    image: '/src/Images Cagnotte/Cagnotte1.jpg',
    caption: 'Parlons de cagnotte - Une initiative de solidarité pour la Centrafrique',
  },
  {
    id: 2,
    image: '/src/Images Cagnotte/Cagnotte2.jpg',
    caption: 'Les peuples africains développent des formes d\'entraide pour surmonter les moments difficiles',
  },
  {
    id: 3,
    image: '/src/Images Cagnotte/Cagnotte3.jpg',
    caption: 'La solidarité existe depuis les tontines, cotisations et grandes réunions communautaires',
  },
  {
    id: 4,
    image: '/src/Images Cagnotte/Cagnotte4.jpg',
    caption: 'La cagnotte est un outil puissant capable de créer des élans de solidarité',
  },
  {
    id: 5,
    image: '/src/Images Cagnotte/Cagnotte5.jpg',
    caption: 'Les peuples entiers se mobilisent pour soutenir artistes, compatriotes et causes sociales',
  },
  {
    id: 6,
    image: '/src/Images Cagnotte/Cagnotte6.jpg',
    caption: 'Ces initiatives montrent que même les plus modestes contributions créent des résultats extraordinaires',
  },
  {
    id: 7,
    image: '/src/Images Cagnotte/Cagnotte7.jpg',
    caption: 'Face à ces exemples, nous nous posons une question : sommes-nous prêts à transformer notre compassion en action ?',
  },
  {
    id: 8,
    image: '/src/Images Cagnotte/Cagnotte8.jpg',
    caption: 'Notre pays compte de nombreuses femmes et enfants ayant besoin de soutien pour l\'éducation et les soins',
  },
  {
    id: 9,
    image: '/src/Images Cagnotte/Cagnotte9.jpg',
    caption: 'C\'est pourquoi il est temps de donner à cette solidarité une forme plus visible et puissante',
  },
  {
    id: 10,
    image: '/src/Images Cagnotte/Cagnotte10.jpg',
    caption: 'Bangui, Berbérati, Bambari, Bossangoa, Bouar, Paoua, Bangassou, Bria - Chaque ville porte sa cagnotte',
  },
  {
    id: 11,
    image: '/src/Images Cagnotte/Cagnotte11.jpg',
    caption: 'En unissant nos contributions, même les plus modestes, nous donnons espoir aux femmes et enfants',
  },
  {
    id: 12,
    image: '/src/Images Cagnotte/Cagnotte12.jpg',
    caption: 'Que chaque ville lève sa cagnotte, que chaque main apporte sa pierre à l\'édifice de notre union',
  },
  {
    id: 13,
    image: '/src/Images Cagnotte/Cagnotte13.jpg',
    caption: 'Ensemble, nous construisons une Centrafrique plus juste, plus solidaire et plus humaine',
  },
  {
    id: 14,
    image: '/src/Images Cagnotte/Cagnotte14.jpg',
    caption: 'La cagnotte TALKS : Un symbole de notre engagement envers les plus vulnérables',
  },
  {
    id: 15,
    image: '/src/Images Cagnotte/Cagnotte15.jpg',
    caption: 'Rejoignez le mouvement solidaire TALKS et soyez acteur du changement en Centrafrique',
  },
];

const stats = [
  { icon: 'ri-heart-fill', value: '1 200+', label: 'Bénéficiaires aidés' },
  { icon: 'ri-hand-coin-fill', value: '850 000 FCFA', label: 'Fonds collectés' },
  { icon: 'ri-group-fill', value: '300+', label: 'Donateurs actifs' },
  { icon: 'ri-home-heart-fill', value: '45', label: 'Familles relogées' },
];

export default function CagnotteSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const total = cagnotteImages.length;

  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused || lightboxOpen) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused, lightboxOpen]);

  const openLightbox = (idx: number) => { setLightboxIndex(idx); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);

  return (
    <section className="py-24 bg-[#003082]" id="cagnotte">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 border border-white/20">
            <i className="ri-heart-fill" />
            Politique de Solidarité
          </span>
          <h2 className="font-extrabold text-white mb-5" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
            La <span className="text-yellow-300">Cagnotte</span> TALKS
          </h2>
          <p className="text-white/75 max-w-3xl mx-auto text-base leading-relaxed">
            La <strong className="text-white">Cagnotte</strong> est l'une des politiques fondamentales de TALKS — une initiative de collecte de fonds solidaire
            destinée à venir en aide aux personnes vulnérables, aux familles pauvres, aux victimes de catastrophes,
            aux enfants de la rue et à toutes celles et ceux qui vivent dans des conditions difficiles.
            Ensemble, nous construisons un filet de sécurité humain pour les plus fragiles.
          </p>
        </div>

        {/* Main layout: carousel left + info right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-16">

          {/* Carousel */}
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onClick={() => openLightbox(current)}
          >
            {cagnotteImages.map((img, idx) => (
              <div
                key={img.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
              >
                <img src={img.image} alt={img.caption} className="w-full h-full object-cover object-top" />
              </div>
            ))}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 pointer-events-none" />

            {/* Badge */}
            <div className="absolute top-4 left-4 pointer-events-none">
              <span className="bg-[#003082] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <i className="ri-heart-fill text-yellow-400" />
                CAGNOTTE TALKS
              </span>
            </div>

            {/* Counter */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full pointer-events-none">
              {current + 1} / {total}
            </div>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 pointer-events-none">
              <p className="text-white font-semibold text-sm leading-snug mb-1">{cagnotteImages[current].caption}</p>
              <div className="flex items-center gap-1.5 text-white/60 text-xs">
                <i className="ri-zoom-in-line" />
                <span>Cliquez pour agrandir</span>
              </div>
            </div>

            {/* Arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/70 rounded-full text-white transition-all cursor-pointer"
            >
              <i className="ri-arrow-left-s-line text-xl" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/70 rounded-full text-white transition-all cursor-pointer"
            >
              <i className="ri-arrow-right-s-line text-xl" />
            </button>

            {/* Progress bar */}
            {!paused && !lightboxOpen && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 pointer-events-none">
                <div
                  key={current}
                  className="h-full bg-yellow-400"
                  style={{ animation: 'cagnotte-progress 6s linear forwards' }}
                />
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/15">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-yellow-400/20 rounded-full">
                  <i className="ri-question-answer-fill text-yellow-300 text-lg" />
                </div>
                <h3 className="font-bold text-white text-lg">Comment fonctionne la Cagnotte ?</h3>
              </div>
              <ul className="space-y-3 text-sm text-white/75 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <i className="ri-checkbox-circle-fill text-yellow-300 mt-0.5 flex-shrink-0" />
                  <span>Les membres et sympathisants de TALKS contribuent volontairement à la cagnotte commune.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <i className="ri-checkbox-circle-fill text-yellow-300 mt-0.5 flex-shrink-0" />
                  <span>Les fonds collectés sont gérés de manière transparente par le bureau exécutif de l'association.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <i className="ri-checkbox-circle-fill text-yellow-300 mt-0.5 flex-shrink-0" />
                  <span>Les bénéficiaires sont identifiés sur le terrain : familles pauvres, enfants de la rue, victimes de catastrophes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <i className="ri-checkbox-circle-fill text-yellow-300 mt-0.5 flex-shrink-0" />
                  <span>Les aides sont distribuées sous forme de vivres, soins médicaux, fournitures scolaires ou soutien financier direct.</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-400 rounded-2xl p-7 text-[#003082]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center bg-[#003082]/15 rounded-full">
                  <i className="ri-hand-heart-fill text-[#003082] text-lg" />
                </div>
                <h3 className="font-bold text-lg">Qui peut bénéficier ?</h3>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {['Enfants de la rue', 'Familles pauvres', 'Personnes âgées', 'Victimes de catastrophes', 'Malades sans ressources', 'Orphelins', 'Personnes déplacées', 'Femmes vulnérables'].map((tag) => (
                  <span key={tag} className="bg-[#003082]/15 text-[#003082] text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mb-16">
          {cagnotteImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                idx === current ? 'w-6 h-2 bg-yellow-400' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/15">
              <div className="w-12 h-12 flex items-center justify-center bg-yellow-400/20 rounded-full mx-auto mb-3">
                <i className={`${stat.icon} text-yellow-300 text-xl`} />
              </div>
              <div className="font-extrabold text-white text-2xl mb-1">{stat.value}</div>
              <div className="text-white/55 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-10 text-center border border-white/15">
          <i className="ri-heart-fill text-4xl mb-4 block text-yellow-300" />
          <h3 className="font-extrabold text-2xl text-white mb-3">Rejoignez le mouvement de solidarité</h3>
          <p className="text-white/70 max-w-xl mx-auto text-sm leading-relaxed mb-6">
            Chaque contribution, aussi petite soit-elle, change une vie. En rejoignant la Cagnotte TALKS,
            vous devenez acteur du changement pour les plus vulnérables de notre communauté.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/adhesion"
              className="bg-yellow-400 text-[#003082] font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-user-add-line mr-2" />
              Devenir membre
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61584438221894"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/15 hover:bg-white/25 text-white font-bold px-8 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap border border-white/20"
            >
              <i className="ri-facebook-fill mr-2" />
              Nous contacter
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={closeLightbox}
        >
          <div className="relative max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute top-3 right-3 sm:-top-12 sm:right-0 w-10 h-10 flex items-center justify-center text-white hover:text-gray-300 transition-colors cursor-pointer z-10"
            >
              <i className="ri-close-line text-2xl" />
            </button>
            <div className="relative w-full rounded-xl overflow-hidden h-[280px] sm:h-[420px] lg:h-[560px]">
              <img
                src={cagnotteImages[lightboxIndex].image}
                alt={cagnotteImages[lightboxIndex].caption}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
                <p className="text-white font-bold text-base sm:text-lg">{cagnotteImages[lightboxIndex].caption}</p>
                <p className="text-white/50 text-xs sm:text-sm mt-1">Photo {lightboxIndex + 1} sur {total} — Cagnotte TALKS</p>
              </div>
            </div>
            <button
              onClick={() => setLightboxIndex((i) => (i - 1 + total) % total)}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full text-white transition-all cursor-pointer"
            >
              <i className="ri-arrow-left-s-line text-2xl" />
            </button>
            <button
              onClick={() => setLightboxIndex((i) => (i + 1) % total)}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full text-white transition-all cursor-pointer"
            >
              <i className="ri-arrow-right-s-line text-2xl" />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes cagnotte-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
