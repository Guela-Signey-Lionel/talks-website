import { useState } from 'react';
import { Link } from 'react-router-dom';
import { activitiesData } from '@/mocks/activities';
import GalleryLightbox from '@/pages/activities/components/GalleryLightbox';

export default function GallerySection() {
  const [lightboxId, setLightboxId] = useState<number | null>(null);
  const recentActivities = activitiesData.slice(0, 6);

  const currentIndex = lightboxId !== null
    ? activitiesData.findIndex((a) => a.id === lightboxId)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) setLightboxId(activitiesData[currentIndex - 1].id);
  };

  const handleNext = () => {
    if (currentIndex < activitiesData.length - 1) setLightboxId(activitiesData[currentIndex + 1].id);
  };

  return (
    <section className="py-20 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-[#003082] text-xs font-bold uppercase tracking-widest">
              Nos Moments
            </span>
            <h2 className="font-extrabold text-3xl lg:text-4xl text-[#1a2b4a] mt-2">
              Galerie de Photos
            </h2>
            <p className="text-gray-500 mt-2 text-sm max-w-md">
              Découvrez les moments forts de nos actions sur le terrain à travers ces photos récentes.
            </p>
          </div>
          <Link
            to="/activities"
            className="whitespace-nowrap flex items-center gap-2 text-sm font-bold text-[#003082] border-2 border-[#003082] px-5 py-2.5 rounded-full hover:bg-[#003082] hover:text-white transition-all duration-300 self-start sm:self-auto"
          >
            Voir Plus
            <i className="ri-arrow-right-line" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {recentActivities.map((activity, index) => (
            <div
              key={activity.id}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                index === 0 ? 'md:col-span-2 md:row-span-2 h-64 md:h-auto' : 'h-48'
              }`}
              onClick={() => setLightboxId(activity.id)}
            >
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Info on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[#d4af37] text-xs font-bold uppercase tracking-wide">
                  {activity.category}
                </span>
                <h3 className="text-white font-bold text-sm mt-0.5 line-clamp-2">
                  {activity.title}
                </h3>
                <p className="text-white/70 text-xs mt-1 flex items-center gap-1">
                  <i className="ri-calendar-line" />
                  {activity.date}
                </p>
              </div>
              {/* Zoom icon */}
              <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="ri-zoom-in-line text-sm" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA bottom */}
        <div className="text-center mt-10">
          <Link
            to="/activities"
            className="whitespace-nowrap inline-flex items-center gap-2 bg-[#003082] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#1a2b4a] transition-colors duration-300"
          >
            <i className="ri-image-line" />
            Explorez nos {activitiesData.length} activités
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxId !== null && (
        <GalleryLightbox
          currentId={lightboxId}
          onClose={() => setLightboxId(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
}
