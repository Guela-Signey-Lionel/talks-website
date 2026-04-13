import { useState } from 'react';
import { culturalActivitiesData } from '@/mocks/activities';
import { Link } from 'react-router-dom';

export default function CulturalActivitiesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = culturalActivitiesData[activeIdx];

  return (
    <section className="py-24 bg-[#f8f9ff]" id="activites-culturelles">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[#d4af37] text-sm font-bold uppercase tracking-widest">Activités</span>
            <h2 className="text-[#1a2b4a] font-extrabold mt-2 mb-3" style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}>
              Activités Culturelles
            </h2>
            <p className="text-gray-500 max-w-xl text-sm leading-relaxed">
              TALKS valorise et préserve le riche patrimoine culturel de la République Centrafricaine à travers des événements artistiques, musicaux et traditionnels.
            </p>
          </div>
          <Link
            to="/activities?category=Culture"
            className="whitespace-nowrap shrink-0 inline-flex items-center gap-2 border-2 border-[#003082] text-[#003082] font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-[#003082] hover:text-white transition-all duration-300 cursor-pointer"
          >
            Voir Plus
            <i className="ri-arrow-right-line" />
          </Link>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Featured image - left */}
          <div className="lg:col-span-3 relative rounded-2xl overflow-hidden group cursor-pointer" style={{ minHeight: '420px' }}>
            <img
              src={active.image}
              alt={active.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              style={{ minHeight: '420px' }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {/* Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-[#d4af37] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                {active.category}
              </span>
            </div>
            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white font-extrabold text-xl leading-tight mb-2">
                {active.title}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                {active.description}
              </p>
              <div className="flex items-center gap-4 text-white/70 text-xs">
                <div className="flex items-center gap-1.5">
                  <i className="ri-calendar-line text-[#d4af37]" />
                  <span>{active.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <i className="ri-map-pin-line text-[#d4af37]" />
                  <span>{active.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnails - right */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {culturalActivitiesData.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={`flex items-center gap-4 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer text-left group ${
                  activeIdx === idx
                    ? 'ring-2 ring-[#003082] bg-white'
                    : 'bg-white hover:ring-1 hover:ring-[#003082]/30'
                }`}
              >
                {/* Thumb image */}
                <div className="w-20 h-16 shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Text */}
                <div className="flex-1 py-2 pr-3 min-w-0">
                  <p className={`font-bold text-xs leading-snug line-clamp-2 transition-colors ${
                    activeIdx === idx ? 'text-[#003082]' : 'text-[#1a2b4a] group-hover:text-[#003082]'
                  }`}>
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-gray-400 text-[10px]">
                    <i className="ri-calendar-line" />
                    <span>{item.date}</span>
                  </div>
                </div>
                {/* Active indicator */}
                {activeIdx === idx && (
                  <div className="w-1 h-full bg-[#003082] self-stretch rounded-r-xl shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {culturalActivitiesData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                activeIdx === idx ? 'w-6 h-2 bg-[#003082]' : 'w-2 h-2 bg-gray-300 hover:bg-[#003082]/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
