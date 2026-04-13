import { useEffect, useRef, useState } from 'react';
import { stats } from '@/mocks/news';
import presidentImage from '../../../images/Président.jpg';
import pr0 from '../../../images/Pr.0.jpg';
import pr1 from '../../../images/Pr.1.jpg';
import pr2 from '../../../images/Pr.2.jpg';
import pr3 from '../../../images/Pr.3.jpg';
import pr4 from '../../../images/Pr.4.jpg';
import pr5 from '../../../images/Pr.5.jpg';
import pr6 from '../../../images/Pr.6.jpg';
import pr7 from '../../../images/Pr.7.jpg';
import pr8 from '../../../images/Pr.8.jpg';
import pr9 from '../../../images/Pr.9.jpg';
import pr10 from '../../../images/Pr.10.jpg';

export default function HeroSection() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  // Array of all president images
  const presidentialImages = [
    { src: presidentImage, label: 'Faustin-Archange Touadéra', subtitle: 'Inspirateur du Mouvement', hasText: true },
    { src: pr0, hasText: false },
    { src: pr1, hasText: false },
    { src: pr2, hasText: false },
    { src: pr3, hasText: false },
    { src: pr4, hasText: false },
    { src: pr5, hasText: false },
    { src: pr6, hasText: false },
    { src: pr7, hasText: false },
    { src: pr8, hasText: false },
    { src: pr9, hasText: false },
    { src: pr10, hasText: false },
  ];

  // Auto-scroll carousel every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % presidentialImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          stats.forEach((stat, i) => {
            const target = parseInt(stat.value.replace(/\D/g, ''), 10);
            const duration = 1800;
            const step = Math.ceil(target / (duration / 16));
            let current = 0;
            const timer = setInterval(() => {
              current = Math.min(current + step, target);
              setCounts((prev) => {
                const next = [...prev];
                next[i] = current;
                return next;
              });
              if (current >= target) clearInterval(timer);
            }, 16);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const formatCount = (value: string, count: number) => {
    const suffix = value.replace(/[\d\s]/g, '');
    return `${count.toLocaleString('fr-FR')}${suffix}`;
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-2.5rem)] md:min-h-screen flex flex-col overflow-hidden bg-[#003082]"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* Centrafrique flag stripe at top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex">
        <div className="flex-1 bg-white/40" />
        <div className="flex-1 bg-white/70" />
        <div className="flex-1 bg-[#c0392b]" />
        <div className="flex-1 bg-[#5cb85c]" />
        <div className="w-1.5 bg-[#d4af37]" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center w-full pt-24 md:pt-28 pb-10 md:pb-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* LEFT — Text content */}
            <div className="flex-1 w-full text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/15 text-white text-[11px] sm:text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                Mouvement Politique Centrafricain
              </div>

              {/* Intro */}
              <p className="text-white/80 text-base md:text-lg font-medium mb-2 leading-snug">
                Bienvenue chez <span className="italic font-semibold text-[#d4af37]">TALKS</span> du <span className="font-extrabold text-white">TALKS</span> :
              </p>

              {/* Main title */}
              <h1 className="text-white font-extrabold leading-tight mb-4" style={{ fontSize: 'clamp(26px, 4vw, 52px)' }}>
                Touadéra A Lingbi<br />Na Koua So
              </h1>

              {/* Divider */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
                <div className="h-1 w-12 bg-[#d4af37] rounded-full" />
                <div className="h-1 w-6 bg-[#c0392b] rounded-full" />
                <div className="h-1 w-3 bg-[#5cb85c] rounded-full" />
              </div>

              {/* Subtitle */}
              <p className="text-white/75 text-base md:text-lg leading-relaxed mb-1">
                Une démocratie participative pour une Centrafrique forte
              </p>
              <p className="text-[#c0392b] font-extrabold text-lg md:text-xl mb-1 tracking-wide">
                &quot;Touadéra A Lingbi Na Koua So&quot;
              </p>
              <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8">
                Ensemble pour l'avenir, <span className="font-extrabold text-white">L'Unité est notre force</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href="/about"
                  className="bg-white text-[#003082] font-bold px-6 sm:px-8 py-3.5 rounded-lg hover:-translate-y-0.5 hover:bg-[#d4af37] hover:text-white transition-all duration-300 text-center flex items-center justify-center gap-2 text-base"
                >
                  <i className="ri-information-line" />
                  Découvrir TALKS
                </a>
                <a
                  href="/about#adhesion"
                  className="border-2 border-white/60 text-white font-bold px-6 sm:px-8 py-3.5 rounded-lg hover:-translate-y-0.5 hover:bg-white hover:text-[#003082] transition-all duration-300 text-center flex items-center justify-center gap-2 text-base"
                >
                  <i className="ri-user-add-line" />
                  Adhérer à TALKS
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-shield-check-line text-[#5cb85c]" />
                  </div>
                  Mouvement Officiel
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-map-pin-line text-[#c0392b]" />
                  </div>
                  Centrafrique
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-group-line text-[#d4af37]" />
                  </div>
                  5 000+ Membres
                </div>
              </div>
            </div>

            {/* RIGHT — Real image */}
            <div className="flex-1 w-full flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[520px]">
                {/* Decorative frame */}
                <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border-2 border-white/20 pointer-events-none" />
                <div className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl bg-white/5 pointer-events-none" />

                {/* Main image */}
                <div className="relative rounded-2xl overflow-hidden w-full h-[320px] sm:h-[420px] lg:h-[520px]">
                  <img
                    src={presidentialImages[currentImageIndex].src}
                    alt="Président Faustin-Archange Touadéra"
                    className="w-full h-full object-cover object-top transition-opacity duration-500"
                  />
                  {/* Gradient overlay at bottom (only if image has text) */}
                  {presidentialImages[currentImageIndex].hasText && (
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#001a4d]/90 to-transparent" />
                  )}
                  {/* Caption (only for first image) */}
                  {presidentialImages[currentImageIndex].hasText && (
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-white font-bold text-base">{presidentialImages[currentImageIndex].label}</p>
                      <p className="text-white/70 text-xs">{presidentialImages[currentImageIndex].subtitle}</p>
                    </div>
                  )}
                </div>

                {/* Image carousel indicators */}
                <div className="flex justify-center gap-2 mt-4">
                  {presidentialImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'bg-[#d4af37] w-8'
                          : 'bg-white/30 w-2 hover:bg-white/50'
                      }`}
                      aria-label={`Image ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Floating badge */}
                <div className="absolute top-3 left-3 sm:-top-3 sm:-left-3 bg-[#d4af37] text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  <i className="ri-star-fill mr-1" />
                  TALKS Officiel
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar at bottom */}
      <div className="relative z-10 w-full bg-[#001a4d] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-[#d4af37] font-extrabold text-2xl lg:text-3xl">
                  {formatCount(stat.value, counts[i])}
                </p>
                <p className="text-white/60 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
