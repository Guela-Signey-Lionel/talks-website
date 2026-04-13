import { useState } from 'react';
import { testimonials } from '@/mocks/news';

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const visible = [
    testimonials[current % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section className="py-24 bg-[#1a2b4a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <span className="text-[#d4af37] text-sm font-bold uppercase tracking-widest">Témoignages</span>
          <h2 className="text-[#1a2b4a] font-extrabold mt-2" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}>
            Ce Que Disent Nos Membres
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {visible.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className={`bg-white rounded-2xl p-8 transition-all duration-500 ${i === 1 ? 'md:scale-105' : 'opacity-80'}`}
            >
              <i className="ri-double-quotes-l text-5xl text-[#d4af37]/20 block mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed italic mb-6 line-clamp-4">
                {t.text}
              </p>
              <div className="border-t border-gray-100 pt-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-[#003082] overflow-hidden shrink-0">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <p className="font-bold text-[#1a2b4a] text-base">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-s-line text-xl" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current % testimonials.length ? 'bg-[#d4af37] w-6' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <i className="ri-arrow-right-s-line text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
}
